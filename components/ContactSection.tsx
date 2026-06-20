"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { Snackbar } from "./Snackbar";
import { IconSymbol } from "./IconSymbol";
import { ButtonLink } from "./Button";
import { whatsappUrl } from "@/lib/whatsapp";
import type { SiteConfig } from "@/lib/content";

const LANG_CODE: Record<string, string> = { English: "EN", Zulu: "ZU", Afrikaans: "AF", German: "DE" };

export function ContactSection({ site }: { site: SiteConfig }) {
  const [copied, setCopied] = useState(false);
  const wa = whatsappUrl(site);

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
    <section id="contact" className="content-shell relative py-16 md:py-24 xl:py-32">
      <Reveal>
        <h2 className="m-0 text-display-m text-on-surface md:text-display-l">
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
            className="state-layer max-w-full cursor-pointer break-all border-none bg-transparent p-0 text-left text-title-l md:text-headline-m"
            style={{ color: copied ? "var(--color-success)" : "var(--color-on-surface)" }}
          >
            {copied ? "Copied ✓" : site.email}
          </button>
          <div className="mt-3 text-body-s text-on-surface-variant">
            {site.location} &nbsp;·&nbsp; {site.languages.map((l) => LANG_CODE[l] ?? l.slice(0, 2).toUpperCase()).join(" · ")}
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {wa ? (
              <ButtonLink href={wa} external variant="filled">
                <IconSymbol name="chat" size={18} /> Chat with me
              </ButtonLink>
            ) : null}
            <ButtonLink href={`mailto:${site.email}`} external variant="tonal">
              <IconSymbol name="mail" size={18} /> Email me
            </ButtonLink>
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

      {wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" className="state-layer fixed bottom-20 left-4 z-[87] inline-flex items-center gap-2.5 rounded-full bg-success px-4 py-3 text-label-l text-on-success no-underline elevation-3 sm:bottom-5 sm:left-5">
          <span className="grid h-[22px] w-[22px] place-items-center rounded-full bg-white/20 text-[10px]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            WA
          </span>
          Chat with me
        </a>
      ) : null}

      <Snackbar open={copied}>
        <IconSymbol name="check_circle" size={18} filled className="text-success" />
        Email copied to clipboard
      </Snackbar>
    </section>
  );
}
