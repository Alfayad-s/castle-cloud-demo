"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnSizingState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyMessage?: string;
  className?: string;
  enableColumnResizing?: boolean;
  columnResizeMode?: "onChange" | "onEnd";
};

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyMessage = "No results found.",
  className,
  enableColumnResizing = true,
  columnResizeMode = "onChange",
}: DataTableProps<TData, TValue>) {
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

  const table = useReactTable({
    data,
    columns,
    state: { columnSizing },
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing,
    columnResizeMode,
    defaultColumn: {
      minSize: 80,
      maxSize: 640,
      size: 160,
    },
  });

  const isResizing = table.getState().columnSizingInfo.isResizingColumn;

  useEffect(() => {
    document.body.style.cursor = isResizing ? "col-resize" : "";
    document.body.style.userSelect = isResizing ? "none" : "";

    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm ring-1 ring-black/[0.02] dark:ring-white/[0.03]",
        isResizing && "select-none",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table
          className="w-full table-fixed border-collapse text-sm"
          style={{ width: table.getCenterTotalSize(), minWidth: "100%" }}
        >
          <thead className="border-b bg-gradient-to-b from-muted/60 to-muted/30">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    className="relative h-12 px-4 text-left align-middle text-[11px] font-semibold tracking-wider text-muted-foreground uppercase"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}

                    {enableColumnResizing && header.column.getCanResize() ? (
                      <div
                        role="separator"
                        aria-orientation="vertical"
                        aria-label={`Resize ${String(header.column.columnDef.header ?? "column")}`}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        onDoubleClick={() => header.column.resetSize()}
                        className={cn(
                          "absolute top-0 right-0 z-10 h-full w-3 translate-x-1/2 cursor-col-resize touch-none select-none",
                          "group/resize",
                        )}
                      >
                        <div
                          className={cn(
                            "absolute top-2 bottom-2 left-1/2 w-px -translate-x-1/2 bg-border transition-colors",
                            "group-hover/resize:bg-primary/40",
                            header.column.getIsResizing() && "bg-primary",
                          )}
                        />
                      </div>
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b transition-colors last:border-b-0 hover:bg-blue-50/50 dark:hover:bg-blue-500/5",
                    index % 2 === 1 && "bg-muted/20",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="max-w-0 px-4 py-4 align-middle text-sm text-foreground"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-16 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data.length > 0 ? (
        <div className="flex items-center justify-between border-t bg-muted/20 px-4 py-2.5 text-xs text-muted-foreground">
          <span>{data.length} row{data.length === 1 ? "" : "s"}</span>
          {enableColumnResizing ? (
            <span className="hidden sm:inline">Drag column edges to resize</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export type { ColumnDef };
