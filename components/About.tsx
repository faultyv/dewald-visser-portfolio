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
    <section id="about" className="relative px-5 md:px-14 max-w-[1300px] mx-auto" style={{ paddingBlock: "clamp(70px,11vh,150px)" }}>
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
            <div className="mt-8 flex gap-9 flex-wrap">
              {site.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-display-s text-primary" style={{ fontSize: 40 }}>
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
            <div ref={maskRef} className="relative overflow-hidden rounded-2xl elevation-3" style={{ aspectRatio: "4/5" }}>
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
            <div className="absolute -bottom-4 -left-4 bg-surface-container border border-outline elevation-3 px-5 py-3.5 rounded-2xl text-label-l text-on-surface flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-success inline-block" />
              Durban · KwaZulu-Natal
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
