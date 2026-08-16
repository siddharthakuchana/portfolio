"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";
import Image from "next/image";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const portfolioData = usePortfolioData();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 bg-surface border border-border-color p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-foreground hover:bg-surface-hover rounded-full transition-colors"
            aria-label="Close photo"
          >
            <X size={20} />
          </button>

          {/* Circular Photo */}
          <div className="relative w-44 h-44 rounded-full p-1.5 bg-gradient-to-tr from-accent via-blue-500 to-purple-600 shadow-xl mb-6">
            <div className="w-full h-full rounded-full overflow-hidden bg-background flex items-center justify-center relative">
              {portfolioData.profileImage ? (
                <Image
                  src={portfolioData.profileImage}
                  alt={portfolioData.name || "Profile Photo"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-surface-hover text-accent">
                  <User size={64} className="mb-2" />
                  <span className="text-xs font-mono font-medium tracking-wider text-text-muted uppercase">
                    {portfolioData.name || "Siddhartha"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground tracking-tight text-center">
            {portfolioData.name || "Siddhartha Kuchana"}
          </h3>
          <p className="text-xs text-accent font-mono uppercase tracking-widest mt-1 text-center">
            {portfolioData.role || "AI & ML Engineer"}
          </p>
          <p className="text-xs text-text-muted mt-3 text-center">
            Double-click triggered photo preview
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
