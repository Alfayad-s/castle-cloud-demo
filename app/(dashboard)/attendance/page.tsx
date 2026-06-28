import {
  getAttendanceOverviewStats,
  getCalendarMonth,
  getMonthlyAttendanceRows,
  getSiteAttendanceToday,
  getTodaysAttendance,
  getWeeklyAttendance,
  monthlySummary,
} from "@/data/attendance";
import { PageShell } from "@/components/layout/page-shell";
import { AttendanceView } from "@/components/attendance/attendance-view";

export default function AttendancePage() {
  return (
    <PageShell
      title="Attendance"
      description="Track daily, weekly, and monthly workforce attendance across all sites."
      breadcrumbs={[{ label: "Attendance" }]}
    >
      <AttendanceView
        stats={getAttendanceOverviewStats()}
        todaysAttendance={getTodaysAttendance()}
        siteAttendance={getSiteAttendanceToday()}
        weeklyAttendance={getWeeklyAttendance()}
        monthlyRows={getMonthlyAttendanceRows()}
        calendarDays={getCalendarMonth()}
        monthlySummary={monthlySummary}
      />
    </PageShell>
  );
}
