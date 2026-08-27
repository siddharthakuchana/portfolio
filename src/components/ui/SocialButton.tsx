"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  badge?: string;
  target?: string;
}

export default function SocialButton({
  icon,
  label,
  href,
  onClick,
  className,
  badge,
  target,
}: SocialButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isExternal = href && href.startsWith("http");

  const buttonInner = (
    <div className="transition-transform group-hover:rotate-6">{icon}</div>
  );

  const sharedProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    whileHover: { scale: 1.1, y: -2 },
    whileTap: { scale: 0.95 },
    className: cn(
      "w-12 h-12 rounded-2xl bg-surface/90 border border-border-color flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/60 shadow-lg backdrop-blur-md transition-colors duration-300 group cursor-pointer",
      className
    ),
    "aria-label": label,
  };

  return (
    <div className="relative inline-flex items-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: -42, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="px-3 py-1 bg-surface border border-accent/40 rounded-xl text-xs font-medium text-foreground shadow-xl flex items-center gap-1.5 whitespace-nowrap backdrop-blur-md">
              <span>{label}</span>
              {badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-accent/20 text-accent font-mono">
                  {badge}
                </span>
              )}
              {/* Arrow */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-surface border-r border-b border-accent/40 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {onClick ? (
        <motion.button onClick={onClick} {...sharedProps}>
          {buttonInner}
        </motion.button>
      ) : (
        <motion.a
          href={href}
          target={target || (isExternal ? "_blank" : undefined)}
          rel={isExternal ? "noopener noreferrer" : undefined}
          {...sharedProps}
        >
          {buttonInner}
        </motion.a>
      )}
    </div>
  );
}
