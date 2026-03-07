import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { format, differenceInCalendarDays, addDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, ArrowUp, ArrowDown, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { dashboardProjects as defaultProjects, verticals, type Vertical, type DashboardProject } from "@/data/dashboardData";
import { formatBRL, formatROAS, getRoasColor } from "@/lib/format";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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

function loadSavedProjects(): DashboardProject[] | null {
  try {
    const raw = localStorage.getItem("dashboard_projects");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveProjects(projects: DashboardProject[]) {
  localStorage.setItem("dashboard_projects", JSON.stringify(projects));
}

function loadSavedFilters() {
  try {
    const raw = localStorage.getItem("dashboard_filters");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      vertical: parsed.vertical as Vertical,
      sortKey: parsed.sortKey as SortKey,
      sortDir: parsed.sortDir as SortDir,
      dateRange: parsed.dateRange
        ? {
            from: new Date(parsed.dateRange.from),
            to: parsed.dateRange.to ? new Date(parsed.dateRange.to) : undefined,
          }
        : undefined,
    };
  } catch {
    return null;
  }
}

function saveFilters(filters: { vertical: Vertical; sortKey: SortKey; sortDir: SortDir; dateRange: DateRange | undefined }) {
  localStorage.setItem(
    "dashboard_filters",
    JSON.stringify({
      vertical: filters.vertical,
      sortKey: filters.sortKey,
      sortDir: filters.sortDir,
      dateRange: filters.dateRange
        ? { from: filters.dateRange.from?.toISOString(), to: filters.dateRange.to?.toISOString() }
        : null,
    })
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const saved = useMemo(() => loadSavedFilters(), []);
  const [projects, setProjects] = useState<DashboardProject[]>(() => loadSavedProjects() ?? defaultProjects);
  const [activeVertical, setActiveVertical] = useState<Vertical>(saved?.vertical ?? "todos");
  const [sortKey, setSortKey] = useState<SortKey>(saved?.sortKey ?? "profit");
  const [sortDir, setSortDir] = useState<SortDir>(saved?.sortDir ?? "desc");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(saved?.dateRange ?? presets[0].getValue());
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(saved?.dateRange ?? presets[0].getValue());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newestProjectId, setNewestProjectId] = useState<string | null>(null);

  const handleCreateProject = useCallback((project: DashboardProject) => {
    setProjects((prev) => {
      const next = [project, ...prev];
      saveProjects(next);
      return next;
    });
    setNewestProjectId(project.id);
  }, []);

  // Persist filters on change
  useMemo(() => {
    saveFilters({ vertical: activeVertical, sortKey, sortDir, dateRange });
  }, [activeVertical, sortKey, sortDir, dateRange]);

  const verticalConfig: Record<string, { label: string; className: string }> = {
    google_ads: { label: "GOOGLE ADS", className: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30" },
    meta_ads: { label: "META ADS", className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
    chatbot: { label: "CHATBOT", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  };

  const sorted = useMemo(() => {
    const base = activeVertical === "todos"
      ? [...projects]
      : projects.filter((p) => p.vertical === activeVertical);

    base.sort((a, b) => {
      // Keep newest project at the top
      if (newestProjectId) {
        if (a.id === newestProjectId) return -1;
        if (b.id === newestProjectId) return 1;
      }
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortKey === "name") return mul * a.name.localeCompare(b.name, "pt-BR");
      return mul * (a[sortKey] - b[sortKey]);
    });

    return base;
  }, [activeVertical, sortKey, sortDir, projects, newestProjectId]);

  const kpis = useMemo(() => {
    const totalSpend = sorted.reduce((s, p) => s + p.spend, 0);
    const totalRevenue = sorted.reduce((s, p) => s + p.revenue, 0);
    const totalProfit = sorted.reduce((s, p) => s + p.profit, 0);
    const avgRoas = sorted.length ? sorted.reduce((s, p) => s + p.roas, 0) / sorted.length : 0;
    const totalSessions = sorted.reduce((s, p) => s + p.sessions, 0);
    const totalLeads = sorted.reduce((s, p) => s + p.leads, 0);
    const avgRps = totalSessions > 0 ? totalRevenue / totalSessions : 0;
    const avgCps = totalLeads > 0 ? totalSpend / totalLeads : 0;
    return { totalSpend, totalRevenue, totalProfit, avgRoas, avgRps, avgCps };
  }, [sorted]);

  const toggleSortDir = () => { setNewestProjectId(null); setSortDir((d) => (d === "asc" ? "desc" : "asc")); };

  const shiftDateRange = useCallback((direction: 1 | -1) => {
    if (!dateRange?.from) return;
    const to = dateRange.to ?? dateRange.from;
    const span = differenceInCalendarDays(to, dateRange.from) + 1;
    const shiftDays = span * direction;
    setDateRange({
      from: direction === 1 ? addDays(dateRange.from, shiftDays) : subDays(dateRange.from, Math.abs(shiftDays)),
      to: direction === 1 ? addDays(to, shiftDays) : subDays(to, Math.abs(shiftDays)),
    });
  }, [dateRange]);

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
        <div className="relative flex items-center justify-center px-4 py-3.5 sm:px-6">
          {/* Vertical selector */}
          <nav className="flex gap-8">
            {verticals.map((v) => (
              <button
                key={v.key}
                onClick={() => setActiveVertical(v.key)}
                className={cn(
                  "pb-1.5 text-sm font-medium tracking-wider transition-colors",
                  activeVertical === v.key
                    ? "border-b-2 border-primary text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {v.label}
              </button>
            ))}
          </nav>

          <Button variant="outline" size="sm" className="absolute right-4 sm:right-6 h-8 gap-1.5 text-xs font-semibold tracking-wider border-border text-foreground hover:bg-accent" onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Projeto</span>
          </Button>
          
        </div>
      </header>

      {/* KPI Cards */}
      <div
        className="grid gap-2 px-4 pt-4 sm:gap-3 sm:px-6 max-w-[1920px] mx-auto w-full"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
      >
        {[
          { label: "CUSTO", value: formatBRL(kpis.totalSpend), tooltip: "Investimento total em ads" },
          { label: "RECEITA", value: formatBRL(kpis.totalRevenue), tooltip: "Receita total gerada" },
          { label: "LUCRO", value: formatBRL(kpis.totalProfit), isProfit: true, profitValue: kpis.totalProfit, tooltip: "Receita total menos custo total" },
          { label: "ROAS", value: formatROAS(kpis.avgRoas), isRoas: true, isRoasPositive: kpis.avgRoas >= 1, isRoasCritical: kpis.avgRoas === -1, roasColor: getRoasColor(kpis.avgRoas), tooltip: "Retorno médio sobre investimento" },
          { label: "RPS", value: formatBRL(kpis.avgRps), tooltip: "Receita por sessão média" },
          { label: "CPS", value: formatBRL(kpis.avgCps), tooltip: "Custo médio por lead" },
        ].map((kpi) => (
            <Tooltip key={kpi.label}>
              <TooltipTrigger asChild>
                <div style={{ containerType: "inline-size" }}>
                  <div
                    className={cn(
                      "rounded-lg border min-w-0 p-2.5 sm:p-3 md:p-4 cursor-help",
                      kpi.isRoas
                        ? kpi.isRoasPositive
                          ? "border-profit/30 bg-profit/5"
                          : kpi.isRoasCritical
                            ? "border-loss/30 bg-loss/5"
                            : "border-border bg-card"
                        : "border-border bg-card"
                    )}
                  >
                    <span
                      className="uppercase tracking-wider text-foreground font-semibold block"
                      style={{ fontSize: "clamp(9px, 7cqw, 12px)" }}
                    >
                      {kpi.label}
                    </span>
                    <p
                      className={cn(
                        "font-mono font-bold whitespace-nowrap leading-tight tracking-tight",
                        kpi.isProfit
                          ? kpi.profitValue === 0 ? "text-foreground" : kpi.profitValue! > 0 ? "text-profit" : "text-loss"
                          : !kpi.isRoas ? "text-foreground" : undefined
                      )}
                      style={{
                        fontSize: "clamp(10px, 10cqw, 20px)",
                        ...(kpi.isRoas ? { color: kpi.roasColor } : {}),
                      }}
                    >
                      {kpi.value}
                    </p>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">{kpi.tooltip}</TooltipContent>
            </Tooltip>
          ))}
      </div>

      {/* Filters bar */}
      <div className="flex items-center justify-end gap-2 px-4 pt-4 sm:px-6 max-w-[1920px] mx-auto w-full">
        {/* Sort */}
        <div className="flex items-center gap-1">
          <Select value={sortKey} onValueChange={(v) => { setNewestProjectId(null); setSortKey(v as SortKey); }}>
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
            {sortDir === "desc" ? (
              <ArrowDown className="h-3.5 w-3.5 transition-transform" />
            ) : (
              <ArrowUp className="h-3.5 w-3.5 transition-transform" />
            )}
          </Button>
        </div>

        {/* Date picker with navigation */}
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => shiftDateRange(-1)}>
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Popover open={datePickerOpen} onOpenChange={(open) => {
            setDatePickerOpen(open);
            if (open) setTempDateRange(dateRange);
          }}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-7 gap-1.5 px-2.5 text-[10px] font-semibold tracking-wider border-border">
                <CalendarIcon className="h-3 w-3" />
                <span className="hidden sm:inline">{dateLabel}</span>
                <span className="sm:hidden">Data</span>
              </Button>
            </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <div className="flex">
              <div className="border-r border-border p-2 space-y-0.5 w-[120px]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 pb-1">Período</p>
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setDateRange(preset.getValue());
                      setDatePickerOpen(false);
                    }}
                    className="w-full rounded px-2 py-1.5 text-left text-xs text-foreground hover:bg-accent transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-col">
                <Calendar
                  mode="range"
                  selected={tempDateRange}
                  onSelect={setTempDateRange}
                  numberOfMonths={2}
                  locale={ptBR}
                  disabled={(date) => date > new Date()}
                  className="p-3 pointer-events-auto"
                />
                {tempDateRange?.from && (
                  tempDateRange.from.toDateString() !== dateRange?.from?.toDateString() ||
                  (tempDateRange.to?.toDateString() ?? '') !== (dateRange?.to?.toDateString() ?? '')
                ) && (
                  <div className="flex justify-end p-2 pt-0">
                    <Button
                      size="sm"
                      className="h-7 text-[11px] font-semibold tracking-wider"
                      onClick={() => {
                        setDateRange(tempDateRange);
                        setDatePickerOpen(false);
                      }}
                    >
                      Aplicar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={dateRange?.to ? dateRange.to >= new Date(new Date().toDateString()) : false}
            onClick={() => shiftDateRange(1)}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="grid gap-4 max-w-[1920px] mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {sorted.map((project) => {
            const isProfit = project.profit >= 0;

            return (
              <div
                key={project.id}
                style={{ containerType: "inline-size" }}
              >
                <div
                  onClick={() => navigate(`/project/${project.id}`)}
                  className={cn(
                    "rounded-lg border p-3 sm:p-4 transition-all cursor-pointer hover:ring-1 hover:ring-primary/30",
                    project.roas >= 1
                      ? "border-profit/30 bg-profit/5"
                      : project.roas === -1
                        ? "border-loss/20 bg-loss/5"
                        : "border-border bg-card"
                  )}
                >
                  {/* Card header */}
                  <div className="mb-3 flex items-center justify-between">
                    <ProjectName name={project.name} id={project.id} />
                    <Badge
                      variant="outline"
                      className={cn("shrink-0", verticalConfig[project.vertical]?.className)}
                      style={{ fontSize: "clamp(8px, 4cqw, 10px)" }}
                    >
                      {verticalConfig[project.vertical]?.label}
                    </Badge>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                    <Metric label="RECEITA" value={formatBRL(project.revenue)} />
                    <Metric label="CUSTO" value={formatBRL(project.spend)} />
                    <Metric
                      label="LUCRO"
                      value={formatBRL(project.profit)}
                      className={project.profit === 0 ? "text-foreground" : isProfit ? "text-profit" : "text-loss"}
                      bold
                    />
                    <Metric label="ROAS" value={formatROAS(project.roas)} style={{ color: getRoasColor(project.roas) }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CreateProjectDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateProject={handleCreateProject}
        defaultVertical={activeVertical}
        existingProjects={projects}
      />
    </div>
  );
}

function Metric({ label, value, className, bold, style }: { label: string; value: string; className?: string; bold?: boolean; style?: React.CSSProperties }) {
  return (
    <div className="min-w-0 cursor-help" title={`${label}: ${value}`}>
      <span className="uppercase tracking-wider text-foreground/60 font-medium block" style={{ fontSize: "clamp(8px, 4cqw, 11px)" }}>{label}</span>
      <p
        className={cn("font-mono whitespace-nowrap font-bold", !style && (className || "text-foreground"))}
        style={{ fontSize: "clamp(9px, 5cqw, 13px)", ...style }}
      >
        {value}
      </p>
    </div>
  );
}

function ProjectName({ name, id }: { name: string; id: string }) {
  const shortId = `#${id.substring(0, 5)}`;
  return (
    <div className="truncate pr-2 leading-tight" title={`${name} ${shortId}`}>
      <h3
        className="font-semibold text-foreground truncate leading-snug"
        style={{ fontSize: "clamp(11px, 5cqw, 14px)" }}
      >
        {name}
      </h3>
      <span
        className="font-mono text-muted-foreground leading-none"
        style={{ fontSize: "clamp(7px, 3.5cqw, 9px)" }}
      >
        {shortId}
      </span>
    </div>
  );
}
