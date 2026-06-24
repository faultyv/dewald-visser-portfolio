"use client";

import { useEffect, useRef } from "react";
import { ButtonLink } from "./Button";
import { IconSymbol } from "./IconSymbol";
import { SouthAfricaFlag } from "./SouthAfricaFlag";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { SiteConfig } from "@/lib/content";

const TAG_TINT: Record<string, string> = {
  Entrepreneur: "bg-secondary-container text-on-secondary-container",
  Marketing: "bg-primary-container text-on-primary-container",
  "Graphic Design": "bg-tertiary-container text-on-tertiary-container",
  "Web Design": "bg-success-container text-on-success-container",
  "AI Enablement": "bg-highlight-container text-on-highlight-container",
};

const HERO_PROOF = [
  {
    icon: "storefront",
    label: "Current proof",
    value: "Founder at Sun Paper",
    detail: "Owning offer, supplier relationships, pricing, customer development and brand system.",
  },
  {
    icon: "podcasts",
    label: "Delivery proof",
    value: "500+ live audience",
    detail: "Produced business-school livestreams, masterclasses, campaigns, LMS and learning media.",
  },
  {
    icon: "account_tree",
    label: "Systems proof",
    value: "Excel to CPQ web tool",
    detail: "Translated tangled quoting logic into a live Vercel prototype for a manufacturer.",
  },
] as const;

const HIRE_STACK = ["Strategy", "Creative", "Web", "Campaigns", "AI workflows"];

export function Hero({ site }: { site: SiteConfig }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const heroPositionParts = site.heroPosition.split("usable systems");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-inner-line", { yPercent: 115, duration: 1.0, stagger: 0.1, ease: "power4.out" })
      .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.6 }, "-=0.7")
      .from(".hero-tag > *", { opacity: 0, y: 16, scale: 0.9, duration: 0.55, stagger: 0.07, ease: "back.out(1.6)" }, "-=0.45")
      .from(".hero-pos", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
      .from(".hero-cta", { opacity: 0, y: 16, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.45")
      .from(".hero-tools", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
      .from(".hero-proof-board", { opacity: 0, x: 28, duration: 0.7, ease: "power3.out" }, "-=0.55")
      .from(".hero-scroll", { opacity: 0, duration: 0.5 }, "-=0.2");

    const st = gsap.to(innerRef.current, {
      y: -50,
      opacity: 0,
      ease: "none",
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
    });

    return () => {
      tl.kill();
      st.scrollTrigger?.kill();
      st.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section id="hero" className="relative flex min-h-[88svh] items-center overflow-hidden px-5 pb-14 pt-28 sm:min-h-[90svh] sm:pt-32 md:px-14 md:pb-16 md:pt-32 xl:min-h-[92svh]">
      <div ref={innerRef} className="relative z-10 mx-auto grid w-full max-w-[1300px] gap-9 xl:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.52fr)] xl:items-center">
        <div className="min-w-0">
          <div className="hero-eyebrow mb-5 flex flex-wrap items-center gap-3 md:mb-6">
            <span className="hig-control inline-flex items-center gap-2 rounded-full px-4 py-2 text-label-l text-on-surface">
              <span className="relative w-2.5 h-2.5 inline-block">
                <span className="absolute inset-0 rounded-full bg-success" />
                <span className="absolute inset-0 rounded-full bg-success animate-[pingDot_1.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
              </span>
              {site.availability}
            </span>
            <span className="inline-flex items-center gap-2 text-label-m text-on-surface-variant">
              <SouthAfricaFlag className="h-3.5 w-5 rounded-[3px] shadow-[0_0_0_1px_var(--color-outline-variant)]" />
              {site.location}
            </span>
          </div>

          <h1 aria-label={`${site.name}.`} className="m-0 max-w-[900px] text-display-l text-on-surface lg:max-w-[980px] xl:max-w-[1080px]">
            {site.name.split(" ").map((word, i) => (
              <span key={i} className="hero-mask block overflow-hidden pb-[0.04em]">
                <span className={`hero-inner-line block ${i === site.name.split(" ").length - 1 ? "text-gradient text-gradient-animated" : ""}`}>
                  {word}
                  {i === site.name.split(" ").length - 1 ? "." : null}
                </span>
              </span>
            ))}
          </h1>

          <div className="hero-tag mt-6 flex max-w-[820px] flex-wrap gap-2 text-label-l md:mt-7 md:gap-2.5">
            {site.tags.map((tag) => (
              <span key={tag} className={`hig-control rounded-full px-3 py-1.5 sm:px-4 sm:py-2 ${TAG_TINT[tag] ?? "bg-surface-container text-on-surface"}`}>
                {tag}
              </span>
            ))}
          </div>

          <p className="hero-pos mt-7 max-w-[680px] text-body-l text-on-surface-variant md:mt-8 md:text-title-l">
            {heroPositionParts.length === 2 ? (
              <>
                {heroPositionParts[0]}
                <span className="text-mark">usable systems</span>
                {heroPositionParts[1]}
              </>
            ) : (
              site.heroPosition
            )}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-3.5">
            <span className="hero-cta">
              <ButtonLink href="/work" variant="filled" magnetic>
                View work <IconSymbol name="arrow_forward" size={18} />
              </ButtonLink>
            </span>
            <span className="hero-cta">
              <ButtonLink href={site.socials.linkedin} variant="outlined" external magnetic>
                LinkedIn <IconSymbol name="open_in_new" size={17} />
              </ButtonLink>
            </span>
          </div>

          <div className="hero-tools mt-8 flex max-w-[980px] flex-wrap items-center gap-3 md:mt-10 md:gap-4.5">
            <span className="text-label-m text-on-surface-variant">Building with</span>
            <div className="flex gap-2.5 flex-wrap text-label-l text-on-surface">
              {site.buildingWith.map((tool) => (
                <span key={tool} className="hig-control rounded-full px-3 py-1.5">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="hero-proof-board hidden xl:block" aria-label="Dewald Visser proof summary">
          <div className="hero-proof-panel hig-glass rounded-[28px] p-5 elevation-4">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-label-s text-primary">Why this profile matters</div>
                <h2 className="mt-1 text-headline-s text-on-surface">One operator across the messy middle.</h2>
              </div>
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-on-primary">
                <IconSymbol name="hub" size={25} filled />
              </div>
            </div>

            <div className="hero-proof-list">
              {HERO_PROOF.map((item) => (
                <div key={item.value} className="hero-proof-item">
                  <span className="hero-proof-icon">
                    <IconSymbol name={item.icon} size={19} filled />
                  </span>
                  <span>
                    <span className="block text-label-s text-on-surface-variant">{item.label}</span>
                    <strong className="block text-title-s text-on-surface">{item.value}</strong>
                    <span className="mt-1 block text-body-s text-on-surface-variant">{item.detail}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-outline-variant pt-4">
              <div className="mb-2 text-label-s text-on-surface-variant">Can own the handoff between</div>
              <div className="flex flex-wrap gap-2">
                {HIRE_STACK.map((item) => (
                  <span key={item} className="rounded-full border border-outline-variant bg-surface-container/72 px-2.5 py-1 text-label-m text-on-surface">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 text-label-m text-on-surface-variant sm:flex">
        Scroll
        <span className="w-0.5 h-8 rounded-sm animate-[scrollPulse_1.8s_ease-in-out_infinite]" style={{ background: "linear-gradient(var(--color-primary),transparent)" }} />
      </div>
    </section>
  );
}
