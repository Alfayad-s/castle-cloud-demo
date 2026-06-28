import { PageShell } from "@/components/layout/page-shell";
import { AnalyticsPageClient } from "@/components/analytics/analytics-page-client";

export default function AnalyticsPage() {
  return (
    <PageShell
      title="Analytics"
      description="Budget vs actual, revenue, expenses, and project performance insights."
      breadcrumbs={[{ label: "Analytics" }]}
    >
      <AnalyticsPageClient />
    </PageShell>
  );
}
