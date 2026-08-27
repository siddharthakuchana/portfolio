import { PrismaClient } from "@prisma/client";
import path from "path";

// Resolve absolute path to SQLite database with normalized forward slashes for Windows compatibility
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("dev.db")) {
  const dbPath = path.join(process.cwd(), "prisma", "dev.db").replace(/\\/g, "/");
  process.env.DATABASE_URL = `file:${dbPath}`;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

