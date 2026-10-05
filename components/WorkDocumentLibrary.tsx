"use client";

import { useState } from "react";
import Link from "next/link";
import { IconSymbol } from "./IconSymbol";
import type { ProjectDocument } from "@/lib/content";

export type WorkPublicationGroup = { slug: string; title: string; documents: Pick<ProjectDocument, "title" | "pages" | "size">[] };

export function WorkDocumentLibrary({ groups }: { groups: WorkPublicationGroup[] }) {
  const [query, setQuery] = useState("");
  const search = query.trim().toLocaleLowerCase();
  const filtered = groups.map(group => ({ ...group, documents: group.documents.filter(document => !search || `${group.title} ${document.title}`.toLocaleLowerCase().includes(search)) })).filter(group => group.documents.length);
  const total = groups.reduce((count, group) => count + group.documents.length, 0);
  return <section id="publications" className="work-library scroll-mt-28" aria-labelledby="publications-heading">
    <div className="work-library-header">
      <div>
        <p className="text-label-l text-primary mb-3">The publication library</p>
        <h2 id="publications-heading" className="text-headline-m text-on-surface">Go beyond the cover.</h2>
        <p className="text-body-m text-on-surface-variant mt-3 max-w-[580px]">{total} publications, company profiles and print projects. Open a collection to find the full PDFs and their download options.</p>
      </div>
      <a href="#projects" className="text-label-l text-primary">Back to artwork ↑</a>
    </div>
    <div className="work-search mb-5">
      <IconSymbol name="search" size={20} />
      <label htmlFor="publication-search" className="sr-only">Search publications</label>
      <input id="publication-search" type="search" placeholder="Find a publication or client" value={query} onChange={event => setQuery(event.target.value)} />
    </div>
    <p className="sr-only" role="status">{filtered.reduce((count, group) => count + group.documents.length, 0)} publications found</p>
    <div className="work-library-grid">
      {filtered.map(group => <details key={`${group.slug}-${Boolean(search)}`} open={search ? true : undefined} className="work-library-group">
        <summary><span>{group.title}</span><span className="work-library-count">{group.documents.length} PDF{group.documents.length === 1 ? "" : "s"}</span><IconSymbol name="expand_more" size={20} /></summary>
        <ul className="work-library-documents">
          {group.documents.map(document => <li key={document.title}><span>{document.title}</span><span className="text-body-s text-on-surface-variant">{document.pages} page{document.pages === 1 ? "" : "s"} · {document.size}</span></li>)}
        </ul>
        <Link href={`/work/${group.slug}#documents`} prefetch={false} className="work-library-link">Open PDFs & downloads <IconSymbol name="arrow_forward" size={16} /></Link>
      </details>)}
    </div>
    {!filtered.length && <div className="work-empty"><p>No matching publications.</p><button type="button" className="text-primary mt-3" onClick={() => setQuery("")}>Clear search</button></div>}
  </section>;
}
