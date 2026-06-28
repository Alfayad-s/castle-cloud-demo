"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { CrudToolbar } from "@/components/crud/crud-toolbar";
import { DeleteConfirmDialog, useDeleteDialog } from "@/components/crud/delete-confirm-dialog";
import { EntityFormDialog } from "@/components/crud/entity-form-dialog";
import { ProjectsTable } from "@/components/projects/projects-table";
import { useDemoData } from "@/hooks/use-demo-data";
import { projectFields } from "@/lib/crud-schemas";
import type { Project } from "@/types";

const defaultProject = {
  name: "",
  location: "",
  status: "planning" as const,
  budget: 0,
  spent: 0,
  progress: 0,
  manager: "",
  deadline: "2026-12-31",
  startDate: "2026-01-01",
  description: "",
  engineers: [] as string[],
  milestones: [] as Project["milestones"],
};

export function ProjectsPageClient() {
  const { projects, createProject, updateProject, deleteProject, resetDemoData, isReady } =
    useDemoData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const deleteDialog = useDeleteDialog();

  const initialValues = useMemo(() => editing ?? defaultProject, [editing]);

  if (!isReady) {
    return <p className="text-sm text-muted-foreground">Loading projects...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <CrudToolbar
        addLabel="Add Project"
        onAdd={() => {
          setEditing(null);
          setOpen(true);
        }}
        onReset={resetDemoData}
      />
      <ProjectsTable
        data={projects}
        onEdit={(project) => {
          setEditing(project);
          setOpen(true);
        }}
        onDelete={(project) => deleteDialog.askDelete(() => deleteProject(project.id))}
      />

      <EntityFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? "Edit Project" : "Add Project"}
        description="Changes are saved to browser localStorage in demo mode."
        fields={projectFields}
        initialValues={initialValues}
        onSubmit={(values) => {
          if (editing) {
            updateProject(editing.id, values as Partial<Project>);
            toast.success("Project updated");
          } else {
            createProject({ ...defaultProject, ...(values as Omit<Project, "id">) });
            toast.success("Project created");
          }
        }}
      />

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={deleteDialog.setOpen}
        onConfirm={deleteDialog.onConfirm}
      />
    </div>
  );
}
