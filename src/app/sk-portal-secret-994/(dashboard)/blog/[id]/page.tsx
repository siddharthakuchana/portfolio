import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { saveBlogPost } from "../actions";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/sk-portal-secret-994/blog" className="p-2 hover:bg-surface rounded-full text-text-muted hover:text-foreground transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Post</h1>
          <p className="text-sm text-text-muted mt-1">Editing {post.title}</p>
        </div>
      </div>
      
      <form action={saveBlogPost} className="space-y-6 bg-surface p-6 rounded-xl border border-border-color">
        <input type="hidden" name="id" value={post.id} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-foreground">Title</label>
            <input required name="title" defaultValue={post.title} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent outline-none" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Slug</label>
            <input required name="slug" defaultValue={post.slug} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent outline-none" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Status</label>
            <select name="status" defaultValue={post.status} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent outline-none text-foreground">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Reading Time (mins)</label>
            <input type="number" name="readingTime" defaultValue={post.readingTime} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent outline-none" />
          </div>
          
          <div className="space-y-2 flex items-center pt-8">
            <label className="flex items-center space-x-2 text-sm font-medium text-foreground cursor-pointer">
              <input type="checkbox" name="featured" defaultChecked={post.featured} className="rounded border-border-color text-accent" />
              <span>Featured Post</span>
            </label>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Excerpt</label>
          <textarea required name="excerpt" defaultValue={post.excerpt || ""} rows={3} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent outline-none resize-none" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Content (Markdown)</label>
          <textarea required name="content" defaultValue={post.content} rows={15} className="w-full bg-background border border-border-color rounded-lg px-4 py-2.5 focus:border-accent outline-none font-mono text-sm resize-y" />
        </div>

        <div className="flex justify-end pt-4 border-t border-border-color">
          <button type="submit" className="bg-accent text-background px-6 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors">
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}
