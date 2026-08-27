import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: data.content,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        year: data.year,
        status: data.status,
        featured: data.featured,
      },
    });

    revalidatePath("/sk-portal-secret-994/projects");
    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidatePath("/projects");

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
