"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { TiltCard } from "./TiltCard";
import { IconSymbol } from "./IconSymbol";
import { ProjectCoverVisual } from "./ProjectCoverVisual";
import { SEED_BG, SEED_ON } from "@/lib/seed-classes";
import { fmTransition } from "@/lib/motion-tokens";
import type { Project } from "@/lib/content";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "marketing", label: "Marketing" },
  { id: "web", label: "Web" },
  { id: "brand", label: "Brand" },
] as const;

function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <motion.div layout transition={fmTransition.standard}>
      <TiltCard>
        <Link href={`/work/${project.slug}`} className="block no-underline group">
          <div className="hig-card overflow-hidden rounded-[24px]">
            <div className="relative" style={{ aspectRatio: large ? "16/9" : "4/3" }}>
              <ProjectCoverVisual
                project={project}
                priority={large}
                sizes={large ? "(max-width:768px) 95vw, 800px" : "(max-width:768px) 90vw, 420px"}
              />
              <span className={`absolute top-4 left-4 z-[2] text-label-m px-3 py-1.5 rounded-full ${SEED_BG[project.seed]} ${SEED_ON[project.seed]}`}>
                {project.label}
              </span>
            </div>
            <div className="p-5 md:p-6">
              <div className={large ? "text-headline-s text-on-surface" : "text-title-l text-on-surface"}>{project.title}</div>
              <div className="text-label-m text-on-surface-variant mt-1.5 mb-2.5">
                {project.org} · {project.tools}
              </div>
              <p className="m-0 text-body-m text-on-surface-variant max-w-[520px]">{project.outcome}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-label-l text-primary">
                Dive in
                <IconSymbol name="arrow_forward" size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("all");
  const counts = useMemo<Record<string, number>>(() => {
    const next: Record<string, number> = { all: projects.length };
    FILTERS.slice(1).forEach((f) => {
      next[f.id] = projects.filter((p) => p.categories.includes(f.id)).length;
    });
    return next;
  }, [projects]);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.categories.includes(filter));
  }, [projects, filter]);

  return (
    <div>
      <div className="flex gap-2.5 flex-wrap mb-10">
        {FILTERS.map((f) => {
          const active = f.id === filter;
          return (
            <motion.button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={active}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 440, damping: 18 }}
              className={`hig-control state-layer cursor-pointer rounded-full px-4.5 py-2.5 text-label-l transition-colors ${
                active ? "border-primary bg-primary text-on-primary" : "border-outline text-on-surface-variant"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {f.label}
                <span className="rounded-full border border-current/25 px-1.5 py-0.5 text-label-s leading-none opacity-80">{counts[f.id]}</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))" }}>
        {filtered.map((project, i) => (
          <div key={project.slug} className={i === 0 ? "md:col-span-2" : ""}>
            <ProjectCard project={project} large={i === 0} />
          </div>
        ))}
      </motion.div>

      {filtered.length === 0 && <p className="text-body-l text-on-surface-variant">No projects in this category yet.</p>}
    </div>
  );
}
