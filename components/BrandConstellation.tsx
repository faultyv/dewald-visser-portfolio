"use client";

import { useMemo, useState } from "react";
import { Reveal } from "./Reveal";
import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_ON, SEED_TEXT, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT } from "@/lib/seed-classes";
import type { SeedName } from "@/lib/m3-theme";
import type { CompanyEntry } from "@/lib/content";

type Domain = {
  id: string;
  label: string;
  seed: SeedName;
  icon: string;
  note: string;
};

const DOMAINS: Domain[] = [
  { id: "ventures", label: "Ventures", seed: "secondary", icon: "storefront", note: "Founder-led offers and owned systems" },
  { id: "ministry", label: "Education & Ministry", seed: "success", icon: "school", note: "Learning, media and mission work" },
  { id: "retail", label: "Retail & Production", seed: "tertiary", icon: "inventory_2", note: "DTP, POS, repro and house brands" },
  { id: "web", label: "Web, Brand & Growth", seed: "primary", icon: "language", note: "Campaigns, sites and operational tooling" },
  { id: "foundations", label: "Sales Foundations", seed: "warning", icon: "support_agent", note: "Commercial reps and lead discipline" },
];

const COMPANY_DOMAINS: Record<string, string> = {
  "Sun Paper and Coatings": "ventures",
  clicklocal: "ventures",
  "Contours Design Studio / Faux Flora": "ventures",
  Thinklocal: "web",
  "The Dreambook Ministry": "ministry",
  "Joseph Business School Africa": "ministry",
  "Olive Tree Church": "ministry",
  "Educor Holdings": "ministry",
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

const ICON_BY_COMPANY: Record<string, string> = {
  "Sun Paper and Coatings": "storefront",
  clicklocal: "ads_click",
  "Contours Design Studio / Faux Flora": "local_florist",
  Thinklocal: "design_services",
  "The Dreambook Ministry": "volunteer_activism",
  "Joseph Business School Africa": "school",
  "Olive Tree Church": "diversity_3",
  "Educor Holdings": "workspace_premium",
  Mediatrade: "print",
  "Africa Paints": "format_paint",
  "Solid Doors": "door_front",
  "Alif Doors": "door_sliding",
  "Cambridge University initiative": "history_edu",
  "Kirstenhof Car Hire": "directions_car",
  "Autodoc Diagnostics": "car_repair",
  "Dynamic Automation": "precision_manufacturing",
  "The Unlimited": "headset_mic",
  "Old Mutual": "account_balance",
  "Investors Choice": "monitoring",
};

const THREADS: { label: string; seed: SeedName; icon: string; body: string }[] = [
  {
    label: "Ministry, education & production group",
    seed: "highlight",
    icon: "hub",
    body: "The Dreambook ministry work, Joseph Business School Africa and Mediatrade — connected work across ministry, education and production.",
  },
  {
    label: "clicklocal agency",
    seed: "tertiary",
    icon: "route",
    body: "My own agency and the client work that ran through it — Africa Paints, Solid Doors, Alif Doors and Dynamic Automation.",
  },
  {
    label: "Founder path",
    seed: "secondary",
    icon: "rocket_launch",
    body: "Owned ventures where strategy, offer, brand and operating system all sat together — Sun Paper, clicklocal and Faux Flora.",
  },
];

function domainFor(company: CompanyEntry): Domain {
  const id = COMPANY_DOMAINS[company.name] ?? "web";
  return DOMAINS.find((domain) => domain.id === id) ?? DOMAINS[3];
}

function isExternalUrl(url?: string) {
  return Boolean(url && /^https?:\/\//.test(url));
}

function CompanyCard({ company, domain }: { company: CompanyEntry; domain: Domain }) {
  const icon = ICON_BY_COMPANY[company.name] ?? domain.icon;
  const inner = (
    <article className="hig-card group relative flex h-full flex-col rounded-[20px] p-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 md:p-4.5">
      <div className="flex items-start justify-between gap-3">
        <span className={`feature-icon grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${SEED_BG[domain.seed]} ${SEED_ON[domain.seed]} elevation-1`}>
          <IconSymbol name={icon} size={22} filled />
        </span>
        {company.url ? (
          <IconSymbol
            name={isExternalUrl(company.url) ? "open_in_new" : "arrow_outward"}
            size={16}
            className="mt-1 text-on-surface-variant opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        ) : null}
      </div>
      <div className="mt-3.5 text-title-s text-on-surface">{company.name}</div>
      <div className={`mt-1 text-label-m ${SEED_TEXT[domain.seed]}`}>{company.relationship}</div>
      <div className="mt-auto pt-3 text-label-s text-on-surface-variant">{company.period}</div>
    </article>
  );

  if (!company.url) return inner;
  return (
    <a
      href={company.url}
      target={isExternalUrl(company.url) ? "_blank" : undefined}
      rel={isExternalUrl(company.url) ? "noopener noreferrer" : undefined}
      className="block no-underline"
    >
      {inner}
    </a>
  );
}

export function BrandConstellation({ companies }: { companies: CompanyEntry[] }) {
  const [filter, setFilter] = useState("all");

  const grouped = useMemo(
    () =>
      DOMAINS.map((domain) => ({
        ...domain,
        items: companies.filter((company) => domainFor(company).id === domain.id),
      })),
    [companies],
  );

  const visibleGroups = grouped.filter((group) => (filter === "all" || group.id === filter) && group.items.length);

  return (
    <section id="companies" className="surface-band section-pad-tight relative">
      <div className="content-shell-wide">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <div className="text-label-l text-success mb-3.5">Operating map</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline-l text-on-surface">The organisations behind the work.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[440px] text-body-m text-on-surface-variant">
              {companies.length} organisations grouped by the kind of pressure they created: owned ventures, education and ministry, production,
              web growth and commercial foundations.
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={0.12}>
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              aria-pressed={filter === "all"}
              className={`state-layer cursor-pointer rounded-full border px-3.5 py-1.5 text-label-m transition-colors ${
                filter === "all" ? "border-transparent bg-on-surface text-surface" : "border-outline-variant text-on-surface-variant hover:text-on-surface"
              }`}
            >
              All worlds <span className="ml-1 rounded-full border border-current/25 px-1.5 py-0.5 text-label-s leading-none opacity-80">{companies.length}</span>
            </button>
            {DOMAINS.map((domain) => {
              const on = filter === domain.id;
              const count = grouped.find((group) => group.id === domain.id)?.items.length ?? 0;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setFilter(on ? "all" : domain.id)}
                  aria-pressed={on}
                  className={`state-layer inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-label-m transition-colors ${
                    on ? `border-transparent ${SEED_CONTAINER_BG[domain.seed]} ${SEED_CONTAINER_TEXT[domain.seed]}` : "border-outline-variant text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <IconSymbol name={domain.icon} size={15} filled className={on ? undefined : SEED_TEXT[domain.seed]} />
                  {domain.label}
                  <span className="rounded-full border border-current/25 px-1.5 py-0.5 text-label-s leading-none opacity-80">{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grouped grid */}
        <div className="flex flex-col gap-9">
          {visibleGroups.map((domain) => (
            <Reveal key={domain.id} delay={0.04}>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className={`feature-icon grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${SEED_CONTAINER_BG[domain.seed]} ${SEED_CONTAINER_TEXT[domain.seed]}`}>
                    <IconSymbol name={domain.icon} size={20} filled />
                  </span>
                  <div>
                    <div className="text-title-m text-on-surface">{domain.label}</div>
                    <div className="text-label-s text-on-surface-variant">{domain.note}</div>
                  </div>
                  <span className={`ml-auto rounded-full px-2.5 py-1 text-label-s ${SEED_CONTAINER_BG[domain.seed]} ${SEED_CONTAINER_TEXT[domain.seed]}`}>{domain.items.length}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {domain.items.map((company) => (
                    <CompanyCard key={company.name} company={company} domain={domain} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Connection threads */}
        {filter === "all" ? (
          <Reveal delay={0.1}>
            <div className="mt-12 border-t border-outline-variant pt-9">
              <div className="mb-4 flex items-center gap-2 text-label-l text-on-surface-variant">
                <IconSymbol name="hub" size={16} className="text-highlight" />
                The threads that connect them
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {THREADS.map((thread) => (
                  <div key={thread.label} className="hig-card rounded-[20px] p-4.5">
                    <div className={`flex items-center gap-2 text-title-s ${SEED_TEXT[thread.seed]}`}>
                      <IconSymbol name={thread.icon} size={18} filled />
                      {thread.label}
                    </div>
                    <p className="mt-2 text-body-s text-on-surface-variant">{thread.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
