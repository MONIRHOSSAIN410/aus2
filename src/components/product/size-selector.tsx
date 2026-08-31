"use client";

import { cn } from "@/lib/utils";

export function SizeSelector({
  sizes,
  value,
  onChange,
  className,
}: {
  sizes: string[];
  value: string | null;
  onChange: (size: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-6 gap-2", className)} role="radiogroup" aria-label="Select size">
      {sizes.map((size) => {
        const active = value === size;
        return (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(size)}
            className={cn(
              "border py-3 font-mono text-[11px] uppercase tracking-wide2 transition-all",
              active
                ? "border-blood bg-blood text-white"
                : "border-white/20 text-white/60 hover:border-white/50 hover:text-white",
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
