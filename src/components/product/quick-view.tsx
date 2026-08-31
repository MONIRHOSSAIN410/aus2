"use client";

import Link from "next/link";
import { useState } from "react";

import { ProductArt } from "@/components/product/product-art";
import { SizeSelector } from "@/components/product/size-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getProduct } from "@/lib/products";
import { formatAUD } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addLine } from "@/store/slices/cartSlice";
import { pushToast, setQuickView } from "@/store/slices/uiSlice";

export function QuickView() {
  const dispatch = useAppDispatch();
  const slug = useAppSelector((state) => state.ui.quickViewSlug);
  const [size, setSize] = useState<string | null>(null);
  const product = slug ? getProduct(slug) : undefined;

  const close = () => {
    dispatch(setQuickView(null));
    setSize(null);
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-3xl p-0">
        {product && (
          <div className="grid md:grid-cols-2">
            <div className="aspect-square border-b border-white/10 md:aspect-auto md:border-b-0 md:border-r">
              <ProductArt product={product} className="size-full" />
            </div>

            <div className="flex flex-col gap-5 p-6 md:p-8">
              <div className="flex flex-wrap gap-1.5">
                {product.compareAt && <Badge variant="sale">SALE 15% OFF</Badge>}
                {product.tags.includes("LIMITED") && <Badge variant="limited">LIMITED</Badge>}
              </div>

              <div>
                <DialogTitle className="text-3xl">{product.name}</DialogTitle>
                <DialogDescription className="mt-2 tracking-brand">
                  COLORWAY: {product.colorway}
                </DialogDescription>
              </div>

              <div className="flex items-baseline gap-3 font-mono">
                <span className="text-2xl text-white">{formatAUD(product.price)}</span>
                {product.compareAt && (
                  <span className="text-sm text-white/30 line-through">
                    {formatAUD(product.compareAt)}
                  </span>
                )}
              </div>

              <p className="font-mono text-[13px] leading-relaxed text-white/50">{product.blurb}</p>

              <div className="space-y-2">
                <p className="zenji-eyebrow">SELECT SIZE</p>
                <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <Button
                  size="lg"
                  disabled={!product.inStock}
                  onClick={() => {
                    if (!size) {
                      dispatch(pushToast({ title: "PICK A SIZE", description: "Choose XS–XXL first." }));
                      return;
                    }
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
                    dispatch(
                      pushToast({ title: "ADDED TO CART", description: `${product.name} — SIZE ${size}` }),
                    );
                    close();
                  }}
                >
                  {product.inStock ? "ADD TO CART →" : "SOLD OUT"}
                </Button>
                <Button asChild variant="outline" size="lg" onClick={close}>
                  <Link href={`/drop/${product.slug}`}>VIEW FULL DETAILS</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
