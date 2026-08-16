import { prisma } from "@/lib/prisma";
import { Users, FileText, Briefcase, Code, BarChart } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const projectCount = await prisma.project.count();
  const publishedProjects = await prisma.project.count({ where: { status: "PUBLISHED" } });
  
  const techCount = await prisma.technology.count();
  const blogCount = await prisma.blogPost.count();
  const publishedBlogs = await prisma.blogPost.count({ where: { status: "PUBLISHED" } });
  
  const mediaCount = await prisma.media.count();

  const stats = [
    { title: "Total Projects", value: projectCount, subValue: `${publishedProjects} published`, icon: Briefcase, color: "text-blue-500", href: "/admin/projects" },
    { title: "Technologies", value: techCount, subValue: "Active stack", icon: Code, color: "text-purple-500", href: "/admin/technologies" },
    { title: "Blog Posts", value: blogCount, subValue: `${publishedBlogs} published`, icon: FileText, color: "text-green-500", href: "/admin/blog" },
    { title: "Media Files", value: mediaCount, subValue: "Uploads", icon: BarChart, color: "text-orange-500", href: "/admin/media" },
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
          <Link href="/admin/projects/new" className="px-4 py-2 bg-background border border-border-color rounded-lg text-sm font-medium hover:border-accent hover:text-accent transition-colors">
            + New Project
          </Link>
          <Link href="/admin/blog/new" className="px-4 py-2 bg-background border border-border-color rounded-lg text-sm font-medium hover:border-accent hover:text-accent transition-colors">
            + Write Blog Post
          </Link>
          <Link href="/admin/technologies/new" className="px-4 py-2 bg-background border border-border-color rounded-lg text-sm font-medium hover:border-accent hover:text-accent transition-colors">
            + Add Technology
          </Link>
          <Link href="/admin/settings" className="px-4 py-2 bg-background border border-border-color rounded-lg text-sm font-medium hover:border-accent hover:text-accent transition-colors">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
