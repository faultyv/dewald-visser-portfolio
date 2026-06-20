import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { SEED_BG, SEED_ON, SEED_TEXT } from "@/lib/seed-classes";
import type { CompanyEntry } from "@/lib/content";

export function Companies({ companies }: { companies: CompanyEntry[] }) {
  return (
    <section id="companies" className="surface-band section-pad-tight relative">
      <div className="content-shell-wide">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <div className="text-label-l text-success mb-3.5">Companies & collaborators</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline-l text-on-surface">Where the work has lived.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[430px] text-body-m text-on-surface-variant">
              A linked brand map of companies, ventures and organisations connected to the career timeline. Logos are intentionally flattened into the site system so they support the design rather than fight it.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="no-scrollbar -mx-5 grid auto-cols-[152px] grid-flow-col grid-rows-2 gap-2.5 overflow-x-auto px-5 pb-3 [scroll-padding-inline:20px] [scroll-snap-type:x_mandatory] sm:mx-0 sm:grid-flow-row sm:grid-rows-none sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 sm:[scroll-snap-type:none] lg:grid-cols-5 lg:gap-3">
          {companies.map((company) => {
            const card = (
              <article className="relative flex min-h-[162px] flex-col gap-3 overflow-hidden rounded-xl border border-outline bg-surface-container p-3.5 text-on-surface elevation-2 md:min-h-[190px] md:gap-4 md:p-4.5">
                <div className={`absolute -right-9 -top-9 h-28 w-28 rounded-full opacity-15 ${SEED_BG[company.seed]}`} />
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${SEED_BG[company.seed]} ${SEED_ON[company.seed]} text-label-l elevation-1 md:h-14 md:w-14`} style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
                    {company.mark}
                  </span>
                  <span className={`pt-1 text-label-s ${company.url ? SEED_TEXT[company.seed] : "text-on-surface-variant"}`}>{company.url ? "Website" : "Archive"}</span>
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="m-0 mb-1.5 text-title-s text-on-surface md:text-title-m">{company.name}</h3>
                  <div className={`mb-1.5 text-label-s ${SEED_TEXT[company.seed]}`}>{[company.period, company.relationship].filter(Boolean).join(" · ")}</div>
                  <p className="m-0 overflow-hidden text-body-s text-on-surface-variant [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">{company.discipline}</p>
                </div>
              </article>
            );

            return (
              <StaggerItem key={company.name} className="snap-start">
                <TiltCard className="h-full">
                  {company.url ? (
                    <a href={company.url} target="_blank" rel="noopener noreferrer" className="block h-full no-underline" aria-label={`Open ${company.name} website`}>
                      {card}
                    </a>
                  ) : (
                    card
                  )}
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
