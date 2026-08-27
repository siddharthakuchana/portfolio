"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SmoothTab, { TabItem } from "@/components/ui/SmoothTab";
import CarouselCard, { CarouselItem } from "@/components/ui/CarouselCard";

export default function Projects() {
  const portfolioData = usePortfolioData();
  const [activeCategory, setActiveCategory] = useState("all");

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  // Convert portfolio projects to carousel items
  const carouselItems: CarouselItem[] = portfolioData.projects.map((p, idx) => ({
    id: idx,
    title: p.title,
    category: p.category,
    description: p.description,
    tags: p.techStack,
    githubUrl: p.githubLink,
    liveUrl: p.liveLink,
    gradient:
      idx % 3 === 0
        ? "from-accent via-blue-600 to-indigo-600"
        : idx % 3 === 1
        ? "from-purple-600 via-pink-600 to-accent"
        : "from-emerald-500 via-teal-600 to-accent",
  }));

  // Define Category Tabs
  const tabs: TabItem[] = [
    { id: "all", label: "All Projects", count: portfolioData.projects.length },
    {
      id: "ai",
      label: "AI & ML",
      count: portfolioData.projects.filter(
        (p) =>
          p.category.toLowerCase().includes("ai") ||
          p.category.toLowerCase().includes("machine") ||
          p.category.toLowerCase().includes("learning")
      ).length,
    },
    {
      id: "web",
      label: "Web Development",
      count: portfolioData.projects.filter(
        (p) =>
          p.category.toLowerCase().includes("web") ||
          p.category.toLowerCase().includes("full") ||
          p.category.toLowerCase().includes("app")
      ).length,
    },
  ];

  // Filter projects based on activeTab
  const filteredProjects = portfolioData.projects.filter((project) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "ai")
      return (
        project.category.toLowerCase().includes("ai") ||
        project.category.toLowerCase().includes("machine") ||
        project.category.toLowerCase().includes("learning")
      );
    if (activeCategory === "web")
      return (
        project.category.toLowerCase().includes("web") ||
        project.category.toLowerCase().includes("full") ||
        project.category.toLowerCase().includes("app")
      );
    return true;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header & Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
              Featured Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
              Selected <span className="text-accent">Works</span>
            </h2>
            <div className="w-20 h-1 bg-accent/30 rounded-full" />
          </div>

          {/* Kokonut Smooth Tab Switcher */}
          <SmoothTab tabs={tabs} activeTab={activeCategory} onChange={setActiveCategory} />
        </motion.div>

        {/* Carousel Showcase for Top Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Featured Showcase Carousel
          </div>
          <CarouselCard items={carouselItems} />
        </motion.div>

        {/* Spotlight Cards Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project, index) => {
            let colSpanClass = "md:col-span-12";
            if (index === 1) colSpanClass = "md:col-span-7";
            if (index === 2) colSpanClass = "md:col-span-5";

            return (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className={`${colSpanClass} flex flex-col h-full`}
              >
                <SpotlightCard className="group h-full flex flex-col p-0 overflow-hidden border-border-color hover:border-accent/60 transition-all duration-300">
                  {/* Visual Preview */}
                  <div className="relative h-64 md:h-80 lg:h-96 w-full bg-background overflow-hidden border-b border-border-color">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-blue-600/5 group-hover:opacity-50 transition-opacity duration-300" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                      {project.visual === "alignwell" && (
                        <div className="w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-20 text-accent/20 font-mono text-[10rem] font-black leading-none">
                          A
                        </div>
                      )}
                      {project.visual === "autoresultx" && (
                        <div className="w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-20 text-accent/20 font-mono text-[10rem] font-black leading-none">
                          X
                        </div>
                      )}
                      {project.visual === "career-guidance" && (
                        <div className="w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-20 text-accent/20 font-mono text-[10rem] font-black leading-none">
                          C
                        </div>
                      )}
                      {project.visual === "answer-evaluation" && (
                        <div className="w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-20 text-accent/20 font-mono text-[10rem] font-black leading-none">
                          E
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
                          {project.category}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex space-x-3">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-background border border-border-color flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-colors"
                          >
                            <GithubIcon width={18} height={18} />
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-background border border-border-color flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-colors"
                          >
                            <ArrowUpRight size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-text-muted leading-relaxed mb-8 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-background border border-border-color text-text-muted rounded-md font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

