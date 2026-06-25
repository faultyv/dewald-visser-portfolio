import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT, SEED_ON } from "@/lib/seed-classes";
import type { CVEntry, CompanyEntry, Project } from "@/lib/content";

const VALUE_LANES = [
  {
    seed: "primary" as const,
    icon: "query_stats",
    title: "Commercial and offer clarity",
    pressure: "Teams need someone who can understand the market, offer, pipeline and friction before deciding what should be made.",
    owns: ["Organic growth and paid campaigns", "Pricing and pipeline thinking", "Email, CRM and lead generation"],
    proof: "Damelin Online / LCIBS, Webmeta, Old Mutual, Investors Choice and Sun Paper shaped the commercial base.",
  },
  {
    seed: "tertiary" as const,
    icon: "palette",
    title: "Creative that ships",
    pressure: "Brands move when campaign language, media, production and distribution are built as one practical system.",
    owns: ["Adobe-led design systems", "Packaging, POS and campaign creative", "Photo, video, motion and live production"],
    proof: "Mediatrade, Olive Tree Church and Joseph Business School Africa prove real production under deadline pressure.",
  },
  {
    seed: "success" as const,
    icon: "web",
    title: "Web and operating systems",
    pressure: "A website is only useful when the content path, conversion flow, admin process and business logic actually work together.",
    owns: ["WordPress, Shopify and front-end builds", "Booking, LMS, CRM and quote flows", "Content architecture and launch systems"],
    proof: "Dynamic Automation, Kirstenhof Car Hire, Autodoc, Faux Flora and The Dreambook show usable systems, not brochureware.",
  },
  {
    seed: "highlight" as const,
    icon: "auto_awesome",
    title: "Practical AI adoption",
    pressure: "AI only helps when it becomes adoption: people understand the change, teams trust the workflow, and the output survives human review.",
    owns: ["LCIBS AI readiness and launch proof", "Canva + ChatGPT rollout", "Spreadsheet logic translated into CPQ tools"],
    proof: "LCIBS early AI-programme work under former Apple executive Brent Kilpatrick, JBSA adoption work and the CPQ build show AI as change adoption and systems design.",
  },
] as const;

const FIT_SIGNALS = [
  "You need a founder-minded operator, not a narrow handoff role.",
  "The work touches brand, content, web, campaigns, operations and AI.",
  "The business problem is messy and needs someone who can think, make and ship.",
  "You want one person who can talk strategy in the morning and move pixels, copy or systems by afternoon.",
] as const;

const IMPACT_MAP = [
  {
    window: "0-30",
    title: "Find the leverage",
    body: "Audit the offer, audience, channels, content assets, website flow and current operating friction. Turn noise into a short action map.",
    outputs: ["Offer and audience clarity", "Quick-win content and web fixes", "Workflow friction map"],
  },
  {
    window: "31-60",
    title: "Ship visible proof",
    body: "Move the first campaign, page, creative system or automation into the real workflow so the team can see momentum, not more planning.",
    outputs: ["Campaign or page shipped", "Reusable creative templates", "Measurement loop in place"],
  },
  {
    window: "61-90",
    title: "Make it repeatable",
    body: "Systemise what worked: templates, prompts, reporting habits, handoff documents and admin logic that reduce repeated manual effort.",
    outputs: ["AI-assisted workflow", "Team-ready operating rhythm", "Next-quarter growth backlog"],
  },
] as const;

function mappedResponsibilityCount(cv: CVEntry[], projects: Project[]) {
  const career = cv.reduce((sum, entry) => sum + (entry.responsibilities?.length ?? 0), 0);
  const project = projects.reduce((sum, item) => sum + (item.responsibilities?.length ?? 0), 0);
  return career + project;
}

export function HiringArgument({
  cv,
  projects,
  companies,
}: {
  cv: CVEntry[];
  projects: Project[];
  companies: CompanyEntry[];
}) {
  const responsibilityCount = mappedResponsibilityCount(cv, projects);
  const current = cv.find((entry) => entry.org === "Sun Paper and Coatings");
  const jbsa = cv.find((entry) => entry.org === "Joseph Business School Africa");
  const dynamic = cv.find((entry) => entry.org === "Dynamic Automation");

  const proofStats = [
    { value: `${responsibilityCount}+`, label: "mapped responsibilities", detail: "career and project scope made visible" },
    { value: `${companies.length}`, label: "organisations", detail: "ventures, clients, education, production and commercial work" },
    { value: `${projects.length}`, label: "projects", detail: "brand, web, production, campaign and system proof" },
    { value: "500+", label: "live audience", detail: "business-school programme production" },
  ];

  return (
    <section id="hire-case" className="hire-case section-pad-tight content-shell-wide relative">
      <div className="hire-case-head">
        <div>
          <Reveal>
            <div className="mb-4 text-label-l text-secondary">Hiring case</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-[860px] text-headline-l text-on-surface">
              Hire the person who can connect <span className="text-gradient text-gradient-animated">commercial sense, creative output and systems delivery.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="m-0 max-w-[440px] text-body-m text-on-surface-variant">
            Dewald is strongest where the brief is not clean yet: the offer needs shaping, the content needs craft, the site needs to work, and the workflow needs someone to own it end to end.
          </p>
        </Reveal>
      </div>

      <div className="hire-thesis-grid">
        <Reveal delay={0.12} className="hire-thesis-panel">
          <div className="hig-glass h-full rounded-[28px] p-5 md:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-label-s text-primary">The executive summary</div>
              <h3 className="mt-1 text-headline-s text-on-surface">A high-leverage operator for small teams, founders and growth environments.</h3>
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-on-primary">
              <IconSymbol name="workspace_premium" size={24} filled />
            </span>
            </div>
            <p className="m-0 text-body-m text-on-surface-variant">
              This is not a portfolio of disconnected jobs. It is a progression from software sales, Damelin Online and LCIBS admissions into Adobe production, then into web builds, live content systems, organic growth, AI adoption and founder-level ownership. The value is the handoff: fewer gaps between idea, asset, campaign, website and operating system.
            </p>

            <div className="hire-proof-stat-grid mt-6">
              {proofStats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <small>{stat.detail}</small>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16} className="hire-fit-panel">
          <div className="hig-card h-full rounded-[28px] p-5 md:p-6">
            <div className="mb-4 text-label-s text-tertiary">Best-fit brief</div>
            <h3 className="text-headline-s text-on-surface">Use Dewald when the job crosses lanes.</h3>
            <div className="mt-5 flex flex-col gap-3">
              {FIT_SIGNALS.map((signal, index) => (
                <div key={signal} className="hire-fit-row">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{signal}</strong>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <StaggerGroup className="hire-lane-grid">
        {VALUE_LANES.map((lane) => (
          <StaggerItem key={lane.title}>
            <article className="hire-lane-card hig-card h-full rounded-[24px] p-5">
              <div className="mb-5 flex items-start justify-between gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-2xl ${SEED_BG[lane.seed]} ${SEED_ON[lane.seed]}`}>
                  <IconSymbol name={lane.icon} size={23} filled />
                </span>
                <span className={`rounded-full px-2.5 py-1 text-label-s ${SEED_CONTAINER_BG[lane.seed]} ${SEED_CONTAINER_TEXT[lane.seed]}`}>
                  Owns the lane
                </span>
              </div>
              <h3 className="text-title-l text-on-surface">{lane.title}</h3>
              <p className="mt-3 text-body-s text-on-surface-variant">{lane.pressure}</p>
              <div className="mt-4 flex flex-col gap-2.5">
                {lane.owns.map((item) => (
                  <div key={item} className="hire-own-row">
                    <span className={SEED_BG[lane.seed]} />
                    {item}
                  </div>
                ))}
              </div>
              <div className={`hire-proof-trail mt-5 p-3 text-body-s ${SEED_CONTAINER_BG[lane.seed]} ${SEED_CONTAINER_TEXT[lane.seed]}`}>
                <strong className="mb-1 block text-label-s">Proof trail</strong>
                {lane.proof}
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal delay={0.18}>
        <div className="hire-impact-map hig-glass rounded-[28px] p-5 md:p-6">
          <div className="hire-impact-head">
            <div>
              <div className="text-label-s text-primary">30 / 60 / 90 value map</div>
              <h3 className="mt-1 text-headline-s text-on-surface">What a serious team can get from this profile fast.</h3>
            </div>
            <p className="m-0 text-body-m text-on-surface-variant">
              The aim is not to add another specialist to the handoff chain. The aim is to compress the distance between commercial judgement, creative execution and usable systems.
            </p>
          </div>
          <div className="hire-impact-steps">
            {IMPACT_MAP.map((step, index) => (
              <article key={step.window} className="hire-impact-step">
                <div className="hire-impact-window">{step.window}</div>
                <div className="hire-impact-copy">
                  <h4>{step.title}</h4>
                  <p>{step.body}</p>
                  <div>
                    {step.outputs.map((output) => (
                      <span key={output}>{output}</span>
                    ))}
                  </div>
                </div>
                {index < IMPACT_MAP.length - 1 ? <IconSymbol name="arrow_forward" size={18} className="hire-impact-arrow" /> : null}
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="hire-close-strip">
          <div>
            <span>Current founder context</span>
            <strong>{current?.detail ?? "Founder-led operating work at Sun Paper and Coatings."}</strong>
          </div>
          <div>
            <span>Learning and production proof</span>
            <strong>{jbsa?.proof?.map((item) => item.title).join(" · ") ?? "Livestreams, LMS, campaigns and learning content."}</strong>
          </div>
          <div>
            <span>Systems proof</span>
            <strong>{dynamic?.proof?.map((item) => item.title).join(" · ") ?? "Spreadsheet logic translated into web tooling."}</strong>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
