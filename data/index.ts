export { projects, getProjectById } from "./projects";
export { materials, getMaterialById, getLowStockMaterials } from "./materials";
export {
  warehouses,
  categoryStock,
  weeklyConsumption,
  getInventoryStats,
  getMaterialPurchases,
  getMaterialTransfers,
  getMaterialUsageHistory,
  getMaterialConsumptionTrend,
  getWarehouseForMaterial,
} from "./inventory";
export { vendors, getVendorById, getVendorOrders, getVendorStats } from "./vendors";
export { employees, getEmployeeById } from "./employees";
export {
  getLabourStats,
  getPayrollPreview,
  getEmployeeAttendanceCalendar,
  getEmployeeMonthlyStats,
  siteWorkforce,
  weeklyAttendance,
  designationBreakdown,
} from "./labour";
export { machines, getMachineById, getMachineWeeklyUsage } from "./machines";
export {
  getMachineryStats,
  getMachineAlerts,
  siteMachineDeployment,
  machineTypeBreakdown,
  weeklyMachineHours,
  fuelLevelByMachine,
} from "./machinery";
export {
  purchaseOrders,
  getPurchaseOrderById,
  getPurchaseOrderStats,
  getPurchaseStatusTimeline,
  getGrandTotal,
  poStatusTrend,
  vendorSpend,
} from "./purchase-orders";
export type { PurchaseOrderStats, PurchaseStatusStep } from "./purchase-orders";
export {
  dailyProgressReports,
  getDprById,
  getDprStats,
  getTodaysDprs,
  getYesterdaysDprs,
  getLastWeekDprs,
  getMaterialTotals,
  getWeeklyMaterialTotals,
  siteWorkerSummary,
  weeklyHoursTrend,
  weeklyMaterialUsage,
  dprSubmissionTrend,
} from "./dpr";
export {
  dashboardStats,
  recentActivities,
  chartData,
  quickActions,
  getLiveDashboardStats,
  getActiveProjects,
  getTodaysSiteUpdates,
  getNetProfit,
  getProfitMargin,
} from "./dashboard";
export {
  getAnalyticsStats,
  revenueVsExpenses,
  expenseBreakdown,
  labourCostTrend,
  materialCostTrend,
  projectBudgetVsActual,
  projectCompletion,
  purchaseTrend,
  topVendors,
  machineUsageTrend,
  machineUsageByType,
  costByProject,
} from "./analytics";
export type { AnalyticsStats } from "./analytics";
export { getProjectDetailCharts } from "./project-details";
export type {
  ProjectCostBreakdown,
  ProjectDetailCharts,
  ProjectMaterialUsage,
  ProjectMonthlySpend,
  ProjectSiteUpdate,
} from "./project-details";
export {
  demoClient,
  clientPayments,
  clientInvoices,
  clientDocuments,
  clientPhotos,
  progressTimeline,
  getClientPortalStats,
  getClientTimeline,
  getClientProject,
  getClientProjectCharts,
  getDocumentTypeLabel,
} from "./client-portal";
export {
  companySettings,
  defaultNotifications,
  defaultPreferences,
  activeSessions,
  teamMembers,
  demoInfo,
  roleLabels,
} from "./settings";
export type {
  CompanySettings,
  NotificationSettings,
  AppPreferences,
  ActiveSession,
} from "./settings";
export {
  searchGlobal,
  quickSearchLinks,
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,
  resolveRecentSearch,
} from "./global-search";
export type { SearchResult, SearchCategory, GroupedSearchResults } from "./global-search";
export { demoNotifications, getUnreadCount } from "./notifications";
export type { AppNotification } from "./notifications";
export {
  getAttendanceOverviewStats,
  getTodaysAttendance,
  getSiteAttendanceToday,
  getWeeklyAttendance,
  getMonthlyAttendanceRows,
  getCalendarMonth,
  getCalendarPaddingDays,
  getCalendarMonthLabel,
  getSelectedDayEmployees,
  monthlySummary,
} from "./attendance";
export type {
  AttendanceOverviewStats,
  CalendarDaySummary,
  MonthlyAttendanceRow,
  SiteAttendanceToday,
} from "./attendance";
export { signInTestimonials, clientTestimonials } from "./testimonials";
