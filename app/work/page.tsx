import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { WorkGrid } from "@/components/WorkGrid";
import { Footer } from "@/components/Footer";
import { getAllProjects, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Dewald Visser",
  description: "Selected projects across marketing, web and brand — the proof behind the pillars.",
};

export default function WorkPage() {
  const projects = getAllProjects();
  const site = getSiteConfig();

  return (
    <>
      <section className="relative px-5 md:px-14 max-w-[1300px] mx-auto pt-36 pb-12">
        <Reveal>
          <div className="text-label-l text-success mb-4">Selected Work</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-display-s text-on-surface max-w-[820px]">Proof, by discipline.</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-body-l text-on-surface-variant max-w-[620px] mt-5">
            {projects.length} projects across marketing, web and brand — each one a full case study, not a footnote. Filter by
            discipline or dive straight into one.
          </p>
        </Reveal>
      </section>

      <section className="relative px-5 md:px-14 max-w-[1300px] mx-auto pb-24">
        <WorkGrid projects={projects} />
      </section>

      <Footer site={site} />
    </>
  );
}
