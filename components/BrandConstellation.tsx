"use client";

import { useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_ON, SEED_TEXT, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT } from "@/lib/seed-classes";
import type { SeedName } from "@/lib/m3-theme";
import type { CompanyEntry } from "@/lib/content";

/** Domains group the companies into the worlds Dewald has operated in. */
const DOMAINS: { id: string; label: string; seed: SeedName }[] = [
  { id: "ventures", label: "Ventures", seed: "secondary" },
  { id: "ministry", label: "Education & Ministry", seed: "success" },
  { id: "retail", label: "Retail & Production", seed: "tertiary" },
  { id: "web", label: "Web, Brand & Growth", seed: "primary" },
  { id: "foundations", label: "Sales Foundations", seed: "warning" },
];

/** Hand-tuned node layout (x/y in % of the canvas) + domain membership. */
const NODES: Record<string, { x: number; y: number; domain: string }> = {
  "Sun Paper and Coatings": { x: 13, y: 28, domain: "ventures" },
  "Contours Design Studio / Faux Flora": { x: 11, y: 58, domain: "ventures" },
  "Clinton Palframan Ministries": { x: 43, y: 15, domain: "ministry" },
  "Joseph Business School Africa": { x: 57, y: 23, domain: "ministry" },
  "Olive Tree Church": { x: 39, y: 35, domain: "ministry" },
  "Educor Holdings": { x: 33, y: 57, domain: "ministry" },
  Mediatrade: { x: 71, y: 15, domain: "retail" },
  "Africa Paints": { x: 86, y: 25, domain: "retail" },
  "Solid Doors": { x: 89, y: 45, domain: "retail" },
  "Alif Doors": { x: 80, y: 61, domain: "retail" },
  "Cambridge University initiative": { x: 62, y: 40, domain: "web" },
  "Kirstenhof Car Hire": { x: 53, y: 55, domain: "web" },
  "Autodoc Diagnostics": { x: 65, y: 71, domain: "web" },
  "The Unlimited": { x: 23, y: 75, domain: "foundations" },
  "Old Mutual": { x: 35, y: 85, domain: "foundations" },
  "Investors Choice": { x: 14, y: 84, domain: "foundations" },
};

/** Edges. "key" edges are the Clinton Palframan network — the non-obvious thread. */
const EDGES: { a: string; b: string; kind: "key" | "link" }[] = [
  { a: "Clinton Palframan Ministries", b: "Mediatrade", kind: "key" },
  { a: "Clinton Palframan Ministries", b: "Joseph Business School Africa", kind: "key" },
  { a: "Joseph Business School Africa", b: "Mediatrade", kind: "key" },
  { a: "Joseph Business School Africa", b: "Educor Holdings", kind: "link" },
  { a: "Educor Holdings", b: "Olive Tree Church", kind: "link" },
  { a: "Educor Holdings", b: "Cambridge University initiative", kind: "link" },
  { a: "Mediatrade", b: "Africa Paints", kind: "link" },
  { a: "Africa Paints", b: "Solid Doors", kind: "link" },
  { a: "Solid Doors", b: "Alif Doors", kind: "link" },
  { a: "Cambridge University initiative", b: "Kirstenhof Car Hire", kind: "link" },
  { a: "Kirstenhof Car Hire", b: "Autodoc Diagnostics", kind: "link" },
  { a: "Autodoc Diagnostics", b: "Old Mutual", kind: "link" },
  { a: "Sun Paper and Coatings", b: "Contours Design Studio / Faux Flora", kind: "link" },
  { a: "Contours Design Studio / Faux Flora", b: "Kirstenhof Car Hire", kind: "link" },
  { a: "The Unlimited", b: "Old Mutual", kind: "link" },
  { a: "Old Mutual", b: "Investors Choice", kind: "link" },
  { a: "The Unlimited", b: "Investors Choice", kind: "link" },
];

const STROKE: Record<SeedName, string> = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  tertiary: "var(--color-tertiary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  accent: "var(--color-accent)",
  info: "var(--color-info)",
  highlight: "var(--color-highlight)",
} as unknown as Record<SeedName, string>;

function domainSeed(domain: string): SeedName {
  return (DOMAINS.find((d) => d.id === domain)?.seed ?? "primary") as SeedName;
}

export function BrandConstellation({ companies }: { companies: CompanyEntry[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const byName = useMemo(() => Object.fromEntries(companies.map((c) => [c.name, c])), [companies]);

  // neighbours of the active node (so we can highlight its sub-graph)
  const neighbours = useMemo(() => {
    if (!active) return new Set<string>();
    const set = new Set<string>();
    EDGES.forEach((e) => {
      if (e.a === active) set.add(e.b);
      if (e.b === active) set.add(e.a);
    });
    return set;
  }, [active]);

  const inFocus = (name: string) => {
    if (filter !== "all" && NODES[name]?.domain !== filter) return false;
    if (!active) return true;
    return name === active || neighbours.has(name);
  };

  const edgeLit = (e: (typeof EDGES)[number]) => {
    if (active) return e.a === active || e.b === active;
    if (filter !== "all") return NODES[e.a]?.domain === filter && NODES[e.b]?.domain === filter;
    return e.kind === "key"; // ambient: only the Palframan thread glows at rest
  };

  const activeCompany = active ? byName[active] : null;
  const activeSeed = active ? domainSeed(NODES[active]?.domain) : "primary";

  return (
    <section id="companies" className="surface-band section-pad-tight relative">
      <div className="content-shell-wide">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <div className="text-label-l text-success mb-3.5">Companies &amp; collaborators</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline-l text-on-surface">The network behind the work.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[440px] text-body-m text-on-surface-variant">
              {companies.length} companies, ventures and clients — mapped by the worlds they sit in and the threads that connect
              them. Hover a node to trace its links; the highlighted strand is the Clinton Palframan network tying ministry,
              production and education together.
            </p>
          </Reveal>
        </div>

        {/* Filter chips */}
        <Reveal delay={0.12}>
          <div className="mb-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`state-layer cursor-pointer rounded-full border px-3.5 py-1.5 text-label-m transition-colors ${filter === "all" ? "border-transparent bg-on-surface text-surface" : "border-outline-variant text-on-surface-variant"}`}
            >
              All worlds
            </button>
            {DOMAINS.map((d) => {
              const on = filter === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setFilter(on ? "all" : d.id)}
                  className={`state-layer inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-label-m transition-colors ${on ? `border-transparent ${SEED_CONTAINER_BG[d.seed]} ${SEED_CONTAINER_TEXT[d.seed]}` : "border-outline-variant text-on-surface-variant"}`}
                >
                  <span className={`h-2 w-2 rounded-full ${SEED_BG[d.seed]}`} />
                  {d.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ---------- Interactive map (sm+) ---------- */}
        <Reveal delay={0.15} dir="scale">
          <div
            className="constellation relative hidden overflow-hidden rounded-[28px] border border-outline-variant bg-surface-container-low elevation-3 sm:block"
            style={{ aspectRatio: "16 / 9" }}
            onMouseLeave={() => setActive(null)}
          >
            {/* connection lines */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {EDGES.map((e, i) => {
                const A = NODES[e.a];
                const B = NODES[e.b];
                if (!A || !B) return null;
                const lit = edgeLit(e);
                const seed = e.kind === "key" ? "highlight" : domainSeed(A.domain);
                return (
                  <line
                    key={i}
                    x1={A.x}
                    y1={A.y}
                    x2={B.x}
                    y2={B.y}
                    stroke={STROKE[seed as SeedName]}
                    strokeWidth={e.kind === "key" ? 1.6 : 1.1}
                    strokeLinecap="round"
                    style={{ vectorEffect: "non-scaling-stroke", opacity: lit ? (e.kind === "key" ? 0.9 : 0.7) : 0.07, transition: "opacity 360ms ease" }}
                    strokeDasharray={e.kind === "key" ? "0.1 3" : undefined}
                  />
                );
              })}
            </svg>

            {/* nodes */}
            {companies.map((c) => {
              const pos = NODES[c.name];
              if (!pos) return null;
              const seed = domainSeed(pos.domain);
              const focused = inFocus(c.name);
              const isActive = active === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onMouseEnter={() => setActive(c.name)}
                  onFocus={() => setActive(c.name)}
                  onClick={() => {
                    if (c.url) window.open(c.url, "_blank", "noopener");
                  }}
                  aria-label={`${c.name} — ${c.relationship}`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl outline-none"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, opacity: focused ? 1 : 0.28, transition: "opacity 320ms ease, transform 320ms ease", transform: `translate(-50%, -50%) scale(${isActive ? 1.12 : 1})`, zIndex: isActive ? 30 : 10 }}
                >
                  <span
                    className={`grid place-items-center rounded-2xl ${SEED_BG[seed]} ${SEED_ON[seed]} elevation-2 transition-shadow`}
                    style={{ width: 46, height: 46, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13, boxShadow: isActive ? `0 0 0 4px var(--color-surface), 0 0 22px 2px ${STROKE[seed]}` : undefined }}
                  >
                    {c.mark}
                  </span>
                  <span
                    className={`pointer-events-none absolute left-1/2 top-[52px] w-max max-w-[140px] -translate-x-1/2 truncate text-center text-label-s transition-colors ${isActive ? SEED_TEXT[seed] : "text-on-surface-variant"}`}
                  >
                    {c.name}
                  </span>
                </button>
              );
            })}

            {/* detail / insight panel */}
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex justify-between gap-3 md:right-auto md:max-w-[340px]">
              <div className="hig-glass pointer-events-auto w-full rounded-2xl px-4 py-3">
                {activeCompany ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${SEED_BG[activeSeed]}`} />
                      <span className="text-title-s text-on-surface">{activeCompany.name}</span>
                    </div>
                    <div className={`mt-1 text-label-m ${SEED_TEXT[activeSeed]}`}>{activeCompany.relationship}</div>
                    <div className="mt-1 text-body-s text-on-surface-variant">{activeCompany.discipline}</div>
                    <div className="mt-2 flex items-center gap-3 text-label-s text-on-surface-variant">
                      <span>{activeCompany.period}</span>
                      {activeCompany.url ? (
                        <span className={`inline-flex items-center gap-1 ${SEED_TEXT[activeSeed]}`}>
                          Open <IconSymbol name="open_in_new" size={12} />
                        </span>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-label-m text-on-surface">
                      <IconSymbol name="hub" size={16} className="text-highlight" />
                      Trace the network
                    </div>
                    <div className="mt-1 text-body-s text-on-surface-variant">
                      Hover any node to light up its connections. The glowing strand links Clinton Palframan Ministries,
                      Mediatrade and Joseph Business School — one relationship, three mandates.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---------- Mobile fallback: grouped list ---------- */}
        <div className="grid gap-4 sm:hidden">
          {DOMAINS.filter((d) => filter === "all" || filter === d.id).map((d) => {
            const items = companies.filter((c) => NODES[c.name]?.domain === d.id);
            if (!items.length) return null;
            return (
              <div key={d.id} className="hig-card rounded-[22px] p-4">
                <div className={`mb-3 inline-flex items-center gap-2 text-label-m ${SEED_TEXT[d.seed]}`}>
                  <span className={`h-2 w-2 rounded-full ${SEED_BG[d.seed]}`} />
                  {d.label}
                </div>
                <div className="flex flex-col gap-2.5">
                  {items.map((c) => {
                    const inner = (
                      <div className="flex items-center gap-3">
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${SEED_BG[d.seed]} ${SEED_ON[d.seed]} text-label-s`} style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
                          {c.mark}
                        </span>
                        <div className="min-w-0">
                          <div className="truncate text-body-m text-on-surface">{c.name}</div>
                          <div className="truncate text-label-s text-on-surface-variant">{c.relationship}</div>
                        </div>
                        {c.url ? <IconSymbol name="open_in_new" size={14} className="ml-auto text-on-surface-variant" /> : null}
                      </div>
                    );
                    return c.url ? (
                      <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="no-underline">
                        {inner}
                      </a>
                    ) : (
                      <div key={c.name}>{inner}</div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
