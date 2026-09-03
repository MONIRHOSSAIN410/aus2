"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

import { ProductImage } from "@/components/product/product-image";
import { Badge } from "@/components/ui/badge";
import { lookbookShots, lookbookViews, type LookbookView } from "@/lib/products";
import { cn } from "@/lib/utils";

const FILTERS: (LookbookView | "ALL")[] = ["ALL", ...lookbookViews];

export function LookbookGallery() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");

  const shots = useMemo(
    () => (filter === "ALL" ? lookbookShots : lookbookShots.filter((shot) => shot.view === filter)),
    [filter],
  );

  return (
    <section className="py-14 md:py-20">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                aria-pressed={filter === option}
                className={cn(
                  "border px-5 py-2.5 font-mono text-[10px] uppercase tracking-brand transition-all",
                  filter === option
                    ? "border-blood bg-blood text-white"
                    : "border-white/15 text-white/50 hover:border-white/40 hover:text-white",
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-brand text-white/30">
            {shots.length} IMAGES
          </p>
        </div>

        <motion.div
          layout
          className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6"
        >
          <AnimatePresence mode="popLayout">
            {shots.map((shot, index) => (
              <motion.figure
                key={shot.id}
                layout
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, delay: (index % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative break-inside-avoid overflow-hidden border border-white/10"
              >
                <div className={cn("w-full", index % 5 === 0 ? "aspect-[3/4]" : "aspect-[4/5]")}>
                  <ProductImage
                    product={shot.product}
                    src={shot.src}
                    alt={`${shot.product.name} — ${shot.view.toLowerCase()}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="size-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent p-5 opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-within:opacity-100">
                  {shot.product.compareAt && <Badge variant="sale" className="mb-3 w-fit">SALE</Badge>}
                  <p className="font-display text-2xl uppercase text-white">{shot.product.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-brand text-white/45">
                    {shot.view}
                  </p>
                  <Link
                    href={`/drop/${shot.product.slug}`}
                    className="mt-4 w-fit border border-white/30 px-5 py-2.5 font-mono text-[10px] uppercase tracking-brand text-white transition-colors hover:border-blood hover:bg-blood"
                  >
                    VIEW PRODUCT →
                  </Link>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
