import { useState, useMemo, useCallback } from "react";
import { format, differenceInCalendarDays, addDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, GitCompareArrows, ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { formatBRL, formatROAS, getRoasColor } from "@/lib/format";
import { ResultadoTotalTab } from "./chatbot/ResultadoTotalTab";
import { AutomacaoTab } from "./chatbot/AutomacaoTab";
import { BroadcastTab } from "./chatbot/BroadcastTab";
import { PopBadge } from "./chatbot/PopBadge";
import {
  chatbotCampaigns,
  chatbotAutomations,
  chatbotBroadcasts,
  fanpageOptions,
  countryOptions,
} from "@/data/chatbotMockData";
import { generatePreviousKpis } from "@/data/popMockData";
import type { DateRange } from "react-day-picker";

const presets: { label: string; getValue: () => DateRange }[] = [
  { label: "Hoje", getValue: () => { const d = new Date(); return { from: d, to: d }; } },
  { label: "Ontem", getValue: () => { const d = new Date(); d.setDate(d.getDate() - 1); return { from: d, to: d }; } },
  { label: "Últimos 7 dias", getValue: () => { const to = new Date(); const from = new Date(); from.setDate(to.getDate() - 6); return { from, to }; } },
  { label: "Últimos 14 dias", getValue: () => { const to = new Date(); const from = new Date(); from.setDate(to.getDate() - 13); return { from, to }; } },
  { label: "Últimos 30 dias", getValue: () => { const to = new Date(); const from = new Date(); from.setDate(to.getDate() - 29); return { from, to }; } },
  { label: "Este mês", getValue: () => { const now = new Date(); return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: now }; } },
  { label: "Mês passado", getValue: () => { const now = new Date(); return { from: new Date(now.getFullYear(), now.getMonth() - 1, 1), to: new Date(now.getFullYear(), now.getMonth(), 0) }; } },
];

export function ChatbotBi() {
  const [fanpage, setFanpage] = useState("all");
  const [country, setCountry] = useState("all");
  const [popEnabled, setPopEnabled] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(dateRange);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

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

  // Aggregate KPIs from campaigns
  const totalCost = chatbotCampaigns.reduce((s, c) => s + c.cost, 0);
  const totalRevenue = chatbotCampaigns.reduce((s, c) => s + c.revenue, 0);
  const totalProfit = totalRevenue - totalCost;
  const avgRoas = chatbotCampaigns.length > 0
    ? chatbotCampaigns.reduce((s, c) => s + c.roas, 0) / chatbotCampaigns.length
    : 0;
  const totalSessions = chatbotCampaigns.reduce((s, c) => s + c.sessions, 0);
  const avgRps = totalSessions > 0 ? totalRevenue / totalSessions : 0;
  const totalLeads = chatbotCampaigns.reduce((s, c) => s + c.leads, 0);
  const avgCostPerLead = totalLeads > 0 ? totalCost / totalLeads : 0;

  const previousKpis = useMemo(
    () => generatePreviousKpis({ totalCost, totalRevenue, totalProfit, avgRoas, avgRps, avgCostPerLead }),
    [totalCost, totalRevenue, totalProfit, avgRoas, avgRps, avgCostPerLead]
  );

  const dateLabel = useMemo(() => {
    if (!dateRange?.from) return "Selecionar período";
    if (!dateRange.to || dateRange.from.toDateString() === dateRange.to.toDateString()) {
      return format(dateRange.from, "dd MMM yyyy", { locale: ptBR });
    }
    return `${format(dateRange.from, "dd MMM", { locale: ptBR })} – ${format(dateRange.to, "dd MMM yyyy", { locale: ptBR })}`;
  }, [dateRange]);

  const kpis = [
    { label: "ROAS", value: formatROAS(avgRoas), color: getRoasColor(avgRoas), tooltip: "Retorno médio sobre investimento", current: avgRoas, previous: previousKpis.avgRoas },
    { label: "LUCRO", value: formatBRL(totalProfit), className: totalProfit >= 0 ? "text-profit" : "text-loss", tooltip: "Receita total menos custo total", current: totalProfit, previous: previousKpis.totalProfit },
    { label: "CUSTO", value: formatBRL(totalCost), tooltip: "Investimento total em ads", current: totalCost, previous: previousKpis.totalCost, invertColor: true },
    { label: "RECEITA", value: formatBRL(totalRevenue), tooltip: "Receita total gerada", current: totalRevenue, previous: previousKpis.totalRevenue },
    { label: "RPS", value: formatBRL(avgRps), tooltip: "Receita por sessão média", current: avgRps, previous: previousKpis.avgRps },
    { label: "C. LEAD", value: formatBRL(avgCostPerLead), tooltip: "Custo médio por lead", current: avgCostPerLead, previous: previousKpis.avgCostPerLead, invertColor: true },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Filters */}
      <div className="sticky top-0 z-10 border-b border-border bg-background px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={fanpage} onValueChange={setFanpage}>
            <SelectTrigger className="h-7 w-[140px] text-[10px] border-border">
              <SelectValue placeholder="Fanpage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">Todas Fanpages</SelectItem>
              {fanpageOptions.map((f) => (
                <SelectItem key={f} value={f} className="text-xs">{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="h-7 w-[120px] text-[10px] border-border">
              <SelectValue placeholder="País" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">Todos Países</SelectItem>
              {countryOptions.map((c) => (
                <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

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
              <PopoverContent className="w-auto p-0" align="start">
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

          <Button
            variant={popEnabled ? "default" : "outline"}
            className={cn(
              "h-7 gap-1.5 px-2.5 text-[10px] font-semibold tracking-wider",
              popEnabled && "bg-primary text-primary-foreground"
            )}
            onClick={() => setPopEnabled((p) => !p)}
          >
            <GitCompareArrows className="h-3 w-3" />
            PoP
          </Button>
        </div>
      </div>

      {/* KPI Bar */}
      <div className="grid grid-cols-3 gap-3 px-4 pt-4 sm:grid-cols-6 sm:px-6">
        {kpis.map((kpi) => (
          <Tooltip key={kpi.label}>
            <TooltipTrigger asChild>
              <div className={cn(
                "rounded-lg border p-3 cursor-help",
                kpi.label === "LUCRO"
                  ? totalProfit >= 0
                    ? "border-profit/30 bg-profit/5"
                    : "border-loss/30 bg-loss/5"
                  : "border-border bg-card"
              )}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-foreground font-semibold">{kpi.label}</span>
                  {popEnabled && (
                    <PopBadge
                      current={kpi.current}
                      previous={kpi.previous}
                      invertColor={kpi.invertColor}
                    />
                  )}
                </div>
                <p
                  className={cn("font-mono text-lg font-bold", kpi.className || (!kpi.color ? "text-foreground" : undefined))}
                  style={kpi.color ? { color: kpi.color } : undefined}
                >
                  {kpi.value}
                </p>
                {popEnabled && (
                  <p className="text-[9px] text-muted-foreground font-mono mt-0.5">
                    ant: {kpi.label === "ROAS" ? formatROAS(kpi.previous) : formatBRL(kpi.previous)}
                  </p>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">{kpi.tooltip}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="resultado" className="flex-1 flex flex-col px-4 pt-4 sm:px-6">
        <TabsList className="w-fit">
          <TabsTrigger value="resultado" className="text-xs">Resultado Total</TabsTrigger>
          <TabsTrigger value="automacao" className="text-xs">Automação</TabsTrigger>
          <TabsTrigger value="broadcast" className="text-xs">Broadcast</TabsTrigger>
        </TabsList>
        <TabsContent value="resultado" className="flex-1 mt-4">
          <ResultadoTotalTab campaigns={chatbotCampaigns} popEnabled={popEnabled} />
        </TabsContent>
        <TabsContent value="automacao" className="flex-1 mt-4">
          <AutomacaoTab automations={chatbotAutomations} popEnabled={popEnabled} />
        </TabsContent>
        <TabsContent value="broadcast" className="flex-1 mt-4">
          <BroadcastTab broadcasts={chatbotBroadcasts} popEnabled={popEnabled} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
