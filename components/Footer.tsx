import Link from "next/link";
import type { SiteConfig } from "@/lib/content";
import { IconSymbol } from "./IconSymbol";

export function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer className="relative px-5 md:px-14 max-w-[1300px] mx-auto py-12 border-t border-outline-variant mt-16">
      <div className="flex justify-between items-center flex-wrap gap-6">
        <div>
          <div className="text-title-m text-on-surface">Let&apos;s build something that lasts.</div>
          <Link href="/#contact" className="text-label-l text-primary no-underline inline-flex items-center gap-1.5 mt-2">
            Get in touch <IconSymbol name="arrow_forward" size={16} />
          </Link>
        </div>
        <div className="text-body-s text-on-surface-variant opacity-70">© 2026 {site.name} · Designed & built end-to-end</div>
      </div>
    </footer>
  );
}
