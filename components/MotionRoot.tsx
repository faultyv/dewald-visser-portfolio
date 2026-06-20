"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function MotionRoot() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let ticker: ((time: number) => void) | null = null;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      ticker = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const onGoto = (e: Event) => {
      const target = (e.currentTarget as HTMLElement).getAttribute("data-goto");
      if (!target) return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -10 });
      else el.scrollIntoView({ behavior: "smooth" });
    };
    const gotoEls = Array.from(document.querySelectorAll<HTMLElement>("[data-goto]"));
    gotoEls.forEach((el) => el.addEventListener("click", onGoto));

    const scrollbar = document.getElementById("scrollbar");
    let bar: gsap.core.Tween | null = null;
    if (scrollbar) {
      bar = gsap.to(scrollbar, {
        width: "100%",
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });
    }

    return () => {
      gotoEls.forEach((el) => el.removeEventListener("click", onGoto));
      if (ticker) gsap.ticker.remove(ticker);
      if (lenis) lenis.destroy();
      bar?.scrollTrigger?.kill();
      bar?.kill();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
