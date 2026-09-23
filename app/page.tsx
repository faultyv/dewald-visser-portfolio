import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { CareerSummary } from "@/components/CareerSummary";
import { WorkTeaser } from "@/components/WorkTeaser";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { Credentials } from "@/components/Credentials";
import { ContactSection } from "@/components/ContactSection";
import { getSiteConfig, getCV, getSkills, getCerts, getMarqueeTags, getAllProjects } from "@/lib/content";

export default function Home() {
  const site = getSiteConfig();
  return (
    <div className="recruitment-home">
      <Hero site={site} />
      <CareerSummary cv={getCV()} />
      <WorkTeaser projects={getAllProjects()} />
      <About site={site} />
      <SkillsMarquee tags={getMarqueeTags()} skills={getSkills()} compact />
      <Credentials certs={getCerts()} site={site} />
      <ContactSection site={site} />
    </div>
  );
}
