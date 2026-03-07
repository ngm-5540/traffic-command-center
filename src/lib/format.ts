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
 * Returns an HSL color for ROAS text.
 * > 0 = green, < 0 = red, 0 = neutral.
 */
export function getRoasColor(roas: number): string {
  if (roas == null || isNaN(roas) || roas === 0) return `hsl(210, 20%, 90%)`;
  if (roas > 0) {
    const t = Math.min(1, roas);
    const s = 45 + t * 26;
    const l = 52 + t * -7;
    return `hsl(142, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
  }
  const t = Math.min(1, Math.abs(roas));
  const s = 45 + t * 27;
  const l = 55 + t * -4;
  return `hsl(0, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
}

/**
 * Returns card styling class for ROAS.
 * Only paints card at >= 100% (green) or == -100% (red).
 */
export function getRoasCardClass(roas: number): string {
  if (roas >= 1) return "border-profit/30 bg-profit/5";
  if (roas === -1) return "border-loss/30 bg-loss/5";
  return "border-border bg-card";
}

/**
 * Returns profit (green) or loss (red) color for monetary values.
 */
export function getProfitColor(value: number): string {
  if (value == null || isNaN(value)) return `hsl(0, 0%, 60%)`;
  return value >= 0 ? `hsl(142, 71%, 45%)` : `hsl(0, 72%, 51%)`;
}
