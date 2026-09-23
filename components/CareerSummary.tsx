import type { CVEntry } from "@/lib/content";
import { ButtonLink } from "./Button";
import { IconSymbol } from "./IconSymbol";
import { SEED_CONTAINER_BG, SEED_CONTAINER_TEXT } from "@/lib/seed-classes";

export function CareerRows({ entries, compact = false }: { entries: CVEntry[]; compact?: boolean }) {
  return <div className="cv-summary-rows">
    {entries.map((entry) => <article className="cv-summary-row" key={`${entry.org}-${entry.date}`}>
      <div className="cv-summary-date text-label-l text-on-surface-variant">{entry.date}</div>
      <div className="cv-summary-role">
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className={`cv-brand-mark ${SEED_CONTAINER_BG[entry.brandColor ?? "primary"]} ${SEED_CONTAINER_TEXT[entry.brandColor ?? "primary"]}`}>{entry.brandMark}</span>
          <div><h3 className="text-title-l text-on-surface">{entry.role}</h3><p className="mt-1 text-body-m text-primary">{entry.org}</p></div>
        </div>
        <p className="mt-3 text-body-m text-on-surface-variant">{entry.proof?.[0]?.detail ?? entry.detail}</p>
        {!compact && <details className="cv-role-details mt-3">
          <summary className="text-label-l text-primary">Role details &amp; tools</summary>
          <p className="mt-3 text-body-m text-on-surface-variant">{entry.detail}</p>
          {entry.software?.length ? <p className="mt-3 text-body-s text-on-surface-variant"><strong>Tools:</strong> {entry.software.join(" · ")}</p> : null}
        </details>}
      </div>
    </article>)}
  </div>;
}

export function CareerSummary({ cv }: { cv: CVEntry[] }) {
  return <section id="cv" className="section-pad-tight content-shell-wide relative" aria-labelledby="career-heading">
    <div className="section-command mb-7 md:mb-9">
      <div><div className="text-label-l text-primary mb-4">Career</div><h2 id="career-heading" className="text-headline-l text-on-surface">Experience, <span className="text-gradient text-gradient-animated">at a glance.</span></h2><p className="mt-4 text-body-m text-on-surface-variant">Recent experience, followed by my earlier career.</p></div>
      <ButtonLink href="/cv" variant="tonal"><IconSymbol name="description" size={18} /> View / print CV</ButtonLink>
    </div>
    <div className="hig-glass rounded-[28px] p-5 md:p-8">
      <CareerRows entries={cv.slice(0, 5)} />
      <details className="cv-earlier border-t border-outline-variant pt-5">
        <summary className="text-title-m text-on-surface">Earlier experience <span className="ml-2 text-body-s text-on-surface-variant">{cv.length - 5} roles</span></summary>
        <CareerRows entries={cv.slice(5)} />
      </details>
    </div>
  </section>;
}
