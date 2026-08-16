import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { portfolioData } from "../src/data/portfolio";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed Admin
  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Siddhartha Kuchana",
    },
  });

  // 2. Seed Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {
      name: "Siddhartha Kuchana",
      displayName: "Siddhartha Kuchana",
      role: portfolioData.role,
      email: portfolioData.socials.email,
      github: portfolioData.socials.github,
      linkedin: portfolioData.socials.linkedin,
      resumeUrl: portfolioData.socials.resume,
    },
    create: {
      id: "singleton",
      name: "Siddhartha Kuchana",
      displayName: "Siddhartha Kuchana",
      role: portfolioData.role,
      email: portfolioData.socials.email,
      github: portfolioData.socials.github,
      linkedin: portfolioData.socials.linkedin,
      resumeUrl: portfolioData.socials.resume,
      footerText: "© 2026 Siddhartha Kuchana. All rights reserved.",
    },
  });

  // 3. Seed Projects from portfolioData
  for (let i = 0; i < portfolioData.projects.length; i++) {
    const p = portfolioData.projects[i];
    const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    await prisma.project.upsert({
      where: { slug },
      update: {},
      create: {
        title: p.title,
        slug,
        summary: p.description,
        content: `### ${p.title}\n\n${p.description}\n\n#### Key Features:\n${p.features.map((f: string) => `- ${f}`).join("\n")}\n\n#### Case Study:\n- **Problem:** ${p.caseStudy.problem}\n- **Approach:** ${p.caseStudy.approach}\n- **Challenges:** ${p.caseStudy.challenges}\n- **Result:** ${p.caseStudy.result}`,
        category: p.category,
        githubUrl: p.githubLink,
        liveUrl: p.liveLink || null,
        year: 2025,
        featured: true,
        status: "PUBLISHED",
        order: i + 1,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
