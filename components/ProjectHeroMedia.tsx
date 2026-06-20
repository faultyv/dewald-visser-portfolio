"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { SEED_BG } from "@/lib/seed-classes";
import type { SeedName } from "@/lib/m3-theme";

export function ProjectHeroMedia({ cover, title, seed }: { cover: string | null; title: string; seed: SeedName }) {
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
    <div ref={wrapRef} className="relative overflow-hidden rounded-2xl elevation-4" style={{ aspectRatio: "16/7" }}>
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        {cover ? (
          <Image src={cover} alt={title} fill className="object-cover" sizes="(max-width:768px) 100vw, 1100px" priority />
        ) : (
          <div className={`absolute inset-0 ${SEED_BG[seed]} opacity-20`} />
        )}
      </div>
    </div>
  );
}
