"use client";

import { useMemo } from "react";
import { toast } from "sonner";

import { InventoryView } from "@/components/inventory/inventory-view";
import { CrudToolbar } from "@/components/crud/crud-toolbar";
import { DeleteConfirmDialog } from "@/components/crud/delete-confirm-dialog";
import { EntityFormDialog } from "@/components/crud/entity-form-dialog";
import { useCrudState } from "@/hooks/use-crud-state";
import { useDemoData } from "@/hooks/use-demo-data";
import { categoryStock, warehouses, weeklyConsumption } from "@/data/inventory";
import { materialFields } from "@/lib/crud-schemas";
import { computeInventoryStats, getLowStockMaterials } from "@/lib/live-stats";
import type { Material } from "@/types";

const defaultMaterial = {
  name: "",
  category: "",
  supplier: "",
  currentStock: 0,
  minimumStock: 0,
  warehouse: "",
  unit: "units",
  price: 0,
  lastRestocked: "2026-06-27",
  todayConsumption: 0,
};

export function InventoryPageClient() {
  const { materials, createMaterial, updateMaterial, deleteMaterial, resetDemoData, isReady } =
    useDemoData();
  const crud = useCrudState<Material>();

  const stats = useMemo(() => computeInventoryStats(materials), [materials]);
  const lowStockMaterials = useMemo(() => getLowStockMaterials(materials), [materials]);

  if (!isReady) {
    return <p className="text-sm text-muted-foreground">Loading inventory...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <CrudToolbar addLabel="Add Material" onAdd={crud.startCreate} onReset={resetDemoData} />
      <InventoryView
        materials={materials}
        stats={stats}
        lowStockMaterials={lowStockMaterials}
        warehouses={warehouses}
        categoryStock={categoryStock}
        weeklyConsumption={weeklyConsumption}
        onEditMaterial={crud.startEdit}
        onDeleteMaterial={(material) =>
          crud.deleteDialog.askDelete(() => deleteMaterial(material.id))
        }
      />
      <EntityFormDialog
        open={crud.open}
        onOpenChange={crud.setOpen}
        title={crud.editing ? "Edit Material" : "Add Material"}
        description="Changes are saved to browser localStorage in demo mode."
        fields={materialFields}
        initialValues={crud.editing ?? defaultMaterial}
        onSubmit={(values) => {
          if (crud.editing) {
            updateMaterial(crud.editing.id, values as Partial<Material>);
            toast.success("Material updated");
          } else {
            createMaterial({ ...defaultMaterial, ...(values as Omit<Material, "id">) });
            toast.success("Material created");
          }
        }}
      />
      <DeleteConfirmDialog
        open={crud.deleteDialog.open}
        onOpenChange={crud.deleteDialog.setOpen}
        onConfirm={crud.deleteDialog.onConfirm}
      />
    </div>
  );
}
