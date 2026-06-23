import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT, SEED_ON } from "@/lib/seed-classes";
import type { ProjectProofLink } from "@/lib/content";
import type { SeedName } from "@/lib/m3-theme";

const PLATFORM_ICON: Record<string, string> = {
  YouTube: "smart_display",
  Facebook: "play_circle",
  Behance: "palette",
  Website: "language",
  "Live site": "open_in_new",
};

export function ProjectProofLinks({ links, seed }: { links?: ProjectProofLink[]; seed: SeedName }) {
  if (!links?.length) return null;

  return (
    <section className="proof-link-deck relative mb-12 overflow-hidden rounded-[28px] border border-outline-variant bg-surface-container-low p-4 md:p-5">
      <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-label-l text-primary">Media proof</div>
          <h2 className="mt-1 text-headline-s text-on-surface">Watch the work in motion.</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container/70 px-3 py-1.5 text-label-m text-on-surface-variant">
          <span className="proof-live-dot" aria-hidden="true" />
          {links.length} external proof links
        </div>
      </div>

      <div className="relative z-10 grid gap-3 md:grid-cols-3">
        {links.map((link, index) => {
          const platform = link.platform ?? "Website";
          return (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="proof-link-card state-layer group no-underline"
              style={{ animationDelay: `${index * 0.18}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`proof-link-icon ${SEED_BG[seed]} ${SEED_ON[seed]}`}>
                  <IconSymbol name={PLATFORM_ICON[platform] ?? "open_in_new"} size={24} filled />
                </span>
                <span className={`rounded-full px-2.5 py-1 text-label-s ${SEED_CONTAINER_BG[seed]} ${SEED_CONTAINER_TEXT[seed]}`}>
                  {platform}
                </span>
              </div>
              <div className="mt-5 text-title-m text-on-surface">{link.label}</div>
              {link.context ? <p className="mt-2 text-body-s text-on-surface-variant">{link.context}</p> : null}
              <div className="mt-5 inline-flex items-center gap-1.5 text-label-l text-primary">
                Open proof
                <IconSymbol name="arrow_forward" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
