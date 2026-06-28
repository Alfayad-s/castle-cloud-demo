"use client";

import { useMemo } from "react";
import { toast } from "sonner";

import { VendorsView } from "@/components/vendors/vendors-view";
import { CrudToolbar } from "@/components/crud/crud-toolbar";
import { DeleteConfirmDialog } from "@/components/crud/delete-confirm-dialog";
import { EntityFormDialog } from "@/components/crud/entity-form-dialog";
import { useCrudState } from "@/hooks/use-crud-state";
import { useDemoData } from "@/hooks/use-demo-data";
import { vendorFields } from "@/lib/crud-schemas";
import { computeVendorStats } from "@/lib/live-stats";
import type { Vendor } from "@/types";

const defaultVendor = {
  name: "",
  contact: "",
  email: "",
  category: "",
  gst: "",
  rating: 4,
};

export function VendorsPageClient() {
  const { vendors, createVendor, updateVendor, deleteVendor, resetDemoData, isReady } = useDemoData();
  const crud = useCrudState<Vendor>();

  const stats = useMemo(() => computeVendorStats(vendors), [vendors]);

  if (!isReady) {
    return <p className="text-sm text-muted-foreground">Loading vendors...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <CrudToolbar addLabel="Add Vendor" onAdd={crud.startCreate} onReset={resetDemoData} />
      <VendorsView
        vendors={vendors}
        stats={stats}
        onEditVendor={crud.startEdit}
        onDeleteVendor={(vendor) => crud.deleteDialog.askDelete(() => deleteVendor(vendor.id))}
      />
      <EntityFormDialog
        open={crud.open}
        onOpenChange={crud.setOpen}
        title={crud.editing ? "Edit Vendor" : "Add Vendor"}
        description="Changes are saved to browser localStorage in demo mode."
        fields={vendorFields}
        initialValues={crud.editing ?? defaultVendor}
        onSubmit={(values) => {
          if (crud.editing) {
            updateVendor(crud.editing.id, values);
            toast.success("Vendor updated");
          } else {
            createVendor({ ...defaultVendor, ...values });
            toast.success("Vendor created");
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
