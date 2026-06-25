"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { SEED_BG, SEED_TEXT, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT } from "@/lib/seed-classes";
import type { CVEntry } from "@/lib/content";
import type { SeedName } from "@/lib/m3-theme";

type CareerPhase = {
  id: string;
  index: string;
  range: string;
  seed: SeedName;
  title: string;
  short: string;
  summary: string;
  orgs: string[];
  evidence: string[];
};

const CAREER_PHASES: CareerPhase[] = [
  {
    id: "commercial-base",
    index: "01",
    range: "2014-2016",
    seed: "info",
    title: "Commercial foundations",
    short: "Software sales, client conversations and pipeline discipline.",
    summary: "The early layer was not glamorous, but it matters: software sales, business-development support, CRM hygiene, client conversations, reporting and the first self-taught web build.",
    orgs: ["Investors Choice", "Old Mutual", "The Unlimited"],
    evidence: ["Software-sales conversations", "CRM and lead reporting", "Self-taught website and rebrand work"],
  },
  {
    id: "education-ai",
    index: "02",
    range: "2016-2019",
    seed: "secondary",
    title: "Education brands and early AI readiness",
    short: "Damelin Online, LCIBS admissions and AI-readiness work.",
    summary: "Damelin Online and LCIBS joined commercial pressure with education-brand delivery: enrolment conversion, reporting, campaign assets and early AI-readiness work under Brett Kilpatrick before AI was ordinary office language.",
    orgs: ["Damelin Online / LCIBS"],
    evidence: ["Promoted into international admissions", "AI-readiness context under Brett Kilpatrick", "Templates, booklets, email and animated campaign assets"],
  },
  {
    id: "creative-web",
    index: "03",
    range: "2020-2024",
    seed: "tertiary",
    title: "Creative, web and production range",
    short: "Brand, DTP, Shopify, WordPress, campaigns and agency delivery.",
    summary: "The middle layer expanded the toolset: Shopify during lockdown, senior brand and DTP, WordPress builds, organic growth, paid campaigns, local-business clients and production-ready artwork.",
    orgs: ["Contours Design Studio / Faux Flora", "Thinklocal", "Webmeta", "clicklocal", "Kirstenhof Car Hire", "Autodoc Diagnostics", "Cambridge University initiative"],
    evidence: ["Shopify lockdown pivot", "Senior Adobe-led production", "Search, email, booking and website systems"],
  },
  {
    id: "programme-engine",
    index: "04",
    range: "2022-2025",
    seed: "success",
    title: "Programme growth engine",
    short: "JBSA, Dreambook, media systems and masterclass demand.",
    summary: "Joseph Business School Africa turned the range into an engine: campaigns, livestreams, learning media, funnels, LMS/web support and Canva plus ChatGPT workflows for a US-founded entrepreneurship programme in Africa.",
    orgs: ["Joseph Business School Africa", "Mediatrade", "Olive Tree Church"],
    evidence: ["Livestreams to 500+", "Global JBS benchmark proof", "Media, campaigns and team training"],
  },
  {
    id: "founder-systems",
    index: "05",
    range: "2026-now",
    seed: "highlight",
    title: "Founder systems ownership",
    short: "Sun Paper plus CPQ systems: offer, brand, pricing and operations.",
    summary: "The current layer is ownership: a physical supply business with brand, sales and operating systems, plus CPQ work that translated fragile Excel quoting logic into a usable web prototype.",
    orgs: ["Sun Paper and Coatings", "Dynamic Automation"],
    evidence: ["Supplier and customer pipeline", "Pricing and stock planning", "Excel logic rebuilt as a web CPQ prototype"],
  },
];

const CAREER_SIGNALS = [
  { label: "Early AI signal", value: "LCIBS", body: "AI-readiness work before AI became normal workplace language." },
  { label: "Programme scale", value: "500+", body: "Livestream audience and masterclass production context at JBSA." },
  { label: "System proof", value: "CPQ", body: "Spreadsheet quoting logic turned into a live web prototype." },
  { label: "Current ownership", value: "Founder", body: "Sun Paper brand, sales, suppliers, pricing and operations." },
];

function entriesForPhase(cv: CVEntry[], phase: CareerPhase) {
  return phase.orgs.map((org) => cv.find((entry) => entry.org === org)).filter(Boolean) as CVEntry[];
}

function uniqueList(items: string[], limit: number) {
  return [...new Set(items.filter(Boolean))].slice(0, limit);
}

export function CareerExplorer({ cv }: { cv: CVEntry[] }) {
  const [phaseId, setPhaseId] = useState("education-ai");
  const selectedPhase = CAREER_PHASES.find((phase) => phase.id === phaseId) ?? CAREER_PHASES[1];
  const selectedEntries = useMemo(() => entriesForPhase(cv, selectedPhase), [cv, selectedPhase]);
  const selectedProof = uniqueList(selectedEntries.flatMap((entry) => entry.proof?.map((item) => `${item.type}: ${item.title}`) ?? []), 4);
  const selectedStack = uniqueList(selectedEntries.flatMap((entry) => entry.software ?? []), 8);

  return (
    <section id="cv" className="career-editorial section-pad-tight relative">
      <div className="content-shell-wide">
        <div className="career-clean-head">
          <Reveal>
            <div className="text-label-l text-primary">Career logic</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">
              A career arc that compounds into <span className="text-gradient text-gradient-animated">operator range.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[680px] text-body-l text-on-surface-variant">
              Read it as a progression, not a job list: commercial foundations, education-brand systems, creative production, growth infrastructure and founder ownership.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="career-clean-board hig-glass">
            <div className="career-phase-column">
              <div className="career-phase-tabs" role="tablist" aria-label="Career phase selector">
                {CAREER_PHASES.map((phase) => {
                  const active = phase.id === selectedPhase.id;
                  return (
                    <button
                      key={phase.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setPhaseId(phase.id)}
                      className={`career-phase-tab state-layer ${active ? "is-active" : ""}`}
                    >
                      <span className={`career-phase-index ${active ? `${SEED_CONTAINER_BG[phase.seed]} ${SEED_CONTAINER_TEXT[phase.seed]}` : ""}`}>{phase.index}</span>
                      <strong>{phase.title}</strong>
                      <small>{phase.range}</small>
                    </button>
                  );
                })}
              </div>
            </div>

            <article className="career-selected-panel">
              <div className="career-selected-kicker">
                <span className={SEED_TEXT[selectedPhase.seed]}>{selectedPhase.range}</span>
                <span>{selectedEntries.length} role{selectedEntries.length === 1 ? "" : "s"}</span>
              </div>
              <h3>{selectedPhase.title}</h3>
              <p>{selectedPhase.summary}</p>

              <div className="career-evidence-list">
                {selectedPhase.evidence.map((item) => (
                  <span key={item}>
                    <i className={SEED_BG[selectedPhase.seed]} aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>

              {selectedProof.length ? (
                <div className="career-proof-list" aria-label="Selected proof points">
                  {selectedProof.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              ) : null}
            </article>

            <figure className="career-clean-photo">
              <Image
                src="/images/dewald/dewald-career-overhead.png"
                alt="Dewald Visser working with people around laptops in a professional workspace"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 430px"
              />
              <figcaption>Hands-on delivery with people, constraints and decisions in the room.</figcaption>
            </figure>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="career-signal-strip">
            {CAREER_SIGNALS.map((signal) => (
              <article key={signal.label}>
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
                <p>{signal.body}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="career-role-panel">
            <div className="career-role-head">
              <div>
                <div className={`text-label-l ${SEED_TEXT[selectedPhase.seed]}`}>Selected evidence</div>
                <h3 className="mt-1 text-headline-s text-on-surface">{selectedPhase.short}</h3>
              </div>
              {selectedStack.length ? (
                <div className="career-stack-compact" aria-label="Tools and systems used in this phase">
                  {selectedStack.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="career-role-grid">
              {selectedEntries.map((entry) => (
                <article key={`${entry.org}-${entry.date}`} className="career-role-card hig-card">
                  <div className="career-role-meta">
                    <span>{entry.date}</span>
                    <span className={SEED_TEXT[entry.brandColor ?? selectedPhase.seed]}>{entry.org}</span>
                  </div>
                  <h4>{entry.role}</h4>
                  <p>{entry.detail}</p>
                  {entry.proof?.length ? (
                    <div className="career-role-proof">
                      {entry.proof.slice(0, 2).map((proof) => (
                        <span key={proof.title}>{proof.title}</span>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
