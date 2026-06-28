"use client";

import Link from "next/link";
import {
  Building2,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  HardHat,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  Receipt,
  TrendingUp,
  User,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ProgressCell, StatusBadge } from "@/components/ui/status-badge";
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
import type { ProjectDetailCharts } from "@/data/project-details";
import { getDocumentTypeLabel } from "@/data/client-portal";
import {
  formatCompactCurrency,
  formatCurrency,
  formatDate,
  formatPercent,
} from "@/lib/formatters";
import {
  INVOICE_STATUS_CONFIG,
  MILESTONE_STATUS_CONFIG,
  PAYMENT_STATUS_CONFIG,
  PROJECT_STATUS_CONFIG,
} from "@/lib/status-colors";
import type {
  ClientDocument,
  ClientInvoice,
  ClientPayment,
  ClientPhoto,
  ClientPortalStats,
  ClientProfile,
  ClientTimelineEvent,
  Project,
} from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ClientPortalViewProps = {
  client: ClientProfile;
  project: Project;
  charts: ProjectDetailCharts;
  stats: ClientPortalStats;
  payments: ClientPayment[];
  invoices: ClientInvoice[];
  documents: ClientDocument[];
  photos: ClientPhoto[];
  timeline: ClientTimelineEvent[];
  progressTimeline: { month: string; progress: number }[];
};

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
};

const timelineIcons = {
  milestone: HardHat,
  update: TrendingUp,
  payment: IndianRupee,
  document: FileText,
};

const timelineColors = {
  milestone: "bg-blue-500/10 text-blue-600",
  update: "bg-emerald-500/10 text-emerald-600",
  payment: "bg-violet-500/10 text-violet-600",
  document: "bg-amber-500/10 text-amber-600",
};

export function ClientPortalView({
  client,
  project,
  charts,
  stats,
  payments,
  invoices,
  documents,
  photos,
  timeline,
  progressTimeline,
}: ClientPortalViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-xl border-blue-200/60 bg-gradient-to-r from-blue-500/5 via-transparent to-violet-500/5 shadow-sm dark:border-blue-500/20">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <User className="size-6" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Client Portal Preview
              </p>
              <h2 className="text-lg font-semibold">{client.name}</h2>
              {client.company ? (
                <p className="text-sm text-muted-foreground">{client.company}</p>
              ) : null}
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="size-3" />
                  {client.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="size-3" />
                  {client.phone}
                </span>
              </div>
            </div>
          </div>
          <Link
            href={`/projects/${project.id}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            View Internal Project
          </Link>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
            <Building2 className="size-7" />
          </span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <StatusBadge config={PROJECT_STATUS_CONFIG[project.status]} size="sm" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                Deadline {formatDate(project.deadline)}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="size-3.5" />
                PM: {project.manager}
              </span>
            </div>
          </div>
          <div className="w-full max-w-[180px]">
            <p className="mb-2 text-xs text-muted-foreground">Overall Progress</p>
            <ProgressCell value={project.progress} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={TrendingUp} label="Progress" value={formatPercent(stats.progress)} tone="blue" />
        <StatCard
          icon={CheckCircle2}
          label="Amount Paid"
          value={formatCompactCurrency(stats.amountPaid)}
          tone="emerald"
        />
        <StatCard
          icon={Clock}
          label="Next Payment"
          value={formatCompactCurrency(stats.nextPaymentAmount)}
          tone="amber"
          hint={`Due ${formatDate(stats.nextPaymentDate)}`}
        />
        <StatCard
          icon={Receipt}
          label="Pending Invoices"
          value={String(stats.pendingInvoices)}
          tone="violet"
          hint={`${formatCompactCurrency(stats.amountPending)} remaining`}
        />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="h-9 flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Progress Trend</CardTitle>
                <CardDescription>Monthly completion percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={progressTimeline}>
                    <defs>
                      <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} width={32} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Progress"]} />
                    <Area
                      type="monotone"
                      dataKey="progress"
                      stroke="#2563EB"
                      fill="url(#progressGrad)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Recent Site Updates</CardTitle>
                <CardDescription>Latest progress from your project team</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {charts.siteUpdates.map((update) => (
                  <div key={update.id} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium">{update.title}</p>
                      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                        {formatDate(update.date)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{update.note}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Contract Summary</CardTitle>
                <CardDescription>Payment breakdown for your project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <SummaryBox label="Total Contract" value={formatCurrency(stats.totalContract)} />
                  <SummaryBox
                    label="Paid to Date"
                    value={formatCurrency(stats.amountPaid)}
                    accent="text-emerald-600"
                  />
                  <SummaryBox
                    label="Remaining"
                    value={formatCurrency(stats.amountPending)}
                    accent="text-amber-600"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="mt-4">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Project Milestones</CardTitle>
              <CardDescription>Construction phases and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative flex flex-col gap-0">
                {project.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="relative flex gap-4 pb-8 last:pb-0">
                    {index < project.milestones.length - 1 ? (
                      <span className="absolute left-[15px] top-8 h-[calc(100%-16px)] w-px bg-border" />
                    ) : null}
                    <div
                      className={cn(
                        "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2",
                        milestone.status === "completed" && "border-emerald-500 bg-emerald-500 text-white",
                        milestone.status === "in-progress" &&
                          "border-blue-500 bg-blue-500 text-white shadow-[0_0_0_4px_rgba(37,99,235,0.15)]",
                        milestone.status === "pending" && "border-muted bg-background text-muted-foreground",
                      )}
                    >
                      {milestone.status === "completed" ? (
                        <CheckCircle2 className="size-4" />
                      ) : (
                        <span className="text-xs font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{milestone.name}</p>
                        <StatusBadge config={MILESTONE_STATUS_CONFIG[milestone.status]} size="sm" />
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        Target: {formatDate(milestone.dueDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-4">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Payment Schedule</CardTitle>
              <CardDescription>Milestone-linked payment plan for your project</CardDescription>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Milestone</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead className="pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="pl-6 font-medium">{payment.milestone}</TableCell>
                      <TableCell className="tabular-nums">{formatCurrency(payment.amount)}</TableCell>
                      <TableCell className="tabular-nums text-muted-foreground">
                        {formatDate(payment.dueDate)}
                      </TableCell>
                      <TableCell className="tabular-nums text-muted-foreground">
                        {payment.paidDate ? formatDate(payment.paidDate) : "—"}
                      </TableCell>
                      <TableCell className="pr-6">
                        <StatusBadge config={PAYMENT_STATUS_CONFIG[payment.status]} size="sm" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="mt-4">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Invoices</CardTitle>
              <CardDescription>Billing documents for completed work stages</CardDescription>
            </CardHeader>
            <CardContent className="p-0 pb-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Invoice</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="pr-6">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="pl-6 font-semibold">{invoice.invoiceNumber}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-muted-foreground">
                        {invoice.description}
                      </TableCell>
                      <TableCell className="font-medium tabular-nums">
                        {formatCurrency(invoice.amount)}
                      </TableCell>
                      <TableCell className="tabular-nums text-muted-foreground">
                        {formatDate(invoice.dueDate)}
                      </TableCell>
                      <TableCell className="pr-6">
                        <StatusBadge config={INVOICE_STATUS_CONFIG[invoice.status]} size="sm" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Documents</CardTitle>
              <CardDescription>Agreements, drawings, certificates and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/40"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                      <FileText className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {getDocumentTypeLabel(doc.type)} · {doc.size} · {formatDate(doc.uploadedAt)}
                      </p>
                    </div>
                    <button
                      type="button"
                      className={buttonVariants({ variant: "ghost", size: "sm" })}
                      aria-label={`Download ${doc.name}`}
                    >
                      <Download className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="mt-4">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Site Photos</CardTitle>
              <CardDescription>Progress photos shared by the project team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {photos.map((photo) => (
                  <div key={photo.id} className="group overflow-hidden rounded-xl border">
                    <div
                      className={cn(
                        "flex aspect-video items-center justify-center bg-gradient-to-br",
                        photo.gradient,
                      )}
                    >
                      <Camera className="size-8 text-white/60 transition-transform group-hover:scale-110" />
                    </div>
                    <div className="border-t px-3 py-2">
                      <p className="text-sm font-medium">{photo.caption}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(photo.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Project Timeline</CardTitle>
              <CardDescription>Milestones, updates, and payments in chronological order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {timeline.map((event) => {
                  const Icon = timelineIcons[event.type];
                  return (
                    <div key={event.id} className="flex gap-3">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-lg",
                          timelineColors[event.type],
                        )}
                      >
                        <Icon className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1 border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-medium">{event.title}</p>
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {formatDate(event.date)}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
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
  tone: "blue" | "emerald" | "amber" | "violet";
  hint?: string;
}) {
  const tones = {
    blue: "bg-blue-500/10 text-blue-600",
    emerald: "bg-emerald-500/10 text-emerald-600",
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

function SummaryBox({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-lg border p-4 text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn("mt-1 text-lg font-semibold tabular-nums", accent)}>{value}</p>
    </div>
  );
}
