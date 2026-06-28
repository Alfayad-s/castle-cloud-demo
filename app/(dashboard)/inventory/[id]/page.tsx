import { notFound } from "next/navigation";

import {
  MaterialDetailActions,
  MaterialDetailView,
} from "@/components/inventory/material-detail-view";
import { PageShell } from "@/components/layout/page-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  getMaterialById,
  getMaterialConsumptionTrend,
  getMaterialPurchases,
  getMaterialTransfers,
  getMaterialUsageHistory,
  getWarehouseForMaterial,
} from "@/data/inventory";
import { getStockStatus } from "@/lib/status-colors";

type MaterialDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MaterialDetailPage({ params }: MaterialDetailPageProps) {
  const { id } = await params;
  const material = getMaterialById(id);

  if (!material) {
    notFound();
  }

  const purchases = getMaterialPurchases(material.id);
  const transfers = getMaterialTransfers(material.id);
  const usageHistory = getMaterialUsageHistory(material.id);
  const consumption = getMaterialConsumptionTrend(material.id);
  const warehouse = getWarehouseForMaterial(material.id);

  return (
    <PageShell
      title={material.name}
      description={`${material.category} · ${material.supplier} · ${material.warehouse}`}
      breadcrumbs={[
        { label: "Material Inventory", href: "/inventory" },
        { label: material.name },
      ]}
      actions={
        <div className="flex items-center gap-2">
          <StatusBadge
            config={getStockStatus(material.currentStock, material.minimumStock)}
          />
          <MaterialDetailActions />
        </div>
      }
    >
      <MaterialDetailView
        material={material}
        warehouse={warehouse}
        purchases={purchases}
        transfers={transfers}
        usageHistory={usageHistory}
        consumption={consumption}
      />
    </PageShell>
  );
}
