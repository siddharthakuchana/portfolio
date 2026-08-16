import { prisma } from "@/lib/prisma";
import { portfolioData as fallbackData } from "@/data/portfolio";

export async function getPortfolioData() {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
    const dbProjects = await prisma.project.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { order: "asc" }
    });

    const formattedDbProjects = dbProjects.map((p) => ({
      ...p,
      description: p.summary || p.content,
      techStack: p.category ? p.category.split("/").map((s) => s.trim()) : ["AI/ML"],
      features: [],
      githubLink: p.githubUrl || "",
      liveLink: p.liveUrl || "",
      caseStudy: {
        problem: p.summary || p.content,
        approach: "Built modular system architecture focusing on high performance and clean code.",
        challenges: "Ensuring low latency and seamless user interaction.",
        result: "Delivered a fully functional production-ready project.",
      },
    }));

    if (!settings) {
      return {
        ...fallbackData,
        name: "Siddhartha Kuchana",
        profileImage: "/profile.jpg",
        projects: formattedDbProjects.length > 0 ? formattedDbProjects : fallbackData.projects,
      };
    }

    return {
      ...fallbackData,
      name: settings.displayName || settings.name || "Siddhartha Kuchana",
      role: settings.role || fallbackData.role,
      profileImage: settings.profileImage || "/profile.jpg",
      socials: {
        github: settings.github || fallbackData.socials.github,
        linkedin: settings.linkedin || fallbackData.socials.linkedin,
        email: settings.email || fallbackData.socials.email,
        resume: settings.resumeUrl || fallbackData.socials.resume,
      },
      projects: formattedDbProjects.length > 0 ? formattedDbProjects : fallbackData.projects,
    };
  } catch (error) {
    console.error("Failed to fetch from DB", error);
    return fallbackData;
  }
}
