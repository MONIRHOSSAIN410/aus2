"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 42 },
  down: { x: 0, y: -42 },
  left: { x: 48, y: 0 },
  right: { x: -48, y: 0 },
  none: { x: 0, y: 0 },
};

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "article" | "header";
}

/** Scroll-triggered entrance. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  amount = 0.25,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset = OFFSET[direction];
  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduce ? 0.3 : duration, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

export function StaggerGroup({
  children,
  className,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  );
}

/** Word-by-word headline reveal used on hero + section titles. */
export function SplitHeading({
  text,
  className,
  lineClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");

  return (
    <span className={cn("block", className)}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={cn("block overflow-hidden", lineClassName)}>
          <motion.span
            className="block"
            initial={reduce ? { opacity: 0 } : { y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.9,
              delay: delay + lineIndex * 0.09,
              ease: EASE_OUT,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
