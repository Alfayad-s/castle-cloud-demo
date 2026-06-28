import {
  chartData,
  getActiveProjects,
  getLiveDashboardStats,
  getNetProfit,
  getProfitMargin,
  getTodaysSiteUpdates,
  quickActions,
  recentActivities,
} from "@/data/dashboard";
import { PageShell } from "@/components/layout/page-shell";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default function DashboardPage() {
  const stats = getLiveDashboardStats();

  return (
    <PageShell
      title="Dashboard"
      description="Overview of projects, inventory, labour, and financial metrics."
    >
      <DashboardView
        stats={stats}
        netProfit={getNetProfit()}
        profitMargin={getProfitMargin()}
        chartData={chartData}
        activities={recentActivities}
        siteUpdates={getTodaysSiteUpdates()}
        activeProjects={getActiveProjects()}
        quickActions={quickActions}
      />
    </PageShell>
  );
}
