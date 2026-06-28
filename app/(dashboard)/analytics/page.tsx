import { chartData } from "@/data/dashboard";
import {
  costByProject,
  expenseBreakdown,
  getAnalyticsStats,
  labourCostTrend,
  machineUsageByType,
  machineUsageTrend,
  materialCostTrend,
  projectBudgetVsActual,
  projectCompletion,
  purchaseTrend,
  revenueVsExpenses,
  topVendors,
} from "@/data/analytics";
import { PageShell } from "@/components/layout/page-shell";
import { AnalyticsView } from "@/components/analytics/analytics-view";

export default function AnalyticsPage() {
  const stats = getAnalyticsStats();

  return (
    <PageShell
      title="Analytics"
      description="Budget vs actual, revenue, expenses, and project performance insights."
      breadcrumbs={[{ label: "Analytics" }]}
    >
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
    </PageShell>
  );
}
