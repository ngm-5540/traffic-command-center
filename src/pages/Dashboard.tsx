import { useState, useMemo } from "react";
import { dashboardProjects, verticals, periods, type Vertical, type Period } from "@/data/dashboardData";
import { formatBRL, formatROAS } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Status still used for card background logic

export default function Dashboard() {
  const [activeVertical, setActiveVertical] = useState<Vertical>("google_ads");
  const [activePeriod, setActivePeriod] = useState<Period>("hoje");

  const filtered = useMemo(
    () => dashboardProjects.filter((p) => p.vertical === activeVertical),
    [activeVertical]
  );

  const kpis = useMemo(() => {
    const totalSpend = filtered.reduce((s, p) => s + p.spend, 0);
    const totalRevenue = filtered.reduce((s, p) => s + p.revenue, 0);
    const totalProfit = filtered.reduce((s, p) => s + p.profit, 0);
    const avgRoas = filtered.length ? filtered.reduce((s, p) => s + p.roas, 0) / filtered.length : 0;
    return { totalSpend, totalRevenue, totalProfit, avgRoas };
  }, [filtered]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background">
        <div className="flex items-center justify-between px-4 py-2.5 sm:px-6">
          {/* Vertical selector */}
          <nav className="flex gap-6">
            {verticals.map((v) => (
              <button
                key={v.key}
                onClick={() => setActiveVertical(v.key)}
                className={cn(
                  "pb-1 text-xs font-medium tracking-wider transition-colors",
                  activeVertical === v.key
                    ? "border-b-2 border-primary text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {v.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="flex gap-1 rounded-md border border-border p-0.5">
              {periods.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setActivePeriod(p.key)}
                  className={cn(
                    "rounded px-2.5 py-1 text-[10px] font-semibold tracking-wider transition-colors",
                    activePeriod === p.key
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <span className="hidden text-xs text-muted-foreground sm:inline">Usuário</span>
          </div>
        </div>

        {/* KPI bar */}
        <div className="flex items-center gap-6 border-t border-border/50 px-4 py-2 sm:gap-10 sm:px-6">
          {[
            { label: "TOTAL SPEND", value: formatBRL(kpis.totalSpend) },
            { label: "TOTAL REVENUE", value: formatBRL(kpis.totalRevenue) },
            { label: "TOTAL PROFIT", value: formatBRL(kpis.totalProfit), highlight: true },
            { label: "AVG ROAS", value: formatROAS(kpis.avgRoas) },
          ].map((kpi) => (
            <div key={kpi.label} className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
              <span
                className={cn(
                  "font-mono text-sm font-semibold",
                  kpi.highlight
                    ? kpis.totalProfit >= 0
                      ? "text-profit"
                      : "text-loss"
                    : "text-foreground"
                )}
              >
                {kpi.value}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* Grid */}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((project) => {
            const isProfit = project.profit >= 0;
            const status = statusConfig[project.status];

            return (
              <div
                key={project.id}
                className={cn(
                  "rounded-lg border p-4 transition-all",
                  isProfit
                    ? "border-border bg-card"
                    : "border-loss/30 bg-loss/5"
                )}
              >
                {/* Card header */}
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground truncate pr-2">
                    {project.name}
                  </h3>
                  <Badge variant="outline" className="text-[10px] shrink-0 bg-accent/50 text-accent-foreground border-border">
                    {project.type}
                  </Badge>
                </div>

                {/* Desktop: 2x2 grid */}
                <div className="hidden sm:grid grid-cols-2 gap-x-4 gap-y-2">
                  <Metric label="RECEITA" value={formatBRL(project.revenue)} />
                  <Metric label="CUSTO" value={formatBRL(project.spend)} />
                  <Metric
                    label="LUCRO"
                    value={formatBRL(project.profit)}
                    className={isProfit ? "text-profit" : "text-loss"}
                    bold
                  />
                  <Metric label="ROAS" value={formatROAS(project.roas)} />
                </div>

                {/* Mobile: compact layout */}
                <div className="sm:hidden space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">LUCRO</span>
                      <p className={cn("font-mono text-lg font-bold", isProfit ? "text-profit" : "text-loss")}>
                        {formatBRL(project.profit)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">ROAS</span>
                      <p className="font-mono text-lg font-bold text-foreground">{formatROAS(project.roas)}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-muted-foreground">
                    <span className="font-mono text-xs">R: {formatBRL(project.revenue)}</span>
                    <span className="font-mono text-xs">C: {formatBRL(project.spend)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, className, bold }: { label: string; value: string; className?: string; bold?: boolean }) {
  return (
    <div>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <p className={cn("font-mono text-sm", bold ? "font-bold" : "font-medium", className || "text-foreground")}>
        {value}
      </p>
    </div>
  );
}
