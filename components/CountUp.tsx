"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const subscribe = () => () => {};
const getHydrated = () => true;
const getServer = () => false;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Counts from 0 → value when scrolled into view. SSR / no-JS / reduced-motion render the
 *  final value directly (accessible, no layout shift); the live count runs client-side on
 *  first viewport entry via a native IntersectionObserver + rAF (version-proof, StrictMode-safe). */
export function CountUp({
  value,
  suffix = "",
  duration = 1.5,
  className = "",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isHydrated = useSyncExternalStore(subscribe, getHydrated, getServer);
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!isHydrated || reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / (duration * 1000));
        setN(Math.round(easeOutCubic(p) * value));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { rootMargin: "-60px 0px -60px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [isHydrated, reduce, value, duration]);

  const showFinal = !isHydrated || reduce;
  return (
    <span ref={ref} className={className}>
      {showFinal ? value : n}
      {suffix}
    </span>
  );
}
