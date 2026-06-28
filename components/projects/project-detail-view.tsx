"use client";

import {
  CalendarDays,
  HardHat,
  MapPin,
  Truck,
  UserRound,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
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

import { ProgressCell, StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProjectDetailCharts } from "@/data/project-details";
import { formatCompactCurrency, formatCurrency, formatDate } from "@/lib/formatters";
import { MILESTONE_STATUS_CONFIG } from "@/lib/status-colors";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type ProjectDetailViewProps = {
  project: Project;
  charts: ProjectDetailCharts;
};

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
};

export function ProjectDetailView({ project, charts }: ProjectDetailViewProps) {
  const remaining = project.budget - project.spent;
  const budgetUsedPercent = Math.round((project.spent / project.budget) * 100);

  const budgetChartData = [
    { name: "Spent", value: project.spent, fill: "#2563EB" },
    { name: "Remaining", value: remaining, fill: "#E2E8F0" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Budget" value={formatCurrency(project.budget)} />
        <StatCard label="Spent" value={formatCurrency(project.spent)} accent="text-blue-600 dark:text-blue-400" />
        <StatCard label="Remaining" value={formatCurrency(remaining)} accent="text-emerald-600 dark:text-emerald-400" />
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressCell value={project.progress} />
          </CardContent>
        </Card>
      </div>

      {/* Quick info + workforce */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl shadow-sm lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Project Overview</CardTitle>
            <CardDescription>Key details and assigned team</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <InfoItem icon={MapPin} label="Location" value={project.location} />
            <InfoItem icon={UserRound} label="Project Manager" value={project.manager} />
            <InfoItem icon={CalendarDays} label="Start Date" value={formatDate(project.startDate)} />
            <InfoItem icon={CalendarDays} label="Deadline" value={formatDate(project.deadline)} />
            <div className="sm:col-span-2">
              <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Assigned Engineers
              </p>
              <div className="flex flex-wrap gap-2">
                {project.engineers.map((engineer) => (
                  <span
                    key={engineer}
                    className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 text-sm"
                  >
                    <HardHat className="size-3.5 text-blue-600" />
                    {engineer}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Site Snapshot</CardTitle>
            <CardDescription>Today&apos;s workforce & activity</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <SnapshotRow icon={Users} label="Labour on site" value={charts.labourOnSite} />
            <SnapshotRow icon={Truck} label="Active machines" value={charts.machinesActive} />
            <SnapshotRow icon={HardHat} label="DPRs submitted" value={charts.dprSubmitted} />
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Budget utilization</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">{budgetUsedPercent}%</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                  style={{ width: `${budgetUsedPercent}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="budget" className="w-full">
        <TabsList className="h-9">
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="spending">Spending</TabsTrigger>
        </TabsList>

        <TabsContent value="budget" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard title="Budget vs Spent" description="Allocated budget compared to actual spend">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={[{ name: project.name, budget: project.budget, spent: project.spent }]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => formatCompactCurrency(v)} tick={{ fontSize: 11 }} width={56} />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={tooltipStyle}
                  />
                  <Legend />
                  <Bar dataKey="budget" name="Budget" fill="#94A3B8" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="spent" name="Spent" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Cost Breakdown" description="Spend distribution by category">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={charts.costBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {charts.costBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={tooltipStyle}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        <TabsContent value="materials" className="mt-4">
          <ChartCard title="Material Consumption" description="Materials used on this project">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={charts.materialUsage} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="material" tick={{ fontSize: 12 }} width={70} />
                <Tooltip
                  formatter={(value, _name, props) => [
                    `${Number(value)} ${props.payload.unit}`,
                    "Used",
                  ]}
                  contentStyle={tooltipStyle}
                />
                <Bar dataKey="used" fill="#10B981" radius={[0, 6, 6, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="spending" className="mt-4">
          <ChartCard title="Monthly Spending Trend" description="Planned vs actual spend by month">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={charts.monthlySpend}>
                <defs>
                  <linearGradient id="plannedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#94A3B8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => formatCompactCurrency(v)} tick={{ fontSize: 11 }} width={56} />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={tooltipStyle}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="planned"
                  name="Planned"
                  stroke="#94A3B8"
                  fill="url(#plannedGrad)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  name="Actual"
                  stroke="#2563EB"
                  fill="url(#actualGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>
      </Tabs>

      {/* Milestones + Site updates */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Project Timeline</CardTitle>
            <CardDescription>Milestone progress and due dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-0">
            {project.milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative flex gap-4 pb-6 last:pb-0">
                {index < project.milestones.length - 1 ? (
                  <span className="absolute top-6 left-[11px] h-[calc(100%-12px)] w-px bg-border" />
                ) : null}
                <div className="relative z-10 mt-1 size-[22px] shrink-0 rounded-full border-2 border-background bg-blue-500 shadow-[0_0_0_3px_rgba(37,99,235,0.15)]" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{milestone.name}</p>
                    <StatusBadge config={MILESTONE_STATUS_CONFIG[milestone.status]} size="sm" />
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Due {formatDate(milestone.dueDate)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Site Updates</CardTitle>
            <CardDescription>Latest progress from site engineers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {charts.siteUpdates.map((update) => (
              <div key={update.id} className="rounded-lg border bg-muted/20 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{update.title}</p>
                  <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                    {formatDate(update.date)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{update.note}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Budget donut summary */}
      <Card className="rounded-xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Budget Allocation</CardTitle>
          <CardDescription>
            {formatCurrency(project.spent)} spent of {formatCurrency(project.budget)} total budget
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="h-[200px] w-full max-w-[220px]">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budgetChartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {budgetChartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={tooltipStyle} />
            </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid flex-1 gap-3 sm:grid-cols-2">
            {charts.costBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-3 rounded-lg border p-3">
                <span
                  className="size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{item.name}</p>
                  <p className="font-semibold tabular-nums">{formatCurrency(item.value)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent className={cn("text-xl font-semibold tabular-nums", accent)}>
        {value}
      </CardContent>
    </Card>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-muted/20 p-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function SnapshotRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border px-3 py-2.5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </div>
      <span className="text-lg font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
