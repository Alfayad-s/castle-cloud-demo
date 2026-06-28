import { cn } from "@/lib/utils";
import {
  STATUS_TONE_STYLES,
  type StatusConfig,
  type StatusTone,
} from "@/lib/status-colors";

type StatusBadgeProps = {
  config: StatusConfig;
  className?: string;
  showDot?: boolean;
  size?: "sm" | "md";
};

export function StatusBadge({
  config,
  className,
  showDot = true,
  size = "md",
}: StatusBadgeProps) {
  const styles = STATUS_TONE_STYLES[config.tone];

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full border font-medium shadow-sm",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        styles.badge,
        className,
      )}
    >
      {showDot ? (
        <span
          className={cn("size-1.5 shrink-0 rounded-full", styles.dot)}
          aria-hidden
        />
      ) : null}
      {config.label}
    </span>
  );
}

type ProgressCellProps = {
  value: number;
  className?: string;
};

export function ProgressCell({ value, className }: ProgressCellProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const tone = getProgressBarTone(clamped);

  return (
    <div className={cn("flex min-w-[88px] flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-semibold tabular-nums text-foreground">{clamped}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all", PROGRESS_BAR_STYLES[tone])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

const PROGRESS_BAR_STYLES: Record<StatusTone, string> = {
  blue: "bg-gradient-to-r from-blue-400 to-blue-600",
  amber: "bg-gradient-to-r from-amber-400 to-amber-500",
  emerald: "bg-gradient-to-r from-emerald-400 to-emerald-600",
  rose: "bg-gradient-to-r from-rose-400 to-rose-500",
  violet: "bg-gradient-to-r from-violet-400 to-violet-600",
  slate: "bg-gradient-to-r from-slate-300 to-slate-400",
  orange: "bg-gradient-to-r from-orange-400 to-orange-500",
  cyan: "bg-gradient-to-r from-cyan-400 to-cyan-500",
};

function getProgressBarTone(progress: number): StatusTone {
  if (progress >= 100) return "emerald";
  if (progress >= 60) return "blue";
  if (progress >= 30) return "amber";
  return "orange";
}
