import { ArtworkImage } from "./ArtworkImage";
import type { ProjectDocument } from "@/lib/content";

export function ProjectDocuments({ documents }: { documents: ProjectDocument[] }) {
  return (
    <section id="documents" className="mb-14 scroll-mt-28">
      <div className="mb-6">
        <p className="text-label-l text-accent mb-2">Publications & print</p>
        <h2 className="text-headline-m text-on-surface">Explore the full documents.</h2>
        <p className="mt-3 text-body-m text-on-surface-variant">Open every page of the original artwork, or download a copy.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {documents.map((document) => (
          <article key={document.url} className="hig-card overflow-hidden rounded-2xl">
            <a href={document.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${document.title} PDF`} className="block bg-surface-container-low p-4">
              <ArtworkImage src={document.preview} alt={`${document.title} cover`} sizes="(max-width: 640px) 90vw, 480px" />
            </a>
            <div className="p-5">
              <h3 className="text-title-m text-on-surface">{document.title}</h3>
              <p className="mt-1 text-body-s text-on-surface-variant">PDF · {document.pages} pages · {document.size}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={document.url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-4 py-2 text-label-m text-on-primary" aria-label={`View ${document.title} PDF`}>View PDF ↗</a>
                <a href={document.url} download className="rounded-full border border-outline-variant px-4 py-2 text-label-m text-on-surface" aria-label={`Download ${document.title} PDF`}>Download PDF ↓</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
