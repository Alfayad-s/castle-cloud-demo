import type {
  AttendanceDay,
  AttendanceStatus,
  Employee,
  LabourStats,
  PayrollPreviewRow,
} from "@/types";
import { employees, getEmployeeById } from "./employees";

export const siteWorkforce = [
  { site: "Luxury Villa", workers: 28, staff: 3 },
  { site: "Commercial Complex", workers: 42, staff: 4 },
  { site: "Apartment Tower", workers: 12, staff: 2 },
  { site: "Warehouse Project", workers: 4, staff: 2 },
];

export const weeklyAttendance = [
  { day: "Mon", present: 118, absent: 8, late: 6 },
  { day: "Tue", present: 122, absent: 5, late: 4 },
  { day: "Wed", present: 115, absent: 10, late: 7 },
  { day: "Thu", present: 120, absent: 6, late: 5 },
  { day: "Fri", present: 124, absent: 4, late: 3 },
  { day: "Sat", present: 98, absent: 12, late: 2 },
  { day: "Sun", present: 45, absent: 65, late: 0 },
];

export const designationBreakdown = [
  { designation: "Engineers", count: 6 },
  { designation: "Managers", count: 2 },
  { designation: "Masons", count: 8 },
  { designation: "Helpers", count: 12 },
  { designation: "Operators", count: 5 },
  { designation: "Others", count: 9 },
];

const payrollDaysMap: Record<string, number> = {
  "emp-005": 22,
  "emp-006": 18,
  "emp-007": 24,
  "emp-010": 23,
  "emp-011": 21,
  "emp-012": 20,
  "emp-013": 22,
  "emp-014": 16,
};

const attendanceCalendarMap: Record<string, AttendanceDay[]> = {
  "emp-005": buildCalendar(["present", "present", "late", "present", "present", "present", "off", "present", "present", "absent", "present", "present", "present", "present"]),
  "emp-006": buildCalendar(["absent", "present", "present", "absent", "present", "late", "off", "present", "absent", "present", "present", "present", "late", "present"]),
  "emp-010": buildCalendar(["present", "present", "present", "present", "late", "present", "off", "present", "present", "present", "present", "present", "present", "late"]),
};

function buildCalendar(statuses: Array<AttendanceStatus | "off">): AttendanceDay[] {
  const start = new Date("2026-06-14");
  return statuses.map((status, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      date: date.toISOString().slice(0, 10),
      status,
    };
  });
}

export function getLabourStats(): LabourStats {
  const presentToday = employees.filter((e) => e.attendanceToday === "present").length;
  const absentToday = employees.filter((e) => e.attendanceToday === "absent").length;
  const lateToday = employees.filter((e) => e.attendanceToday === "late").length;
  const workers = employees.filter((e) => e.employeeType === "worker");

  const monthlyPayrollEstimate = workers.reduce((sum, worker) => {
    const days = payrollDaysMap[worker.id] ?? 20;
    return sum + worker.dailyWage * days;
  }, 0);

  return {
    totalEmployees: employees.length,
    presentToday,
    absentToday,
    lateToday,
    todaysWorkforce: presentToday + lateToday,
    monthlyPayrollEstimate,
  };
}

export function getPayrollPreview(): PayrollPreviewRow[] {
  return employees
    .filter((employee) => employee.dailyWage > 0)
    .map((employee) => {
      const daysWorked = payrollDaysMap[employee.id] ?? 20;
      return {
        employeeId: employee.id,
        name: employee.name,
        designation: employee.designation,
        site: employee.site,
        dailyWage: employee.dailyWage,
        daysWorked,
        estimatedPay: employee.dailyWage * daysWorked,
      };
    });
}

export function getEmployeeAttendanceCalendar(employeeId: string): AttendanceDay[] {
  if (attendanceCalendarMap[employeeId]) {
    return attendanceCalendarMap[employeeId];
  }

  return buildCalendar([
    "present", "present", "present", "late", "present", "present", "off",
    "present", "present", "present", "present", "absent", "present", "present",
  ]);
}

export function getEmployeeMonthlyStats(employeeId: string) {
  const calendar = getEmployeeAttendanceCalendar(employeeId);
  const present = calendar.filter((d) => d.status === "present").length;
  const absent = calendar.filter((d) => d.status === "absent").length;
  const late = calendar.filter((d) => d.status === "late").length;
  const employee = getEmployeeById(employeeId);

  return {
    present,
    absent,
    late,
    estimatedPay: employee ? employee.dailyWage * present : 0,
  };
}

export { employees, getEmployeeById };
