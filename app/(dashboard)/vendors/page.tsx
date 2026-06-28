import { PageShell } from "@/components/layout/page-shell";
import { VendorsPageClient } from "@/components/vendors/vendors-page-client";

export default function VendorsPage() {
  return (
    <PageShell
      title="Vendors"
      description="Manage supplier relationships, outstanding balances, and project assignments."
      breadcrumbs={[{ label: "Vendors" }]}
    >
      <VendorsPageClient />
    </PageShell>
  );
}
