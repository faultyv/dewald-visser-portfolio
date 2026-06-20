import type { SiteConfig } from "./content";

export function whatsappUrl(site: SiteConfig): string {
  const direct = site.whatsapp?.url || site.socials.whatsapp || "";
  if (/^https?:\/\//i.test(direct)) return direct;

  const raw = site.whatsapp?.number || direct;
  const digits = String(raw || "").replace(/[^\d]/g, "");
  if (!digits) return "";

  const msg = site.whatsapp?.message || "Hi Dewald, I saw your portfolio and would like to chat about a project.";
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}
