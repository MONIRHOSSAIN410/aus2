import type { Metadata } from "next";
import { Suspense } from "react";

import { CollectionGrid } from "@/components/product/collection-grid";
import { PageHero } from "@/components/shared/page-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { COLLECTION_NAME, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collection",
  description: "Every drop. Every arc. Documented. The full ZENJI anime graphic tee collection.",
};

export default function CollectionPage() {
  return (
    <>
      <PageHero
        eyebrow={`${COLLECTION_NAME} // COMPLETE ARCHIVE`}
        title={"ANIME GRAPHIC TEES —\nTHE FULL COLLECTION"}
        lead="Every drop. Every arc. Documented."
        meta={[
          { value: String(products.length), label: `PIECES // ${COLLECTION_NAME}` },
          { value: "EST_2024", label: "AUSTRALIA-WIDE SHIPPING" },
          { value: "A$150+", label: "FREE SHIPPING THRESHOLD" },
        ]}
      />
      <Suspense
        fallback={
          <div className="container grid gap-6 py-20 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="aspect-[4/5] w-full" />
            ))}
          </div>
        }
      >
        <CollectionGrid />
      </Suspense>
    </>
  );
}
