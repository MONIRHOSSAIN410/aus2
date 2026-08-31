"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Magnetic } from "@/components/motion/magnetic";
import { ProductArt } from "@/components/product/product-art";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { COLLECTION_NAME } from "@/lib/products";
import { cn, formatAUD } from "@/lib/utils";

/**
 * Full-bleed hero carousel (Embla + autoplay).
 * Keyboard: arrow keys move slides when the region has focus.
 */
export function FeaturedCarousel({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 34, align: "start" }, [
    Autoplay({ delay: 5200, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured drops"
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") emblaApi?.scrollNext();
        if (event.key === "ArrowLeft") emblaApi?.scrollPrev();
      }}
      tabIndex={0}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products.map((product, index) => (
            <div
              key={product.slug}
              className="relative min-w-0 flex-[0_0_100%]"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${products.length}`}
            >
              <div className="relative h-[62vh] min-h-[440px] w-full overflow-hidden md:h-[78vh]">
                <ProductArt product={product} className="absolute inset-0 size-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />
                <div className="absolute inset-0 grid-lines opacity-40" />

                <div className="container relative flex h-full flex-col justify-end pb-14 md:pb-20">
                  <motion.div
                    key={`${product.slug}-${selected}`}
                    initial={{ opacity: 0, y: 34 }}
                    animate={{ opacity: selected === index ? 1 : 0, y: selected === index ? 0 : 34 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl space-y-5"
                  >
                    <p className="zenji-eyebrow">COLLECTION // {COLLECTION_NAME}</p>
                    <h2 className="zenji-display text-5xl text-white sm:text-6xl md:text-7xl">
                      {product.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                      {product.compareAt && <Badge variant="sale">SALE 15% OFF</Badge>}
                      <span className="font-mono text-sm text-white/70">
                        {formatAUD(product.price)}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-brand text-white/35">
                        {product.arc}
                      </span>
                    </div>
                    <Magnetic className="inline-block">
                      <Link
                        href={`/drop/${product.slug}`}
                        className="inline-flex items-center gap-3 border border-white/30 px-7 py-4 font-mono text-[11px] uppercase tracking-brand text-white transition-colors hover:border-blood hover:bg-blood"
                      >
                        SHOP {product.name} <ArrowRight className="size-4" />
                      </Link>
                    </Magnetic>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container absolute inset-x-0 bottom-6 flex items-center justify-between">
        <div className="flex gap-2">
          {products.map((product, index) => (
            <button
              key={product.slug}
              type="button"
              aria-label={`Go to ${product.name}`}
              aria-current={selected === index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "h-[3px] transition-all duration-400",
                selected === index ? "w-14 bg-blood" : "w-7 bg-white/25 hover:bg-white/50",
              )}
            />
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => emblaApi?.scrollPrev()}
            className="border border-white/20 p-3 text-white/70 transition-colors hover:border-blood hover:text-white"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => emblaApi?.scrollNext()}
            className="border border-white/20 p-3 text-white/70 transition-colors hover:border-blood hover:text-white"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
