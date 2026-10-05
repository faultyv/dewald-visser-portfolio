"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { fmTransition } from "@/lib/motion-tokens";
import { scrollToSection, sectionScrollOffset } from "@/lib/section-navigation";

export function ProjectMiniNav({ hasGallery, hasProof, hasDocuments, hasVideos }: { hasGallery: boolean; hasProof?: boolean; hasDocuments?: boolean; hasVideos?: boolean }) {
  const items = [
    { id: "overview", label: "Overview" },
    ...(hasDocuments ? [{ id: "documents", label: "PDFs" }] : []),
    ...(hasProof ? [{ id: "proof-media", label: "Media proof" }] : []),
    ...(hasVideos ? [{ id: "video-portfolio", label: "Videos" }] : []),
    ...(hasGallery ? [{ id: "gallery", label: "Gallery" }] : []),
    { id: "stack", label: "Stack" },
  ];
  const [active, setActive] = useState(items[0].id);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const container = nav?.parentElement;
    if (!nav || !container) return;
    const measure = () => container.style.setProperty("--project-nav-height", `${nav.offsetHeight}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    return () => {
      observer.disconnect();
      container.style.removeProperty("--project-nav-height");
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const selected = nav?.querySelector<HTMLElement>("[aria-current]");
    if (nav && selected) nav.scrollTo({ left: Math.max(0, selected.offsetLeft - (nav.clientWidth - selected.offsetWidth) / 2), behavior: "instant" });
  }, [active]);

  useEffect(() => {
    const ids = ["overview", ...(hasDocuments ? ["documents"] : []), ...(hasProof ? ["proof-media"] : []), ...(hasVideos ? ["video-portfolio"] : []), ...(hasGallery ? ["gallery"] : []), "stack"];
    let frame = 0;
    const update = () => {
      frame = 0;
      const overview = document.getElementById("overview");
      const anchor = overview ? sectionScrollOffset(overview) + 24 : 180;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= anchor) cur = id;
      }
      setActive(cur);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hasGallery, hasProof, hasDocuments, hasVideos]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.history.replaceState(null, "", `#${id}`);
    scrollToSection(el);
  };

  return (
    <nav ref={navRef} aria-label="Project sections" className="project-mini-nav flex items-center gap-2 overflow-x-auto px-2 py-3">
      {items.map((item) => {
        const on = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => go(item.id)}
            aria-current={on ? "true" : undefined}
            className={`relative cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-label-l transition-colors ${on ? "border-transparent text-on-primary" : "state-layer border-outline bg-surface-container text-on-surface-variant"}`}
          >
            {on && <motion.span layoutId="miniNavPill" transition={fmTransition.standard} className="absolute inset-0 rounded-full bg-primary" />}
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
