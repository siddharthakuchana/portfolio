"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import AIVisual from "@/components/visuals/AIVisual";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";
import TypingText from "@/components/ui/TypingText";
import MatrixText from "@/components/ui/MatrixText";
import SlideTextButton from "@/components/ui/SlideTextButton";
import SocialButton from "@/components/ui/SocialButton";
import AppleActivityCard from "@/components/ui/AppleActivityCard";
import ResumeModal from "@/components/ui/ResumeModal";

export default function Hero() {
  const portfolioData = usePortfolioData();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

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

  const roles = [
    "AI & ML Undergraduate",
    "Machine Learning Specialist",
    "Computer Vision Innovator",
    "Full-Stack Web Developer",
    "Open Source Enthusiast",
  ];

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
      >
        <AIVisual />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Main Hero Content (Col 7) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7"
            >
              <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-accent font-semibold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <MatrixText text="OPEN TO INTERNSHIPS & OPPORTUNITIES" />
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] text-foreground mb-6"
              >
                Building{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-500 to-purple-500">
                  <MatrixText text="intelligent" />
                </span>{" "}
                systems.
              </motion.h1>

              <motion.div variants={itemVariants} className="mb-8 min-h-[32px]">
                <p className="text-lg md:text-2xl text-text-muted font-light flex items-center gap-2">
                  <span>Specialized in</span>
                  <TypingText
                    phrases={roles}
                    className="text-foreground font-semibold text-accent"
                  />
                </p>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-text-muted max-w-2xl leading-relaxed mb-10"
              >
                {portfolioData.role ||
                  "AI & ML undergraduate focused on machine learning, computer vision, automation, and full-stack development."}
              </motion.p>

              {/* Interactive Slide Text Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 md:gap-6 mb-12"
              >
                <SlideTextButton
                  primaryText="View My Work"
                  secondaryText="Explore Projects →"
                  icon={<ArrowRight className="w-4 h-4 ml-1" />}
                  href="#projects"
                  variant="primary"
                />

                <SlideTextButton
                  primaryText="View Resume CV"
                  secondaryText="Open Resume PDF 📄"
                  onClick={() => setIsResumeModalOpen(true)}
                  variant="secondary"
                />
              </motion.div>

              {/* Social Buttons Dock */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 pt-6 border-t border-border-color/50"
              >
                <SocialButton
                  icon={<GithubIcon width={20} height={20} />}
                  label="GitHub Repos"
                  badge="16 Repos"
                  href={portfolioData.socials.github}
                />
                <SocialButton
                  icon={<LinkedinIcon width={20} height={20} />}
                  label="LinkedIn Profile"
                  badge="Connect"
                  href={portfolioData.socials.linkedin}
                />
                <SocialButton
                  icon={<FileText className="w-5 h-5 text-amber-400" />}
                  label="View Resume CV"
                  badge="PDF"
                  onClick={() => setIsResumeModalOpen(true)}
                />
              </motion.div>
            </motion.div>

            {/* Right Column: Apple Activity Card Showcase (Col 5) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="lg:col-span-5 relative"
            >
              <AppleActivityCard className="shadow-accent/10" />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
        >
          <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-accent to-transparent overflow-hidden relative">
            <motion.div
              animate={{ y: [0, 56] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-accent"
            />
          </div>
        </motion.div>
      </section>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </>
  );
}

