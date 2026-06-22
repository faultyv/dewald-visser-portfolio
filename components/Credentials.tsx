import Image from "next/image";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT, SEED_ON, SEED_TEXT } from "@/lib/seed-classes";
import type { CertsData, SiteConfig } from "@/lib/content";

export function Credentials({ certs, site }: { certs: CertsData; site: SiteConfig }) {
  const verifiedCount = certs.featured.filter((cert) => cert.verify).length;

  return (
    <section id="credentials" className="section-pad-tight content-shell-wide relative">
      <div className="section-command mb-8 md:mb-10">
        <div>
          <Reveal>
            <div className="text-label-l text-accent mb-4">Credentials</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">Certified & verified.</h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-[330px] text-body-m text-on-surface-variant">Real, verified credentials — issued and dated by the platforms behind them.</p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="section-proof-strip">
            <span><strong>{certs.featured.length}</strong> featured</span>
            <span><strong>{verifiedCount}</strong> links</span>
            <span><strong>{certs.additional.length}</strong> additional</span>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="snap-hint md:hidden">Swipe credentials</div>
        </Reveal>
      </div>

      <StaggerGroup className="mobile-strip no-scrollbar -mx-5 flex gap-3.5 px-5 pb-3 md:mx-0 md:grid md:grid-cols-2 md:gap-4.5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
        {certs.featured.map((cert) => {
          const inner = (
            <div className="cert-proof-card hig-card group h-full overflow-hidden rounded-[24px]">
              <div className="relative bg-[#f4f5fb]" style={{ aspectRatio: "1.55/1" }}>
                <Image src={cert.image} alt={cert.title} fill className="object-contain p-3" sizes="(max-width:768px) 90vw, 360px" />
                {cert.verify ? (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-surface-container/90 px-2.5 py-1 text-label-s text-on-surface backdrop-blur-sm">
                    <IconSymbol name="verified" size={13} className="text-success" /> Verified link
                  </span>
                ) : null}
              </div>
              <div className="p-4.5">
                <div className="text-title-m text-on-surface">{cert.title}</div>
                <div className={`mt-1 text-label-m ${SEED_TEXT[cert.seed]}`}>{cert.issuer}</div>
                {cert.verify ? (
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-outline-variant px-3 py-1.5 text-label-m text-on-surface-variant">
                    Open credential <IconSymbol name="open_in_new" size={13} />
                  </div>
                ) : null}
              </div>
            </div>
          );
          return (
            <StaggerItem key={cert.id} className="min-w-[82vw] max-w-[82vw] md:min-w-0 md:max-w-none">
              <TiltCard className="h-full">
                {cert.verify ? (
                  <a href={cert.verify} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${cert.title}`} className="block h-full no-underline">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </TiltCard>
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
              Checked proof list
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {certs.additional.map((c) => (
              <div key={c.title} className="hig-control inline-flex items-start gap-1.5 rounded-xl px-3 py-2 text-body-s text-on-surface-variant">
                <IconSymbol name="verified" size={15} className="text-success" />
                <span className="text-on-surface font-medium">{c.title}</span> — {c.issuer}
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
            <span className="font-semibold">{site.education.split(" — ")[0]}</span>{" "}
            <span className="text-on-surface-variant">— {site.education.split(" — ")[1]}</span>
          </div>
          <div className="text-body-m text-on-surface">
            <span className={`mr-2 inline-grid h-8 w-8 place-items-center rounded-xl ${SEED_BG.primary} ${SEED_ON.primary}`}>
              <IconSymbol name="translate" size={18} filled />
            </span>
            <span className="font-semibold">Languages</span> <span className="text-on-surface-variant">— {site.languages.join(" · ")}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
