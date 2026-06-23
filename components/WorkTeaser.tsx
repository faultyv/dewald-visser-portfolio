import Link from "next/link";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { ButtonLink } from "./Button";
import { IconSymbol } from "./IconSymbol";
import { ProjectCoverVisual } from "./ProjectCoverVisual";
import { SEED_BG, SEED_ON } from "@/lib/seed-classes";
import type { Project } from "@/lib/content";

const FEATURED_META = ["Signature build", "Live learning system", "Production proof"];

export function WorkTeaser({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 3);
  const categoryCount = new Set(projects.flatMap((project) => project.categories)).size;

  return (
    <section id="work" className="section-pad-tight content-shell-wide relative">
      <div className="section-command mb-7 md:mb-9">
        <div>
          <Reveal>
            <div className="text-label-l text-success mb-4">Selected Work</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">Proof, not portfolio filler.</h2>
          </Reveal>
        </div>
        <Reveal delay={0.08}>
          <div className="section-proof-strip">
            <span><strong>{projects.length}</strong> projects</span>
            <span><strong>{categoryCount}</strong> disciplines</span>
            <span><strong>3</strong> featured</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ButtonLink href="/work" variant="tonal" magnetic>
            See all work <IconSymbol name="arrow_forward" size={18} />
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="snap-hint md:hidden">Swipe work</div>
        </Reveal>
      </div>

      <StaggerGroup className="work-showcase-grid mobile-strip no-scrollbar -mx-5 flex gap-3.5 px-5 pb-3 md:mx-0 md:grid md:grid-cols-2 md:gap-4.5 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3">
        {featured.map((project, index) => (
          <StaggerItem key={project.slug} className="min-w-[82vw] max-w-[82vw] md:min-w-0 md:max-w-none">
            <TiltCard>
              <Link href={`/work/${project.slug}`} className="block no-underline group">
                <div className="work-proof-card hig-card overflow-hidden rounded-[24px]">
                  <div className="relative" style={{ aspectRatio: "4/3" }}>
                    <ProjectCoverVisual project={project} sizes="(max-width:768px) 90vw, 420px" />
                    <span className={`absolute top-3.5 left-3.5 z-[2] text-label-m px-3 py-1.5 rounded-full ${SEED_BG[project.seed]} ${SEED_ON[project.seed]}`}>
                      {project.label}
                    </span>
                    <span className="work-proof-number">0{index + 1}</span>
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3 text-label-s text-on-surface-variant">
                      <span>{FEATURED_META[index] ?? "Proof route"}</span>
                      <span>{project.period}</span>
                    </div>
                    <div className="text-title-l text-on-surface">{project.title}</div>
                    <div className="text-label-m text-on-surface-variant mt-1.5 mb-2.5">
                      {project.org} · {project.tools}
                    </div>
                    <p className="m-0 text-body-s text-on-surface-variant">{project.outcome}</p>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-outline-variant pt-4">
                      <span className="text-label-m text-on-surface-variant">{project.categories.join(" / ")}</span>
                      <span className="inline-flex items-center gap-1.5 text-label-l text-primary">
                        Dive in
                        <IconSymbol name="arrow_forward" size={16} className="transition-transform group-hover:translate-x-1" />
                      </span>
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
