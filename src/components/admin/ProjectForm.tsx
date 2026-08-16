"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectForm({ project, technologies = [] }: { project?: any, technologies?: any[] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      summary: formData.get("summary"),
      content: formData.get("content"),
      githubUrl: formData.get("githubUrl"),
      liveUrl: formData.get("liveUrl"),
      year: parseInt(formData.get("year") as string) || new Date().getFullYear(),
      status: formData.get("status"),
      featured: formData.get("featured") === "on",
    };

    try {
      const res = await fetch(project ? `/api/projects/${project.id}` : "/api/projects", {
        method: project ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to save project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-6 rounded-xl border border-border-color">
      {error && <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Title</label>
          <input required name="title" defaultValue={project?.title} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Slug</label>
          <input required name="slug" defaultValue={project?.slug} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">GitHub URL</label>
          <input name="githubUrl" defaultValue={project?.githubUrl} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Live URL</label>
          <input name="liveUrl" defaultValue={project?.liveUrl} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Year</label>
          <input type="number" name="year" defaultValue={project?.year || new Date().getFullYear()} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Status</label>
          <select name="status" defaultValue={project?.status || "DRAFT"} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
          <input type="checkbox" name="featured" defaultChecked={project?.featured} className="rounded border-border-color text-accent focus:ring-accent bg-background" />
          <span>Featured Project</span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Summary</label>
        <textarea required name="summary" defaultValue={project?.summary} rows={3} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Content (Markdown)</label>
        <textarea name="content" defaultValue={project?.content} rows={10} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all font-mono text-sm resize-y" />
      </div>

      <div className="flex justify-end pt-4 border-t border-border-color">
        <button type="submit" disabled={isLoading} className="bg-accent text-background px-6 py-2 rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors">
          {isLoading ? "Saving..." : "Save Project"}
        </button>
      </div>
    </form>
  );
}
