import { PageShell } from "@/components/layout/page-shell";
import { InventoryPageClient } from "@/components/inventory/inventory-page-client";

export default function InventoryPage() {
  return (
    <PageShell
      title="Material Inventory"
      description="Track materials, stock levels, warehouses, and daily usage."
      breadcrumbs={[{ label: "Material Inventory" }]}
    >
      <InventoryPageClient />
    </PageShell>
  );
}
