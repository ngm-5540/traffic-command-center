import type { Project } from "@/data/mockData";

interface GlobalViewProps {
  projects: Project[];
}

const fmt = (v: number) =>
  `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function GlobalView({ projects }: GlobalViewProps) {
  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <h1 className="mb-1 text-base font-semibold text-foreground sm:text-xl">Visão Global</h1>
      <p className="mb-4 text-[11px] text-muted-foreground sm:mb-6 sm:text-sm">Todos os projetos ativos</p>

      <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/30 sm:p-4"
          >
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <h3 className="text-sm font-semibold text-foreground">{project.name}</h3>
              <span className="font-mono text-[10px] uppercase text-muted-foreground">#{project.uuid}</span>
            </div>

            {/* Linha 1: Lucro + ROAS */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">Lucro</p>
                <p className={`text-sm font-bold sm:text-lg ${project.profit >= 0 ? "text-profit" : "text-loss"}`}>
                  {fmt(project.profit)}
                </p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">ROAS</p>
                <p className="text-sm font-bold text-foreground sm:text-lg">{(project.roas * 100).toFixed(0)}%</p>
              </div>
            </div>

            {/* Linha 2: Custo + Receita */}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-2 sm:mt-3 sm:gap-4 sm:pt-3">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">Custo</p>
                <p className="text-xs font-semibold text-foreground sm:text-sm">{fmt(project.spend)}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">Receita</p>
                <p className="text-xs font-semibold text-foreground sm:text-sm">{fmt(project.revenue)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}