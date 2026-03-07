import { TrendingUp, DollarSign } from "lucide-react";
import type { Project } from "@/data/mockData";

interface GlobalViewProps {
  projects: Project[];
}

export function GlobalView({ projects }: GlobalViewProps) {
  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <h1 className="mb-1 text-base font-semibold text-foreground sm:text-xl">Visão Global</h1>
      <p className="mb-4 text-[11px] text-muted-foreground sm:mb-6 sm:text-sm">Todos os projetos ativos</p>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30 sm:p-5"
          >
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <h3 className="text-sm font-semibold text-foreground">{project.name}</h3>
              <span className="font-mono text-[10px] uppercase text-muted-foreground">#{project.uuid}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">Lucro Hoje</p>
                <p className={`text-sm font-bold sm:text-lg ${project.profit >= 0 ? "text-profit" : "text-loss"}`}>
                  R$ {project.profit.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">ROAS</p>
                <p className="text-sm font-bold text-foreground sm:text-lg">{(project.roas * 100).toFixed(0)}%</p>
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-1 border-t border-border pt-2 text-[11px] text-muted-foreground sm:mt-4 sm:flex-row sm:items-center sm:gap-4 sm:pt-3 sm:text-xs">
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
