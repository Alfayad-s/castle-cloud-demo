"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AttendanceView } from "@/components/attendance/attendance-view";
import { AttendanceLogDialog } from "@/components/attendance/attendance-log-dialog";
import { CrudToolbar } from "@/components/crud/crud-toolbar";
import { DeleteConfirmDialog } from "@/components/crud/delete-confirm-dialog";
import { EntityFormDialog } from "@/components/crud/entity-form-dialog";
import { useCrudState } from "@/hooks/use-crud-state";
import { useDemoData } from "@/hooks/use-demo-data";
import { employeeFields } from "@/lib/crud-schemas";
import {
  getAttendanceOverviewStats,
  getCalendarMonth,
  getMonthlyAttendanceRows,
  getSiteAttendanceToday,
  getTodaysAttendance,
  getWeeklyAttendance,
  monthlySummary,
} from "@/data/attendance";
import type { AttendanceLog, Employee } from "@/types";

const defaultEmployee = {
  name: "",
  designation: "",
  site: "",
  phone: "",
  dailyWage: 0,
  attendanceToday: "present" as const,
};

export function AttendancePageClient() {
  const {
    employees,
    attendanceLogs,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    logAttendance,
    resetDemoData,
    isReady,
  } = useDemoData();
  const crud = useCrudState<Employee>();
  const [logOpen, setLogOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<AttendanceLog | null>(null);

  const stats = useMemo(() => getAttendanceOverviewStats(employees), [employees]);
  const todaysAttendance = useMemo(() => getTodaysAttendance(employees), [employees]);

  if (!isReady) {
    return <p className="text-sm text-muted-foreground">Loading attendance...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <CrudToolbar
        addLabel="Add Employee"
        onAdd={crud.startCreate}
        onReset={resetDemoData}
      >
        <button
          type="button"
          onClick={() => {
            setEditingLog(null);
            setLogOpen(true);
          }}
          className="inline-flex h-8 items-center rounded-lg border border-input bg-background px-3 text-sm font-medium hover:bg-muted"
        >
          Log Attendance
        </button>
      </CrudToolbar>

      <AttendanceView
        stats={stats}
        todaysAttendance={todaysAttendance}
        siteAttendance={getSiteAttendanceToday(employees)}
        weeklyAttendance={getWeeklyAttendance()}
        monthlyRows={getMonthlyAttendanceRows(employees)}
        calendarDays={getCalendarMonth()}
        monthlySummary={monthlySummary}
        attendanceLogs={attendanceLogs}
        onEditEmployee={crud.startEdit}
        onDeleteEmployee={(employee) =>
          crud.deleteDialog.askDelete(() => deleteEmployee(employee.id))
        }
        onEditLog={(log) => {
          setEditingLog(log);
          setLogOpen(true);
        }}
      />

      <EntityFormDialog
        open={crud.open}
        onOpenChange={crud.setOpen}
        title={crud.editing ? "Edit Employee" : "Add Employee"}
        description="Employee records are saved to localStorage in demo mode."
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

      <AttendanceLogDialog
        open={logOpen}
        onOpenChange={(open) => {
          setLogOpen(open);
          if (!open) setEditingLog(null);
        }}
        employees={employees}
        onSave={logAttendance}
        editingLog={editingLog ?? undefined}
      />

      <DeleteConfirmDialog
        open={crud.deleteDialog.open}
        onOpenChange={crud.deleteDialog.setOpen}
        onConfirm={crud.deleteDialog.onConfirm}
      />
    </div>
  );
}
