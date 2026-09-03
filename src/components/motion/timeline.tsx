"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

/**
 * Vertical timeline whose rail draws itself as the section scrolls past, with a
 * marker filling in as the rail reaches each entry.
 */
export function Timeline({ entries, footer }: { entries: TimelineEntry[]; footer?: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const height = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const scaleY = useTransform(height, (value) => value);

  return (
    <>
      <ol ref={ref} className="relative mt-14 pl-8">
        {/* rail: a dim track with the drawn line on top */}
        <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-white/10" />
        <motion.span
          aria-hidden
          style={{ scaleY }}
          className="absolute left-0 top-0 h-full w-px origin-top bg-blood"
        />

        {entries.map((entry, index) => (
          <motion.li
            key={entry.year}
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="relative pb-12 last:pb-0"
          >
            <motion.span
              aria-hidden
              initial={{ scale: 0.3, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: index * 0.06 + 0.1, type: "spring", stiffness: 260, damping: 18 }}
              className="absolute -left-[37px] top-1.5 size-3 border-2 border-blood bg-ink-950"
            />
            <p className="font-display text-4xl text-white/25">{entry.year}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-brand text-white">
              {entry.title}
            </p>
            <p className="mt-2 max-w-md font-mono text-[13px] leading-relaxed text-white/45">
              {entry.body}
            </p>
          </motion.li>
        ))}
      </ol>
      {footer}
    </>
  );
}
