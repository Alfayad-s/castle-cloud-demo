import { PageShell } from "@/components/layout/page-shell";
import { ProjectsTable } from "@/components/projects/projects-table";
import { projects } from "@/data";

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      description="Manage construction projects, timelines, budgets, and milestones."
      breadcrumbs={[{ label: "Projects" }]}
    >
      <ProjectsTable data={projects} />
    </PageShell>
  );
}
