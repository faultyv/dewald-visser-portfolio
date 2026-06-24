import Link from "next/link";
import { IconSymbol } from "./IconSymbol";
import type { Project } from "@/lib/content";

export function ProjectPager({ prev, next }: { prev: Project | null; next: Project | null }) {
  return (
    <nav className="project-pager-grid" aria-label="Project navigation">
      {prev && (
        <Link href={`/work/${prev.slug}`} className="project-pager-card state-layer">
          <span className="project-pager-icon">
            <IconSymbol name="arrow_back" size={21} />
          </span>
          <div>
            <div className="text-label-m text-on-surface-variant">Previous</div>
            <div className="text-title-m text-on-surface">{prev.title}</div>
          </div>
        </Link>
      )}
      {next && (
        <Link href={`/work/${next.slug}`} className="project-pager-card state-layer is-next">
          <div>
            <div className="text-label-m text-on-surface-variant">Next</div>
            <div className="text-title-m text-on-surface">{next.title}</div>
          </div>
          <span className="project-pager-icon">
            <IconSymbol name="arrow_forward" size={21} />
          </span>
        </Link>
      )}
    </nav>
  );
}
