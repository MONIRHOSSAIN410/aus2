import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Timeline } from "@/components/motion/timeline";
import { ProductImage } from "@/components/product/product-image";
import { PageHero } from "@/components/shared/page-hero";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "ZENJI began with one belief: what you wear should tell a story. Australian anime streetwear born from the warrior spirit.",
};

const FACTS = [
  { title: "WHAT ZENJI IS", body: "An Australian anime streetwear brand built for gamers and otaku." },
  { title: "FOUNDED", body: "2024, designed and shipped from Australia." },
  { title: "THE MATERIAL", body: "240gsm heavyweight cotton, garment washed, oversized silhouettes." },
  { title: "THE RULE", body: "Every drop limited. No restocks. Ever." },
];

const TIMELINE = [
  { year: "2024", title: "THE FIRST SKETCH", body: "A kanji, a blade, and a t-shirt that had to mean something." },
  { year: "2025", title: "THE_ORIGIN_DROP", body: "Ten pieces. Ten arcs. Sold through with no restock." },
  { year: "2026", title: "AWAKENING", body: "The second chapter. Bigger artwork, heavier cotton, same rule." },
];

export default function OurStoryPage() {
  const hero = getProduct("bushido-tee")!;

  return (
    <>
      <PageHero
        eyebrow="ABOUT // ZENJI"
        title={"BORN FROM THE\nWARRIOR SPIRIT."}
        lead="ZENJI began with one belief: what you wear should tell a story."
      />

      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="container grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10">
              <ProductImage
                product={hero}
                view="ON MODEL"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="size-full"
              />
            </div>
          </Reveal>

          <div className="space-y-6 font-mono text-[13px] leading-relaxed text-white/50">
            <Reveal>
              <p>
                Inspired by samurai discipline, anime art and modern street culture, we create
                premium streetwear for those who choose their own path.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p>
                Every ZENJI piece combines Japanese-inspired artwork, powerful symbolism and
                oversized silhouettes to express courage, creativity and individuality.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>
                ZENJI is more than a name on a shirt. It represents the warrior within — the part of
                us that keeps moving forward, stays true to itself and refuses to fade into the
                crowd.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                We design for the dreamers, fighters, creators and outsiders shaping their own
                future.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="font-display text-3xl uppercase leading-tight text-white">
                WEAR YOUR STORY.
                <br />
                WEAR YOUR SPIRIT.
                <br />
                <span className="text-blood">WEAR ZENJI.</span>
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/collection"
                className="mt-4 inline-flex items-center gap-3 border border-white/25 px-8 py-4 font-mono text-[11px] uppercase tracking-brand text-white transition-colors hover:border-blood hover:bg-blood"
              >
                EXPLORE THE COLLECTION →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 md:py-28">
        <div className="container">
          <Reveal>
            <p className="zenji-eyebrow">ABOUT ZENJI</p>
          </Reveal>
          <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((fact, index) => (
              <Reveal key={fact.title} delay={index * 0.06} className="bg-ink-950 p-8">
                <p className="font-mono text-[10px] uppercase tracking-brand text-blood">
                  {fact.title}
                </p>
                <p className="mt-4 font-mono text-[13px] leading-relaxed text-white/55">
                  {fact.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <Reveal>
            <p className="zenji-eyebrow">TIMELINE // THE ARC SO FAR</p>
            <h2 className="zenji-display mt-4 text-5xl text-white sm:text-6xl">THE CHAPTERS.</h2>
          </Reveal>

          <Timeline
            entries={TIMELINE}
            footer={
              <p className="mt-10 font-mono text-[10px] uppercase tracking-brand text-white/25">
                FOR THE DREAMERS. FIGHTERS. CREATORS. OUTSIDERS.
              </p>
            }
          />
        </div>
      </section>
    </>
  );
}
