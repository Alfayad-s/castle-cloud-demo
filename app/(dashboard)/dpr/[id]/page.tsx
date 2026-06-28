import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { DprDetailActions, DprDetailView } from "@/components/dpr/dpr-detail-view";
import { StatusBadge } from "@/components/ui/status-badge";
import { getDprById } from "@/data/dpr";
import { formatDate } from "@/lib/formatters";
import { DPR_STATUS_CONFIG } from "@/lib/status-colors";

type DprDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DprDetailPage({ params }: DprDetailPageProps) {
  const { id } = await params;
  const report = getDprById(id);

  if (!report) {
    notFound();
  }

  return (
    <PageShell
      title={report.id.toUpperCase()}
      description={`${report.projectName} · ${report.engineer} · ${formatDate(report.date)}`}
      breadcrumbs={[
        { label: "DPR", href: "/dpr" },
        { label: report.id.toUpperCase() },
      ]}
      actions={
        <div className="flex items-center gap-2">
          <StatusBadge config={DPR_STATUS_CONFIG[report.status]} />
          <DprDetailActions />
        </div>
      }
    >
      <DprDetailView report={report} />
    </PageShell>
  );
}
