"use client";

import Link from "next/link";
import { Calendar, MapPin, Phone, Wallet } from "lucide-react";

import { EmployeeAvatar } from "@/components/labour/employees-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AttendanceDay, Employee } from "@/types";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { ATTENDANCE_STATUS_CONFIG } from "@/lib/status-colors";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmployeeDetailViewProps = {
  employee: Employee;
  calendar: AttendanceDay[];
  monthlyStats: {
    present: number;
    absent: number;
    late: number;
    estimatedPay: number;
  };
};

const calendarStyles: Record<AttendanceDay["status"], string> = {
  present: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/30 dark:text-emerald-300",
  absent: "bg-rose-500/15 text-rose-700 ring-rose-500/30 dark:text-rose-300",
  late: "bg-amber-500/15 text-amber-700 ring-amber-500/30 dark:text-amber-300",
  off: "bg-muted text-muted-foreground ring-border",
};

const calendarLabels: Record<AttendanceDay["status"], string> = {
  present: "P",
  absent: "A",
  late: "L",
  off: "—",
};

export function EmployeeDetailView({
  employee,
  calendar,
  monthlyStats,
}: EmployeeDetailViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-xl shadow-sm">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <EmployeeAvatar name={employee.name} size="lg" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold">{employee.name}</h2>
              <StatusBadge
                config={ATTENDANCE_STATUS_CONFIG[employee.attendanceToday]}
                size="sm"
              />
            </div>
            <p className="mt-1 text-muted-foreground">{employee.designation}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                {employee.site}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="size-3.5" />
                {employee.phone}
              </span>
              {employee.joinDate ? (
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  Joined {formatDate(employee.joinDate)}
                </span>
              ) : null}
            </div>
          </div>
          {employee.dailyWage > 0 ? (
            <div className="rounded-xl border bg-blue-500/5 px-5 py-4 text-center">
              <p className="text-xs text-muted-foreground">Daily Wage</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
                {formatCurrency(employee.dailyWage)}
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Present Days" value={String(monthlyStats.present)} tone="emerald" />
        <MetricCard label="Absent Days" value={String(monthlyStats.absent)} tone="rose" />
        <MetricCard label="Late Days" value={String(monthlyStats.late)} tone="amber" />
        <MetricCard
          label="Estimated Pay"
          value={employee.dailyWage > 0 ? formatCurrency(monthlyStats.estimatedPay) : "—"}
          tone="blue"
        />
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Attendance Calendar</CardTitle>
          <CardDescription>Last 14 days attendance record</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 sm:grid-cols-14">
            {calendar.map((day) => (
              <div key={day.date} className="flex flex-col items-center gap-1">
                <span className="text-[10px] tabular-nums text-muted-foreground">
                  {new Date(day.date).getDate()}
                </span>
                <div
                  title={`${formatDate(day.date)} — ${day.status}`}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg text-xs font-bold ring-1",
                    calendarStyles[day.status],
                  )}
                >
                  {calendarLabels[day.status]}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <Legend color="bg-emerald-500" label="Present" />
            <Legend color="bg-amber-500" label="Late" />
            <Legend color="bg-rose-500" label="Absent" />
            <Legend color="bg-muted" label="Off day" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Employee Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <DetailRow label="Employee ID" value={employee.id.toUpperCase()} />
            <DetailRow label="Designation" value={employee.designation} />
            <DetailRow label="Site" value={employee.site} />
            <DetailRow label="Type" value={employee.employeeType ?? "worker"} capitalize />
            <DetailRow
              label="Today's Status"
              value={
                <StatusBadge
                  config={ATTENDANCE_STATUS_CONFIG[employee.attendanceToday]}
                  size="sm"
                />
              }
            />
          </CardContent>
        </Card>

        {employee.dailyWage > 0 ? (
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Payroll Summary</CardTitle>
              <CardDescription>Current month wage calculation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <PayrollRow icon={Wallet} label="Daily wage" value={formatCurrency(employee.dailyWage)} />
              <PayrollRow icon={Calendar} label="Days present" value={String(monthlyStats.present)} />
              <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-500/30 dark:bg-blue-500/10">
                <p className="text-sm text-muted-foreground">Estimated monthly pay</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
                  {formatCurrency(monthlyStats.estimatedPay)}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Staff Member</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Salaried staff — payroll is managed through the monthly salary module. Daily wage
                tracking applies to site workers only.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "emerald" | "rose" | "amber" | "blue";
}) {
  const tones = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    rose: "text-rose-600 dark:text-rose-400",
    amber: "text-amber-600 dark:text-amber-400",
    blue: "text-blue-600 dark:text-blue-400",
  };

  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent className={cn("text-2xl font-semibold tabular-nums", tones[tone])}>
        {value}
      </CardContent>
    </Card>
  );
}

function DetailRow({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: React.ReactNode;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium", capitalize && "capitalize")}>{value}</span>
    </div>
  );
}

function PayrollRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("size-2.5 rounded-full", color)} />
      {label}
    </span>
  );
}

export function EmployeeDetailActions() {
  return (
    <Link href="/labour" className={cn(buttonVariants({ variant: "outline" }))}>
      Back to Labour
    </Link>
  );
}
