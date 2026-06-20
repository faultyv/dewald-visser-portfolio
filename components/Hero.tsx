"use client";

import { useEffect, useRef } from "react";
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
      .from(".hero-tag > *", { opacity: 0, y: 16, scale: 0.9, duration: 0.55, stagger: 0.07, ease: "back.out(1.6)" }, "-=0.45")
      .from(".hero-pos", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
      .from(".hero-cta", { opacity: 0, y: 16, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.45")
      .from(".hero-tools", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
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
    <section id="hero" className="relative flex min-h-[100svh] items-center px-5 pb-16 pt-24 sm:pt-28 md:px-14 md:pb-20 md:pt-32">
      <div ref={innerRef} className="w-full max-w-[1300px] mx-auto">
        <div className="hero-eyebrow mb-5 flex flex-wrap items-center gap-3 md:mb-6">
          <span className="inline-flex items-center gap-2 text-label-l text-on-surface bg-surface-container border border-outline px-4 py-2 rounded-full elevation-1">
            <span className="relative w-2.5 h-2.5 inline-block">
              <span className="absolute inset-0 rounded-full bg-success" />
              <span className="absolute inset-0 rounded-full bg-success animate-[pingDot_1.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
            </span>
            {site.availability}
          </span>
          <span className="text-label-m text-on-surface-variant">{site.location}</span>
        </div>

        <h1 className="m-0 text-display-l text-on-surface">
          {site.name.split(" ").map((word, i) => (
            <span key={i} className="hero-mask block overflow-hidden pb-[0.04em]">
              <span className="hero-inner-line block">
                {word}
                {i === site.name.split(" ").length - 1 ? <span className="text-primary">.</span> : null}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-tag mt-6 flex flex-wrap gap-2 text-label-l md:mt-7 md:gap-2.5">
          {site.tags.map((tag) => (
            <span key={tag} className={`rounded-full px-3 py-1.5 sm:px-4 sm:py-2 ${TAG_TINT[tag] ?? "bg-surface-container text-on-surface"}`}>
              {tag}
            </span>
          ))}
        </div>

        <p className="hero-pos mt-7 max-w-[620px] text-body-l text-on-surface-variant md:mt-8 md:text-title-l">
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

        <div className="hero-tools mt-8 flex flex-wrap items-center gap-3 md:mt-12 md:gap-4.5">
          <span className="text-label-m text-on-surface-variant">Building with</span>
          <div className="flex gap-2.5 flex-wrap text-label-l text-on-surface">
            {site.buildingWith.map((tool) => (
              <span key={tool} className="px-3 py-1.5 rounded-lg bg-surface-container-high">
                {tool}
              </span>
            ))}
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
