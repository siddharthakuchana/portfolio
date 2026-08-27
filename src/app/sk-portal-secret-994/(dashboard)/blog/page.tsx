import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function AdminBlog() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  async function deletePost(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/sk-portal-secret-994/blog");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-text-muted mt-1">Manage your blog content.</p>
        </div>
        <Link
          href="/sk-portal-secret-994/blog/new"
          className="flex items-center space-x-2 bg-accent text-background px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={18} />
          <span>New Post</span>
        </Link>
      </div>

      <div className="bg-surface border border-border-color rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-color bg-surface-hover/50">
              <th className="py-3 px-4 text-sm font-medium text-text-muted">Title</th>
              <th className="py-3 px-4 text-sm font-medium text-text-muted">Status</th>
              <th className="py-3 px-4 text-sm font-medium text-text-muted">Date</th>
              <th className="py-3 px-4 text-sm font-medium text-text-muted text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-text-muted">
                  No blog posts found. Create your first post!
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-border-color hover:bg-surface-hover/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{post.title}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === "PUBLISHED" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-muted">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex items-center justify-end space-x-3">
                    <Link href={`/sk-portal-secret-994/blog/${post.id}`} className="text-text-muted hover:text-accent transition-colors">
                      <Edit size={18} />
                    </Link>
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={post.id} />
                      <button type="submit" className="text-text-muted hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
