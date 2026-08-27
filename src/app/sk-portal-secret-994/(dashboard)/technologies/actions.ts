"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function saveTechnology(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/sk-portal-secret-994/login");
    }

    const id = formData.get("id") as string | null;
    const name = (formData.get("name") as string) || "Technology";
    const rawSlug = (formData.get("slug") as string) || name;
    const slug = rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const category = (formData.get("category") as string) || "Other";
    const icon = (formData.get("icon") as string) || "";
    const description = (formData.get("description") as string) || "";
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

    revalidatePath("/sk-portal-secret-994/technologies");
    revalidatePath("/");
  } catch (error) {
    console.error("Error saving technology:", error);
  }

  redirect("/sk-portal-secret-994/technologies");
}
