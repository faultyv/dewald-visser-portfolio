"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ButtonLink } from "./Button";
import { IconSymbol } from "./IconSymbol";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { SiteConfig } from "@/lib/content";

export function Hero({ site }: { site: SiteConfig }) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-inner-line", { yPercent: 115, duration: 1, stagger: 0.1, ease: "power4.out" })
      .from(".hero-status", { opacity: 0, y: 14, duration: 0.55 }, "-=0.72")
      .from(".hero-role", { opacity: 0, y: 16, duration: 0.58 }, "-=0.48")
      .from(".hero-pos", { opacity: 0, y: 16, duration: 0.58 }, "-=0.44")
      .from(".hero-cta", { opacity: 0, y: 14, duration: 0.55, stagger: 0.08 }, "-=0.4")
      .from(".hero-portrait", { opacity: 0, x: 26, duration: 0.8, ease: "power3.out" }, "-=0.62")
      .from(".hero-project-card", { opacity: 0, y: 22, duration: 0.65, ease: "back.out(1.2)" }, "-=0.4")
      .from(".hero-scroll", { opacity: 0, duration: 0.45 }, "-=0.2");

    const st = gsap.to(innerRef.current, {
      y: -42,
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
    <section id="hero" className="hero-elevated relative flex min-h-[92svh] items-center overflow-hidden px-5 pb-14 pt-28 sm:pt-32 md:px-14 md:pb-16 xl:min-h-[94svh]">
      <div ref={innerRef} className="relative z-10 mx-auto grid w-full max-w-[1360px] gap-11 lg:grid-cols-[minmax(0,0.94fr)_minmax(440px,0.86fr)] lg:items-center xl:gap-16">
        <div className="hero-copy min-w-0">
          <div className="hero-status mb-6 flex items-center gap-3 text-label-m text-on-surface-variant">
            <span className="relative inline-block h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-success" />
              <span className="absolute inset-0 animate-[pingDot_1.8s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-success" />
            </span>
            <span>{site.availability}</span>
            <span aria-hidden="true">·</span>
            <span>{site.location}</span>
          </div>

          <h1 aria-label={`${site.name}.`} className="m-0 text-display-l text-on-surface">
            {site.name.split(" ").map((word, index) => (
              <span key={word} className="hero-mask block overflow-hidden pb-[0.04em]">
                <span className={`hero-inner-line block ${index === site.name.split(" ").length - 1 ? "text-primary" : ""}`}>
                  {word}{index === site.name.split(" ").length - 1 ? "." : null}
                </span>
              </span>
            ))}
          </h1>

          <div className="hero-role mt-6">
            <p className="text-title-l text-on-surface">Web &amp; Graphic Designer</p>
            <p className="mt-1 text-title-m text-primary">Digital Marketing | Brand Strategy &amp; AI Workflows</p>
          </div>

          <p className="hero-pos mt-7 max-w-[650px] text-body-l text-on-surface-variant">
            {site.heroPosition}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 md:mt-9">
            <span className="hero-cta">
              <ButtonLink href="/work" variant="filled" magnetic>
                View selected work <IconSymbol name="arrow_forward" size={18} />
              </ButtonLink>
            </span>
            <span className="hero-cta">
              <ButtonLink href="/cv" variant="outlined" magnetic>
                View CV <IconSymbol name="description" size={17} />
              </ButtonLink>
            </span>
          </div>
        </div>

        <div className="hero-visual relative min-h-[590px] lg:min-h-[640px]">
          <div className="hero-blue-panel" aria-hidden="true">
            <span>Design</span><span>Build</span><span>Market</span><span>Automate</span>
          </div>

          <div className="hero-portrait absolute inset-y-0 left-0 right-[58px] overflow-hidden rounded-[34px]">
            <Image
              src="/images/dewald/dewald-about-centered-clean.png"
              alt="Dewald Visser in a professional working environment"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-[58%_center]"
            />
          </div>

          <Link href="/work/dreambook-cpm" className="hero-project-card group" aria-label="View The Dreambook case study">
            <div className="hero-project-image">
              <Image
                src="/images/work/dreambook-cpm/mockup-cover-hands.png"
                alt="The Dreambook cover design"
                fill
                sizes="(max-width: 640px) 78vw, 360px"
                className="object-contain"
                quality={90}
              />
            </div>
            <div className="hero-project-copy">
              <p className="text-label-s text-primary">Selected project</p>
              <div className="mt-2 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-title-m text-on-surface">The Dreambook</h2>
                  <p className="mt-1 text-body-s text-on-surface-variant">Brand identity · Web design · Content systems</p>
                </div>
                <span className="hero-project-arrow" aria-hidden="true"><IconSymbol name="arrow_forward" size={18} /></span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <a href="#work" className="hero-scroll absolute bottom-7 left-5 hidden items-center gap-3 text-label-m text-on-surface-variant md:left-14 lg:flex">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant text-primary"><IconSymbol name="south" size={18} /></span>
        Explore selected work
      </a>
    </section>
  );
}
