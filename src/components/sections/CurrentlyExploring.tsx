"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";

export default function CurrentlyExploring() {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center mb-12"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="text-accent" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-foreground">
              Currently Exploring
            </h2>
            <Sparkles className="text-accent" size={24} />
          </div>
          <p className="text-text-muted">Technologies and concepts I'm actively learning.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          {portfolioData.currentlyExploring.map((topic, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="px-6 py-3 bg-surface border border-border-color rounded-full text-sm md:text-base text-foreground shadow-sm hover:border-accent hover:shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-all duration-300 cursor-default"
            >
              {topic}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
