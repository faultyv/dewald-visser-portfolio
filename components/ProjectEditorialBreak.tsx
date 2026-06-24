import Image from "next/image";
import { IconSymbol } from "./IconSymbol";
import { ProjectCoverVisual } from "./ProjectCoverVisual";
import { SEED_BG, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT, SEED_ON, SEED_TEXT } from "@/lib/seed-classes";
import type { Project } from "@/lib/content";

type ProjectEditorialBreakProps = {
  project: Project;
};

export function ProjectEditorialBreak({ project }: ProjectEditorialBreakProps) {
  const media = project.gallery.filter((item) => item.src).slice(0, 3);
  const hero = media[0];
  const secondary = media.slice(1);
  const runway = project.gallery.filter((item) => item.src).slice(3, 7);
  const responsibilities = project.responsibilities?.slice(0, 5) ?? [];

  if (!hero && !project.cover && !responsibilities.length) return null;

  return (
    <section className="project-editorial-break">
      <div className="project-editorial-head">
        <div>
          <div className={`text-label-l ${SEED_TEXT[project.seed]}`}>Evidence spread</div>
          <h2 className="mt-2 text-headline-s text-on-surface">Let the work breathe between the strategy.</h2>
        </div>
        <p className="m-0 text-body-m text-on-surface-variant">
          A compact read of what shipped: the visual system, the operating proof and the delivery responsibilities in one scannable section.
        </p>
      </div>

      <div className="project-editorial-grid">
        <figure className="project-editorial-hero m-0">
          <div className="project-editorial-media">
            {hero?.src ? (
              <Image
                src={hero.src}
                alt={hero.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 92vw, 760px"
              />
            ) : (
              <ProjectCoverVisual project={project} sizes="(max-width: 768px) 92vw, 760px" />
            )}
            <span className="project-editorial-shade" aria-hidden="true" />
          </div>
          <figcaption>
            <span className={`project-editorial-icon ${SEED_BG[project.seed]} ${SEED_ON[project.seed]}`}>
              <IconSymbol name="photo_camera" size={20} filled />
            </span>
            <span>
              <strong>{hero?.label ?? project.title}</strong>
              <small>{project.label} · {project.period}</small>
            </span>
          </figcaption>
        </figure>

        <aside className="project-editorial-side">
          <div className="project-editorial-outcome">
            <span className={`project-editorial-icon ${SEED_BG[project.seed]} ${SEED_ON[project.seed]}`}>
              <IconSymbol name="target" size={20} filled />
            </span>
            <div>
              <div className="text-label-s text-on-surface-variant">Outcome</div>
              <p>{project.outcome}</p>
            </div>
          </div>

          {responsibilities.length ? (
            <div className="project-editorial-responsibilities">
              <div className="mb-3 text-label-s text-on-surface-variant">What Dewald owned</div>
              {responsibilities.map((item) => (
                <span key={item}>
                  <IconSymbol name="check_circle" size={15} filled className={SEED_TEXT[project.seed]} />
                  {item}
                </span>
              ))}
            </div>
          ) : null}

          <div className="project-editorial-thumbs">
            {secondary.length ? (
              secondary.map((item) => (
                <figure key={item.id} className="m-0">
                  <Image src={item.src!} alt={item.label} fill className="object-cover" sizes="240px" />
                  <figcaption>{item.label}</figcaption>
                </figure>
              ))
            ) : (
              project.metrics.slice(0, 2).map((metric) => (
                <div key={metric.label} className={`project-editorial-metric ${SEED_CONTAINER_BG[project.seed]} ${SEED_CONTAINER_TEXT[project.seed]}`}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      {runway.length ? (
        <div
          className={`project-media-runway ${runway.length === 1 ? "is-solo" : runway.length === 2 ? "is-duo" : ""}`}
          aria-label={`${project.title} visual proof`}
        >
          {runway.map((item, index) => (
            <figure key={item.id} className={`project-media-runway-item m-0 ${index === 0 ? "is-feature" : ""}`}>
              <Image
                src={item.src!}
                alt={item.label}
                fill
                className="object-cover"
                sizes={index === 0 ? "(max-width: 768px) 92vw, 720px" : "(max-width: 768px) 92vw, 380px"}
              />
              <figcaption>
                <span className={`project-editorial-icon ${SEED_BG[project.seed]} ${SEED_ON[project.seed]}`}>
                  <IconSymbol name={index === 0 ? "fullscreen" : "auto_awesome"} size={18} filled />
                </span>
                <span>{item.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  );
}
