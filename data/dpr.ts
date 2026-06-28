import type { DailyProgressReport, DprStats } from "@/types";

const TODAY = "2026-06-27";
const YESTERDAY = "2026-06-26";

export const dailyProgressReports: DailyProgressReport[] = [
  {
    id: "dpr-001",
    projectId: "proj-001",
    projectName: "Luxury Villa",
    date: TODAY,
    engineer: "Anita Sharma",
    weather: "Partly Cloudy, 32°C",
    workers: 42,
    machines: 3,
    machinesList: ["Concrete Mixer", "Tower Crane", "Vibrator"],
    workDone:
      "Roof slab casting for first floor completed. Started curing process with wet gunny bags on all exposed surfaces.",
    materialsUsed: [
      { material: "Cement", quantity: 85, unit: "bags" },
      { material: "Steel", quantity: 2.4, unit: "tons" },
      { material: "Sand", quantity: 180, unit: "cft" },
    ],
    remarks: "No safety incidents. Curing mats applied. Slab strength test scheduled for Day 7.",
    hoursWorked: 9,
    status: "approved",
    submittedAt: "2026-06-27T18:30:00",
    photos: [
      { id: "p1", caption: "Slab casting in progress", gradient: "from-slate-600 to-slate-800" },
      { id: "p2", caption: "Curing mats applied", gradient: "from-blue-600 to-indigo-700" },
      { id: "p3", caption: "Rebar inspection", gradient: "from-amber-600 to-orange-700" },
    ],
  },
  {
    id: "dpr-002",
    projectId: "proj-002",
    projectName: "Commercial Complex",
    date: TODAY,
    engineer: "Suresh Reddy",
    weather: "Sunny, 35°C",
    workers: 68,
    machines: 5,
    machinesList: ["Tower Crane", "Batching Plant", "Concrete Pump", "Excavator", "Compactor"],
    workDone:
      "Column shuttering for 5th floor north wing. Crane repositioned for improved reach. Started MEP sleeve fixing.",
    materialsUsed: [
      { material: "Cement", quantity: 120, unit: "bags" },
      { material: "Bricks", quantity: 4500, unit: "nos" },
      { material: "Steel", quantity: 1.8, unit: "tons" },
    ],
    remarks: "Delayed 30 min due to crane setup. Hydration breaks enforced due to heat.",
    hoursWorked: 8.5,
    status: "submitted",
    submittedAt: "2026-06-27T17:45:00",
    photos: [
      { id: "p4", caption: "Column shuttering", gradient: "from-emerald-600 to-teal-700" },
      { id: "p5", caption: "Crane repositioning", gradient: "from-violet-600 to-purple-800" },
    ],
  },
  {
    id: "dpr-003",
    projectId: "proj-001",
    projectName: "Luxury Villa",
    date: YESTERDAY,
    engineer: "Vikram Patel",
    weather: "Light Rain, 28°C",
    workers: 38,
    machines: 2,
    machinesList: ["Concrete Mixer", "Scaffolding Lift"],
    workDone: "Internal plastering in ground floor rooms. Electrical conduit chasing completed in bedroom wing.",
    materialsUsed: [
      { material: "Sand", quantity: 95, unit: "cft" },
      { material: "Cement", quantity: 40, unit: "bags" },
    ],
    remarks: "Work paused 1 hour due to rain. Resumed after weather cleared.",
    hoursWorked: 7,
    status: "approved",
    submittedAt: "2026-06-26T18:15:00",
    photos: [
      { id: "p6", caption: "Plastering work", gradient: "from-stone-500 to-stone-700" },
    ],
  },
  {
    id: "dpr-004",
    projectId: "proj-002",
    projectName: "Commercial Complex",
    date: YESTERDAY,
    engineer: "Meera Iyer",
    weather: "Overcast, 30°C",
    workers: 72,
    machines: 4,
    machinesList: ["Tower Crane", "Batching Plant", "Welding Set", "Compactor"],
    workDone: "4th floor slab de-shuttering and surface finishing. Started block work on stairwell.",
    materialsUsed: [
      { material: "Cement", quantity: 95, unit: "bags" },
      { material: "Bricks", quantity: 6200, unit: "nos" },
      { material: "Sand", quantity: 210, unit: "cft" },
    ],
    remarks: "Quality check passed for slab surface finish.",
    hoursWorked: 8,
    status: "approved",
    submittedAt: "2026-06-26T17:50:00",
    photos: [
      { id: "p7", caption: "Slab finishing", gradient: "from-cyan-600 to-blue-700" },
      { id: "p8", caption: "Block work stairwell", gradient: "from-rose-600 to-red-700" },
    ],
  },
  {
    id: "dpr-005",
    projectId: "proj-003",
    projectName: "Apartment Tower",
    date: TODAY,
    engineer: "Kavita Nair",
    weather: "Clear, 33°C",
    workers: 24,
    machines: 2,
    machinesList: ["Excavator", "Dumper"],
    workDone: "Site mobilization and boundary wall marking. Soil testing samples collected from bore pits.",
    materialsUsed: [
      { material: "Cement", quantity: 15, unit: "bags" },
      { material: "Sand", quantity: 40, unit: "cft" },
    ],
    remarks: "Awaiting structural approval before foundation excavation.",
    hoursWorked: 8,
    status: "draft",
    photos: [],
  },
  {
    id: "dpr-006",
    projectId: "proj-001",
    projectName: "Luxury Villa",
    date: "2026-06-25",
    engineer: "Anita Sharma",
    weather: "Sunny, 34°C",
    workers: 45,
    machines: 3,
    machinesList: ["Tower Crane", "Concrete Mixer", "Vibrator"],
    workDone: "First floor slab reinforcement tying and pre-pour inspection completed.",
    materialsUsed: [
      { material: "Steel", quantity: 3.1, unit: "tons" },
      { material: "Cement", quantity: 20, unit: "bags" },
    ],
    remarks: "Structural engineer sign-off received for slab pour.",
    hoursWorked: 9,
    status: "approved",
    submittedAt: "2026-06-25T18:00:00",
    photos: [
      { id: "p9", caption: "Rebar tying", gradient: "from-zinc-600 to-zinc-800" },
      { id: "p10", caption: "Pre-pour inspection", gradient: "from-lime-600 to-green-700" },
    ],
  },
  {
    id: "dpr-007",
    projectId: "proj-002",
    projectName: "Commercial Complex",
    date: "2026-06-25",
    engineer: "Suresh Reddy",
    weather: "Partly Cloudy, 31°C",
    workers: 65,
    machines: 5,
    machinesList: ["Tower Crane", "Batching Plant", "Concrete Pump", "Welding Set", "Compactor"],
    workDone: "4th floor column casting and curing. External scaffolding erection on east facade.",
    materialsUsed: [
      { material: "Cement", quantity: 110, unit: "bags" },
      { material: "Steel", quantity: 2.2, unit: "tons" },
      { material: "Sand", quantity: 195, unit: "cft" },
    ],
    remarks: "Scaffolding safety audit completed.",
    hoursWorked: 8.5,
    status: "approved",
    submittedAt: "2026-06-25T17:30:00",
    photos: [
      { id: "p11", caption: "Column casting", gradient: "from-indigo-600 to-violet-700" },
    ],
  },
  {
    id: "dpr-008",
    projectId: "proj-001",
    projectName: "Luxury Villa",
    date: "2026-06-24",
    engineer: "Vikram Patel",
    weather: "Sunny, 33°C",
    workers: 40,
    machines: 2,
    machinesList: ["Concrete Mixer", "Scaffolding Lift"],
    workDone: "Ground floor electrical conduit laying and plumbing rough-in for kitchen and bathrooms.",
    materialsUsed: [
      { material: "Steel", quantity: 0.8, unit: "tons" },
      { material: "Sand", quantity: 60, unit: "cft" },
    ],
    remarks: "MEP coordination meeting held on site at 11 AM.",
    hoursWorked: 8,
    status: "approved",
    submittedAt: "2026-06-24T18:20:00",
    photos: [
      { id: "p12", caption: "Plumbing rough-in", gradient: "from-sky-600 to-blue-700" },
    ],
  },
  {
    id: "dpr-009",
    projectId: "proj-002",
    projectName: "Commercial Complex",
    date: "2026-06-24",
    engineer: "Meera Iyer",
    weather: "Humid, 32°C",
    workers: 70,
    machines: 4,
    machinesList: ["Tower Crane", "Batching Plant", "Excavator", "Compactor"],
    workDone: "3rd floor slab casting completed. Started waterproofing on terrace level.",
    materialsUsed: [
      { material: "Cement", quantity: 130, unit: "bags" },
      { material: "Steel", quantity: 2.6, unit: "tons" },
      { material: "Bricks", quantity: 3800, unit: "nos" },
    ],
    remarks: "Waterproofing membrane delivery confirmed for Monday.",
    hoursWorked: 9,
    status: "approved",
    submittedAt: "2026-06-24T17:55:00",
    photos: [
      { id: "p13", caption: "Slab casting", gradient: "from-amber-700 to-yellow-800" },
      { id: "p14", caption: "Terrace waterproofing", gradient: "from-teal-600 to-cyan-700" },
    ],
  },
  {
    id: "dpr-010",
    projectId: "proj-004",
    projectName: "Warehouse Project",
    date: "2026-06-23",
    engineer: "Rahul Verma",
    weather: "Clear, 36°C",
    workers: 12,
    machines: 1,
    machinesList: ["Forklift"],
    workDone: "Final snagging list closure. Cold storage zone commissioning checks.",
    materialsUsed: [{ material: "Cement", quantity: 5, unit: "bags" }],
    remarks: "Project handover documentation in progress.",
    hoursWorked: 6,
    status: "approved",
    submittedAt: "2026-06-23T16:00:00",
    photos: [
      { id: "p15", caption: "Cold storage zone", gradient: "from-blue-700 to-slate-800" },
    ],
  },
  {
    id: "dpr-011",
    projectId: "proj-001",
    projectName: "Luxury Villa",
    date: "2026-06-22",
    engineer: "Anita Sharma",
    weather: "Partly Cloudy, 31°C",
    workers: 44,
    machines: 3,
    machinesList: ["Tower Crane", "Concrete Mixer", "Vibrator"],
    workDone: "First floor column formwork and vertical rebar installation.",
    materialsUsed: [
      { material: "Steel", quantity: 1.9, unit: "tons" },
      { material: "Cement", quantity: 35, unit: "bags" },
    ],
    remarks: "All formwork inspected before concrete pour schedule.",
    hoursWorked: 8.5,
    status: "approved",
    submittedAt: "2026-06-22T18:10:00",
    photos: [
      { id: "p16", caption: "Column formwork", gradient: "from-orange-600 to-red-700" },
    ],
  },
  {
    id: "dpr-012",
    projectId: "proj-002",
    projectName: "Commercial Complex",
    date: "2026-06-21",
    engineer: "Suresh Reddy",
    weather: "Sunny, 34°C",
    workers: 66,
    machines: 4,
    machinesList: ["Tower Crane", "Batching Plant", "Concrete Pump", "Compactor"],
    workDone: "2nd floor block work and plastering on south wing. Lift shaft core wall progress.",
    materialsUsed: [
      { material: "Bricks", quantity: 5200, unit: "nos" },
      { material: "Cement", quantity: 88, unit: "bags" },
      { material: "Sand", quantity: 165, unit: "cft" },
    ],
    remarks: "Lift shaft alignment verified by consultant.",
    hoursWorked: 8,
    status: "approved",
    submittedAt: "2026-06-21T17:40:00",
    photos: [
      { id: "p17", caption: "Block work south wing", gradient: "from-fuchsia-600 to-pink-700" },
      { id: "p18", caption: "Lift shaft core", gradient: "from-neutral-600 to-neutral-800" },
    ],
  },
];

export const weeklyMaterialUsage = [
  { day: "Mon", cement: 95, steel: 1.8, bricks: 3800, sand: 165 },
  { day: "Tue", cement: 110, steel: 2.2, bricks: 5200, sand: 195 },
  { day: "Wed", cement: 130, steel: 2.6, bricks: 3800, sand: 210 },
  { day: "Thu", cement: 88, steel: 0.8, bricks: 0, sand: 60 },
  { day: "Fri", cement: 110, steel: 3.1, bricks: 0, sand: 195 },
  { day: "Sat", cement: 135, steel: 4.2, bricks: 10700, sand: 485 },
  { day: "Sun", cement: 220, steel: 4.2, bricks: 4500, sand: 220 },
];

export const weeklyHoursTrend = [
  { day: "Mon", hours: 8 },
  { day: "Tue", hours: 8.5 },
  { day: "Wed", hours: 9 },
  { day: "Thu", hours: 8 },
  { day: "Fri", hours: 8.5 },
  { day: "Sat", hours: 15.5 },
  { day: "Sun", hours: 16.5 },
];

export const siteWorkerSummary = [
  { site: "Luxury Villa", workers: 42, machines: 3, reports: 1 },
  { site: "Commercial Complex", workers: 68, machines: 5, reports: 1 },
  { site: "Apartment Tower", workers: 24, machines: 2, reports: 1 },
];

export const dprSubmissionTrend = [
  { week: "W1 Jun", submitted: 8, approved: 7 },
  { week: "W2 Jun", submitted: 10, approved: 9 },
  { week: "W3 Jun", submitted: 11, approved: 10 },
  { week: "W4 Jun", submitted: 12, approved: 10 },
];

export function getDprById(id: string): DailyProgressReport | undefined {
  return dailyProgressReports.find((report) => report.id === id);
}

export function getDprsByDate(date: string): DailyProgressReport[] {
  return dailyProgressReports
    .filter((report) => report.date === date)
    .sort((a, b) => (b.submittedAt ?? "").localeCompare(a.submittedAt ?? ""));
}

export function getTodaysDprs(): DailyProgressReport[] {
  return getDprsByDate(TODAY);
}

export function getYesterdaysDprs(): DailyProgressReport[] {
  return getDprsByDate(YESTERDAY);
}

export function getLastWeekDprs(): DailyProgressReport[] {
  const cutoff = new Date(TODAY);
  cutoff.setDate(cutoff.getDate() - 7);
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  return dailyProgressReports
    .filter((report) => report.date >= cutoffStr && report.date < TODAY)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getDprStats(): DprStats {
  const todays = getTodaysDprs();

  return {
    totalReports: dailyProgressReports.length,
    submittedToday: todays.filter((r) => r.status !== "draft").length,
    pendingReview: dailyProgressReports.filter((r) => r.status === "draft").length,
    workersOnSiteToday: todays.reduce((sum, r) => sum + r.workers, 0),
    machinesActiveToday: todays.reduce((sum, r) => sum + r.machines, 0),
    hoursWorkedThisWeek: weeklyHoursTrend.reduce((sum, d) => sum + d.hours, 0),
  };
}

export function getMaterialTotals(report: DailyProgressReport) {
  const find = (name: string) =>
    report.materialsUsed.find((m) => m.material.toLowerCase() === name.toLowerCase());

  return {
    cement: find("Cement")?.quantity ?? 0,
    steel: find("Steel")?.quantity ?? 0,
    bricks: find("Bricks")?.quantity ?? 0,
    sand: find("Sand")?.quantity ?? 0,
  };
}

export function getWeeklyMaterialTotals() {
  return weeklyMaterialUsage.reduce(
    (acc, day) => ({
      cement: acc.cement + day.cement,
      steel: acc.steel + day.steel,
      bricks: acc.bricks + day.bricks,
      sand: acc.sand + day.sand,
      hours: acc.hours + (weeklyHoursTrend.find((h) => h.day === day.day)?.hours ?? 0),
    }),
    { cement: 0, steel: 0, bricks: 0, sand: 0, hours: 0 },
  );
}
