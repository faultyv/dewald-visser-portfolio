import Image from "next/image";
import { Reveal } from "./Reveal";
import { IconSymbol } from "./IconSymbol";
import type { SiteConfig } from "@/lib/content";

const SYSTEM_CARDS = [
  {
    label: "Signal",
    title: "Brief clarity",
    body: "Audience, offer, constraints and success criteria are mapped before creative starts.",
    icon: "travel_explore",
    accent: "bg-primary text-on-primary",
    text: "text-primary",
  },
  {
    label: "Creative",
    title: "Campaign language",
    body: "Design, copy and content decisions become a reusable language the team can keep using.",
    icon: "palette",
    accent: "bg-tertiary text-on-tertiary",
    text: "text-tertiary",
  },
  {
    label: "System",
    title: "Working surface",
    body: "Pages, forms, content paths and production tools turn the idea into a working flow.",
    icon: "web",
    accent: "bg-success text-on-success",
    text: "text-success",
  },
  {
    label: "Loop",
    title: "AI-assisted iteration",
    body: "Prompt systems, review habits and data points make the next move faster and sharper.",
    icon: "auto_awesome",
    accent: "bg-highlight text-on-highlight",
    text: "text-highlight",
  },
] as const;

const CURSORS = [
  { label: "Strategy", className: "system-cursor-a", tone: "bg-primary text-on-primary" },
  { label: "Creative", className: "system-cursor-b", tone: "bg-tertiary text-on-tertiary" },
  { label: "Delivery", className: "system-cursor-c", tone: "bg-success text-on-success" },
] as const;

const BOARD_ROWS = [
  { label: "Brand", value: "Positioning", width: "82%" },
  { label: "Web", value: "Conversion flow", width: "68%" },
  { label: "AI", value: "Workflow assist", width: "76%" },
] as const;

const OUTCOMES = ["Sharper briefs", "Reusable assets", "Live web systems", "Measured learning"];

function SystemCard({ card, index }: { card: (typeof SYSTEM_CARDS)[number]; index: number }) {
  return (
    <article className="system-node system-card-breathe hig-card flex min-h-[174px] flex-col rounded-[22px] p-4 md:p-5" style={{ animationDelay: `${index * 0.35}s` }}>
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className={`feature-icon grid h-11 w-11 shrink-0 place-items-center rounded-[16px] ${card.accent}`}>
          <IconSymbol name={card.icon} size={23} filled />
        </div>
        <span className={`rounded-full px-2.5 py-1 text-label-s ${card.text}`}>{card.label}</span>
      </div>
      <div className="relative z-10 mt-auto pt-6">
        <h3 className="m-0 text-title-m text-on-surface">{card.title}</h3>
        <p className="mt-2 text-body-s text-on-surface-variant">{card.body}</p>
      </div>
    </article>
  );
}

export function CraftSystem({ site }: { site: SiteConfig }) {
  return (
    <section id="system" className="section-pad-tight content-shell-wide relative">
      <div className="mx-auto mb-10 max-w-[820px] text-center md:mb-12">
        <Reveal>
          <div className="mb-4 text-label-l text-primary">How a project runs</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-headline-l text-on-surface">
            Better work, by <span className="text-primary">designed systems.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-[620px] text-body-l text-on-surface-variant">
            One operating board for the brief, creative, build and learning loop — so the work moves as a system instead of a chain of disconnected handoffs.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} dir="scale">
        <div className="system-stage relative mx-auto overflow-hidden rounded-[28px] border border-outline-variant bg-surface-container-low p-3.5 elevation-4 sm:p-5 lg:p-7">
          <div className="system-stage-toolbar relative z-20 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-outline-variant bg-surface-container/74 px-3 py-2.5 backdrop-blur-xl md:px-4">
            <div className="inline-flex items-center gap-2 text-label-m text-on-surface">
              <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-success)_18%,transparent)]" />
              Live operating board
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-label-s text-on-surface-variant">
              <span>Signal</span>
              <IconSymbol name="arrow_forward" size={14} />
              <span>Creative</span>
              <IconSymbol name="arrow_forward" size={14} />
              <span>Build</span>
              <IconSymbol name="arrow_forward" size={14} />
              <span>Learn</span>
            </div>
          </div>
          <div className="system-flow-line system-flow-line-a" aria-hidden="true" />
          <div className="system-flow-line system-flow-line-b" aria-hidden="true" />
          <span className="system-pulse system-pulse-a" aria-hidden="true" />
          <span className="system-pulse system-pulse-b" aria-hidden="true" />
          <span className="system-pulse system-pulse-c" aria-hidden="true" />

          {CURSORS.map((cursor) => (
            <div key={cursor.label} className={`system-cursor hidden sm:flex ${cursor.className}`} aria-hidden="true">
              <IconSymbol name="near_me" size={23} filled className="system-cursor-arrow" />
              <span className={`rounded-full px-2.5 py-1 text-label-m shadow-lg ${cursor.tone}`}>{cursor.label}</span>
            </div>
          ))}

          <div className="relative z-10 grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,1.25fr)_minmax(0,0.92fr)] lg:items-stretch">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {SYSTEM_CARDS.slice(0, 2).map((card, index) => (
                <SystemCard key={card.title} card={card} index={index} />
              ))}
            </div>

            <figure className="system-portrait-panel hig-card m-0 rounded-[26px] p-3 md:p-4">
              <div className="relative aspect-square overflow-hidden rounded-[22px] bg-surface-container-high">
                <Image
                  src={site.media.systemImage}
                  alt={site.media.systemImageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 520px"
                  className="dewald-action-focus-tight object-cover"
                />
                <div className="system-scan" aria-hidden="true" />
                <div className="absolute inset-x-3 bottom-3 rounded-[18px] border border-white/18 bg-black/58 p-3 text-white backdrop-blur-xl md:inset-x-4 md:bottom-4 md:p-4">
                  <div className="mb-1.5 flex items-center gap-2 text-label-s text-white/76">
                    <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_0_6px_rgba(131,222,151,0.18)]" />
                    Live project room
                  </div>
                  <figcaption className="max-w-[36ch] text-title-s text-white md:text-title-m">
                    {site.media.systemImageCaption}
                  </figcaption>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {OUTCOMES.slice(0, 3).map((outcome) => (
                  <div key={outcome} className="rounded-[16px] border border-outline-variant bg-surface-container px-3 py-2">
                    <div className="text-label-s text-primary">Proof</div>
                    <div className="mt-1 text-label-m text-on-surface">{outcome}</div>
                  </div>
                ))}
              </div>
            </figure>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {SYSTEM_CARDS.slice(2).map((card, index) => (
                <SystemCard key={card.title} card={card} index={index + 2} />
              ))}

              <article className="system-console rounded-[22px] border border-outline-variant bg-surface-container/80 p-4 backdrop-blur-xl sm:col-span-2 lg:col-span-1">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-label-s text-primary">Decision loop</div>
                    <h3 className="mt-1 text-title-s text-on-surface">From idea to useful system</h3>
                  </div>
                  <div className="feature-icon grid h-10 w-10 place-items-center rounded-[14px] bg-primary text-on-primary">
                    <IconSymbol name="hub" size={22} filled />
                  </div>
                </div>
                <div className="space-y-3">
                  {BOARD_ROWS.map((row, index) => (
                    <div key={row.label}>
                      <div className="mb-1.5 flex items-center justify-between gap-3 text-label-m">
                        <span className="text-on-surface">{row.label}</span>
                        <span className="text-on-surface-variant">{row.value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-outline-variant/60">
                        <div className="system-meter h-full rounded-full bg-primary" style={{ width: row.width, animationDelay: `${index * 0.28}s` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>

          <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-2">
            {OUTCOMES.map((outcome) => (
              <span key={outcome} className="hig-control rounded-full px-3 py-1.5 text-label-m text-on-surface">
                {outcome}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
