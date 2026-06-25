import Image from "next/image";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { IconSymbol } from "./IconSymbol";

const ARC_STEPS = [
  {
    label: "LCIBS",
    title: "Early AI readiness",
    body: "Worked under Brett Kilpatrick during the LCIBS period on AI-readiness, HR and industry-change thinking before AI became normal workplace language.",
    meta: "pre-mainstream AI",
  },
  {
    label: "JBSA",
    title: "American programme, Africa engine",
    body: "Moved that adoption mindset into Joseph Business School Africa: masterclasses, campaigns, livestreams, learning media, funnels and web/LMS systems.",
    meta: "programme growth",
  },
  {
    label: "Proof",
    title: "Self-sustaining model",
    body: "The work helped turn an education offer into a repeatable demand system with stronger sales performance, reusable content and clearer operating rhythm.",
    meta: "commercial system",
  },
] as const;

const LEDGER = [
  { value: "2016-2019", label: "LCIBS AI-readiness exposure" },
  { value: "500+", label: "live programme audience" },
  { value: "US -> Africa", label: "global network execution" },
  { value: "Self-run", label: "sales and content model" },
] as const;

export function GlobalProofArc() {
  return (
    <section id="global-proof" className="global-proof-arc section-pad-tight content-shell-wide relative">
      <div className="global-proof-head">
        <div>
          <Reveal>
            <div className="mb-4 text-label-l text-highlight">AI and global proof</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-[920px] text-headline-l text-on-surface">
              Early AI exposure became a <span className="text-gradient text-gradient-animated">commercial education engine.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="m-0 max-w-[470px] text-body-m text-on-surface-variant">
            This is the sharper proof arc: global-standard mentorship, early change-readiness work, then African programme delivery that had to generate demand, content and measurable enrolment momentum.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div className="global-proof-board hig-glass">
          <div className="global-proof-media-stack">
            <figure className="global-proof-hero-photo">
              <Image
                src="/images/education-ai/lcibs-ai-robot-launch.jpg"
                alt="Dewald Visser dressed as an AI robot for an LCIBS AI programme launch"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 520px"
              />
              <figcaption>
                <span>AI-readiness proof</span>
                Before the AI wave became office language.
              </figcaption>
            </figure>

            <div className="global-proof-mini-grid">
              <figure>
                <Image
                  src="/images/education-ai/lcibs-former-apple-exec.jpg"
                  alt="Brett Kilpatrick speaking during an LCIBS AI-readiness session"
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="240px"
                />
                <figcaption>Brett Kilpatrick mentorship context</figcaption>
              </figure>
              <div className="global-proof-jbs-lockup" aria-label="Joseph Business School Africa proof">
                <Image
                  src="/images/work/joseph-business-school/cover.png"
                  alt=""
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="240px"
                />
              </div>
            </div>
          </div>

          <div className="global-proof-story">
            <div className="global-proof-story-label">
              <IconSymbol name="hub" size={18} filled />
              Career logic, not loose claims
            </div>
            <h3>From change-readiness to growth infrastructure.</h3>
            <p>
              The AI story is not decorative. At LCIBS it started as exposure to executive-level thinking about technology, people and industry change. At JBSA it became practical systems: launch language, campaign assets, recorded learning content, livestream production, funnel work, LMS/web support and team adoption of Canva plus ChatGPT.
            </p>

            <StaggerGroup className="global-proof-step-list">
              {ARC_STEPS.map((step, index) => (
                <StaggerItem key={step.label}>
                  <article className="global-proof-step">
                    <div className="global-proof-step-number">{String(index + 1).padStart(2, "0")}</div>
                    <div>
                      <span>{step.label}</span>
                      <h4>{step.title}</h4>
                      <p>{step.body}</p>
                    </div>
                    <strong>{step.meta}</strong>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <aside className="global-proof-ledger">
            <div>
              <span>Positioning line</span>
              <strong>South African operator, global-standard proof.</strong>
              <p>
                A local execution base with the range to compete in serious international education and growth environments.
              </p>
            </div>
            <div className="global-proof-ledger-grid">
              {LEDGER.map((item) => (
                <span key={item.label}>
                  <strong>{item.value}</strong>
                  {item.label}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </Reveal>
    </section>
  );
}
