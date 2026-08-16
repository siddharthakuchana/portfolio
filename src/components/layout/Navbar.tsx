"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";
import ProfileModal from "@/components/ui/ProfileModal";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
];

export default function Navbar() {
  const portfolioData = usePortfolioData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-background/80 backdrop-blur-md border-b border-border-color"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <button
            onDoubleClick={(e) => {
              e.preventDefault();
              setIsPhotoOpen(true);
            }}
            title="Double-click to view profile photo"
            className="text-xl font-bold tracking-tighter text-foreground group uppercase text-left cursor-pointer hover:text-accent transition-colors"
          >
            {portfolioData.name || "SIDDHARTHA KUCHANA"}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-text-muted hover:text-foreground transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2 text-sm font-medium border border-border-color hover:border-accent hover:text-accent rounded-full transition-all duration-300"
            >
              Let's Connect
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-surface border-b border-border-color p-6 md:hidden flex flex-col space-y-6"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg text-foreground hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="px-5 py-3 text-center bg-accent text-background font-medium rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Let's Connect
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ProfileModal isOpen={isPhotoOpen} onClose={() => setIsPhotoOpen(false)} />
    </>
  );
}
