"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  UserCheck,
  UserMinus,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { EmployeeAvatar } from "@/components/labour/employees-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  AttendanceOverviewStats,
  CalendarDaySummary,
  MonthlyAttendanceRow,
  SiteAttendanceToday,
} from "@/data/attendance";
import {
  getCalendarMonthLabel,
  getCalendarPaddingDays,
  getSelectedDayEmployees,
} from "@/data/attendance";
import { formatDate, formatPercent } from "@/lib/formatters";
import { ATTENDANCE_STATUS_CONFIG } from "@/lib/status-colors";
import type { Employee } from "@/types";
import { cn } from "@/lib/utils";

type AttendanceViewProps = {
  stats: AttendanceOverviewStats;
  todaysAttendance: Employee[];
  siteAttendance: SiteAttendanceToday[];
  weeklyAttendance: { day: string; present: number; absent: number; late: number }[];
  monthlyRows: MonthlyAttendanceRow[];
  calendarDays: CalendarDaySummary[];
  monthlySummary: {
    month: string;
    totalWorkingDays: number;
    avgPresent: number;
    avgAbsent: number;
    avgLate: number;
    bestSite: string;
    bestSiteRate: number;
  };
};

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
};

const offStatusConfig = { label: "Off", tone: "slate" as const };

export function AttendanceView({
  stats,
  todaysAttendance,
  siteAttendance,
  weeklyAttendance,
  monthlyRows,
  calendarDays,
  monthlySummary,
}: AttendanceViewProps) {
  const [selectedDay, setSelectedDay] = useState<CalendarDaySummary | null>(
    calendarDays.find((d) => d.isToday) ?? null,
  );

  const paddingDays = getCalendarPaddingDays();
  const monthLabel = getCalendarMonthLabel();

  const selectedDayEmployees = useMemo(
    () => (selectedDay ? getSelectedDayEmployees(selectedDay) : []),
    [selectedDay],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={Users} label="Total Employees" value={String(stats.totalEmployees)} tone="blue" />
        <StatCard icon={UserCheck} label="Present Today" value={String(stats.presentToday)} tone="emerald" />
        <StatCard icon={UserMinus} label="Absent Today" value={String(stats.absentToday)} tone="rose" />
        <StatCard icon={Clock3} label="Late Today" value={String(stats.lateToday)} tone="amber" />
        <StatCard
          icon={CalendarDays}
          label="Today's Rate"
          value={formatPercent(stats.attendanceRate)}
          tone="violet"
          hint={`${stats.monthlyAvgRate}% monthly avg`}
        />
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="h-9 flex-wrap">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="today">Today&apos;s Attendance</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Attendance</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="rounded-xl shadow-sm lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{monthLabel}</CardTitle>
                <CardDescription>
                  Daily attendance overview — click a day for details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-muted-foreground">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d}>{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: paddingDays }).map((_, i) => (
                    <div key={`pad-${i}`} className="aspect-square" />
                  ))}
                  {calendarDays.map((day) => (
                    <button
                      key={day.date}
                      type="button"
                      disabled={day.isFuture}
                      onClick={() => setSelectedDay(day)}
                      className={cn(
                        "flex aspect-square flex-col items-center justify-center rounded-lg border text-xs transition-all",
                        day.isFuture && "cursor-not-allowed opacity-40",
                        !day.isFuture && "hover:border-blue-300 hover:bg-blue-500/5",
                        day.isToday && "border-blue-500 ring-2 ring-blue-500/20",
                        selectedDay?.date === day.date && "border-blue-500 bg-blue-500/10",
                        day.rate >= 90 && !day.isFuture && "bg-emerald-500/5",
                        day.rate < 80 && !day.isFuture && !day.isWeekend && "bg-rose-500/5",
                      )}
                    >
                      <span className={cn("font-semibold tabular-nums", day.isToday && "text-blue-600")}>
                        {day.dayOfMonth}
                      </span>
                      {!day.isFuture ? (
                        <span className="mt-0.5 text-[9px] tabular-nums text-muted-foreground">
                          {day.rate}%
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <LegendDot color="bg-emerald-500" label="≥90% attendance" />
                  <LegendDot color="bg-rose-500/60" label="<80% attendance" />
                  <LegendDot color="ring-2 ring-blue-500/30" label="Today" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {selectedDay ? formatDate(selectedDay.date) : "Select a day"}
                </CardTitle>
                <CardDescription>
                  {selectedDay && !selectedDay.isFuture
                    ? `${selectedDay.present} present · ${selectedDay.absent} absent · ${selectedDay.late} late`
                    : "Choose a calendar day to view breakdown"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDay && !selectedDay.isFuture ? (
                  <div className="flex max-h-[360px] flex-col gap-2 overflow-y-auto">
                    {selectedDayEmployees.slice(0, 12).map((employee) => (
                      <Link
                        key={employee.id}
                        href={`/labour/${employee.id}`}
                        className="flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <EmployeeAvatar name={employee.name} size="sm" />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{employee.name}</p>
                            <p className="truncate text-[10px] text-muted-foreground">{employee.site}</p>
                          </div>
                        </div>
                        <StatusBadge
                          config={
                            employee.status === "off"
                              ? offStatusConfig
                              : ATTENDANCE_STATUS_CONFIG[employee.status]
                          }
                          size="sm"
                        />
                      </Link>
                    ))}
                    {selectedDayEmployees.length > 12 ? (
                      <p className="pt-1 text-center text-xs text-muted-foreground">
                        +{selectedDayEmployees.length - 12} more employees
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    No data for this day
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="today" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="rounded-xl shadow-sm lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Employee Attendance</CardTitle>
                <CardDescription>All employees marked for today ({formatDate("2026-06-27")})</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pb-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Employee</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Site</TableHead>
                      <TableHead className="pr-6">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todaysAttendance.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="pl-6">
                          <Link
                            href={`/labour/${employee.id}`}
                            className="flex items-center gap-2.5 font-medium hover:text-blue-600"
                          >
                            <EmployeeAvatar name={employee.name} size="sm" />
                            {employee.name}
                          </Link>
                        </TableCell>
                        <TableCell>{employee.designation}</TableCell>
                        <TableCell className="text-muted-foreground">{employee.site}</TableCell>
                        <TableCell className="pr-6">
                          <StatusBadge
                            config={ATTENDANCE_STATUS_CONFIG[employee.attendanceToday]}
                            size="sm"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">By Site</CardTitle>
                <CardDescription>Today&apos;s attendance per construction site</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {siteAttendance.map((site) => (
                  <div key={site.site} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{site.site}</p>
                      <span className="text-sm font-semibold tabular-nums text-blue-600">
                        {site.rate}%
                      </span>
                    </div>
                    <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                      <span className="text-emerald-600">{site.present} present</span>
                      <span className="text-rose-600">{site.absent} absent</span>
                      <span className="text-amber-600">{site.late} late</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-xl shadow-sm lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Weekly Attendance Trend</CardTitle>
                <CardDescription>Present, absent & late counts this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyAttendance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 11 }} width={32} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar dataKey="present" stackId="a" fill="#10B981" name="Present" />
                    <Bar dataKey="late" stackId="a" fill="#F59E0B" name="Late" />
                    <Bar dataKey="absent" stackId="a" fill="#EF4444" name="Absent" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Daily Breakdown</CardTitle>
                <CardDescription>Headcount summary for each day of the week</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pb-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Day</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Late</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead className="pr-6 text-right">Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {weeklyAttendance.map((row) => {
                      const total = row.present + row.absent + row.late;
                      const rate = Math.round(((row.present + row.late) / total) * 100);
                      return (
                        <TableRow key={row.day}>
                          <TableCell className="pl-6 font-medium">{row.day}</TableCell>
                          <TableCell className="tabular-nums text-emerald-600">{row.present}</TableCell>
                          <TableCell className="tabular-nums text-amber-600">{row.late}</TableCell>
                          <TableCell className="tabular-nums text-rose-600">{row.absent}</TableCell>
                          <TableCell className="pr-6 text-right font-semibold tabular-nums">
                            {rate}%
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="mt-4">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard label="Month" value={monthlySummary.month} />
            <SummaryCard label="Working Days" value={String(monthlySummary.totalWorkingDays)} />
            <SummaryCard label="Avg Present / Day" value={String(monthlySummary.avgPresent)} />
            <SummaryCard
              label="Best Site"
              value={monthlySummary.bestSite}
              hint={`${monthlySummary.bestSiteRate}% rate`}
            />
          </div>

          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Monthly Employee Summary</CardTitle>
              <CardDescription>
                Attendance record for {monthlySummary.month} — {monthlySummary.totalWorkingDays} working days
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Employee</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Off</TableHead>
                    <TableHead className="pr-6 text-right">Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyRows.map((row) => (
                    <TableRow key={row.employeeId}>
                      <TableCell className="pl-6">
                        <Link
                          href={`/labour/${row.employeeId}`}
                          className="font-medium hover:text-blue-600"
                        >
                          {row.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{row.designation}</p>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{row.site}</TableCell>
                      <TableCell className="tabular-nums text-emerald-600">{row.present}</TableCell>
                      <TableCell className="tabular-nums text-amber-600">{row.late}</TableCell>
                      <TableCell className="tabular-nums text-rose-600">{row.absent}</TableCell>
                      <TableCell className="tabular-nums text-muted-foreground">{row.off}</TableCell>
                      <TableCell className="pr-6 text-right">
                        <span
                          className={cn(
                            "font-semibold tabular-nums",
                            row.attendanceRate >= 90 && "text-emerald-600",
                            row.attendanceRate < 80 && "text-rose-600",
                            row.attendanceRate >= 80 && row.attendanceRate < 90 && "text-amber-600",
                          )}
                        >
                          {row.attendanceRate}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: "blue" | "emerald" | "rose" | "amber" | "violet";
  hint?: string;
}) {
  const tones = {
    blue: "bg-blue-500/10 text-blue-600",
    emerald: "bg-emerald-500/10 text-emerald-600",
    rose: "bg-rose-500/10 text-rose-600",
    amber: "bg-amber-500/10 text-amber-600",
    violet: "bg-violet-500/10 text-violet-600",
  };

  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="flex items-start gap-3 p-4">
        <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}>
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground">{label}</p>
          <p className="mt-0.5 text-xl font-semibold tabular-nums">{value}</p>
          {hint ? <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{hint}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-lg font-semibold">{value}</p>
        {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("size-2.5 rounded-full", color)} />
      {label}
    </span>
  );
}
