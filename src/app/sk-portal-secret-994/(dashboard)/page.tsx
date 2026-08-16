import { prisma } from "@/lib/prisma";
import { Users, FileText, Briefcase, Code, BarChart } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  let projectCount = 0;
  let publishedProjects = 0;
  let techCount = 0;
  let blogCount = 0;
  let publishedBlogs = 0;
  let mediaCount = 0;

  try {
    projectCount = await prisma.project.count().catch(() => 0);
    publishedProjects = await prisma.project.count({ where: { status: "PUBLISHED" } }).catch(() => 0);
    techCount = await prisma.technology.count().catch(() => 0);
    blogCount = await prisma.blogPost.count().catch(() => 0);
    publishedBlogs = await prisma.blogPost.count({ where: { status: "PUBLISHED" } }).catch(() => 0);
    mediaCount = await prisma.media.count().catch(() => 0);
  } catch (err) {
    console.error("Error fetching stats:", err);
  }

  const stats = [
    { title: "Total Projects", value: projectCount, subValue: `${publishedProjects} published`, icon: Briefcase, color: "text-blue-500", href: "/sk-portal-secret-994/projects" },
    { title: "Technologies", value: techCount, subValue: "Active stack", icon: Code, color: "text-purple-500", href: "/sk-portal-secret-994/technologies" },
    { title: "Blog Posts", value: blogCount, subValue: `${publishedBlogs} published`, icon: FileText, color: "text-green-500", href: "/sk-portal-secret-994/blog" },
    { title: "Media Files", value: mediaCount, subValue: "Uploads", icon: BarChart, color: "text-orange-500", href: "/sk-portal-secret-994/media" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-text-muted mt-1">Welcome to your portfolio CMS.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={index} href={stat.href} className="bg-surface border border-border-color rounded-xl p-6 hover:border-accent transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-background ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-text-muted text-sm font-medium">{stat.title}</h3>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-3xl font-bold text-foreground group-hover:text-accent transition-colors">{stat.value}</span>
                  <span className="text-xs text-text-muted">{stat.subValue}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-8 bg-surface border border-border-color rounded-xl p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/sk-portal-secret-994/projects/new" className="px-4 py-2 bg-background border border-border-color rounded-lg text-sm font-medium hover:border-accent hover:text-accent transition-colors">
            + New Project
          </Link>
          <Link href="/sk-portal-secret-994/blog/new" className="px-4 py-2 bg-background border border-border-color rounded-lg text-sm font-medium hover:border-accent hover:text-accent transition-colors">
            + Write Blog Post
          </Link>
          <Link href="/sk-portal-secret-994/technologies/new" className="px-4 py-2 bg-background border border-border-color rounded-lg text-sm font-medium hover:border-accent hover:text-accent transition-colors">
            + Add Technology
          </Link>
          <Link href="/sk-portal-secret-994/settings" className="px-4 py-2 bg-background border border-border-color rounded-lg text-sm font-medium hover:border-accent hover:text-accent transition-colors">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
