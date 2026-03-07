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
  existingProjects: { name: string; vertical: string }[];
}

export function CreateProjectDialog({ open, onOpenChange, onCreateProject, defaultVertical, existingProjects }: Props) {
  const [name, setName] = useState("");
  const [vertical, setVertical] = useState<Exclude<Vertical, "todos">>(
    defaultVertical && defaultVertical !== "todos" ? defaultVertical : "google_ads"
  );

  const isDuplicate = existingProjects.some(
    (p) => p.name.toLowerCase() === name.trim().toLowerCase() && p.vertical === vertical
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isDuplicate) return;

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
      sessions: 0,
      leads: 0,
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
              onChange={(e) => setName(e.target.value.slice(0, 30))}
              maxLength={30}
              autoFocus
            />
            <div className="flex justify-between">
              {isDuplicate ? (
                <span className="text-[10px] text-destructive">Já existe um projeto com esse nome nesse tipo</span>
              ) : <span />}
              <span className="text-[10px] text-muted-foreground">{name.length}/30</span>
            </div>
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
            <Button type="submit" disabled={!name.trim() || isDuplicate}>
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
