import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import CaseStudies from "@/components/sections/CaseStudies";
import Journey from "@/components/sections/Journey";
import Achievements from "@/components/sections/Achievements";
import GithubSection from "@/components/sections/Github";
import CurrentlyExploring from "@/components/sections/CurrentlyExploring";
import Contact from "@/components/sections/Contact";
import { prisma } from "@/lib/prisma";

const sectionMap: Record<string, React.FC> = {
  hero: Hero,
  about: About,
  skills: Skills,
  projects: Projects,
  caseStudies: CaseStudies,
  journey: Journey,
  achievements: Achievements,
  github: GithubSection,
  currentlyExploring: CurrentlyExploring,
  contact: Contact,
};

// Default order in case the DB is empty
const defaultSections = [
  { type: "hero", enabled: true },
  { type: "about", enabled: true },
  { type: "skills", enabled: true },
  { type: "projects", enabled: true },
  { type: "caseStudies", enabled: true },
  { type: "journey", enabled: true },
  { type: "achievements", enabled: true },
  { type: "github", enabled: true },
  { type: "currentlyExploring", enabled: true },
  { type: "contact", enabled: true },
];

export default async function Home() {
  let sections;
  
  try {
    const dbSections = await prisma.homepageSection.findMany({
      orderBy: { order: "asc" }
    });
    
    if (dbSections.length > 0) {
      sections = dbSections;
    } else {
      sections = defaultSections;
    }
  } catch (error) {
    sections = defaultSections;
  }

  return (
    <>
      {sections.filter(s => s.enabled).map((section, index) => {
        const Component = sectionMap[section.type];
        if (!Component) return null;
        return <Component key={`${section.type}-${index}`} />;
      })}
    </>
  );
}
