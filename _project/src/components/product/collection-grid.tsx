"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ProductCard } from "@/components/product/product-card";
import { products, type ProductTag } from "@/lib/products";
import { cn } from "@/lib/utils";

const FILTERS: (ProductTag | "ALL")[] = ["ALL", "SALE", "NEW_ARRIVAL", "LIMITED"];
const SORTS = ["FEATURED", "PRICE_LOW", "PRICE_HIGH", "A_Z"] as const;
type Sort = (typeof SORTS)[number];

export function CollectionGrid() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");
  const [sort, setSort] = useState<Sort>("FEATURED");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const initial = searchParams.get("q");
    if (initial) setQuery(initial);
  }, [searchParams]);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesFilter = filter === "ALL" || product.tags.includes(filter);
      const matchesQuery =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.colorway.toLowerCase().includes(term) ||
        product.arc.toLowerCase().includes(term) ||
        product.kanjiMeaning.toLowerCase().includes(term);
      return matchesFilter && matchesQuery;
    });

    switch (sort) {
      case "PRICE_LOW":
        return [...list].sort((a, b) => a.price - b.price);
      case "PRICE_HIGH":
        return [...list].sort((a, b) => b.price - a.price);
      case "A_Z":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [filter, sort, query]);

  return (
    <section className="py-14 md:py-20">
      <div className="container">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                aria-pressed={filter === option}
                className={cn(
                  "border px-5 py-2.5 font-mono text-[10px] uppercase tracking-brand transition-all",
                  filter === option
                    ? "border-blood bg-blood text-white"
                    : "border-white/15 text-white/50 hover:border-white/40 hover:text-white",
                )}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="collection-search">
              Search the collection
            </label>
            <input
              id="collection-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="SEARCH THE COLLECTION"
              className="h-11 w-full border border-white/15 bg-transparent px-4 font-mono text-[11px] uppercase tracking-wide2 text-white placeholder:text-white/30 focus:border-blood focus:outline-none sm:w-60"
            />
            <label className="sr-only" htmlFor="collection-sort">
              Sort
            </label>
            <select
              id="collection-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className="h-11 border border-white/15 bg-ink-900 px-3 font-mono text-[11px] uppercase tracking-wide2 text-white focus:border-blood focus:outline-none"
            >
              {SORTS.map((option) => (
                <option key={option} value={option}>
                  {option.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-brand text-white/30">
          {visible.length} ITEM{visible.length === 1 ? "" : "S"}
        </p>

        <motion.div layout className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((product, index) => (
              <motion.div key={product.slug} layout exit={{ opacity: 0, scale: 0.95 }}>
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <span className="font-display text-7xl text-white/10">空</span>
            <p className="font-mono text-xs uppercase tracking-brand text-white/40">
              No pieces match that search.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("ALL");
              }}
              className="border border-white/20 px-6 py-3 font-mono text-[10px] uppercase tracking-brand text-white hover:border-blood hover:bg-blood"
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
