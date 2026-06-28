import {
  designationBreakdown,
  employees,
  getLabourStats,
  getPayrollPreview,
  siteWorkforce,
  weeklyAttendance,
} from "@/data/labour";
import { PageShell } from "@/components/layout/page-shell";
import { LabourView } from "@/components/labour/labour-view";

export default function LabourPage() {
  const stats = getLabourStats();
  const payrollPreview = getPayrollPreview();

  return (
    <PageShell
      title="Labour Management"
      description="Employee records, attendance, payroll preview, and workforce analytics."
      breadcrumbs={[{ label: "Labour" }]}
    >
      <LabourView
        employees={employees}
        stats={stats}
        payrollPreview={payrollPreview}
        siteWorkforce={siteWorkforce}
        weeklyAttendance={weeklyAttendance}
        designationBreakdown={designationBreakdown}
      />
    </PageShell>
  );
}
