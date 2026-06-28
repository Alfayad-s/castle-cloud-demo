export type ProjectCostBreakdown = {
  name: string;
  value: number;
  color: string;
};

export type ProjectMonthlySpend = {
  month: string;
  planned: number;
  actual: number;
};

export type ProjectMaterialUsage = {
  material: string;
  used: number;
  unit: string;
};

export type ProjectSiteUpdate = {
  id: string;
  date: string;
  title: string;
  note: string;
};

export type ProjectDetailCharts = {
  costBreakdown: ProjectCostBreakdown[];
  monthlySpend: ProjectMonthlySpend[];
  materialUsage: ProjectMaterialUsage[];
  labourOnSite: number;
  machinesActive: number;
  dprSubmitted: number;
  siteUpdates: ProjectSiteUpdate[];
};

const projectDetailMap: Record<string, ProjectDetailCharts> = {
  "proj-001": {
    costBreakdown: [
      { name: "Materials", value: 2180000, color: "#2563EB" },
      { name: "Labour", value: 1540000, color: "#10B981" },
      { name: "Machinery", value: 820000, color: "#F59E0B" },
      { name: "Subcontract", value: 580000, color: "#8B5CF6" },
    ],
    monthlySpend: [
      { month: "Jan", planned: 720000, actual: 680000 },
      { month: "Feb", planned: 780000, actual: 810000 },
      { month: "Mar", planned: 850000, actual: 790000 },
      { month: "Apr", planned: 920000, actual: 880000 },
      { month: "May", planned: 980000, actual: 940000 },
      { month: "Jun", planned: 1020000, actual: 970000 },
    ],
    materialUsage: [
      { material: "Cement", used: 420, unit: "bags" },
      { material: "Steel", used: 28, unit: "tons" },
      { material: "Sand", used: 2100, unit: "cft" },
      { material: "Bricks", used: 14500, unit: "nos" },
    ],
    labourOnSite: 42,
    machinesActive: 3,
    dprSubmitted: 18,
    siteUpdates: [
      {
        id: "su-1",
        date: "2026-06-27",
        title: "Roof slab casting completed",
        note: "First floor roof slab cured. No safety incidents reported.",
      },
      {
        id: "su-2",
        date: "2026-06-26",
        title: "Internal plastering started",
        note: "Ground floor rooms plastering in progress.",
      },
      {
        id: "su-3",
        date: "2026-06-25",
        title: "Electrical conduit layout",
        note: "Conduit marking completed for ground floor.",
      },
    ],
  },
  "proj-002": {
    costBreakdown: [
      { name: "Materials", value: 8200000, color: "#2563EB" },
      { name: "Labour", value: 5400000, color: "#10B981" },
      { name: "Machinery", value: 3100000, color: "#F59E0B" },
      { name: "Subcontract", value: 2200000, color: "#8B5CF6" },
    ],
    monthlySpend: [
      { month: "Jan", planned: 2400000, actual: 2200000 },
      { month: "Feb", planned: 2600000, actual: 2550000 },
      { month: "Mar", planned: 2800000, actual: 2700000 },
      { month: "Apr", planned: 3100000, actual: 3050000 },
      { month: "May", planned: 3300000, actual: 3180000 },
      { month: "Jun", planned: 3500000, actual: 3220000 },
    ],
    materialUsage: [
      { material: "Cement", used: 1850, unit: "bags" },
      { material: "Steel", used: 120, unit: "tons" },
      { material: "Sand", used: 9800, unit: "cft" },
      { material: "Bricks", used: 42000, unit: "nos" },
    ],
    labourOnSite: 68,
    machinesActive: 5,
    dprSubmitted: 24,
    siteUpdates: [
      {
        id: "su-4",
        date: "2026-06-27",
        title: "5th floor column shuttering",
        note: "Crane repositioned for north wing structural work.",
      },
      {
        id: "su-5",
        date: "2026-06-26",
        title: "Basement waterproofing",
        note: "Membrane application completed in zone B.",
      },
    ],
  },
  "proj-003": {
    costBreakdown: [
      { name: "Materials", value: 1200000, color: "#2563EB" },
      { name: "Labour", value: 900000, color: "#10B981" },
      { name: "Machinery", value: 1100000, color: "#F59E0B" },
      { name: "Subcontract", value: 1000000, color: "#8B5CF6" },
    ],
    monthlySpend: [
      { month: "Jan", planned: 400000, actual: 320000 },
      { month: "Feb", planned: 450000, actual: 380000 },
      { month: "Mar", planned: 520000, actual: 410000 },
      { month: "Apr", planned: 580000, actual: 450000 },
      { month: "May", planned: 620000, actual: 480000 },
      { month: "Jun", planned: 680000, actual: 520000 },
    ],
    materialUsage: [
      { material: "Cement", used: 180, unit: "bags" },
      { material: "Steel", used: 8, unit: "tons" },
      { material: "Sand", used: 900, unit: "cft" },
      { material: "Bricks", used: 3200, unit: "nos" },
    ],
    labourOnSite: 22,
    machinesActive: 2,
    dprSubmitted: 6,
    siteUpdates: [
      {
        id: "su-6",
        date: "2026-06-27",
        title: "Soil testing completed",
        note: "Geotechnical report submitted for approval.",
      },
    ],
  },
  "proj-004": {
    costBreakdown: [
      { name: "Materials", value: 4200000, color: "#2563EB" },
      { name: "Labour", value: 3100000, color: "#10B981" },
      { name: "Machinery", value: 2400000, color: "#F59E0B" },
      { name: "Subcontract", value: 2150000, color: "#8B5CF6" },
    ],
    monthlySpend: [
      { month: "Jan", planned: 1800000, actual: 1750000 },
      { month: "Feb", planned: 1900000, actual: 1880000 },
      { month: "Mar", planned: 2000000, actual: 1950000 },
      { month: "Apr", planned: 2100000, actual: 2080000 },
      { month: "May", planned: 2050000, actual: 2010000 },
      { month: "Jun", planned: 1980000, actual: 1980000 },
    ],
    materialUsage: [
      { material: "Cement", used: 980, unit: "bags" },
      { material: "Steel", used: 45, unit: "tons" },
      { material: "Sand", used: 4200, unit: "cft" },
      { material: "Bricks", used: 12000, unit: "nos" },
    ],
    labourOnSite: 0,
    machinesActive: 0,
    dprSubmitted: 42,
    siteUpdates: [
      {
        id: "su-7",
        date: "2025-11-20",
        title: "Project handover completed",
        note: "Final inspection passed. Client sign-off received.",
      },
    ],
  },
};

const defaultDetail: ProjectDetailCharts = projectDetailMap["proj-001"];

export function getProjectDetailCharts(projectId: string): ProjectDetailCharts {
  return projectDetailMap[projectId] ?? defaultDetail;
}
