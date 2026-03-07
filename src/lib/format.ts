export function formatBRL(value: number): string {
  if (value == null || isNaN(value)) return "R$ 0,00";
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

export function formatROAS(value: number): string {
  if (value == null || isNaN(value)) return "0%";
  return `${(value * 100).toFixed(0)}%`;
}

export function formatPercent(value: number): string {
  if (value == null || isNaN(value)) return "0,0%";
  return `${(value * 100).toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  if (value == null || isNaN(value)) return "0";
  return value.toLocaleString("pt-BR");
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}m${secs > 0 ? ` ${secs}s` : ""}`;
}

/**
 * Returns an HSL color for ROAS values.
 * >= 100% (1.0) = green (profit), < 100% = red (loss).
 * Intensity scales with distance from threshold.
 */
export function getRoasColor(roas: number): string {
  if (roas == null || isNaN(roas)) return `hsl(0, 0%, 60%)`;

  if (roas >= 1) {
    // Green — intensity scales from 100% to 200%+
    const t = Math.min(1, roas - 1);
    const s = 40 + t * 31;
    const l = 55 + t * -10;
    return `hsl(142, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
  }

  // Red — intensity scales from 100% down to 0% and below
  const t = Math.min(1, 1 - roas);
  const s = 40 + t * 32;
  const l = 55 + t * -4;
  return `hsl(0, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
}

/**
 * Returns profit (green) or loss (red) color for monetary values.
 */
export function getProfitColor(value: number): string {
  if (value == null || isNaN(value)) return `hsl(0, 0%, 60%)`;
  return value >= 0 ? `hsl(142, 71%, 45%)` : `hsl(0, 72%, 51%)`;
}
