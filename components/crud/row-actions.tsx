"use client";

import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type RowActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export function RowActions({ onEdit, onDelete }: RowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button type="button" variant="ghost" size="icon-sm" onClick={onEdit} aria-label="Edit">
        <Pencil className="size-3.5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-destructive hover:text-destructive"
        onClick={onDelete}
        aria-label="Delete"
      >
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  );
}
