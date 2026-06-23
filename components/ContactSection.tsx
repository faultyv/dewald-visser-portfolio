"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { Snackbar } from "./Snackbar";
import { IconSymbol } from "./IconSymbol";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ButtonLink } from "./Button";
import { SouthAfricaFlag } from "./SouthAfricaFlag";
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

      <div className="hig-glass mt-12 grid overflow-hidden rounded-[28px] lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative min-h-[230px] lg:min-h-[380px]">
          <Image
            src="/images/dewald/dewald-portrait-lounge.png"
            alt="Dewald Visser, ready to talk through a project"
            fill
            className="object-cover"
            style={{ objectPosition: "55% 26%" }}
            sizes="(max-width: 1024px) 100vw, 440px"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/12 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-5 md:p-6">
            <span className="relative inline-block h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full bg-success" />
              <span className="absolute inset-0 rounded-full bg-success animate-[pingDot_1.9s_cubic-bezier(0,0,0.2,1)_infinite]" />
            </span>
            <span className="leading-tight">
              <span className="block text-label-s text-white/75">{site.name}</span>
              <span className="block text-title-m text-white">{site.availability}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 p-5 md:p-7">
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
              <span className="inline-flex items-center gap-1.5">
                <SouthAfricaFlag className="h-3.5 w-5 rounded-[3px] shadow-[0_0_0_1px_var(--color-outline-variant)]" />
                {site.location}
              </span>{" "}
              &nbsp;·&nbsp; {site.languages.map((l) => LANG_CODE[l] ?? l.slice(0, 2).toUpperCase()).join(" · ")}
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {wa ? (
                <ButtonLink href={wa} external variant="filled">
                  <WhatsAppIcon size={18} /> Chat with me
                </ButtonLink>
              ) : null}
              <ButtonLink href={`mailto:${site.email}`} external variant="tonal">
                <IconSymbol name="mail" size={18} /> Email me
              </ButtonLink>
            </div>
          </div>
          <div className="flex gap-2.5 flex-wrap text-label-l">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hig-control state-layer rounded-full px-3 py-2 text-on-surface no-underline">
                {s.label} <IconSymbol name="open_in_new" size={14} />
              </a>
            ))}
            <a href={site.socials.website} target="_blank" rel="noopener noreferrer" className="hig-control state-layer rounded-full px-3 py-2 text-primary no-underline">
              {site.socials.website.replace("https://", "")} <IconSymbol name="open_in_new" size={14} />
            </a>
          </div>
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
