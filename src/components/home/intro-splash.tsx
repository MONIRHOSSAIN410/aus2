"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const KEY = "zenji.intro.v1";

/**
 * Boot sequence: 力 kanji + wordmark over a diagonal split wipe.
 * Plays once per browser session, and never under reduced motion.
 */
export function IntroSplash() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage blocked — still play once */
    }
    setVisible(true);
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 1500);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <motion.div
            className="absolute inset-0 bg-bone"
            initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            animate={{ clipPath: "polygon(56% 0, 100% 0, 100% 100%, 44% 100%)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.span
            className="absolute select-none font-display text-[42vw] leading-none text-ink-700/70 md:text-[30vw]"
            initial={{ scale: 1.35, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ mixBlendMode: "difference" }}
          >
            力
          </motion.span>

          <motion.div
            className="relative w-[62vw] max-w-[560px] md:w-[38vw]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ mixBlendMode: "difference" }}
          >
            <Image
              src="/zenji-wordmark.png"
              alt=""
              width={1007}
              height={222}
              priority
              className="h-auto w-full select-none"
            />
          </motion.div>

          <motion.p
            className="absolute bottom-16 font-mono text-[10px] uppercase tracking-brand text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            力 — AWAKENING // SYSTEM ONLINE
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
