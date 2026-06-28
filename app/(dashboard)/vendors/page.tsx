import { getVendorStats, vendors } from "@/data/vendors";
import { PageShell } from "@/components/layout/page-shell";
import { VendorsView } from "@/components/vendors/vendors-view";

export default function VendorsPage() {
  return (
    <PageShell
      title="Vendors"
      description="Manage supplier relationships, outstanding balances, and project assignments."
      breadcrumbs={[{ label: "Vendors" }]}
    >
      <VendorsView vendors={vendors} stats={getVendorStats()} />
    </PageShell>
  );
}
