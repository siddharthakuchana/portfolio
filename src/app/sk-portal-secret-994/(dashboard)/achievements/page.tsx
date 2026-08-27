import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Award, Plus, Trash2, CheckCircle2 } from "lucide-react";

export default async function AchievementsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sk-portal-secret-994/login");
  }

  const certifications = [
    { id: "1", title: "Machine Learning / Artificial Intelligence Certification", issuer: "JNTUH / Authorized Institution", year: "2025" },
    { id: "2", title: "Python Certification", issuer: "Professional Certification Board", year: "2024" },
    { id: "3", title: "B.Tech CSE (AI & ML) Academic Excellence", issuer: "JNTU Hyderabad (CGPA: 8.41/10.0)", year: "2023 - Present" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
            <Award className="w-8 h-8 text-accent" />
            <span>Achievements & Certifications</span>
          </h1>
          <p className="text-text-muted mt-1">Manage your academic honors, credentials, and certifications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-surface border border-border-color rounded-2xl p-6 shadow-xl space-y-4">
            <div className="p-3 w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-base leading-snug">{cert.title}</h3>
              <p className="text-xs text-text-muted mt-1">{cert.issuer}</p>
              <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-mono">
                {cert.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
