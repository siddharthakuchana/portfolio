import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { saveTechnology } from "../actions";

export default function NewTechnologyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/sk-portal-secret-994/technologies" className="p-2 hover:bg-surface rounded-full text-text-muted hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add Technology</h1>
          <p className="text-sm text-text-muted mt-1">Add a new tech to your stack.</p>
        </div>
      </div>
      
      <form action={saveTechnology} className="space-y-6 bg-surface p-6 rounded-xl border border-border-color">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Name</label>
            <input required name="name" className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Slug</label>
            <input required name="slug" className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Category</label>
            <select name="category" className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent outline-none">
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="AI/ML">AI/ML</option>
              <option value="DevOps">DevOps</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Icon (URL or Lucide name)</label>
            <input name="icon" className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent outline-none" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-foreground">
            <input type="checkbox" name="featured" className="rounded border-border-color text-accent" />
            <span>Featured Technology</span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Description</label>
          <textarea name="description" rows={3} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent outline-none resize-none" />
        </div>

        <div className="flex justify-end pt-4 border-t border-border-color">
          <button type="submit" className="bg-accent text-background px-6 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors">
            Save Technology
          </button>
        </div>
      </form>
    </div>
  );
}
