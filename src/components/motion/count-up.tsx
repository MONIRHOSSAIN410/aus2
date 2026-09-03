"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** The value to land on. Non-numeric labels are rendered as-is. */
  value: string | number;
  duration?: number;
  className?: string;
}

/**
 * Counts a stat up once it scrolls into view.
 *
 * Falls back to the plain value for anything that is not a number (the stat grid
 * mixes "10" with "EST_2024" and "AU"), and for reduced motion.
 */
export function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const raw = String(value);
  const numeric = /^\d+$/.test(raw) ? Number(raw) : null;
  const pad = numeric !== null ? raw.length : 0;

  const [display, setDisplay] = useState(numeric === null || reduce ? raw : "0".repeat(pad));

  useEffect(() => {
    if (numeric === null || reduce || !inView) return;
    const controls = animate(0, numeric, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(String(Math.round(latest)).padStart(pad, "0")),
    });
    return () => controls.stop();
  }, [inView, numeric, duration, pad, reduce]);

  return (
    <span ref={ref} className={className}>
      {numeric === null ? raw : display}
    </span>
  );
}
