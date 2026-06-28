import {
  fuelLevelByMachine,
  getMachineAlerts,
  getMachineryStats,
  machineTypeBreakdown,
  siteMachineDeployment,
  weeklyMachineHours,
} from "@/data/machinery";
import { machines } from "@/data/machines";
import { PageShell } from "@/components/layout/page-shell";
import { MachineryView } from "@/components/machinery/machinery-view";

export default function MachineryPage() {
  const stats = getMachineryStats();
  const alerts = getMachineAlerts();

  return (
    <PageShell
      title="Machinery"
      description="Track equipment, operators, fuel levels, and maintenance schedules."
      breadcrumbs={[{ label: "Machinery" }]}
    >
      <MachineryView
        machines={machines}
        stats={stats}
        alerts={alerts}
        siteMachineDeployment={siteMachineDeployment}
        machineTypeBreakdown={machineTypeBreakdown}
        weeklyMachineHours={weeklyMachineHours}
        fuelLevelByMachine={fuelLevelByMachine}
      />
    </PageShell>
  );
}
