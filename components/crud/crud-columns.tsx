"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { RowActions } from "@/components/crud/row-actions";

export function withActionsColumn<T extends { id: string }>(
  columns: ColumnDef<T>[],
  onEdit: (item: T) => void,
  onDelete: (item: T) => void,
): ColumnDef<T>[] {
  return [
    ...columns,
    {
      id: "actions",
      header: "",
      size: 88,
      minSize: 88,
      enableResizing: false,
      cell: ({ row }) => (
        <RowActions onEdit={() => onEdit(row.original)} onDelete={() => onDelete(row.original)} />
      ),
    },
  ];
}
