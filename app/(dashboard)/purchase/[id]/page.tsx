import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import {
  PurchaseOrderDetailActions,
  PurchaseOrderDetailView,
} from "@/components/purchase/purchase-order-detail-view";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  getPurchaseOrderById,
  getPurchaseStatusTimeline,
} from "@/data/purchase-orders";
import { PO_STATUS_CONFIG } from "@/lib/status-colors";

type PurchaseOrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PurchaseOrderDetailPage({
  params,
}: PurchaseOrderDetailPageProps) {
  const { id } = await params;
  const order = getPurchaseOrderById(id);

  if (!order) {
    notFound();
  }

  const timeline = getPurchaseStatusTimeline(order);

  return (
    <PageShell
      title={order.poNumber}
      description={`${order.vendorName} · ${order.projectName} · Delivery ${order.deliveryDate}`}
      breadcrumbs={[
        { label: "Purchase Orders", href: "/purchase" },
        { label: order.poNumber },
      ]}
      actions={
        <div className="flex items-center gap-2">
          <StatusBadge config={PO_STATUS_CONFIG[order.status]} />
          <PurchaseOrderDetailActions />
        </div>
      }
    >
      <PurchaseOrderDetailView order={order} timeline={timeline} />
    </PageShell>
  );
}
