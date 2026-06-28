import { PageShell } from "@/components/layout/page-shell";
import { ClientPortalPageClient } from "@/components/client/client-portal-page-client";

export default function ClientPortalPage() {
  return (
    <PageShell
      title="Client Portal"
      description="Client-facing view of project progress, payments, documents, and milestones."
      breadcrumbs={[{ label: "Client Portal" }]}
    >
      <ClientPortalPageClient />
    </PageShell>
  );
}
