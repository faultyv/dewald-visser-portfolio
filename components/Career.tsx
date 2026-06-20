"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { gsap } from "@/lib/gsap";
import { tagSeed } from "@/lib/tag-seed";
import { SEED_BG, SEED_ON, SEED_TEXT, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT } from "@/lib/seed-classes";
import type { CVEntry, ProofItem } from "@/lib/content";
import type { SeedName } from "@/lib/m3-theme";

const TOOL_MARK: Record<string, string> = {
  photoshop: "Ps",
  illustrator: "Ai",
  indesign: "Id",
  "after effects": "Ae",
  wordpress: "WP",
  elementor: "E",
  shopify: "S",
  mailchimp: "MC",
  "meta ads": "Meta",
  "google ads": "G",
  seo: "SEO",
  crm: "CRM",
  canva: "C",
  sketchup: "SU",
  "sage pastel": "SP",
  "google workspace": "GW",
};

function toolMark(tool: string) {
  return TOOL_MARK[tool.toLowerCase()] ?? tool.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function RoleEvidence({ proof, seed }: { proof: ProofItem[]; seed: SeedName }) {
  const [index, setIndex] = useState(0);
  const canCycle = proof.length > 2;
  const visible = useMemo(() => {
    if (!canCycle) return proof;
    return [proof[index], proof[(index + 1) % proof.length]];
  }, [canCycle, index, proof]);

  useEffect(() => {
    if (!canCycle) return;
    const timer = window.setInterval(() => setIndex((v) => (v + 1) % proof.length), 4200);
    return () => window.clearInterval(timer);
  }, [canCycle, proof.length]);

  if (!proof.length) return null;

  return (
    <div className="mt-4 border-t border-outline-variant border-l-[3px] pt-3.5 pl-3.5" style={{ borderLeftColor: `var(--color-${seed})` }}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-label-s text-on-surface-variant">
          <span className={`h-0.5 w-5 rounded-full ${SEED_BG[seed]}`} />
          Role evidence
        </div>
        <div className="flex items-center gap-2">
          <span className="text-label-s text-on-surface-variant">{canCycle ? `${String(index + 1).padStart(2, "0")} / ${String(proof.length).padStart(2, "0")}` : `${proof.length} item${proof.length === 1 ? "" : "s"}`}</span>
          {canCycle ? (
            <button
              type="button"
              aria-label="Show more role evidence"
              onClick={() => setIndex((v) => (v + 1) % proof.length)}
              className={`state-layer grid h-[30px] w-[30px] place-items-center rounded-full border ${SEED_CONTAINER_BG[seed]} ${SEED_CONTAINER_TEXT[seed]}`}
            >
              →
            </button>
          ) : null}
        </div>
      </div>
      <div className="grid min-h-[124px] gap-0 transition-all">
        {visible.map((item, i) => (
          <div key={`${item.type}-${item.title}-${i}`} className={`grid gap-3 py-2.5 sm:grid-cols-[86px_minmax(0,1fr)] ${i === visible.length - 1 ? "" : "border-b border-outline-variant"}`}>
            <span className={`w-max rounded-full px-2.5 py-1 text-label-s ${SEED_CONTAINER_BG[seed]} ${SEED_CONTAINER_TEXT[seed]}`}>{item.type}</span>
            <div>
              <div className="text-title-s text-on-surface">{item.title}</div>
              <div className="mt-1 text-body-s text-on-surface-variant">{item.detail}</div>
            </div>
          </div>
        ))}
      </div>
      {canCycle ? (
        <div className="mt-2 flex gap-1.5">
          {proof.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Show evidence set ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full border-0 transition-all ${i === index ? `w-5 ${SEED_BG[seed]}` : "w-1.5 bg-outline"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

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
              const brandSeed = entry.brandColor ?? seed;
              return (
                <Reveal key={`${entry.org}-${entry.date}`} dir="up" className={i % 2 ? "lg:ml-14" : ""}>
                  <article className="relative overflow-hidden bg-surface-container border border-outline rounded-xl elevation-2" style={{ padding: "24px clamp(22px,3vw,32px)" }}>
                    <div
                      className={`absolute top-7 w-3.5 h-3.5 rounded-full border-[3px] border-surface ${SEED_BG[seed]}`}
                      style={{ left: "calc(-1 * clamp(30px,5vw,64px) + clamp(8px,2vw,24px) - 6px)" }}
                    />
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-label-m text-on-surface-variant">{entry.date}</div>
                        <div className="mt-2 flex gap-1.5 flex-wrap">
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
                      <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${SEED_BG[brandSeed]} ${SEED_ON[brandSeed]} elevation-1 text-label-l`} style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                        {entry.brandMark ?? entry.org.slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <h3 className="text-title-l text-on-surface mt-3 mb-0.5" style={{ fontSize: "clamp(20px,2.6vw,27px)" }}>
                      {entry.role}
                    </h3>
                    <div className={`text-body-m font-semibold mb-2.5 ${SEED_TEXT[seed]}`}>{entry.org}</div>
                    <p className="m-0 text-body-s text-on-surface-variant max-w-[680px]">{entry.detail}</p>

                    {entry.proof ? <RoleEvidence proof={entry.proof} seed={seed} /> : null}

                    {entry.software?.length ? (
                      <div className="mt-4 flex flex-wrap items-start gap-2.5 border-t border-outline-variant pt-3.5">
                        <span className="min-w-16 pt-1.5 text-label-s text-on-surface-variant">Stack</span>
                        <div className="flex flex-1 flex-wrap gap-2">
                          {entry.software.map((tool) => (
                            <span key={tool} className="inline-flex min-h-8 max-w-full items-center gap-2 rounded-full border border-outline bg-surface-container-high px-2.5 py-1 text-label-m text-on-surface">
                              <span className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full ${SEED_BG[seed]} ${SEED_ON[seed]} text-[8px]`}>{toolMark(tool)}</span>
                              <span className="truncate">{tool}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
