import { useState } from "react";
import { projects, globalSummary, chartData, rpsData } from "@/data/mockData";
import type { Project } from "@/data/mockData";
import { GlobalView } from "@/components/dashboard/GlobalView";
import { DetailedView } from "@/components/dashboard/DetailedView";

interface DashboardProps {
  selectedProject: string;
}

export default function Dashboard({ selectedProject }: DashboardProps) {
  if (selectedProject === "all") {
    return <GlobalView projects={projects} />;
  }

  const project = projects.find((p) => p.id === selectedProject);
  if (!project) return <div className="p-6 text-muted-foreground">Projeto não encontrado.</div>;

  return <DetailedView project={project} chartData={chartData} rpsData={rpsData} />;
}
