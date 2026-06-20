import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { SEED_BG, SEED_TEXT } from "@/lib/seed-classes";
import type { SkillColumn } from "@/lib/content";

const ACCENT_CYCLE = ["primary", "tertiary", "success", "warning", "secondary"] as const;

function MarqueeRow({ tags, reverse, opacity }: { tags: string[]; reverse?: boolean; opacity?: number }) {
  const seq = [...tags, ...tags];
  return (
    <div className="overflow-hidden border-b border-outline-variant py-3 md:py-4">
      <div
        className="flex w-max gap-0 whitespace-nowrap"
        style={{
          animation: `${reverse ? "marqueeR" : "marquee"} ${reverse ? 40 : 34}s linear infinite`,
          opacity: opacity ?? 1,
        }}
      >
        {seq.map((tag, i) => {
          const accent = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
          return (
            <span key={`${tag}-${i}`} className="inline-flex items-center gap-4 px-4 text-title-m text-on-surface md:gap-6 md:px-6">
              {tag}
              <span className={SEED_TEXT[accent]}>✦</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function SkillsMarquee({ tags, skills }: { tags: string[]; skills: SkillColumn[] }) {
  return (
    <section id="skills" className="section-pad-tight relative">
      <div className="border-t border-outline-variant">
        <MarqueeRow tags={tags} />
        <MarqueeRow tags={tags} reverse opacity={0.6} />
      </div>

      <div className="content-shell pt-12 md:pt-20">
        <Reveal>
          <div className="text-label-l text-warning mb-9">The Stack</div>
        </Reveal>
        <StaggerGroup className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4.5">
          {skills.map((col) => (
            <StaggerItem key={col.title}>
              <div className="rounded-xl border border-outline bg-surface-container p-4 elevation-2 md:p-6">
                <div className={`mb-4 text-label-m ${SEED_TEXT[col.seed]} md:mb-5`}>{col.title}</div>
                <div className="flex flex-col gap-2 md:gap-2.5">
                  {col.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-body-s text-on-surface sm:text-body-m md:gap-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full inline-block flex-none ${SEED_BG[col.seed]}`} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
