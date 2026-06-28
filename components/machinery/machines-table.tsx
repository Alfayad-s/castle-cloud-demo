"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/data-table";
import { MachineImage } from "@/components/machinery/machine-image";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatters";
import { getFuelLevelTone, MACHINE_STATUS_CONFIG } from "@/lib/status-colors";
import type { Machine } from "@/types";
import { cn } from "@/lib/utils";

const columns: ColumnDef<Machine>[] = [
  {
    accessorKey: "name",
    header: "Machine",
    size: 180,
    minSize: 150,
    cell: ({ row }) => (
      <Link
        href={`/machinery/${row.original.id}`}
        className="flex items-center gap-2.5 font-semibold transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-muted">
          <MachineImage machine={row.original} fill sizes="40px" />
        </span>
        <span className="truncate">{row.getValue("name")}</span>
      </Link>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 130,
    minSize: 110,
    cell: ({ row }) => (
      <span className="block truncate">{row.getValue("type")}</span>
    ),
  },
  {
    accessorKey: "currentSite",
    header: "Site",
    size: 160,
    minSize: 130,
    cell: ({ row }) => (
      <Link
        href={`/projects/${row.original.projectId}`}
        className="block truncate text-muted-foreground transition-colors hover:text-blue-600"
      >
        {row.getValue("currentSite")}
      </Link>
    ),
  },
  {
    accessorKey: "operator",
    header: "Operator",
    size: 140,
    minSize: 120,
    cell: ({ row }) => (
      <span className="block truncate">{row.getValue("operator")}</span>
    ),
  },
  {
    accessorKey: "runningHours",
    header: "Hours",
    size: 90,
    minSize: 80,
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{formatNumber(row.getValue("runningHours"))}</span>
    ),
  },
  {
    accessorKey: "fuelLevel",
    header: "Fuel",
    size: 100,
    minSize: 90,
    cell: ({ row }) => {
      const level = row.getValue("fuelLevel") as number;
      const tone = getFuelLevelTone(level);
      return (
        <span
          className={cn(
            "font-medium tabular-nums",
            tone === "rose" && "text-rose-600",
            tone === "amber" && "text-amber-600",
            tone === "emerald" && "text-emerald-600",
          )}
        >
          {level}%
        </span>
      );
    },
  },
  {
    accessorKey: "maintenanceDate",
    header: "Maintenance",
    size: 120,
    minSize: 100,
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">
        {formatDate(row.getValue("maintenanceDate"))}
      </span>
    ),
  },
  {
    accessorKey: "hourlyRate",
    header: "Rate/hr",
    size: 110,
    minSize: 90,
    cell: ({ row }) => (
      <span className="tabular-nums">{formatCurrency(row.getValue("hourlyRate"))}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    minSize: 100,
    cell: ({ row }) => {
      const status = row.getValue("status") as Machine["status"];
      return <StatusBadge config={MACHINE_STATUS_CONFIG[status]} size="sm" />;
    },
  },
];

type MachinesTableProps = {
  data: Machine[];
};

export function MachinesTable({ data }: MachinesTableProps) {
  return (
    <DataTable columns={columns} data={data} emptyMessage="No machines found." />
  );
}
