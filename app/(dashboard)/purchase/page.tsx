import { PageShell } from "@/components/layout/page-shell";
import { PurchasePageClient } from "@/components/purchase/purchase-page-client";

export default function PurchasePage() {
  return (
    <PageShell
      title="Purchase Orders"
      description="Create and track purchase orders, vendor deliveries, and approvals."
      breadcrumbs={[{ label: "Purchase Orders" }]}
    >
      <PurchasePageClient />
    </PageShell>
  );
}
