import {
  getPurchaseOrderStats,
  poStatusTrend,
  purchaseOrders,
  vendorSpend,
} from "@/data/purchase-orders";
import { PageShell } from "@/components/layout/page-shell";
import { PurchaseView } from "@/components/purchase/purchase-view";

export default function PurchasePage() {
  const stats = getPurchaseOrderStats();

  return (
    <PageShell
      title="Purchase Orders"
      description="Create and track purchase orders, vendor deliveries, and approvals."
      breadcrumbs={[{ label: "Purchase Orders" }]}
    >
      <PurchaseView
        orders={purchaseOrders}
        stats={stats}
        statusTrend={poStatusTrend}
        vendorSpend={vendorSpend}
      />
    </PageShell>
  );
}
