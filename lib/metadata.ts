import type { Metadata } from "next";

import {
  APP_DESCRIPTION,
  APP_DESCRIPTION_SHORT,
  APP_NAME,
  APP_TAGLINE,
  COMPANY_NAME,
  OG_IMAGE,
  SITE_KEYWORDS,
  SITE_URL,
  THEME_COLOR,
  TWITTER_HANDLE,
} from "@/lib/site-config";

export function createRootMetadata(): Metadata {
  const metadataBase = new URL(SITE_URL);

  return {
    metadataBase,
    title: {
      default: APP_NAME,
      template: `%s | ${COMPANY_NAME}`,
    },
    description: APP_DESCRIPTION,
    applicationName: APP_NAME,
    authors: [{ name: COMPANY_NAME, url: SITE_URL }],
    creator: COMPANY_NAME,
    publisher: COMPANY_NAME,
    keywords: [...SITE_KEYWORDS],
    category: "construction",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: SITE_URL,
      siteName: COMPANY_NAME,
      title: APP_NAME,
      description: APP_DESCRIPTION,
      images: [
        {
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: OG_IMAGE.alt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: APP_NAME,
      description: APP_DESCRIPTION_SHORT,
      images: [OG_IMAGE.url],
    },
    icons: {
      icon: [
        { url: "/logo.svg", type: "image/svg+xml" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/favicon-32.png"],
    },
    manifest: "/site.webmanifest",
    other: {
      "msapplication-TileColor": THEME_COLOR,
    },
  };
}

export function createPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const pageDescription = description ?? APP_DESCRIPTION_SHORT;
  const url = path ? `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}` : SITE_URL;

  return {
    title,
    description: pageDescription,
    alternates: {
      canonical: path || "/",
    },
    openGraph: {
      title: `${title} | ${COMPANY_NAME}`,
      description: pageDescription,
      url,
      siteName: COMPANY_NAME,
      images: [OG_IMAGE.url],
    },
    twitter: {
      title: `${title} | ${COMPANY_NAME}`,
      description: pageDescription,
      images: [OG_IMAGE.url],
    },
  };
}
