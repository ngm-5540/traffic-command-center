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
 * Returns null if no cache exists, or if maxAgeMs is set and cache is too old.
 */
export async function readCache(
  provider: string,
  cacheKey: string,
  dateRange: string,
  maxAgeMs?: number
): Promise<any | null> {
  const { data, error } = await supabase
    .from("api_data_cache")
    .select("data, fetched_at")
    .eq("provider", provider)
    .eq("cache_key", cacheKey)
    .eq("date_range", dateRange)
    .maybeSingle();

  if (error || !data) return null;

  // Check staleness if maxAgeMs is provided
  if (maxAgeMs !== undefined) {
    const age = Date.now() - new Date(data.fetched_at).getTime();
    if (age > maxAgeMs) return null;
  }

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

const TODAY_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Wrapper: 
 * - Past dates: use cache indefinitely (never re-fetch)
 * - Today: use cache if < 5 min old, otherwise fetch fresh and update cache
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

  // Always try cache first
  const cached = await readCache(
    provider,
    cacheKey,
    dateRange,
    isToday ? TODAY_CACHE_TTL_MS : undefined // past dates: no expiry
  );

  if (cached !== null) {
    console.log(`[cache] HIT ${provider}/${cacheKey} ${dateRange}${isToday ? " (today, <5min)" : ""}`);
    return cached as T;
  }

  // Fetch fresh
  console.log(`[cache] MISS ${provider}/${cacheKey} ${dateRange} — fetching...`);
  const result = await fetchFn();

  // Save to cache
  writeCache(provider, cacheKey, dateRange, result).catch(() => {});

  return result;
}
