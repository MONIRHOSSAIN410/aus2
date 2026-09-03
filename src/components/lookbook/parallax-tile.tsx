"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Editorial tile whose image drifts slightly against the scroll.
 *
 * The image is over-scaled so the drift never exposes an edge. Alternating the
 * direction by column keeps the masonry from moving as one slab.
 */
export function ParallaxTile({
  children,
  depth = 1,
  className,
}: {
  children: ReactNode;
  /** -1..1 — sign flips the drift direction, magnitude sets how far. */
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shift = 6 * depth;
  const y = useTransform(scrollYProgress, [0, 1], [`${-shift}%`, `${shift}%`]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="size-full scale-[1.14]">
        {children}
      </motion.div>
    </div>
  );
}
