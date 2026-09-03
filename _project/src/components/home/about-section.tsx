"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Reveal, SplitHeading } from "@/components/motion/reveal";
import { ProductImage } from "@/components/product/product-image";
import { getProduct } from "@/lib/products";

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const hero = getProduct("warrior-spirit-tee")!;

  return (
    <section
      id="about"
      ref={ref}
      className="relative border-b border-white/10 bg-ink-950 py-20 md:py-32"
    >
      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div style={{ y: imageY }} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden border border-white/10">
            <ProductImage
              product={hero}
              view="ON MODEL"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="size-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden border border-blood bg-ink-950 px-6 py-4 md:block">
            <p className="font-display text-4xl text-white">力</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-brand text-white/40">
              STRENGTH
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          <Reveal>
            <p className="zenji-eyebrow">ABOUT // ZENJI</p>
          </Reveal>

          <h2 className="zenji-display text-5xl text-white sm:text-6xl lg:text-7xl">
            <SplitHeading text={"BORN FROM THE\nWARRIOR SPIRIT."} />
          </h2>

          <Reveal delay={0.1} className="space-y-5 font-mono text-[13px] leading-relaxed text-white/50">
            <p>ZENJI began with one belief: what you wear should tell a story.</p>
            <p>
              Inspired by samurai discipline, anime art and modern street culture, we create premium
              streetwear for those who choose their own path.
            </p>
            <p>
              Every ZENJI piece combines Japanese-inspired artwork, powerful symbolism and oversized
              silhouettes to express courage, creativity and individuality.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <blockquote className="border-l-2 border-blood pl-5 font-mono text-sm italic text-white/70">
              "The warrior within refuses to fade into the crowd."
            </blockquote>
          </Reveal>

          <Reveal delay={0.22} className="space-y-6">
            <p className="font-mono text-[10px] uppercase tracking-brand text-white/30">
              FOR THE DREAMERS. FIGHTERS. CREATORS. OUTSIDERS.
            </p>
            <Link
              href="/collection"
              className="inline-flex items-center gap-3 border border-white/25 px-7 py-4 font-mono text-[11px] uppercase tracking-brand text-white transition-colors hover:border-blood hover:bg-blood"
            >
              EXPLORE THE COLLECTION <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
