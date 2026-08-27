"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  GraduationCap,
  Sparkles,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Circle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";
import { cn } from "@/lib/utils";

interface ProfileDropdownProps {
  onOpenPhotoModal?: () => void;
}

export default function ProfileDropdown({ onOpenPhotoModal }: ProfileDropdownProps) {
  const portfolioData = usePortfolioData();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/80 border border-border-color hover:border-accent/60 transition-all duration-300 backdrop-blur-md cursor-pointer group"
      >
        <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-accent to-blue-600 p-[1.5px]">
          <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-accent text-xs font-bold font-mono">
            {portfolioData.name ? portfolioData.name.charAt(0) : "S"}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
        </div>
        <span className="text-xs font-medium text-foreground group-hover:text-accent transition-colors hidden sm:inline">
          {portfolioData.name || "Siddhartha"}
        </span>
      </button>

      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="absolute right-0 mt-3 w-80 bg-surface/95 border border-border-color rounded-3xl p-5 shadow-2xl backdrop-blur-2xl z-50 overflow-hidden"
          >
            {/* Glossy highlight */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

            {/* Profile Header */}
            <div className="flex items-start gap-3 pb-4 border-b border-border-color/60">
              <div
                onClick={() => {
                  onOpenPhotoModal?.();
                  setIsOpen(false);
                }}
                className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-purple-600 p-[2px] cursor-pointer hover:scale-105 transition-transform"
                title="Click to view full photo"
              >
                <div className="w-full h-full rounded-2xl bg-surface flex items-center justify-center text-foreground font-bold text-lg font-mono">
                  {portfolioData.name ? portfolioData.name.charAt(0) : "S"}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-foreground truncate">
                  {portfolioData.name || "Siddhartha Kuchana"}
                </h4>
                <p className="text-xs text-text-muted truncate">
                  {portfolioData.title || "AI & Full Stack Engineer"}
                </p>

                <div className="inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                  <Circle className="w-1.5 h-1.5 fill-emerald-400 animate-pulse" />
                  <span>Open to Internships</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 my-4">
              <div className="p-2.5 rounded-xl bg-background/60 border border-border-color/50">
                <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-mono mb-1">
                  <GraduationCap className="w-3 h-3 text-accent" />
                  <span>CGPA</span>
                </div>
                <span className="text-sm font-bold text-foreground font-mono">9.4 / 10</span>
              </div>
              <div className="p-2.5 rounded-xl bg-background/60 border border-border-color/50">
                <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-mono mb-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>Role</span>
                </div>
                <span className="text-xs font-semibold text-foreground truncate block">
                  AI & ML Student
                </span>
              </div>
            </div>

            {/* Action Links */}
            <div className="space-y-1.5 pt-2 border-t border-border-color/60">
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-text-muted hover:text-foreground hover:bg-surface-hover transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="truncate">{portfolioData.contact.email}</span>
                </div>
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>

              {portfolioData.socials.github && (
                <a
                  href={portfolioData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon width={16} height={16} />
                    <span>GitHub Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {portfolioData.socials.linkedin && (
                <a
                  href={portfolioData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon width={16} height={16} className="text-blue-400" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
