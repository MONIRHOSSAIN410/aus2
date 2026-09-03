"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { EASE_OUT, Reveal } from "@/components/motion/reveal";
import { ProductImage } from "@/components/product/product-image";
import { SizeSelector } from "@/components/product/size-selector";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { productGallery, type Product } from "@/lib/products";
import { cn, formatAUD } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addLine } from "@/store/slices/cartSlice";
import { pushToast } from "@/store/slices/uiSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";

export function ProductDetail({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const wishlisted = useAppSelector((state) => state.wishlist.slugs.includes(product.slug));
  const [size, setSize] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const gallery = productGallery(product);
  const [frame, setFrame] = useState(0);
  const active = gallery[frame];

  const addToCart = () => {
    if (!size) {
      dispatch(pushToast({ title: "PICK A SIZE", description: "Choose XS–XXL before adding." }));
      return;
    }
    setAdding(true);
    setTimeout(() => {
      dispatch(
        addLine({
          slug: product.slug,
          name: product.name,
          size,
          price: product.price,
          compareAt: product.compareAt,
          colorway: product.colorway,
        }),
      );
      dispatch(pushToast({ title: "ADDED TO CART", description: `${product.name} — SIZE ${size}` }));
      setAdding(false);
    }, 450);
  };

  return (
    <section className="border-b border-white/10">
      <div className="container py-8">
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-brand text-white/40 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-3" /> BACK
        </Link>
      </div>

      <div className="container grid gap-12 pb-20 lg:grid-cols-2 lg:gap-16">
        {/* gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden border border-white/10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.src}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="absolute inset-0"
              >
                <ProductImage
                  product={product}
                  src={active.src}
                  alt={active.alt}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="size-full"
                />
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute left-4 top-4 z-10 flex flex-col gap-1.5">
              {product.compareAt && <Badge variant="sale">SALE 15% OFF</Badge>}
              {product.tags.includes("LIMITED") && <Badge variant="limited">LIMITED</Badge>}
            </div>
            <p className="pointer-events-none absolute bottom-4 right-4 z-10 font-mono text-[9px] uppercase tracking-brand text-white/50">
              {frame + 1} / {gallery.length} — {active.label}
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {gallery.map((shot, index) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => setFrame(index)}
                aria-pressed={frame === index}
                aria-label={`View ${shot.label.toLowerCase()}`}
                className={cn(
                  "relative aspect-square overflow-hidden border transition-colors",
                  frame === index ? "border-blood" : "border-white/10 hover:border-white/40",
                )}
              >
                <ProductImage
                  product={product}
                  src={shot.src}
                  alt={shot.alt}
                  sizes="120px"
                  className="size-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div className="space-y-8 lg:pt-4">
          <Reveal direction="left">
            <p className="zenji-eyebrow">DROP / {product.name}</p>
            <h1 className="zenji-display mt-4 text-5xl text-white sm:text-6xl">{product.name}</h1>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-brand text-white/35">
              COLORWAY: {product.colorway} {"//"} {product.kanji} {product.kanjiMeaning}
            </p>
          </Reveal>

          <Reveal direction="left" delay={0.08} className="flex items-baseline gap-4">
            <span className="font-display text-4xl text-white">{formatAUD(product.price)}</span>
            {product.compareAt && (
              <span className="font-mono text-sm text-white/30 line-through">
                {formatAUD(product.compareAt)}
              </span>
            )}
          </Reveal>

          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-brand">
            <span
              className={cn(
                "size-2",
                product.inStock ? "animate-pulse-dot bg-emerald-400" : "bg-white/30",
              )}
            />
            <span className={product.inStock ? "text-white/70" : "text-white/35"}>
              {product.inStock ? "IN STOCK" : "SOLD OUT — NO RESTOCK"}
            </span>
          </p>

          <div className="space-y-3">
            <p className="zenji-eyebrow">SELECT SIZE</p>
            <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="shrink-0"
              aria-pressed={wishlisted}
              onClick={() => dispatch(toggleWishlist(product.slug))}
            >
              <Heart className={cn("size-4", wishlisted && "fill-blood text-blood")} />
              WISHLIST
            </Button>
            <Button
              size="lg"
              className="flex-1"
              disabled={!product.inStock || adding}
              onClick={addToCart}
            >
              {adding ? <Loader2 className="size-4 animate-spin" /> : null}
              {product.inStock ? (adding ? "ADDING…" : "ADD TO CART →") : "SOLD OUT"}
            </Button>
          </div>

          <div className="space-y-4 border-t border-white/10 pt-8">
            <p className="zenji-eyebrow">PRODUCT DETAILS</p>
            <p className="font-mono text-[13px] italic leading-relaxed text-white/60">
              {product.blurb}
            </p>
            <ul className="space-y-1.5 font-mono text-[12px] text-white/45">
              {product.details.map((detail) => (
                <li key={detail} className="flex gap-3">
                  <span className="text-blood">—</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <Accordion type="single" collapsible className="border-t border-white/10">
            <AccordionItem value="size">
              <AccordionTrigger>SIZE GUIDE</AccordionTrigger>
              <AccordionContent>
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="text-white/70">
                      <th className="py-2 pr-4 font-normal">SIZE</th>
                      <th className="py-2 pr-4 font-normal">CHEST (CM)</th>
                      <th className="py-2 font-normal">LENGTH (CM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["XS", 52, 68],
                      ["S", 55, 70],
                      ["M", 58, 72],
                      ["L", 61, 74],
                      ["XL", 64, 76],
                      ["XXL", 67, 78],
                    ].map(([label, chest, length]) => (
                      <tr key={label as string} className="border-t border-white/10">
                        <td className="py-2 pr-4">{label}</td>
                        <td className="py-2 pr-4">{chest}</td>
                        <td className="py-2">{length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3">Oversized fit — size down for a regular silhouette.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping">
              <AccordionTrigger>SHIPPING &amp; RETURNS</AccordionTrigger>
              <AccordionContent>
                Free shipping Australia-wide on orders over A$150, otherwise A$9.99 flat. Standard
                delivery 5–10 business days. Returns accepted within 14 days on unworn pieces with
                tags attached. Sale pieces are final.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <p className="font-mono text-[10px] uppercase tracking-brand text-white/25">
            SKU: {product.sku}
          </p>
        </div>
      </div>
    </section>
  );
}
