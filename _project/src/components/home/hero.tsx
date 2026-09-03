"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Magnetic } from "@/components/motion/magnetic";
import { SplitHeading } from "@/components/motion/reveal";
import { ProductImage } from "@/components/product/product-image";
import { COLLECTION_NAME, getProduct } from "@/lib/products";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.14]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const kanjiY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-38%"]);

  /** The campaign shot behind the headline. */
  const backdrop = getProduct("warrior-spirit-tee")!;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-white/10"
    >
      {/* layered background — on-model photography under a graded scrim */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <ProductImage
          product={backdrop}
          view="ON MODEL"
          alt=""
          sizes="100vw"
          priority
          className="absolute inset-0 size-full"
          imgClassName="object-center opacity-55"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_15%,rgba(42,13,13,.72)_0%,rgba(10,10,10,.9)_55%,#050505_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/70" />
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div className="noise-overlay absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        <motion.span
          style={{ y: kanjiY }}
          className="absolute -right-8 top-1/2 -translate-y-1/2 select-none font-display text-[46vw] leading-none text-white/[0.04] md:text-[34vw]"
          aria-hidden
        >
          力
        </motion.span>
      </motion.div>

      <motion.div style={{ opacity }} className="container relative py-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="zenji-eyebrow"
        >
          {COLLECTION_NAME} {"//"} LOADING...
        </motion.p>

        <h1 className="zenji-display mt-6 text-[19vw] text-white sm:text-[15vw] lg:text-[11rem]">
          <SplitHeading text={"WEAR YOUR\nSTORY"} delay={0.2} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-8 max-w-lg font-mono text-sm leading-relaxed text-white/50"
        >
          Anime-inspired streetwear built for gamers and otaku. Japanese artwork, oversized
          silhouettes, heavyweight cotton. Every drop limited — no restocks, ever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Link
              href="/collection"
              className="inline-flex items-center gap-3 bg-blood px-9 py-4 font-mono text-[11px] uppercase tracking-brand text-white transition-colors hover:bg-blood-600"
            >
              SHOP THE DROP <ArrowRight className="size-4" />
            </Link>
          </Magnetic>
          <Link
            href="/lookbook"
            className="zenji-link-underline font-mono text-[11px] uppercase tracking-brand text-white/60 hover:text-white"
          >
            VIEW THE LOOKBOOK
          </Link>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-brand text-white/35 hover:text-white"
      >
        SCROLL
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
