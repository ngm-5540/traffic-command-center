import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChatbotBi } from "@/components/bi/ChatbotBi";
import { GoogleAdsBi } from "@/components/bi/GoogleAdsBi";
import { MetaAdsBi } from "@/components/bi/MetaAdsBi";
import { useRealDashboardData } from "@/hooks/useRealData";

const verticalConfig: Record<string, { label: string; className: string }> = {
  google_ads: { label: "GOOGLE ADS", className: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30" },
  meta_ads: { label: "META ADS", className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  chatbot: { label: "CHATBOT", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Try localStorage first, then default
  let projects = dashboardProjects;
  try {
    const raw = localStorage.getItem("dashboard_projects");
    if (raw) projects = JSON.parse(raw);
  } catch {}

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-muted-foreground">Projeto não encontrado</p>
        <Button variant="outline" onClick={() => navigate("/")}>Voltar</Button>
      </div>
    );
  }

  const vc = verticalConfig[project.vertical];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-sm font-semibold text-foreground truncate">{project.name}</h1>
          {vc && (
            <Badge variant="outline" className={cn("text-[10px] shrink-0", vc.className)}>
              {vc.label}
            </Badge>
          )}
        </div>
      </header>

      {/* BI Content */}
      <div className="flex-1 overflow-auto">
        {project.vertical === "chatbot" && <ChatbotBi />}
        {project.vertical === "google_ads" && <GoogleAdsBi />}
        {project.vertical === "meta_ads" && <MetaAdsBi />}
      </div>
    </div>
  );
}
