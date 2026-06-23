"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "./Reveal";
import { IconSymbol } from "./IconSymbol";
import { tagSeed } from "@/lib/tag-seed";
import { SEED_BG, SEED_ON, SEED_TEXT, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT } from "@/lib/seed-classes";
import { fmTransition } from "@/lib/motion-tokens";
import type { CVEntry } from "@/lib/content";

const FILTERS = [
  { id: "all", label: "All roles" },
  { id: "Founder", label: "Founder" },
  { id: "Marketing", label: "Marketing" },
  { id: "Design", label: "Design" },
  { id: "Web", label: "Web" },
  { id: "Foundations", label: "Foundations" },
] as const;

const ROLE_ICON: Record<string, string> = {
  Founder: "rocket_launch",
  Marketing: "campaign",
  Design: "palette",
  Web: "language",
  Foundations: "support_agent",
  AI: "auto_awesome",
};

const SIGNALS = [
  { label: "Commercial base", icon: "support_agent", text: "sales, advising and pipeline discipline" },
  { label: "Creative production", icon: "design_services", text: "Adobe-led brand, print, motion and media" },
  { label: "Systems ownership", icon: "hub", text: "web, workflow, CPQ, CRM and founder work" },
];

function roleIcon(entry: CVEntry) {
  const priority = ["AI", "Founder", "Web", "Marketing", "Design", "Foundations"];
  const match = priority.find((tag) => entry.tags.includes(tag));
  return match ? ROLE_ICON[match] : "work_history";
}

function RoleDetail({ entry }: { entry: CVEntry }) {
  const seed = tagSeed(entry.tags[0]);
  const brandSeed = entry.brandColor ?? seed;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${entry.org}-${entry.date}`}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={fmTransition.emphasized}
        className="career-detail-grid"
      >
        <div className="min-w-0">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className={`text-label-l ${SEED_TEXT[seed]}`}>{entry.date}</div>
              <h3 className="mt-2 text-headline-m text-on-surface">{entry.role}</h3>
              <div className="mt-1 text-title-s text-on-surface-variant">{entry.org}</div>
            </div>
            <div className={`career-orbit-icon ${SEED_BG[brandSeed]} ${SEED_ON[brandSeed]}`}>
              <IconSymbol name={roleIcon(entry)} size={30} filled />
            </div>
          </div>

          <p className="m-0 max-w-[650px] text-body-l text-on-surface-variant">{entry.detail}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <span key={tag} className={`rounded-full px-3 py-1.5 text-label-m ${SEED_CONTAINER_BG[tagSeed(tag)]} ${SEED_CONTAINER_TEXT[tagSeed(tag)]}`}>
                {tag}
              </span>
            ))}
          </div>

          {entry.proof?.length ? (
            <div className="mt-7">
              <div className="mb-3 flex items-center gap-2 text-label-l text-on-surface-variant">
                <IconSymbol name="verified" size={16} className={SEED_TEXT[seed]} filled />
                Proof in the role
              </div>
              <div className="career-proof-grid">
                {entry.proof.map((p, index) => (
                  <article key={p.title} className="career-proof-card">
                    <span className={`career-proof-index ${SEED_CONTAINER_BG[seed]} ${SEED_CONTAINER_TEXT[seed]}`}>{String(index + 1).padStart(2, "0")}</span>
                    <div className="text-label-s text-on-surface-variant">{p.type}</div>
                    <div className="mt-1 text-title-s text-on-surface">{p.title}</div>
                    <p className="mt-2 text-body-s text-on-surface-variant">{p.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {entry.software?.length ? (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-label-s text-on-surface-variant">Stack</span>
              {entry.software.map((tool) => (
                <span key={tool} className="rounded-full border border-outline bg-surface-container-high px-2.5 py-1 text-label-s text-on-surface">
                  {tool}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <figure className="career-photo-panel m-0">
          <div className="relative h-full min-h-[280px] overflow-hidden rounded-[24px] bg-surface-container-high">
            <Image
              src="/images/dewald/dewald-about-centered.png"
              alt="Dewald Visser seated with a laptop in a professional workspace"
              fill
              unoptimized
              className="object-cover"
              style={{ objectPosition: "52% 48%" }}
              sizes="(max-width: 1024px) 100vw, 380px"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent" />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-[18px] border border-white/16 bg-black/48 p-3 text-white backdrop-blur-xl">
              <div className="mb-1 flex items-center gap-2 text-label-s text-white/72">
                <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_0_6px_rgba(131,222,151,0.16)]" />
                South Africa based operator
              </div>
              <div className="text-title-s">Strategy, creative production and systems delivery in the room.</div>
            </figcaption>
          </div>
        </figure>
      </motion.div>
    </AnimatePresence>
  );
}

export function CareerExplorer({ cv }: { cv: CVEntry[] }) {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState<string>("all");

  const countFor = (id: string) => (id === "all" ? cv.length : cv.filter((entry) => entry.tags.includes(id)).length);
  const visible = useMemo(() => (filter === "all" ? cv : cv.filter((entry) => entry.tags.includes(filter))), [cv, filter]);
  const activeEntry = cv[active] ?? visible[0] ?? cv[0];

  const applyFilter = (id: string) => {
    setFilter(id);
    const nextIndex = id === "all" ? 0 : cv.findIndex((entry) => entry.tags.includes(id));
    if (nextIndex >= 0) setActive(nextIndex);
  };

  return (
    <section id="cv" className="section-pad relative">
      <div className="content-shell-wide">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6 md:mb-9">
          <div>
            <Reveal>
              <div className="mb-4 text-label-l text-tertiary">Career evidence</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline-l text-on-surface">The operating range behind the portfolio.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[470px] text-body-m text-on-surface-variant">
              A career arc from sales floor to founder seat: each role is framed by what was owned, what shipped and which systems were strengthened.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="career-signal-strip mb-6">
            {SIGNALS.map((signal, index) => (
              <div key={signal.label} className="career-signal-card" style={{ animationDelay: `${index * 0.22}s` }}>
                <span className="feature-icon grid h-10 w-10 place-items-center rounded-2xl bg-surface-container-high text-primary">
                  <IconSymbol name={signal.icon} size={21} filled />
                </span>
                <span>
                  <strong>{signal.label}</strong>
                  <small>{signal.text}</small>
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mb-5 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => applyFilter(f.id)}
                  className={`state-layer cursor-pointer rounded-full border px-3.5 py-1.5 text-label-m transition-colors ${on ? "border-transparent bg-on-surface text-surface" : "border-outline-variant text-on-surface-variant hover:text-on-surface"}`}
                >
                  <span className="inline-flex items-center gap-2">
                    {f.label}
                    <span className="rounded-full border border-current/25 px-1.5 py-0.5 text-label-s leading-none opacity-80">{countFor(f.id)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="career-map-shell">
            <div className="career-role-rail">
              {visible.map((entry) => {
                const originalIndex = cv.indexOf(entry);
                const seed = tagSeed(entry.tags[0]);
                const on = active === originalIndex;
                const isPresent = originalIndex === 0;
                return (
                  <button
                    key={`${entry.org}-${entry.date}`}
                    type="button"
                    onMouseEnter={() => setActive(originalIndex)}
                    onFocus={() => setActive(originalIndex)}
                    onClick={() => setActive(originalIndex)}
                    aria-current={on ? "true" : undefined}
                    className={`career-role-row state-layer ${on ? "is-active" : ""}`}
                  >
                    {on && <motion.span layoutId="careerActiveBar" transition={fmTransition.standard} className={`career-active-bar ${SEED_BG[seed]}`} />}
                    <span className={`career-role-icon ${on ? `${SEED_BG[seed]} ${SEED_ON[seed]}` : `${SEED_CONTAINER_BG[seed]} ${SEED_CONTAINER_TEXT[seed]}`}`}>
                      <IconSymbol name={roleIcon(entry)} size={20} filled />
                      {isPresent ? <span className={`career-live ${SEED_BG[seed]}`} /> : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-title-s text-on-surface">{entry.role}</span>
                      <span className="mt-0.5 flex min-w-0 items-center gap-2 text-label-s text-on-surface-variant">
                        <span className="truncate">{entry.org}</span>
                        <span className="opacity-50">·</span>
                        <span className="shrink-0">{entry.date}</span>
                      </span>
                    </span>
                    <IconSymbol name="chevron_right" size={18} className="shrink-0 text-on-surface-variant opacity-60" />
                  </button>
                );
              })}
            </div>

            <div className="career-detail-shell">
              <RoleDetail entry={activeEntry} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
