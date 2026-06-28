"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { ClipboardList } from "lucide-react";

import { withActionsColumn } from "@/components/crud/crud-columns";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate, formatNumber } from "@/lib/formatters";
import { DPR_STATUS_CONFIG } from "@/lib/status-colors";
import type { DailyProgressReport } from "@/types";

const baseColumns: ColumnDef<DailyProgressReport>[] = [
  {
    accessorKey: "id",
    header: "Report",
    size: 130,
    minSize: 110,
    cell: ({ row }) => (
      <Link
        href={`/dpr/${row.original.id}`}
        className="flex items-center gap-2 font-semibold transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
          <ClipboardList className="size-3.5" />
        </span>
        {row.original.id.toUpperCase()}
      </Link>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    size: 120,
    minSize: 100,
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">
        {formatDate(row.getValue("date"))}
      </span>
    ),
  },
  {
    accessorKey: "projectName",
    header: "Project",
    size: 160,
    minSize: 130,
    cell: ({ row }) => (
      <Link
        href={`/projects/${row.original.projectId}`}
        className="block truncate transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        {row.getValue("projectName")}
      </Link>
    ),
  },
  {
    accessorKey: "engineer",
    header: "Engineer",
    size: 140,
    minSize: 120,
    cell: ({ row }) => (
      <span className="block truncate">{row.getValue("engineer")}</span>
    ),
  },
  {
    accessorKey: "workers",
    header: "Workers",
    size: 90,
    minSize: 80,
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{formatNumber(row.getValue("workers"))}</span>
    ),
  },
  {
    accessorKey: "machines",
    header: "Machines",
    size: 90,
    minSize: 80,
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">
        {formatNumber(row.getValue("machines"))}
      </span>
    ),
  },
  {
    accessorKey: "hoursWorked",
    header: "Hours",
    size: 80,
    minSize: 70,
    cell: ({ row }) => (
      <span className="tabular-nums">{row.getValue("hoursWorked")}h</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    minSize: 100,
    cell: ({ row }) => {
      const status = row.getValue("status") as DailyProgressReport["status"];
      return <StatusBadge config={DPR_STATUS_CONFIG[status]} size="sm" />;
    },
  },
];

type DprTableProps = {
  data: DailyProgressReport[];
  onEdit?: (report: DailyProgressReport) => void;
  onDelete?: (report: DailyProgressReport) => void;
};

export function DprTable({ data, onEdit, onDelete }: DprTableProps) {
  const columns =
    onEdit && onDelete ? withActionsColumn(baseColumns, onEdit, onDelete) : baseColumns;

  return (
    <DataTable columns={columns} data={data} emptyMessage="No progress reports found." />
  );
}
