"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ButtonLink } from "./Button";
import { IconSymbol } from "./IconSymbol";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { SiteConfig } from "@/lib/content";

const TAG_TINT: Record<string, string> = {
  Entrepreneur: "bg-secondary-container text-on-secondary-container",
  Marketing: "bg-primary-container text-on-primary-container",
  "Graphic Design": "bg-tertiary-container text-on-tertiary-container",
  "Web Design": "bg-success-container text-on-success-container",
  "AI Enablement": "bg-highlight-container text-on-highlight-container",
};

export function Hero({ site }: { site: SiteConfig }) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-inner-line", { yPercent: 115, duration: 1.0, stagger: 0.1, ease: "power4.out" })
      .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.6 }, "-=0.7")
      .from(".hero-portrait", { opacity: 0, scale: 0.94, y: 26, duration: 1.05, ease: "power3.out" }, "-=0.95")
      .from(".hero-tag > *", { opacity: 0, y: 16, scale: 0.9, duration: 0.55, stagger: 0.07, ease: "back.out(1.6)" }, "-=0.6")
      .from(".hero-pos", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
      .from(".hero-cta", { opacity: 0, y: 16, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.45")
      .from(".hero-tools", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
      .from(".hero-chip", { opacity: 0, y: 18, scale: 0.85, duration: 0.55, stagger: 0.13, ease: "back.out(1.7)" }, "-=0.5")
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
      <div ref={innerRef} className="relative z-10 mx-auto grid w-full max-w-[1300px] items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-16">
        <div className="hero-text">
          <div className="hero-eyebrow mb-5 flex flex-wrap items-center gap-3 md:mb-6">
            <span className="hig-control inline-flex items-center gap-2 rounded-full px-4 py-2 text-label-l text-on-surface">
              <span className="relative w-2.5 h-2.5 inline-block">
                <span className="absolute inset-0 rounded-full bg-success" />
                <span className="absolute inset-0 rounded-full bg-success animate-[pingDot_1.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
              </span>
              {site.availability}
            </span>
            <span className="text-label-m text-on-surface-variant">{site.location}</span>
          </div>

          <h1 aria-label={`${site.name}.`} className="m-0 max-w-[900px] text-display-l text-on-surface lg:max-w-[680px]">
            {site.name.split(" ").map((word, i) => (
              <span key={i} className="hero-mask block overflow-hidden pb-[0.04em]">
                <span className="hero-inner-line block">
                  {word}
                  {i === site.name.split(" ").length - 1 ? <span className="hero-dot text-primary">.</span> : null}
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

          <p className="hero-pos mt-7 max-w-[600px] text-body-l text-on-surface-variant md:mt-8 md:text-title-l">
            {site.heroPosition}
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

          <div className="hero-tools mt-8 flex max-w-[620px] flex-wrap items-center gap-3 md:mt-10 md:gap-4.5">
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

        {/* Portrait cluster — desktop wow factor */}
        <div className="hero-portrait relative mx-auto hidden w-full max-w-[420px] lg:block">
          <span className="hero-grid" aria-hidden="true" />
          <span className="hero-halo" aria-hidden="true" />
          <span className="hero-orbit" aria-hidden="true">
            <span className="hero-orbit-dot" />
            <span className="hero-orbit-dot hero-orbit-dot--2" />
          </span>

          <figure className="hero-frame relative z-10 m-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px]">
              <Image
                src="/images/dewald/dewald-hero-center.png"
                alt="Dewald Visser in a working session, mid-conversation"
                fill
                priority
                sizes="(max-width: 1024px) 0px, 420px"
                className="hero-portrait-focus object-cover"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
              <span className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/12" />
            </div>
          </figure>

          {/* Floating identity cards */}
          <div className="hero-chip absolute -left-6 top-7 z-20 xl:-left-10">
            <div className="hero-chip-inner hero-float hig-glass flex items-center gap-3 rounded-2xl px-3.5 py-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-on-secondary">
                <IconSymbol name="storefront" size={18} filled />
              </span>
              <span className="leading-tight">
                <span className="block text-label-s text-on-surface-variant">Founder</span>
                <span className="block text-label-l text-on-surface">Sun Paper &amp; Coatings</span>
              </span>
            </div>
          </div>

          <div className="hero-chip absolute -right-5 bottom-10 z-20 xl:-right-9">
            <div className="hero-chip-inner hero-float hero-float--slow hig-glass flex items-center gap-3 rounded-2xl px-3.5 py-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-highlight text-on-highlight">
                <IconSymbol name="auto_awesome" size={18} filled />
              </span>
              <span className="leading-tight">
                <span className="block text-label-s text-on-surface-variant">AI workflow layer</span>
                <span className="block text-label-l text-on-surface">Canva · ChatGPT · CPQ</span>
              </span>
            </div>
          </div>

          <div className="hero-chip absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 xl:block">
            <div className="hero-chip-inner hero-float hero-float--fast hig-glass flex items-center gap-2 rounded-full px-3 py-2">
              <span className="relative inline-block h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-success" />
                <span className="absolute inset-0 rounded-full bg-success animate-[pingDot_1.9s_cubic-bezier(0,0,0.2,1)_infinite]" />
              </span>
              <span className="text-label-m text-on-surface">Open to work</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 text-label-m text-on-surface-variant sm:flex">
        Scroll
        <span className="w-0.5 h-8 rounded-sm animate-[scrollPulse_1.8s_ease-in-out_infinite]" style={{ background: "linear-gradient(var(--color-primary),transparent)" }} />
      </div>
    </section>
  );
}
