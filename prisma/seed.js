const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const projects = [
  {
    title: "AlignWell",
    category: "Computer Vision / AI / Fitness",
    summary: "An AI-powered posture assessment and exercise monitoring system using Python, FastAPI, MediaPipe, and OpenCV to analyze exercise movements and identify incorrect form in real time.",
    content: "### AlignWell\n\nAn AI-powered exercise posture correction system using MediaPipe and OpenCV.",
    githubUrl: "https://github.com/siddharthakuchana/alignwell",
    liveUrl: "",
    year: 2025,
    order: 1
  },
  {
    title: "Career Guidance System",
    category: "AI / Machine Learning / Full Stack",
    summary: "An ML-powered career recommendation system that predicts suitable career paths based on users' skills, interests, and academic preferences.",
    content: "### Career Guidance System\n\nML-powered career prediction platform.",
    githubUrl: "https://github.com/siddharthakuchana/career-guidance",
    liveUrl: "",
    year: 2025,
    order: 2
  },
  {
    title: "IoT Fire Evacuation System",
    category: "IoT / Sensor Fusion / A* Algorithm / Embedded",
    summary: "An IoT-based fire safety system that continuously monitors temperature, smoke, and flame sensor data to calculate localized hazard scores and compute dynamic evacuation routes using the A* algorithm.",
    content: "### IoT Fire Evacuation System\n\nReal-time hazard monitoring and dynamic pathfinding.",
    githubUrl: "https://github.com/siddharthakuchana/iot-fire-evacuation",
    liveUrl: "",
    year: 2025,
    order: 3
  },
  {
    title: "AutoResultX",
    category: "Automation / Python / Selenium",
    summary: "An automation system designed to extract university examination results from dynamic web portals automatically.",
    content: "### AutoResultX\n\nAutomated extraction tool for bulk result data into Excel formats.",
    githubUrl: "https://github.com/siddharthakuchana/autoresultx",
    liveUrl: "",
    year: 2025,
    order: 4
  }
];

async function main() {
  console.log("Seeding database...");
  if (process.env.DATABASE_URL?.includes("dev.db") || process.env.DATABASE_URL?.startsWith("file:")) {
    try {
      await prisma.$queryRawUnsafe("PRAGMA journal_mode = WAL;");
      await prisma.$queryRawUnsafe("PRAGMA busy_timeout = 5000;");
    } catch (pragErr) {
      // Ignored for non-sqlite
    }
  }

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
    update: { name: "Siddhartha Kuchana", password: hashedPassword },
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
      github: "https://github.com/siddharthakuchana",
      linkedin: "https://linkedin.com/in/siddharthakuchana",
      email: "siddharthakuchana0207@gmail.com",
      resumeUrl: "/resume.pdf",
    },
    create: {
      id: "singleton",
      name: "Siddhartha Kuchana",
      displayName: "Siddhartha Kuchana",
      role: "AI & ML Undergraduate | Full-Stack Developer | Machine Learning Engineer",
      email: "siddharthakuchana0207@gmail.com",
      github: "https://github.com/siddharthakuchana",
      linkedin: "https://linkedin.com/in/siddharthakuchana",
      resumeUrl: "/resume",
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
