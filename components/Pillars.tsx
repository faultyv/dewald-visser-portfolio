import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { IconSymbol } from "./IconSymbol";
import { SEED_BG, SEED_ON, SEED_TEXT } from "@/lib/seed-classes";
import type { SeedName } from "@/lib/m3-theme";

const PILLARS: { n: string; seed: SeedName; icon: string; title: string; items: string[] }[] = [
  {
    n: "01",
    seed: "secondary",
    icon: "rocket_launch",
    title: "Entrepreneurship & Strategy",
    items: ["Founding ventures & building systems", "Brand + business strategy", "Director-level ownership & leadership"],
  },
  {
    n: "02",
    seed: "primary",
    icon: "bar_chart",
    title: "Marketing",
    items: ["SEO & paid social — Meta / Google / YouTube", "Email automation & lead generation", "Campaign + budget planning, brand strategy"],
  },
  {
    n: "03",
    seed: "tertiary",
    icon: "palette",
    title: "Graphic Design",
    items: ["Brand identity & logo design", "Print & social creative", "Motion graphics — full Adobe suite"],
  },
  {
    n: "04",
    seed: "success",
    icon: "code",
    title: "Web & Front-End",
    items: ["WordPress, Shopify & custom HTML/CSS/JS", "E-commerce stores & drop-ship models", "Booking & automation systems"],
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="relative px-3.5 md:px-10" style={{ paddingBlock: "clamp(40px,6vh,90px)" }}>
      <div className="max-w-[1340px] mx-auto bg-surface-container-low rounded-[34px]" style={{ padding: "clamp(44px,5vw,84px) clamp(24px,4vw,64px)" }}>
        <div className="flex justify-between items-end flex-wrap gap-5 mb-12">
          <div>
            <Reveal>
              <div className="text-label-l text-primary mb-4">Capabilities</div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-headline-l text-on-surface">
                Four pillars,
                <br />
                one operator.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[340px] text-body-m text-on-surface-variant">
              Most people do one of these. I run all four — and the seams between them are where the good work happens.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}>
          {PILLARS.map((p) => (
            <StaggerItem key={p.n}>
              <TiltCard className="h-full">
                <div className="relative bg-surface-container border border-outline rounded-xl p-7 min-h-[300px] flex flex-col elevation-2">
                  <div className={`w-13 h-13 rounded-2xl flex items-center justify-center ${SEED_BG[p.seed]}`} style={{ width: 52, height: 52 }}>
                    <IconSymbol name={p.icon} size={26} filled className={SEED_ON[p.seed]} />
                  </div>
                  <div className={`text-label-m mt-6 mb-2 ${SEED_TEXT[p.seed]}`}>Pillar {p.n}</div>
                  <h3 className="text-title-l text-on-surface mb-3.5" style={{ fontSize: 23 }}>
                    {p.title}
                  </h3>
                  <ul className="mt-auto mb-0 p-0 list-none flex flex-col gap-2.5 text-body-s text-on-surface-variant">
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
