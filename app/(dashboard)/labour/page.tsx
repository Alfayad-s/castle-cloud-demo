import { PageShell } from "@/components/layout/page-shell";
import { LabourPageClient } from "@/components/labour/labour-page-client";

export default function LabourPage() {
  return (
    <PageShell
      title="Labour Management"
      description="Employee records, attendance, payroll preview, and workforce analytics."
      breadcrumbs={[{ label: "Labour" }]}
    >
      <LabourPageClient />
    </PageShell>
  );
}
