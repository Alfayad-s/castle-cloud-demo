"use client";

import { useMemo } from "react";
import { toast } from "sonner";

import { DprView } from "@/components/dpr/dpr-view";
import { CrudToolbar } from "@/components/crud/crud-toolbar";
import { DeleteConfirmDialog } from "@/components/crud/delete-confirm-dialog";
import { EntityFormDialog } from "@/components/crud/entity-form-dialog";
import { useCrudState } from "@/hooks/use-crud-state";
import { useDemoData } from "@/hooks/use-demo-data";
import {
  dprSubmissionTrend,
  getWeeklyMaterialTotals,
  siteWorkerSummary,
  weeklyHoursTrend,
  weeklyMaterialUsage,
} from "@/data/dpr";
import { dprFields } from "@/lib/crud-schemas";
import { computeDprStats } from "@/lib/live-stats";
import type { DailyProgressReport } from "@/types";

const TODAY = "2026-06-27";
const YESTERDAY = "2026-06-26";

const defaultDpr = {
  projectId: "proj-001",
  projectName: "Luxury Villa",
  date: TODAY,
  engineer: "",
  weather: "Clear",
  workers: 0,
  machines: 0,
  machinesList: [] as string[],
  workDone: "",
  materialsUsed: [] as DailyProgressReport["materialsUsed"],
  remarks: "",
  hoursWorked: 8,
  status: "draft" as const,
  photos: [] as DailyProgressReport["photos"],
};

export function DprPageClient() {
  const { dpr, createDpr, updateDpr, deleteDpr, resetDemoData, isReady } = useDemoData();
  const crud = useCrudState<DailyProgressReport>();

  const stats = useMemo(
    () =>
      computeDprStats(
        dpr,
        weeklyHoursTrend.reduce((sum, day) => sum + day.hours, 0),
      ),
    [dpr],
  );

  const todaysDprs = useMemo(() => dpr.filter((report) => report.date === TODAY), [dpr]);
  const yesterdaysDprs = useMemo(() => dpr.filter((report) => report.date === YESTERDAY), [dpr]);
  const lastWeekDprs = useMemo(() => {
    const cutoff = new Date(TODAY);
    cutoff.setDate(cutoff.getDate() - 7);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    return dpr
      .filter((report) => report.date >= cutoffStr && report.date < TODAY)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [dpr]);

  if (!isReady) {
    return <p className="text-sm text-muted-foreground">Loading DPR...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <CrudToolbar addLabel="Add DPR" onAdd={crud.startCreate} onReset={resetDemoData} />
      <DprView
        reports={dpr}
        stats={stats}
        todaysDprs={todaysDprs}
        yesterdaysDprs={yesterdaysDprs}
        lastWeekDprs={lastWeekDprs}
        weeklyMaterialUsage={weeklyMaterialUsage}
        weeklyHoursTrend={weeklyHoursTrend}
        siteWorkerSummary={siteWorkerSummary}
        dprSubmissionTrend={dprSubmissionTrend}
        weeklyTotals={getWeeklyMaterialTotals()}
        onEditReport={crud.startEdit}
        onDeleteReport={(report) => crud.deleteDialog.askDelete(() => deleteDpr(report.id))}
      />
      <EntityFormDialog
        open={crud.open}
        onOpenChange={crud.setOpen}
        title={crud.editing ? "Edit DPR" : "Add DPR"}
        description="Changes are saved to browser localStorage in demo mode."
        fields={dprFields}
        initialValues={crud.editing ?? defaultDpr}
        onSubmit={(values) => {
          if (crud.editing) {
            updateDpr(crud.editing.id, values as Partial<DailyProgressReport>);
            toast.success("DPR updated");
          } else {
            createDpr({ ...defaultDpr, ...(values as Omit<DailyProgressReport, "id">) });
            toast.success("DPR created");
          }
        }}
      />
      <DeleteConfirmDialog
        open={crud.deleteDialog.open}
        onOpenChange={crud.deleteDialog.setOpen}
        onConfirm={crud.deleteDialog.onConfirm}
      />
    </div>
  );
}
