import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { SEED_BG, SEED_TEXT } from "@/lib/seed-classes";
import type { SkillColumn } from "@/lib/content";

const ACCENT_CYCLE = ["primary", "tertiary", "success", "warning", "secondary"] as const;

function MarqueeRow({ tags, reverse, opacity }: { tags: string[]; reverse?: boolean; opacity?: number }) {
  const seq = [...tags, ...tags];
  return (
    <div className="overflow-hidden py-4 border-b border-outline-variant">
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
            <span key={`${tag}-${i}`} className="text-title-m text-on-surface px-6 inline-flex items-center gap-6" style={{ fontSize: "clamp(17px,2.4vw,28px)" }}>
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
    <section id="skills" className="relative" style={{ paddingBlock: "clamp(60px,9vh,110px)" }}>
      <div className="border-t border-outline-variant">
        <MarqueeRow tags={tags} />
        <MarqueeRow tags={tags} reverse opacity={0.6} />
      </div>

      <div className="max-w-[1300px] mx-auto px-5 md:px-14" style={{ paddingTop: "clamp(54px,8vh,90px)" }}>
        <Reveal>
          <div className="text-label-l text-warning mb-9">The Stack</div>
        </Reveal>
        <StaggerGroup className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))" }}>
          {skills.map((col) => (
            <StaggerItem key={col.title}>
              <div className="bg-surface-container border border-outline rounded-xl p-6 elevation-2">
                <div className={`text-label-m mb-5 ${SEED_TEXT[col.seed]}`}>{col.title}</div>
                <div className="flex flex-col gap-2.5">
                  {col.items.map((item) => (
                    <div key={item} className="text-body-m text-on-surface flex gap-2.5 items-center">
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
