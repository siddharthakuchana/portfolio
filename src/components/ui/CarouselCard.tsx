"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string | number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  gradient?: string;
}

interface CarouselCardProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export default function CarouselCard({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}: CarouselCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, autoPlayInterval, items.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  if (!items || items.length === 0) return null;

  const activeItem = items[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto flex flex-col", className)}>
      {/* Main Slide Card Container */}
      <div className="relative min-h-[320px] sm:min-h-[280px] bg-surface/90 border border-border-color rounded-3xl p-8 overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col justify-between">
        {/* Background gradient decorative glow */}
        <div
          className={cn(
            "absolute inset-0 opacity-15 bg-gradient-to-br transition-all duration-700 pointer-events-none",
            activeItem.gradient || "from-accent via-blue-600 to-purple-600"
          )}
        />

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeItem.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative z-10 flex flex-col h-full justify-between space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-xs font-mono font-medium tracking-wider uppercase rounded-full bg-accent/10 border border-accent/20 text-accent">
                  {activeItem.category}
                </span>
                <span className="text-xs font-mono text-text-muted">
                  0{currentIndex + 1} / 0{items.length}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">
                {activeItem.title}
              </h3>

              <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                {activeItem.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-color/60">
              <div className="flex flex-wrap gap-2">
                {activeItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono bg-background/80 border border-border-color rounded-lg text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-3">
                {activeItem.githubUrl && (
                  <a
                    href={activeItem.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-background border border-border-color text-text-muted hover:text-accent hover:border-accent transition-colors"
                  >
                    <GithubIcon width={16} height={16} />
                  </a>
                )}
                {activeItem.liveUrl && (
                  <a
                    href={activeItem.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-background border border-border-color text-text-muted hover:text-accent hover:border-accent transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Prev/Next Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 flex justify-between pointer-events-none z-20">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-background/80 border border-border-color/80 text-foreground hover:border-accent hover:text-accent backdrop-blur-md shadow-lg pointer-events-auto transition-all hover:scale-110 active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-background/80 border border-border-color/80 text-foreground hover:border-accent hover:text-accent backdrop-blur-md shadow-lg pointer-events-auto transition-all hover:scale-110 active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Pagination Indicators */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              idx === currentIndex ? "w-8 bg-accent" : "w-2 bg-border-color hover:bg-text-muted"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
