"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/** Rolls through a list of strings one at a time (vertical ticker). Only animates while in
 *  view and not hovered, so a page full of tickers stays calm and cheap. Reduced-motion / SSR
 *  render a static first item; the full list is always in the DOM (visually hidden) for SEO
 *  and screen readers. */
export function RollingList({
  items,
  interval = 2300,
  height = "1.55em",
  className = "",
  itemClassName = "",
}: {
  items: string[];
  interval?: number;
  height?: string;
  className?: string;
  itemClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused || !inView || items.length <= 1) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => window.clearInterval(id);
  }, [reduce, paused, inView, items.length, interval]);

  if (!items.length) return null;

  return (
    <span
      ref={ref}
      className={className}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <span className="sr-only">{items.join(". ")}.</span>
      {reduce ? (
        <span aria-hidden="true" className={itemClassName}>
          {items[0]}
        </span>
      ) : (
        <span aria-hidden="true" className="relative block overflow-hidden" style={{ height }}>
          <AnimatePresence initial={false}>
            <motion.span
              key={i}
              initial={{ y: "118%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-118%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className={`absolute inset-x-0 top-0 ${itemClassName}`}
            >
              {items[i]}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </span>
  );
}
