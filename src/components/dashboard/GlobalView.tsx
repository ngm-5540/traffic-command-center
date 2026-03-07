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

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/30 sm:p-4"
          >
            <div className="mb-2 flex items-center justify-between sm:mb-3">
              <h3 className="text-xs font-semibold text-foreground sm:text-sm">{project.name}</h3>
              <span className="font-mono text-[9px] uppercase text-muted-foreground">#{project.uuid}</span>
            </div>

            {/* Linha 1: Lucro + ROAS */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
              <div className="min-w-0">
                <p className="text-[8px] uppercase tracking-wider text-muted-foreground sm:text-[9px]">Lucro</p>
                <p className={`truncate text-xs font-bold sm:text-sm ${project.profit >= 0 ? "text-profit" : "text-loss"}`}>
                  {fmt(project.profit)}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-[8px] uppercase tracking-wider text-muted-foreground sm:text-[9px]">ROAS</p>
                <p className="truncate text-xs font-bold text-foreground sm:text-sm">{(project.roas * 100).toFixed(0)}%</p>
              </div>
            </div>

            {/* Linha 2: Custo + Receita */}
            <div className="mt-1.5 grid grid-cols-2 gap-1.5 border-t border-border pt-1.5 sm:mt-2 sm:gap-3 sm:pt-2">
              <div className="min-w-0">
                <p className="text-[8px] uppercase tracking-wider text-muted-foreground sm:text-[9px]">Custo</p>
                <p className="truncate text-[11px] font-semibold text-foreground sm:text-xs">{fmt(project.spend)}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[8px] uppercase tracking-wider text-muted-foreground sm:text-[9px]">Receita</p>
                <p className="truncate text-[11px] font-semibold text-foreground sm:text-xs">{fmt(project.revenue)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}