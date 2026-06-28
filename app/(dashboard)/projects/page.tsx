import { PageShell } from "@/components/layout/page-shell";
import { ProjectsPageClient } from "@/components/projects/projects-page-client";

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      description="Manage construction projects, timelines, budgets, and milestones."
      breadcrumbs={[{ label: "Projects" }]}
    >
      <ProjectsPageClient />
    </PageShell>
  );
}
