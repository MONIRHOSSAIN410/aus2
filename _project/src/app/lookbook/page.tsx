import type { Metadata } from "next";

import { LookbookGallery } from "@/components/lookbook/lookbook-gallery";
import { PageHero } from "@/components/shared/page-hero";
import { COLLECTION_NAME, lookbookShots, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "The Origin Drop — the full visual archive of ZENJI anime streetwear.",
};

export default function LookbookPage() {
  return (
    <>
      <PageHero
        eyebrow={`${COLLECTION_NAME} // EDITORIAL`}
        title={"ANIME STREETWEAR —\nLOOK BOOK"}
        lead="The Origin Drop. The full visual archive."
        meta={[
          { value: "2024", label: `${products.length} PIECES // ${COLLECTION_NAME}` },
          { value: String(lookbookShots.length), label: "EDITORIAL FRAMES" },
          { value: "AU", label: "ANIME STREETWEAR" },
        ]}
      />
      <LookbookGallery />
    </>
  );
}
