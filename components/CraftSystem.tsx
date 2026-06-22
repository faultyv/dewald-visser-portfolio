import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_ON, SEED_TEXT } from "@/lib/seed-classes";
import type { SeedName } from "@/lib/m3-theme";

const PRINCIPLES: { title: string; body: string; seed: SeedName; icon: string; signal: string }[] = [
  {
    title: "Commercial clarity",
    body: "Start with the offer, audience and friction so the creative work has a business job to do.",
    seed: "primary",
    icon: "visibility",
    signal: "Business first",
  },
  {
    title: "Reusable assets",
    body: "Turn campaign, brand and web decisions into visual systems a team can keep using.",
    seed: "secondary",
    icon: "layers",
    signal: "Systemised",
  },
  {
    title: "Practical depth",
    body: "Use motion, material and hierarchy to support the proof, not to compete with it.",
    seed: "highlight",
    icon: "blur_on",
    signal: "Polished",
  },
  {
    title: "Measured iteration",
    body: "Read what the work changes, then tighten the next campaign, page or process around that signal.",
    seed: "success",
    icon: "sync_alt",
    signal: "Learning loop",
  },
];

const TOKENS = ["Offer clarity", "Campaign assets", "Web systems", "Production workflows", "Light / dark", "Reduced-motion safe"];

export function CraftSystem() {
  return (
    <section id="system" className="section-pad content-shell-wide relative">
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <div>
          <Reveal>
            <div className="text-label-l text-primary mb-4">Working system</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">
              Built like
              <br />
              a working system.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[470px] text-body-m text-on-surface-variant">
              The portfolio carries the same thinking as the work: clear offer, reusable parts, calm hierarchy and enough polish to make the evidence easy to judge.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-wrap gap-2">
              {TOKENS.map((token) => (
                <span key={token} className="hig-control rounded-full px-3 py-1.5 text-label-m text-on-surface">
                  {token}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="snap-hint mt-5 lg:hidden">Swipe principles</div>
          </Reveal>
        </div>

        <StaggerGroup className="mobile-strip no-scrollbar -mx-5 flex gap-3.5 px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0">
          {PRINCIPLES.map((principle, index) => (
            <StaggerItem key={principle.title} className="min-w-[78vw] max-w-[78vw] sm:min-w-0 sm:max-w-none">
              <TiltCard className="h-full">
                <article className="hig-card group flex h-full min-h-[220px] flex-col rounded-[24px] p-5 md:p-6">
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${SEED_BG[principle.seed]}`}>
                      <IconSymbol name={principle.icon} size={24} filled className={SEED_ON[principle.seed]} />
                    </div>
                    <div className={`rounded-full px-2.5 py-1 text-label-s ${SEED_TEXT[principle.seed]}`}>
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="relative z-10 mt-auto">
                    <div className={`mb-2 text-label-s ${SEED_TEXT[principle.seed]}`}>{principle.signal}</div>
                    <h3 className="m-0 text-title-l text-on-surface">{principle.title}</h3>
                    <p className="mt-2 text-body-s text-on-surface-variant">{principle.body}</p>
                  </div>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
