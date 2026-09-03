import type { MetadataRoute } from "next";

import { products } from "@/lib/products";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/drop",
    "/collection",
    "/lookbook",
    "/our-story",
    "/faq",
    "/contact",
    "/login",
    "/terms",
    "/privacy-policy",
    "/return-policy",
  ];

  return [
    ...routes.map((route) => ({ url: `${BASE}${route}`, lastModified: new Date() })),
    ...products.map((product) => ({
      url: `${BASE}/drop/${product.slug}`,
      lastModified: new Date(),
    })),
  ];
}
