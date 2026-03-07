import { useState, useMemo } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, ArrowUpDown, Plus } from "lucide-react";
import { dashboardProjects, verticals, type Vertical } from "@/data/dashboardData";
import { formatBRL, formatROAS } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

type SortKey = "name" | "profit" | "spend" | "revenue" | "roas";
type SortDir = "asc" | "desc";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "name", label: "Nome" },
  { key: "profit", label: "Lucro" },
  { key: "spend", label: "Custo" },
  { key: "revenue", label: "Receita" },
  { key: "roas", label: "ROAS" },
];

const presets: { label: string; getValue: () => DateRange }[] = [
  { label: "Hoje", getValue: () => { const d = new Date(); return { from: d, to: d }; } },
  { label: "Ontem", getValue: () => { const d = new Date(); d.setDate(d.getDate() - 1); return { from: d, to: d }; } },
  { label: "Últimos 7 dias", getValue: () => { const to = new Date(); const from = new Date(); from.setDate(to.getDate() - 6); return { from, to }; } },
  { label: "Últimos 14 dias", getValue: () => { const to = new Date(); const from = new Date(); from.setDate(to.getDate() - 13); return { from, to }; } },
  { label: "Últimos 30 dias", getValue: () => { const to = new Date(); const from = new Date(); from.setDate(to.getDate() - 29); return { from, to }; } },
  { label: "Este mês", getValue: () => { const now = new Date(); return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: now }; } },
  { label: "Mês passado", getValue: () => { const now = new Date(); return { from: new Date(now.getFullYear(), now.getMonth() - 1, 1), to: new Date(now.getFullYear(), now.getMonth(), 0) }; } },
];

export default function Dashboard() {
  const [activeVertical, setActiveVertical] = useState<Vertical>("todos");
  const [sortKey, setSortKey] = useState<SortKey>("profit");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => presets[0].getValue());

  const verticalConfig: Record<string, { label: string; className: string }> = {
    google_ads: { label: "GOOGLE ADS", className: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30" },
    meta_ads: { label: "META ADS", className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
    chatbot: { label: "CHATBOT", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  };

  const sorted = useMemo(() => {
    const base = activeVertical === "todos"
      ? [...dashboardProjects]
      : dashboardProjects.filter((p) => p.vertical === activeVertical);

    base.sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortKey === "name") return mul * a.name.localeCompare(b.name, "pt-BR");
      return mul * (a[sortKey] - b[sortKey]);
    });

    return base;
  }, [activeVertical, sortKey, sortDir]);

  const kpis = useMemo(() => {
    const totalSpend = sorted.reduce((s, p) => s + p.spend, 0);
    const totalRevenue = sorted.reduce((s, p) => s + p.revenue, 0);
    const totalProfit = sorted.reduce((s, p) => s + p.profit, 0);
    const avgRoas = sorted.length ? sorted.reduce((s, p) => s + p.roas, 0) / sorted.length : 0;
    return { totalSpend, totalRevenue, totalProfit, avgRoas };
  }, [sorted]);

  const toggleSortDir = () => setSortDir((d) => (d === "asc" ? "desc" : "asc"));

  const dateLabel = useMemo(() => {
    if (!dateRange?.from) return "Selecionar período";
    if (!dateRange.to || dateRange.from.toDateString() === dateRange.to.toDateString()) {
      return format(dateRange.from, "dd MMM yyyy", { locale: ptBR });
    }
    return `${format(dateRange.from, "dd MMM", { locale: ptBR })} – ${format(dateRange.to, "dd MMM yyyy", { locale: ptBR })}`;
  }, [dateRange]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background">
        <div className="relative flex items-center justify-center px-4 py-2.5 sm:px-6">
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

          <Button size="sm" className="absolute right-4 sm:right-6 h-7 gap-1.5 text-[11px] font-semibold tracking-wider">
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Novo Projeto</span>
          </Button>
          
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 px-4 pt-4 sm:grid-cols-4 sm:px-6 max-w-[1920px] mx-auto w-full">
        {[
          { label: "CUSTO", value: formatBRL(kpis.totalSpend) },
          { label: "RECEITA", value: formatBRL(kpis.totalRevenue) },
          { label: "LUCRO", value: formatBRL(kpis.totalProfit), highlight: true },
          { label: "ROAS", value: formatROAS(kpis.avgRoas) },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className={cn(
              "rounded-lg border p-3 sm:p-4",
              kpi.highlight
                ? kpis.totalProfit >= 0
                  ? "border-profit/30 bg-profit/5"
                  : "border-loss/30 bg-loss/5"
                : "border-border bg-card"
            )}
          >
            <span className="text-[11px] uppercase tracking-wider text-foreground/60 font-medium">{kpi.label}</span>
            <p
              className={cn(
                "font-mono text-lg font-bold sm:text-xl",
                kpi.highlight
                  ? kpis.totalProfit >= 0
                    ? "text-profit"
                    : "text-loss"
                  : "text-foreground"
              )}
            >
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters bar */}
      <div className="flex items-center justify-end gap-2 px-4 pt-4 sm:px-6 max-w-[1920px] mx-auto w-full">
        {/* Sort */}
        <div className="flex items-center gap-1">
          <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
            <SelectTrigger className="h-7 w-[100px] text-[10px] border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((o) => (
                <SelectItem key={o.key} value={o.key} className="text-xs">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleSortDir}>
            <ArrowUpDown className={cn("h-3.5 w-3.5 transition-transform", sortDir === "asc" && "rotate-180")} />
          </Button>
        </div>

        {/* Date picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-7 gap-1.5 px-2.5 text-[10px] font-semibold tracking-wider border-border">
              <CalendarIcon className="h-3 w-3" />
              <span className="hidden sm:inline">{dateLabel}</span>
              <span className="sm:hidden">Data</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <div className="flex">
              <div className="border-r border-border p-2 space-y-0.5 min-w-[140px]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 pb-1">Período</p>
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setDateRange(preset.getValue())}
                    className="w-full rounded px-2 py-1.5 text-left text-xs text-foreground hover:bg-accent transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                locale={ptBR}
                className="p-3 pointer-events-auto"
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="grid gap-4 max-w-[1920px] mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {sorted.map((project) => {
            const isProfit = project.profit >= 0;

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
                  <h3 className="text-sm font-semibold text-foreground truncate pr-2" title={project.name}>
                    {project.name}
                  </h3>
                  <Badge variant="outline" className={cn("text-[10px] shrink-0", verticalConfig[project.vertical]?.className)}>
                    {verticalConfig[project.vertical]?.label}
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
      <span className="text-[11px] uppercase tracking-wider text-foreground/60 font-medium">{label}</span>
      <p className={cn("font-mono text-sm whitespace-nowrap", bold ? "font-bold" : "font-medium", className || "text-foreground")}>
        {value}
      </p>
    </div>
  );
}
