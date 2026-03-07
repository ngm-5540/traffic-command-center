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
 * Returns an HSL color string for ROAS values.
 * -100% (-1) = vivid red, 0% (0) = muted red, +100% (1) = vivid green.
 * Interpolates saturation and lightness for intensity.
 */
export function getRoasColor(roas: number): string {
  if (roas == null || isNaN(roas)) return `hsl(0, 0%, 95%)`;
  const pct = Math.max(-1, Math.min(1, roas));

  if (pct === 0) return `hsl(0, 0%, 95%)`;

  if (pct < 0) {
    const t = Math.abs(pct);
    const s = 30 + t * 42;
    const l = 55 + t * -4;
    return `hsl(0, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
  }

  const t = pct;
  const s = 25 + t * 46;
  const l = 55 + t * -10;
  return `hsl(142, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
}
