"use client";

import Link from "next/link";
import {
  Building2,
  Camera,
  Clock,
  CloudSun,
  HardHat,
  MessageSquare,
  Truck,
  Users,
  Wrench,
} from "lucide-react";

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
import { getMaterialTotals } from "@/data/dpr";
import { formatDate, formatDateTime, formatNumber } from "@/lib/formatters";
import { DPR_STATUS_CONFIG } from "@/lib/status-colors";
import type { DailyProgressReport } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DprDetailViewProps = {
  report: DailyProgressReport;
};

export function DprDetailView({ report }: DprDetailViewProps) {
  const materials = getMaterialTotals(report);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard icon={Users} label="Workers" value={formatNumber(report.workers)} />
        <MetricCard icon={Truck} label="Machines" value={String(report.machines)} />
        <MetricCard icon={Clock} label="Hours Worked" value={`${report.hoursWorked}h`} />
        <MetricCard icon={CloudSun} label="Weather" value={report.weather} compact />
        <MetricCard
          icon={HardHat}
          label="Engineer"
          value={report.engineer}
          compact
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl shadow-sm lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Today&apos;s Work</CardTitle>
            <CardDescription>Progress summary submitted by site engineer</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-foreground/90">{report.workDone}</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Project</CardTitle>
            <CardDescription>Linked construction site</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={`/projects/${report.projectId}`}
              className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:border-blue-300 hover:bg-blue-500/5 dark:hover:border-blue-500/40"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                <Building2 className="size-5" />
              </span>
              <div>
                <p className="font-semibold">{report.projectName}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Report date: {formatDate(report.date)}
                </p>
                {report.submittedAt ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Submitted {formatDateTime(report.submittedAt)}
                  </p>
                ) : null}
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Materials Used</CardTitle>
            <CardDescription>Consumption logged for this report</CardDescription>
          </CardHeader>
          <CardContent className="p-0 pb-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Material</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="pr-6 text-right">Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.materialsUsed.map((item) => (
                  <TableRow key={item.material}>
                    <TableCell className="pl-6 font-medium">{item.material}</TableCell>
                    <TableCell className="tabular-nums">{formatNumber(item.quantity)}</TableCell>
                    <TableCell className="pr-6 text-right text-muted-foreground">{item.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Machines Deployed</CardTitle>
            <CardDescription>Equipment active on site during this shift</CardDescription>
          </CardHeader>
          <CardContent>
            {report.machinesList.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {report.machinesList.map((machine) => (
                  <li
                    key={machine}
                    className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                  >
                    <Wrench className="size-3.5 shrink-0 text-amber-600" />
                    {machine}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">No machines logged.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="size-4" />
            Remarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{report.remarks}</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Photo Gallery</CardTitle>
          <CardDescription>Site photos attached to this progress report</CardDescription>
        </CardHeader>
        <CardContent>
          {report.photos.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {report.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group overflow-hidden rounded-xl border"
                >
                  <div
                    className={cn(
                      "flex aspect-video items-center justify-center bg-gradient-to-br",
                      photo.gradient,
                    )}
                  >
                    <Camera className="size-8 text-white/60 transition-transform group-hover:scale-110" />
                  </div>
                  <p className="border-t px-3 py-2 text-xs text-muted-foreground">{photo.caption}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
              <Camera className="size-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No photos uploaded yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SnapshotStat label="Cement" value={`${materials.cement} bags`} />
        <SnapshotStat label="Steel" value={`${materials.steel} tons`} />
        <SnapshotStat label="Bricks" value={materials.bricks > 0 ? formatNumber(materials.bricks) : "—"} />
        <SnapshotStat label="Sand" value={materials.sand > 0 ? `${materials.sand} cft` : "—"} />
      </div>
    </div>
  );
}

export function DprDetailActions() {
  return (
    <Link href="/dpr" className={buttonVariants({ variant: "outline", size: "sm" })}>
      All Reports
    </Link>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  compact,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="flex items-start gap-3 p-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className={cn("mt-0.5 font-semibold tabular-nums", compact ? "truncate text-sm" : "text-lg")}>
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function SnapshotStat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="p-4 text-center">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 font-semibold tabular-nums">{value}</p>
      </CardContent>
    </Card>
  );
}
