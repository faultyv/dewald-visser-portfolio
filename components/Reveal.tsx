"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";

type Dir = "up" | "left" | "right" | "scale";

const OFFSETS: Record<Dir, Record<string, number>> = {
  up: { y: 46 },
  left: { x: -54 },
  right: { x: 54 },
  scale: { scale: 0.93 },
};

/** Premium settle spring for section/element reveals — soft, confident, minimal overshoot.
 *  Transforms ride the spring; opacity gets a quick emphasized-decelerate tween so it never
 *  flickers. Note: no filter/blur on purpose — a lingering filter would break the many
 *  backdrop-filter glass surfaces nested inside these wrappers. */
const REVEAL_SPRING = { type: "spring" as const, stiffness: 168, damping: 24, mass: 1 } as const;
const FADE = { duration: 0.45, ease: [0.05, 0.7, 0.1, 1] as [number, number, number, number] };

const subscribeHydration = () => () => {};
const getHydratedSnapshot = () => true;
const getServerSnapshot = () => false;

function useHydratedMotion() {
  return useSyncExternalStore(subscribeHydration, getHydratedSnapshot, getServerSnapshot);
}

export function Reveal({
  children,
  dir = "up",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  dir?: Dir;
  className?: string;
  delay?: number;
}) {
  const ready = useHydratedMotion();
  const reduce = useReducedMotion();

  if (!ready) {
    return <div className={className}>{children}</div>;
  }

  const hidden = reduce ? { opacity: 0 } : { opacity: 0, ...OFFSETS[dir] };
  const shown = reduce ? { opacity: 1 } : { opacity: 1, y: 0, x: 0, scale: 1 };

  return (
    <motion.div
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "-84px" }}
      transition={{ ...REVEAL_SPRING, delay, opacity: { ...FADE, delay } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ready = useHydratedMotion();

  if (!ready) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-64px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.075, delayChildren: 0.04 } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ready = useHydratedMotion();
  const reduce = useReducedMotion();

  if (!ready) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 42, scale: 0.96 },
        show: reduce
          ? { opacity: 1, transition: FADE }
          : { opacity: 1, y: 0, scale: 1, transition: { ...REVEAL_SPRING, opacity: FADE } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
