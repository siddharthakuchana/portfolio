"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function saveBlogPost(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) throw new Error("Unauthorized");
  
  // @ts-ignore
  const authorId = session.user.id;

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const status = formData.get("status") as string;
  const readingTime = parseInt(formData.get("readingTime") as string) || 5;
  const featured = formData.get("featured") === "on";
  
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
        authorId 
      },
    });
  }

  revalidatePath("/sk-portal-secret-994/blog");
  redirect("/sk-portal-secret-994/blog");
}
