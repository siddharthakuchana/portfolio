"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function saveBlogPost(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      redirect("/sk-portal-secret-994/login");
    }

    const id = formData.get("id") as string | null;
    const title = (formData.get("title") as string) || "Untitled Post";
    const rawSlug = (formData.get("slug") as string) || title;
    const slug = rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const excerpt = (formData.get("excerpt") as string) || "";
    const content = (formData.get("content") as string) || "";
    const status = (formData.get("status") as string) || "DRAFT";
    const readingTime = parseInt(formData.get("readingTime") as string) || 5;
    const featured = formData.get("featured") === "on";

    // Guarantee valid Admin record exists in database for authorId foreign key constraint
    let admin = await prisma.admin.findFirst();
    if (!admin) {
      admin = await prisma.admin.create({
        data: {
          email: session.user.email || "admin@example.com",
          name: session.user.name || "Siddhartha Kuchana",
          password: "password123",
        },
      });
    }

    const authorId = admin.id;

    if (id) {
      await prisma.blogPost.update({
        where: { id },
        data: { title, slug, excerpt, content, status, readingTime, featured },
      });
    } else {
      await prisma.blogPost.create({
        data: {
          title,
          slug,
          excerpt,
          content,
          status,
          readingTime,
          featured,
          authorId,
        },
      });
    }

    revalidatePath("/sk-portal-secret-994/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
  } catch (error) {
    console.error("Error saving blog post:", error);
  }

  redirect("/sk-portal-secret-994/blog");
}
