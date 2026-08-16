import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReactMarkdown from "react-markdown";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.seoTitle || post.title} | Blog`,
    description: post.seoDesc || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-background text-foreground">
        <article className="container mx-auto px-6 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center space-x-2 text-text-muted hover:text-accent transition-colors mb-10">
            <ArrowLeft size={16} />
            <span>Back to Blog</span>
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted border-b border-border-color pb-8">
              <span className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </span>
              <span className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{post.readingTime} min read</span>
              </span>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
