"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Wordmark } from "@/components/layout/wordmark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { moreNav, primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartCount } from "@/store/selectors";
import { openCart } from "@/store/slices/cartSlice";
import { setMobileNav, setSearchQuery } from "@/store/slices/uiSlice";
import { EASE_OUT } from "@/components/motion/reveal";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const user = useAppSelector((state) => state.auth.user);
  const mobileNavOpen = useAppSelector((state) => state.ui.mobileNavOpen);

  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    dispatch(setMobileNav(false));
    setMoreOpen(false);
  }, [pathname, dispatch]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setSearchQuery(query));
    router.push(`/collection?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-colors duration-300",
          scrolled
            ? "border-white/10 bg-ink-950/85 backdrop-blur-md"
            : "border-transparent bg-ink-950",
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => dispatch(setMobileNav(true))}
              className="-ml-2 p-2 text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <Wordmark className="text-2xl md:text-3xl" />
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "zenji-link-underline font-mono text-[11px] uppercase tracking-brand transition-colors",
                    active ? "text-white after:w-full" : "text-white/60 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                aria-expanded={moreOpen}
                className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-brand text-white/60 transition-colors hover:text-white"
              >
                MORE
                <ChevronDown
                  className={cn("size-3 transition-transform", moreOpen && "rotate-180")}
                />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="absolute left-1/2 top-full w-56 -translate-x-1/2 border border-white/10 bg-ink-950/95 p-2 backdrop-blur-md"
                  >
                    {moreNav.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2.5 font-mono text-[10px] uppercase tracking-brand text-white/55 transition-colors hover:bg-blood/15 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <form onSubmit={submitSearch} className="hidden items-center md:flex">
              <label htmlFor="header-search" className="sr-only">
                Search drops and collections
              </label>
              <input
                id="header-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="SEARCH..."
                className="h-9 w-40 border border-white/15 bg-transparent px-3 font-mono text-[11px] uppercase tracking-wide2 text-white placeholder:text-white/35 focus:border-blood focus:outline-none lg:w-48"
              />
              <button
                type="submit"
                aria-label="Search"
                className="ml-2 px-1 text-white/50 transition-colors hover:text-blood"
              >
                →
              </button>
            </form>

            <button
              type="button"
              onClick={() => dispatch(openCart())}
              className="relative p-2 text-white/80 transition-colors hover:text-white"
              aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              <ShoppingCart className="size-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center bg-blood font-mono text-[9px] text-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link
              href={user ? "/account" : "/login"}
              aria-label={user ? "Account" : "Sign in"}
              className="p-2 text-blood transition-colors hover:text-white"
            >
              {user ? (
                <span className="flex size-5 items-center justify-center border border-blood font-mono text-[9px] text-white">
                  {user.avatarInitials}
                </span>
              ) : (
                <User className="size-5" />
              )}
            </Link>
          </div>
        </div>
      </motion.header>

      <Sheet open={mobileNavOpen} onOpenChange={(open) => dispatch(setMobileNav(open))}>
        <SheetContent side="left" className="border-white/10">
          <SheetTitle asChild>
            <div>
              <Wordmark as="text" />
            </div>
          </SheetTitle>
          <SheetDescription>力 — Neo Tokyo Streetwear</SheetDescription>

          <form
            onSubmit={(event) => {
              submitSearch(event);
              dispatch(setMobileNav(false));
            }}
            className="mt-2 flex items-center gap-2"
          >
            <Search className="size-4 text-white/40" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="SEARCH DROPS..."
              className="h-10 w-full border border-white/15 bg-transparent px-3 font-mono text-[11px] uppercase tracking-wide2 text-white placeholder:text-white/35 focus:border-blood focus:outline-none"
            />
          </form>

          <nav className="mt-4 flex flex-col">
            {primaryNav.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * index, duration: 0.4, ease: EASE_OUT }}
              >
                <Link
                  href={item.href}
                  className="block border-b border-white/10 py-4 font-display text-3xl uppercase text-white transition-colors hover:text-blood"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-y-2">
            {moreNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[10px] uppercase tracking-brand text-white/45 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <Button asChild variant="default" size="lg">
              <Link href={user ? "/account" : "/login"}>
                {user ? `ACCOUNT — ${user.avatarInitials}` : "SIGN IN →"}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                dispatch(setMobileNav(false));
                dispatch(openCart());
              }}
            >
              CART ({cartCount})
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
