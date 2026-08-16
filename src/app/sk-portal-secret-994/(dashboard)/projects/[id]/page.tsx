import ProjectForm from "@/components/admin/ProjectForm";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      technologies: {
        include: { technology: true }
      }
    }
  });

  if (!project) notFound();

  const allTechnologies = await prisma.technology.findMany();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/projects" className="p-2 hover:bg-surface rounded-full text-text-muted hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Project</h1>
          <p className="text-sm text-text-muted mt-1">Editing {project.title}</p>
        </div>
      </div>
      
      <ProjectForm project={project} technologies={allTechnologies} />
    </div>
  );
}
