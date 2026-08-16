"use client";

import { motion } from "framer-motion";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";

export default function CaseStudies() {
  const portfolioData = usePortfolioData();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section id="case-studies" className="py-24 relative bg-surface-hover/20">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            Engineering <span className="text-accent">Thinking</span>
          </h2>
          <div className="w-20 h-1 bg-accent/30 rounded-full" />
          <p className="mt-6 text-text-muted max-w-2xl text-lg">
            A deeper look into how I approach complex technical challenges.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {portfolioData.projects.map((project) => (
            <motion.div
              key={project.title + "case"}
              variants={itemVariants}
              className="bg-surface border border-border-color rounded-2xl p-8 md:p-10"
            >
              <h3 className="text-2xl font-bold text-foreground mb-8 pb-4 border-b border-border-color inline-block">
                {project.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div>
                  <div className="mb-8">
                    <h4 className="text-sm font-mono text-accent uppercase tracking-wider mb-3">
                      Problem
                    </h4>
                    <p className="text-text-muted leading-relaxed">
                      {project.caseStudy.problem}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-mono text-accent uppercase tracking-wider mb-3">
                      Approach
                    </h4>
                    <p className="text-text-muted leading-relaxed">
                      {project.caseStudy.approach}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-8">
                    <h4 className="text-sm font-mono text-accent uppercase tracking-wider mb-3">
                      Challenges
                    </h4>
                    <p className="text-text-muted leading-relaxed">
                      {project.caseStudy.challenges}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-mono text-accent uppercase tracking-wider mb-3">
                      Result
                    </h4>
                    <p className="text-text-muted leading-relaxed">
                      {project.caseStudy.result}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
