import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Vertical, DashboardProject } from "@/data/dashboardData";

const verticalOptions: { key: Exclude<Vertical, "todos">; label: string }[] = [
  { key: "google_ads", label: "Google Ads" },
  { key: "meta_ads", label: "Meta Ads" },
  { key: "chatbot", label: "Chatbot" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (project: DashboardProject) => void;
  defaultVertical?: Vertical;
}

export function CreateProjectDialog({ open, onOpenChange, onCreateProject, defaultVertical }: Props) {
  const [name, setName] = useState("");
  const [vertical, setVertical] = useState<Exclude<Vertical, "todos">>(
    defaultVertical && defaultVertical !== "todos" ? defaultVertical : "google_ads"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const project: DashboardProject = {
      id: crypto.randomUUID(),
      name: name.trim(),
      vertical,
      status: "ativo",
      type: vertical,
      revenue: 0,
      spend: 0,
      profit: 0,
      roas: 0,
    };

    onCreateProject(project);
    setName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Novo Projeto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Nome</Label>
            <Input
              id="project-name"
              placeholder="Ex: Saúde BR - Life"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select value={vertical} onValueChange={(v) => setVertical(v as Exclude<Vertical, "todos">)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {verticalOptions.map((v) => (
                  <SelectItem key={v.key} value={v.key}>
                    {v.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
