import { tone, withAlpha } from "./color";

/** Brand seed hues — kept from the original site, now driving a real M3 tonal-role system. */
export const SEEDS = {
  primary: "#0073EA", // blue
  secondary: "#6C6CFF", // purple
  tertiary: "#E2445C", // pink
  success: "#00C875", // green
  warning: "#FDAB3D", // orange
  info: "#579BFC", // light blue
  accent: "#A25DDC", // violet
  highlight: "#FF158A", // magenta
} as const;

export type SeedName = keyof typeof SEEDS;
export type ThemeName = "light" | "dark";

const ROLE_TONES = {
  light: { base: 45, on: 99, container: 92, onContainer: 19 },
  dark: { base: 76, on: 14, container: 30, onContainer: 92 },
} as const;

function roleSet(seedHex: string, mode: "light" | "dark") {
  const t = ROLE_TONES[mode];
  return {
    base: tone(seedHex, t.base),
    on: tone(seedHex, t.on, -60),
    container: tone(seedHex, t.container, -25),
    onContainer: tone(seedHex, t.onContainer, -10),
  };
}

type SurfaceTokens = {
  surface: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  onSurface: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  scrim: string;
  cursorBlend: "normal" | "screen";
};

const SURFACES: Record<ThemeName, SurfaceTokens> = {
  light: {
    surface: "#FFFFFF",
    surfaceDim: "#E9EBF2",
    surfaceBright: "#FFFFFF",
    surfaceContainerLow: "#FAFBFD",
    surfaceContainer: "#F6F7FB",
    surfaceContainerHigh: "#EEF0F7",
    surfaceContainerHighest: "#E6E9F2",
    onSurface: "#292F4C",
    onSurfaceVariant: "#676879",
    outline: "#E6E9EF",
    outlineVariant: "#EEF0F5",
    shadow: "rgba(41,47,76,0.12)",
    scrim: "rgba(8,12,24,0.55)",
    cursorBlend: "normal",
  },
  dark: {
    surface: "#14182B",
    surfaceDim: "#10132280",
    surfaceBright: "#262C4E",
    surfaceContainerLow: "#181C32",
    surfaceContainer: "#1E2340",
    surfaceContainerHigh: "#262C4E",
    surfaceContainerHighest: "#2E3559",
    onSurface: "#F2F4FB",
    onSurfaceVariant: "#A6ABC9",
    outline: "rgba(255,255,255,0.11)",
    outlineVariant: "rgba(255,255,255,0.06)",
    shadow: "rgba(0,0,0,0.45)",
    scrim: "rgba(4,6,14,0.7)",
    cursorBlend: "screen",
  },
};

const THEME_MODE: Record<ThemeName, "light" | "dark"> = {
  light: "light",
  dark: "dark",
};

export const THEME_LABEL: Record<ThemeName, string> = {
  light: "Light",
  dark: "Dark",
};

export const THEME_NAMES: ThemeName[] = ["light", "dark"];

function cssVarBlock(theme: ThemeName): string {
  const mode = THEME_MODE[theme];
  const surf = SURFACES[theme];
  const lines: string[] = [];

  (Object.keys(SEEDS) as SeedName[]).forEach((name) => {
    const r = roleSet(SEEDS[name], mode);
    lines.push(`--m3-${name}: ${r.base};`);
    lines.push(`--m3-on-${name}: ${r.on};`);
    lines.push(`--m3-${name}-container: ${r.container};`);
    lines.push(`--m3-on-${name}-container: ${r.onContainer};`);
  });

  lines.push(`--m3-surface: ${surf.surface};`);
  lines.push(`--m3-surface-dim: ${surf.surfaceDim};`);
  lines.push(`--m3-surface-bright: ${surf.surfaceBright};`);
  lines.push(`--m3-surface-container-low: ${surf.surfaceContainerLow};`);
  lines.push(`--m3-surface-container: ${surf.surfaceContainer};`);
  lines.push(`--m3-surface-container-high: ${surf.surfaceContainerHigh};`);
  lines.push(`--m3-surface-container-highest: ${surf.surfaceContainerHighest};`);
  lines.push(`--m3-on-surface: ${surf.onSurface};`);
  lines.push(`--m3-on-surface-variant: ${surf.onSurfaceVariant};`);
  lines.push(`--m3-outline: ${surf.outline};`);
  lines.push(`--m3-outline-variant: ${surf.outlineVariant};`);
  lines.push(`--m3-shadow: ${surf.shadow};`);
  lines.push(`--m3-scrim: ${surf.scrim};`);
  lines.push(`--m3-cursor-blend: ${surf.cursorBlend};`);

  // state-layer opacities are constant per M3 spec, but expressed as rgb triplets here
  // so components can build rgba() overlays from on-surface / primary at hover/press time.
  const onSurfaceHex = surf.onSurface.startsWith("#") ? surf.onSurface : "#292F4C";
  lines.push(`--m3-state-hover: ${withAlpha(onSurfaceHex, 0.08)};`);
  lines.push(`--m3-state-focus: ${withAlpha(onSurfaceHex, 0.1)};`);
  lines.push(`--m3-state-press: ${withAlpha(onSurfaceHex, 0.12)};`);

  return lines.join("\n  ");
}

/** Generates the full multi-theme CSS custom-property block, computed once at module load. */
export function generateThemeCSS(): string {
  const blocks = THEME_NAMES.map((theme) => {
    const selector = theme === "light" ? ":root, html[data-theme='light']" : `html[data-theme='${theme}']`;
    return `${selector} {\n  ${cssVarBlock(theme)}\n}`;
  });
  return blocks.join("\n\n");
}

export const THEME_CSS = generateThemeCSS();
