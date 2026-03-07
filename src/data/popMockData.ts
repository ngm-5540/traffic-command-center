/**
 * Generates deterministic "previous period" mock data for PoP comparison.
 * Uses a seeded pseudo-random to keep values stable across re-renders.
 */

// Simple seeded pseudo-random
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generatePreviousKpis(current: {
  totalCost: number;
  totalRevenue: number;
  totalProfit: number;
  avgRoas: number;
  avgRps: number;
  avgCostPerLead: number;
}) {
  const rand = seededRandom(42);
  const vary = (v: number, variance = 0.25) => v * (1 + (rand() - 0.5) * 2 * variance);
  
  return {
    totalCost: vary(current.totalCost),
    totalRevenue: vary(current.totalRevenue),
    totalProfit: vary(current.totalProfit, 0.4),
    avgRoas: vary(current.avgRoas, 0.35),
    avgRps: vary(current.avgRps),
    avgCostPerLead: vary(current.avgCostPerLead),
  };
}

/** Generate previous period values for any numeric record, using its keys as seed */
export function generatePreviousRecord<T extends Record<string, any>>(
  record: T,
  seedBase: number = 0
): Record<string, number> {
  const rand = seededRandom(seedBase + 7);
  const vary = (v: number, variance = 0.25) => v * (1 + (rand() - 0.5) * 2 * variance);
  
  const result: Record<string, number> = {};
  for (const [key, value] of Object.entries(record)) {
    if (typeof value === "number" && !key.endsWith("Trend") && key !== "id") {
      result[key] = vary(value);
    }
  }
  return result;
}
