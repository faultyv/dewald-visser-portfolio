"use client";

import { useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { SEED_TEXT, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT } from "@/lib/seed-classes";
import type { SeedName } from "@/lib/m3-theme";
import type { CompanyEntry } from "@/lib/content";

type Domain = {
  id: string;
  label: string;
  seed: SeedName;
  note: string;
  proof: string;
};

const DOMAINS: Domain[] = [
  { id: "ventures", label: "Ventures", seed: "secondary", note: "Founder-led offers and owned systems", proof: "Where ownership, pricing, suppliers, clients and operating rhythm sit together." },
  { id: "ministry", label: "Education & Mission", seed: "success", note: "Learning, programmes, media and mission work", proof: "Where education brands, faith-led work, media and programme growth became reusable systems." },
  { id: "retail", label: "Retail & Production", seed: "tertiary", note: "DTP, POS, repro and house brands", proof: "Where artwork had to survive print, production deadlines, brand standards and retail constraints." },
  { id: "web", label: "Web, Brand & Growth", seed: "primary", note: "Campaigns, sites and operational tooling", proof: "Where search, websites, booking flows, stores, CPQ and campaign assets became working surfaces." },
  { id: "foundations", label: "Commercial Foundations", seed: "warning", note: "Sales, development and lead discipline", proof: "Where the commercial base was built: product conversations, CRM discipline, targets and training." },
];

const COMPANY_DOMAINS: Record<string, string> = {
  "Sun Paper and Coatings": "ventures",
  clicklocal: "ventures",
  "Contours Design Studio / Faux Flora": "ventures",
  Thinklocal: "web",
  Webmeta: "web",
  "The Dreambook Ministry": "ministry",
  "Joseph Business School Africa": "ministry",
  "Olive Tree Church": "ministry",
  "Damelin Online / LCIBS": "ministry",
  Mediatrade: "retail",
  "Africa Paints": "retail",
  "Solid Doors": "retail",
  "Alif Doors": "retail",
  "Cambridge University initiative": "web",
  "Kirstenhof Car Hire": "web",
  "Autodoc Diagnostics": "web",
  "Dynamic Automation": "web",
  "The Unlimited": "foundations",
  "Old Mutual": "foundations",
  "Investors Choice": "foundations",
};

const THREADS = [
  {
    label: "Education to growth",
    body: "Damelin Online, LCIBS and JBSA show the same pattern: enrolment pressure, learning content, campaign systems and practical adoption work.",
  },
  {
    label: "Creative to production",
    body: "Olive Tree, Mediatrade and the retail brands prove design that survives real deadlines, production rules and public-facing channels.",
  },
  {
    label: "Founder to systems",
    body: "Sun Paper, agency work and Dynamic Automation connect offer design, sales process, web delivery and operational tooling.",
  },
];

function domainFor(company: CompanyEntry): Domain {
  const id = COMPANY_DOMAINS[company.name] ?? "web";
  return DOMAINS.find((domain) => domain.id === id) ?? DOMAINS[3];
}

function isExternalUrl(url?: string) {
  return Boolean(url && /^https?:\/\//.test(url));
}

export function BrandConstellation({ companies }: { companies: CompanyEntry[] }) {
  const [domainId, setDomainId] = useState("ministry");

  const grouped = useMemo(
    () =>
      DOMAINS.map((domain) => ({
        ...domain,
        items: companies.filter((company) => domainFor(company).id === domain.id),
      })),
    [companies],
  );

  const selected = grouped.find((domain) => domain.id === domainId && domain.items.length) ?? grouped.find((domain) => domain.items.length) ?? grouped[0];
  const liveLinks = selected.items.filter((company) => company.url).length;
  const allLiveLinks = companies.filter((company) => company.url).length;

  return (
    <section id="companies" className="surface-band section-pad-tight relative">
      <div className="content-shell-wide">
        <div className="company-clean-head">
          <div>
            <Reveal>
              <div className="text-label-l text-success mb-3">Operating map</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline-l text-on-surface">
                The work sits across <span className="text-gradient text-gradient-animated">five proof lanes.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[520px] text-body-m text-on-surface-variant">
              This is not a logo cloud. It is the operating context behind the portfolio: {companies.length} organisations, {DOMAINS.length} lanes and {allLiveLinks} live reference paths.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="company-map-shell">
            <aside className="company-domain-rail" aria-label="Company proof lanes">
              {grouped.map((domain) => {
                const active = domain.id === selected.id;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => setDomainId(domain.id)}
                    aria-pressed={active}
                    className={`company-domain-button state-layer ${active ? "is-active" : ""}`}
                  >
                    <span className={`company-domain-count ${active ? `${SEED_CONTAINER_BG[domain.seed]} ${SEED_CONTAINER_TEXT[domain.seed]}` : ""}`}>{domain.items.length}</span>
                    <strong>{domain.label}</strong>
                    <small>{domain.note}</small>
                  </button>
                );
              })}
            </aside>

            <div className="company-lane-panel">
              <div className="company-lane-head">
                <div>
                  <div className={`text-label-l ${SEED_TEXT[selected.seed]}`}>Selected lane</div>
                  <h3>{selected.label}</h3>
                  <p>{selected.proof}</p>
                </div>
                <div className="company-lane-stats" aria-label="Selected lane stats">
                  <span>
                    <strong>{selected.items.length}</strong>
                    organisations
                  </span>
                  <span>
                    <strong>{liveLinks}</strong>
                    live links
                  </span>
                </div>
              </div>

              <div className="company-list">
                {selected.items.map((company) => {
                  const row = (
                    <article className="company-row-card">
                      <div>
                        <h4>{company.name}</h4>
                        <p>{company.discipline}</p>
                      </div>
                      <div className="company-row-meta">
                        <span className={SEED_TEXT[selected.seed]}>{company.relationship}</span>
                        <small>{company.period}</small>
                      </div>
                      {company.url ? <span className="company-row-link" aria-hidden="true">Open</span> : null}
                    </article>
                  );

                  if (!company.url) return <div key={company.name}>{row}</div>;
                  return (
                    <a
                      key={company.name}
                      href={company.url}
                      target={isExternalUrl(company.url) ? "_blank" : undefined}
                      rel={isExternalUrl(company.url) ? "noopener noreferrer" : undefined}
                      className="block no-underline"
                    >
                      {row}
                    </a>
                  );
                })}
              </div>
            </div>

            <aside className="company-thread-panel">
              <div className="text-label-l text-on-surface-variant">Connection logic</div>
              <div className="company-thread-list">
                {THREADS.map((thread, index) => (
                  <article key={thread.label}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{thread.label}</strong>
                    <p>{thread.body}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
