import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET: Fetch all media items with safe fallback
export async function GET() {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, media });
  } catch (error: any) {
    console.error("Error fetching media:", error);
    // Safe fallback attempt if category column is missing or DB issue
    try {
      const rawMedia = await prisma.$queryRaw`SELECT * FROM "Media" ORDER BY "createdAt" DESC`;
      return NextResponse.json({ success: true, media: rawMedia });
    } catch (rawErr) {
      return NextResponse.json({ success: true, media: [] });
    }
  }
}

// PATCH: Update media category (NORMAL vs PROJECT)
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, category } = await req.json();
    if (!id || !category) {
      return NextResponse.json({ error: "Missing id or category" }, { status: 400 });
    }

    const updated = await prisma.media.update({
      where: { id },
      data: { category: category === "PROJECT" ? "PROJECT" : "NORMAL" },
    });

    revalidatePath("/sk-portal-secret-994/media", "page");
    revalidatePath("/", "page");

    return NextResponse.json({ success: true, media: updated });
  } catch (error: any) {
    console.error("Error updating media category:", error);
    return NextResponse.json({ error: "Failed to update media category" }, { status: 500 });
  }
}

// DELETE: Remove media item and local file
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing media ID" }, { status: 400 });
    }

    const item = await prisma.media.findUnique({ where: { id } });
    if (!item) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Try deleting physical file if local upload
    if (item.url.startsWith("/uploads/")) {
      try {
        const filepath = path.join(process.cwd(), "public", item.url);
        await unlink(filepath);
      } catch (err) {
        // File may already be removed or missing
      }
    }

    await prisma.media.delete({ where: { id } });

    revalidatePath("/sk-portal-secret-994/media", "page");
    revalidatePath("/", "page");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting media:", error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
