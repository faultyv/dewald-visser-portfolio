import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Pillars } from "@/components/Pillars";
import { Career } from "@/components/Career";
import { WorkTeaser } from "@/components/WorkTeaser";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { Credentials } from "@/components/Credentials";
import { ContactSection } from "@/components/ContactSection";
import { getSiteConfig, getCV, getSkills, getCerts, getMarqueeTags, getAllProjects } from "@/lib/content";

export default function Home() {
  const site = getSiteConfig();
  const cv = getCV();
  const skills = getSkills();
  const certs = getCerts();
  const marqueeTags = getMarqueeTags();
  const projects = getAllProjects();

  return (
    <>
      <Hero site={site} />
      <About site={site} />
      <Pillars />
      <Career cv={cv} />
      <WorkTeaser projects={projects} />
      <SkillsMarquee tags={marqueeTags} skills={skills} />
      <Credentials certs={certs} site={site} />
      <ContactSection site={site} />
    </>
  );
}
