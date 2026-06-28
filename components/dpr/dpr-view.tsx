"use client";

import Link from "next/link";
import {
  ClipboardCheck,
  Clock,
  CloudSun,
  HardHat,
  Truck,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DprTable } from "@/components/dpr/dpr-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DailyProgressReport, DprStats } from "@/types";
import { formatDate, formatNumber } from "@/lib/formatters";
import { DPR_STATUS_CONFIG } from "@/lib/status-colors";

type DprViewProps = {
  reports: DailyProgressReport[];
  stats: DprStats;
  todaysDprs: DailyProgressReport[];
  yesterdaysDprs: DailyProgressReport[];
  lastWeekDprs: DailyProgressReport[];
  weeklyMaterialUsage: {
    day: string;
    cement: number;
    steel: number;
    bricks: number;
    sand: number;
  }[];
  weeklyHoursTrend: { day: string; hours: number }[];
  siteWorkerSummary: {
    site: string;
    workers: number;
    machines: number;
    reports: number;
  }[];
  dprSubmissionTrend: { week: string; submitted: number; approved: number }[];
  weeklyTotals: {
    cement: number;
    steel: number;
    bricks: number;
    sand: number;
    hours: number;
  };
};

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
};

export function DprView({
  reports,
  stats,
  todaysDprs,
  yesterdaysDprs,
  lastWeekDprs,
  weeklyMaterialUsage,
  weeklyHoursTrend,
  siteWorkerSummary,
  dprSubmissionTrend,
  weeklyTotals,
}: DprViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          icon={ClipboardCheck}
          label="Total Reports"
          value={String(stats.totalReports)}
          tone="blue"
        />
        <StatCard
          icon={CloudSun}
          label="Submitted Today"
          value={String(stats.submittedToday)}
          tone="emerald"
          hint={`${stats.pendingReview} draft pending`}
        />
        <StatCard
          icon={Users}
          label="Workers On Site"
          value={formatNumber(stats.workersOnSiteToday)}
          tone="violet"
        />
        <StatCard
          icon={Truck}
          label="Active Machines"
          value={String(stats.machinesActiveToday)}
          tone="amber"
        />
        <StatCard
          icon={Clock}
          label="Hours This Week"
          value={`${weeklyTotals.hours}h`}
          tone="cyan"
        />
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="h-9">
          <TabsTrigger value="reports">All Reports</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="mt-4">
          <DprTable data={reports} />
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <div className="flex flex-col gap-4">
            <TimelineSection title="Today's Progress" reports={todaysDprs} empty="No DPRs submitted today yet." />
            <TimelineSection title="Yesterday" reports={yesterdaysDprs} empty="No reports from yesterday." />
            <TimelineSection
              title="Last 7 Days"
              reports={lastWeekDprs}
              empty="No reports in the last week."
              compact
            />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MaterialStat label="Cement Used" value={`${formatNumber(weeklyTotals.cement)} bags`} />
            <MaterialStat label="Steel Used" value={`${weeklyTotals.steel} tons`} />
            <MaterialStat label="Bricks Used" value={formatNumber(weeklyTotals.bricks)} />
            <MaterialStat label="Sand Used" value={`${formatNumber(weeklyTotals.sand)} cft`} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Weekly Material Usage</CardTitle>
                <CardDescription>Daily consumption across all active sites</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={weeklyMaterialUsage}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 11 }} width={40} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar dataKey="cement" name="Cement (bags)" fill="#2563EB" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="steel" name="Steel (tons)" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="bricks" name="Bricks" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Hours Worked</CardTitle>
                <CardDescription>Total site hours logged per day this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={weeklyHoursTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 11 }} width={32} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line
                      type="monotone"
                      dataKey="hours"
                      name="Hours"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={{ fill: "#8B5CF6", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Today's Workforce by Site</CardTitle>
                <CardDescription>Workers and machines deployed today</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={siteWorkerSummary}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="site" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} width={32} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar dataKey="workers" name="Workers" fill="#2563EB" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="machines" name="Machines" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Submission Trend</CardTitle>
                <CardDescription>Weekly DPR submissions vs approvals</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={dprSubmissionTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} width={32} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar dataKey="submitted" name="Submitted" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="approved" name="Approved" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TimelineSection({
  title,
  reports,
  empty,
  compact,
}: {
  title: string;
  reports: DailyProgressReport[];
  empty: string;
  compact?: boolean;
}) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>
          {reports.length} report{reports.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {reports.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">{empty}</p>
        ) : (
          <div className="flex flex-col gap-3">
            {reports.map((report) => (
              <Link
                key={report.id}
                href={`/dpr/${report.id}`}
                className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:border-blue-300 hover:bg-blue-500/5 dark:hover:border-blue-500/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {report.projectName}
                    </span>
                    <StatusBadge config={DPR_STATUS_CONFIG[report.status]} size="sm" />
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {formatDate(report.date)}
                    {!compact && report.submittedAt
                      ? ` · ${new Date(report.submittedAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`
                      : null}
                  </span>
                </div>
                <p className={`text-sm text-muted-foreground ${compact ? "line-clamp-1" : "line-clamp-2"}`}>
                  {report.workDone}
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <HardHat className="size-3" />
                    {report.engineer}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="size-3" />
                    {report.workers} workers
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="size-3" />
                    {report.machines} machines
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {report.hoursWorked}h
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
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
  tone: "blue" | "emerald" | "violet" | "amber" | "cyan";
  hint?: string;
}) {
  const tones = {
    blue: "bg-blue-500/10 text-blue-600",
    emerald: "bg-emerald-500/10 text-emerald-600",
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
          {hint ? <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{hint}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}

function MaterialStat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-lg font-semibold tabular-nums">{value}</p>
      </CardContent>
    </Card>
  );
}
