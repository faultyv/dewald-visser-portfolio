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
    summary: "Building ventures, offers and operating systems from the ground up.",
    items: ["Founder-level ownership", "Brand and positioning strategy", "Pricing, pipeline and sales systems"],
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
    summary: "Websites, stores and quote/automation tools designed around real operational needs.",
    items: ["WordPress, Shopify and custom HTML/CSS/JS", "E-commerce stores and drop-ship models", "Booking, CRM and CPQ quote-automation systems"],
  },
  {
    n: "05",
    seed: "highlight",
    icon: "auto_awesome",
    title: "Practical AI Enablement",
    proof: "Workflow layer",
    summary: "Turning AI from a buzzword into trained teams, working prompt systems and useful business tooling.",
    items: ["Rolled out Canva + ChatGPT workflows inside a live business", "Built a web-based CPQ quote tool from tangled spreadsheet logic", "Worked on education-sector AI readiness and change conversations"],
  },
];

const AI_ITEM_ICONS = ["model_training", "account_tree", "verified"];

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
              The advantage is the handoff between them: strategy shapes the offer, design carries the message, web systems make it usable and AI tightens the workflow.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="flex flex-col gap-4.5">
          <StaggerItem>
            <TiltCard>
              <article className="ai-feature-card group hig-glass relative overflow-hidden rounded-[24px] p-5 md:rounded-[28px] md:p-8">
                <span className="ai-glow hidden sm:block" aria-hidden="true" />
                <span className="ai-loop hidden md:block" aria-hidden="true">
                  <span className="ai-loop-ring ai-loop-ring-a" />
                  <span className="ai-loop-ring ai-loop-ring-b" />
                  <span className="ai-loop-node ai-loop-node-a" />
                  <span className="ai-loop-node ai-loop-node-b" />
                  <span className="ai-loop-node ai-loop-node-c" />
                  <span className="ai-loop-core">AI</span>
                </span>
                <div className="relative z-10 grid gap-7 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-10">
                  <div>
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <div className={`ai-mark grid h-14 w-14 place-items-center rounded-2xl ${SEED_BG[ai.seed]}`}>
                        <IconSymbol name={ai.icon} size={28} filled className={`${SEED_ON[ai.seed]} feature-glyph transition-transform duration-300 group-hover:scale-110`} />
                      </div>
                      <div>
                        <div className={`text-label-s ${SEED_TEXT[ai.seed]}`}>Featured · The AI workflow layer</div>
                        <div className="text-label-s text-on-surface-variant">{ai.proof}</div>
                      </div>
                    </div>
                    <h3 className="m-0 text-headline-l text-on-surface md:text-display-s">{ai.title}</h3>
                    <p className="mt-3 max-w-[520px] text-body-l text-on-surface-variant">{ai.summary}</p>
                    <div className="ai-flow mt-7 hidden sm:flex" aria-hidden="true">
                      <span className="ai-flow-line" />
                      {["Brief", "Prompt", "Build", "Iterate"].map((step, i) => (
                        <span key={step} className="ai-flow-node">
                          <span className="ai-flow-bead" style={{ animationDelay: `${i * 0.45}s` }} />
                          <span className="ai-flow-label">{step}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2.5">
                    {ai.items.map((it, idx) => (
                      <div key={it} className="flex items-center gap-3.5 rounded-2xl border border-outline-variant bg-surface-container-low p-3.5 transition-colors hover:border-outline">
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${SEED_BG[ai.seed]} ${SEED_ON[ai.seed]}`}>
                          <IconSymbol name={AI_ITEM_ICONS[idx] ?? "task_alt"} size={18} filled />
                        </span>
                        <span className="text-body-m text-on-surface">{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </TiltCard>
          </StaggerItem>

          <div className="mobile-strip no-scrollbar -mx-5 flex gap-3.5 px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-4.5 xl:grid-cols-4">
            {core.map((p, i) => (
              <StaggerItem key={p.n} className="min-w-[78vw] max-w-[78vw] sm:min-w-0 sm:max-w-none">
                <TiltCard className="h-full">
                  <article className="group hig-card flex h-full flex-col rounded-[22px] p-5 md:min-h-[280px] md:p-6">
                    <div className={`feature-icon grid place-items-center rounded-2xl ${SEED_BG[p.seed]}`} style={{ width: 52, height: 52, animationDelay: `${i * 0.55}s` }}>
                      <IconSymbol name={p.icon} size={26} filled className={`${SEED_ON[p.seed]} feature-glyph transition-transform duration-300 group-hover:scale-110`} />
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
