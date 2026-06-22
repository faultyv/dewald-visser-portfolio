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
    title: "Entrepreneurship and Strategy",
    proof: "Founder / operator",
    summary: "Building ventures, brands and operating systems from the ground up.",
    items: ["Founding ventures and business systems", "Brand and positioning strategy", "Director-level ownership and leadership"],
  },
  {
    n: "02",
    seed: "primary",
    icon: "bar_chart",
    title: "Marketing",
    proof: "Growth channels",
    summary: "Campaign strategy tied to acquisition, lead generation and measurable demand.",
    items: ["SEO and paid media across Meta, Google and YouTube", "Email automation and lead generation", "Campaign planning, budget control and brand strategy"],
  },
  {
    n: "03",
    seed: "tertiary",
    icon: "palette",
    title: "Graphic Design",
    proof: "Adobe-led creative",
    summary: "Visual systems that carry a brand across print, social, motion and web.",
    items: ["Brand identity and logo design", "Print, social and campaign creative", "Motion graphics across the Adobe suite"],
  },
  {
    n: "04",
    seed: "success",
    icon: "code",
    title: "Web and Front-End",
    proof: "Systems that ship",
    summary: "Websites, stores and automation flows designed around real operational needs.",
    items: ["WordPress, Shopify and custom HTML/CSS/JS", "E-commerce stores and drop-ship models", "Booking, CRM and automation systems"],
  },
  {
    n: "05",
    seed: "highlight",
    icon: "auto_awesome",
    title: "Practical AI Enablement",
    proof: "Workflow layer",
    summary: "Turning AI from a buzzword into prompts, training, workflows and human-in-the-loop adoption people can actually use.",
    items: ["Early AI-readiness work at LCIBS under a former Apple executive", "Training direction for HR and industry change", "Prompt systems, workflow design and human-in-the-loop adoption"],
  },
];

export function Pillars() {
  const ai = PILLARS[PILLARS.length - 1];
  const core = PILLARS.slice(0, -1);

  return (
    <section id="pillars" className="surface-band section-pad-tight relative">
      <div className="content-shell-wide">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5 md:mb-12">
          <div>
            <Reveal>
              <div className="text-label-l text-primary mb-4">Capabilities</div>
            </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">
                Connected disciplines,
                <br />
                one operator.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-[390px] text-body-m text-on-surface-variant">
              The advantage is the handoff between them: strategy shaping the campaign, design carrying the message, web systems making it usable and AI tightening the workflow.
          </p>
        </Reveal>
        </div>

        <StaggerGroup className="flex flex-col gap-4.5">
          <StaggerItem>
            <TiltCard>
              <article className="hig-glass rounded-[24px] p-5 md:rounded-[28px] md:p-8">
                <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 select-none text-[148px] font-bold leading-none text-highlight/10 sm:block" style={{ fontFamily: "var(--font-display)" }}>
                  AI
                </div>
                <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_1.05fr] md:items-end md:gap-8">
                  <div>
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <div className={`grid h-14 w-14 place-items-center rounded-2xl ${SEED_BG[ai.seed]}`}>
                        <IconSymbol name={ai.icon} size={28} filled className={SEED_ON[ai.seed]} />
                      </div>
                      <div>
                    <div className={`text-label-s ${SEED_TEXT[ai.seed]}`}>Pillar {ai.n} · Practical layer</div>
                        <div className="text-label-s text-on-surface-variant">{ai.proof}</div>
                      </div>
                    </div>
                    <h3 className="m-0 text-headline-l text-on-surface md:text-display-s">{ai.title}</h3>
                    <p className="mt-3 max-w-[620px] text-body-l text-on-surface-variant">{ai.summary}</p>
                  </div>
                  <div className="grid gap-2.5">
                    {ai.items.map((it, idx) => (
                      <div key={it} className={`flex items-start gap-3 rounded-xl px-3.5 py-2.5 md:py-3 ${SEED_CONTAINER_BG[ai.seed]} ${SEED_CONTAINER_TEXT[ai.seed]}`}>
                        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${SEED_BG[ai.seed]} ${SEED_ON[ai.seed]} text-label-s`}>{idx + 1}</span>
                        <span className="text-body-s">{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </TiltCard>
          </StaggerItem>

          <div className="mobile-strip no-scrollbar -mx-5 flex gap-3.5 px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-4.5 xl:grid-cols-4">
            {core.map((p) => (
              <StaggerItem key={p.n} className="min-w-[78vw] max-w-[78vw] sm:min-w-0 sm:max-w-none">
                <TiltCard className="h-full">
                  <article className="hig-card flex h-full flex-col rounded-[22px] p-5 md:min-h-[280px] md:p-6">
                    <div className={`grid h-13 w-13 place-items-center rounded-2xl ${SEED_BG[p.seed]}`} style={{ width: 52, height: 52 }}>
                      <IconSymbol name={p.icon} size={26} filled className={SEED_ON[p.seed]} />
                    </div>
                    <div className={`text-label-m mt-6 mb-2 ${SEED_TEXT[p.seed]}`}>Pillar {p.n}</div>
                    <div className={`mb-3 w-max max-w-full rounded-full px-2.5 py-1 text-label-s ${SEED_CONTAINER_BG[p.seed]} ${SEED_CONTAINER_TEXT[p.seed]}`}>{p.proof}</div>
                    <h3 className="mb-2 text-title-l text-on-surface">
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
