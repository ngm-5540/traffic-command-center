import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChatbotBi } from "@/components/bi/ChatbotBi";
import { GoogleAdsBi } from "@/components/bi/GoogleAdsBi";
import { MetaAdsBi } from "@/components/bi/MetaAdsBi";
import { useRealDashboardData, useProjectCampaigns } from "@/hooks/useRealData";
import type { DateRange } from "react-day-picker";

const verticalConfig: Record<string, { label: string; className: string }> = {
  google_ads: { label: "GOOGLE ADS", className: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30" },
  meta_ads: { label: "META ADS", className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  chatbot: { label: "CHATBOT", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
};

const presets: { label: string; getValue: () => DateRange }[] = [
  { label: "Hoje", getValue: () => { const d = new Date(); return { from: d, to: d }; } },
  { label: "Ontem", getValue: () => { const d = new Date(); d.setDate(d.getDate() - 1); return { from: d, to: d }; } },
  { label: "Últimos 7 dias", getValue: () => { const to = new Date(); const from = new Date(); from.setDate(to.getDate() - 6); return { from, to }; } },
  { label: "Últimos 14 dias", getValue: () => { const to = new Date(); const from = new Date(); from.setDate(to.getDate() - 13); return { from, to }; } },
  { label: "Últimos 30 dias", getValue: () => { const to = new Date(); const from = new Date(); from.setDate(to.getDate() - 29); return { from, to }; } },
  { label: "Este mês", getValue: () => { const now = new Date(); return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: now }; } },
  { label: "Mês passado", getValue: () => { const now = new Date(); return { from: new Date(now.getFullYear(), now.getMonth() - 1, 1), to: new Date(now.getFullYear(), now.getMonth(), 0) }; } },
];

function loadSavedDateRange(): DateRange | undefined {
  try {
    // Only restore saved date if within the same session (not a fresh browser open)
    if (!sessionStorage.getItem("dashboard_session_active")) return undefined;
    const raw = localStorage.getItem("dashboard_filters");
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (parsed.dateRange) {
      return {
        from: new Date(parsed.dateRange.from),
        to: parsed.dateRange.to ? new Date(parsed.dateRange.to) : undefined,
      };
    }
  } catch {}
  return undefined;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    loadSavedDateRange() ?? presets[0].getValue()
  );

  const realData = useRealDashboardData(dateRange);
  const project = realData.projects.find((p) => p.id === id);

  const campaignData = useProjectCampaigns(id, dateRange);

  if (!project && !realData.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-muted-foreground">Projeto não encontrado</p>
        <Button variant="outline" onClick={() => navigate("/")}>Voltar</Button>
      </div>
    );
  }

  const vc = project ? verticalConfig[project.vertical] : null;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-sm font-semibold text-foreground truncate">{project?.name || "..."}</h1>
          {vc && (
            <Badge variant="outline" className={cn("text-[10px] shrink-0", vc.className)}>
              {vc.label}
            </Badge>
          )}
        </div>
      </header>

      {/* BI Content */}
      <div className="flex-1 overflow-hidden min-h-0">
        {(!project || project.vertical === "chatbot") && (
          <ChatbotBi
            project={project}
            campaigns={campaignData.campaigns}
            isLoading={campaignData.isLoading || realData.isLoading}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        )}
        {project?.vertical === "google_ads" && <GoogleAdsBi />}
        {project?.vertical === "meta_ads" && <MetaAdsBi />}
      </div>
    </div>
  );
}
