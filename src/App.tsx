import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { StickyHeader } from "@/components/StickyHeader";
import { projects, globalSummary } from "@/data/mockData";
import Dashboard from "@/pages/Dashboard";
import UrlBuilder from "@/pages/UrlBuilder";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppLayout() {
  const [selectedProject, setSelectedProject] = useState("all");

  const projectOptions = projects.map((p) => ({ id: p.id, name: p.name }));

  // Compute summary based on selection
  const summary =
    selectedProject === "all"
      ? globalSummary
      : (() => {
          const p = projects.find((proj) => proj.id === selectedProject);
          if (!p) return globalSummary;
          return {
            spend: p.spend,
            revenue: p.revenue,
            profit: p.profit,
            roas: p.roas,
            spendTrend: 5,
            revenueTrend: 12,
            profitTrend: 18,
            roasTrend: 3,
          };
        })();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-1 border-b border-border bg-background px-2 py-1.5 lg:hidden">
            <SidebarTrigger />
            <span className="text-xs font-medium text-muted-foreground">Menu</span>
          </div>
          <StickyHeader
            selectedProject={selectedProject}
            onProjectChange={setSelectedProject}
            summary={summary}
            projectOptions={projectOptions}
          />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard selectedProject={selectedProject} />} />
              <Route path="/url-builder" element={<UrlBuilder />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
