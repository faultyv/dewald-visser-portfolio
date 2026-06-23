import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_ON, SEED_TEXT } from "@/lib/seed-classes";
import type { MethodStep } from "@/lib/content";

const STEP_ICONS = ["search_insights", "design_services", "rocket_launch", "autorenew"];
const STEP_OUTPUTS = ["Clear brief", "Reusable language", "Live system", "Sharper loop"];

export function Method({ steps }: { steps: MethodStep[] }) {
  return (
    <section id="method" className="section-pad-tight content-shell-wide relative">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <Reveal>
            <div className="text-label-l text-highlight mb-4">Operating method</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">
              How the work
              <br />
              moves.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[460px] text-body-m text-on-surface-variant">
              The process stays simple on purpose: diagnose the business problem, design the reusable system, deploy what the team can use and learn from the result.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="method-runway relative grid gap-3 rounded-[28px] border border-outline-variant bg-surface-container-low p-3 md:grid-cols-2 md:gap-3.5 md:p-4">
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <article className="method-step-card group hig-card min-h-[178px] rounded-[22px] p-4.5 md:min-h-[210px] md:p-5">
                <div className={`absolute -right-7 -top-7 h-28 w-28 rounded-full opacity-15 ${SEED_BG[step.seed]}`} />
                <div className="relative z-10 mb-5 flex items-start justify-between gap-3 md:mb-7">
                  <div>
                    <div className={`text-label-s ${SEED_TEXT[step.seed]}`}>{step.kicker} phase</div>
                    <h3 className="mt-1 text-title-l text-on-surface">{step.title}</h3>
                  </div>
                  <div className={`feature-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl ${SEED_BG[step.seed]} ${SEED_ON[step.seed]} elevation-1`} style={{ animationDelay: `${i * 0.5}s` }}>
                    <IconSymbol name={STEP_ICONS[i] ?? "route"} size={23} filled className="feature-glyph transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>
                <p className="relative z-10 m-0 text-body-s text-on-surface-variant">{step.body}</p>
                <div className="relative z-10 mt-5 flex items-center justify-between gap-3 border-t border-outline-variant pt-3">
                  <span className={`text-label-m ${SEED_TEXT[step.seed]}`}>Step {String(i + 1).padStart(2, "0")}</span>
                  <span className="text-label-m text-on-surface-variant">{STEP_OUTPUTS[i] ?? "Next move"}</span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
