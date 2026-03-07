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
 * -100% (-1.0) = red, >= 100% (1.0) = green, otherwise neutral.
 */
export function getRoasColor(roas: number): string {
  if (roas == null || isNaN(roas)) return `hsl(210, 20%, 90%)`;

  if (roas >= 1) {
    // Green intensity scales with gains above 100%
    const t = Math.min(1, roas - 1);
    const s = 45 + t * 26;
    const l = 52 + t * -7;
    return `hsl(142, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
  }

  if (roas === -1) {
    return `hsl(0, 72%, 51%)`;
  }

  return `hsl(210, 20%, 90%)`;
}

/**
 * Returns profit (green) or loss (red) color for monetary values.
 */
export function getProfitColor(value: number): string {
  if (value == null || isNaN(value)) return `hsl(0, 0%, 60%)`;
  return value >= 0 ? `hsl(142, 71%, 45%)` : `hsl(0, 72%, 51%)`;
}
