"use client";

import { motion } from "framer-motion";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";

export default function Skills() {
  const portfolioData = usePortfolioData();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-24 relative bg-surface-hover/30">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            Technical <span className="text-accent">Arsenal</span>
          </h2>
          <div className="w-20 h-1 bg-accent/30 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(portfolioData.skills).map(([category, skills], index) => (
            <motion.div
              key={category}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-surface border border-border-color p-8 rounded-2xl relative overflow-hidden group hover:border-accent/30 transition-colors"
            >
              {/* Subtle background glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />

              <h3 className="text-lg font-medium text-foreground mb-6 capitalize flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>{category.replace("_", " & ")}</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {(skills as string[]).map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    className="px-3 py-1.5 text-sm font-medium bg-background border border-border-color text-text-muted rounded-md hover:text-accent hover:border-accent/50 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
