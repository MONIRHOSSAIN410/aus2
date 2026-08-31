"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ProductArt } from "@/components/product/product-art";
import { getProduct } from "@/lib/products";
import { formatAUD } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartTotals } from "@/store/selectors";
import { clearCart, removeLine, updateQuantity } from "@/store/slices/cartSlice";
import { pushToast } from "@/store/slices/uiSlice";

export function CartPageContent() {
  const dispatch = useAppDispatch();
  const lines = useAppSelector((state) => state.cart.lines);
  const totals = useAppSelector(selectCartTotals);
  const user = useAppSelector((state) => state.auth.user);

  if (lines.length === 0) {
    return (
      <div className="container flex flex-col items-center gap-6 py-32 text-center">
        <span className="font-display text-8xl text-white/10">空</span>
        <h1 className="zenji-display text-5xl text-white">YOUR CART IS EMPTY</h1>
        <p className="max-w-sm font-mono text-[13px] text-white/45">
          Nothing claimed yet. Every drop is limited — when it's gone, it's gone.
        </p>
        <Button asChild size="lg">
          <Link href="/collection">BROWSE THE DROP →</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container grid gap-14 py-16 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
      <div>
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <h1 className="zenji-display text-4xl text-white">YOUR CART</h1>
          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="font-mono text-[10px] uppercase tracking-brand text-white/35 hover:text-blood"
          >
            CLEAR ALL
          </button>
        </div>

        <ul className="divide-y divide-white/10">
          <AnimatePresence initial={false}>
            {lines.map((line) => {
              const product = getProduct(line.slug);
              return (
                <motion.li
                  key={line.key}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col gap-5 py-7 sm:flex-row"
                >
                  <Link
                    href={`/drop/${line.slug}`}
                    className="block aspect-[4/5] w-full shrink-0 overflow-hidden border border-white/10 sm:w-32"
                  >
                    {product && <ProductArt product={product} className="size-full" />}
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/drop/${line.slug}`}
                          className="font-display text-xl uppercase text-white hover:text-blood"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-brand text-white/35">
                          SIZE {line.size} {"//"} {line.colorway}
                        </p>
                      </div>
                      <div className="text-right font-mono text-sm">
                        <p className="text-white">{formatAUD(line.price * line.quantity)}</p>
                        {line.compareAt && (
                          <p className="mt-1 text-white/25 line-through">
                            {formatAUD(line.compareAt * line.quantity)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-5">
                      <div className="flex items-center border border-white/15">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            dispatch(updateQuantity({ key: line.key, quantity: line.quantity - 1 }))
                          }
                          className="p-2.5 text-white/60 hover:text-white"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-10 text-center font-mono text-xs text-white">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() =>
                            dispatch(updateQuantity({ key: line.key, quantity: line.quantity + 1 }))
                          }
                          className="p-2.5 text-white/60 hover:text-white"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => dispatch(removeLine(line.key))}
                        className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-brand text-white/35 hover:text-blood"
                      >
                        <Trash2 className="size-3.5" /> REMOVE
                      </button>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      <aside className="h-fit border border-white/10 bg-ink-900 p-7 lg:sticky lg:top-28">
        <p className="zenji-eyebrow">ORDER SUMMARY</p>

        <dl className="mt-6 space-y-3 font-mono text-[13px]">
          <div className="flex justify-between text-white/50">
            <dt>SUBTOTAL</dt>
            <dd>{formatAUD(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-white/50">
            <dt>SHIPPING</dt>
            <dd>{totals.shipping === 0 ? "FREE" : formatAUD(totals.shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-3 text-base text-white">
            <dt>TOTAL</dt>
            <dd>{formatAUD(totals.total)}</dd>
          </div>
        </dl>

        {totals.remainingForFreeShipping > 0 && (
          <p className="mt-5 border-l-2 border-blood bg-blood/10 px-3 py-2 font-mono text-[11px] text-white/70">
            Add {formatAUD(totals.remainingForFreeShipping)} for free shipping.
          </p>
        )}

        <Button
          size="lg"
          className="mt-7 w-full"
          onClick={() =>
            dispatch(
              pushToast({
                title: "CHECKOUT IS A DEMO",
                description: "Connect Stripe or Shopify to take real payments.",
              }),
            )
          }
        >
          PROCEED TO CHECKOUT →
        </Button>

        {!user && (
          <Link
            href="/login"
            className="mt-3 block text-center font-mono text-[11px] text-white/40 underline underline-offset-4 hover:text-white"
          >
            Sign in for faster checkout
          </Link>
        )}

        <p className="mt-6 text-center font-mono text-[9px] uppercase tracking-brand text-white/25">
          All drops are final. No restocks. Ever.
        </p>
      </aside>
    </div>
  );
}
