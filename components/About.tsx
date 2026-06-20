"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { gsap } from "@/lib/gsap";
import type { SiteConfig } from "@/lib/content";

export function About({ site }: { site: SiteConfig }) {
  const maskRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !maskRef.current) return;

    const reveal = gsap.from(maskRef.current, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: maskRef.current, start: "top 84%" },
    });
    const parallax = gsap.to(photoRef.current, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: true },
    });

    return () => {
      reveal.scrollTrigger?.kill();
      reveal.kill();
      parallax.scrollTrigger?.kill();
      parallax.kill();
    };
  }, []);

  return (
    <section id="about" className="section-pad content-shell relative">
      <div className="grid gap-10 md:gap-20 items-center" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
        <div>
          <Reveal>
            <div className="text-label-l text-secondary mb-5">Founder & Creative</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">
              {site.aboutHeadline.split("marketing").length > 1 ? (
                <>
                  A multidisciplinary founder who builds brands, runs the <span className="text-primary">marketing</span> that grows
                  them, and ships the <span className="text-success">web experiences</span> that carry them.
                </>
              ) : (
                site.aboutHeadline
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[520px] text-body-l text-on-surface-variant">{site.aboutBody}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-9">
              {site.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-outline-variant bg-surface-container-low p-3 sm:border-0 sm:bg-transparent sm:p-0">
                  <div className="text-display-s text-primary sm:text-[40px]">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-body-s text-on-surface-variant mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal dir="scale">
          <div className="relative">
            <div ref={maskRef} className="relative aspect-[4/3] overflow-hidden rounded-[22px] elevation-3 md:aspect-[4/5]">
              <div ref={photoRef} className="absolute -inset-y-[8%] inset-x-0 will-change-transform">
                <Image
                  src="/images/about/portrait.jpg"
                  alt={site.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 520px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2.5 rounded-2xl border border-outline bg-surface-container px-4 py-3 text-label-l text-on-surface elevation-3 md:-bottom-4 md:-left-4 md:px-5 md:py-3.5">
              <span className="w-2.5 h-2.5 rounded-full bg-success inline-block" />
              Durban · KwaZulu-Natal
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
