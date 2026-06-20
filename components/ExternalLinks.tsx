import { IconSymbol } from "./IconSymbol";
import { SEED_CONTAINER_BG, SEED_CONTAINER_TEXT } from "@/lib/seed-classes";
import type { SeedName } from "@/lib/m3-theme";
import type { ProjectLink } from "@/lib/content";

export function ExternalLinks({ links, seed }: { links: ProjectLink[]; seed: SeedName }) {
  if (!links?.length) return null;
  return (
    <div className="flex flex-wrap gap-2.5 mb-9">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`ripple-container state-layer text-label-l no-underline px-4.5 py-2.5 rounded-full inline-flex items-center gap-1.5 ${SEED_CONTAINER_BG[seed]} ${SEED_CONTAINER_TEXT[seed]}`}
        >
          {link.label} <IconSymbol name="open_in_new" size={16} />
        </a>
      ))}
    </div>
  );
}
