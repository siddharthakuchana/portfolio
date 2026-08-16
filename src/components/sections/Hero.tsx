"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import AIVisual from "@/components/visuals/AIVisual";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";

export default function Hero() {
  const portfolioData = usePortfolioData();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden"
    >
      <AIVisual />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-accent">
              Open to internships & opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] text-foreground mb-8"
          >
            Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">
              intelligent systems.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed mb-10"
          >
            {portfolioData.role || "AI & ML undergraduate focused on machine learning, computer vision, automation, and full-stack development."}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 md:gap-6"
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-foreground text-background font-medium rounded-full overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-2"
            >
              <span className="relative z-10">View My Work</span>
              <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-accent transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0" />
            </a>

            <a
              href="#contact"
              className="px-8 py-4 border border-border-color hover:border-accent text-foreground font-medium rounded-full transition-all hover:bg-accent/5 flex items-center space-x-2"
            >
              <span>Let's Connect</span>
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-6 mt-16 pt-8 border-t border-border-color/50"
          >
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-foreground transition-colors flex items-center space-x-2 text-sm font-medium group"
            >
              <GithubIcon width={18} height={18} className="group-hover:text-accent transition-colors" />
              <span>GitHub</span>
            </a>
            <a
              href={portfolioData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-foreground transition-colors flex items-center space-x-2 text-sm font-medium group"
            >
              <LinkedinIcon width={18} height={18} className="group-hover:text-accent transition-colors" />
              <span>LinkedIn</span>
            </a>
            <a
              href={portfolioData.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-foreground transition-colors flex items-center space-x-2 text-sm font-medium group"
            >
              <Download size={18} className="group-hover:text-accent transition-colors" />
              <span>Resume</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-accent to-transparent overflow-hidden relative">
          <motion.div 
            animate={{ y: [0, 64] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
