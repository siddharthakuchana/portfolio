"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Award, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface CgpaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const semData = [
  { label: "1-1", full: "1st Year 1st Sem", sgpa: 7.65 },
  { label: "1-2", full: "1st Year 2nd Sem", sgpa: 7.83 },
  { label: "2-1", full: "2nd Year 1st Sem", sgpa: 8.05 },
  { label: "2-2", full: "2nd Year 2nd Sem", sgpa: 9.00 },
  { label: "3-1", full: "3rd Year 1st Sem", sgpa: 8.80 },
  { label: "3-2", full: "3rd Year 2nd Sem", sgpa: 9.18 },
];

export default function CgpaModal({ isOpen, onClose }: CgpaModalProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  const maxSgpa = 10;
  const minSgpa = 6.0;

  // SVG Chart calculation parameters
  const width = 500;
  const height = 180;
  const paddingX = 40;
  const paddingY = 30;

  const points = semData.map((item, index) => {
    const x = paddingX + (index / (semData.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((item.sgpa - minSgpa) / (maxSgpa - minSgpa)) * (height - paddingY * 2);
    return { x, y, ...item };
  });

  const pathD = points.reduce(
    (acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
    ""
  );

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

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

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 bg-surface border border-border-color p-6 md:p-8 rounded-3xl shadow-2xl max-w-xl w-full"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-foreground hover:bg-surface-hover rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-accent/10 text-accent rounded-2xl">
              <Award size={28} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-bold text-foreground">Academic Performance</h3>
                <span className="bg-accent/20 text-accent text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full">
                  Overall CGPA: 8.41
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">Semester-wise SGPA progress & trajectory</p>
            </div>
          </div>

          {/* Visual SVG Graph */}
          <div className="bg-background/80 border border-border-color rounded-2xl p-4 mb-6 relative overflow-hidden">
            <div className="flex justify-between items-center mb-2 px-2">
              <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                <TrendingUp size={14} className="text-accent" /> SGPA Growth Curve
              </span>
              <span className="text-xs font-mono text-accent font-semibold">Peak: 9.18</span>
            </div>

            <div className="relative w-full overflow-x-auto">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent, #3b82f6)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--color-accent, #3b82f6)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                {[7.0, 8.0, 9.0].map((val) => {
                  const y = height - paddingY - ((val - minSgpa) / (maxSgpa - minSgpa)) * (height - paddingY * 2);
                  return (
                    <g key={val}>
                      <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
                      <text x={10} y={y + 4} fill="currentColor" opacity="0.4" fontSize="10" fontFamily="monospace">
                        {val.toFixed(1)}
                      </text>
                    </g>
                  );
                })}

                {/* Gradient area */}
                <path d={areaD} fill="url(#chartGradient)" />

                {/* Line path */}
                <path d={pathD} fill="none" stroke="var(--color-accent, #3b82f6)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Data Points */}
                {points.map((pt, idx) => (
                  <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredIdx === idx ? "7" : "5"}
                      fill="var(--color-accent, #3b82f6)"
                      stroke="#000"
                      strokeWidth="2"
                      className="transition-all duration-200"
                    />
                    <text
                      x={pt.x}
                      y={height - 8}
                      textAnchor="middle"
                      fill="currentColor"
                      fontSize="11"
                      fontFamily="monospace"
                      className={hoveredIdx === idx ? "fill-accent font-bold" : "opacity-60"}
                    >
                      {pt.label}
                    </text>
                    <text
                      x={pt.x}
                      y={pt.y - 10}
                      textAnchor="middle"
                      fill="currentColor"
                      fontSize="11"
                      fontWeight="bold"
                      className="fill-foreground font-mono"
                    >
                      {pt.sgpa.toFixed(2)}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Detailed Semester Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {semData.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`p-3 rounded-xl border transition-all ${
                  hoveredIdx === idx
                    ? "bg-accent/10 border-accent text-accent"
                    : "bg-surface border-border-color hover:border-accent/40 text-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-text-muted uppercase">{item.full}</span>
                  <CheckCircle2 size={12} className="text-accent opacity-60" />
                </div>
                <div className="text-xl font-bold font-mono mt-1 text-foreground">
                  {item.sgpa.toFixed(2)}
                  <span className="text-[10px] text-text-muted font-normal ml-1">SGPA</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
