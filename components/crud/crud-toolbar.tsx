"use client";

import { Plus, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

type CrudToolbarProps = {
  onAdd?: () => void;
  addLabel?: string;
  onReset?: () => void;
  children?: React.ReactNode;
};

export function CrudToolbar({
  onAdd,
  addLabel = "Add New",
  onReset,
  children,
}: CrudToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {onAdd ? (
          <Button onClick={onAdd} size="sm" className="gap-1.5">
            <Plus className="size-4" />
            {addLabel}
          </Button>
        ) : null}
        {children}
      </div>
      {onReset ? (
        <Button variant="outline" size="sm" className="gap-1.5" onClick={onReset}>
          <RotateCcw className="size-4" />
          Reset Demo Data
        </Button>
      ) : null}
    </div>
  );
}
