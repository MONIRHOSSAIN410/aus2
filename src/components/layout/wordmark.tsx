import Link from "next/link";

import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  href = "/",
  as = "link",
}: {
  className?: string;
  href?: string;
  as?: "link" | "text";
}) {
  const content = (
    <span
      className={cn(
        "zenji-display select-none text-3xl tracking-[-0.02em] text-white",
        className,
      )}
    >
      ZEN<span className="text-blood">J</span>I
    </span>
  );

  if (as === "text") return content;

  return (
    <Link href={href} aria-label="ZENJI — home" className="inline-flex items-center">
      {content}
    </Link>
  );
}
