"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
  separator?: string;
}

/** CSS-driven infinite ticker. Duplicated once and translated -50% for a seamless loop. */
export function Marquee({
  items,
  className,
  itemClassName,
  speed = "normal",
  reverse = false,
  separator = "•",
}: MarqueeProps) {
  const track = [...items, ...items];
  const animation = reverse
    ? "animate-marquee-reverse"
    : speed === "fast"
      ? "animate-marquee-fast"
      : "animate-marquee";

  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-8 whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]",
          animation,
          speed === "slow" && "[animation-duration:52s]",
        )}
      >
        {track.map((item, index) => (
          <span key={index} className={cn("flex items-center gap-8", itemClassName)}>
            {item}
            <span aria-hidden className="text-blood">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
