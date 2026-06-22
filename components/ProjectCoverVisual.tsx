import Image from "next/image";
import { IconSymbol } from "./IconSymbol";
import { COVER_BG, SEED_BG, SEED_ON } from "@/lib/seed-classes";
import type { Project } from "@/lib/content";

type ProjectCoverVisualProps = {
  project: Project;
  priority?: boolean;
  sizes: string;
};

function containBackdrop(project: Project): string {
  if (project.coverFit !== "contain") return "absolute inset-0";
  if (project.coverBg) return `absolute inset-0 ${COVER_BG[project.coverBg]}`;
  return `absolute inset-0 ${SEED_BG[project.seed]} opacity-10`;
}

function RetailProductionCover() {
  const proof = [
    { icon: "view_in_ar", label: "POS" },
    { icon: "print", label: "DTP" },
    { icon: "select_all", label: "Nesting" },
    { icon: "verified", label: "Repro" },
  ];

  return (
    <div className="project-cover-board absolute inset-0">
      <div className="project-cover-registration project-cover-registration-a" />
      <div className="project-cover-registration project-cover-registration-b" />
      <div className="relative z-[1] flex h-full flex-col justify-between p-5 md:p-6">
        <div className="flex items-start justify-end gap-3">
          <div className="project-cover-chip">
            <IconSymbol name="inventory_2" size={17} filled />
            Production proof
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-tertiary text-on-tertiary elevation-1">
            <IconSymbol name="palette" size={21} filled />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="max-w-[330px] text-headline-s text-on-surface">Retail artwork, schemed for press.</div>
          <div className="grid grid-cols-2 gap-2.5">
            {proof.map((item) => (
              <div key={item.label} className="project-cover-proof">
                <IconSymbol name={item.icon} size={16} filled />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-label-s text-on-surface-variant">
          <span className="h-2 w-2 rounded-full bg-tertiary" />
          Mediatrade · House-brand production
        </div>
      </div>
    </div>
  );
}

export function ProjectCoverVisual({ project, priority, sizes }: ProjectCoverVisualProps) {
  if (project.slug === "retail-production-dtp") return <RetailProductionCover />;

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
