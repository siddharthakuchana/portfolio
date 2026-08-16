const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const projects = [
  {
    title: "AlignWell",
    category: "Computer Vision / AI / Fitness",
    summary: "An AI-powered exercise posture correction system that analyzes body posture using computer vision and provides real-time feedback to help users perform exercises with proper form.",
    content: "### AlignWell\n\nAn AI-powered exercise posture correction system using MediaPipe and OpenCV.",
    githubUrl: "https://github.com/USERNAME/alignwell",
    liveUrl: "",
    year: 2025,
    order: 1
  },
  {
    title: "AutoResultX",
    category: "Automation / Python / Selenium",
    summary: "An automation system designed to extract university results from dynamic web portals without manually entering every roll number.",
    content: "### AutoResultX\n\nAutomated extraction tool for bulk result data into Excel formats.",
    githubUrl: "https://github.com/USERNAME/autoresultx",
    liveUrl: "",
    year: 2025,
    order: 2
  },
  {
    title: "Career Guidance System",
    category: "AI / Machine Learning / Full Stack",
    summary: "A web-based career guidance platform that uses machine learning to recommend suitable career paths based on user skills and interests.",
    content: "### Career Guidance System\n\nML-powered career prediction platform.",
    githubUrl: "https://github.com/USERNAME/career-guidance",
    liveUrl: "",
    year: 2025,
    order: 3
  }
];

async function main() {
  console.log("Seeding database...");

  // Remove unwanted projects if they exist
  await prisma.project.deleteMany({
    where: {
      slug: {
        in: ["ai-powered-answer-evaluation-system", "ai-powered-answer-evaluation"]
      }
    }
  });

  // 1. Seed Admin
  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@example.com" },
    update: { name: "Siddhartha Kuchana" },
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
    },
    create: {
      id: "singleton",
      name: "Siddhartha Kuchana",
      displayName: "Siddhartha Kuchana",
      role: "AI & ML Undergraduate | Full-Stack Developer | AI Engineer",
      email: "siddhartha@example.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      resumeUrl: "/resume.pdf",
      footerText: "© 2026 Siddhartha Kuchana. All rights reserved.",
    },
  });

  // 3. Seed Projects
  for (const p of projects) {
    const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await prisma.project.upsert({
      where: { slug },
      update: {
        title: p.title,
        summary: p.summary,
        category: p.category,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        year: p.year,
        order: p.order,
        status: "PUBLISHED",
      },
      create: {
        title: p.title,
        slug,
        summary: p.summary,
        content: p.content,
        category: p.category,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        year: p.year,
        featured: true,
        status: "PUBLISHED",
        order: p.order,
      },
    });
  }

  console.log("Database seeded successfully with 3 projects!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
