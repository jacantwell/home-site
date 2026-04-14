"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const morphClasses = [
  "blob-morph-1",
  "blob-morph-2",
  "blob-morph-3",
  "blob-morph-4",
] as const;

interface MorphingBlobProps {
  color: string;
  size: string;
  position: string;
  parallaxSpeed?: number;
  variant?: number;
  border?: string;
  className?: string;
  children?: React.ReactNode;
}

export function MorphingBlob({
  color,
  size,
  position,
  parallaxSpeed = 0,
  variant = 0,
  border,
  className,
  children,
}: MorphingBlobProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion
      ? [0, 0]
      : [parallaxSpeed * -300, parallaxSpeed * 300],
  );

  const morphClass = prefersReducedMotion
    ? "rounded-full"
    : morphClasses[variant % morphClasses.length];

  return (
    <motion.div
      ref={ref}
      className={cn(
        color,
        size,
        position,
        morphClass,
        border,
        children && "flex items-center justify-center",
        className,
      )}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}
