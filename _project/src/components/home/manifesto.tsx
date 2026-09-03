"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { Reveal } from "@/components/motion/reveal";

const STATS = [
  { value: "10", label: "PIECES IN DROP 001" },
  { value: "240", label: "GSM HEAVYWEIGHT COTTON" },
  { value: "00", label: "RESTOCKS. EVER." },
  { value: "AU", label: "DESIGNED + SHIPPED" },
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-white/10 py-24 md:py-36">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <motion.span
        style={{ x }}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[26vw] leading-none text-white/[0.03]"
      >
        ZENJI ETHOS
      </motion.span>

      <div className="container relative">
        <Reveal>
          <p className="zenji-eyebrow">MANIFESTO_001</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="zenji-display mt-5 text-6xl text-white sm:text-7xl lg:text-8xl">
            THE
            <br />
            <span className="text-blood">ZENJI</span>
            <br />
            ETHOS
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-xl font-mono text-[13px] leading-relaxed text-white/50">
            We exist at the intersection of technical precision and cultural expression. Our garments
            are engineered for those navigating an increasingly fragmented world, built from Japanese
            craftsmanship, anime culture and modern Australian streetwear.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.07} className="bg-ink-950 p-8">
              <p className="font-display text-5xl text-white">{stat.value}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-brand text-white/35">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
