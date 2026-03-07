interface DashboardProps {
  selectedProject: string;
}

export default function Dashboard({ selectedProject }: DashboardProps) {
  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <h1 className="text-base font-semibold text-foreground sm:text-xl">Projetos</h1>
      <p className="mt-1 text-[11px] text-muted-foreground sm:text-sm">Página em construção</p>
    </div>
  );
}
