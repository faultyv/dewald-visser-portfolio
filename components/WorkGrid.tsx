"use client";

import { useState } from "react";
import Link from "next/link";
import { IconSymbol } from "./IconSymbol";
import { ProjectCoverVisual } from "./ProjectCoverVisual";
import type { Project } from "@/lib/content";

export type WorkCardProject = Pick<Project, "slug" | "title" | "org" | "categories" | "label" | "outcome" | "cover" | "coverBg" | "thumbnail" | "thumbnailAlt" | "thumbnailStyle"> & { artworkCount: number; documentCount: number };

const FILTERS = [
  { id: "all", label: "All work" },
  { id: "brand", label: "Graphic & brand" },
  { id: "web", label: "Web & digital" },
  { id: "marketing", label: "SEO & marketing" },
  { id: "freelance", label: "Freelance" },
] as const;

function ProjectCard({ project }: { project: WorkCardProject }) {
  return <article className="work-card hig-card">
    <Link href={`/work/${project.slug}`} prefetch={false} className="work-card-link group">
      <ProjectCoverVisual project={project} variant="card" sizes="(max-width:640px) 92vw, (max-width:1100px) 44vw, 380px" />
      <div className="work-card-copy">
        <p className="text-label-s text-primary mb-2">{project.label}</p>
        <h3 className="text-title-l text-on-surface">{project.title}</h3>
        {!project.title.toLocaleLowerCase().includes(project.org.toLocaleLowerCase()) && <p className="text-body-s text-on-surface-variant mt-2">{project.org}</p>}
        <p className="text-body-m text-on-surface-variant mt-3">{project.outcome}</p>
        <div className="work-card-footer">
          <span className="text-label-m text-primary inline-flex items-center gap-2">View project <IconSymbol name="arrow_forward" size={16} className="transition-transform group-hover:translate-x-1" /></span>
          <span className="text-body-s text-on-surface-variant">{[
            project.artworkCount > 0 ? `${project.artworkCount} artwork${project.artworkCount === 1 ? "" : "s"}` : null,
            project.documentCount > 0 ? `${project.documentCount} PDF${project.documentCount === 1 ? "" : "s"}` : null,
          ].filter(Boolean).join(" · ")}</span>
        </div>
      </div>
    </Link>
  </article>;
}

export function WorkGrid({ projects }: { projects: WorkCardProject[] }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const search = query.trim().toLocaleLowerCase();
  const filtered = projects.filter(project => (filter === "all" || project.categories.includes(filter)) &&
    (!search || `${project.title} ${project.org} ${project.label} ${project.outcome}`.toLocaleLowerCase().includes(search)));
  const active = filter !== "all" || Boolean(query);
  const reset = () => { setFilter("all"); setQuery(""); };
  const collections = [
    { id: "freelance", title: "Freelance graphic & web design", description: "Independent client work across identities, publications and websites.", projects: filtered.filter(project => project.categories.includes("freelance")) },
    { id: "client-work", title: "Agency, in-house & venture work", description: "Brand campaigns, publications and digital systems delivered with teams and businesses.", projects: filtered.filter(project => !project.categories.includes("freelance")) },
  ];

  return <div id="projects" className="scroll-mt-28">
    <nav aria-label="Work collections" className="work-quick-links">
      {[["freelance", "Freelance work"], ["client-work", "Agency & in-house"]].map(([id, label]) => <a key={id} href={`#${id}`} onClick={event => {
        event.preventDefault();
        reset();
        requestAnimationFrame(() => {
          window.history.replaceState(null, "", `#${id}`);
          const target = document.getElementById(id);
          target?.scrollIntoView({ behavior: "instant", block: "start" });
          target?.focus({ preventScroll: true });
        });
      }}>{label} ↓</a>)}
      <a href="#publications">PDF library <span>{projects.reduce((count, project) => count + project.documentCount, 0)}</span> ↗</a>
    </nav>
    <div className="work-browser" aria-label="Browse projects">
      <div className="work-search">
        <IconSymbol name="search" size={20} />
        <label htmlFor="project-search" className="sr-only">Search projects or clients</label>
        <input id="project-search" type="search" placeholder="Search projects or clients" value={query} onChange={event => setQuery(event.target.value)} />
      </div>
      <div className="work-filters" role="group" aria-label="Filter projects by discipline">
        {FILTERS.map(item => <button key={item.id} type="button" onClick={() => setFilter(item.id)} aria-pressed={filter === item.id} className="work-filter">
          {item.label}<span>{item.id === "all" ? projects.length : projects.filter(project => project.categories.includes(item.id)).length}</span>
        </button>)}
      </div>
    </div>
    <div className="work-results">
      <p className="text-body-s text-on-surface-variant" role="status">{active ? `${filtered.length} of ${projects.length} projects` : `${projects.length} projects · complete artwork inside each project`}</p>
      {active && <button type="button" className="text-label-m text-primary" onClick={reset}>Clear filters</button>}
    </div>
    {collections.filter(collection => collection.projects.length).map(collection => <section key={collection.id} id={collection.id} className="work-collection scroll-mt-28" tabIndex={-1} aria-labelledby={`${collection.id}-heading`}>
      <div className="work-collection-heading">
        <div>
          <h2 id={`${collection.id}-heading`} className="text-headline-s text-on-surface">{collection.title}</h2>
          <p className="text-body-m text-on-surface-variant mt-2">{collection.description}</p>
        </div>
        <span className="work-collection-count text-label-m text-on-surface-variant">{collection.projects.length} project{collection.projects.length === 1 ? "" : "s"}</span>
      </div>
      <div className="portfolio-work-grid">{collection.projects.map(project => <ProjectCard key={project.slug} project={project} />)}</div>
    </section>)}
    {filtered.length === 0 && <div className="work-empty">
      <h2 className="text-title-l text-on-surface">No matching projects</h2>
      <p className="text-body-m text-on-surface-variant mt-2">Try a client name or choose another discipline.</p>
      <button type="button" onClick={reset} className="hig-control mt-5 rounded-full px-5 py-3 text-primary">Show all work</button>
    </div>}
  </div>;
}
