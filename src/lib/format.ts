export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

export function formatROAS(value: number): string {
  return `${(value * 100).toFixed(0)}%`;
}

/**
 * Returns an HSL color string for ROAS values.
 * -100% (-1) = vivid red, 0% (0) = muted red, +100% (1) = vivid green.
 * Interpolates saturation and lightness for intensity.
 */
export function getRoasColor(roas: number): string {
  const pct = Math.max(-1, Math.min(1, roas));

  if (pct <= 0) {
    // 0 → muted red, -1 → vivid red
    const t = Math.abs(pct); // 0..1
    const s = 50 + t * 22;   // 50%..72%
    const l = 40 + t * 11;   // 40%..51%
    return `hsl(0, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
  }

  // 0+ → muted green, 1 → vivid green
  const t = pct; // 0..1
  const s = 40 + t * 31;   // 40%..71%
  const l = 35 + t * 10;   // 35%..45%
  return `hsl(142, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`;
}
