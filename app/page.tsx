import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { HiringArgument } from "@/components/HiringArgument";
import { CraftSystem } from "@/components/CraftSystem";
import { Pillars } from "@/components/Pillars";
import { Method } from "@/components/Method";
import { CareerExplorer } from "@/components/CareerExplorer";
import { BrandConstellation } from "@/components/BrandConstellation";
import { WorkTeaser } from "@/components/WorkTeaser";
import { ProofSnapshots } from "@/components/ProofSnapshots";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { Credentials } from "@/components/Credentials";
import { ContactSection } from "@/components/ContactSection";
import { getSiteConfig, getCV, getSkills, getCerts, getMarqueeTags, getAllProjects, getMethod, getCompanies } from "@/lib/content";

export default function Home() {
  const site = getSiteConfig();
  const cv = getCV();
  const skills = getSkills();
  const certs = getCerts();
  const marqueeTags = getMarqueeTags();
  const projects = getAllProjects();
  const method = getMethod();
  const companies = getCompanies();

  return (
    <>
      <Hero site={site} />
      <About site={site} />
      <HiringArgument cv={cv} projects={projects} companies={companies} />
      <CraftSystem site={site} />
      <WorkTeaser projects={projects} />
      <Pillars />
      <CareerExplorer cv={cv} />
      <ProofSnapshots site={site} />
      <BrandConstellation companies={companies} />
      <Method steps={method} />
      <SkillsMarquee tags={marqueeTags} skills={skills} />
      <Credentials certs={certs} site={site} />
      <ContactSection site={site} />
    </>
  );
}
