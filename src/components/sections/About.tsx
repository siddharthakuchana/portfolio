"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";
import CgpaModal from "@/components/ui/CgpaModal";

export default function About() {
  const portfolioData = usePortfolioData();
  const [isCgpaModalOpen, setIsCgpaModalOpen] = useState(false);

  return (
    <>
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
              About <span className="text-accent">Me</span>
            </h2>
            <div className="w-20 h-1 bg-accent/30 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left: Introduction */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="prose prose-invert prose-lg max-w-none text-text-muted">
                {portfolioData.about.split("\n\n").map((paragraph: string, index: number) => (
                  <p key={index} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                <p className="mb-6 leading-relaxed">
                  My core expertise lies in building systems that solve real problems.
                  Whether it's an AI-powered fitness tracker analyzing joint angles in
                  real-time, an automated web extraction pipeline handling complex dynamic
                  portals, or a full-stack platform providing machine-learning career
                  recommendations, I focus on the intersection of advanced logic and
                  practical engineering.
                </p>
              </div>
            </motion.div>

            {/* Right: Metadata Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-5 grid grid-cols-2 gap-4"
            >
              <div className="bg-surface border border-border-color p-6 rounded-2xl flex flex-col justify-between group hover:border-accent/50 transition-colors">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider mb-4">
                  Education
                </span>
                <span className="text-lg font-medium text-foreground group-hover:text-accent transition-colors">
                  {portfolioData.education.institution}
                </span>
              </div>

              <div className="bg-surface border border-border-color p-6 rounded-2xl flex flex-col justify-between group hover:border-accent/50 transition-colors">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider mb-4">
                  Degree
                </span>
                <span className="text-sm font-medium text-foreground leading-snug">
                  {portfolioData.education.degree}
                </span>
              </div>

              <div className="bg-surface border border-border-color p-6 rounded-2xl flex flex-col justify-between group hover:border-accent/50 transition-colors">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider mb-4">
                  Graduation
                </span>
                <span className="text-3xl font-bold text-foreground font-mono">
                  {portfolioData.education.graduation}
                </span>
              </div>

              {/* CGPA Card with double click trigger */}
              <div
                onDoubleClick={() => setIsCgpaModalOpen(true)}
                title="Double-click to view all semester SGPA results & chart graph!"
                className="bg-surface border border-border-color p-6 rounded-2xl flex flex-col justify-between group hover:border-accent transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center justify-between relative z-10 mb-4">
                  <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                    CGPA
                  </span>
                  <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Double-click
                  </span>
                </div>
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent to-blue-600 relative z-10">
                  {portfolioData.education.cgpa}
                </span>
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CgpaModal isOpen={isCgpaModalOpen} onClose={() => setIsCgpaModalOpen(false)} />
    </>
  );
}
