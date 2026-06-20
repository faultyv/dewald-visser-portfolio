"use client";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { fmTransition } from "@/lib/motion-tokens";

type Dir = "up" | "left" | "right" | "scale";

const OFFSETS: Record<Dir, Record<string, number>> = {
  up: { y: 42 },
  left: { x: -50 },
  right: { x: 50 },
  scale: { scale: 0.92 },
};

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

  if (!ready) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...OFFSETS[dir] }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...fmTransition.emphasized, delay }}
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
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.09 } } }}
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
        hidden: { opacity: 0, y: 40, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: fmTransition.emphasized },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
