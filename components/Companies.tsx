import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { SEED_BG, SEED_ON, SEED_TEXT } from "@/lib/seed-classes";
import type { CompanyEntry } from "@/lib/content";

export function Companies({ companies }: { companies: CompanyEntry[] }) {
  return (
    <section id="companies" className="relative px-5 md:px-14" style={{ paddingBlock: "clamp(55px,8vh,120px)" }}>
      <div className="max-w-[1340px] mx-auto rounded-[34px] border border-outline-variant bg-surface-container-low elevation-1 p-6 md:p-12">
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

        <StaggerGroup className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,210px),1fr))" }}>
          {companies.map((company) => {
            const card = (
              <article className="relative flex min-h-[190px] flex-col gap-4 overflow-hidden rounded-xl border border-outline bg-surface-container elevation-2 p-4.5 text-on-surface">
                <div className={`absolute -right-9 -top-9 h-28 w-28 rounded-full opacity-15 ${SEED_BG[company.seed]}`} />
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl ${SEED_BG[company.seed]} ${SEED_ON[company.seed]} elevation-1 text-label-l`} style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
                    {company.mark}
                  </span>
                  <span className={`pt-1 text-label-s ${company.url ? SEED_TEXT[company.seed] : "text-on-surface-variant"}`}>{company.url ? "Website" : "Archive"}</span>
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="m-0 mb-1.5 text-title-m text-on-surface">{company.name}</h3>
                  <div className={`mb-1.5 text-label-s ${SEED_TEXT[company.seed]}`}>{[company.period, company.relationship].filter(Boolean).join(" · ")}</div>
                  <p className="m-0 text-body-s text-on-surface-variant">{company.discipline}</p>
                </div>
              </article>
            );

            return (
              <StaggerItem key={company.name}>
                <TiltCard className="h-full">
                  {company.url ? (
                    <a href={company.url} target="_blank" rel="noopener noreferrer" className="block h-full no-underline">
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
