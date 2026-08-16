"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Sparkles } from "lucide-react";
import Image from "next/image";
import { usePortfolioData } from "@/components/providers/PortfolioProvider";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const portfolioData = usePortfolioData();
  const [imageError, setImageError] = useState(false);

  if (!isOpen) return null;

  const profileImg = portfolioData.profileImage || "/profile.jpg";

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

          {/* Circular Photo Frame */}
          <div className="relative w-44 h-44 rounded-full p-1.5 bg-gradient-to-tr from-accent via-blue-500 to-purple-600 shadow-xl mb-6 group">
            <div className="w-full h-full rounded-full overflow-hidden bg-background flex items-center justify-center relative">
              {!imageError ? (
                <Image
                  src={profileImg}
                  alt={portfolioData.name || "Siddhartha Kuchana"}
                  fill
                  sizes="176px"
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-accent/20 to-blue-900/40 text-foreground p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center mb-2 text-accent font-mono text-2xl font-bold">
                    SK
                  </div>
                  <span className="text-xs font-mono text-text-muted">
                    Siddhartha Kuchana
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1.5 mb-1">
            <h3 className="text-xl font-bold text-foreground tracking-tight text-center">
              {portfolioData.name || "Siddhartha Kuchana"}
            </h3>
            <Sparkles size={16} className="text-accent" />
          </div>

          <p className="text-xs text-accent font-mono uppercase tracking-widest text-center">
            {portfolioData.role || "AI & ML Undergraduate"}
          </p>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
