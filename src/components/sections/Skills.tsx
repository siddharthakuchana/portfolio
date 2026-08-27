"use client";

import { motion } from "framer-motion";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";
import SpotlightCard from "@/components/ui/SpotlightCard";
import MatrixText from "@/components/ui/MatrixText";

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
          <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
            Capabilities & Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            Technical <span className="text-accent">Arsenal</span>
          </h2>
          <div className="w-20 h-1 bg-accent/30 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(portfolioData.skills).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <SpotlightCard className="p-8 rounded-2xl relative overflow-hidden group hover:border-accent/50 transition-colors h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-6 capitalize flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                    <span>
                      <MatrixText text={category.replace("_", " & ")} />
                    </span>
                  </h3>

                  <div className="flex flex-wrap gap-2.5">
                    {(skills as string[]).map((skill) => (
                      <motion.span
                        key={skill}
                        variants={itemVariants}
                        className="px-3.5 py-1.5 text-xs font-mono font-medium bg-background border border-border-color/80 text-text-muted rounded-xl hover:text-accent hover:border-accent/60 hover:bg-accent/5 transition-all cursor-pointer shadow-sm"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

