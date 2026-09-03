"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearToast } from "@/store/slices/uiSlice";

export function Toaster() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.ui.toast);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => dispatch(clearToast()), 3200);
    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[80] flex flex-col gap-2">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto min-w-[260px] max-w-sm border border-white/15 border-l-blood border-l-2 bg-ink-900/95 p-4 backdrop-blur-md"
          >
            <p className="font-mono text-[11px] uppercase tracking-brand text-white">{toast.title}</p>
            {toast.description && (
              <p className="mt-1 font-mono text-[11px] text-white/45">{toast.description}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
