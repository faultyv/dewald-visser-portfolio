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
    const root = document.documentElement;
    let lenis: Lenis | null = null;
    let ticker: ((time: number) => void) | null = null;
    let pointerFrame = 0;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    root.classList.add("motion-ready");

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      ticker = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        pointer.x += (pointer.tx - pointer.x) * 0.18;
        pointer.y += (pointer.ty - pointer.y) * 0.18;
        root.style.setProperty("--pointer-x", pointer.x.toFixed(4));
        root.style.setProperty("--pointer-y", pointer.y.toFixed(4));
      });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

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

    const sectionTriggers = Array.from(document.querySelectorAll<HTMLElement>("main section[id]")).map((section) => {
      section.classList.add("kinetic-section");
      section.style.setProperty("--section-progress", "0");
      return ScrollTrigger.create({
        trigger: section,
        start: "top 62%",
        end: "bottom 38%",
        onEnter: () => {
          root.dataset.motionSection = section.id;
          section.classList.add("is-section-active");
        },
        onEnterBack: () => {
          root.dataset.motionSection = section.id;
          section.classList.add("is-section-active");
        },
        onLeave: () => section.classList.remove("is-section-active"),
        onLeaveBack: () => section.classList.remove("is-section-active"),
        onUpdate: (self) => section.style.setProperty("--section-progress", self.progress.toFixed(3)),
      });
    });

    return () => {
      root.classList.remove("motion-ready");
      delete root.dataset.motionSection;
      window.removeEventListener("pointermove", onPointerMove);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      gotoEls.forEach((el) => el.removeEventListener("click", onGoto));
      if (ticker) gsap.ticker.remove(ticker);
      if (lenis) lenis.destroy();
      bar?.scrollTrigger?.kill();
      bar?.kill();
      sectionTriggers.forEach((trigger) => trigger.kill());
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
