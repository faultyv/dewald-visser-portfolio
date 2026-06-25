import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_ON, SEED_TEXT, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT } from "@/lib/seed-classes";
import type { CVEntry, CompanyEntry, Project } from "@/lib/content";
import type { SeedName } from "@/lib/m3-theme";

const SPINE_STEPS: {
  label: string;
  title: string;
  body: string;
  icon: string;
  seed: SeedName;
  proof: string;
}[] = [
  {
    label: "Signal",
    title: "Read the business pressure",
    body: "Software sales, admissions funnels and founder work sharpen the instinct for audience, offer, pricing and urgency before creative starts.",
    icon: "query_stats",
    seed: "primary",
    proof: "pipeline, targets, CRM",
  },
  {
    label: "Language",
    title: "Make the idea usable",
    body: "Adobe-led design, copy, content and media production turn scattered intent into a system people can recognise, reuse and ship.",
    icon: "design_services",
    seed: "tertiary",
    proof: "brand, media, DTP",
  },
  {
    label: "Surface",
    title: "Build where the work happens",
    body: "Websites, LMS, Shopify, WordPress, booking flows and CPQ tools become the working surface, not just the presentation layer.",
    icon: "web",
    seed: "success",
    proof: "web, LMS, CPQ",
  },
  {
    label: "Loop",
    title: "Use AI where it reduces drag",
    body: "Prompt systems, review habits and tool rollouts matter only when they help teams decide, produce and improve faster.",
    icon: "auto_awesome",
    seed: "highlight",
    proof: "prompt, review, adopt",
  },
];

function countResponsibilities(cv: CVEntry[], projects: Project[]) {
  return (
    cv.reduce((sum, entry) => sum + (entry.responsibilities?.length ?? 0), 0) +
    projects.reduce((sum, project) => sum + (project.responsibilities?.length ?? 0), 0)
  );
}

export function OperatingSpine({
  cv,
  projects,
  companies,
}: {
  cv: CVEntry[];
  projects: Project[];
  companies: CompanyEntry[];
}) {
  const responsibilityCount = countResponsibilities(cv, projects);
  const hasDynamic = cv.some((entry) => entry.org === "Dynamic Automation");
  const hasEducationBrands = cv.some((entry) => entry.org === "Damelin Online / LCIBS");

  const proofSignals = [
    { value: "LCIBS", label: "early AI readiness", body: "programme-launch and readiness work under Brett Kilpatrick" },
    { value: hasEducationBrands ? "10 mo" : "CRM", label: "promotion signal", body: "Damelin Online launch support into international admissions" },
    { value: "JBSA", label: "global programme", body: "US-founded school, Africa sales and content engine" },
    { value: `${responsibilityCount}+`, label: "mapped moves", body: "responsibilities made visible across career and projects" },
  ];

  return (
    <section id="spine" className="operating-spine content-shell-wide section-pad-tight relative">
      <div className="spine-head">
        <div>
          <Reveal>
            <div className="mb-4 text-label-l text-primary">Operating spine</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-[860px] text-headline-l text-on-surface">
              The through-line is <span className="text-gradient text-gradient-animated">commercial judgement into useful systems.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="m-0 max-w-[500px] text-body-m text-on-surface-variant">
            Every section below should prove the same thing: Dewald can enter a messy brief, find the leverage, make the creative language, build the working surface and tighten the loop with practical AI.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.14}>
        <div className="spine-console hig-glass">
          <StaggerGroup className="spine-step-grid">
            {SPINE_STEPS.map((step, index) => (
              <StaggerItem key={step.label}>
                <article className="spine-step">
                  <div className="spine-step-top">
                    <span className={`spine-step-icon ${SEED_BG[step.seed]} ${SEED_ON[step.seed]}`}>
                      <IconSymbol name={step.icon} size={23} filled />
                    </span>
                    <span className={`spine-step-index ${SEED_CONTAINER_BG[step.seed]} ${SEED_CONTAINER_TEXT[step.seed]}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={`mt-5 text-label-s ${SEED_TEXT[step.seed]}`}>{step.label}</div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <div className="spine-proof-chip">{step.proof}</div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="spine-proof-board">
            <div className="spine-proof-copy">
              <div className="text-label-s text-success">Hiring logic</div>
              <h3>One profile, fewer handoff gaps.</h3>
              <p>
                The value is not that the work spans many lanes. The value is that those lanes connect: commercial pressure informs the offer, design carries the message, web turns it into a usable flow, and AI removes repeated manual drag.
              </p>
            </div>
            <div className="spine-proof-stats">
              {proofSignals.map((signal) => (
                <div key={signal.label}>
                  <strong>{signal.value}</strong>
                  <span>{signal.label}</span>
                  <small>{signal.body}</small>
                </div>
              ))}
            </div>
            <div className="spine-proof-route" aria-label="Proof routes">
              <span>{companies.length} organisations</span>
              <IconSymbol name="arrow_forward" size={16} />
              <span>{projects.length} proof projects</span>
              <IconSymbol name="arrow_forward" size={16} />
              <span>{hasDynamic ? "CPQ system proof" : "system proof"}</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
