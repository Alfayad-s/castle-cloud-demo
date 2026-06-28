export const COMPANY_NAME = "Castle Cloud Builders";

export const APP_SHORT_NAME = "CCB ERP";

export const APP_NAME = `${COMPANY_NAME} ERP`;

export const APP_TAGLINE = "Intelligent Construction Management Platform";

export const APP_DESCRIPTION =
  "Castle Cloud Builders ERP helps construction teams manage projects, material inventory, purchase orders, labour, daily progress reports, machinery, and analytics — all in one modern cloud platform.";

export const APP_DESCRIPTION_SHORT =
  "Modern ERP for construction project management, inventory, labour, and site operations.";

export const SITE_KEYWORDS = [
  "Castle Cloud Builders",
  "construction ERP",
  "construction management software",
  "project management",
  "material inventory",
  "daily progress report",
  "labour management",
  "machinery tracking",
  "purchase orders",
  "construction analytics",
  "India construction",
] as const;

/** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://erp.castlecloudbuilders.com) */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const OG_IMAGE_PATH = "/og-image.png";

export const OG_IMAGE = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: `${COMPANY_NAME} — ${APP_TAGLINE}`,
} as const;

export const TWITTER_HANDLE = "@CastleCloudBuild";

export const THEME_COLOR = "#0F172A";

export const BRAND_GOLD = "#BB913D";
