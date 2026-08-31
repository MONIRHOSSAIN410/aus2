"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function diff(target: string) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    done: ms === 0,
  };
}

/** Live countdown. Renders zeros on the server, then ticks once mounted (no hydration mismatch). */
export function Countdown({ target }: { target: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(diff(target));
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { value: time.days, label: "DAYS" },
    { value: time.hours, label: "HOURS" },
    { value: time.minutes, label: "MINUTES" },
    { value: time.seconds, label: "SECONDS" },
  ];

  return (
    <div className="flex items-start gap-3 sm:gap-6" aria-live="polite">
      {units.map((unit, index) => (
        <div key={unit.label} className="flex items-start gap-3 sm:gap-6">
          <div className="text-center">
            <motion.p
              key={mounted ? unit.value : "static"}
              initial={{ opacity: 0.4, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="min-w-[2ch] font-display text-5xl tabular-nums text-white sm:text-7xl"
            >
              {String(unit.value).padStart(2, "0")}
            </motion.p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-brand text-white/35">
              {unit.label}
            </p>
          </div>
          {index < units.length - 1 && (
            <span className="font-display text-4xl text-blood sm:text-6xl">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
