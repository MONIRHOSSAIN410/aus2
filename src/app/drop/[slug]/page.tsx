import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/product/product-detail";
import { ProductRail } from "@/components/product/product-rail";
import { getProduct, products, relatedProducts } from "@/lib/products";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: `${product.blurb} ${product.details.join(" ")}`,
  };
}

export default function ProductPage({ params }: Params) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <>
      <ProductDetail product={product} />
      <ProductRail
        products={relatedProducts(product.slug)}
        eyebrow={`MORE FROM // ${product.arc}`}
        title="YOU MAY ALSO LIKE"
      />
    </>
  );
}
