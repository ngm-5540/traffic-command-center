import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
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
import {
  chatbotCampaigns,
  chatbotAutomations,
  chatbotBroadcasts,
  fanpageOptions,
  countryOptions,
} from "@/data/chatbotMockData";
import type { DateRange } from "react-day-picker";

export function ChatbotBi() {
  const [fanpage, setFanpage] = useState("all");
  const [country, setCountry] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });

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

  const dateLabel = dateRange?.from
    ? dateRange.to && dateRange.from.toDateString() !== dateRange.to.toDateString()
      ? `${format(dateRange.from, "dd MMM", { locale: ptBR })} – ${format(dateRange.to, "dd MMM yyyy", { locale: ptBR })}`
      : format(dateRange.from, "dd MMM yyyy", { locale: ptBR })
    : "Período";

  const kpis = [
    { label: "ROAS", value: formatROAS(avgRoas), color: getRoasColor(avgRoas), tooltip: "Retorno médio sobre investimento" },
    { label: "LUCRO", value: formatBRL(totalProfit), className: totalProfit >= 0 ? "text-profit" : "text-loss", tooltip: "Receita total menos custo total" },
    { label: "CUSTO", value: formatBRL(totalCost), tooltip: "Investimento total em ads" },
    { label: "RECEITA", value: formatBRL(totalRevenue), tooltip: "Receita total gerada" },
    { label: "RPS", value: formatBRL(avgRps), tooltip: "Receita por sessão média" },
    { label: "C. LEAD", value: formatBRL(avgCostPerLead), tooltip: "Custo médio por lead" },
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

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-7 gap-1.5 px-2.5 text-[10px] font-semibold tracking-wider border-border">
                <CalendarIcon className="h-3 w-3" />
                {dateLabel}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                locale={ptBR}
                disabled={(date) => date > new Date()}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
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
                <span className="text-[10px] uppercase tracking-wider text-foreground font-semibold">{kpi.label}</span>
                <p
                  className={cn("font-mono text-lg font-bold", kpi.className || (!kpi.color ? "text-foreground" : undefined))}
                  style={kpi.color ? { color: kpi.color } : undefined}
                >
                  {kpi.value}
                </p>
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
          <ResultadoTotalTab campaigns={chatbotCampaigns} />
        </TabsContent>
        <TabsContent value="automacao" className="flex-1 mt-4">
          <AutomacaoTab automations={chatbotAutomations} />
        </TabsContent>
        <TabsContent value="broadcast" className="flex-1 mt-4">
          <BroadcastTab broadcasts={chatbotBroadcasts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
