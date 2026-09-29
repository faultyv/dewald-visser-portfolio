import { ArtworkImage } from "./ArtworkImage";
import type { Project } from "@/lib/content";

type Props = { project: Project; priority?: boolean; sizes: string; variant?: "card" | "hero" };

export function ProjectCoverVisual({ project, priority, sizes }: Props) {
  const src = project.cover ?? project.gallery.find(item => item.src)?.src;
  return src ? <div className="artwork-cover"><ArtworkImage src={src} alt={`${project.title} — selected artwork`} sizes={sizes} priority={priority} /></div> : <div className="p-8 text-title-l text-on-surface">{project.title}</div>;
}
