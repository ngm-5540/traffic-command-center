import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const todayStr = () => format(new Date(), "yyyy-MM-dd");

const TODAY_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Returns true if the date range includes today.
 */
export function includestoday(until?: string): boolean {
  if (!until) return true;
  return until >= todayStr();
}

/**
 * Read cached data. Returns { data, isStale } or null if no cache.
 */
async function readCacheEntry(
  provider: string,
  cacheKey: string,
  dateRange: string
): Promise<{ data: any; isStale: boolean } | null> {
  const { data, error } = await supabase
    .from("api_data_cache")
    .select("data, fetched_at")
    .eq("provider", provider)
    .eq("cache_key", cacheKey)
    .eq("date_range", dateRange)
    .maybeSingle();

  if (error || !data) return null;

  const age = Date.now() - new Date(data.fetched_at).getTime();
  return { data: data.data, isStale: age > TODAY_CACHE_TTL_MS };
}

/**
 * Write data to cache (upsert).
 */
async function writeCache(
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
 * Stale-while-revalidate cache:
 * - Past dates: cache forever, never re-fetch.
 * - Today: return cached data immediately (even if stale), 
 *   and if stale (>15min), refresh in background for next call.
 *   Data is NEVER cleared — old data stays until new data arrives.
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

  const entry = await readCacheEntry(provider, cacheKey, dateRange);

  if (entry) {
    if (!isToday) {
      // Past dates: always use cache
      console.log(`[cache] HIT ${provider}/${cacheKey} ${dateRange}`);
      return entry.data as T;
    }

    if (!entry.isStale) {
      // Today, cache is fresh (<15min)
      console.log(`[cache] HIT ${provider}/${cacheKey} ${dateRange} (today, fresh)`);
      return entry.data as T;
    }

    // Today, cache is stale: return stale data NOW, refresh in background
    console.log(`[cache] STALE ${provider}/${cacheKey} ${dateRange} — background refresh`);
    fetchFn()
      .then((result) => writeCache(provider, cacheKey, dateRange, result))
      .catch((err) => console.warn(`[cache] background refresh failed for ${provider}:`, err));
    return entry.data as T;
  }

  // No cache at all — must fetch (first load)
  console.log(`[cache] MISS ${provider}/${cacheKey} ${dateRange} — fetching...`);
  const result = await fetchFn();
  writeCache(provider, cacheKey, dateRange, result).catch(() => {});
  return result;
}
