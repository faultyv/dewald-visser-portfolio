import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { WorkGrid } from "@/components/WorkGrid";
import { WorkDocumentLibrary } from "@/components/WorkDocumentLibrary";
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
  const cards = projects.map(({ slug, title, org, categories, label, outcome, cover, coverBg, thumbnail, thumbnailAlt, thumbnailStyle, gallery, documents }) => ({ slug, title, org, categories, label, outcome, cover, coverBg, thumbnail, thumbnailAlt, thumbnailStyle, artworkCount: gallery?.filter(item => item.src).length ?? 0, documentCount: documents?.length ?? 0 }));
  const publications = projects.filter(project => project.documents?.length).map(project => ({ slug: project.slug, title: project.title, documents: project.documents!.map(({ title, pages, size }) => ({ title, pages, size })) }));

  return (
    <>
      <section className="relative px-5 md:px-14 max-w-[1300px] mx-auto pt-32 pb-8">
        <Reveal>
          <div className="text-label-l text-success mb-4">Selected Work</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-display-s text-on-surface max-w-[820px]">Work that proves <span className="text-gradient text-gradient-animated">the range.</span></h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-body-l text-on-surface-variant max-w-[620px] mt-5">
            Graphic design, websites and marketing — from the first idea to the final artwork. Explore a project to see the <span className="text-mark">complete collection.</span>
          </p>
        </Reveal>

      </section>

      <section className="relative px-5 md:px-14 max-w-[1300px] mx-auto pb-24">
        <WorkGrid projects={cards} />
        <WorkDocumentLibrary groups={publications} />
      </section>

      <Footer site={site} />
    </>
  );
}
