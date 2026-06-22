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
  "Clinton Palframan Ministries": "ministry",
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
  "The Unlimited": "foundations",
  "Old Mutual": "foundations",
  "Investors Choice": "foundations",
};

const ICON_BY_COMPANY: Record<string, string> = {
  "Sun Paper and Coatings": "storefront",
  clicklocal: "ads_click",
  "Contours Design Studio / Faux Flora": "local_florist",
  Thinklocal: "design_services",
  "Clinton Palframan Ministries": "volunteer_activism",
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
  "The Unlimited": "headset_mic",
  "Old Mutual": "account_balance",
  "Investors Choice": "monitoring",
};

const THREADS = [
  {
    label: "Palframan network",
    seed: "highlight" as SeedName,
    icon: "hub",
    companies: ["Clinton Palframan Ministries", "Joseph Business School Africa", "Mediatrade"],
    body: "One relationship moving through ministry, education, live production and retail artworking.",
  },
  {
    label: "clicklocal agency",
    seed: "tertiary" as SeedName,
    icon: "route",
    companies: ["clicklocal", "Africa Paints", "Solid Doors", "Alif Doors"],
    body: "My own digital + design agency and the local-business clients that ran through it — brand, web, campaigns and production.",
  },
  {
    label: "Founder path",
    seed: "secondary" as SeedName,
    icon: "rocket_launch",
    companies: ["Sun Paper and Coatings", "clicklocal", "Contours Design Studio / Faux Flora"],
    body: "Owned ventures where the strategy, offer, brand and operating system sat together.",
  },
];

function domainFor(company: CompanyEntry): Domain {
  const id = COMPANY_DOMAINS[company.name] ?? "web";
  return DOMAINS.find((domain) => domain.id === id) ?? DOMAINS[3];
}

function isExternalUrl(url?: string) {
  return Boolean(url && /^https?:\/\//.test(url));
}

function relatedThreads(name?: string) {
  if (!name) return THREADS;
  return THREADS.filter((thread) => thread.companies.includes(name));
}

export function BrandConstellation({ companies }: { companies: CompanyEntry[] }) {
  const [active, setActive] = useState(companies[0]?.name ?? "");
  const [filter, setFilter] = useState("all");

  const grouped = useMemo(
    () =>
      DOMAINS.map((domain) => ({
        ...domain,
        items: companies.filter((company) => domainFor(company).id === domain.id),
      })),
    [companies],
  );

  const activeCompany = companies.find((company) => company.name === active) ?? companies[0];
  const activeDomain = activeCompany ? domainFor(activeCompany) : DOMAINS[0];
  const visibleGroups = grouped.filter((group) => filter === "all" || group.id === filter);
  const activeThreads = relatedThreads(activeCompany?.name);
  const activeGroupCount = visibleGroups.reduce((total, group) => total + group.items.length, 0);

  return (
    <section id="companies" className="surface-band section-pad-tight relative">
      <div className="content-shell-wide">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <div className="text-label-l text-success mb-3.5">Companies &amp; collaborators</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline-l text-on-surface">The operating map behind the work.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[460px] text-body-m text-on-surface-variant">
              {companies.length} companies, ventures and clients, arranged as proof paths instead of abstract logo dots. Select a card
              to see the relationship, discipline and hidden thread it belongs to.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mb-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              aria-pressed={filter === "all"}
              className={`state-layer cursor-pointer rounded-full border px-3.5 py-1.5 text-label-m transition-colors ${
                filter === "all" ? "border-transparent bg-on-surface text-surface" : "border-outline-variant text-on-surface-variant"
              }`}
            >
              All worlds
            </button>
            {DOMAINS.map((domain) => {
              const on = filter === domain.id;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setFilter(on ? "all" : domain.id)}
                  aria-pressed={on}
                  className={`state-layer inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-label-m transition-colors ${
                    on ? `border-transparent ${SEED_CONTAINER_BG[domain.seed]} ${SEED_CONTAINER_TEXT[domain.seed]}` : "border-outline-variant text-on-surface-variant"
                  }`}
                >
                  <IconSymbol name={domain.icon} size={15} filled className={on ? undefined : SEED_TEXT[domain.seed]} />
                  {domain.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.13}>
          <div className="intel-status mb-5 grid gap-2 rounded-[22px] border border-outline-variant bg-surface-container-low p-2.5 sm:grid-cols-3">
            <div className="intel-status-item">
              <IconSymbol name="account_tree" size={18} filled />
              <span><strong>{activeGroupCount}</strong> visible proof points</span>
            </div>
            <div className="intel-status-item">
              <IconSymbol name="hub" size={18} filled />
              <span><strong>{THREADS.length}</strong> relationship threads</span>
            </div>
            <div className="intel-status-item">
              <IconSymbol name="radar" size={18} filled />
              <span><strong>{DOMAINS.length}</strong> operating worlds</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} dir="scale">
          <div className="intel-map hig-card rounded-[28px] p-4 md:p-5 lg:p-6">
            <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
              <aside className="intel-readout rounded-[24px] border border-outline-variant bg-surface-container-low p-4 md:p-5">
                {activeCompany ? (
                  <>
                    <div className="mb-4 flex items-start gap-3">
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${SEED_BG[activeDomain.seed]} ${SEED_ON[activeDomain.seed]} elevation-1`}>
                        <IconSymbol name={ICON_BY_COMPANY[activeCompany.name] ?? activeDomain.icon} size={25} filled />
                      </span>
                      <div className="min-w-0">
                        <div className={`text-label-m ${SEED_TEXT[activeDomain.seed]}`}>{activeDomain.label}</div>
                        <h3 className="mt-1 text-title-l text-on-surface">{activeCompany.name}</h3>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <div>
                        <div className="text-label-s text-on-surface-variant">Relationship</div>
                        <div className="mt-1 text-body-m text-on-surface">{activeCompany.relationship}</div>
                      </div>
                      <div>
                        <div className="text-label-s text-on-surface-variant">Discipline</div>
                        <div className="mt-1 text-body-m text-on-surface">{activeCompany.discipline}</div>
                      </div>
                      <div>
                        <div className="text-label-s text-on-surface-variant">Period</div>
                        <div className="mt-1 text-body-m text-on-surface">{activeCompany.period}</div>
                      </div>
                    </div>

                    {activeCompany.url ? (
                      <a
                        href={activeCompany.url}
                        target={isExternalUrl(activeCompany.url) ? "_blank" : undefined}
                        rel={isExternalUrl(activeCompany.url) ? "noopener noreferrer" : undefined}
                        className={`state-layer mt-5 inline-flex items-center gap-2 rounded-full border border-outline-variant px-3.5 py-2 text-label-m no-underline ${SEED_TEXT[activeDomain.seed]}`}
                      >
                        Open proof
                        <IconSymbol name={isExternalUrl(activeCompany.url) ? "open_in_new" : "arrow_forward"} size={15} />
                      </a>
                    ) : null}
                  </>
                ) : null}

                <div className="hig-divider my-5" />
                <div className="mb-3 text-label-m text-on-surface-variant">Connection threads</div>
                <div className="grid gap-2.5">
                  {activeThreads.length ? (
                    activeThreads.map((thread) => (
                      <div key={thread.label} className={`rounded-2xl p-3 ${SEED_CONTAINER_BG[thread.seed]} ${SEED_CONTAINER_TEXT[thread.seed]}`}>
                        <div className="flex items-center gap-2 text-title-s">
                          <IconSymbol name={thread.icon} size={17} filled />
                          {thread.label}
                        </div>
                        <div className="mt-1.5 text-body-s">{thread.body}</div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-outline-variant bg-surface-container p-3 text-body-s text-on-surface-variant">
                      This role sits as a standalone proof point in the wider operating map.
                    </div>
                  )}
                </div>
              </aside>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {visibleGroups.map((domain) => (
                  <article key={domain.id} className="intel-lane rounded-[22px] border border-outline-variant bg-surface-container-low p-3.5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${SEED_CONTAINER_BG[domain.seed]} ${SEED_CONTAINER_TEXT[domain.seed]}`}>
                          <IconSymbol name={domain.icon} size={19} filled />
                        </span>
                        <div>
                          <div className="text-title-s text-on-surface">{domain.label}</div>
                          <div className="mt-0.5 text-label-s text-on-surface-variant">{domain.note}</div>
                        </div>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-label-s ${SEED_CONTAINER_BG[domain.seed]} ${SEED_CONTAINER_TEXT[domain.seed]}`}>{domain.items.length}</span>
                    </div>

                    <div className="grid gap-2">
                      {domain.items.map((company) => {
                        const selected = activeCompany?.name === company.name;
                        return (
                          <button
                            key={company.name}
                            type="button"
                            onMouseEnter={() => setActive(company.name)}
                            onFocus={() => setActive(company.name)}
                            onClick={() => setActive(company.name)}
                            aria-pressed={selected}
                            className={`intel-company state-layer grid cursor-pointer grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border p-2.5 text-left transition-all ${
                              selected
                                ? `border-transparent ${SEED_CONTAINER_BG[domain.seed]} ${SEED_CONTAINER_TEXT[domain.seed]} elevation-1`
                                : "border-outline-variant bg-surface-container text-on-surface hover:border-outline"
                            }`}
                          >
                            <span className={`grid h-[38px] w-[38px] place-items-center rounded-xl ${selected ? `${SEED_BG[domain.seed]} ${SEED_ON[domain.seed]}` : `${SEED_CONTAINER_BG[domain.seed]} ${SEED_CONTAINER_TEXT[domain.seed]}`}`}>
                              <IconSymbol name={ICON_BY_COMPANY[company.name] ?? domain.icon} size={20} filled />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-title-s">{company.name}</span>
                              <span className="mt-0.5 block truncate text-label-s opacity-75">{company.relationship}</span>
                            </span>
                            <IconSymbol name="chevron_right" size={18} className="opacity-60" />
                          </button>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
