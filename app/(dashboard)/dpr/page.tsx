import { PageShell } from "@/components/layout/page-shell";
import { DprPageClient } from "@/components/dpr/dpr-page-client";

export default function DprPage() {
  return (
    <PageShell
      title="Daily Progress Reports"
      description="Site engineers upload daily work progress, photos, and material usage."
      breadcrumbs={[{ label: "DPR" }]}
    >
      <DprPageClient />
    </PageShell>
  );
}
