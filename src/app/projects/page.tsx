import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export const metadata = {
  title: "Projects | AI & ML Developer",
  description: "Advanced filtering for all my projects.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  
  const whereClause = {
    status: "PUBLISHED",
    ...(category ? { category } : {})
  };

  const projects = await prisma.project.findMany({
    where: whereClause,
    orderBy: { order: "asc" },
  });

  const allCategories = await prisma.project.findMany({
    select: { category: true },
    where: { status: "PUBLISHED" },
    distinct: ["category"],
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-background text-foreground">
        <div className="container mx-auto px-6 max-w-6xl">
          <header className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">All Projects</h1>
            <p className="text-lg text-text-muted max-w-2xl">
              Explore my complete portfolio of AI models, automation scripts, and full-stack applications.
            </p>
          </header>

          <div className="flex flex-wrap gap-3 mb-12">
            <Link 
              href="/projects" 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!category ? 'bg-foreground text-background' : 'bg-surface border border-border-color hover:border-accent text-text-muted'}`}
            >
              All
            </Link>
            {allCategories.map((c) => (
              <Link 
                key={c.category}
                href={`/projects?category=${encodeURIComponent(c.category)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === c.category ? 'bg-foreground text-background' : 'bg-surface border border-border-color hover:border-accent text-text-muted'}`}
              >
                {c.category}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.length === 0 ? (
              <p className="text-text-muted">No projects found in this category.</p>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="group relative bg-surface border border-border-color rounded-2xl p-6 md:p-8 hover:border-accent transition-all flex flex-col h-full">
                  <div className="mb-6">
                    <span className="text-accent text-sm font-mono tracking-wider uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold mt-2 mb-3">{project.title}</h3>
                    <p className="text-text-muted line-clamp-3">{project.summary}</p>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-border-color flex items-center justify-between">
                    <div className="flex space-x-4">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-foreground transition-colors">
                          <GithubIcon width={20} height={20} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-foreground transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
