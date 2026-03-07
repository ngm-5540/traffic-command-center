import { DollarSign, TrendingUp, Percent, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SummaryCardProps {
  title: string;
  value: React.ReactNode;
  trend: number;
  icon: React.ReactNode;
  trendColor?: "profit" | "loss";
}

function SummaryCard({ title, value, trend, icon, trendColor = "profit" }: SummaryCardProps) {
  const isPositive = trend >= 0;
  return (
    <div className="rounded-md border border-border bg-card px-2 py-1.5 sm:px-4 sm:py-3">
      <div className="flex items-center gap-1.5 sm:gap-3">
        <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary sm:flex">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[8px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">{title}</p>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="whitespace-nowrap text-[11px] font-semibold leading-tight text-foreground sm:text-lg">{value}</span>
            <Badge
              variant="outline"
              className={`hidden shrink-0 text-[8px] px-1 py-0 border-0 sm:inline-flex sm:text-[10px] sm:px-1.5 ${
                isPositive ? "bg-profit/15 text-profit" : "bg-loss/15 text-loss"
              }`}
            >
              {isPositive ? "+" : ""}{trend}%
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StickyHeaderProps {
  selectedProject: string;
  onProjectChange: (value: string) => void;
  summary: {
    spend: number;
    revenue: number;
    profit: number;
    roas: number;
    spendTrend: number;
    revenueTrend: number;
    profitTrend: number;
    roasTrend: number;
  };
  projectOptions: { id: string; name: string }[];
}

export function StickyHeader({ selectedProject, onProjectChange, summary, projectOptions }: StickyHeaderProps) {
  const fmtFull = (v: number) =>
    `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const fmtCompact = (v: number) =>
    `R$ ${v.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex flex-col gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Project Switcher */}
        <div className="flex items-center gap-3">
          <select
            value={selectedProject}
            onChange={(e) => onProjectChange(e.target.value)}
            className="h-9 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring sm:w-auto"
          >
            <option value="all">Visão Global (Todos)</option>
            {projectOptions.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 lg:grid-cols-4">
          <SummaryCard
            title="Custo"
            value={
              <>
                <span className="sm:hidden">{fmtCompact(summary.spend)}</span>
                <span className="hidden sm:inline">{fmtFull(summary.spend)}</span>
              </>
            }
            trend={summary.spendTrend}
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            trendColor="loss"
          />
          <SummaryCard
            title="Receita"
            value={
              <>
                <span className="sm:hidden">{fmtCompact(summary.revenue)}</span>
                <span className="hidden sm:inline">{fmtFull(summary.revenue)}</span>
              </>
            }
            trend={summary.revenueTrend}
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
          <SummaryCard
            title="Lucro"
            value={
              <>
                <span className="sm:hidden">{fmtCompact(summary.profit)}</span>
                <span className="hidden sm:inline">{fmtFull(summary.profit)}</span>
              </>
            }
            trend={summary.profitTrend}
            icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
          />
          <SummaryCard
            title="ROAS"
            value={`${(summary.roas * 100).toFixed(0)}%`}
            trend={summary.roasTrend}
            icon={<Percent className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </div>
    </header>
  );
}
