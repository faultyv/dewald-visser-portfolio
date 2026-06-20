import Link from "next/link";
import { IconSymbol } from "./IconSymbol";
import type { Project } from "@/lib/content";

export function ProjectPager({ prev, next }: { prev: Project | null; next: Project | null }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
      {prev && (
        <Link href={`/work/${prev.slug}`} className="state-layer no-underline rounded-xl border border-outline bg-surface-container p-5 flex items-center gap-3">
          <IconSymbol name="arrow_back" size={20} className="text-on-surface-variant" />
          <div>
            <div className="text-label-m text-on-surface-variant">Previous</div>
            <div className="text-title-m text-on-surface">{prev.title}</div>
          </div>
        </Link>
      )}
      {next && (
        <Link href={`/work/${next.slug}`} className="state-layer no-underline rounded-xl border border-outline bg-surface-container p-5 flex items-center justify-end gap-3 text-right">
          <div>
            <div className="text-label-m text-on-surface-variant">Next</div>
            <div className="text-title-m text-on-surface">{next.title}</div>
          </div>
          <IconSymbol name="arrow_forward" size={20} className="text-on-surface-variant" />
        </Link>
      )}
    </div>
  );
}
