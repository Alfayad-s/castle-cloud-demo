"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onConfirm: () => void;
};

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  title = "Delete record?",
  description = "This action cannot be undone. The record will be removed from local demo storage.",
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
              toast.success("Record deleted");
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function useDeleteDialog() {
  const [open, setOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

  function askDelete(confirm: () => void) {
    setOnConfirm(() => confirm);
    setOpen(true);
  }

  return {
    open,
    setOpen,
    askDelete,
    onConfirm: onConfirm ?? (() => undefined),
  };
}
