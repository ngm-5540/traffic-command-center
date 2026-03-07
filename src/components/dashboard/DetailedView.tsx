import type { Project, ChartDataPoint, RpsDataPoint } from "@/data/mockData";
import { DualAxisChart } from "@/components/dashboard/DualAxisChart";
import { RpsChart } from "@/components/dashboard/RpsChart";
import { NestedPerformanceTable } from "@/components/dashboard/NestedPerformanceTable";

interface DetailedViewProps {
  project: Project;
  chartData: ChartDataPoint[];
  rpsData: RpsDataPoint[];
}

export function DetailedView({ project, chartData, rpsData }: DetailedViewProps) {
  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="mb-1 text-lg font-semibold text-foreground sm:text-xl">{project.name}</h1>
        <p className="text-xs text-muted-foreground sm:text-sm">Visão detalhada do projeto</p>
      </div>

      {/* Charts Row */}
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-5">
        <div className="rounded-lg border border-border bg-card p-3 sm:p-4 lg:col-span-3">
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Custo vs Receita — Últimos 7 dias
          </h3>
          <div className="h-[200px] sm:h-[250px]">
            <DualAxisChart data={chartData} />
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 sm:p-4 lg:col-span-2">
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            RPS por Horário
          </h3>
          <div className="h-[200px] sm:h-[250px]">
            <RpsChart data={rpsData} />
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex flex-col gap-2 border-b border-border p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Tabela de Performance
          </h3>
          <button className="w-full rounded-md border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:w-auto">
            Customizar Colunas
          </button>
        </div>
        <NestedPerformanceTable campaigns={project.campaigns} />
      </div>
    </div>
  );
}
