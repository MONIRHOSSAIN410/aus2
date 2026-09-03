import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/** Intrinsic sizes of the supplied logo files, used to keep the aspect ratio exact. */
const ART = {
  wordmark: { light: "/zenji-wordmark.png", dark: "/zenji-wordmark-dark.png", w: 1007, h: 222 },
  mark: { light: "/zenji-mark.png", dark: "/zenji-mark-dark.png", w: 226, h: 179 },
};

interface WordmarkProps {
  /** "wordmark" is the full ZENJI lockup; "mark" is the ZJ monogram. */
  variant?: "wordmark" | "mark";
  /** Rendered height in px — width follows the logo's aspect ratio. */
  height?: number;
  /** "light" is the white logo for dark grounds; "dark" for light grounds. */
  tone?: "light" | "dark";
  href?: string | null;
  className?: string;
  priority?: boolean;
}

export function Wordmark({
  variant = "wordmark",
  height = 30,
  tone = "light",
  href = "/",
  className,
  priority = false,
}: WordmarkProps) {
  const art = ART[variant];
  const width = Math.round((art.w / art.h) * height);

  const image = (
    <Image
      src={tone === "dark" ? art.dark : art.light}
      alt="ZENJI"
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto select-none", className)}
      style={{ height, width }}
    />
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      aria-label="ZENJI — home"
      className="inline-flex items-center transition-opacity hover:opacity-80"
    >
      {image}
    </Link>
  );
}
