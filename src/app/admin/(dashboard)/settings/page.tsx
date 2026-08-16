import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });

  async function updateSettings(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const displayName = formData.get("displayName") as string;
    const role = formData.get("role") as string;
    const email = formData.get("email") as string;
    const github = formData.get("github") as string;
    const linkedin = formData.get("linkedin") as string;
    const resumeUrl = formData.get("resumeUrl") as string;
    const seoTitle = formData.get("seoTitle") as string;
    const seoDesc = formData.get("seoDesc") as string;

    await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: { name, displayName, role, email, github, linkedin, resumeUrl, seoTitle, seoDesc },
      create: {
        id: "singleton",
        name,
        displayName,
        role,
        email,
        github,
        linkedin,
        resumeUrl,
        seoTitle,
        seoDesc,
      },
    });

    revalidatePath("/admin/settings");
    revalidatePath("/");
    revalidatePath("/", "layout");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Site Settings</h1>
        <p className="text-text-muted mt-2">Manage your global portfolio configuration.</p>
      </div>

      <SettingsForm settings={settings} saveAction={updateSettings} />
    </div>
  );
}
