"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCookiesChoice } from "@/store/slices/uiSlice";

const KEY = "zenji.cookies.v1";

export function CookieBanner() {
  const dispatch = useAppDispatch();
  const choice = useAppSelector((state) => state.ui.cookiesChoice);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored === "accepted" || stored === "declined") dispatch(setCookiesChoice(stored));
    } catch {
      /* storage blocked */
    }
    const timer = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const decide = (value: "accepted" | "declined") => {
    dispatch(setCookiesChoice(value));
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* storage blocked */
    }
  };

  return (
    <AnimatePresence>
      {ready && !choice && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          role="region"
          aria-label="Cookie preferences"
          className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-ink-950/95 backdrop-blur-md"
        >
          <div className="container flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs text-white/70">
              We use cookies to improve your experience and track analytics.
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => decide("accepted")}>
                ACCEPT
              </Button>
              <Button size="sm" variant="outline" onClick={() => decide("declined")}>
                DECLINE
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
