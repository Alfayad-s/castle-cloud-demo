import {
  clientDocuments,
  clientInvoices,
  clientPayments,
  clientPhotos,
  demoClient,
  getClientPortalStats,
  getClientProject,
  getClientProjectCharts,
  getClientTimeline,
  progressTimeline,
} from "@/data/client-portal";
import { PageShell } from "@/components/layout/page-shell";
import { ClientPortalView } from "@/components/client/client-portal-view";

export default function ClientPortalPage() {
  const project = getClientProject();
  const charts = getClientProjectCharts();
  const stats = getClientPortalStats();
  const timeline = getClientTimeline();

  return (
    <PageShell
      title="Client Portal"
      description="Client-facing view of project progress, payments, documents, and milestones."
      breadcrumbs={[{ label: "Client Portal" }]}
    >
      <ClientPortalView
        client={demoClient}
        project={project}
        charts={charts}
        stats={stats}
        payments={clientPayments}
        invoices={clientInvoices}
        documents={clientDocuments}
        photos={clientPhotos}
        timeline={timeline}
        progressTimeline={progressTimeline}
      />
    </PageShell>
  );
}
