import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function AdminTechnologies() {
  const technologies = await prisma.technology.findMany({
    orderBy: { category: "asc" },
  });

  async function deleteTechnology(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.technology.delete({ where: { id } });
    revalidatePath("/sk-portal-secret-994/technologies");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Technologies</h1>
          <p className="text-text-muted mt-1">Manage skills and tech stack.</p>
        </div>
        <Link
          href="/sk-portal-secret-994/technologies/new"
          className="flex items-center space-x-2 bg-accent text-background px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={18} />
          <span>New Technology</span>
        </Link>
      </div>

      <div className="bg-surface border border-border-color rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-color bg-surface-hover/50">
              <th className="py-3 px-4 text-sm font-medium text-text-muted">Name</th>
              <th className="py-3 px-4 text-sm font-medium text-text-muted">Category</th>
              <th className="py-3 px-4 text-sm font-medium text-text-muted">Featured</th>
              <th className="py-3 px-4 text-sm font-medium text-text-muted text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {technologies.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-text-muted">
                  No technologies found.
                </td>
              </tr>
            ) : (
              technologies.map((tech) => (
                <tr key={tech.id} className="border-b border-border-color hover:bg-surface-hover/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{tech.name}</td>
                  <td className="py-3 px-4 text-text-muted">{tech.category}</td>
                  <td className="py-3 px-4 text-text-muted">{tech.featured ? "Yes" : "No"}</td>
                  <td className="py-3 px-4 flex items-center justify-end space-x-3">
                    <Link href={`/sk-portal-secret-994/technologies/${tech.id}`} className="text-text-muted hover:text-accent transition-colors">
                      <Edit size={18} />
                    </Link>
                    <form action={deleteTechnology}>
                      <input type="hidden" name="id" value={tech.id} />
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
