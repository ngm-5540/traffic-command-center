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
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="mb-1 text-xl font-semibold text-foreground">{project.name}</h1>
        <p className="text-sm text-muted-foreground">Visão detalhada do projeto</p>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="rounded-lg border border-border bg-card p-4 lg:col-span-3">
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Spend vs Revenue — Últimos 7 dias
          </h3>
          <DualAxisChart data={chartData} />
        </div>
        <div className="rounded-lg border border-border bg-card p-4 lg:col-span-2">
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            RPS por Horário
          </h3>
          <RpsChart data={rpsData} />
        </div>
      </div>

      {/* Performance Table */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Tabela de Performance
          </h3>
          <button className="rounded-md border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
            Customizar Colunas
          </button>
        </div>
        <NestedPerformanceTable campaigns={project.campaigns} />
      </div>
    </div>
  );
}
