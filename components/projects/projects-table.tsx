"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/data-table";
import { ProgressCell, StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { PROJECT_STATUS_CONFIG } from "@/lib/status-colors";
import type { Project } from "@/types";

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Project",
    size: 200,
    minSize: 140,
    cell: ({ row }) => (
      <Link
        href={`/projects/${row.original.id}`}
        className="block truncate font-semibold text-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
        title={row.getValue("name")}
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    size: 220,
    minSize: 160,
    cell: ({ row }) => (
      <span className="block truncate text-muted-foreground" title={row.getValue("location")}>
        {row.getValue("location")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 150,
    minSize: 120,
    cell: ({ row }) => {
      const status = row.getValue("status") as Project["status"];
      return <StatusBadge config={PROJECT_STATUS_CONFIG[status]} />;
    },
  },
  {
    accessorKey: "manager",
    header: "Manager",
    size: 160,
    minSize: 120,
    cell: ({ row }) => (
      <span className="block truncate" title={row.getValue("manager")}>
        {row.getValue("manager")}
      </span>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    size: 140,
    minSize: 110,
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{formatCurrency(row.getValue("budget"))}</span>
    ),
  },
  {
    accessorKey: "progress",
    header: "Progress",
    size: 130,
    minSize: 110,
    cell: ({ row }) => <ProgressCell value={row.getValue("progress")} />,
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    size: 130,
    minSize: 110,
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">
        {formatDate(row.getValue("deadline"))}
      </span>
    ),
  },
];

type ProjectsTableProps = {
  data: Project[];
};

export function ProjectsTable({ data }: ProjectsTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No projects found."
    />
  );
}
