"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/** Horizontal draggable product rail — Embla, free-scroll, snap on drag end. */
export function ProductRail({
  products,
  eyebrow,
  title,
  viewAllHref = "/collection",
}: {
  products: Product[];
  eyebrow: string;
  title: string;
  viewAllHref?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    update();
    emblaApi.on("select", update).on("reInit", update).on("scroll", update);
  }, [emblaApi, update]);

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="zenji-eyebrow">{eyebrow}</p>
            <h2 className="zenji-display mt-3 text-5xl text-white sm:text-6xl md:text-7xl">{title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                aria-label="Scroll left"
                disabled={!canPrev}
                onClick={() => emblaApi?.scrollPrev()}
                className={cn(
                  "border border-white/20 p-3 text-white/70 transition-colors",
                  canPrev ? "hover:border-blood hover:text-white" : "opacity-30",
                )}
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                disabled={!canNext}
                onClick={() => emblaApi?.scrollNext()}
                className={cn(
                  "border border-white/20 p-3 text-white/70 transition-colors",
                  canNext ? "hover:border-blood hover:text-white" : "opacity-30",
                )}
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
            <Link
              href={viewAllHref}
              className="border border-white/20 px-6 py-3 font-mono text-[10px] uppercase tracking-brand text-white transition-colors hover:border-blood hover:bg-blood"
            >
              VIEW_ALL
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 overflow-hidden pl-5 lg:pl-8 2xl:pl-[max(2rem,calc((100vw-1440px)/2+3rem))]" ref={emblaRef}>
        <div className="flex gap-6">
          {products.map((product, index) => (
            <div
              key={product.slug}
              className="min-w-0 flex-[0_0_78%] sm:flex-[0_0_46%] lg:flex-[0_0_30%] xl:flex-[0_0_23%]"
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
          <div className="shrink-0 pr-5 lg:pr-8" aria-hidden />
        </div>
      </div>
    </section>
  );
}
