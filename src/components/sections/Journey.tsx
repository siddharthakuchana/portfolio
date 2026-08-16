"use client";

import { motion } from "framer-motion";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";

export default function Journey() {
  const portfolioData = usePortfolioData();
  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            The <span className="text-accent">Journey</span>
          </h2>
          <div className="w-20 h-1 bg-accent/30 rounded-full mx-auto" />
        </motion.div>

        <div className="relative border-l border-border-color ml-4 md:ml-12 pl-8 md:pl-16 space-y-12 pb-10">
          {portfolioData.journey.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[37px] md:-left-[69px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-accent/50 group-hover:border-accent group-hover:bg-accent group-hover:shadow-[0_0_15px_rgba(0,210,255,0.6)] transition-all duration-300" />
              
              <div className="flex flex-col md:flex-row md:items-baseline mb-2">
                <span className="text-xl font-bold text-accent font-mono md:w-24 shrink-0">
                  {item.year}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mt-1 md:mt-0">
                  {item.title}
                </h3>
              </div>
              <p className="text-text-muted leading-relaxed md:pl-24">
                {item.description}
              </p>
            </motion.div>
          ))}
          
          {/* Fading line at bottom */}
          <div className="absolute bottom-0 left-[-1px] w-[2px] h-32 bg-gradient-to-t from-background to-border-color" />
        </div>
      </div>
    </section>
  );
}
