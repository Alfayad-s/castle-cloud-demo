import { PageShell } from "@/components/layout/page-shell";
import { AttendancePageClient } from "@/components/attendance/attendance-page-client";

export default function AttendancePage() {
  return (
    <PageShell
      title="Attendance"
      description="Track daily, weekly, and monthly workforce attendance across all sites."
      breadcrumbs={[{ label: "Attendance" }]}
    >
      <AttendancePageClient />
    </PageShell>
  );
}
