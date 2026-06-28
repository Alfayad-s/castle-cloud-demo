"use client";

import { useMemo } from "react";

import { AnalyticsView } from "@/components/analytics/analytics-view";
import { CrudToolbar } from "@/components/crud/crud-toolbar";
import { useDemoData } from "@/hooks/use-demo-data";
import { chartData } from "@/data/dashboard";
import {
  expenseBreakdown,
  labourCostTrend,
  machineUsageByType,
  machineUsageTrend,
  materialCostTrend,
  purchaseTrend,
  revenueVsExpenses,
} from "@/data/analytics";
import {
  computeAnalyticsStats,
  computeCostByProject,
  computeProjectBudgetVsActual,
  computeProjectCompletion,
  computeVendorSpend,
} from "@/lib/live-stats";

export function AnalyticsPageClient() {
  const { projects, purchaseOrders, resetDemoData, isReady } = useDemoData();

  const stats = useMemo(() => computeAnalyticsStats(projects), [projects]);
  const projectBudgetVsActual = useMemo(() => computeProjectBudgetVsActual(projects), [projects]);
  const projectCompletion = useMemo(() => computeProjectCompletion(projects), [projects]);
  const costByProject = useMemo(() => computeCostByProject(projects), [projects]);
  const topVendors = useMemo(
    () => computeVendorSpend(purchaseOrders).sort((a, b) => b.value - a.value),
    [purchaseOrders],
  );

  if (!isReady) {
    return <p className="text-sm text-muted-foreground">Loading analytics...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <CrudToolbar onReset={resetDemoData} />
      <AnalyticsView
        stats={stats}
        revenueVsExpenses={revenueVsExpenses}
        expenseBreakdown={expenseBreakdown}
        labourCostTrend={labourCostTrend}
        materialCostTrend={materialCostTrend}
        projectBudgetVsActual={projectBudgetVsActual}
        projectCompletion={projectCompletion}
        purchaseTrend={purchaseTrend}
        topVendors={topVendors}
        machineUsageTrend={machineUsageTrend}
        machineUsageByType={machineUsageByType}
        costByProject={costByProject}
        materialConsumption={chartData.materialConsumption}
      />
    </div>
  );
}
