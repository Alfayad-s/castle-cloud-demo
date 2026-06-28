"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { FormField } from "@/lib/crud-schemas";
import { parseFormValues, valuesFromEntity } from "@/lib/crud-schemas";

type EntityFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  fields: FormField[];
  initialValues?: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => void;
};

export function EntityFormDialog({
  open,
  onOpenChange,
  title,
  description,
  fields,
  initialValues,
  onSubmit,
}: EntityFormDialogProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setValues(valuesFromEntity(fields, initialValues));
    }
  }, [open, fields, initialValues]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    for (const field of fields) {
      if (field.required && !values[field.name]?.trim()) {
        toast.error(`${field.label} is required`);
        return;
      }
    }

    onSubmit(parseFormValues(fields, values));
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-lg">
        <SheetHeader className="shrink-0 border-b px-6 py-5 pr-14">
          <SheetTitle className="text-lg">{title}</SheetTitle>
          {description ? <SheetDescription>{description}</SheetDescription> : null}
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="grid gap-4">
              {fields.map((field) => (
                <div key={field.name} className="grid gap-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === "select" ? (
                    <Select
                      value={values[field.name] ?? ""}
                      onValueChange={(value) =>
                        setValues((prev) => ({ ...prev, [field.name]: value ?? "" }))
                      }
                    >
                      <SelectTrigger id={field.name} className="w-full">
                        <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      value={values[field.name] ?? ""}
                      onChange={(event) =>
                        setValues((prev) => ({ ...prev, [field.name]: event.target.value }))
                      }
                      placeholder={field.placeholder}
                      className="min-h-28 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      step={field.step}
                      value={values[field.name] ?? ""}
                      onChange={(event) =>
                        setValues((prev) => ({ ...prev, [field.name]: event.target.value }))
                      }
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <SheetFooter className="shrink-0 flex-row justify-end gap-2 border-t bg-muted/20 px-6 py-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
