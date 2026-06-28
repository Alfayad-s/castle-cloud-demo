"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";

import { withActionsColumn } from "@/components/crud/crud-columns";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency } from "@/lib/formatters";
import { ATTENDANCE_STATUS_CONFIG } from "@/lib/status-colors";
import type { Employee } from "@/types";

const baseColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Employee",
    size: 180,
    minSize: 140,
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      return (
        <Link
          href={`/labour/${row.original.id}`}
          className="flex items-center gap-2.5 font-semibold transition-colors hover:text-blue-600 dark:hover:text-blue-400"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-600">
            {initials}
          </span>
          <span className="truncate">{name}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "designation",
    header: "Designation",
    size: 150,
    minSize: 120,
    cell: ({ row }) => (
      <span className="block truncate">{row.getValue("designation")}</span>
    ),
  },
  {
    accessorKey: "site",
    header: "Site",
    size: 160,
    minSize: 130,
    cell: ({ row }) => (
      <span className="block truncate text-muted-foreground">{row.getValue("site")}</span>
    ),
  },
  {
    accessorKey: "attendanceToday",
    header: "Attendance",
    size: 120,
    minSize: 100,
    cell: ({ row }) => {
      const status = row.getValue("attendanceToday") as Employee["attendanceToday"];
      return <StatusBadge config={ATTENDANCE_STATUS_CONFIG[status]} size="sm" />;
    },
  },
  {
    accessorKey: "dailyWage",
    header: "Daily Wage",
    size: 120,
    minSize: 100,
    cell: ({ row }) => {
      const wage = row.getValue("dailyWage") as number;
      return (
        <span className="font-medium tabular-nums">
          {wage > 0 ? formatCurrency(wage) : "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    size: 140,
    minSize: 120,
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">{row.getValue("phone")}</span>
    ),
  },
  {
    accessorKey: "employeeType",
    header: "Type",
    size: 100,
    minSize: 80,
    cell: ({ row }) => {
      const type = row.original.employeeType ?? "worker";
      return (
        <span
          className={`rounded-md px-2 py-0.5 text-xs font-medium capitalize ${
            type === "staff"
              ? "bg-violet-500/10 text-violet-700 dark:text-violet-300"
              : "bg-slate-500/10 text-slate-700 dark:text-slate-300"
          }`}
        >
          {type}
        </span>
      );
    },
  },
];

type EmployeesTableProps = {
  data: Employee[];
  onEdit?: (employee: Employee) => void;
  onDelete?: (employee: Employee) => void;
};

export function EmployeesTable({ data, onEdit, onDelete }: EmployeesTableProps) {
  const columns =
    onEdit && onDelete ? withActionsColumn(baseColumns, onEdit, onDelete) : baseColumns;

  return <DataTable columns={columns} data={data} emptyMessage="No employees found." />;
}

export function EmployeeAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizes = {
    sm: "size-8 text-xs",
    md: "size-12 text-sm",
    lg: "size-16 text-lg",
  };

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white shadow-sm ${sizes[size]}`}
    >
      {initials}
    </span>
  );
}
