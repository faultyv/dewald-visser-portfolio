import Image from "next/image";
import Link from "next/link";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { ButtonLink } from "./Button";
import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_ON } from "@/lib/seed-classes";
import type { Project } from "@/lib/content";

export function WorkTeaser({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 3);

  return (
    <section id="work" className="relative px-5 md:px-14 max-w-[1300px] mx-auto" style={{ paddingBlock: "clamp(70px,11vh,150px)" }}>
      <div className="flex justify-between items-end flex-wrap gap-6 mb-9">
        <div>
          <Reveal>
            <div className="text-label-l text-success mb-4">Selected Work</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">Proof, by discipline.</h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <ButtonLink href="/work" variant="tonal" magnetic>
            See all work <IconSymbol name="arrow_forward" size={18} />
          </ButtonLink>
        </Reveal>
      </div>

      <StaggerGroup className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))" }}>
        {featured.map((project) => (
          <StaggerItem key={project.slug}>
            <TiltCard>
              <Link href={`/work/${project.slug}`} className="block no-underline group">
                <div className="relative overflow-hidden rounded-xl border border-outline bg-surface-container elevation-2">
                  <div className="relative" style={{ aspectRatio: "4/3" }}>
                    {project.cover ? (
                      <Image src={project.cover} alt={project.title} fill className="object-cover" sizes="(max-width:768px) 90vw, 420px" />
                    ) : (
                      <div className={`absolute inset-0 ${SEED_BG[project.seed]} opacity-20`} />
                    )}
                    <span className={`absolute top-3.5 left-3.5 z-[2] text-label-m px-3 py-1.5 rounded-full ${SEED_BG[project.seed]} ${SEED_ON[project.seed]}`}>
                      {project.label}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="text-title-l text-on-surface">{project.title}</div>
                    <div className="text-label-m text-on-surface-variant mt-1.5 mb-2.5">
                      {project.org} · {project.tools}
                    </div>
                    <p className="m-0 text-body-s text-on-surface-variant">{project.outcome}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-label-l text-primary">
                      Dive in
                      <IconSymbol name="arrow_forward" size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
