import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

function getResolvedDatabaseUrl(): string {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("dev.db") && !process.env.DATABASE_URL.startsWith("file:")) {
    return process.env.DATABASE_URL;
  }

  // Traversal search for prisma/dev.db from current working directory up to 5 parent levels
  let currentDir = process.cwd();
  for (let i = 0; i < 5; i++) {
    const candidate = path.join(currentDir, "prisma", "dev.db");
    if (fs.existsSync(candidate)) {
      const normalizedPath = candidate.replace(/\\/g, "/");
      return `file:${normalizedPath}`;
    }
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }

  return "file:./prisma/dev.db";
}

process.env.DATABASE_URL = getResolvedDatabaseUrl();

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;




