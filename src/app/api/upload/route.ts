import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  // Check auth session
  const session = await getServerSession(authOptions);
  if (!session && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Unauthorized. Please log in at /sk-portal-secret-994/login first." },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided in request" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${uniqueSuffix}-${cleanFileName}`;
    
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    // Ensure upload directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {}

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    
    const url = `/uploads/${filename}`;
    let mediaObj: any = null;

    // Try saving to database Media model
    try {
      mediaObj = await prisma.media.create({
        data: {
          filename: file.name,
          url,
          type: file.type || "image/jpeg",
          size: file.size,
        },
      });
    } catch (dbErr) {
      console.warn("Could not record media in DB, returning fallback object:", dbErr);
      mediaObj = {
        id: uniqueSuffix,
        filename: file.name,
        url,
        type: file.type || "image/jpeg",
        size: file.size,
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({ success: true, url, media: mediaObj });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process uploaded file" },
      { status: 500 }
    );
  }
}
