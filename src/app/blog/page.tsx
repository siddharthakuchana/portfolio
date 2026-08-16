import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Blog | AI & ML Developer",
  description: "Read my latest thoughts on AI, Machine Learning, and Software Engineering.",
};

export default async function BlogIndex() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-background text-foreground">
        <div className="container mx-auto px-6 max-w-4xl">
          <header className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Blog</h1>
            <p className="text-lg text-text-muted">
              Thoughts, tutorials, and insights on Artificial Intelligence, Machine Learning, and full-stack development.
            </p>
          </header>

          <div className="space-y-10">
            {posts.length === 0 ? (
              <p className="text-text-muted text-lg">No posts available right now. Check back later!</p>
            ) : (
              posts.map((post) => (
                <article key={post.id} className="group relative bg-surface border border-border-color rounded-2xl p-6 md:p-8 hover:border-accent transition-colors">
                  <div className="flex items-center space-x-4 text-sm text-text-muted mb-4">
                    <span className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{post.readingTime} min read</span>
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-accent transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0"></span>
                      {post.title}
                    </Link>
                  </h2>
                  
                  {post.excerpt && (
                    <p className="text-text-muted leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-2 text-accent font-medium text-sm group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight size={16} />
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
