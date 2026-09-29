import { ArtworkImage } from "./ArtworkImage";
import type { SeedName } from "@/lib/m3-theme";
import type { Project } from "@/lib/content";

export function ProjectHeroMedia({ cover, title }: {
  cover: string | null; title: string; seed: SeedName; project?: Project;
  coverFit?: "cover" | "contain"; coverPosition?: string; coverBg?: "light" | "dark";
}) {
  return cover ? <div className="artwork-hero"><ArtworkImage src={cover} alt={`${title} — selected artwork`} sizes="(max-width:768px) 92vw, 1028px" priority /></div> : null;
}
