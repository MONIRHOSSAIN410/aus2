"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";

import { ProductArt } from "@/components/product/product-art";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { cn, formatAUD } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addLine } from "@/store/slices/cartSlice";
import { pushToast, setQuickView } from "@/store/slices/uiSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";

interface ProductCardProps {
  product: Product;
  index?: number;
  showActions?: boolean;
  className?: string;
}

export function ProductCard({ product, index = 0, showActions = true, className }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const wishlisted = useAppSelector((state) => state.wishlist.slugs.includes(product.slug));
  const onSale = Boolean(product.compareAt);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={cn("group relative flex flex-col", className)}
    >
      <div className="relative overflow-hidden border border-white/10 bg-ink-900">
        <Link href={`/drop/${product.slug}`} className="block">
          <motion.div
            className="aspect-[4/5] w-full"
            whileHover={{ scale: 1.045 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductArt product={product} className="size-full" />
          </motion.div>
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {onSale && <Badge variant="sale">SALE 15% OFF</Badge>}
          {product.tags.includes("LIMITED") && <Badge variant="limited">LIMITED</Badge>}
          {product.tags.includes("NEW_ARRIVAL") && <Badge variant="new">NEW</Badge>}
          {!product.inStock && <Badge variant="outline">SOLD OUT</Badge>}
        </div>

        <button
          type="button"
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wishlisted}
          onClick={() => dispatch(toggleWishlist(product.slug))}
          className="absolute right-3 top-3 border border-white/20 bg-black/50 p-2 backdrop-blur-sm transition-colors hover:border-blood"
        >
          <Heart
            className={cn(
              "size-4 transition-colors",
              wishlisted ? "fill-blood text-blood" : "text-white/70",
            )}
          />
        </button>

        {showActions && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <div className="flex">
              <button
                type="button"
                onClick={() => dispatch(setQuickView(product.slug))}
                className="flex-1 bg-black/80 py-3 font-mono text-[10px] uppercase tracking-brand text-white backdrop-blur-sm transition-colors hover:bg-black"
              >
                QUICK VIEW →
              </button>
              <button
                type="button"
                disabled={!product.inStock}
                onClick={() => {
                  dispatch(
                    addLine({
                      slug: product.slug,
                      name: product.name,
                      size: "M",
                      price: product.price,
                      compareAt: product.compareAt,
                      colorway: product.colorway,
                    }),
                  );
                  dispatch(
                    pushToast({ title: "ADDED TO CART", description: `${product.name} — SIZE M` }),
                  );
                }}
                className="flex-1 bg-blood py-3 font-mono text-[10px] uppercase tracking-brand text-white transition-colors hover:bg-blood-600 disabled:cursor-not-allowed disabled:bg-ink-700 disabled:text-white/40"
              >
                {product.inStock ? "ADD TO CART" : "SOLD OUT"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Link
            href={`/drop/${product.slug}`}
            className="font-display text-lg uppercase leading-tight text-white transition-colors hover:text-blood"
          >
            {product.name}
          </Link>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-brand text-white/30">
            {product.colorway}
          </p>
        </div>
        <div className="shrink-0 text-right font-mono text-sm">
          {onSale ? (
            <>
              <span className="block text-white/30 line-through">{formatAUD(product.compareAt!)}</span>
              <span className="block text-blood">{formatAUD(product.price)}</span>
            </>
          ) : (
            <span className="text-white">{formatAUD(product.price)}</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
