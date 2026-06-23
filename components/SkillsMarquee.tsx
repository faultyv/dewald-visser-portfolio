import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT, SEED_TEXT } from "@/lib/seed-classes";
import type { SkillColumn } from "@/lib/content";

const ACCENT_CYCLE = ["primary", "tertiary", "success", "warning", "secondary"] as const;
const SKILL_ICONS: Record<string, string> = {
  Entrepreneurship: "rocket_launch",
  Marketing: "campaign",
  "Graphic Design": "palette",
  "Web and Front-End": "code",
  "AI Enablement": "auto_awesome",
};

function MarqueeRow({ tags, reverse, opacity }: { tags: string[]; reverse?: boolean; opacity?: number }) {
  const seq = [...tags, ...tags];
  return (
    <div className="overflow-hidden border-b border-outline-variant py-3 md:py-4">
      <div
        className="tools-marquee-track flex w-max gap-0 whitespace-nowrap"
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
      <div className="content-shell-wide">
        <div className="section-command mb-7 md:mb-9">
          <div>
            <Reveal>
              <div className="text-label-l text-warning mb-4">Tools and Fluency</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline-l text-on-surface">A practical operating stack.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[420px] text-body-m text-on-surface-variant">
              Strategy, creative tooling, web production and AI workflows arranged as one usable delivery system.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="skills-console grid grid-cols-1 gap-3 rounded-[28px] border border-outline-variant bg-surface-container-low p-3 sm:grid-cols-2 md:gap-4 md:p-4 lg:grid-cols-5">
          {skills.map((col) => (
            <StaggerItem key={col.title}>
              <div className="skill-module hig-card h-full rounded-[22px] p-4 md:p-5">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${SEED_CONTAINER_BG[col.seed]} ${SEED_CONTAINER_TEXT[col.seed]}`}>
                    <IconSymbol name={SKILL_ICONS[col.title] ?? "apps"} size={21} filled />
                  </div>
                  <div className={`rounded-full px-2 py-1 text-label-s ${SEED_CONTAINER_BG[col.seed]} ${SEED_CONTAINER_TEXT[col.seed]}`}>
                    {col.items.length} skills
                  </div>
                </div>
                <div className={`mb-4 text-title-s ${SEED_TEXT[col.seed]} md:mb-5`}>{col.title}</div>
                <div className="flex flex-col gap-2 md:gap-2.5">
                  {col.items.map((item) => (
                    <div key={item} className="skill-module-row flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container/74 px-2.5 py-2 text-body-s text-on-surface md:gap-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full inline-block flex-none ${SEED_BG[col.seed]}`} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.16}>
          <div className="tools-marquee mt-8 overflow-hidden rounded-[24px] border border-outline-variant bg-surface-container-low">
            <MarqueeRow tags={tags} />
            <MarqueeRow tags={tags} reverse opacity={0.52} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
