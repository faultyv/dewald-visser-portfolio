"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { Snackbar } from "./Snackbar";
import { IconSymbol } from "./IconSymbol";
import type { SiteConfig } from "@/lib/content";

const LANG_CODE: Record<string, string> = { English: "EN", Zulu: "ZU", Afrikaans: "AF", German: "DE" };

export function ContactSection({ site }: { site: SiteConfig }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const socialLinks = [
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "Behance", href: site.socials.behance },
    { label: "Instagram", href: site.socials.instagram },
    { label: "X", href: site.socials.x },
  ];

  return (
    <section id="contact" className="relative px-5 md:px-14 max-w-[1300px] mx-auto" style={{ paddingBlock: "clamp(80px,13vh,170px) 80px" }}>
      <Reveal>
        <h2 className="m-0 text-on-surface" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(40px,8.5vw,118px)", lineHeight: 1, letterSpacing: "-0.025em" }}>
          Let&apos;s build
          <br />
          something <span className="text-primary">that lasts.</span>
        </h2>
      </Reveal>

      <div className="mt-12 flex justify-between items-end flex-wrap gap-9 pt-7 border-t border-outline-variant">
        <div>
          <div className="text-label-m text-on-surface-variant mb-3">Get in touch</div>
          <button
            type="button"
            onClick={copy}
            data-cursor-hover
            className="state-layer text-left bg-transparent border-none p-0 cursor-pointer"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(22px,3vw,34px)", color: copied ? "var(--color-success)" : "var(--color-on-surface)" }}
          >
            {copied ? "Copied ✓" : site.email}
          </button>
          <div className="mt-3 text-body-s text-on-surface-variant">
            {site.location} &nbsp;·&nbsp; {site.languages.map((l) => LANG_CODE[l] ?? l.slice(0, 2).toUpperCase()).join(" · ")}
          </div>
        </div>
        <div className="flex gap-5 flex-wrap text-label-l">
          {socialLinks.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-on-surface no-underline state-layer rounded px-1">
              {s.label} <IconSymbol name="open_in_new" size={14} />
            </a>
          ))}
          <a href={site.socials.website} target="_blank" rel="noopener noreferrer" className="text-primary no-underline state-layer rounded px-1">
            {site.socials.website.replace("https://", "")} <IconSymbol name="open_in_new" size={14} />
          </a>
        </div>
      </div>
      <div className="mt-11 text-body-s text-on-surface-variant opacity-70">© 2026 {site.name} · Designed & built end-to-end</div>

      <Snackbar open={copied}>
        <IconSymbol name="check_circle" size={18} filled className="text-success" />
        Email copied to clipboard
      </Snackbar>
    </section>
  );
}
