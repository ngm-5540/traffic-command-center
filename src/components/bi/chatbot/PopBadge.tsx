import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PopBadgeProps {
  current: number;
  previous: number;
  invertColor?: boolean; // true = lower is better (e.g. cost)
  className?: string;
}

export function PopBadge({ current, previous, invertColor = false, className }: PopBadgeProps) {
  if (previous == null || previous === 0 || isNaN(previous) || isNaN(current)) {
    return <span className={cn("text-[9px] text-muted-foreground", className)}>—</span>;
  }

  const pctChange = ((current - previous) / Math.abs(previous)) * 100;
  const isPositive = pctChange > 0;
  const isNeutral = Math.abs(pctChange) < 0.5;

  const goodDirection = invertColor ? !isPositive : isPositive;

  if (isNeutral) {
    return (
      <span className={cn("inline-flex items-center gap-0.5 text-[9px] text-muted-foreground", className)}>
        <Minus className="h-2.5 w-2.5" />
        0%
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-[9px] font-semibold",
        goodDirection ? "text-profit" : "text-loss",
        className
      )}
    >
      {isPositive ? (
        <TrendingUp className="h-2.5 w-2.5" />
      ) : (
        <TrendingDown className="h-2.5 w-2.5" />
      )}
      {isPositive ? "+" : ""}
      {pctChange.toFixed(1)}%
    </span>
  );
}

/** Generate a "previous period" value by applying random variance */
export function mockPreviousValue(current: number, variance = 0.3): number {
  const multiplier = 1 + (Math.random() - 0.5) * 2 * variance;
  return current * multiplier;
}
