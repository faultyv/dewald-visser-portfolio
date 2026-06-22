"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ProjectCoverVisual } from "./ProjectCoverVisual";
import { SEED_BG, COVER_BG } from "@/lib/seed-classes";
import type { SeedName } from "@/lib/m3-theme";
import type { Project } from "@/lib/content";

export function ProjectHeroMedia({
  cover,
  title,
  seed,
  project,
  coverFit = "cover",
  coverPosition,
  coverBg,
}: {
  cover: string | null;
  title: string;
  seed: SeedName;
  project?: Project;
  coverFit?: "cover" | "contain";
  coverPosition?: string;
  coverBg?: "light" | "dark";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !mediaRef.current) return;
    const tween = gsap.to(mediaRef.current, {
      scale: 1.08,
      yPercent: 6,
      ease: "none",
      scrollTrigger: { trigger: wrapRef.current, start: "top top", end: "bottom top", scrub: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-outline-variant bg-surface-container-low elevation-4 md:aspect-[16/7]">
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        {project?.slug === "retail-production-dtp" ? (
          <ProjectCoverVisual project={project} priority sizes="(max-width:768px) 100vw, 1100px" variant="hero" />
        ) : cover ? (
          <>
            {coverFit === "contain" && (
              <div className={`absolute inset-0 ${coverBg ? COVER_BG[coverBg] : `${SEED_BG[seed]} opacity-10`}`} />
            )}
            <Image
              src={cover}
              alt={title}
              fill
              className={coverFit === "contain" ? "object-contain p-12 md:p-20" : "object-cover"}
              style={coverPosition && coverFit !== "contain" ? { objectPosition: coverPosition } : undefined}
              sizes="(max-width:768px) 100vw, 1100px"
              priority
            />
          </>
        ) : (
          <div className={`absolute inset-0 ${SEED_BG[seed]} opacity-20`} />
        )}
      </div>
    </div>
  );
}
