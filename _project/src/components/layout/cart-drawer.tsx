"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

import { ProductImage } from "@/components/product/product-image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { getProduct } from "@/lib/products";
import { formatAUD } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartTotals } from "@/store/selectors";
import { closeCart, removeLine, updateQuantity } from "@/store/slices/cartSlice";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const { lines, isOpen } = useAppSelector((state) => state.cart);
  const totals = useAppSelector(selectCartTotals);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && dispatch(closeCart())}>
      <SheetContent side="right" className="gap-0 p-0">
        <div className="border-b border-white/10 p-6">
          <SheetTitle>YOUR CART</SheetTitle>
          <SheetDescription className="mt-1">
            {lines.length === 0
              ? "Nothing claimed yet"
              : `${lines.length} line${lines.length === 1 ? "" : "s"} // no restocks`}
          </SheetDescription>
        </div>

        {lines.length > 0 && (
          <div className="border-b border-white/10 px-6 py-4">
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-brand text-white/45">
              <span>
                {totals.remainingForFreeShipping > 0
                  ? `${formatAUD(totals.remainingForFreeShipping)} TO FREE SHIPPING`
                  : "FREE SHIPPING UNLOCKED"}
              </span>
              <span>{Math.round(totals.progress * 100)}%</span>
            </div>
            <div className="mt-2 h-[3px] w-full bg-white/10">
              <motion.div
                className="h-full bg-blood"
                initial={{ width: 0 }}
                animate={{ width: `${totals.progress * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-5 p-10 text-center">
              <span className="font-display text-7xl text-white/10">力</span>
              <p className="font-mono text-xs uppercase tracking-brand text-white/40">
                The cart is empty.
              </p>
              <Button asChild variant="outline" onClick={() => dispatch(closeCart())}>
                <Link href="/collection">BROWSE THE DROP →</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              <AnimatePresence initial={false}>
                {lines.map((line) => {
                  const product = getProduct(line.slug);
                  return (
                    <motion.li
                      key={line.key}
                      layout
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0, x: 24 }}
                      transition={{ duration: 0.28 }}
                      className="flex gap-4 p-6"
                    >
                      <Link
                        href={`/drop/${line.slug}`}
                        onClick={() => dispatch(closeCart())}
                        className="block size-20 shrink-0 overflow-hidden border border-white/10"
                      >
                        {product && <ProductImage product={product} className="size-full" sizes="80px" />}
                      </Link>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <Link
                            href={`/drop/${line.slug}`}
                            onClick={() => dispatch(closeCart())}
                            className="font-display text-base uppercase leading-tight text-white hover:text-blood"
                          >
                            {line.name}
                          </Link>
                          <button
                            type="button"
                            aria-label={`Remove ${line.name}`}
                            onClick={() => dispatch(removeLine(line.key))}
                            className="text-white/30 transition-colors hover:text-blood"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-brand text-white/35">
                          SIZE {line.size} {"//"} {line.colorway}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-white/15">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                dispatch(updateQuantity({ key: line.key, quantity: line.quantity - 1 }))
                              }
                              className="p-2 text-white/60 hover:text-white"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-8 text-center font-mono text-xs text-white">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() =>
                                dispatch(updateQuantity({ key: line.key, quantity: line.quantity + 1 }))
                              }
                              className="p-2 text-white/60 hover:text-white"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <span className="font-mono text-sm text-white">
                            {formatAUD(line.price * line.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="space-y-4 border-t border-white/10 p-6">
            <dl className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-white/50">
                <dt>SUBTOTAL</dt>
                <dd>{formatAUD(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between text-white/50">
                <dt>SHIPPING</dt>
                <dd>{totals.shipping === 0 ? "FREE" : formatAUD(totals.shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-white">
                <dt>TOTAL</dt>
                <dd>{formatAUD(totals.total)}</dd>
              </div>
            </dl>
            <Button asChild size="lg" className="w-full">
              <Link href="/cart" onClick={() => dispatch(closeCart())}>
                CHECKOUT →
              </Link>
            </Button>
            <p className="text-center font-mono text-[9px] uppercase tracking-brand text-white/25">
              All drops are final. No restocks.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
