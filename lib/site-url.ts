/** Canonical production origin, used for metadataBase, sitemap, robots and OG tags.
 * Override with NEXT_PUBLIC_SITE_URL once a custom domain (e.g. dewaldvisser.co.za) is live. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dewald-visser-portfolio.vercel.app").replace(/\/$/, "");
