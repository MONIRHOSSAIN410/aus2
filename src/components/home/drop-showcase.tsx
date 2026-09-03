"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { ProductImage } from "@/components/product/product-image";
import { COLLECTION_NAME, productImage, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/** Which frame of each product reads best as a full-bleed panel. */
const PANEL_FRAME: Record<string, number> = {
  "warrior-spirit-tee": 5,
  "blue-flame-tee": 4,
  "demon-blood-tee": 4,
  "will-of-the-sun-tee": 4,
};

const CARD_GAP = 80; // px between cards before they stack
const STACK_TOP = 96; // where a pinned card comes to rest, under the header

/**
 * SALE — the scroll-stack showcase.
 *
 * Cards scroll up, pin under the header and shrink slightly as the next one
 * rides over them, so the drop reads as a deck being dealt. Sits on a white
 * ground, which is the one bright break in the page.
 *
 * Transforms are written straight to the nodes from a rAF-throttled scroll
 * handler — cheaper than re-rendering four cards on every frame.
 */
export function DropShowcase({ products }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const cards = cardsRef.current.filter(Boolean);

      cards.forEach((card, index) => {
        // A pinned card sits still, so its own position says nothing about how
        // deep in the stack it is. Measure the *next* card's approach instead:
        // 0 when it is still off the bottom, 1 once it has pinned on top.
        const next = cards[index + 1];
        let depth = 0;

        if (next) {
          const { top } = next.getBoundingClientRect();
          const from = window.innerHeight;
          depth = Math.min(1, Math.max(0, (from - top) / (from - STACK_TOP)));
        }

        const scale = 1 - depth * 0.07;
        const lift = depth * -20;

        card.style.transform = `translate3d(0, ${lift}px, 0) scale(${scale})`;
        card.style.filter = depth > 0 ? `brightness(${1 - depth * 0.3})` : "";
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [products.length]);

  return (
    <section id="drop-showcase" className="bg-stark py-16">
      <div className="container flex flex-wrap items-end justify-between gap-6 py-12">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-brand text-blood sm:text-xs">
            COLLECTION {"//"} {COLLECTION_NAME}
          </span>
          <h2 className="zenji-display mt-3 text-5xl text-black md:text-7xl">SALE</h2>
        </div>
        <Link
          href="/collection"
          className="shrink-0 whitespace-nowrap border border-black px-6 py-3 font-mono text-xs uppercase tracking-brand text-black transition-colors hover:bg-black hover:text-stark"
        >
          VIEW_ALL
        </Link>
      </div>

      {/* No `overflow: hidden` here — an overflow ancestor becomes the scrollport
          for `position: sticky`, and the cards would stop pinning. */}
      <div className="bg-stark px-[6%] py-10">
        <div ref={scrollerRef}>
          {products.map((product, index) => {
            const isLast = index === products.length - 1;
            return (
              <div
                key={product.slug}
                ref={(node) => {
                  if (node) cardsRef.current[index] = node;
                }}
                className={cn(
                  "sticky origin-[center_top] [backface-visibility:hidden] [transition:filter_200ms_linear] will-change-transform",
                  !isLast && "mb-20",
                )}
                style={{ top: STACK_TOP, zIndex: index + 1 }}
              >
                <article
                  className="relative mx-auto w-[1000px] max-w-full overflow-hidden border border-white/[0.12] border-t-4 border-t-blood bg-black"
                  style={{ height: "min(800px, 74vh)" }}
                >
                  <ProductImage
                    product={product}
                    src={productImage(product, PANEL_FRAME[product.slug] ?? 5)}
                    alt={`ZENJI ${product.name} anime streetwear graphic`}
                    sizes="(max-width: 1136px) 88vw, 1000px"
                    className="size-full"
                    imgClassName="object-cover object-[center_20%]"
                  />

                  <div
                    className="absolute inset-x-0 bottom-0 p-8"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                    }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">
                      COLLECTION <span className="text-white/45">{"//"} {COLLECTION_NAME}</span>
                    </span>
                    <Link
                      href={`/drop/${product.slug}`}
                      className="mt-2 block font-display text-[32px] uppercase leading-none text-white transition-colors hover:text-blood md:text-[40px]"
                    >
                      {product.name}
                    </Link>
                    <Link
                      href={`/drop/${product.slug}`}
                      className="mt-5 inline-block w-fit border-b border-current pb-1 font-mono text-[11px] uppercase tracking-brand text-white/70 transition-colors hover:text-blood"
                    >
                      SHOP {product.name} →
                    </Link>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
