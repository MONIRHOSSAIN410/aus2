"use client";

import { useEffect, useRef } from "react";

const HOVER_TARGETS =
  'a, button, [role="button"], input, select, textarea, summary, label, [data-cursor="grow"]';

/**
 * Katana cursor.
 *
 * A fixed image that follows the pointer while the native cursor is hidden
 * (see `globals.css`). It scales up over interactive elements and fades out when
 * the pointer leaves the window.
 *
 * Runs only on fine pointers, and does nothing under `prefers-reduced-motion`,
 * where the native cursor stays visible instead.
 */
export function KatanaCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const bladeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const root = ref.current;
    const blade = bladeRef.current;
    if (!root || !blade) return;

    document.documentElement.dataset.katana = "on";

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let visible = false;

    const draw = () => {
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = 0;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        root.style.opacity = "1";
      }
      schedule();

      const target = event.target as Element | null;
      const interactive = Boolean(target?.closest?.(HOVER_TARGETS));
      blade.style.transform = interactive ? "scale(1.25) rotate(-8deg)" : "scale(1)";
    };

    const hide = () => {
      visible = false;
      root.style.opacity = "0";
    };

    const onDown = () => {
      blade.style.transform = "scale(0.86) rotate(6deg)";
    };
    const onUp = () => {
      blade.style.transform = "scale(1)";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      if (raf) cancelAnimationFrame(raf);
      delete document.documentElement.dataset.katana;
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100000] hidden opacity-0 will-change-transform [transition:opacity_150ms_linear] [html[data-katana='on']_&]:block"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={bladeRef}
        src="/cursor-katana.png"
        alt=""
        width={75}
        height={80}
        draggable={false}
        className="block [transform-origin:14px_20px] [transition:transform_120ms_ease-out]"
      />
    </div>
  );
}
