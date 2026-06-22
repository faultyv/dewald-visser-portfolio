import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Reveal } from "@/components/Reveal";
import { ProjectHeroMedia } from "@/components/ProjectHeroMedia";
import { ProjectMiniNav } from "@/components/ProjectMiniNav";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectVideo } from "@/components/ProjectVideo";
import { ProjectPager } from "@/components/ProjectPager";
import { ExternalLinks } from "@/components/ExternalLinks";
import { Footer } from "@/components/Footer";
import { mdxComponents } from "@/components/MdxComponents";
import { SEED_TEXT, SEED_CONTAINER_BG, SEED_CONTAINER_TEXT } from "@/lib/seed-classes";
import { getAllProjects, getProjectBySlug, getAdjacentProjects, getSiteConfig } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const url = `/work/${project.slug}`;
  return {
    title: project.title,
    description: project.outcome,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — Dewald Visser`,
      description: project.outcome,
      url,
      type: "article",
      images: project.cover ? [{ url: project.cover, alt: project.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Dewald Visser`,
      description: project.outcome,
      images: project.cover ? [project.cover] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const site = getSiteConfig();
  const { prev, next } = getAdjacentProjects(slug);
  const { content } = await compileMDX({ source: project.content, components: mdxComponents });
  const gallery = project.gallery.filter((item) => item.src);

  const projectUrl = `${SITE_URL}/work/${project.slug}`;
  const createdYear = project.period.match(/\b(?:19|20)\d{2}\b/)?.[0];
  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.outcome,
    url: projectUrl,
    ...(project.cover ? { image: new URL(project.cover, SITE_URL).toString() } : {}),
    ...(createdYear ? { dateCreated: createdYear } : {}),
    creator: { "@type": "Person", name: site.name, url: SITE_URL },
    ...(project.org ? { sourceOrganization: { "@type": "Organization", name: project.org } } : {}),
    keywords: [...project.stack, ...project.categories].join(", "),
    inLanguage: "en",
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
      { "@type": "ListItem", position: 3, name: project.title, item: projectUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <article className="relative px-5 md:px-14 max-w-[1100px] mx-auto pt-32">
        <Reveal>
          <ProjectHeroMedia cover={project.cover} title={project.title} seed={project.seed} coverFit={project.coverFit} coverBg={project.coverBg} />
        </Reveal>

        <Reveal delay={0.05} className="mt-8">
          <div className={`text-label-l mb-3.5 ${SEED_TEXT[project.seed]}`}>
            {project.label} &nbsp;·&nbsp; {project.period}
          </div>
          <h1 className="text-headline-l text-on-surface mb-2">{project.title}</h1>
          <div className="text-body-m text-on-surface-variant mb-7">
            {project.org} · {project.tools}
          </div>
          <p className="mb-7 max-w-[680px] text-body-l text-on-surface md:text-title-l">
            {project.outcome}
          </p>

          {project.links && <ExternalLinks links={project.links} seed={project.seed} />}
        </Reveal>

        {project.metrics.length > 0 && (
          <Reveal delay={0.1}>
            <div className="flex gap-3 flex-wrap mb-9">
              {project.metrics.map((m) => (
                <div key={m.label} className="flex-1 min-w-[150px] bg-surface-container-low rounded-2xl px-5 py-4.5">
                  <div className={`text-title-l font-bold ${SEED_TEXT[project.seed]}`} style={{ fontSize: 22 }}>
                    {m.value}
                  </div>
                  <div className="text-body-s text-on-surface-variant mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </article>

      <div id="overview" className="px-5 md:px-14 max-w-[1100px] mx-auto">
        <ProjectMiniNav hasGallery={gallery.length > 0} />
      </div>

      <article className="relative px-5 md:px-14 max-w-[1100px] mx-auto">
        <Reveal>
          <div className="mb-9">{content}</div>
        </Reveal>

        {gallery.length > 0 && (
          <div id="gallery" className="scroll-mt-24">
            <div className="text-label-l text-on-surface-variant mb-4">Gallery</div>
            <ProjectGallery gallery={gallery} />
          </div>
        )}

        {project.video && (
          <Reveal>
            <div className="text-label-l text-on-surface-variant mb-4">Video</div>
            <ProjectVideo url={project.video} title={project.title} />
          </Reveal>
        )}

        {project.brands && project.brands.length > 0 && (
          <Reveal>
            <div className="text-label-l text-on-surface-variant mb-4">Brands worked on</div>
            <div className="flex flex-wrap gap-2.5 mb-10">
              {project.brands.map((brand) => (
                <span key={brand} className="hig-control text-label-l px-4 py-2 rounded-full text-on-surface">
                  {brand}
                </span>
              ))}
            </div>
          </Reveal>
        )}

        <div id="stack" className="scroll-mt-24">
          <Reveal>
            <div className="text-label-l text-on-surface-variant mb-4">Stack</div>
            <div className="flex flex-wrap gap-2.5 mb-12">
              {project.stack.map((tool) => (
                <span key={tool} className={`text-label-l px-4 py-2 rounded-full ${SEED_CONTAINER_BG[project.seed]} ${SEED_CONTAINER_TEXT[project.seed]}`}>
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <ProjectPager prev={prev} next={next} />
        </Reveal>
      </article>

      <Footer site={site} />
    </>
  );
}
