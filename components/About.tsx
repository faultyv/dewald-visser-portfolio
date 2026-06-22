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
    const parallax = photoRef.current
      ? gsap.to(photoRef.current, {
          yPercent: -7,
          scale: 1.04,
          ease: "none",
          scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: true },
        })
      : null;

    return () => {
      reveal.scrollTrigger?.kill();
      reveal.kill();
      parallax?.scrollTrigger?.kill();
      parallax?.kill();
    };
  }, []);

  return (
    <section id="about" className="content-shell relative scroll-mt-32 py-24 md:py-32 xl:py-36">
      <div className="grid gap-10 md:gap-16 lg:grid-cols-[0.96fr_1.04fr] lg:items-center xl:gap-20">
        <div>
          <Reveal>
            <div className="mb-5 text-label-l text-secondary">Founder, Creative Operator</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">
              A founder-operator across <span className="text-secondary">brand</span>, <span className="text-primary">marketing</span>,{" "}
              <span className="text-success">web systems</span> and <span className="text-highlight">AI enablement</span> - built
              for teams that need the thinking and the making in one place.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[560px] text-body-l text-on-surface-variant">{site.aboutBody}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
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
          <figure className="m-0">
            <div ref={maskRef} className="relative overflow-hidden rounded-[24px] border border-outline-variant bg-surface-container-low elevation-3">
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-[4/5]">
                <div ref={photoRef} className="absolute -inset-y-[7%] inset-x-0 will-change-transform">
                  <Image
                    src={site.media.aboutImage}
                    alt={site.media.aboutImageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 90vw, 520px"
                    className="dewald-action-focus object-cover"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/82 via-black/42 to-transparent p-5 pt-16 text-white md:p-6 md:pt-20">
                  <div className="mb-1.5 text-label-s text-white/74">In action</div>
                  <figcaption className="max-w-[34ch] text-title-s text-white md:text-title-m">
                    {site.media.aboutImageCaption}
                  </figcaption>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {site.buildingWith.slice(0, 3).map((tool) => (
                <span key={tool} className="hig-control rounded-full px-3 py-1.5 text-label-m text-on-surface">
                  {tool}
                </span>
              ))}
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
