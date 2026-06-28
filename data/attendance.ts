import { employees } from "./employees";
import { weeklyAttendance as labourWeeklyAttendance } from "./labour";
import type { AttendanceStatus, Employee } from "@/types";

export type AttendanceOverviewStats = {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  attendanceRate: number;
  monthlyAvgRate: number;
};

export type CalendarDaySummary = {
  date: string;
  dayOfMonth: number;
  weekday: string;
  isToday: boolean;
  isWeekend: boolean;
  isFuture: boolean;
  present: number;
  absent: number;
  late: number;
  off: number;
  total: number;
  rate: number;
};

export type MonthlyAttendanceRow = {
  employeeId: string;
  name: string;
  designation: string;
  site: string;
  present: number;
  absent: number;
  late: number;
  off: number;
  workingDays: number;
  attendanceRate: number;
};

export type SiteAttendanceToday = {
  site: string;
  present: number;
  absent: number;
  late: number;
  total: number;
  rate: number;
};

const REFERENCE_DATE = "2026-06-27";
const CALENDAR_YEAR = 2026;
const CALENDAR_MONTH = 5; // June (0-indexed)

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Deterministic daily counts for demo calendar cells */
const dailyPatterns: Record<number, { present: number; absent: number; late: number; off: number }> = {
  0: { present: 45, absent: 65, late: 0, off: 12 }, // Sunday
  1: { present: 118, absent: 8, late: 6, off: 0 },
  2: { present: 122, absent: 5, late: 4, off: 0 },
  3: { present: 115, absent: 10, late: 7, off: 0 },
  4: { present: 120, absent: 6, late: 5, off: 0 },
  5: { present: 124, absent: 4, late: 3, off: 0 },
  6: { present: 98, absent: 12, late: 2, off: 0 }, // Saturday
};

function getEmployeeMonthlyStats(employeeId: string) {
  const seed = employeeId.charCodeAt(employeeId.length - 1) + employeeId.charCodeAt(4);
  const workingDays = 26;
  const absent = (seed % 4) + (seed % 3 === 0 ? 1 : 0);
  const late = (seed % 5) + 1;
  const off = 4;
  const present = workingDays - absent - late;
  const attendanceRate = Math.round((present / workingDays) * 100);

  return { present, absent, late, off, workingDays, attendanceRate };
}

export function getAttendanceOverviewStats(
  sourceEmployees: Employee[] = employees,
): AttendanceOverviewStats {
  const presentToday = sourceEmployees.filter((e) => e.attendanceToday === "present").length;
  const absentToday = sourceEmployees.filter((e) => e.attendanceToday === "absent").length;
  const lateToday = sourceEmployees.filter((e) => e.attendanceToday === "late").length;
  const total = sourceEmployees.length;
  const attendanceRate = Math.round(((presentToday + lateToday) / total) * 100);

  const monthlyRows = getMonthlyAttendanceRows(sourceEmployees);
  const monthlyAvgRate = Math.round(
    monthlyRows.reduce((sum, row) => sum + row.attendanceRate, 0) / monthlyRows.length,
  );

  return {
    totalEmployees: total,
    presentToday,
    absentToday,
    lateToday,
    attendanceRate,
    monthlyAvgRate,
  };
}

export function getTodaysAttendance(sourceEmployees: Employee[] = employees): Employee[] {
  return [...sourceEmployees].sort((a, b) => {
    const order: Record<AttendanceStatus, number> = { absent: 0, late: 1, present: 2 };
    return order[a.attendanceToday] - order[b.attendanceToday];
  });
}

export function getSiteAttendanceToday(sourceEmployees: Employee[] = employees): SiteAttendanceToday[] {
  const sites = [...new Set(sourceEmployees.map((e) => e.site))];

  return sites.map((site) => {
    const siteEmployees = sourceEmployees.filter((e) => e.site === site);
    const present = siteEmployees.filter((e) => e.attendanceToday === "present").length;
    const absent = siteEmployees.filter((e) => e.attendanceToday === "absent").length;
    const late = siteEmployees.filter((e) => e.attendanceToday === "late").length;
    const total = siteEmployees.length;
    return {
      site,
      present,
      absent,
      late,
      total,
      rate: Math.round(((present + late) / total) * 100),
    };
  });
}

export function getWeeklyAttendance() {
  return labourWeeklyAttendance;
}

export function getMonthlyAttendanceRows(sourceEmployees: Employee[] = employees): MonthlyAttendanceRow[] {
  return sourceEmployees.map((employee) => {
    const stats = getEmployeeMonthlyStats(employee.id);
    return {
      employeeId: employee.id,
      name: employee.name,
      designation: employee.designation,
      site: employee.site,
      ...stats,
    };
  });
}

export function getCalendarMonth(year = CALENDAR_YEAR, month = CALENDAR_MONTH): CalendarDaySummary[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = REFERENCE_DATE;

  return Array.from({ length: daysInMonth }, (_, index) => {
    const dayOfMonth = index + 1;
    const date = new Date(year, month, dayOfMonth);
    const dateStr = date.toISOString().slice(0, 10);
    const weekdayIndex = date.getDay();
    const pattern = dailyPatterns[weekdayIndex];
    const isWeekend = weekdayIndex === 0 || weekdayIndex === 6;
    const isFuture = dateStr > today;

    const present = isFuture ? 0 : pattern.present;
    const absent = isFuture ? 0 : pattern.absent;
    const late = isFuture ? 0 : pattern.late;
    const off = isFuture ? 0 : pattern.off;
    const total = present + absent + late;
    const rate = total > 0 ? Math.round(((present + late) / total) * 100) : 0;

    return {
      date: dateStr,
      dayOfMonth,
      weekday: weekdayLabels[weekdayIndex],
      isToday: dateStr === today,
      isWeekend,
      isFuture,
      present,
      absent,
      late,
      off,
      total,
      rate,
    };
  });
}

export function getCalendarPaddingDays(year = CALENDAR_YEAR, month = CALENDAR_MONTH): number {
  return new Date(year, month, 1).getDay();
}

export function getCalendarMonthLabel(year = CALENDAR_YEAR, month = CALENDAR_MONTH): string {
  return new Date(year, month, 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export function getSelectedDayEmployees(
  day: CalendarDaySummary,
  sourceEmployees: Employee[] = employees,
): Array<Employee & { status: AttendanceStatus | "off" }> {
  if (day.isFuture) return [];

  return sourceEmployees.map((employee, index) => {
    const seed = (day.dayOfMonth + index + employee.name.length) % 10;
    let status: AttendanceStatus | "off" = "present";
    if (day.isWeekend && seed < 3) status = "off";
    else if (seed === 0) status = "absent";
    else if (seed === 1) status = "late";
    else if (day.date === REFERENCE_DATE) status = employee.attendanceToday;

    return { ...employee, status };
  });
}

export const monthlySummary = {
  month: "June 2026",
  totalWorkingDays: 26,
  avgPresent: 118,
  avgAbsent: 7,
  avgLate: 4,
  bestSite: "Luxury Villa",
  bestSiteRate: 94,
};
