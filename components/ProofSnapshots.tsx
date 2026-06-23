import Image from "next/image";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { IconSymbol } from "./IconSymbol";
import type { SiteConfig } from "@/lib/content";

export function ProofSnapshots({ site }: { site: SiteConfig }) {
  const images = site.media.proofImages ?? [];
  if (!images.length) return null;

  return (
    <section className="content-shell-wide relative py-8 md:py-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
        <div>
          <Reveal>
            <div className="mb-3 text-label-l text-primary">Seen in the work</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-[760px] text-headline-m text-on-surface">
              The same person across brief, build and delivery.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="m-0 max-w-[420px] text-body-m text-on-surface-variant">
            A portfolio should show the work, but also the way it gets made: collaborative, practical and close to the business problem.
          </p>
        </Reveal>
      </div>

      <StaggerGroup className="mobile-strip no-scrollbar -mx-5 flex gap-3.5 px-5 pb-3 md:mx-0 md:grid md:grid-cols-3 md:gap-4.5 md:overflow-visible md:px-0 md:pb-0">
        {images.map((image, index) => (
          <StaggerItem key={image.src} className="min-w-[78vw] max-w-[78vw] md:min-w-0 md:max-w-none">
            <figure className="hig-card group m-0 overflow-hidden rounded-[24px]">
              <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-high">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 82vw, 380px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={image.focus ? { objectPosition: image.focus } : undefined}
                />
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-surface-container/86 px-3 py-1.5 text-label-m text-on-surface backdrop-blur-xl">
                  <IconSymbol name={index === 0 ? "terminal" : index === 1 ? "groups" : "task_alt"} size={15} filled />
                  {image.label}
                </span>
                <figcaption className="absolute inset-x-4 bottom-4 text-title-s text-white">
                  {image.caption}
                </figcaption>
              </div>
            </figure>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
