import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { CraftSystem } from "@/components/CraftSystem";
import { Pillars } from "@/components/Pillars";
import { Method } from "@/components/Method";
import { Career } from "@/components/Career";
import { Companies } from "@/components/Companies";
import { WorkTeaser } from "@/components/WorkTeaser";
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
      <CraftSystem site={site} />
      <WorkTeaser projects={projects} />
      <Pillars />
      <Career cv={cv} />
      <Companies companies={companies} />
      <Method steps={method} />
      <SkillsMarquee tags={marqueeTags} skills={skills} />
      <Credentials certs={certs} site={site} />
      <ContactSection site={site} />
    </>
  );
}
