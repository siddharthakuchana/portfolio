"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function saveTechnology(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const icon = formData.get("icon") as string;
  const description = formData.get("description") as string;
  const featured = formData.get("featured") === "on";
  
  if (id) {
    await prisma.technology.update({
      where: { id },
      data: { name, slug, category, icon, description, featured },
    });
  } else {
    await prisma.technology.create({
      data: { name, slug, category, icon, description, featured },
    });
  }

  revalidatePath("/admin/technologies");
  redirect("/admin/technologies");
}
