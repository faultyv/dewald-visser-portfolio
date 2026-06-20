"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { gsap } from "@/lib/gsap";
import { tagSeed } from "@/lib/tag-seed";
import { SEED_BG, SEED_TEXT, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT } from "@/lib/seed-classes";
import type { CVEntry } from "@/lib/content";

export function Career({ cv }: { cv: CVEntry[] }) {
  const progressRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !progressRef.current || !listRef.current) return;
    const tween = gsap.to(progressRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: { trigger: listRef.current, start: "top 70%", end: "bottom 75%", scrub: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="cv" className="relative px-5 md:px-14" style={{ paddingBlock: "clamp(70px,11vh,150px)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12">
          <Reveal>
            <div className="text-label-l text-tertiary mb-4">Experience</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">The career, unfolding.</h2>
          </Reveal>
        </div>

        <div className="relative" style={{ paddingLeft: "clamp(30px,5vw,64px)" }}>
          <div className="absolute top-1.5 bottom-1.5 w-[3px] rounded-sm bg-outline" style={{ left: "clamp(8px,2vw,24px)" }}>
            <div ref={progressRef} className="absolute left-0 top-0 w-full h-0 rounded-sm" style={{ background: "linear-gradient(var(--color-primary),var(--color-secondary) 50%,var(--color-tertiary))" }} />
          </div>
          <div ref={listRef} className="flex flex-col gap-5">
            {cv.map((entry, i) => {
              const seed = tagSeed(entry.tags[0]);
              return (
                <Reveal key={`${entry.org}-${entry.date}`} dir={i % 2 ? "right" : "left"} className={i % 2 ? "md:ml-14" : ""}>
                  <div className="relative bg-surface-container border border-outline rounded-xl elevation-2" style={{ padding: "24px clamp(22px,3vw,32px)" }}>
                    <div
                      className={`absolute top-7 w-3.5 h-3.5 rounded-full border-[3px] border-surface ${SEED_BG[seed]}`}
                      style={{ left: "calc(-1 * clamp(30px,5vw,64px) + clamp(8px,2vw,24px) - 6px)" }}
                    />
                    <div className="flex justify-between items-baseline flex-wrap gap-2.5">
                      <div className="text-label-m text-on-surface-variant">{entry.date}</div>
                      <div className="flex gap-1.5 flex-wrap">
                        {entry.tags.map((t) => {
                          const s = tagSeed(t);
                          return (
                            <span key={t} className={`text-label-m px-2.5 py-1 rounded-full ${SEED_CONTAINER_BG[s]} ${SEED_CONTAINER_TEXT[s]}`}>
                              {t}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <h3 className="text-title-l text-on-surface mt-3 mb-0.5" style={{ fontSize: "clamp(20px,2.6vw,27px)" }}>
                      {entry.role}
                    </h3>
                    <div className={`text-body-m font-semibold mb-2.5 ${SEED_TEXT[seed]}`}>{entry.org}</div>
                    <p className="m-0 text-body-s text-on-surface-variant max-w-[640px]">{entry.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
