"use client";

import { useState } from "react";

import { useDeleteDialog } from "@/components/crud/delete-confirm-dialog";

export function useCrudState<T extends { id: string }>() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const deleteDialog = useDeleteDialog();

  return {
    open,
    setOpen,
    editing,
    setEditing,
    deleteDialog,
    startCreate: () => {
      setEditing(null);
      setOpen(true);
    },
    startEdit: (item: T) => {
      setEditing(item);
      setOpen(true);
    },
  };
}
