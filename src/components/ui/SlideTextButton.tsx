"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlideTextButtonProps extends HTMLMotionProps<"button"> {
  primaryText: string;
  secondaryText?: string;
  icon?: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function SlideTextButton({
  primaryText,
  secondaryText,
  icon,
  href,
  variant = "primary",
  className,
  ...props
}: SlideTextButtonProps) {
  const content = (
    <motion.button
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full px-8 py-4 font-medium overflow-hidden transition-all duration-300 group cursor-pointer",
        variant === "primary" && "bg-foreground text-background hover:bg-accent hover:text-background shadow-lg",
        variant === "secondary" && "bg-surface border border-border-color text-foreground hover:border-accent hover:text-accent",
        variant === "outline" && "border border-accent text-accent hover:bg-accent/10",
        className
      )}
      {...props}
    >
      <div className="relative h-6 overflow-hidden flex flex-col justify-start items-center">
        {/* Primary Text */}
        <motion.div
          variants={{
            hover: { y: "-100%" },
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex items-center gap-2 h-6"
        >
          <span>{primaryText}</span>
          {icon}
        </motion.div>

        {/* Secondary Text (revealed on hover) */}
        <motion.div
          variants={{
            hover: { y: "-100%" },
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex items-center gap-2 h-6 font-semibold tracking-wide"
        >
          <span>{secondaryText || primaryText}</span>
          {icon}
        </motion.div>
      </div>
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
}
