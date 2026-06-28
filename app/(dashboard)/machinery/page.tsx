import { PageShell } from "@/components/layout/page-shell";
import { MachineryPageClient } from "@/components/machinery/machinery-page-client";

export default function MachineryPage() {
  return (
    <PageShell
      title="Machinery"
      description="Track equipment, operators, fuel levels, and maintenance schedules."
      breadcrumbs={[{ label: "Machinery" }]}
    >
      <MachineryPageClient />
    </PageShell>
  );
}
