"use client";

import {
  Clock3,
  IndianRupee,
  UserCheck,
  UserMinus,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { EmployeesTable } from "@/components/labour/employees-table";
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
import type { Employee, LabourStats, PayrollPreviewRow } from "@/types";
import { formatCompactCurrency, formatCurrency } from "@/lib/formatters";

type LabourViewProps = {
  employees: Employee[];
  stats: LabourStats;
  payrollPreview: PayrollPreviewRow[];
  siteWorkforce: { site: string; workers: number; staff: number }[];
  weeklyAttendance: { day: string; present: number; absent: number; late: number }[];
  designationBreakdown: { designation: string; count: number }[];
  onEditEmployee?: (employee: Employee) => void;
  onDeleteEmployee?: (employee: Employee) => void;
};

const PIE_COLORS = ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#64748B"];

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
};

export function LabourView({
  employees,
  stats,
  payrollPreview,
  siteWorkforce,
  weeklyAttendance,
  designationBreakdown,
  onEditEmployee,
  onDeleteEmployee,
}: LabourViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={Users} label="Total Employees" value={String(stats.totalEmployees)} tone="blue" />
        <StatCard icon={UserCheck} label="Present Today" value={String(stats.presentToday)} tone="emerald" />
        <StatCard icon={UserMinus} label="Absent Today" value={String(stats.absentToday)} tone="rose" />
        <StatCard icon={Clock3} label="Late Today" value={String(stats.lateToday)} tone="amber" />
        <StatCard
          icon={IndianRupee}
          label="Payroll Estimate"
          value={formatCompactCurrency(stats.monthlyPayrollEstimate)}
          tone="violet"
          hint={`${stats.todaysWorkforce} on site today`}
        />
      </div>

      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="h-9">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="payroll">Payroll Preview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="mt-4">
          <EmployeesTable
            data={employees}
            onEdit={onEditEmployee}
            onDelete={onDeleteEmployee}
          />
        </TabsContent>

        <TabsContent value="payroll" className="mt-4">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Monthly Payroll Preview</CardTitle>
              <CardDescription>
                Estimated wages for daily-wage workers this month
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Employee</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead>Daily Wage</TableHead>
                    <TableHead>Days Worked</TableHead>
                    <TableHead className="pr-6 text-right">Estimated Pay</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollPreview.map((row) => (
                    <TableRow key={row.employeeId}>
                      <TableCell className="pl-6 font-medium">{row.name}</TableCell>
                      <TableCell>{row.designation}</TableCell>
                      <TableCell className="text-muted-foreground">{row.site}</TableCell>
                      <TableCell className="tabular-nums">{formatCurrency(row.dailyWage)}</TableCell>
                      <TableCell className="tabular-nums">{row.daysWorked}</TableCell>
                      <TableCell className="pr-6 text-right font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                        {formatCurrency(row.estimatedPay)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableCell colSpan={5} className="pl-6 text-right font-semibold">
                      Total Estimated Payroll
                    </TableCell>
                    <TableCell className="pr-6 text-right text-base font-bold tabular-nums text-blue-600 dark:text-blue-400">
                      {formatCurrency(
                        payrollPreview.reduce((sum, row) => sum + row.estimatedPay, 0),
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Workforce by Site</CardTitle>
                <CardDescription>Workers and staff deployed per site</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={siteWorkforce}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="site" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} width={32} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar dataKey="workers" name="Workers" fill="#2563EB" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="staff" name="Staff" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Weekly Attendance</CardTitle>
                <CardDescription>Present, absent & late counts this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
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
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Designation Breakdown</CardTitle>
                <CardDescription>Employee count by role category</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="h-[220px] w-full max-w-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={designationBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                      dataKey="count"
                      nameKey="designation"
                    >
                      {designationBreakdown.map((_, index) => (
                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid flex-1 gap-2 sm:grid-cols-2">
                  {designationBreakdown.map((item, index) => (
                    <div key={item.designation} className="flex items-center gap-2 rounded-lg border px-3 py-2">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                      />
                      <span className="text-sm text-muted-foreground">{item.designation}</span>
                      <span className="ml-auto font-semibold tabular-nums">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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
