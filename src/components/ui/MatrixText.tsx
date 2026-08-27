"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MatrixTextProps {
  text: string;
  className?: string;
  matrixChars?: string;
  speed?: number;
  triggerOnHover?: boolean;
}

const DEFAULT_CHARS = "ABCDEF0123456789@#$%&*!<>~";

export default function MatrixText({
  text,
  className,
  matrixChars = DEFAULT_CHARS,
  speed = 30,
  triggerOnHover = true,
}: MatrixTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return matrixChars[Math.floor(Math.random() * matrixChars.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, speed);
  }, [isScrambling, matrixChars, speed, text]);

  useEffect(() => {
    scramble();
  }, []);

  return (
    <span
      onMouseEnter={() => {
        if (triggerOnHover) scramble();
      }}
      className={cn("font-mono cursor-pointer transition-colors duration-200", className)}
    >
      {displayText}
    </span>
  );
}
