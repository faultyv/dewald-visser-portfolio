import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { CareerRows } from "@/components/CareerSummary";
import { PrintCVButton } from "@/components/PrintCVButton";
import { getCV, getSiteConfig, getSkills, getCerts } from "@/lib/content";

export const metadata: Metadata = { title: "CV", description: "Dewald Visser’s career history, skills, education and contact details. Print or save as PDF.", alternates: { canonical: "/cv" } };

export default function CVPage() {
  const site = getSiteConfig();
  const certs = getCerts();
  return <div className="content-shell relative pt-32 pb-20 printable-cv">
    <div className="cv-print-toolbar mb-8 flex flex-wrap items-center gap-3"><ButtonLink href="/" variant="outlined">Back to portfolio</ButtonLink><PrintCVButton /><p className="w-full text-body-s text-on-surface-variant">Choose “Save as PDF” in your browser’s print dialog.</p></div>
    <header className="mb-8"><h1 className="text-headline-l text-on-surface">{site.name}</h1><p className="mt-2 text-title-l text-primary">{site.role}</p><p className="mt-3 text-body-m text-on-surface-variant">{site.location} · <a href={`mailto:${site.email}`}>{site.email}</a></p><p className="text-body-m text-on-surface-variant"><a href={site.socials.linkedin}>{site.socials.linkedin}</a></p></header>
    <section className="cv-print-section"><h2 className="text-headline-s text-on-surface">Profile</h2><p className="mt-3 text-body-m text-on-surface-variant">{site.aboutBody}</p></section>
    <section className="cv-print-section"><h2 className="text-headline-s text-on-surface">Experience</h2><CareerRows entries={getCV()} compact /></section>
    <section className="cv-print-section"><h2 className="text-headline-s text-on-surface">Skills &amp; tools</h2>{getSkills().map((skill) => <p key={skill.title} className="mt-3 text-body-m text-on-surface-variant"><strong>{skill.title}:</strong> {skill.items.join("; ")}</p>)}</section>
    <section className="cv-print-section"><h2 className="text-headline-s text-on-surface">Education &amp; credentials</h2><p className="mt-3 text-body-m text-on-surface-variant">{site.education}</p><ul className="mt-3 space-y-2 text-body-m text-on-surface-variant">{[...certs.featured, ...certs.additional].map((cert) => <li key={cert.title}>{cert.title} — {cert.issuer}</li>)}</ul><p className="mt-4 text-body-m text-on-surface-variant"><strong>Languages:</strong> {site.languages.join(" · ")}</p></section>
  </div>;
}
