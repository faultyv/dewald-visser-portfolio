import Image from "next/image";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT, SEED_ON, SEED_TEXT } from "@/lib/seed-classes";
import type { CertsData, SiteConfig } from "@/lib/content";

export function Credentials({ certs, site }: { certs: CertsData; site: SiteConfig }) {
  const verifiedCount = certs.featured.filter((cert) => cert.verify).length;
  const trustSignals = [
    { label: "Verified links", value: `${verifiedCount}/${certs.featured.length}` },
    { label: "Issued record", value: "Canva · Saylor · HP LIFE · Coursera · Google · HubSpot · Cursa" },
    { label: "Extra proof", value: `${certs.additional.length} additional certificates` },
  ];

  return (
    <section id="credentials" className="section-pad-tight content-shell-wide relative">
      <div className="section-command mb-8 md:mb-10">
        <div>
          <Reveal>
            <div className="text-label-l text-accent mb-4">Credentials</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">Certified & <span className="text-gradient text-gradient-animated">verified.</span></h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-[330px] text-body-m text-on-surface-variant">Course certificates and learning records - <span className="text-mark">issued and dated</span> by the platforms behind them.</p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="section-proof-strip">
            <span><strong>{certs.featured.length}</strong> featured</span>
            <span><strong>{verifiedCount}</strong> links</span>
            <span><strong>{certs.additional.length}</strong> additional</span>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.16}>
        <div className="credential-trust-strip mb-7">
          {trustSignals.map((signal) => (
            <div key={signal.label}>
              <span>{signal.label}</span>
              <strong>{signal.value}</strong>
            </div>
          ))}
        </div>
      </Reveal>

      <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {certs.featured.map((cert) => {
          const [issuerName, ...issuerDetails] = cert.issuer.split(" · ");
          const issuerDate = issuerDetails.join(" · ");
          const inner = (
            <div className="cert-card cert-proof-card hig-card group relative flex h-full flex-col overflow-hidden rounded-[24px]">
              <span className={`cert-accent ${SEED_BG[cert.seed]}`} aria-hidden="true" />
              <div className="relative bg-[#f4f5fb]" style={{ aspectRatio: "1.6/1" }}>
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-contain p-2"
                  quality={90}
                  sizes="(max-width:768px) 90vw, 360px"
                />
                {cert.verify ? (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-surface-container/90 px-2.5 py-1 text-label-s text-on-surface backdrop-blur-sm">
                    <IconSymbol name="verified" size={13} className="text-success" /> Verified link
                  </span>
                ) : null}
              </div>
              <div className="relative flex flex-1 flex-col p-4.5 md:p-5">
                <span className={`cert-seal ${SEED_BG[cert.seed]} ${SEED_ON[cert.seed]}`} aria-hidden="true">
                  <IconSymbol name="workspace_premium" size={20} filled />
                </span>
                <div className={`text-label-s font-semibold ${SEED_TEXT[cert.seed]}`}>{issuerName}</div>
                <div className="mt-1 text-title-m text-on-surface">{cert.title}</div>
                {issuerDate ? <div className="mt-1 text-label-s text-on-surface-variant">{issuerDate}</div> : null}
                <div className="mt-auto pt-4">
                  {cert.verify ? (
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-label-m transition-transform group-hover:translate-x-0.5 ${SEED_CONTAINER_BG[cert.seed]} ${SEED_CONTAINER_TEXT[cert.seed]}`}>
                      Verify credential <IconSymbol name="open_in_new" size={14} />
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant px-3.5 py-2 text-label-m text-on-surface-variant">
                      <IconSymbol name="task_alt" size={14} className="text-success" /> View certificate
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
          return (
            <StaggerItem key={cert.id} className="flex min-w-0 flex-col">
              <TiltCard className="flex-1">
                {cert.verify || cert.document || cert.image ? (
                  <a href={cert.verify ?? cert.document ?? cert.image} target="_blank" rel="noopener noreferrer" aria-label={`${cert.verify ? "Verify" : "View"} ${cert.title}`} className="block h-full no-underline">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </TiltCard>
              {cert.document ? <div className="mt-3 flex flex-wrap gap-3"><a href={cert.document} target="_blank" rel="noopener noreferrer" aria-label={`View ${cert.title} PDF`} className="inline-flex items-center gap-1 rounded-full border border-outline-variant px-4 py-2 text-label-m text-primary">View PDF <IconSymbol name="open_in_new" size={14} /></a><a href={cert.document} download aria-label={`Download ${cert.title} PDF`} className="inline-flex items-center rounded-full border border-outline-variant px-4 py-2 text-label-m text-primary">Download PDF ↓</a></div> : null}
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <Reveal delay={0.15}>
        <div className="cert-additional-panel mt-9 rounded-[26px] border border-outline-variant bg-surface-container-low p-4 md:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-label-m text-on-surface-variant">Additional certifications</div>
            <div className="inline-flex items-center gap-2 text-label-m text-success">
              <IconSymbol name="verified" size={16} filled />
              Credential record
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {certs.additional.map((c) => (
              <div key={c.title} className="hig-control inline-flex items-start gap-1.5 rounded-xl px-3 py-2 text-body-s text-on-surface-variant">
                <IconSymbol name="verified" size={15} className="text-success" />
                <span><span className="text-on-surface font-medium">{c.title}</span> - {c.issuer}{c.document ? <a href={c.document} target="_blank" rel="noopener noreferrer" className="mt-1 block text-primary">View certificate PDF</a> : null}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-5 grid gap-3 rounded-[22px] border border-outline-variant bg-surface-container-low p-4 md:grid-cols-2 md:p-5">
          <div className="text-label-m text-on-surface-variant md:col-span-2">Education & Languages</div>
          <div className="text-body-m text-on-surface">
            <span className={`mr-2 inline-grid h-8 w-8 place-items-center rounded-xl ${SEED_CONTAINER_BG.success} ${SEED_CONTAINER_TEXT.success}`}>
              <IconSymbol name="school" size={18} filled />
            </span>
            <span className="font-semibold">{site.education.split(" - ")[0]}</span>{" "}
            <span className="text-on-surface-variant">- {site.education.split(" - ")[1]}</span>
          </div>
          <div className="text-body-m text-on-surface">
            <span className={`mr-2 inline-grid h-8 w-8 place-items-center rounded-xl ${SEED_BG.primary} ${SEED_ON.primary}`}>
              <IconSymbol name="translate" size={18} filled />
            </span>
            <span className="font-semibold">Languages</span> <span className="text-on-surface-variant">- {site.languages.join(" · ")}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
