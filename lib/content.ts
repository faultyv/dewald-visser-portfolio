import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { SeedName } from "./m3-theme";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type SiteConfig = {
  name: string;
  role: string;
  location: string;
  languages: string[];
  email: string;
  availability: string;
  tags: string[];
  heroPosition: string;
  aboutHeadline: string;
  aboutBody: string;
  stats: { value: number; suffix: string; label: string }[];
  buildingWith: string[];
  whatsapp?: { number?: string; url?: string; message?: string };
  socials: { linkedin: string; behance: string; instagram: string; x: string; website: string; whatsapp?: string };
  education: string;
};

export type ProofItem = {
  type: string;
  title: string;
  detail: string;
};

export type CVEntry = {
  date: string;
  role: string;
  org: string;
  brandMark?: string;
  brandColor?: SeedName;
  tags: string[];
  detail: string;
  software?: string[];
  proof?: ProofItem[];
};

export type MethodStep = {
  title: string;
  kicker: string;
  seed: SeedName;
  body: string;
};

export type CompanySocial = { kind: "instagram" | "facebook"; url: string };

export type CompanyEntry = {
  name: string;
  mark: string;
  seed: SeedName;
  relationship: string;
  discipline: string;
  period: string;
  url?: string;
  socials?: CompanySocial[];
};

export type SkillColumn = {
  title: string;
  seed: SeedName;
  items: string[];
};

export type FeaturedCert = {
  id: string;
  title: string;
  issuer: string;
  image: string;
  seed: SeedName;
};

export type AdditionalCert = { title: string; issuer: string };

export type CertsData = {
  featured: FeaturedCert[];
  additional: AdditionalCert[];
};

export type ProjectMetric = { value: string; label: string };
export type GalleryItem = { id: string; label: string; src?: string };
export type ProjectLink = { label: string; url: string };

export type ProjectFrontmatter = {
  title: string;
  org: string;
  period: string;
  categories: string[];
  label: string;
  tools: string;
  outcome: string;
  seed: SeedName;
  cover: string | null;
  coverFit?: "cover" | "contain";
  order: number;
  metrics: ProjectMetric[];
  stack: string[];
  gallery: GalleryItem[];
  video: string | null;
  links?: ProjectLink[];
  brands?: string[];
};

export type Project = ProjectFrontmatter & { slug: string; content: string };

function readJSON<T>(file: string): T {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

export function getSiteConfig(): SiteConfig {
  return readJSON<SiteConfig>("site.json");
}

export function getCV(): CVEntry[] {
  return readJSON<CVEntry[]>("cv.json");
}

export function getMethod(): MethodStep[] {
  return readJSON<MethodStep[]>("method.json");
}

export function getCompanies(): CompanyEntry[] {
  return readJSON<CompanyEntry[]>("companies.json");
}

export function getSkills(): SkillColumn[] {
  return readJSON<SkillColumn[]>("skills.json");
}

export function getCerts(): CertsData {
  return readJSON<CertsData>("certs.json");
}

export function getMarqueeTags(): string[] {
  return readJSON<string[]>("marquee.json");
}

const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  const projects = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return { ...(data as ProjectFrontmatter), slug, content };
  });
  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const all = getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];
  return { prev, next };
}
