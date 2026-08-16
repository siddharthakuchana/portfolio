"use client";

import { motion } from "framer-motion";
import { GitMerge, GitPullRequest, GitCommit } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";

export default function GithubSection() {
  const portfolioData = usePortfolioData();
  return (
    <section id="github" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            Code is where the <span className="text-accent">ideas become real.</span>
          </h2>
          <div className="w-20 h-1 bg-accent/30 rounded-full mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto bg-surface border border-border-color rounded-3xl overflow-hidden p-8 md:p-12 text-center group"
        >
          {/* Background decoration */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-700" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-colors duration-700" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-background border border-border-color rounded-full flex items-center justify-center mb-6 group-hover:border-accent transition-colors">
              <GithubIcon width={40} height={40} className="text-foreground group-hover:text-accent transition-colors" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Explore my open-source work
            </h3>
            
            <p className="text-text-muted max-w-lg mx-auto mb-10 leading-relaxed">
              I actively build, contribute, and share code on GitHub. From machine learning models to full-stack applications and automation scripts.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl mx-auto mb-10">
              <div className="bg-background border border-border-color rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                <GitCommit size={24} className="text-accent" />
                <span className="text-sm font-medium text-text-muted">Commits</span>
                <span className="text-2xl font-bold font-mono text-foreground">1,200+</span>
              </div>
              <div className="bg-background border border-border-color rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                <GitPullRequest size={24} className="text-accent" />
                <span className="text-sm font-medium text-text-muted">Repositories</span>
                <span className="text-2xl font-bold font-mono text-foreground">30+</span>
              </div>
              <div className="bg-background border border-border-color rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                <GitMerge size={24} className="text-accent" />
                <span className="text-sm font-medium text-text-muted">Contributions</span>
                <span className="text-2xl font-bold font-mono text-foreground">Continuous</span>
              </div>
            </div>

            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-accent text-background font-medium rounded-full overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] inline-flex items-center space-x-2"
            >
              <span>View GitHub Profile</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
