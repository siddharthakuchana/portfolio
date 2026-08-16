"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";

export default function Achievements() {
  const portfolioData = usePortfolioData();
  return (
    <section id="achievements" className="py-24 relative bg-surface-hover/20">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            Notable <span className="text-accent">Achievements</span>
          </h2>
          <div className="w-20 h-1 bg-accent/30 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface border border-border-color p-6 rounded-2xl flex items-start space-x-4 group hover:border-accent/40 transition-colors"
            >
              <div className="p-3 bg-accent/10 rounded-full text-accent group-hover:bg-accent group-hover:text-background transition-colors shrink-0">
                <Award size={20} />
              </div>
              <p className="text-foreground leading-relaxed pt-1">
                {achievement}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
