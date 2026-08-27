import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Layers, Eye, CheckCircle2 } from "lucide-react";

export default async function HomepageCMSPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sk-portal-secret-994/login");
  }

  const sections = [
    { id: "hero", name: "Hero Section", description: "Main banner with typewriter text, resume trigger, and Apple Activity Card.", enabled: true },
    { id: "projects", name: "Projects Showcase", description: "3D Carousel & Spotlight Cards for AlignWell, Career Guidance, IoT Fire Evacuation, AutoResultX.", enabled: true },
    { id: "skills", name: "Technical Skills Matrix", description: "Categorized skills grid with Matrix Text effect.", enabled: true },
    { id: "github", name: "GitHub Activity Sync", description: "Live synced @siddharthakuchana repository metrics.", enabled: true },
    { id: "contact", name: "Contact & Social Dock", description: "Interactive contact section and floating Apple macOS toolbar.", enabled: true },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
          <Layers className="w-8 h-8 text-accent" />
          <span>Homepage CMS & Layout Control</span>
        </h1>
        <p className="text-text-muted mt-1">Control visibility and structure of public portfolio sections.</p>
      </div>

      <div className="space-y-4">
        {sections.map((sec) => (
          <div key={sec.id} className="bg-surface border border-border-color rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-foreground text-lg">{sec.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                  ACTIVE
                </span>
              </div>
              <p className="text-xs text-text-muted mt-1">{sec.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Visible</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
