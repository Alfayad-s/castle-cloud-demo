import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import {
  MachineDetailActions,
  MachineDetailView,
} from "@/components/machinery/machine-detail-view";
import { StatusBadge } from "@/components/ui/status-badge";
import { getMachineById, getMachineWeeklyUsage } from "@/data/machines";
import { MACHINE_STATUS_CONFIG } from "@/lib/status-colors";

type MachineDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MachineDetailPage({ params }: MachineDetailPageProps) {
  const { id } = await params;
  const machine = getMachineById(id);

  if (!machine) {
    notFound();
  }

  const weeklyUsage = getMachineWeeklyUsage(machine.id);

  return (
    <PageShell
      title={machine.name}
      description={`${machine.type} · ${machine.currentSite} · ${machine.operator}`}
      breadcrumbs={[
        { label: "Machinery", href: "/machinery" },
        { label: machine.name },
      ]}
      actions={
        <div className="flex items-center gap-2">
          <StatusBadge config={MACHINE_STATUS_CONFIG[machine.status]} />
          <MachineDetailActions />
        </div>
      }
    >
      <MachineDetailView machine={machine} weeklyUsage={weeklyUsage} />
    </PageShell>
  );
}
