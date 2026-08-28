import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import CaseStudies from "@/components/sections/CaseStudies";
import Journey from "@/components/sections/Journey";
import MediaGallery from "@/components/sections/MediaGallery";
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
  mediaGallery: MediaGallery,
  achievements: Achievements,
  github: GithubSection,
  currentlyExploring: CurrentlyExploring,
  contact: Contact,
};

// Default order: mediaGallery comes directly after journey
const defaultSections = [
  { type: "hero", enabled: true },
  { type: "about", enabled: true },
  { type: "skills", enabled: true },
  { type: "projects", enabled: true },
  { type: "caseStudies", enabled: true },
  { type: "journey", enabled: true },
  { type: "mediaGallery", enabled: true },
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
      // Ensure mediaGallery is placed right after journey if not already present
      const hasMediaGallery = dbSections.some((s) => s.type === "mediaGallery");
      if (!hasMediaGallery) {
        const journeyIndex = dbSections.findIndex((s) => s.type === "journey");
        if (journeyIndex !== -1) {
          dbSections.splice(journeyIndex + 1, 0, { id: "media-gallery-section", type: "mediaGallery", title: "Media Gallery", subtitle: null, order: journeyIndex + 1, enabled: true });
        } else {
          dbSections.push({ id: "media-gallery-section", type: "mediaGallery", title: "Media Gallery", subtitle: null, order: 99, enabled: true });
        }
      }
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
