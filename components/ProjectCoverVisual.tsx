import Image from "next/image";
import { IconSymbol } from "./IconSymbol";
import { COVER_BG, SEED_BG, SEED_ON, SEED_TEXT } from "@/lib/seed-classes";
import type { Project } from "@/lib/content";

type ProjectCoverVisualProps = {
  project: Project;
  priority?: boolean;
  sizes: string;
  variant?: "card" | "hero";
};

const HERO_COPY: Record<string, { eyebrow: string; headline: string; body: string; icon: string }> = {
  "dreambook-cpm": {
    eyebrow: "Brand · app · events",
    headline: "A book ecosystem, not a flat website.",
    body: "Identity, product path, app downloads and event activation held in one coherent ministry system.",
    icon: "auto_stories",
  },
  "joseph-business-school": {
    eyebrow: "US programme · Africa growth",
    headline: "A business school turned into a demand engine.",
    body: "Masterclasses, livestreams, funnels, learning media and web/LMS systems working together around entrepreneur education.",
    icon: "school",
  },
  "dynamic-automation": {
    eyebrow: "Manufacturer system",
    headline: "Poultry-equipment content with quote intelligence behind it.",
    body: "Website, brand and a CPQ prototype that translated complex spreadsheet logic into a clearer self-serve flow.",
    icon: "precision_manufacturing",
  },
  "sun-paper-and-coatings": {
    eyebrow: "Founder venture",
    headline: "A supply brand built from zero.",
    body: "Logo, sales collateral, supplier language and operating assets for a paper and coatings business under construction.",
    icon: "storefront",
  },
  "car-hire-booking-system": {
    eyebrow: "Growth + booking ops",
    headline: "Marketing demand connected to the booking engine.",
    body: "Search, paid media, email and a WordPress booking/payments workflow replacing scattered admin.",
    icon: "route",
  },
  "campaign-creative": {
    eyebrow: "Damelin Online · LCIBS",
    headline: "Education campaigns with early AI readiness.",
    body: "Admissions, CRM, creative assets and AI-readiness proof under Brett Kilpatrick during the LCIBS period.",
    icon: "psychology_alt",
  },
};

const ICON_BY_CATEGORY: Record<string, string> = {
  web: "language",
  marketing: "campaign",
  brand: "palette",
};

function fallbackCopy(project: Project) {
  const first = project.categories[0] ?? "web";
  return {
    eyebrow: project.label,
    headline: `${project.label} proof system.`,
    body: project.outcome,
    icon: ICON_BY_CATEGORY[first] ?? "work",
  };
}

function coverBackdrop(project: Project): string {
  if (project.coverFit !== "contain") return "absolute inset-0";
  if (project.coverBg) return `absolute inset-0 ${COVER_BG[project.coverBg]}`;
  return `absolute inset-0 ${SEED_BG[project.seed]} opacity-10`;
}

function ProjectScreenshot({ project, priority, sizes }: { project: Project; priority?: boolean; sizes: string }) {
  if (!project.cover) return <div className={`absolute inset-0 ${SEED_BG[project.seed]} opacity-20`} />;

  return (
    <Image
      src={project.cover}
      alt=""
      fill
      priority={priority}
      className="evidence-screen-image object-cover"
      style={project.coverPosition && project.coverFit !== "contain" ? { objectPosition: project.coverPosition } : undefined}
      sizes={sizes}
    />
  );
}

function MetricStrip({ project, compact }: { project: Project; compact?: boolean }) {
  const metrics = project.metrics.slice(0, compact ? 2 : 3);
  return (
    <div className="evidence-metric-row">
      {metrics.map((metric) => (
        <div key={metric.label} className="evidence-metric-card">
          <span>{metric.value}</span>
          <small>{metric.label}</small>
        </div>
      ))}
    </div>
  );
}

function StackStrip({ project }: { project: Project }) {
  return (
    <div className="evidence-stack-row">
      {project.stack.slice(0, 4).map((tool) => (
        <span key={tool}>{tool}</span>
      ))}
    </div>
  );
}

function EvidenceCover({ project, priority, sizes, variant = "card" }: ProjectCoverVisualProps) {
  const isHero = variant === "hero";
  const copy = HERO_COPY[project.slug] ?? fallbackCopy(project);

  return (
    <div className={`evidence-cover-shell evidence-cover-${variant} absolute inset-0`}>
      <div className="evidence-grid-line evidence-grid-line-a" aria-hidden="true" />
      <div className="evidence-grid-line evidence-grid-line-b" aria-hidden="true" />
      <div className="evidence-pulse evidence-pulse-a" aria-hidden="true" />
      <div className="evidence-pulse evidence-pulse-b" aria-hidden="true" />

      <div className="evidence-cover-inner">
        <div className="evidence-copy">
          <div className="mb-3 flex items-center gap-2">
            <span className={`evidence-orbit-icon ${SEED_BG[project.seed]} ${SEED_ON[project.seed]}`}>
              <IconSymbol name={copy.icon} size={isHero ? 26 : 21} filled />
            </span>
            <span className={`text-label-s ${SEED_TEXT[project.seed]}`}>{copy.eyebrow}</span>
          </div>
          <div className={isHero ? "evidence-headline evidence-headline-hero" : "evidence-headline"}>{copy.headline}</div>
          {isHero ? <p className="evidence-body">{copy.body}</p> : null}
          {isHero ? <StackStrip project={project} /> : null}
        </div>

        <div className="evidence-device" aria-hidden="true">
          <div className="evidence-device-bar">
            <span />
            <span />
            <span />
            <strong>{project.categories.join(" / ")}</strong>
          </div>
          <div className="evidence-screen">
            <ProjectScreenshot project={project} priority={priority} sizes={sizes} />
            <span className="evidence-screen-shade" />
            <span className="evidence-scanline" />
          </div>
        </div>

        <MetricStrip project={project} compact={!isHero} />
      </div>
    </div>
  );
}

function DreambookCover({ project, priority, sizes, variant = "card" }: ProjectCoverVisualProps) {
  const isHero = variant === "hero";

  return (
    <div className={`evidence-cover-shell dreambook-cover evidence-cover-${variant} absolute inset-0`}>
      <div className="evidence-pulse evidence-pulse-a" aria-hidden="true" />
      <div className="evidence-pulse evidence-pulse-b" aria-hidden="true" />
      <div className="dreambook-cover-inner">
        <div className="dreambook-book-frame">
          {project.cover ? (
            <Image
              src={project.cover}
              alt=""
              fill
              priority={priority}
              className="object-cover"
              sizes={sizes}
            />
          ) : null}
          <span className="dreambook-book-gloss" aria-hidden="true" />
        </div>

        <div className="dreambook-proof-stack">
          <span className={`evidence-orbit-icon ${SEED_BG[project.seed]} ${SEED_ON[project.seed]}`}>
            <IconSymbol name="auto_stories" size={isHero ? 26 : 21} filled />
          </span>
          <div className={isHero ? "evidence-headline evidence-headline-hero" : "evidence-headline"}>Book, app, event and web.</div>
          {isHero ? <p className="evidence-body">The system carries two published works, a mobile app pathway and event activation without making the page feel like a screenshot wall.</p> : null}
          <MetricStrip project={project} compact={!isHero} />
        </div>
      </div>
    </div>
  );
}

function LogoSystemCover({ project, priority, sizes, variant = "card" }: ProjectCoverVisualProps) {
  const isHero = variant === "hero";
  return (
    <div className={`evidence-cover-shell logo-system-cover evidence-cover-${variant} absolute inset-0`}>
      <div className={coverBackdrop(project)} />
      <div className="logo-system-inner">
        <div className="logo-system-mark">
          {project.cover ? (
            <Image
              src={project.cover}
              alt=""
              fill
              priority={priority}
              className="object-contain p-6 md:p-9"
              sizes={sizes}
            />
          ) : (
            <IconSymbol name="work" size={42} filled className="text-on-surface-variant" />
          )}
        </div>
        <div className="logo-system-copy">
          <span className={`evidence-orbit-icon ${SEED_BG[project.seed]} ${SEED_ON[project.seed]}`}>
            <IconSymbol name={ICON_BY_CATEGORY[project.categories[0] ?? "web"] ?? "work"} size={isHero ? 25 : 20} filled />
          </span>
          <div className={isHero ? "evidence-headline evidence-headline-hero" : "evidence-headline"}>{project.label} system.</div>
          {isHero ? <p className="evidence-body">{project.outcome}</p> : null}
          <MetricStrip project={project} compact={!isHero} />
        </div>
      </div>
    </div>
  );
}

function SunPaperCover({ project, priority, sizes, variant = "card" }: ProjectCoverVisualProps) {
  const isHero = variant === "hero";

  return (
    <div className={`sun-paper-cover evidence-cover-shell evidence-cover-${variant} absolute inset-0`}>
      <div className="evidence-pulse evidence-pulse-a" aria-hidden="true" />
      <div className="evidence-pulse evidence-pulse-b" aria-hidden="true" />
      <div className="sun-paper-cover-inner">
        <div className="sun-paper-mark">
          <div className="sun-paper-logo-lockup">
            <Image
              src={project.cover || "/images/work/sun-paper/logo-trimmed.png"}
              alt=""
              fill
              priority={priority}
              className="object-contain"
              sizes={sizes}
            />
          </div>
        </div>

        <div className="sun-paper-cover-copy">
          <span className={`evidence-orbit-icon ${SEED_BG[project.seed]} ${SEED_ON[project.seed]}`}>
            <IconSymbol name="storefront" size={isHero ? 25 : 20} filled />
          </span>
          <div className={isHero ? "evidence-headline evidence-headline-hero" : "evidence-headline"}>
            Founder-led supply venture.
          </div>
          {isHero ? (
            <p className="evidence-body">
              A brand and operating system for adhesive paper, coating materials, supplier conversations and B2B sales enablement.
            </p>
          ) : null}
          <div className="sun-paper-proof-line">
            <span><small>Build</small> Founder setup</span>
            <span><small>Market</small> B2B supply</span>
            <span><small>System</small> Sales kit</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RetailProductionCover({ project, variant = "card" }: { project: Project; variant?: "card" | "hero" }) {
  const isHero = variant === "hero";
  const proof = [
    { icon: "view_in_ar", label: "POS" },
    { icon: "print", label: "DTP" },
    { icon: "select_all", label: "Nesting" },
    { icon: "verified", label: "Repro" },
  ];
  const brands = project.brands?.slice(0, 6) ?? [];

  return (
    <div className="project-cover-board absolute inset-0">
      <div className="project-cover-registration project-cover-registration-a" />
      <div className="project-cover-registration project-cover-registration-b" />
      <div className={`relative z-[1] flex h-full flex-col justify-between p-5 md:p-6 ${isHero ? "md:p-8 lg:p-9" : ""}`}>
        <div className="flex items-start justify-end gap-3">
          <div className="project-cover-chip">
            <IconSymbol name="inventory_2" size={17} filled />
            Production proof
          </div>
          <div className="feature-icon grid h-10 w-10 place-items-center rounded-2xl bg-tertiary text-on-tertiary elevation-1">
            <IconSymbol name="palette" size={21} filled />
          </div>
        </div>

        <div className={`grid gap-3 ${isHero ? "md:grid-cols-[0.72fr_1.28fr] md:items-end md:gap-7" : ""}`}>
          <div>
            <div className={`${isHero ? "max-w-[380px] text-headline-m" : "max-w-[330px] text-headline-s"} text-on-surface`}>
              Retail artwork, schemed for press.
            </div>
            {isHero ? (
              <div className="mt-3 max-w-[430px] text-body-m text-on-surface-variant">
                Point-of-sale, blister-card artworking and print-ready repro systems for high-volume retail production.
              </div>
            ) : null}
          </div>
          <div className={`grid grid-cols-2 gap-2.5 ${isHero ? "md:gap-3" : ""}`}>
            {proof.map((item) => (
              <div key={item.label} className={`project-cover-proof ${isHero ? "md:min-h-[54px] md:px-4" : ""}`}>
                <IconSymbol name={item.icon} size={16} filled />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-label-s text-on-surface-variant">
          <span className="mr-1 h-2 w-2 rounded-full bg-tertiary" />
          <span>Mediatrade · House-brand production</span>
          {isHero && brands.length ? (
            <>
              <span className="mx-1 hidden opacity-50 md:inline">·</span>
              {brands.map((brand) => (
                <span key={brand} className="rounded-full border border-outline-variant bg-surface-container/70 px-2 py-0.5 text-on-surface">
                  {brand}
                </span>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ProjectCoverVisual({ project, priority, sizes, variant = "card" }: ProjectCoverVisualProps) {
  if (project.slug === "retail-production-dtp") return <RetailProductionCover project={project} variant={variant} />;
  if (project.slug === "dreambook-cpm") return <DreambookCover project={project} priority={priority} sizes={sizes} variant={variant} />;
  if (project.slug === "sun-paper-and-coatings") return <SunPaperCover project={project} priority={priority} sizes={sizes} variant={variant} />;
  if (project.coverFit === "contain") return <LogoSystemCover project={project} priority={priority} sizes={sizes} variant={variant} />;
  return <EvidenceCover project={project} priority={priority} sizes={sizes} variant={variant} />;
}
