"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { FileText } from "lucide-react";

import { withActionsColumn } from "@/components/crud/crud-columns";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { PO_STATUS_CONFIG } from "@/lib/status-colors";
import { getGrandTotal } from "@/data/purchase-orders";
import type { PurchaseOrder } from "@/types";

const baseColumns: ColumnDef<PurchaseOrder>[] = [
  {
    accessorKey: "poNumber",
    header: "PO Number",
    size: 140,
    minSize: 120,
    cell: ({ row }) => (
      <Link
        href={`/purchase/${row.original.id}`}
        className="flex items-center gap-2 font-semibold transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
          <FileText className="size-3.5" />
        </span>
        {row.getValue("poNumber")}
      </Link>
    ),
  },
  {
    accessorKey: "vendorName",
    header: "Vendor",
    size: 150,
    minSize: 120,
    cell: ({ row }) => (
      <span className="block truncate">{row.getValue("vendorName")}</span>
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
        className="block truncate text-muted-foreground transition-colors hover:text-blue-600"
      >
        {row.getValue("projectName")}
      </Link>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 130,
    minSize: 110,
    cell: ({ row }) => {
      const status = row.getValue("status") as PurchaseOrder["status"];
      return <StatusBadge config={PO_STATUS_CONFIG[status]} size="sm" />;
    },
  },
  {
    id: "amount",
    header: "Amount",
    size: 130,
    minSize: 110,
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{formatCurrency(row.original.amount)}</span>
    ),
  },
  {
    id: "grandTotal",
    header: "Grand Total",
    size: 140,
    minSize: 120,
    cell: ({ row }) => (
      <span className="font-semibold tabular-nums text-blue-600 dark:text-blue-400">
        {formatCurrency(getGrandTotal(row.original))}
      </span>
    ),
  },
  {
    accessorKey: "deliveryDate",
    header: "Delivery Date",
    size: 130,
    minSize: 110,
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">
        {formatDate(row.getValue("deliveryDate"))}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    size: 120,
    minSize: 100,
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">
        {formatDate(row.getValue("createdAt"))}
      </span>
    ),
  },
];

type PurchaseOrdersTableProps = {
  data: PurchaseOrder[];
  onEdit?: (order: PurchaseOrder) => void;
  onDelete?: (order: PurchaseOrder) => void;
};

export function PurchaseOrdersTable({ data, onEdit, onDelete }: PurchaseOrdersTableProps) {
  const columns =
    onEdit && onDelete ? withActionsColumn(baseColumns, onEdit, onDelete) : baseColumns;

  return (
    <DataTable columns={columns} data={data} emptyMessage="No purchase orders found." />
  );
}
