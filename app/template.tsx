"use client";

import { motion, useReducedMotion } from "motion/react";

/** Per-route entrance. Next's App Router remounts `template` on every navigation,
 *  so each page fades/rises in — an app-like transition without an exit phase
 *  (exit on route change fights Lenis/ScrollTrigger restoration). Opacity-led with a
 *  tiny rise; transforms settle to 0 and never wrap fixed elements (those live in
 *  Providers, outside <main>). */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.05, 0.7, 0.1, 1] }}
    >
      {children}
    </motion.div>
  );
}
