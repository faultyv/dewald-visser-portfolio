"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal, StaggerGroup } from "./Reveal";
import { IconSymbol } from "./IconSymbol";
import { RollingList } from "./RollingList";
import { tagSeed } from "@/lib/tag-seed";
import { SEED_BG, SEED_ON, SEED_TEXT, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT } from "@/lib/seed-classes";
import type { CVEntry } from "@/lib/content";

const ROLE_ICON: Record<string, string> = {
  Founder: "rocket_launch",
  Marketing: "campaign",
  Design: "palette",
  Web: "language",
  Foundations: "support_agent",
  AI: "auto_awesome",
};

const CHAPTERS = [
  {
    label: "01",
    title: "Founder & systems builder",
    summary: "The current proof: owned ventures and the systems behind them — and turning real operational problems, like a tangle of quoting spreadsheets, into working software.",
    orgs: ["Dynamic Automation", "clicklocal"],
  },
  {
    label: "02",
    title: "Creative, media & web in production",
    summary: "A decade of work that had to ship across real channels — church media, learning and livestream production, packaging and retail art, SEO, campaigns, websites and client delivery.",
    orgs: [
      "Olive Tree Church",
      "Mediatrade",
      "Joseph Business School Africa",
      "Webmeta",
      "Thinklocal",
      "Cambridge University initiative",
      "Kirstenhof Car Hire",
      "Autodoc Diagnostics",
      "Contours Design Studio / Faux Flora",
    ],
  },
  {
    label: "03",
    title: "Commercial foundations",
    summary: "The base layer: sales calls, advising, CRM discipline, data capture and the early self-taught web work that made later creative and systems delivery practical.",
    orgs: ["Educor Holdings", "The Unlimited", "Old Mutual", "Investors Choice"],
  },
] as const;

const SIGNALS = [
  { icon: "sell", label: "Commercial instinct", value: "sales, advising, pipeline" },
  { icon: "design_services", label: "Creative production", value: "Adobe, media, DTP, campaigns" },
  { icon: "hub", label: "Systems ownership", value: "web, CRM, CPQ, workflow" },
];

const CAREER_INTEL = [
  {
    label: "Commercial base",
    value: "200-250 calls/day",
    body: "Software telesales, lead handling, product conversation and daily reporting built the pressure tolerance.",
  },
  {
    label: "Promotion signal",
    value: "10 months",
    body: "Moved from national student advising into international admissions after the online-brand launch expanded.",
  },
  {
    label: "Production scale",
    value: "500+ live",
    body: "Business-school live production, learning media, campaign support and LMS/web systems under public delivery pressure.",
  },
  {
    label: "Systems proof",
    value: "Excel -> CPQ",
    body: "Complex quoting logic rebuilt into a live web prototype with structured modules and pricing rules.",
  },
];

function roleIcon(entry: CVEntry) {
  const priority = ["AI", "Founder", "Web", "Marketing", "Design", "Foundations"];
  const match = priority.find((tag) => entry.tags.includes(tag));
  return match ? ROLE_ICON[match] : "work_history";
}

function rolesForChapter(cv: CVEntry[], orgs: readonly string[]) {
  return orgs.map((org) => cv.find((entry) => entry.org === org)).filter(Boolean) as CVEntry[];
}

const CAREER_ROW_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 170, damping: 24, opacity: { duration: 0.4 } },
  },
};

function RoleRow({ entry }: { entry: CVEntry }) {
  const seed = tagSeed(entry.tags[0]);
  const brandSeed = entry.brandColor ?? seed;
  const proof = entry.proof?.slice(0, 2) ?? [];

  return (
    <motion.article className="career-story-row" variants={CAREER_ROW_VARIANTS}>
      <div className="career-story-date">
        <span>{entry.date}</span>
      </div>
      <div className="career-story-body">
        <div className="career-story-titleline">
          <span className={`career-story-icon ${SEED_BG[brandSeed]} ${SEED_ON[brandSeed]}`}>
            <IconSymbol name={roleIcon(entry)} size={22} filled />
          </span>
          <div className="min-w-0">
            <h4 className="text-title-l text-on-surface">{entry.role}</h4>
            <div className="mt-1 text-label-l text-on-surface-variant">{entry.org}</div>
          </div>
        </div>

        {entry.responsibilities?.length ? (
          <div className="career-roll">
            <span className={`career-roll-dot ${SEED_BG[brandSeed]}`} aria-hidden="true" />
            <RollingList
              items={entry.responsibilities}
              className="career-roll-list"
              itemClassName={`career-roll-item ${SEED_TEXT[brandSeed]}`}
            />
          </div>
        ) : null}

        <p className="career-story-copy text-body-m text-on-surface-variant">{entry.detail}</p>

        {proof.length ? (
          <div className="career-proof-ribbons">
            {proof.map((item) => (
              <span key={`${entry.org}-${item.title}`} className={`career-proof-ribbon ${SEED_CONTAINER_BG[seed]} ${SEED_CONTAINER_TEXT[seed]}`}>
                <strong>{item.type}</strong>
                {item.title}
              </span>
            ))}
          </div>
        ) : null}

        {entry.software?.length ? (
          <div className="career-stack-line">
            {entry.software.slice(0, 6).map((tool) => (
              <span key={`${entry.org}-${tool}`}>{tool}</span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

export function CareerExplorer({ cv }: { cv: CVEntry[] }) {
  const current = cv.find((entry) => entry.org === "Sun Paper and Coatings") ?? cv[0];
  const oliveTree = cv.find((entry) => entry.org === "Olive Tree Church");
  const jbsa = cv.find((entry) => entry.org === "Joseph Business School Africa");

  return (
    <section id="cv" className="career-editorial section-pad relative">
      <div className="content-shell-wide">
        <div className="career-editorial-head">
          <Reveal>
            <div className="text-label-l text-tertiary">Career evidence</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">A career arc built around <span className="text-gradient text-gradient-animated">ownership.</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[620px] text-body-l text-on-surface-variant">
              The through-line is not a job list. It is commercial pressure, creative output and systems responsibility compounding into a founder/operator profile.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="career-command-deck">
            <div className="career-command-copy">
              <div className="text-label-l text-primary">Operating progression</div>
              <h3 className="mt-4 text-display-s text-on-surface">Sales floor to systems owner.</h3>
              <p className="mt-5 max-w-[680px] text-body-l text-on-surface-variant">
              The roles move from customer conversations and CRM discipline into Adobe-led production, then into websites, campaigns, operational tooling and venture ownership. The portfolio makes sense when it is read as <span className="text-mark">that progression.</span>
            </p>
              <div className="career-signal-ledger">
                {SIGNALS.map((signal) => (
                  <div key={signal.label} className="career-ledger-item">
                    <span className="feature-icon grid h-10 w-10 place-items-center rounded-2xl bg-primary-container text-on-primary-container">
                      <IconSymbol name={signal.icon} size={21} filled />
                    </span>
                    <span>
                      <strong>{signal.label}</strong>
                      <small>{signal.value}</small>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <figure className="career-context-frame">
              <Image
                src="/images/dewald/dewald-career-overhead.png"
                alt="Dewald Visser working with people around laptops in a professional workspace"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 520px"
              />
              <span className="career-context-shade" aria-hidden="true" />
              <figcaption>
                <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_0_6px_rgba(0,200,120,0.16)]" />
                Work that happens with people, constraints and delivery pressure in the room.
              </figcaption>
            </figure>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="career-proof-matrix">
            {CAREER_INTEL.map((item) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </Reveal>

        {current ? (
          <Reveal delay={0.16}>
            <div className="career-current-founder">
              <div className="career-founder-logo">
                <Image
                  src="/images/work/sun-paper/logo-trimmed.png"
                  alt="Sun Paper and Coatings logo"
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="220px"
                />
              </div>
              <div className="min-w-0">
                <div className="text-label-l text-secondary">Now building</div>
                <h3 className="mt-1 text-headline-s text-on-surface">{current.org}</h3>
                <p className="mt-3 max-w-[760px] text-body-m text-on-surface-variant">{current.detail}</p>
              </div>
              <div className="career-founder-proof">
                {current.proof?.slice(0, 2).map((item) => (
                  <span key={item.title}>
                    <strong>{item.type}</strong>
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}

        <div className="career-chapter-stack">
          {CHAPTERS.map((chapter, index) => {
            const roles = rolesForChapter(cv, chapter.orgs);
            return (
              <section key={chapter.title} className="career-chapter">
                <Reveal className="career-chapter-intro">
                  <div className="career-chapter-index">{chapter.label}</div>
                  <h3 className="text-headline-s text-on-surface">{chapter.title}</h3>
                  <p className="text-body-m text-on-surface-variant">{chapter.summary}</p>
                  {index === 1 && oliveTree && jbsa ? (
                    <div className="career-chapter-note">
                      <IconSymbol name="verified" size={17} filled />
                      Recent proof spans church communications, learning media and public programme delivery.
                    </div>
                  ) : null}
                </Reveal>
                <StaggerGroup className="career-story-list">
                  {roles.map((entry) => (
                    <RoleRow key={`${entry.org}-${entry.date}`} entry={entry} />
                  ))}
                </StaggerGroup>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
