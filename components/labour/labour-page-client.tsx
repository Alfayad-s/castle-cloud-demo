"use client";

import { useMemo } from "react";
import { toast } from "sonner";

import { LabourView } from "@/components/labour/labour-view";
import { CrudToolbar } from "@/components/crud/crud-toolbar";
import { DeleteConfirmDialog } from "@/components/crud/delete-confirm-dialog";
import { EntityFormDialog } from "@/components/crud/entity-form-dialog";
import { useCrudState } from "@/hooks/use-crud-state";
import { useDemoData } from "@/hooks/use-demo-data";
import { siteWorkforce, weeklyAttendance } from "@/data/labour";
import { employeeFields } from "@/lib/crud-schemas";
import {
  computeDesignationBreakdown,
  computeLabourStats,
  computePayrollPreview,
} from "@/lib/live-stats";
import type { Employee } from "@/types";

const defaultEmployee = {
  name: "",
  designation: "",
  site: "",
  phone: "",
  dailyWage: 0,
  attendanceToday: "present" as const,
};

export function LabourPageClient() {
  const { employees, createEmployee, updateEmployee, deleteEmployee, resetDemoData, isReady } =
    useDemoData();
  const crud = useCrudState<Employee>();

  const stats = useMemo(() => computeLabourStats(employees), [employees]);
  const payrollPreview = useMemo(() => computePayrollPreview(employees), [employees]);
  const designationBreakdown = useMemo(
    () => computeDesignationBreakdown(employees),
    [employees],
  );

  if (!isReady) {
    return <p className="text-sm text-muted-foreground">Loading labour data...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <CrudToolbar addLabel="Add Employee" onAdd={crud.startCreate} onReset={resetDemoData} />
      <LabourView
        employees={employees}
        stats={stats}
        payrollPreview={payrollPreview}
        siteWorkforce={siteWorkforce}
        weeklyAttendance={weeklyAttendance}
        designationBreakdown={designationBreakdown}
        onEditEmployee={crud.startEdit}
        onDeleteEmployee={(employee) =>
          crud.deleteDialog.askDelete(() => deleteEmployee(employee.id))
        }
      />
      <EntityFormDialog
        open={crud.open}
        onOpenChange={crud.setOpen}
        title={crud.editing ? "Edit Employee" : "Add Employee"}
        description="Changes are saved to browser localStorage in demo mode."
        fields={employeeFields}
        initialValues={crud.editing ?? defaultEmployee}
        onSubmit={(values) => {
          if (crud.editing) {
            updateEmployee(crud.editing.id, values as Partial<Employee>);
            toast.success("Employee updated");
          } else {
            createEmployee({ ...defaultEmployee, ...(values as Omit<Employee, "id">) });
            toast.success("Employee created");
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
