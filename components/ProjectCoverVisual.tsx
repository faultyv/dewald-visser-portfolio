import Image from "next/image";
import { IconSymbol } from "./IconSymbol";
import { COVER_BG, SEED_BG, SEED_ON } from "@/lib/seed-classes";
import type { Project } from "@/lib/content";

type ProjectCoverVisualProps = {
  project: Project;
  priority?: boolean;
  sizes: string;
  variant?: "card" | "hero";
};

function containBackdrop(project: Project): string {
  if (project.coverFit !== "contain") return "absolute inset-0";
  if (project.coverBg) return `absolute inset-0 ${COVER_BG[project.coverBg]}`;
  return `absolute inset-0 ${SEED_BG[project.seed]} opacity-10`;
}

function RetailProductionCover({ project, variant = "card" }: { project: Project; variant?: "card" | "hero" }) {
  const isHero = variant === "hero";
  const proof = [
    { icon: "view_in_ar", label: "POS" },
    { icon: "print", label: "DTP" },
    { icon: "select_all", label: "Nesting" },
    { icon: "verified", label: "Repro" },
  ];
  const brands = project.brands?.slice(0, 6) ?? [];

  return (
    <div className="project-cover-board absolute inset-0">
      <div className="project-cover-registration project-cover-registration-a" />
      <div className="project-cover-registration project-cover-registration-b" />
      <div className={`relative z-[1] flex h-full flex-col justify-between p-5 md:p-6 ${isHero ? "md:p-8 lg:p-9" : ""}`}>
        <div className="flex items-start justify-end gap-3">
          <div className="project-cover-chip">
            <IconSymbol name="inventory_2" size={17} filled />
            Production proof
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-tertiary text-on-tertiary elevation-1">
            <IconSymbol name="palette" size={21} filled />
          </div>
        </div>

        <div className={`grid gap-3 ${isHero ? "md:grid-cols-[0.72fr_1.28fr] md:items-end md:gap-7" : ""}`}>
          <div>
            <div className={`${isHero ? "max-w-[380px] text-headline-m" : "max-w-[330px] text-headline-s"} text-on-surface`}>
              Retail artwork, schemed for press.
            </div>
            {isHero ? (
              <div className="mt-3 max-w-[430px] text-body-m text-on-surface-variant">
                Point-of-sale, blister-card artworking and print-ready repro systems for high-volume retail production.
              </div>
            ) : null}
          </div>
          <div className={`grid grid-cols-2 gap-2.5 ${isHero ? "md:gap-3" : ""}`}>
            {proof.map((item) => (
              <div key={item.label} className={`project-cover-proof ${isHero ? "md:min-h-[54px] md:px-4" : ""}`}>
                <IconSymbol name={item.icon} size={16} filled />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-label-s text-on-surface-variant">
          <span className="mr-1 h-2 w-2 rounded-full bg-tertiary" />
          <span>Mediatrade · House-brand production</span>
          {isHero && brands.length ? (
            <>
              <span className="mx-1 hidden opacity-50 md:inline">·</span>
              {brands.map((brand) => (
                <span key={brand} className="rounded-full border border-outline-variant bg-surface-container/70 px-2 py-0.5 text-on-surface">
                  {brand}
                </span>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ProjectCoverVisual({ project, priority, sizes, variant = "card" }: ProjectCoverVisualProps) {
  if (project.slug === "retail-production-dtp") return <RetailProductionCover project={project} variant={variant} />;

  if (project.cover) {
    return (
      <div className={containBackdrop(project)}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          priority={priority}
          className={`transition-transform duration-500 group-hover:scale-105 ${
            project.coverFit === "contain" ? "object-contain p-8 md:p-10" : "object-cover"
          }`}
          style={project.coverPosition && project.coverFit !== "contain" ? { objectPosition: project.coverPosition } : undefined}
          sizes={sizes}
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 grid place-items-center ${SEED_BG[project.seed]} ${SEED_ON[project.seed]}`}>
      <IconSymbol name="work" size={42} filled className="opacity-70" />
    </div>
  );
}
