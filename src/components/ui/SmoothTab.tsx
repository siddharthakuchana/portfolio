"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface SmoothTabProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function SmoothTab({
  tabs,
  activeTab,
  onChange,
  className,
}: SmoothTabProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center p-1.5 bg-surface/80 border border-border-color/80 rounded-2xl backdrop-blur-xl shadow-inner",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 cursor-pointer flex items-center gap-2 outline-none select-none z-10",
              isActive ? "text-foreground font-semibold" : "text-text-muted hover:text-foreground"
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-md text-[10px] font-mono transition-colors",
                  isActive ? "bg-accent/20 text-accent" : "bg-background border border-border-color text-text-muted"
                )}
              >
                {tab.count}
              </span>
            )}

            {/* Sliding Pill Highlight */}
            {isActive && (
              <motion.div
                layoutId="smoothTabActivePill"
                className="absolute inset-0 bg-background border border-accent/40 rounded-xl shadow-sm -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
