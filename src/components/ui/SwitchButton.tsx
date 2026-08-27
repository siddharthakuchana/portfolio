"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwitchButtonProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  className?: string;
}

export default function SwitchButton({
  checked: controlledChecked,
  onCheckedChange,
  leftIcon,
  rightIcon,
  label,
  className,
}: SwitchButtonProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const toggle = () => {
    const nextState = !isChecked;
    if (controlledChecked === undefined) {
      setInternalChecked(nextState);
    }
    onCheckedChange?.(nextState);
  };

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      {label && <span className="text-xs font-mono text-text-muted">{label}</span>}

      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={toggle}
        className={cn(
          "relative w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center cursor-pointer border border-border-color",
          isChecked ? "bg-accent/20 border-accent/50" : "bg-surface"
        )}
      >
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2 text-text-muted pointer-events-none">
          <span className={cn("transition-opacity duration-200", isChecked ? "opacity-40" : "opacity-100")}>
            {leftIcon}
          </span>
          <span className={cn("transition-opacity duration-200", isChecked ? "opacity-100 text-accent" : "opacity-40")}>
            {rightIcon}
          </span>
        </div>

        {/* Sliding Knob */}
        <motion.div
          animate={{ x: isChecked ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "w-6 h-6 rounded-full shadow-md flex items-center justify-center transition-colors duration-300 z-10",
            isChecked ? "bg-accent text-background" : "bg-foreground text-background"
          )}
        />
      </button>
    </div>
  );
}
