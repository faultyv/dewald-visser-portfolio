import Link from "next/link";
import { IconSymbol } from "./IconSymbol";
import { ProjectCoverVisual } from "./ProjectCoverVisual";
import type { Project } from "@/lib/content";

/** Curated connections — the non-obvious threads, mirroring the brand-map intelligence. */
const CLUSTERS: { slugs: string[]; label: string }[] = [
  {
    slugs: ["dreambook-cpm", "joseph-business-school", "retail-production-dtp"],
    label: "Connected work across a ministry project, an entrepreneurship school and production design.",
  },
];

const CATEGORY_LABEL: Record<string, string> = {
  web: "More web & systems work",
  brand: "More brand & design work",
  marketing: "More marketing work",
};

function relatedFor(current: Project, all: Project[]): { items: Project[]; label: string } {
  const cluster = CLUSTERS.find((c) => c.slugs.includes(current.slug));
  if (cluster) {
    const items = all.filter((p) => cluster.slugs.includes(p.slug) && p.slug !== current.slug);
    if (items.length) return { items, label: cluster.label };
  }
  const cat = current.categories[0];
  const items = all.filter((p) => p.slug !== current.slug && p.categories.includes(cat)).slice(0, 3);
  return { items, label: CATEGORY_LABEL[cat] ?? "More selected work" };
}

export function RelatedWork({ current, all }: { current: Project; all: Project[] }) {
  const { items, label } = relatedFor(current, all);
  if (!items.length) return null;

  return (
    <div className="mt-16 border-t border-outline-variant pt-10">
      <div className="mb-1.5 flex items-center gap-2 text-label-l text-on-surface-variant">
        <IconSymbol name="hub" size={16} className="text-primary" />
        Related work
      </div>
      <div className="mb-6 max-w-[640px] text-body-m text-on-surface">{label}</div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="group block no-underline">
            <div className="hig-card overflow-hidden rounded-[20px]">
              <div className="relative aspect-[16/10]">
                <ProjectCoverVisual project={p} sizes="(max-width:768px) 90vw, 360px" />
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <div className="truncate text-title-s text-on-surface">{p.title}</div>
                  <div className="mt-0.5 truncate text-label-s text-on-surface-variant">{p.label} · {p.period}</div>
                </div>
                <IconSymbol name="arrow_forward" size={18} className="shrink-0 text-on-surface-variant transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
