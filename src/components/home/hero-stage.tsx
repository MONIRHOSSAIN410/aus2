"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Magnetic } from "@/components/motion/magnetic";
import { SplitHeading } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { heroStage, type HeroVariant } from "@/lib/hero-stage";
import { COLLECTION_NAME } from "@/lib/products";

/**
 * Scroll-scrubbed hero.
 *
 * A tall spacer holds the scroll distance; a sticky viewport-height panel inside
 * it paints one frame of the sequence per scroll position onto a canvas.
 *
 * Degrades in three steps, so the hero always shows something:
 *  1. reduced motion  → the poster still, no canvas, no scrubbing
 *  2. frames loading  → the poster still, swapped out as soon as frame 0 decodes
 *  3. frames blocked  → the poster's own `onError` leaves the gradient ground
 */
export function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const drawnRef = useRef(-1);
  const rafRef = useRef(0);

  const reduce = useReducedMotion();
  const [variant, setVariant] = useState<HeroVariant>("desktop");
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // Copy fades and lifts away over the last stretch of the scrub.
  const copyOpacity = useTransform(scrollYProgress, [0, heroStage.handoff, 1], [1, 1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.85]);

  const config = heroStage[variant];

  /* ---- pick the sequence that fits the viewport ---- */
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const apply = () => setVariant(query.matches ? "desktop" : "mobile");
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  /* ---- preload the sequence ---- */
  useEffect(() => {
    if (reduce) return;

    let cancelled = false;
    const images: HTMLImageElement[] = [];
    framesRef.current = images;
    drawnRef.current = -1;
    setReady(false);

    // Frame 0 first so the canvas can take over from the poster immediately,
    // then the rest in order — later frames arrive before you scroll to them.
    const load = (index: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          images[index] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = heroStage.frame(config.dir, index);
      });

    (async () => {
      await load(0);
      if (cancelled) return;
      setReady(true);
      requestDraw();

      for (let i = 1; i < config.count; i += 1) {
        if (cancelled) return;
        await load(i);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.dir, config.count, reduce]);

  /* ---- paint ---- */
  const requestDraw = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      paint(scrollYProgress.get());
    });
  };

  const paint = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const index = Math.min(
      config.count - 1,
      Math.max(0, Math.round(progress * (config.count - 1))),
    );

    // Fall back to the nearest earlier frame that has decoded, so scrubbing
    // ahead of the preloader shows the last good frame instead of blanking.
    let frame = framesRef.current[index];
    for (let i = index; i >= 0 && !frame; i -= 1) frame = framesRef.current[i];
    if (!frame) return;
    if (drawnRef.current === index) return;
    drawnRef.current = index;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // cover-fit the frame into the panel
    const scale = Math.max(width / frame.naturalWidth, height / frame.naturalHeight);
    const drawWidth = frame.naturalWidth * scale;
    const drawHeight = frame.naturalHeight * scale;
    ctx.drawImage(
      frame,
      (width - drawWidth) / 2,
      (height - drawHeight) / 2,
      drawWidth,
      drawHeight,
    );
  };

  useEffect(() => {
    if (reduce) return;
    const stop = scrollYProgress.on("change", requestDraw);
    const onResize = () => {
      drawnRef.current = -1;
      requestDraw();
    };
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, variant]);

  return (
    <div
      ref={stageRef}
      data-hero-stage
      className="relative"
      style={{ height: reduce ? "100vh" : "var(--hero-scroll)" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ground under everything, so a blocked frame source still looks intentional */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_10%,#2a0d0d_0%,#0a0a0a_55%,#050505_100%)]" />

        {/* poster — visible until frame 0 decodes, and the reduced-motion fallback */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroStage.poster(config.dir)}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-opacity duration-500"
          style={{ opacity: ready && !reduce ? 0 : 1 }}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        {!reduce && <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden />}

        {/* veil + grid, deepening as the sequence plays */}
        <motion.div
          aria-hidden
          style={{ opacity: veilOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/25"
        />
        <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />
        <div aria-hidden className="noise-overlay absolute inset-0 opacity-[0.06] mix-blend-overlay" />

        {/* copy */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="container relative flex h-full flex-col justify-end pb-24 md:justify-center md:pb-0"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-brand text-blood sm:text-[11px]"
          >
            <span className="size-2 animate-pulse-dot rounded-full bg-blood" />
            {COLLECTION_NAME} {"//"} LOADING...
          </motion.p>

          <h1 className="zenji-display mt-6 text-[19vw] text-white sm:text-[15vw] lg:text-[11rem]">
            <SplitHeading text={"WEAR YOUR\nSTORY"} delay={0.2} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="mt-8 max-w-lg font-mono text-sm leading-relaxed text-white/55"
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
              <Button asChild size="lg">
                <Link href="/collection">
                  SHOP THE DROP <ArrowRight className="size-4" />
                </Link>
              </Button>
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
          style={{ opacity: copyOpacity }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-brand text-white/35 hover:text-white"
        >
          SCROLL
          <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ArrowDown className="size-4" />
          </motion.span>
        </motion.a>
      </div>
    </div>
  );
}
