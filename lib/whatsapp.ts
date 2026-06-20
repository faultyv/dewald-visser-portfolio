import type { SiteConfig } from "./content";

/** Business WhatsApp number (international format, no +). Kept here so client components
 * like the NavBar can build a wa.me link without threading server-loaded site config. */
export const WHATSAPP_NUMBER = "27678952710";
const DEFAULT_WA_MESSAGE = "Hi Dewald, I saw your portfolio and would like to chat about a project.";

export function whatsappLink(message: string = DEFAULT_WA_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function whatsappUrl(site: SiteConfig): string {
  const direct = site.whatsapp?.url || site.socials.whatsapp || "";
  if (/^https?:\/\//i.test(direct)) return direct;

  const raw = site.whatsapp?.number || direct;
  const digits = String(raw || "").replace(/[^\d]/g, "");
  if (!digits) return "";

  const msg = site.whatsapp?.message || "Hi Dewald, I saw your portfolio and would like to chat about a project.";
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}
