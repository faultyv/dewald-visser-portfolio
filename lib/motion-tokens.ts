/** Material 3 motion tokens — durations (ms) and easing curves, used by both GSAP and Framer Motion. */

export const DURATION = {
  short1: 0.05,
  short2: 0.1,
  short3: 0.15,
  short4: 0.2,
  medium1: 0.25,
  medium2: 0.3,
  medium3: 0.35,
  medium4: 0.4,
  long1: 0.45,
  long2: 0.5,
  long3: 0.55,
  long4: 0.6,
  extraLong1: 0.7,
  extraLong4: 1.0,
} as const;

/** Cubic-bezier control points from the M2/M3 motion system spec. */
export const EASE_CSS = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  standardDecelerate: "cubic-bezier(0, 0, 0, 1)",
  standardAccelerate: "cubic-bezier(0.3, 0, 1, 1)",
  emphasized: "cubic-bezier(0.2, 0, 0, 1)",
  emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
  emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)",
} as const;

/** GSAP-flavoured equivalents (GSAP eases use a different syntax than raw cubic-bezier strings for some cases). */
export const EASE_GSAP = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  standardDecelerate: "cubic-bezier(0, 0, 0, 1)",
  standardAccelerate: "cubic-bezier(0.3, 0, 1, 1)",
  emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
  emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)",
  bounce: "back.out(1.4)",
  elastic: "elastic.out(1, 0.5)",
} as const;

/** Framer Motion transition presets built from the tokens above. */
export const fmTransition = {
  standard: { duration: DURATION.medium2, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  emphasized: { duration: DURATION.long2, ease: [0.05, 0.7, 0.1, 1] as [number, number, number, number] },
  emphasizedAccelerate: { duration: DURATION.short4, ease: [0.3, 0, 0.8, 0.15] as [number, number, number, number] },
  spring: { type: "spring" as const, stiffness: 260, damping: 26 },
};
