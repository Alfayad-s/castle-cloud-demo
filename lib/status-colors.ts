import type {
  ProjectStatus,
  PurchaseOrderStatus,
  AttendanceStatus,
  DprStatus,
  MachineStatus,
  PaymentStatus,
  InvoiceStatus,
} from "@/types";

export type StatusTone =
  | "blue"
  | "amber"
  | "emerald"
  | "rose"
  | "violet"
  | "slate"
  | "orange"
  | "cyan";

export type StatusConfig = {
  label: string;
  tone: StatusTone;
};

export const STATUS_TONE_STYLES: Record<
  StatusTone,
  { badge: string; dot: string }
> = {
  blue: {
    badge:
      "border-blue-200/80 bg-blue-50 text-blue-700 shadow-blue-500/5 dark:border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-300",
    dot: "bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.6)]",
  },
  amber: {
    badge:
      "border-amber-200/80 bg-amber-50 text-amber-800 shadow-amber-500/5 dark:border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-300",
    dot: "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]",
  },
  emerald: {
    badge:
      "border-emerald-200/80 bg-emerald-50 text-emerald-700 shadow-emerald-500/5 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300",
    dot: "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]",
  },
  rose: {
    badge:
      "border-rose-200/80 bg-rose-50 text-rose-700 shadow-rose-500/5 dark:border-rose-500/30 dark:bg-rose-500/15 dark:text-rose-300",
    dot: "bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]",
  },
  violet: {
    badge:
      "border-violet-200/80 bg-violet-50 text-violet-700 shadow-violet-500/5 dark:border-violet-500/30 dark:bg-violet-500/15 dark:text-violet-300",
    dot: "bg-violet-500 shadow-[0_0_6px_rgba(139,92,246,0.6)]",
  },
  slate: {
    badge:
      "border-slate-200/80 bg-slate-50 text-slate-700 shadow-slate-500/5 dark:border-slate-500/30 dark:bg-slate-500/15 dark:text-slate-300",
    dot: "bg-slate-400 shadow-[0_0_6px_rgba(148,163,184,0.5)]",
  },
  orange: {
    badge:
      "border-orange-200/80 bg-orange-50 text-orange-700 shadow-orange-500/5 dark:border-orange-500/30 dark:bg-orange-500/15 dark:text-orange-300",
    dot: "bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.6)]",
  },
  cyan: {
    badge:
      "border-cyan-200/80 bg-cyan-50 text-cyan-700 shadow-cyan-500/5 dark:border-cyan-500/30 dark:bg-cyan-500/15 dark:text-cyan-300",
    dot: "bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.6)]",
  },
};

export const PROJECT_STATUS_CONFIG: Record<ProjectStatus, StatusConfig> = {
  planning: { label: "Planning", tone: "blue" },
  "in-progress": { label: "In Progress", tone: "amber" },
  "on-hold": { label: "On Hold", tone: "rose" },
  completed: { label: "Completed", tone: "emerald" },
};

export const MILESTONE_STATUS_CONFIG: Record<
  "completed" | "in-progress" | "pending",
  StatusConfig
> = {
  completed: { label: "Completed", tone: "emerald" },
  "in-progress": { label: "In Progress", tone: "blue" },
  pending: { label: "Pending", tone: "slate" },
};

export const PO_STATUS_CONFIG: Record<PurchaseOrderStatus, StatusConfig> = {
  requested: { label: "Requested", tone: "slate" },
  approved: { label: "Approved", tone: "blue" },
  ordered: { label: "Ordered", tone: "amber" },
  delivered: { label: "Delivered", tone: "violet" },
  completed: { label: "Completed", tone: "emerald" },
};

export function formatStatusLabel(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getStatusConfig(
  status: string,
  map: Record<string, StatusConfig>,
): StatusConfig {
  return (
    map[status] ?? {
      label: formatStatusLabel(status),
      tone: "slate" as StatusTone,
    }
  );
}

export function getProgressTone(progress: number): StatusTone {
  if (progress >= 100) return "emerald";
  if (progress >= 60) return "blue";
  if (progress >= 30) return "amber";
  return "orange";
}

export const STOCK_STATUS = {
  low: { label: "Low Stock", tone: "rose" as StatusTone },
  warning: { label: "Near Minimum", tone: "amber" as StatusTone },
  healthy: { label: "In Stock", tone: "emerald" as StatusTone },
} satisfies Record<string, StatusConfig>;

export function getStockStatus(current: number, minimum: number): StatusConfig {
  if (current <= minimum) return STOCK_STATUS.low;
  if (current <= minimum * 1.25) return STOCK_STATUS.warning;
  return STOCK_STATUS.healthy;
}

export function getStockLevelPercent(current: number, minimum: number): number {
  const target = minimum * 2;
  return Math.min(100, Math.round((current / target) * 100));
}

export const ATTENDANCE_STATUS_CONFIG: Record<AttendanceStatus, StatusConfig> = {
  present: { label: "Present", tone: "emerald" },
  absent: { label: "Absent", tone: "rose" },
  late: { label: "Late", tone: "amber" },
};

export const DPR_STATUS_CONFIG: Record<DprStatus, StatusConfig> = {
  draft: { label: "Draft", tone: "slate" },
  submitted: { label: "Submitted", tone: "blue" },
  approved: { label: "Approved", tone: "emerald" },
};

export const MACHINE_STATUS_CONFIG: Record<MachineStatus, StatusConfig> = {
  active: { label: "Active", tone: "emerald" },
  maintenance: { label: "Maintenance", tone: "amber" },
  idle: { label: "Idle", tone: "slate" },
};

export function getFuelLevelTone(level: number): StatusTone {
  if (level <= 20) return "rose";
  if (level <= 40) return "amber";
  return "emerald";
}

export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, StatusConfig> = {
  paid: { label: "Paid", tone: "emerald" },
  pending: { label: "Pending", tone: "amber" },
  upcoming: { label: "Upcoming", tone: "blue" },
  overdue: { label: "Overdue", tone: "rose" },
};

export const INVOICE_STATUS_CONFIG: Record<InvoiceStatus, StatusConfig> = {
  paid: { label: "Paid", tone: "emerald" },
  pending: { label: "Pending", tone: "amber" },
  overdue: { label: "Overdue", tone: "rose" },
};
