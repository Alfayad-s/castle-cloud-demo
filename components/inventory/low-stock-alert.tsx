"use client";

import { AlertTriangle } from "lucide-react";

import type { Material } from "@/types";

export function LowStockAlert({ materials }: { materials: Material[] }) {
  if (materials.length === 0) return null;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 dark:border-rose-500/30 dark:bg-rose-500/10">
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-rose-600" />
      <div>
        <p className="text-sm font-medium text-rose-800 dark:text-rose-300">
          {materials.length} material{materials.length === 1 ? "" : "s"} below minimum stock
        </p>
        <p className="mt-0.5 text-xs text-rose-700/80 dark:text-rose-300/80">
          {materials.map((m) => m.name).join(", ")} — create a purchase order to restock.
        </p>
      </div>
    </div>
  );
}
