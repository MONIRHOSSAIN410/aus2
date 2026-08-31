import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[48vw] leading-none text-white/[0.03] md:text-[28vw]"
      >
        404
      </span>

      <div className="container relative text-center">
        <p className="zenji-eyebrow">SIGNAL LOST</p>
        <h1 className="zenji-display mt-5 text-6xl text-white sm:text-8xl">
          THIS ARC
          <br />
          DOESN'T EXIST.
        </h1>
        <p className="mx-auto mt-6 max-w-sm font-mono text-[13px] text-white/45">
          The page you're after has dropped out of the archive. It may have sold through — no
          restocks, ever.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/collection">BROWSE THE COLLECTION →</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">BACK TO HOME</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
