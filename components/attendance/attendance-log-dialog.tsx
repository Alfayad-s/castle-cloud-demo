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
import type { AttendanceStatus, Employee } from "@/types";

type AttendanceLogDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employees: Employee[];
  onSave: (input: {
    employeeId: string;
    employeeName: string;
    date: string;
    status: AttendanceStatus;
    checkIn?: string;
    note?: string;
    id?: string;
  }) => void;
  initialEmployeeId?: string;
  initialDate?: string;
  editingLog?: {
    id: string;
    employeeId: string;
    date: string;
    status: AttendanceStatus;
    checkIn?: string;
    note?: string;
  };
};

export function AttendanceLogDialog({
  open,
  onOpenChange,
  employees,
  onSave,
  initialEmployeeId,
  initialDate = "2026-06-27",
  editingLog,
}: AttendanceLogDialogProps) {
  const [employeeId, setEmployeeId] = useState(initialEmployeeId ?? "");
  const [date, setDate] = useState(initialDate);
  const [status, setStatus] = useState<AttendanceStatus>("present");
  const [checkIn, setCheckIn] = useState("08:30");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open) {
      if (editingLog) {
        setEmployeeId(editingLog.employeeId);
        setDate(editingLog.date);
        setStatus(editingLog.status);
        setCheckIn(editingLog.checkIn ?? "08:30");
        setNote(editingLog.note ?? "");
      } else {
        setEmployeeId(initialEmployeeId ?? employees[0]?.id ?? "");
        setDate(initialDate);
        setStatus("present");
        setCheckIn("08:30");
        setNote("");
      }
    }
  }, [open, initialEmployeeId, initialDate, employees, editingLog]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const employee = employees.find((item) => item.id === employeeId);
    if (!employee) {
      toast.error("Select an employee");
      return;
    }

    onSave({
      employeeId: employee.id,
      employeeName: employee.name,
      date,
      status,
      checkIn,
      note: note || undefined,
      id: editingLog?.id,
    });
    toast.success(editingLog ? "Attendance log updated" : "Attendance logged to localStorage");
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="shrink-0 border-b px-6 py-5 pr-14">
          <SheetTitle className="text-lg">
            {editingLog ? "Edit Attendance Log" : "Log Attendance"}
          </SheetTitle>
          <SheetDescription>
            Create or update attendance for an employee. Saved in browser localStorage only.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Employee</Label>
                <Select value={employeeId} onValueChange={(value) => setEmployeeId(value ?? "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name} — {employee.site}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="att-date">Date</Label>
                <Input
                  id="att-date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Status</Label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus((value as AttendanceStatus) ?? "present")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="check-in">Check-in Time</Label>
                <Input
                  id="check-in"
                  type="time"
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="att-note">Note</Label>
                <Input
                  id="att-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Optional note"
                />
              </div>
            </div>
          </div>

          <SheetFooter className="shrink-0 flex-row justify-end gap-2 border-t bg-muted/20 px-6 py-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Log</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
