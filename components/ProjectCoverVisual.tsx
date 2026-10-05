import { ArtworkImage } from "./ArtworkImage";
import Image from "next/image";
import type { Project } from "@/lib/content";

type CoverProject = Pick<Project, "title" | "cover" | "thumbnail" | "thumbnailAlt" | "thumbnailStyle" | "coverBg"> & { gallery?: Project["gallery"] };
type Props = { project: CoverProject; priority?: boolean; sizes: string; variant?: "card" | "hero" };

export function ProjectCoverVisual({ project, priority, sizes, variant = "hero" }: Props) {
  const src = (variant === "card" ? project.thumbnail : undefined) || project.cover || project.gallery?.find(item => item.src)?.src;
  if (src && variant === "card") {
    return <div className={`work-card-cover ${project.thumbnailStyle === "logo" ? "work-card-cover-logo" : ""}`} data-background={project.coverBg}>
      <div className="work-card-cover-media"><Image src={src} alt={project.thumbnailAlt || `${project.title} — selected artwork`} fill sizes={sizes} quality={90} loading={priority ? "eager" : "lazy"} style={{ objectFit: "contain" }} /></div>
    </div>;
  }
  return src ? <div className="artwork-cover"><ArtworkImage src={src} alt={`${project.title} — selected artwork`} sizes={sizes} priority={priority} /></div> : <div className="p-8 text-title-l text-on-surface">{project.title}</div>;
}
