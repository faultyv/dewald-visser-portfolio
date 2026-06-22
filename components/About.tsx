"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { gsap } from "@/lib/gsap";
import type { SiteConfig } from "@/lib/content";

const OPERATOR_SIGNALS = [
  { label: "Current venture", value: "Sun Paper and Coatings" },
  { label: "Core range", value: "Strategy, campaigns, design, websites and AI workflows" },
  { label: "Working base", value: "Durban, KwaZulu-Natal" },
];

export function About({ site }: { site: SiteConfig }) {
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !maskRef.current) return;

    const reveal = gsap.from(maskRef.current, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: maskRef.current, start: "top 84%" },
    });

    return () => {
      reveal.scrollTrigger?.kill();
      reveal.kill();
    };
  }, []);

  return (
    <section id="about" className="section-pad content-shell relative">
      <div className="grid gap-10 md:gap-20 items-center" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
        <div>
          <Reveal>
            <div className="text-label-l text-secondary mb-5">Founder, Creative and Systems</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">
              A founder-operator across <span className="text-secondary">brand</span>, <span className="text-primary">marketing</span>,{" "}
              <span className="text-success">web systems</span> and <span className="text-highlight">AI enablement</span> - built
              for teams that need the thinking and the making in one place.
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
          <div ref={maskRef} className="relative overflow-hidden rounded-[22px] border border-outline-variant bg-surface-container-low p-6 elevation-3 md:p-8">
            <div className="relative">
              <div className="text-label-l text-secondary">Current operator map</div>
              <h3 className="mt-5 text-headline-m text-on-surface">Founder-led creative systems, built from the business problem outward.</h3>
              <p className="mt-4 text-body-l text-on-surface-variant">
                The work sits where brand, sales, operations and delivery meet: enough strategy to choose the right move, enough craft to ship it cleanly.
              </p>

              <div className="mt-8 divide-y divide-outline-variant border-y border-outline-variant">
                {OPERATOR_SIGNALS.map((item) => (
                  <div key={item.label} className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-5">
                    <div className="text-label-m text-primary">{item.label}</div>
                    <div className="text-body-m text-on-surface">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {site.buildingWith.map((tool) => (
                  <span key={tool} className="hig-control rounded-full px-3 py-1.5 text-label-m text-on-surface">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
