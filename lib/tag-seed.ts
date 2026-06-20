import type { SeedName } from "./m3-theme";

export const TAG_SEED: Record<string, SeedName> = {
  Founder: "secondary",
  Marketing: "primary",
  Design: "tertiary",
  Web: "success",
  AI: "highlight",
  Foundations: "warning",
};

export function tagSeed(tag: string): SeedName {
  return TAG_SEED[tag] ?? "primary";
}
