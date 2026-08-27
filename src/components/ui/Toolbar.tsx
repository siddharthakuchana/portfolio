"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  GraduationCap,
  Mail,
  FileText,
  Sparkles,
  Command,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";
import CgpaModal from "./CgpaModal";
import ResumeModal from "./ResumeModal";
import SwitchButton from "./SwitchButton";
import { cn } from "@/lib/utils";

interface ToolbarAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
  badge?: string;
}

export default function Toolbar() {
  const portfolioData = usePortfolioData();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isCgpaModalOpen, setIsCgpaModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  // Trigger search palette by keyboard dispatching custom event or standard shortcut
  const handleOpenSearch = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  const actions: ToolbarAction[] = [
    {
      id: "search",
      label: "Command Palette (Cmd+K)",
      icon: <Command className="w-4 h-4 text-accent" />,
      onClick: handleOpenSearch,
    },
    {
      id: "cgpa",
      label: "CGPA & Marks breakdown",
      icon: <GraduationCap className="w-4 h-4 text-emerald-400" />,
      onClick: () => setIsCgpaModalOpen(true),
      badge: "8.41",
    },
    {
      id: "resume",
      label: "View / Print Full Resume",
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      onClick: () => setIsResumeModalOpen(true),
      badge: "CV",
    },
    {
      id: "contact",
      label: "Send Message",
      icon: <Mail className="w-4 h-4 text-purple-400" />,
      href: "#contact",
    },
    {
      id: "github",
      label: "GitHub Repositories",
      icon: <GithubIcon width={16} height={16} className="text-foreground" />,
      href: portfolioData.socials.github,
    },
    {
      id: "linkedin",
      label: "LinkedIn Profile",
      icon: <LinkedinIcon width={16} height={16} className="text-blue-400" />,
      href: portfolioData.socials.linkedin,
    },
  ];

  return (
    <>
      <aside aria-label="Quick Actions Dock" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-2 p-2 rounded-full bg-surface/90 border border-border-color/80 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10">
          {actions.map((action) => {
            const isHovered = hoveredId === action.id;

            const buttonContent = (
              <motion.button
                key={action.id}
                onMouseEnter={() => setHoveredId(action.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={action.onClick}
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative p-2.5 rounded-full bg-background/80 border border-border-color/60 text-foreground transition-all duration-200 cursor-pointer hover:border-accent/60 flex items-center justify-center shadow-md group"
                )}
              >
                {action.icon}

                {action.badge && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-accent text-[9px] font-bold text-background font-mono shadow-sm">
                    {action.badge}
                  </span>
                )}

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: -40, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap"
                    >
                      <div className="px-3 py-1 bg-surface border border-accent/40 rounded-xl text-[11px] font-medium text-foreground shadow-xl backdrop-blur-md">
                        {action.label}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );

            if (action.href) {
              return (
                <a
                  key={action.id}
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {buttonContent}
                </a>
              );
            }

            return buttonContent;
          })}

          <div className="w-[1px] h-6 bg-border-color/80 mx-1 hidden sm:block" />

          {/* Availability Toggle Switch */}
          <div className="hidden sm:block px-2">
            <SwitchButton
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
              rightIcon={<Sparkles className="w-3 h-3" />}
              label={isAvailable ? "Hireable" : "Busy"}
            />
          </div>
        </div>
      </aside>

      {/* CGPA & Resume Modals */}
      <CgpaModal isOpen={isCgpaModalOpen} onClose={() => setIsCgpaModalOpen(false)} />
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </>
  );
}
