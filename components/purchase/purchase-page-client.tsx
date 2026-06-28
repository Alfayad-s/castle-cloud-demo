"use client";

import { useMemo } from "react";
import { toast } from "sonner";

import { PurchaseView } from "@/components/purchase/purchase-view";
import { CrudToolbar } from "@/components/crud/crud-toolbar";
import { DeleteConfirmDialog } from "@/components/crud/delete-confirm-dialog";
import { EntityFormDialog } from "@/components/crud/entity-form-dialog";
import { useCrudState } from "@/hooks/use-crud-state";
import { useDemoData } from "@/hooks/use-demo-data";
import { poStatusTrend } from "@/data/purchase-orders";
import { purchaseOrderFields } from "@/lib/crud-schemas";
import { computePurchaseStats, computeVendorSpend } from "@/lib/live-stats";
import type { PurchaseOrder } from "@/types";

const defaultOrder = {
  poNumber: "",
  vendorId: "ven-001",
  vendorName: "",
  projectId: "proj-001",
  projectName: "",
  status: "requested" as const,
  amount: 0,
  gst: 0,
  deliveryDate: "2026-07-15",
  createdAt: "2026-06-27",
  items: [] as PurchaseOrder["items"],
};

export function PurchasePageClient() {
  const { purchaseOrders, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder, resetDemoData, isReady } =
    useDemoData();
  const crud = useCrudState<PurchaseOrder>();

  const stats = useMemo(() => computePurchaseStats(purchaseOrders), [purchaseOrders]);
  const vendorSpend = useMemo(() => computeVendorSpend(purchaseOrders), [purchaseOrders]);

  if (!isReady) {
    return <p className="text-sm text-muted-foreground">Loading purchase orders...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <CrudToolbar addLabel="Add Purchase Order" onAdd={crud.startCreate} onReset={resetDemoData} />
      <PurchaseView
        orders={purchaseOrders}
        stats={stats}
        statusTrend={poStatusTrend}
        vendorSpend={vendorSpend}
        onEditOrder={crud.startEdit}
        onDeleteOrder={(order) => crud.deleteDialog.askDelete(() => deletePurchaseOrder(order.id))}
      />
      <EntityFormDialog
        open={crud.open}
        onOpenChange={crud.setOpen}
        title={crud.editing ? "Edit Purchase Order" : "Add Purchase Order"}
        description="Changes are saved to browser localStorage in demo mode."
        fields={purchaseOrderFields}
        initialValues={crud.editing ?? defaultOrder}
        onSubmit={(values) => {
          if (crud.editing) {
            updatePurchaseOrder(crud.editing.id, values as Partial<PurchaseOrder>);
            toast.success("Purchase order updated");
          } else {
            createPurchaseOrder({ ...defaultOrder, ...(values as Omit<PurchaseOrder, "id">) });
            toast.success("Purchase order created");
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
