"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";

import { withActionsColumn } from "@/components/crud/crud-columns";
import { MaterialImage } from "@/components/inventory/material-image";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { getStockStatus } from "@/lib/status-colors";
import type { Material } from "@/types";

const baseColumns: ColumnDef<Material>[] = [
  {
    id: "image",
    header: "Image",
    size: 64,
    minSize: 64,
    cell: ({ row }) => <MaterialImage material={row.original} size="sm" />,
  },
  {
    accessorKey: "name",
    header: "Material",
    size: 160,
    minSize: 120,
    cell: ({ row }) => (
      <Link
        href={`/inventory/${row.original.id}`}
        className="truncate font-semibold transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 120,
    minSize: 100,
    cell: ({ row }) => (
      <span className="rounded-md bg-muted/60 px-2 py-0.5 text-xs font-medium">
        {row.getValue("category")}
      </span>
    ),
  },
  {
    accessorKey: "currentStock",
    header: "Stock",
    size: 110,
    minSize: 90,
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{formatNumber(row.getValue("currentStock") as number)}</span>
    ),
  },
  {
    accessorKey: "unit",
    header: "Unit",
    size: 90,
    minSize: 70,
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("unit")}</span>
    ),
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse",
    size: 140,
    minSize: 110,
    cell: ({ row }) => (
      <span className="block truncate">{row.getValue("warehouse")}</span>
    ),
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    size: 140,
    minSize: 110,
    cell: ({ row }) => (
      <span className="block truncate text-muted-foreground">{row.getValue("supplier")}</span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    size: 120,
    minSize: 100,
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{formatCurrency(row.getValue("price"))}</span>
    ),
  },
  {
    id: "stockStatus",
    header: "Status",
    size: 130,
    minSize: 110,
    cell: ({ row }) => {
      const current = row.original.currentStock;
      const minimum = row.original.minimumStock;
      return <StatusBadge config={getStockStatus(current, minimum)} size="sm" />;
    },
  },
];

type MaterialsTableProps = {
  data: Material[];
  onEdit?: (material: Material) => void;
  onDelete?: (material: Material) => void;
};

export function MaterialsTable({ data, onEdit, onDelete }: MaterialsTableProps) {
  const columns =
    onEdit && onDelete ? withActionsColumn(baseColumns, onEdit, onDelete) : baseColumns;

  return (
    <DataTable columns={columns} data={data} emptyMessage="No materials found in inventory." />
  );
}

export { LowStockAlert } from "@/components/inventory/low-stock-alert";
