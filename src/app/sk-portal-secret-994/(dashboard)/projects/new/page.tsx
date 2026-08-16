import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/projects" className="p-2 hover:bg-surface rounded-full text-text-muted hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create New Project</h1>
          <p className="text-sm text-text-muted mt-1">Add a new project to your portfolio.</p>
        </div>
      </div>
      
      <ProjectForm />
    </div>
  );
}
