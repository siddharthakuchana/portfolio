"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, FolderCheck, GraduationCap, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface RingData {
  label: string;
  value: number; // 0 - 100
  color: string; // stroke hex or css color
  glowColor: string;
  icon: React.ReactNode;
  detail: string;
}

interface AppleActivityCardProps {
  className?: string;
  ringsData?: RingData[];
}

const defaultRings: RingData[] = [
  {
    label: "Coding Streak",
    value: 92,
    color: "#ff2d55",
    glowColor: "rgba(255, 45, 85, 0.4)",
    icon: <Flame className="w-4 h-4 text-[#ff2d55]" />,
    detail: "124 Days Active",
  },
  {
    label: "Projects Completed",
    value: 85,
    color: "#5856d6",
    glowColor: "rgba(88, 86, 214, 0.4)",
    icon: <FolderCheck className="w-4 h-4 text-[#5856d6]" />,
    detail: "12+ Live Repos",
  },
  {
    label: "Problem Solving",
    value: 78,
    color: "#30d158",
    glowColor: "rgba(48, 209, 88, 0.4)",
    icon: <Code2 className="w-4 h-4 text-[#30d158]" />,
    detail: "350+ Problems",
  },
  {
    label: "Academic Score",
    value: 94,
    color: "#00d2ff",
    glowColor: "rgba(0, 210, 255, 0.4)",
    icon: <GraduationCap className="w-4 h-4 text-[#00d2ff]" />,
    detail: "9.4 CGPA (Distinction)",
  },
];

export default function AppleActivityCard({
  className,
  ringsData = defaultRings,
}: AppleActivityCardProps) {
  const center = 110;
  const strokeWidth = 14;

  return (
    <div
      className={cn(
        "relative bg-surface/90 backdrop-blur-xl border border-border-color/80 rounded-3xl p-6 shadow-2xl overflow-hidden group hover:border-accent/40 transition-all duration-500",
        className
      )}
    >
      {/* Background radial highlight */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-wider">
            Apple Activity Rings
          </span>
          <h3 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            Activity Metrics
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {/* Concentric Rings SVG */}
        <div className="relative flex items-center justify-center py-2">
          <svg width="220" height="220" viewBox="0 0 220 220" className="rotate-[-90deg]">
            {ringsData.map((ring, idx) => {
              const radius = 90 - idx * 20;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (ring.value / 100) * circumference;

              return (
                <g key={ring.label}>
                  {/* Track ring */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={ring.color}
                    strokeWidth={strokeWidth}
                    strokeOpacity={0.15}
                    fill="none"
                  />
                  {/* Animated Progress ring */}
                  <motion.circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={ring.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, delay: idx * 0.2, ease: "easeOut" }}
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      filter: `drop-shadow(0 0 6px ${ring.glowColor})`,
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Center Apple-style summary */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-3xl font-extrabold text-foreground tracking-tight font-mono">
              92%
            </span>
            <span className="text-[10px] text-text-muted uppercase tracking-widest font-mono">
              Overall Goal
            </span>
          </div>
        </div>

        {/* Legend & Stats list */}
        <div className="space-y-3">
          {ringsData.map((ring) => (
            <div
              key={ring.label}
              className="flex items-center justify-between p-2.5 rounded-xl bg-background/60 border border-border-color/50 hover:bg-surface-hover transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface border border-border-color"
                >
                  {ring.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground tracking-tight">
                    {ring.label}
                  </div>
                  <div className="text-[10px] text-text-muted font-mono">{ring.detail}</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-foreground">
                  {ring.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
