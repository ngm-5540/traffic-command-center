import { Activity, TrendingUp, DollarSign } from "lucide-react";
import type { Project } from "@/data/mockData";

interface GlobalViewProps {
  projects: Project[];
}

export function GlobalView({ projects }: GlobalViewProps) {
  return (
    <div className="p-4 lg:p-6">
      <h1 className="mb-1 text-xl font-semibold text-foreground">Visão Global</h1>
      <p className="mb-6 text-sm text-muted-foreground">Todos os projetos ativos</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30"
          >
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground">{project.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Lucro Hoje</p>
                <p className={`text-lg font-bold ${project.profit >= 0 ? "text-profit" : "text-loss"}`}>
                  R$ {project.profit.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">ROAS</p>
                <p className="text-lg font-bold text-foreground">{(project.roas * 100).toFixed(0)}%</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                Custo: R$ {project.spend.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Receita: R$ {project.revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
