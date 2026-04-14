"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

const morphClasses = [
  "blob-morph-1",
  "blob-morph-2",
  "blob-morph-3",
  "blob-morph-4",
] as const;

// Squishy spring config — loose, bouncy, playful
const squishySpring = { stiffness: 150, damping: 12, mass: 0.8 };

interface MorphingBlobProps {
  color: string;
  size: string;
  position: string;
  parallaxSpeed?: number;
  variant?: number;
  border?: string;
  draggable?: boolean;
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
  draggable = false,
  className,
  children,
}: MorphingBlobProps) {
  const ref = useRef<HTMLDivElement>(null);
  const constraintRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scrollY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion
      ? [0, 0]
      : [parallaxSpeed * -300, parallaxSpeed * 300],
  );

  const springRotate = useSpring(0, squishySpring);
  const springScale = useSpring(1, squishySpring);

  const morphClass = prefersReducedMotion
    ? "rounded-full"
    : morphClasses[variant % morphClasses.length];

  if (draggable) {
    return (
      <div
        ref={constraintRef}
        className="pointer-events-none absolute inset-12"
      >
        <motion.div
          ref={ref}
          className={cn(
            color,
            size,
            position,
            "pointer-events-auto cursor-grab active:cursor-grabbing",
            morphClass,
            border,
            children && "flex items-center justify-center",
            className,
          )}
          drag
          dragConstraints={constraintRef}
          dragElastic={0.3}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 15 }}
          style={{
            rotate: springRotate,
            scale: springScale,
          }}
          onDrag={(_e, info) => {
            springRotate.set(info.velocity.x * 0.03);
            const speed = Math.sqrt(
              info.velocity.x ** 2 + info.velocity.y ** 2,
            );
            springScale.set(1 + Math.min(speed * 0.0002, 0.15));
          }}
          onDragEnd={() => {
            springRotate.set(0);
            springScale.set(1);
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

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
      style={{ y: scrollY }}
    >
      {children}
    </motion.div>
  );
}
