import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_ON, SEED_TEXT, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT } from "@/lib/seed-classes";
import type { SeedName } from "@/lib/m3-theme";

const PILLARS: { n: string; seed: SeedName; icon: string; title: string; proof: string; summary: string; items: string[] }[] = [
  {
    n: "01",
    seed: "secondary",
    icon: "rocket_launch",
    title: "Entrepreneurship & Strategy",
    proof: "Founder / operator",
    summary: "Building ventures, brands and operating systems from the ground up.",
    items: ["Founding ventures & building systems", "Brand + business strategy", "Director-level ownership & leadership"],
  },
  {
    n: "02",
    seed: "primary",
    icon: "bar_chart",
    title: "Marketing",
    proof: "Growth channels",
    summary: "Campaign strategy tied to acquisition, lead generation and measurable demand.",
    items: ["SEO & paid social — Meta / Google / YouTube", "Email automation & lead generation", "Campaign + budget planning, brand strategy"],
  },
  {
    n: "03",
    seed: "tertiary",
    icon: "palette",
    title: "Graphic Design",
    proof: "Adobe-led creative",
    summary: "Visual systems that carry a brand across print, social, motion and web.",
    items: ["Brand identity & logo design", "Print & social creative", "Motion graphics — full Adobe suite"],
  },
  {
    n: "04",
    seed: "success",
    icon: "code",
    title: "Web & Front-End",
    proof: "Systems that ship",
    summary: "Websites, stores and automation flows designed around real operational needs.",
    items: ["WordPress, Shopify & custom HTML/CSS/JS", "E-commerce stores & drop-ship models", "Booking & automation systems"],
  },
  {
    n: "05",
    seed: "highlight",
    icon: "auto_awesome",
    title: "AI Enablement",
    proof: "Early adopter at LCIBS",
    summary: "Helping people and organizations prepare for AI-led change, from training to workflow design.",
    items: ["Worked under a former Apple executive on AI readiness", "AI training direction for HR and industry change", "Prompting, workflow design & practical adoption"],
  },
];

export function Pillars() {
  const ai = PILLARS[PILLARS.length - 1];
  const core = PILLARS.slice(0, -1);

  return (
    <section id="pillars" className="relative px-3.5 md:px-10" style={{ paddingBlock: "clamp(40px,6vh,90px)" }}>
      <div className="max-w-[1340px] mx-auto bg-surface-container-low border border-outline-variant rounded-[34px] elevation-1" style={{ padding: "clamp(44px,5vw,84px) clamp(24px,4vw,64px)" }}>
        <div className="flex justify-between items-end flex-wrap gap-5 mb-12">
          <div>
            <Reveal>
              <div className="text-label-l text-primary mb-4">Capabilities</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline-l text-on-surface">
                Five pillars,
                <br />
                one operator.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[390px] text-body-m text-on-surface-variant">
              Most people do one of these. I connect all five — strategy, marketing, design, web systems and practical AI adoption.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="flex flex-col gap-4.5">
          <StaggerItem>
            <TiltCard>
              <article className="relative overflow-hidden rounded-[28px] border border-highlight/30 bg-surface-container elevation-3 p-6 md:p-8">
                <div className="absolute right-6 top-1/2 -translate-y-1/2 select-none text-[clamp(72px,13vw,148px)] font-bold leading-none text-highlight/10" style={{ fontFamily: "var(--font-display)" }}>
                  AI
                </div>
                <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_1.05fr] md:items-end">
                  <div>
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <div className={`grid h-14 w-14 place-items-center rounded-2xl ${SEED_BG[ai.seed]}`}>
                        <IconSymbol name={ai.icon} size={28} filled className={SEED_ON[ai.seed]} />
                      </div>
                      <div>
                        <div className={`text-label-s ${SEED_TEXT[ai.seed]}`}>Pillar {ai.n} · Future layer</div>
                        <div className="text-label-s text-on-surface-variant">{ai.proof}</div>
                      </div>
                    </div>
                    <h3 className="m-0 text-display-s text-on-surface">{ai.title}</h3>
                    <p className="mt-3 max-w-[620px] text-body-l text-on-surface-variant">{ai.summary}</p>
                  </div>
                  <div className="grid gap-2.5">
                    {ai.items.map((it, idx) => (
                      <div key={it} className={`flex items-start gap-3 rounded-xl px-3.5 py-3 ${SEED_CONTAINER_BG[ai.seed]} ${SEED_CONTAINER_TEXT[ai.seed]}`}>
                        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${SEED_BG[ai.seed]} ${SEED_ON[ai.seed]} text-label-s`}>{idx + 1}</span>
                        <span className="text-body-s">{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </TiltCard>
          </StaggerItem>

          <div className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}>
            {core.map((p) => (
              <StaggerItem key={p.n}>
                <TiltCard className="h-full">
                  <article className="relative h-full overflow-hidden bg-surface-container border border-outline rounded-xl p-6 min-h-[300px] flex flex-col elevation-2">
                    <div className={`grid h-13 w-13 place-items-center rounded-2xl ${SEED_BG[p.seed]}`} style={{ width: 52, height: 52 }}>
                      <IconSymbol name={p.icon} size={26} filled className={SEED_ON[p.seed]} />
                    </div>
                    <div className={`text-label-m mt-6 mb-2 ${SEED_TEXT[p.seed]}`}>Pillar {p.n}</div>
                    <div className={`mb-3 w-max max-w-full rounded-full px-2.5 py-1 text-label-s ${SEED_CONTAINER_BG[p.seed]} ${SEED_CONTAINER_TEXT[p.seed]}`}>{p.proof}</div>
                    <h3 className="text-title-l text-on-surface mb-2" style={{ fontSize: 23 }}>
                      {p.title}
                    </h3>
                    <p className="m-0 mb-4 text-body-s text-on-surface-variant">{p.summary}</p>
                    <ul className="mt-auto mb-0 border-t border-outline-variant pt-4 p-0 list-none flex flex-col gap-2.5 text-body-s text-on-surface-variant">
                      {p.items.map((it) => (
                        <li key={it} className="flex gap-2">
                          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${SEED_BG[p.seed]}`} />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </TiltCard>
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>
      </div>
    </section>
  );
}
