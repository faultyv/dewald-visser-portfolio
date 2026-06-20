import type { SeedName } from "./m3-theme";

/** Static literal Tailwind class lookups per seed — kept literal (not interpolated) so Tailwind's scanner generates them. */
export const SEED_BG: Record<SeedName, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-info",
  accent: "bg-accent",
  highlight: "bg-highlight",
};

export const SEED_ON: Record<SeedName, string> = {
  primary: "text-on-primary",
  secondary: "text-on-secondary",
  tertiary: "text-on-tertiary",
  success: "text-on-success",
  warning: "text-on-warning",
  info: "text-on-info",
  accent: "text-on-accent",
  highlight: "text-on-highlight",
};

export const SEED_TEXT: Record<SeedName, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
  accent: "text-accent",
  highlight: "text-highlight",
};

export const SEED_CONTAINER_BG: Record<SeedName, string> = {
  primary: "bg-primary-container",
  secondary: "bg-secondary-container",
  tertiary: "bg-tertiary-container",
  success: "bg-success-container",
  warning: "bg-warning-container",
  info: "bg-info-container",
  accent: "bg-accent-container",
  highlight: "bg-highlight-container",
};

export const SEED_CONTAINER_TEXT: Record<SeedName, string> = {
  primary: "text-on-primary-container",
  secondary: "text-on-secondary-container",
  tertiary: "text-on-tertiary-container",
  success: "text-on-success-container",
  warning: "text-on-warning-container",
  info: "text-on-info-container",
  accent: "text-on-accent-container",
  highlight: "text-on-highlight-container",
};

/** Fixed, theme-independent backdrops for logo ("contain") covers, so a white or dark
 * logo always has correct contrast regardless of the active light/dark theme. */
export const COVER_BG: Record<"light" | "dark", string> = {
  light: "bg-[#f4f5fb]",
  dark: "bg-[#141a2e]",
};
