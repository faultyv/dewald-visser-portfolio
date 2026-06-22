"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fmTransition } from "@/lib/motion-tokens";

export function ProjectMiniNav({ hasGallery }: { hasGallery: boolean }) {
  const items = [
    { id: "overview", label: "Overview" },
    ...(hasGallery ? [{ id: "gallery", label: "Gallery" }] : []),
    { id: "stack", label: "Stack" },
  ];
  const [active, setActive] = useState(items[0].id);

  useEffect(() => {
    const ids = ["overview", ...(hasGallery ? ["gallery"] : []), "stack"];
    let frame = 0;
    const update = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.32;
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
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasGallery]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, opts?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -90 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sticky top-[68px] z-[40] -mx-1 mb-9 flex items-center gap-2 overflow-x-auto border-b border-outline-variant bg-surface/85 px-1 py-3 backdrop-blur-md">
      {items.map((item) => {
        const on = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => go(item.id)}
            aria-current={on ? "true" : undefined}
            className={`relative cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-label-l transition-colors ${on ? "border-transparent text-on-primary" : "state-layer border-outline bg-surface-container text-on-surface-variant"}`}
          >
            {on && <motion.span layoutId="miniNavPill" transition={fmTransition.standard} className="absolute inset-0 rounded-full bg-primary" />}
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
