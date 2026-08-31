"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/lib/products";
import { formatAUD } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartCount, selectCartSubtotal } from "@/store/selectors";
import { signOut } from "@/store/slices/authSlice";

export function AccountContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const wishlist = useAppSelector((state) => state.wishlist.slugs);
  const cartCount = useAppSelector(selectCartCount);
  const cartSubtotal = useAppSelector(selectCartSubtotal);

  // Guard the route, but don't fight the sign-out redirect below.
  const signingOut = useRef(false);
  useEffect(() => {
    if (!user && !signingOut.current) router.replace("/login");
  }, [user, router]);

  if (!user) {
    return (
      <div className="container py-32 text-center font-mono text-xs uppercase tracking-brand text-white/40">
        Redirecting…
      </div>
    );
  }

  const saved = products.filter((product) => wishlist.includes(product.slug));

  return (
    <div className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-end justify-between gap-8 border-b border-white/10 pb-10"
      >
        <div className="flex items-center gap-5">
          <span className="flex size-16 items-center justify-center border-2 border-blood font-display text-2xl text-white">
            {user.avatarInitials}
          </span>
          <div>
            <p className="zenji-eyebrow">MEMBER // {user.tier}</p>
            <h1 className="zenji-display mt-2 text-4xl text-white sm:text-5xl">{user.name}</h1>
            <p className="mt-1 font-mono text-[11px] text-white/35">
              {user.email} — signed in with {user.provider}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            signingOut.current = true;
            dispatch(signOut());
            router.push("/");
          }}
        >
          SIGN OUT
        </Button>
      </motion.div>

      <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
        {[
          { value: String(cartCount), label: "ITEMS IN CART" },
          { value: formatAUD(cartSubtotal), label: "CART SUBTOTAL" },
          { value: String(saved.length), label: "WISHLIST PIECES" },
        ].map((stat) => (
          <div key={stat.label} className="bg-ink-950 p-7">
            <p className="font-display text-4xl text-white">{stat.value}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-brand text-white/35">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="wishlist" className="mt-14">
        <TabsList>
          <TabsTrigger value="wishlist">WISHLIST</TabsTrigger>
          <TabsTrigger value="orders">ORDERS</TabsTrigger>
          <TabsTrigger value="details">DETAILS</TabsTrigger>
        </TabsList>

        <TabsContent value="wishlist">
          {saved.length === 0 ? (
            <div className="flex flex-col items-center gap-4 border border-white/10 py-20 text-center">
              <span className="font-display text-6xl text-white/10">♡</span>
              <p className="font-mono text-xs uppercase tracking-brand text-white/40">
                Nothing saved yet.
              </p>
              <Button asChild variant="outline">
                <Link href="/collection">BROWSE THE DROP →</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {saved.map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="orders">
          <div className="flex flex-col items-center gap-4 border border-white/10 py-20 text-center">
            <span className="font-display text-6xl text-white/10">力</span>
            <p className="font-mono text-xs uppercase tracking-brand text-white/40">
              No orders yet — this is a demo account.
            </p>
            <p className="max-w-sm font-mono text-[11px] text-white/25">
              Connect an order API and render the results here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="details">
          <dl className="max-w-md space-y-px border border-white/10 bg-white/10">
            {[
              ["NAME", user.name],
              ["EMAIL", user.email],
              ["PROVIDER", user.provider],
              ["MEMBER SINCE", user.memberSince],
              ["TIER", user.tier],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between bg-ink-950 px-5 py-4 font-mono text-[12px]">
                <dt className="uppercase tracking-brand text-white/35">{label}</dt>
                <dd className="text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </TabsContent>
      </Tabs>
    </div>
  );
}
