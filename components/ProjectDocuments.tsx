import { ArtworkImage } from "./ArtworkImage";
import type { ProjectDocument } from "@/lib/content";

function DocumentLinks({ title, part }: { title: string; part: { label: string; url: string; size: string } }) {
  return <div>
    {part.label && <p className="mb-2 text-body-s text-on-surface-variant">{part.label} · {part.size}</p>}
    <div className="flex flex-wrap gap-3">
      <a href={part.url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-4 py-2 text-label-m text-on-primary" aria-label={`View ${title} ${part.label} PDF`}>View PDF ↗</a>
      <a href={part.url} download className="rounded-full border border-outline-variant px-4 py-2 text-label-m text-on-surface" aria-label={`Download ${title} ${part.label} PDF`}>Download PDF ↓</a>
    </div>
  </div>;
}

export function ProjectDocuments({ documents }: { documents: ProjectDocument[] }) {
  return (
    <section id="documents" className="mb-14 scroll-mt-28">
      <div className="mb-6">
        <p className="text-label-l text-accent mb-2">Publications & print</p>
        <h2 className="text-headline-m text-on-surface">Explore the full documents.</h2>
        <p className="mt-3 text-body-m text-on-surface-variant">Every page is available. Open a web copy or download the parts you want to explore.</p>
      </div>
      <div className="grid items-start gap-5 sm:grid-cols-2">
        {documents.map((document) => {
          const parts = document.parts ?? [{ label: "", url: document.url, size: document.size }];
          return <article key={document.url} className="hig-card overflow-hidden rounded-2xl">
            <a href={document.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${document.title} PDF`} className="block bg-surface-container-low p-4">
              <ArtworkImage src={document.preview} alt={`${document.title} cover`} sizes="(max-width: 640px) 90vw, 480px" />
            </a>
            <div className="p-5">
              <h3 className="text-title-m text-on-surface">{document.title}</h3>
              <p className="mt-1 text-body-s text-on-surface-variant">PDF · {document.pages} {document.pages === 1 ? "page" : "pages"} · {document.size}</p>
              <div className="mt-4"><DocumentLinks title={document.title} part={parts[0]} /></div>
              {parts.length > 1 && <details className="mt-5 border-t border-outline-variant pt-4">
                <summary className="cursor-pointer text-label-m text-on-surface">Explore all {parts.length} parts</summary>
                <div className="mt-4 grid gap-5">{parts.slice(1).map(part => <DocumentLinks key={part.url} title={document.title} part={part} />)}</div>
              </details>}
            </div>
          </article>;
        })}
      </div>
    </section>
  );
}
