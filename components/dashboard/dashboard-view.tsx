"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock,
  Package,
  Plus,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useAuth } from "@/hooks/use-auth";
import { ProgressCell, StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Activity, DailyProgressReport, DashboardStats, Project } from "@/types";
import {
  formatCompactCurrency,
  formatCurrency,
  formatDateTime,
  formatPercent,
} from "@/lib/formatters";
import { PROJECT_STATUS_CONFIG } from "@/lib/status-colors";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardViewProps = {
  stats: DashboardStats;
  netProfit: number;
  profitMargin: number;
  chartData: {
    projectProgress: { name: string; progress: number; id: string }[];
    materialConsumption: { month: string; cement: number; steel: number; sand: number }[];
    budgetVsActual: { project: string; budget: number; actual: number }[];
    monthlyExpenses: { month: string; amount: number }[];
  };
  activities: Activity[];
  siteUpdates: DailyProgressReport[];
  activeProjects: Project[];
  quickActions: {
    label: string;
    description: string;
    href: string;
    tone: "blue" | "amber" | "emerald" | "violet";
  }[];
};

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
};

const activityColors = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
  danger: "bg-rose-500",
};

const quickActionIcons = {
  "New Project": Building2,
  "Create Purchase Order": ShoppingCart,
  "Upload DPR": ClipboardList,
  "Add Material": Package,
};

const quickActionTones = {
  blue: "bg-blue-500/10 text-blue-600 group-hover:bg-blue-500/15",
  amber: "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500/15",
  emerald: "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500/15",
  violet: "bg-violet-500/10 text-violet-600 group-hover:bg-violet-500/15",
};

export function DashboardView({
  stats,
  netProfit,
  profitMargin,
  chartData,
  activities,
  siteUpdates,
  activeProjects,
  quickActions,
}: DashboardViewProps) {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-xl border-blue-200/50 bg-gradient-to-r from-blue-500/5 via-transparent to-emerald-500/5 shadow-sm dark:border-blue-500/20">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h2 className="text-xl font-semibold">{firstName} 👋</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {stats.runningProjects} active sites · {stats.activeMachines} machines running ·{" "}
              {formatPercent(stats.todaysAttendance)} attendance today
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/projects" className={buttonVariants({ size: "sm" })}>
              <Plus className="size-4" />
              New Project
            </Link>
            <Link href="/analytics" className={buttonVariants({ variant: "outline", size: "sm" })}>
              View Analytics
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Building2}
          label="Running Projects"
          value={String(stats.runningProjects)}
          tone="blue"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed Projects"
          value={String(stats.completedProjects)}
          tone="emerald"
        />
        <StatCard
          icon={Clock}
          label="Pending Payments"
          value={String(stats.pendingPayments)}
          tone="amber"
        />
        <StatCard
          icon={Users}
          label="Today's Attendance"
          value={formatPercent(stats.todaysAttendance)}
          tone="violet"
        />
        <StatCard
          icon={Package}
          label="Low Stock Alerts"
          value={String(stats.lowStockAlerts)}
          tone="rose"
          highlight={stats.lowStockAlerts > 0}
        />
        <StatCard
          icon={Truck}
          label="Active Machines"
          value={String(stats.activeMachines)}
          tone="cyan"
        />
        <StatCard
          icon={TrendingUp}
          label="Revenue"
          value={formatCompactCurrency(stats.revenue)}
          tone="emerald"
          hint={`${profitMargin}% margin`}
        />
        <StatCard
          icon={TrendingDown}
          label="Expenses"
          value={formatCompactCurrency(stats.expenses)}
          tone="rose"
          hint={`Net ${formatCompactCurrency(netProfit)}`}
        />
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">Quick Actions</p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = quickActionIcons[action.label as keyof typeof quickActionIcons] ?? Plus;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="group flex items-center gap-3 rounded-xl border p-4 transition-all hover:border-blue-300 hover:shadow-sm dark:hover:border-blue-500/40"
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                    quickActionTones[action.tone],
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {action.label}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Project Progress</CardTitle>
            <CardDescription>Completion percentage across all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData.projectProgress} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Progress"]} />
                <Bar dataKey="progress" name="Progress" fill="#2563EB" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Budget vs Actual</CardTitle>
            <CardDescription>Planned budget compared to spend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData.budgetVsActual}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="project" tick={{ fontSize: 11 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  width={48}
                  tickFormatter={(v) => formatCompactCurrency(v)}
                />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatCurrency(Number(v))} />
                <Legend />
                <Bar dataKey="budget" name="Budget" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Material Consumption</CardTitle>
            <CardDescription>Monthly cement, steel & sand usage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData.materialConsumption}>
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
            <CardTitle className="text-base">Monthly Expenses</CardTitle>
            <CardDescription>Operating expense trend over 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData.monthlyExpenses}>
                <defs>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
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
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatCurrency(Number(v))} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  name="Expenses"
                  stroke="#EF4444"
                  fill="url(#expenseGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Activities</CardTitle>
            <CardDescription>Latest updates across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-3 rounded-lg border p-3">
                  <span
                    className={cn(
                      "mt-1.5 size-2 shrink-0 rounded-full",
                      activityColors[activity.type],
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
                      {formatDateTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Today&apos;s Site Updates</CardTitle>
            <CardDescription>Daily progress reports submitted today</CardDescription>
          </CardHeader>
          <CardContent>
            {siteUpdates.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No site updates submitted today.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {siteUpdates.map((update) => (
                  <Link
                    key={update.id}
                    href={`/dpr/${update.id}`}
                    className="group rounded-lg border p-3 transition-colors hover:border-blue-300 hover:bg-blue-500/5 dark:hover:border-blue-500/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {update.projectName}
                      </p>
                      <span className="text-xs text-muted-foreground">{update.engineer}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {update.workDone}
                    </p>
                    <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                      <span>{update.workers} workers</span>
                      <span>{update.hoursWorked}h worked</span>
                      <span>{update.weather}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Active Projects</CardTitle>
              <CardDescription>Running and planning projects overview</CardDescription>
            </div>
            <Link
              href="/projects"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              View all
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {activeProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group grid gap-3 rounded-lg border p-4 transition-colors hover:border-blue-300 hover:bg-blue-500/5 sm:grid-cols-[1fr_auto_140px] sm:items-center dark:hover:border-blue-500/40"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {project.name}
                    </p>
                    <StatusBadge config={PROJECT_STATUS_CONFIG[project.status]} size="sm" />
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {project.location} · PM: {project.manager}
                  </p>
                </div>
                <div className="text-sm tabular-nums text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {formatCompactCurrency(project.spent)}
                  </span>
                  <span> / {formatCompactCurrency(project.budget)}</span>
                </div>
                <ProgressCell value={project.progress} />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
  hint,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: "blue" | "emerald" | "amber" | "violet" | "rose" | "cyan";
  hint?: string;
  highlight?: boolean;
}) {
  const tones = {
    blue: "bg-blue-500/10 text-blue-600",
    emerald: "bg-emerald-500/10 text-emerald-600",
    amber: "bg-amber-500/10 text-amber-600",
    violet: "bg-violet-500/10 text-violet-600",
    rose: "bg-rose-500/10 text-rose-600",
    cyan: "bg-cyan-500/10 text-cyan-600",
  };

  return (
    <Card
      className={cn(
        "rounded-xl shadow-sm transition-shadow hover:shadow-md",
        highlight && "border-rose-200 dark:border-rose-500/30",
      )}
    >
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
