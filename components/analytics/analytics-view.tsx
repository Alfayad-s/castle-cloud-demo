"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  HardHat,
  IndianRupee,
  Package,
  TrendingUp,
  Truck,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressCell } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AnalyticsStats } from "@/data/analytics";
import {
  formatCompactCurrency,
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/lib/formatters";

type AnalyticsViewProps = {
  stats: AnalyticsStats;
  revenueVsExpenses: { month: string; revenue: number; expenses: number }[];
  expenseBreakdown: { name: string; value: number; color: string }[];
  labourCostTrend: { month: string; cost: number }[];
  materialCostTrend: { month: string; cost: number }[];
  projectBudgetVsActual: {
    project: string;
    budget: number;
    actual: number;
    variance: number;
    utilization: number;
  }[];
  projectCompletion: { name: string; progress: number }[];
  purchaseTrend: { month: string; orders: number; value: number }[];
  topVendors: { vendor: string; value: number }[];
  machineUsageTrend: { day: string; hours: number }[];
  machineUsageByType: { type: string; hours: number }[];
  costByProject: {
    name: string;
    materials: number;
    labour: number;
    machinery: number;
    other: number;
  }[];
  materialConsumption: {
    month: string;
    cement: number;
    steel: number;
    sand: number;
  }[];
};

const VENDOR_COLORS = ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6"];

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
};

export function AnalyticsView({
  stats,
  revenueVsExpenses,
  expenseBreakdown,
  labourCostTrend,
  materialCostTrend,
  projectBudgetVsActual,
  projectCompletion,
  purchaseTrend,
  topVendors,
  machineUsageTrend,
  machineUsageByType,
  costByProject,
  materialConsumption,
}: AnalyticsViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard
          icon={IndianRupee}
          label="Revenue"
          value={formatCompactCurrency(stats.revenue)}
          tone="emerald"
          trend="+12% vs last quarter"
          positive
        />
        <StatCard
          icon={TrendingUp}
          label="Expenses"
          value={formatCompactCurrency(stats.expenses)}
          tone="rose"
          trend="74% of revenue"
        />
        <StatCard
          icon={BarChart3}
          label="Net Profit"
          value={formatCompactCurrency(stats.netProfit)}
          tone="blue"
          trend={`${stats.profitMargin}% margin`}
          positive
        />
        <StatCard
          icon={HardHat}
          label="Labour Cost"
          value={formatCompactCurrency(stats.labourCost)}
          tone="violet"
        />
        <StatCard
          icon={Package}
          label="Material Cost"
          value={formatCompactCurrency(stats.materialCost)}
          tone="amber"
        />
        <StatCard
          icon={Truck}
          label="Avg Completion"
          value={formatPercent(stats.avgProjectCompletion)}
          tone="cyan"
          trend="Across all projects"
        />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="h-9">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Budget vs Actual</CardTitle>
                <CardDescription>Planned budget compared to spend per project</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectBudgetVsActual}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="project" tick={{ fontSize: 11 }} />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      width={48}
                      tickFormatter={(v) => formatCompactCurrency(v)}
                    />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="budget" name="Budget" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="actual" name="Actual Spend" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Project Completion</CardTitle>
                <CardDescription>Overall progress across active and completed projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectCompletion} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Progress"]} />
                    <Bar dataKey="progress" name="Progress %" fill="#10B981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Budget Utilization</CardTitle>
                <CardDescription>Spend percentage against allocated project budgets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {projectBudgetVsActual.map((project) => (
                    <div key={project.project} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="font-medium">{project.project}</p>
                        <span className="text-sm font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                          {project.utilization}%
                        </span>
                      </div>
                      <ProgressCell value={project.utilization} />
                      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <span>Spent {formatCompactCurrency(project.actual)}</span>
                        <span>Budget {formatCompactCurrency(project.budget)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-xl shadow-sm lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Revenue vs Expenses</CardTitle>
                <CardDescription>Monthly financial performance trend</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueVsExpenses}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      width={48}
                      tickFormatter={(v) => formatCompactCurrency(v)}
                    />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="#10B981"
                      fill="url(#revenueGrad)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      name="Expenses"
                      stroke="#EF4444"
                      fill="url(#expenseGrad)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Expense Breakdown</CardTitle>
                <CardDescription>Total spend by cost category</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="h-[220px] w-full max-w-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                      >
                        {expenseBreakdown.map((item) => (
                          <Cell key={item.name} fill={item.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatCurrency(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid flex-1 gap-2">
                  {expenseBreakdown.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 rounded-lg border px-3 py-2">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                      <span className="ml-auto text-sm font-semibold tabular-nums">
                        {formatCompactCurrency(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Monthly Expenses</CardTitle>
                <CardDescription>Operating expense trend over 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={revenueVsExpenses.map((item) => ({ month: item.month, amount: item.expenses }))}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      width={48}
                      tickFormatter={(v) => formatCompactCurrency(v)}
                    />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatCurrency(Number(value))} />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      name="Expenses"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={{ fill: "#8B5CF6", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Cost by Project</CardTitle>
                <CardDescription>Materials, labour, machinery & other costs per project</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costByProject}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      width={48}
                      tickFormatter={(v) => formatCompactCurrency(v)}
                    />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="materials" stackId="a" name="Materials" fill="#2563EB" />
                    <Bar dataKey="labour" stackId="a" name="Labour" fill="#10B981" />
                    <Bar dataKey="machinery" stackId="a" name="Machinery" fill="#F59E0B" />
                    <Bar dataKey="other" stackId="a" name="Other" fill="#94A3B8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Labour Cost Trend</CardTitle>
                <CardDescription>Monthly payroll and wage expenditure</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={labourCostTrend}>
                    <defs>
                      <linearGradient id="labourGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      width={48}
                      tickFormatter={(v) => formatCompactCurrency(v)}
                    />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatCurrency(Number(value))} />
                    <Area
                      type="monotone"
                      dataKey="cost"
                      name="Labour Cost"
                      stroke="#8B5CF6"
                      fill="url(#labourGrad)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Material Cost Trend</CardTitle>
                <CardDescription>Monthly procurement and material spend</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={materialCostTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      width={48}
                      tickFormatter={(v) => formatCompactCurrency(v)}
                    />
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatCurrency(Number(value))} />
                    <Line
                      type="monotone"
                      dataKey="cost"
                      name="Material Cost"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={{ fill: "#F59E0B", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Material Consumption</CardTitle>
                <CardDescription>Cement, steel & sand usage by month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={materialConsumption}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 11 }} width={40} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar dataKey="cement" name="Cement (bags)" fill="#2563EB" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="steel" name="Steel (tons)" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sand" name="Sand (cft)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Machine Usage</CardTitle>
                <CardDescription>Weekly fleet operating hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={machineUsageTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 11 }} width={32} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="hours" name="Hours" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Machine Usage by Type</CardTitle>
                <CardDescription>Operating hours breakdown by equipment category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={machineUsageByType} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="type" tick={{ fontSize: 10 }} width={90} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="hours" name="Hours" fill="#F59E0B" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Purchase Trend</CardTitle>
                <CardDescription>Monthly purchase order volume and value</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <ComposedChart data={purchaseTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} width={32} />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 11 }}
                      width={48}
                      tickFormatter={(v) => formatCompactCurrency(v)}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="orders" name="Orders" fill="#2563EB" radius={[4, 4, 0, 0]} />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="value"
                      name="PO Value"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ fill: "#10B981", r: 3 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Top Vendors</CardTitle>
                <CardDescription>Highest spend vendors by purchase order value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 lg:grid-cols-2">
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={topVendors}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="vendor"
                      >
                        {topVendors.map((_, index) => (
                          <Cell key={index} fill={VENDOR_COLORS[index % VENDOR_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatCurrency(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-3">
                    {topVendors.map((vendor, index) => (
                      <div key={vendor.vendor} className="flex items-center gap-3 rounded-lg border p-3">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold tabular-nums">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{vendor.vendor}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatNumber(Math.round((vendor.value / topVendors.reduce((s, v) => s + v.value, 0)) * 100))}% of total spend
                          </p>
                        </div>
                        <p className="font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                          {formatCompactCurrency(vendor.value)}
                        </p>
                      </div>
                    ))}
                  </div>
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
  trend,
  positive,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: "emerald" | "rose" | "blue" | "violet" | "amber" | "cyan";
  trend?: string;
  positive?: boolean;
}) {
  const tones = {
    emerald: "bg-emerald-500/10 text-emerald-600",
    rose: "bg-rose-500/10 text-rose-600",
    blue: "bg-blue-500/10 text-blue-600",
    violet: "bg-violet-500/10 text-violet-600",
    amber: "bg-amber-500/10 text-amber-600",
    cyan: "bg-cyan-500/10 text-cyan-600",
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
          {trend ? (
            <p className="mt-0.5 flex items-center gap-0.5 text-[10px] text-muted-foreground">
              {positive ? (
                <ArrowUpRight className="size-3 text-emerald-500" />
              ) : (
                <ArrowDownRight className="size-3 text-muted-foreground" />
              )}
              {trend}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
