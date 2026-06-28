import {
  categoryStock,
  getInventoryStats,
  getLowStockMaterials,
  materials,
  warehouses,
  weeklyConsumption,
} from "@/data/inventory";
import { PageShell } from "@/components/layout/page-shell";
import { InventoryView } from "@/components/inventory/inventory-view";

export default function InventoryPage() {
  const stats = getInventoryStats();
  const lowStockMaterials = getLowStockMaterials();

  return (
    <PageShell
      title="Material Inventory"
      description="Track materials, stock levels, warehouses, and daily usage."
      breadcrumbs={[{ label: "Material Inventory" }]}
    >
      <InventoryView
        materials={materials}
        stats={stats}
        lowStockMaterials={lowStockMaterials}
        warehouses={warehouses}
        categoryStock={categoryStock}
        weeklyConsumption={weeklyConsumption}
      />
    </PageShell>
  );
}
