import {
  dailyProgressReports,
  dprSubmissionTrend,
  getDprStats,
  getLastWeekDprs,
  getTodaysDprs,
  getWeeklyMaterialTotals,
  getYesterdaysDprs,
  siteWorkerSummary,
  weeklyHoursTrend,
  weeklyMaterialUsage,
} from "@/data/dpr";
import { PageShell } from "@/components/layout/page-shell";
import { DprView } from "@/components/dpr/dpr-view";

export default function DprPage() {
  const stats = getDprStats();
  const weeklyTotals = getWeeklyMaterialTotals();

  return (
    <PageShell
      title="Daily Progress Reports"
      description="Site engineers upload daily work progress, photos, and material usage."
      breadcrumbs={[{ label: "DPR" }]}
    >
      <DprView
        reports={dailyProgressReports}
        stats={stats}
        todaysDprs={getTodaysDprs()}
        yesterdaysDprs={getYesterdaysDprs()}
        lastWeekDprs={getLastWeekDprs()}
        weeklyMaterialUsage={weeklyMaterialUsage}
        weeklyHoursTrend={weeklyHoursTrend}
        siteWorkerSummary={siteWorkerSummary}
        dprSubmissionTrend={dprSubmissionTrend}
        weeklyTotals={weeklyTotals}
      />
    </PageShell>
  );
}
