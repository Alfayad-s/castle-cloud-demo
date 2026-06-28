import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { ProjectDetailView } from "@/components/projects/project-detail-view";
import { StatusBadge } from "@/components/ui/status-badge";
import { getProjectById } from "@/data";
import { getProjectDetailCharts } from "@/data/project-details";
import { PROJECT_STATUS_CONFIG } from "@/lib/status-colors";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProjectDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const charts = getProjectDetailCharts(project.id);

  return (
    <PageShell
      title={project.name}
      description={project.description}
      breadcrumbs={[
        { label: "Projects", href: "/projects" },
        { label: project.name },
      ]}
      actions={
        <div className="flex items-center gap-2">
          <StatusBadge config={PROJECT_STATUS_CONFIG[project.status]} />
          <Link
            href="/projects"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Back to Projects
          </Link>
        </div>
      }
    >
      <ProjectDetailView project={project} charts={charts} />
    </PageShell>
  );
}
