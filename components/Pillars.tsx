import Image from "next/image";
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
    title: "Growth Marketing",
    proof: "Growth channels",
    summary: "Campaign strategy tied to demand, content performance, paid channels and measurable lead flow.",
    items: ["Organic growth and paid media across Meta, Google and YouTube", "Email automation and lead generation", "Campaign planning, budget control and brand strategy"],
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
    summary: "AI treated as adoption work: launch the idea, train the humans, create the review loop and turn the logic into tools people can actually use.",
    items: ["Early LCIBS AI-programme launch work under former Apple executive direction", "Operationalised Canva + ChatGPT inside a live content workflow", "Converted tangled spreadsheet logic into a web-based CPQ tool"],
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
                <span className="text-gradient text-gradient-animated">one operator.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[390px] text-body-m text-on-surface-variant">
              The advantage is the handoff between them: strategy shapes the offer, design carries the message, web systems make it usable and <span className="text-mark">AI tightens the workflow.</span>
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="flex flex-col gap-4.5">
          <StaggerItem>
            <TiltCard>
              <article className="ai-feature-card group hig-glass relative overflow-hidden rounded-[24px] p-5 md:rounded-[28px] md:p-8">
                <span className="ai-glow hidden sm:block" aria-hidden="true" />
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
                    <div className="ai-protocol-strip mt-7" aria-label="AI workflow protocol">
                      {["Brief", "Prompt", "Guardrail", "Review", "Ship"].map((step) => (
                        <span key={step}>{step}</span>
                      ))}
                    </div>
                  </div>
                  <div className="ai-evidence-column">
                    <div className="ai-console-visual" aria-hidden="true">
                      <div className="ai-console-topline">
                        <span>education AI proof</span>
                        <strong>LCIBS</strong>
                      </div>
                      <div className="ai-console-core">
                        <span className="ai-console-grid" />
                        <div className="ai-console-token ai-console-token-a">Launch</div>
                        <div className="ai-console-token ai-console-token-b">Train</div>
                        <div className="ai-console-token ai-console-token-c">Adopt</div>
                        <div className="ai-console-chip">
                          <IconSymbol name="auto_awesome" size={24} filled />
                          AI proof
                        </div>
                      </div>
                      <div className="ai-console-output">
                        <span>former Apple exec</span>
                        <span>HR readiness</span>
                        <span>workflow tools</span>
                      </div>
                    </div>
                    <figure className="ai-proof-photo m-0">
                      <Image
                        src="/images/education-ai/lcibs-ai-robot-launch.jpg"
                        alt="Dewald Visser dressed as an AI robot for an LCIBS AI programme launch"
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 900px) 100vw, 420px"
                      />
                      <figcaption>
                        <strong>Before AI was normal office language.</strong>
                        LCIBS programme-launch proof: AI adoption, training context and human readiness.
                      </figcaption>
                    </figure>
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
