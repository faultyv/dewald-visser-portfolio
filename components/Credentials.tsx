import Image from "next/image";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { IconSymbol } from "./IconSymbol";
import { SEED_TEXT } from "@/lib/seed-classes";
import type { CertsData, SiteConfig } from "@/lib/content";

export function Credentials({ certs, site }: { certs: CertsData; site: SiteConfig }) {
  return (
    <section id="credentials" className="section-pad content-shell relative">
      <div className="flex justify-between items-end flex-wrap gap-6 mb-10">
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
      </div>

      <StaggerGroup className="mobile-strip no-scrollbar -mx-5 flex gap-3.5 px-5 pb-3 md:mx-0 md:grid md:grid-cols-2 md:gap-4.5 md:overflow-visible md:px-0 md:pb-0">
        {certs.featured.map((cert) => (
          <StaggerItem key={cert.id} className="min-w-[82vw] max-w-[82vw] md:min-w-0 md:max-w-none">
            <TiltCard>
              <div className="relative overflow-hidden rounded-xl border border-outline bg-surface-container elevation-2">
                <div className="relative bg-surface-container-high" style={{ aspectRatio: "1.4/1" }}>
                  <Image src={cert.image} alt={cert.title} fill className="object-cover" sizes="(max-width:768px) 90vw, 360px" />
                </div>
                <div className="p-4.5">
                  <div className="text-title-m text-on-surface">{cert.title}</div>
                  <div className={`text-label-m mt-1 ${SEED_TEXT[cert.seed]}`}>{cert.issuer}</div>
                </div>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal delay={0.15}>
        <div className="mt-9 pt-7 border-t border-outline-variant">
          <div className="text-label-m text-on-surface-variant mb-3">Additional certifications</div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {certs.additional.map((c) => (
              <div key={c.title} className="inline-flex items-start gap-1.5 rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-body-s text-on-surface-variant">
                <IconSymbol name="verified" size={15} className="text-success" />
                <span className="text-on-surface font-medium">{c.title}</span> — {c.issuer}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-7 flex flex-wrap gap-x-10 gap-y-3.5 pt-6 border-t border-outline-variant">
          <div className="text-label-m text-on-surface-variant w-full">Education & Languages</div>
          <div className="text-body-m text-on-surface">
            <span className="font-semibold">{site.education.split(" — ")[0]}</span>{" "}
            <span className="text-on-surface-variant">— {site.education.split(" — ")[1]}</span>
          </div>
          <div className="text-body-m text-on-surface">
            <span className="font-semibold">Languages</span> <span className="text-on-surface-variant">— {site.languages.join(" · ")}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
