import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { WorkGrid } from "@/components/WorkGrid";
import { Footer } from "@/components/Footer";
import { getAllProjects, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects across marketing, web, brand and systems - the proof behind the pillars.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work - Dewald Visser",
    description: "Selected projects across marketing, web, brand and systems - the proof behind the pillars.",
    url: "/work",
  },
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
          <h1 className="text-display-s text-on-surface max-w-[820px]">Work that proves <span className="text-gradient text-gradient-animated">the range.</span></h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-body-l text-on-surface-variant max-w-[620px] mt-5">
            {projects.length} projects across marketing, web, brand and systems. Filter by discipline, then dive into the <span className="text-mark">evidence behind each result.</span>
          </p>
        </Reveal>
        <div className="mt-7 rounded-2xl border border-outline-variant bg-surface-container-low p-5">
          <p className="text-label-l text-on-surface">Browse the full PDFs</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {projects.filter((project) => project.documents?.length).map((project) => (
              <a key={project.slug} href={`/work/${project.slug}#documents`} className="rounded-full border border-outline-variant px-4 py-2 text-label-m text-primary">{project.title} · {project.documents!.length} PDF{project.documents!.length > 1 ? "s" : ""} ↗</a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 md:px-14 max-w-[1300px] mx-auto pb-24">
        <WorkGrid projects={projects} />
      </section>

      <Footer site={site} />
    </>
  );
}
