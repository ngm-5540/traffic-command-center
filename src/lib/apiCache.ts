import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const todayStr = () => format(new Date(), "yyyy-MM-dd");

/**
 * Returns true if the date range includes today (meaning data should be fetched fresh).
 */
export function includestoday(until?: string): boolean {
  if (!until) return true;
  return until >= todayStr();
}

/**
 * Try to read cached data for a given provider + key + date range.
 * Returns null if no cache exists.
 */
export async function readCache(
  provider: string,
  cacheKey: string,
  dateRange: string
): Promise<any | null> {
  const { data, error } = await supabase
    .from("api_data_cache")
    .select("data")
    .eq("provider", provider)
    .eq("cache_key", cacheKey)
    .eq("date_range", dateRange)
    .maybeSingle();

  if (error || !data) return null;
  return data.data;
}

/**
 * Write data to cache (upsert).
 */
export async function writeCache(
  provider: string,
  cacheKey: string,
  dateRange: string,
  payload: any
): Promise<void> {
  await supabase
    .from("api_data_cache")
    .upsert(
      {
        provider,
        cache_key: cacheKey,
        date_range: dateRange,
        data: payload,
        fetched_at: new Date().toISOString(),
      },
      { onConflict: "provider,cache_key,date_range" }
    );
}

/**
 * Wrapper: returns cached data if range is fully in the past, otherwise fetches fresh and caches.
 */
export async function cachedFetch<T>(
  provider: string,
  cacheKey: string,
  since: string | undefined,
  until: string | undefined,
  fetchFn: () => Promise<T>
): Promise<T> {
  const dateRange = `${since || ""}_${until || ""}`;
  const isToday = includestoday(until);

  // For past date ranges, try cache first
  if (!isToday) {
    const cached = await readCache(provider, cacheKey, dateRange);
    if (cached !== null) {
      console.log(`[cache] HIT ${provider}/${cacheKey} ${dateRange}`);
      return cached as T;
    }
  }

  // Fetch fresh
  console.log(`[cache] MISS ${provider}/${cacheKey} ${dateRange} — fetching...`);
  const result = await fetchFn();

  // Always cache the result (for today it will be overwritten next time)
  writeCache(provider, cacheKey, dateRange, result).catch(() => {});

  return result;
}
