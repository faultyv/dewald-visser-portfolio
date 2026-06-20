"use client";

import { useEffect, useRef } from "react";
import { ButtonLink } from "./Button";
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
    <section id="hero" className="relative min-h-screen flex items-center px-5 md:px-14 pt-32 pb-20">
      <div ref={innerRef} className="w-full max-w-[1300px] mx-auto">
        <div className="hero-eyebrow mb-6 flex gap-3 items-center flex-wrap">
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

        <div className="hero-tag mt-7 flex gap-2.5 flex-wrap text-label-l">
          {site.tags.map((tag) => (
            <span key={tag} className={`px-4 py-2 rounded-full ${TAG_TINT[tag] ?? "bg-surface-container text-on-surface"}`}>
              {tag}
            </span>
          ))}
        </div>

        <p className="hero-pos mt-8 max-w-[600px] text-body-l text-on-surface-variant" style={{ fontSize: "clamp(18px,2.1vw,23px)" }}>
          {site.heroPosition}
        </p>

        <div className="mt-10 flex gap-3.5 flex-wrap">
          <span className="hero-cta">
            <ButtonLink href="/work" variant="filled" magnetic>
              View work
            </ButtonLink>
          </span>
          <span className="hero-cta">
            <ButtonLink href={site.socials.linkedin} variant="outlined" external magnetic>
              LinkedIn ↗
            </ButtonLink>
          </span>
        </div>

        <div className="hero-tools mt-12 flex items-center gap-4.5 flex-wrap">
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

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-label-m text-on-surface-variant">
        Scroll
        <span className="w-0.5 h-8 rounded-sm animate-[scrollPulse_1.8s_ease-in-out_infinite]" style={{ background: "linear-gradient(var(--color-primary),transparent)" }} />
      </div>
    </section>
  );
}
