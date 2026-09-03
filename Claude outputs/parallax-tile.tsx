"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Editorial tile whose image drifts against the scroll.
 *
 * All tiles share ONE scroll listener and one rAF loop, registered here as a
 * module-level pool. The lookbook renders thirty of these; giving each its own
 * `useScroll` meant thirty listeners and thirty spring animations competing on
 * every frame, which is what made scrolling that page feel heavy.
 *
 * Only tiles currently on screen are transformed — an IntersectionObserver
 * parks the rest.
 */

type Tile = { el: HTMLElement; inner: HTMLElement; depth: number; visible: boolean };

const tiles = new Set<Tile>();
let frame = 0;
let observer: IntersectionObserver | null = null;
let listening = false;

const SHIFT = 7; // % of the tile height the image travels, at depth 1

function render() {
  frame = 0;
  const viewport = window.innerHeight;

  tiles.forEach((tile) => {
    if (!tile.visible) return;
    const rect = tile.el.getBoundingClientRect();
    // -1 just below the fold → 1 just above it
    const progress = (rect.top + rect.height / 2 - viewport / 2) / (viewport / 2 + rect.height / 2);
    const clamped = Math.max(-1, Math.min(1, progress));
    tile.inner.style.transform = `translate3d(0, ${clamped * SHIFT * tile.depth}%, 0) scale(1.14)`;
  });
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(render);
}

function join(tile: Tile) {
  tiles.add(tile);

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          tiles.forEach((candidate) => {
            if (candidate.el === entry.target) candidate.visible = entry.isIntersecting;
          });
        });
        schedule();
      },
      { rootMargin: "20% 0px" },
    );
  }
  observer.observe(tile.el);

  if (!listening) {
    listening = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }

  schedule();
}

function leave(tile: Tile) {
  observer?.unobserve(tile.el);
  tiles.delete(tile);

  if (tiles.size === 0) {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    listening = false;
    observer?.disconnect();
    observer = null;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  }
}

export function ParallaxTile({
  children,
  depth = 1,
  className,
}: {
  children: ReactNode;
  /** -1..1 — sign flips the drift direction, magnitude sets how far. */
  depth?: number;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = outerRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const tile: Tile = { el, inner, depth, visible: false };
    join(tile);
    return () => leave(tile);
  }, [depth]);

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className="size-full scale-[1.14] will-change-transform">
        {children}
      </div>
    </div>
  );
}
