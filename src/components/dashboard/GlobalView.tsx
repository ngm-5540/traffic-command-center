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
        {projects.map((project) => {
          const isProfit = project.profit >= 0;
          const maxVal = Math.max(project.spend, project.revenue);
          const spendPct = maxVal > 0 ? (project.spend / maxVal) * 100 : 0;
          const revenuePct = maxVal > 0 ? (project.revenue / maxVal) * 100 : 0;

          return (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
              style={{
                borderLeftWidth: "3px",
                borderLeftColor: isProfit ? "hsl(var(--profit))" : "hsl(var(--loss))",
              }}
            >
              {/* Gradient overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  background: `linear-gradient(135deg, ${isProfit ? "hsl(var(--profit))" : "hsl(var(--loss))"} 0%, transparent 60%)`,
                }}
              />

              <div className="relative p-3 sm:p-4">
                {/* Header: Nome + UUID + Status dot */}
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: project.status === "active" ? "hsl(var(--profit))" : "hsl(var(--muted-foreground))",
                    }}
                  />
                  <h3 className="text-sm font-semibold text-foreground sm:text-base">{project.name}</h3>
                  <span className="ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[9px] uppercase text-muted-foreground">
                    #{project.uuid}
                  </span>
                </div>

                {/* Métrica principal: Lucro + ROAS pill */}
                <div className="mb-3 flex items-baseline gap-2">
                  <p
                    className="whitespace-nowrap text-lg font-bold sm:text-xl"
                    style={{ color: isProfit ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
                  >
                    {fmt(project.profit)}
                  </p>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      backgroundColor: isProfit ? "hsl(var(--profit) / 0.15)" : "hsl(var(--loss) / 0.15)",
                      color: isProfit ? "hsl(var(--profit))" : "hsl(var(--loss))",
                    }}
                  >
                    {(project.roas * 100).toFixed(0)}% ROAS
                  </span>
                </div>

                {/* Custo bar */}
                <div className="mb-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Custo</span>
                    <span className="whitespace-nowrap font-mono text-[11px] font-medium text-foreground">{fmt(project.spend)}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${spendPct}%`,
                        backgroundColor: "hsl(var(--muted-foreground) / 0.5)",
                      }}
                    />
                  </div>
                </div>

                {/* Receita bar */}
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Receita</span>
                    <span className="whitespace-nowrap font-mono text-[11px] font-medium text-foreground">{fmt(project.revenue)}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${revenuePct}%`,
                        backgroundColor: "hsl(var(--profit) / 0.7)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
