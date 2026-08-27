"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";
import ProfileModal from "./ProfileModal";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
];

export default function MorphicNavbar() {
  const portfolioData = usePortfolioData();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = navLinks.map((link) => link.href.substring(1));
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            const found = navLinks.find((l) => l.href === `#${sectionId}`);
            if (found) setActiveSection(found.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-6"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div
            className={cn(
              "flex items-center justify-between px-5 py-2.5 rounded-full transition-all duration-500 border",
              scrolled
                ? "bg-surface/85 backdrop-blur-2xl border-border-color/80 shadow-2xl shadow-accent/5"
                : "bg-surface/40 backdrop-blur-md border-border-color/30"
            )}
          >
            {/* Left Brand Title */}
            <div className="flex items-center gap-3">
              <button
                onDoubleClick={(e) => {
                  e.preventDefault();
                  setIsPhotoOpen(true);
                }}
                title="Double-click to view profile photo"
                className="text-base sm:text-lg font-bold tracking-tighter text-foreground group uppercase text-left cursor-pointer hover:text-accent transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span>{portfolioData.name || "SIDDHARTHA KUCHANA"}</span>
              </button>
            </div>

            {/* Center Desktop Morphic Nav Pills */}
            <nav className="hidden md:flex items-center p-1 rounded-full bg-background/50 border border-border-color/40 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveSection(link.name)}
                    className={cn(
                      "relative px-4 py-1.5 text-xs font-medium transition-colors duration-300 rounded-full z-10",
                      isActive ? "text-foreground font-semibold" : "text-text-muted hover:text-foreground"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="morphicNavHighlight"
                        className="absolute inset-0 bg-surface border border-accent/40 rounded-full shadow-md -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Action Bar & Profile Dropdown */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden sm:inline-flex px-4 py-1.5 text-xs font-semibold rounded-full border border-accent/50 text-accent hover:bg-accent hover:text-background transition-all duration-300 shadow-sm"
              >
                Let's Connect
              </a>

              <ProfileDropdown onOpenPhotoModal={() => setIsPhotoOpen(true)} />

              {/* Mobile Menu Toggle Button */}
              <button
                className="md:hidden text-foreground p-2 rounded-full hover:bg-surface-hover"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden container mx-auto px-4 mt-2"
            >
              <div className="bg-surface/95 backdrop-blur-2xl border border-border-color rounded-3xl p-6 shadow-2xl flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-foreground hover:text-accent transition-colors flex items-center justify-between py-2 border-b border-border-color/40"
                    onClick={() => {
                      setActiveSection(link.name);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-mono text-text-muted">→</span>
                  </a>
                ))}
                <a
                  href="#contact"
                  className="w-full py-3 text-center bg-accent text-background font-semibold text-sm rounded-2xl shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Let's Connect
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ProfileModal isOpen={isPhotoOpen} onClose={() => setIsPhotoOpen(false)} />
    </>
  );
}
