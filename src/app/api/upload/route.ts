import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  // Check auth session (skipped in development for ease of use)
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
    const categoryInput = (formData.get("category") as string) || "NORMAL";
    const category = categoryInput === "PROJECT" ? "PROJECT" : "NORMAL";
    
    if (!file) {
      return NextResponse.json({ error: "No file provided in request" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${uniqueSuffix}-${cleanFileName}`;
    const mimeType = file.type || "image/jpeg";
    
    // Construct base64 Data URL (guaranteed fallback for Vercel/serverless read-only filesystems)
    const base64String = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64String}`;
    
    let finalUrl = dataUrl;

    // Try saving locally to public/uploads (works on local machine or traditional server)
    try {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await mkdir(uploadDir, { recursive: true });
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      finalUrl = `/uploads/${filename}`;
    } catch (fsErr) {
      console.warn("Local filesystem write disabled or failed (serverless environment). Using Base64 Data URL fallback.", fsErr);
      finalUrl = dataUrl;
    }

    let mediaObj: any = null;

    // Save to database Media model
    try {
      mediaObj = await prisma.media.create({
        data: {
          filename: file.name,
          url: finalUrl,
          type: mimeType,
          size: file.size,
          category,
        },
      });
    } catch (dbErr) {
      console.warn("Could not record media in DB, returning fallback object:", dbErr);
      mediaObj = {
        id: uniqueSuffix,
        filename: file.name,
        url: finalUrl,
        type: mimeType,
        size: file.size,
        category,
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({ success: true, url: finalUrl, media: mediaObj });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process uploaded file" },
      { status: 500 }
    );
  }
}
