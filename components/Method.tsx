import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_ON, SEED_TEXT } from "@/lib/seed-classes";
import type { MethodStep } from "@/lib/content";

export function Method({ steps }: { steps: MethodStep[] }) {
  return (
    <section id="method" className="section-pad-tight content-shell relative">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <Reveal>
            <div className="text-label-l text-highlight mb-4">Operating System</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-headline-l text-on-surface">
              Not just output.
              <br />
              Working systems.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[460px] text-body-m text-on-surface-variant">
              A portfolio should show how a person thinks. This system makes the thinking visible: diagnose the business need, design the language, deploy the system, then learn from the result.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="grid gap-3 sm:grid-cols-2 md:gap-3.5">
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <article className="relative min-h-[156px] overflow-hidden rounded-xl border border-outline bg-surface-container p-4.5 elevation-2 md:min-h-[188px] md:p-5">
                <div className={`absolute -right-7 -top-7 h-28 w-28 rounded-full opacity-15 ${SEED_BG[step.seed]}`} />
                <div className="relative z-10 mb-5 flex items-start justify-between gap-3 md:mb-7">
                  <div>
                    <div className={`text-label-s ${SEED_TEXT[step.seed]}`}>{step.kicker}</div>
                    <h3 className="mt-1 text-title-l text-on-surface">{step.title}</h3>
                  </div>
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${SEED_BG[step.seed]} ${SEED_ON[step.seed]} elevation-1 text-label-m`}>{String(i + 1).padStart(2, "0")}</div>
                </div>
                <p className="relative z-10 m-0 text-body-s text-on-surface-variant">{step.body}</p>
                <IconSymbol name="route" size={24} className={`absolute bottom-5 right-5 opacity-20 ${SEED_TEXT[step.seed]}`} />
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
