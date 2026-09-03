import type { Metadata } from "next";
import Link from "next/link";

import { Countdown } from "@/components/drop/countdown";
import { WaitlistForm } from "@/components/drop/waitlist-form";
import { Marquee } from "@/components/motion/marquee";
import { Reveal, SplitHeading } from "@/components/motion/reveal";
import { ProductCard } from "@/components/product/product-card";
import { COLLECTION_NAME, NEXT_DROP_DATE, NEXT_DROP_NAME, saleProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Drop",
  description: "AWAKENING is coming. Join the waitlist for early access to the next ZENJI drop.",
};

const dropDate = new Date(NEXT_DROP_DATE).toLocaleDateString("en-AU", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Australia/Sydney",
});

export default function DropPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#2a0d0d_0%,#0a0a0a_55%,#050505_100%)]" />
        <div className="absolute inset-0 grid-lines opacity-40" />
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[52vw] leading-none text-white/[0.025] md:text-[32vw]"
        >
          力
        </span>

        <div className="container relative py-24 md:py-32">
          <Reveal>
            <p className="zenji-eyebrow">INCOMING TRANSMISSION</p>
          </Reveal>

          <h1 className="zenji-display mt-6 text-6xl text-white sm:text-8xl lg:text-9xl">
            <SplitHeading text={`${NEXT_DROP_NAME}\nIS COMING.`} />
          </h1>

          <Reveal delay={0.14}>
            <p className="mt-8 max-w-lg font-mono text-[13px] leading-relaxed text-white/45">
              The next chapter begins. Are you ready?
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-brand text-blood">
              DROP DATE: {dropDate}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-14">
            <Countdown target={NEXT_DROP_DATE} />
          </Reveal>
        </div>

        <Marquee
          items={[`${NEXT_DROP_NAME} // IS COMING`, "力 SYSTEM ONLINE", "NO RESTOCKS. EVER."]}
          className="border-t border-white/10 py-4"
          itemClassName="font-mono text-[10px] uppercase tracking-brand text-white/30"
          speed="slow"
        />
      </section>

      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="zenji-eyebrow">GET EARLY ACCESS</p>
            <h2 className="zenji-display text-5xl text-white sm:text-6xl">JOIN THE WAITLIST.</h2>
            <p className="max-w-md font-mono text-[13px] leading-relaxed text-white/45">
              Be first to shop {NEXT_DROP_NAME}. Exclusive early access and a pre-drop discount for
              waitlist members.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <Reveal>
            <p className="zenji-eyebrow">{COLLECTION_NAME} {"//"} STILL AVAILABLE</p>
            <h2 className="zenji-display mt-4 text-5xl text-white sm:text-6xl">WHILE YOU WAIT.</h2>
            <p className="mt-4 font-mono text-[13px] text-white/45">
              Shop The Origin Drop, our current collection.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {saleProducts().map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>

          <div className="mt-14">
            <Link
              href="/collection"
              className="inline-flex items-center gap-3 border border-white/25 px-8 py-4 font-mono text-[11px] uppercase tracking-brand text-white transition-colors hover:border-blood hover:bg-blood"
            >
              VIEW FULL COLLECTION →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
