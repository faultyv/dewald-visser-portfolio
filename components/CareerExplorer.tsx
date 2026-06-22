"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

function roleIcon(entry: CVEntry) {
  const priority = ["AI", "Founder", "Web", "Marketing", "Design", "Foundations"];
  const match = priority.find((tag) => entry.tags.includes(tag));
  return match ? ROLE_ICON[match] : "work_history";
}

function RoleDetail({ entry }: { entry: CVEntry }) {
  const seed = tagSeed(entry.tags[0]);
  const brandSeed = entry.brandColor ?? seed;
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className={`text-label-m ${SEED_TEXT[seed]}`}>{entry.date}</div>
          <h3 className="mt-1.5 text-headline-s text-on-surface md:text-headline-m">{entry.role}</h3>
          <div className="mt-1 text-title-s text-on-surface-variant">{entry.org}</div>
        </div>
        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${SEED_BG[brandSeed]} ${SEED_ON[brandSeed]} elevation-1`}>
          <IconSymbol name={roleIcon(entry)} size={28} filled />
        </div>
      </div>

      <p className="mt-4 max-w-[640px] text-body-l text-on-surface-variant">{entry.detail}</p>

      {entry.proof?.length ? (
        <div className="mt-6">
          <div className="mb-3 text-label-m text-on-surface-variant">What that looked like</div>
          <div className="grid gap-2.5">
            {entry.proof.map((p) => (
              <div key={p.title} className="flex gap-3 rounded-2xl border border-outline-variant bg-surface-container-low p-3.5">
                <span className={`mt-0.5 grid h-7 shrink-0 place-items-center rounded-full px-2.5 text-label-s ${SEED_CONTAINER_BG[seed]} ${SEED_CONTAINER_TEXT[seed]}`}>{p.type}</span>
                <div>
                  <div className="text-title-s text-on-surface">{p.title}</div>
                  <div className="mt-0.5 text-body-s text-on-surface-variant">{p.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {entry.software?.length ? (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-label-s text-on-surface-variant">Stack</span>
          {entry.software.map((tool) => (
            <span key={tool} className="rounded-full border border-outline bg-surface-container-high px-2.5 py-1 text-label-s text-on-surface">
              {tool}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CareerExplorer({ cv }: { cv: CVEntry[] }) {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState<string>("all");

  const matches = (entry: CVEntry) => filter === "all" || entry.tags.includes(filter);

  return (
    <section id="cv" className="section-pad relative">
      <div className="content-shell-wide">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6 md:mb-9">
          <div>
            <Reveal>
              <div className="mb-4 text-label-l text-tertiary">Experience</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline-l text-on-surface">A decade, one role at a time.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[420px] text-body-m text-on-surface-variant">
              {cv.length} roles from a 2014 sales floor to founding my own venture — select any to read the scope, the proof and the
              stack behind it.
            </p>
          </Reveal>
        </div>

        {/* Discipline filters */}
        <Reveal delay={0.12}>
          <div className="mb-5 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`state-layer cursor-pointer rounded-full border px-3.5 py-1.5 text-label-m transition-colors ${on ? "border-transparent bg-on-surface text-surface" : "border-outline-variant text-on-surface-variant hover:text-on-surface"}`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,355px)_minmax(0,1fr)] lg:gap-8">
            {/* ---------- Timeline rail ---------- */}
            <div className="relative">
              {/* spine */}
              <div className="absolute bottom-3 left-[18px] top-3 hidden w-px bg-outline-variant lg:block" />
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                {cv.map((entry, i) => {
                  const seed = tagSeed(entry.tags[0]);
                  const on = active === i;
                  const dim = !matches(entry);
                  const isPresent = i === 0;
                  return (
                    <li key={`${entry.org}-${entry.date}`}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => setActive(i)}
                        aria-current={on ? "true" : undefined}
                        className={`group relative flex w-full items-center gap-3.5 rounded-2xl border px-3 py-2.5 text-left transition-all ${on ? "border-outline-variant bg-surface-container elevation-1" : "border-transparent hover:bg-surface-container-low"}`}
                        style={{ opacity: dim ? 0.4 : 1 }}
                      >
                        {on && (
                          <motion.span layoutId="careerActive" transition={fmTransition.standard} className={`absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-full ${SEED_BG[seed]}`} />
                        )}
                        {/* node on the spine */}
                        <span className="relative grid h-[38px] w-[38px] shrink-0 place-items-center">
                          <span className={`grid h-[38px] w-[38px] place-items-center rounded-xl transition-colors ${on ? `${SEED_BG[seed]} ${SEED_ON[seed]}` : `${SEED_CONTAINER_BG[seed]} ${SEED_CONTAINER_TEXT[seed]}`}`}>
                            <IconSymbol name={roleIcon(entry)} size={20} filled />
                          </span>
                          {isPresent && <span className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ${SEED_BG[seed]} animate-[pingDot_1.8s_cubic-bezier(0,0,0.2,1)_infinite]`} />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className={`truncate text-title-s ${on ? "text-on-surface" : "text-on-surface"}`}>{entry.role}</span>
                          </span>
                          <span className="mt-0.5 flex items-center gap-2 text-label-s text-on-surface-variant">
                            <span className="truncate">{entry.org}</span>
                            <span className="opacity-50">·</span>
                            <span className="shrink-0">{entry.date}</span>
                          </span>
                        </span>
                        <IconSymbol name="chevron_right" size={18} className={`shrink-0 transition-opacity ${on ? "text-on-surface-variant opacity-100" : "text-on-surface-variant opacity-0 group-hover:opacity-60"}`} />
                      </button>

                      {/* Mobile: inline expanded detail under the active row */}
                      {on && (
                        <div className="lg:hidden">
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={fmTransition.standard} className="overflow-hidden">
                            <div className="hig-card mt-1.5 rounded-[22px] p-4">
                              <RoleDetail entry={entry} />
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ---------- Detail panel (desktop) ---------- */}
            <div className="hidden lg:block">
              <div className="hig-card sticky top-28 rounded-[26px] p-6 xl:p-7">
                <AnimatePresence mode="wait">
                  <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={fmTransition.standard}>
                    <RoleDetail entry={cv[active]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
