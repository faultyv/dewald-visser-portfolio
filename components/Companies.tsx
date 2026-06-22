import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { SocialIcon } from "./SocialIcon";
import { SEED_BG, SEED_ON, SEED_TEXT } from "@/lib/seed-classes";
import type { CompanyEntry } from "@/lib/content";

export function Companies({ companies }: { companies: CompanyEntry[] }) {
  const linkLabelFor = (url?: string) => {
    if (!url) return "Archive";
    if (url.includes("instagram.com") || url.includes("facebook.com")) return "Profile";
    return "Website";
  };

  return (
    <section id="companies" className="surface-band section-pad-tight relative">
      <div className="content-shell-wide">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <div className="text-label-l text-success mb-3.5">Companies & collaborators</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline-l text-on-surface">The brand map.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[430px] text-body-m text-on-surface-variant">
              The companies, ventures and clients behind the timeline — retail production, faith-based education, e-commerce, financial services and my own ventures across brand, web and growth.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="snap-hint mt-1 sm:hidden">Swipe brand map</div>
          </Reveal>
        </div>

        <StaggerGroup className="no-scrollbar -mx-5 grid auto-cols-[152px] grid-flow-col grid-rows-2 gap-2.5 overflow-x-auto px-5 pb-3 [scroll-padding-inline:20px] [scroll-snap-type:x_mandatory] sm:mx-0 sm:grid-flow-row sm:grid-rows-none sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 sm:[scroll-snap-type:none] lg:grid-cols-5 lg:gap-3">
          {companies.map((company) => (
            <StaggerItem key={company.name} className="snap-start">
              <TiltCard className="h-full">
                <article className="hig-card relative flex min-h-[162px] flex-col gap-3 rounded-[22px] p-3.5 text-on-surface md:min-h-[190px] md:gap-4 md:p-4.5">
                  <div className={`absolute -right-9 -top-9 h-28 w-28 rounded-full opacity-15 ${SEED_BG[company.seed]}`} />

                  {/* Stretched link: makes the whole card open the primary destination, while social icons stay separately clickable above it. */}
                  {company.url ? (
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${company.name} ${linkLabelFor(company.url).toLowerCase()}`}
                      className="absolute inset-0 z-20 rounded-[22px]"
                    />
                  ) : null}

                  <div className="relative z-30 flex items-start justify-between gap-3">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl ${SEED_BG[company.seed]} ${SEED_ON[company.seed]} text-label-l elevation-1 md:h-14 md:w-14 pointer-events-none`} style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
                      {company.mark}
                    </span>
                    <div className="flex items-center gap-1.5 pt-1">
                      {company.socials?.map((s) => (
                        <a
                          key={s.url}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${company.name} on ${s.kind}`}
                          className="state-layer grid h-7 w-7 place-items-center rounded-full text-on-surface-variant transition-colors hover:text-on-surface"
                        >
                          <SocialIcon kind={s.kind} size={15} />
                        </a>
                      ))}
                      <span className={`text-label-s pointer-events-none ${company.url ? SEED_TEXT[company.seed] : "text-on-surface-variant"}`}>{linkLabelFor(company.url)}</span>
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto pointer-events-none">
                    <h3 className="m-0 mb-1.5 text-title-s text-on-surface md:text-title-m">{company.name}</h3>
                    <div className={`mb-1.5 text-label-s ${SEED_TEXT[company.seed]}`}>{[company.period, company.relationship].filter(Boolean).join(" · ")}</div>
                    <p className="m-0 overflow-hidden text-body-s text-on-surface-variant [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">{company.discipline}</p>
                  </div>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
