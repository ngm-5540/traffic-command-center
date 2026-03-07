import { DollarSign, TrendingUp, Percent, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SummaryCardProps {
  title: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  trendColor?: "profit" | "loss";
}

function SummaryCard({ title, value, trend, icon, trendColor = "profit" }: SummaryCardProps) {
  const isPositive = trend >= 0;
  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{title}</p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">{value}</span>
          <Badge
            variant="outline"
            className={`text-[10px] px-1.5 py-0 border-0 ${
              isPositive ? "bg-profit/15 text-profit" : "bg-loss/15 text-loss"
            }`}
          >
            {isPositive ? "+" : ""}{trend}%
          </Badge>
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
  const fmt = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Project Switcher */}
        <div className="flex items-center gap-3">
          <select
            value={selectedProject}
            onChange={(e) => onProjectChange(e.target.value)}
            className="h-9 rounded-md border border-border bg-secondary px-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">Visão Global (Todos)</option>
            {projectOptions.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <SummaryCard
            title="Spend"
            value={fmt(summary.spend)}
            trend={summary.spendTrend}
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            trendColor="loss"
          />
          <SummaryCard
            title="Revenue"
            value={fmt(summary.revenue)}
            trend={summary.revenueTrend}
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
          <SummaryCard
            title="Profit"
            value={fmt(summary.profit)}
            trend={summary.profitTrend}
            icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
          />
          <SummaryCard
            title="ROAS"
            value={summary.roas.toFixed(2)}
            trend={summary.roasTrend}
            icon={<Percent className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </div>
    </header>
  );
}
