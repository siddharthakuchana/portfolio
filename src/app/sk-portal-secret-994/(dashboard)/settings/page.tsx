import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sk-portal-secret-994/login");
  }

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  }).catch(() => null);

  async function updateSettings(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const displayName = formData.get("displayName") as string;
    const role = formData.get("role") as string;
    const email = formData.get("email") as string;
    const github = formData.get("github") as string;
    const linkedin = formData.get("linkedin") as string;
    const resumeUrl = (formData.get("resumeUrl") as string) || "/resume";
    const seoTitle = formData.get("seoTitle") as string;
    const seoDesc = formData.get("seoDesc") as string;

    const resumeFile = formData.get("resumeFile") as File | null;
    let newResumeBase64: string | undefined = undefined;

    if (resumeFile && resumeFile.size > 0) {
      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      newResumeBase64 = buffer.toString("base64");
    }

    const updateData: any = {
      name,
      displayName,
      role,
      email,
      github,
      linkedin,
      resumeUrl,
      seoTitle,
      seoDesc,
    };

    if (newResumeBase64) {
      updateData.resumeBase64 = newResumeBase64;
    }

    await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: updateData,
      create: {
        id: "singleton",
        ...updateData,
      },
    });

    revalidatePath("/sk-portal-secret-994/settings");
    revalidatePath("/resume");
    revalidatePath("/");
    revalidatePath("/", "layout");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Site Settings</h1>
        <p className="text-text-muted mt-2">Manage your global portfolio configuration and upload updated resume PDFs.</p>
      </div>

      <SettingsForm settings={settings} saveAction={updateSettings} />
    </div>
  );
}
