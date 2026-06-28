"use client";

import { useMemo } from "react";
import { toast } from "sonner";

import { MachineryView } from "@/components/machinery/machinery-view";
import { CrudToolbar } from "@/components/crud/crud-toolbar";
import { DeleteConfirmDialog } from "@/components/crud/delete-confirm-dialog";
import { EntityFormDialog } from "@/components/crud/entity-form-dialog";
import { useCrudState } from "@/hooks/use-crud-state";
import { useDemoData } from "@/hooks/use-demo-data";
import {
  fuelLevelByMachine,
  machineTypeBreakdown,
  siteMachineDeployment,
  weeklyMachineHours,
} from "@/data/machinery";
import { machineFields } from "@/lib/crud-schemas";
import { computeMachineAlerts, computeMachineryStats } from "@/lib/live-stats";
import type { Machine } from "@/types";

const defaultMachine = {
  name: "",
  type: "",
  image: "excavator",
  projectId: "proj-001",
  currentSite: "",
  operator: "",
  runningHours: 0,
  fuelLevel: 100,
  maintenanceDate: "2026-08-01",
  insuranceExpiry: "2026-12-31",
  status: "active" as const,
  hourlyRate: 0,
};

export function MachineryPageClient() {
  const { machines, createMachine, updateMachine, deleteMachine, resetDemoData, isReady } =
    useDemoData();
  const crud = useCrudState<Machine>();

  const stats = useMemo(() => computeMachineryStats(machines), [machines]);
  const alerts = useMemo(() => computeMachineAlerts(machines), [machines]);

  if (!isReady) {
    return <p className="text-sm text-muted-foreground">Loading machinery...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <CrudToolbar addLabel="Add Machine" onAdd={crud.startCreate} onReset={resetDemoData} />
      <MachineryView
        machines={machines}
        stats={stats}
        alerts={alerts}
        siteMachineDeployment={siteMachineDeployment}
        machineTypeBreakdown={machineTypeBreakdown}
        weeklyMachineHours={weeklyMachineHours}
        fuelLevelByMachine={fuelLevelByMachine}
        onEditMachine={crud.startEdit}
        onDeleteMachine={(machine) => crud.deleteDialog.askDelete(() => deleteMachine(machine.id))}
      />
      <EntityFormDialog
        open={crud.open}
        onOpenChange={crud.setOpen}
        title={crud.editing ? "Edit Machine" : "Add Machine"}
        description="Changes are saved to browser localStorage in demo mode."
        fields={machineFields}
        initialValues={crud.editing ?? defaultMachine}
        onSubmit={(values) => {
          if (crud.editing) {
            updateMachine(crud.editing.id, values as Partial<Machine>);
            toast.success("Machine updated");
          } else {
            createMachine({ ...defaultMachine, ...(values as Omit<Machine, "id">) });
            toast.success("Machine created");
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
