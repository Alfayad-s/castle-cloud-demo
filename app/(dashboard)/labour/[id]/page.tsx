import { notFound } from "next/navigation";

import {
  EmployeeDetailActions,
  EmployeeDetailView,
} from "@/components/labour/employee-detail-view";
import { PageShell } from "@/components/layout/page-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  getEmployeeAttendanceCalendar,
  getEmployeeById,
  getEmployeeMonthlyStats,
} from "@/data/labour";
import { ATTENDANCE_STATUS_CONFIG } from "@/lib/status-colors";

type EmployeeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EmployeeDetailPage({ params }: EmployeeDetailPageProps) {
  const { id } = await params;
  const employee = getEmployeeById(id);

  if (!employee) {
    notFound();
  }

  const calendar = getEmployeeAttendanceCalendar(employee.id);
  const monthlyStats = getEmployeeMonthlyStats(employee.id);

  return (
    <PageShell
      title={employee.name}
      description={`${employee.designation} · ${employee.site}`}
      breadcrumbs={[
        { label: "Labour", href: "/labour" },
        { label: employee.name },
      ]}
      actions={
        <div className="flex items-center gap-2">
          <StatusBadge config={ATTENDANCE_STATUS_CONFIG[employee.attendanceToday]} />
          <EmployeeDetailActions />
        </div>
      }
    >
      <EmployeeDetailView
        employee={employee}
        calendar={calendar}
        monthlyStats={monthlyStats}
      />
    </PageShell>
  );
}
