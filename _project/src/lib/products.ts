export type ProductTag = "SALE" | "NEW_ARRIVAL" | "LIMITED";

export interface Product {
  slug: string;
  /** Cloudinary basename — see IMAGE_BASE and productImage(). */
  image: string;
  name: string;
  sku: string;
  price: number;
  compareAt?: number;
  colorway: string;
  kanji: string;
  kanjiMeaning: string;
  tags: ProductTag[];
  inStock: boolean;
  arc: string;
  blurb: string;
  details: string[];
  sizes: string[];
}

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const COLLECTION_NAME = "THE_ORIGIN_DROP";
export const NEXT_DROP_NAME = "AWAKENING";
/** Next drop date — bump this when the countdown expires. */
export const NEXT_DROP_DATE = "2026-11-01T09:00:00+10:00";

export const products: Product[] = [
  {
    slug: "blue-flame-tee",
    image: "Blue-flame",
    name: "BLUE FLAME TEE",
    sku: "ZNJ-BLU-001",
    price: 33.99,
    compareAt: 39.99,
    colorway: "STEEL BLUE",
    kanji: "焔",
    kanjiMeaning: "FLAME",
    tags: ["SALE"],
    inStock: true,
    arc: "AWAKENING ARC",
    blurb: "The blue flame rises in darkness, cold, silent, unstoppable.",
    details: [
      "240gsm heavyweight cotton.",
      "Oversized fit. Garment washed.",
      "Anime graphic screenprint.",
    ],
    sizes: SIZES,
  },
  {
    slug: "bushido-tee",
    image: "Bushido",
    name: "BUSHIDO TEE",
    sku: "ZNJ-BSD-002",
    price: 39.99,
    colorway: "MIDNIGHT",
    kanji: "武",
    kanjiMeaning: "WARRIOR",
    tags: ["LIMITED"],
    inStock: true,
    arc: "CODE ARC",
    blurb: "Seven virtues. One blade. The code does not bend.",
    details: [
      "240gsm heavyweight cotton.",
      "Oversized fit. Garment washed.",
      "Discharge print, hand finished.",
    ],
    sizes: SIZES,
  },
  {
    slug: "demon-blood-tee",
    image: "Demon-blood",
    name: "DEMON BLOOD TEE",
    sku: "ZNJ-DMN-003",
    price: 33.99,
    compareAt: 39.99,
    colorway: "BONE / CRIMSON",
    kanji: "鬼",
    kanjiMeaning: "DEMON",
    tags: ["SALE"],
    inStock: true,
    arc: "SLAYER ARC",
    blurb: "What runs in the veins decides what you become.",
    details: [
      "240gsm heavyweight cotton.",
      "Oversized fit. Garment washed.",
      "Four-colour front graphic, back script.",
    ],
    sizes: SIZES,
  },
  {
    slug: "domain-expansion-tee",
    image: "Domain-expansion",
    name: "DOMAIN EXPANSION TEE",
    sku: "ZNJ-DOM-004",
    price: 39.99,
    colorway: "VOID BLACK",
    kanji: "領",
    kanjiMeaning: "DOMAIN",
    tags: ["NEW_ARRIVAL"],
    inStock: true,
    arc: "CURSED ARC",
    blurb: "Inside the domain, the outcome is already decided.",
    details: [
      "240gsm heavyweight cotton.",
      "Boxy oversized fit.",
      "Puff print with metallic overlay.",
    ],
    sizes: SIZES,
  },
  {
    slug: "free-soul-tee",
    image: "Free-soul",
    name: "FREE SOUL TEE",
    sku: "ZNJ-FRS-005",
    price: 39.99,
    colorway: "SEA SALT",
    kanji: "自",
    kanjiMeaning: "FREEDOM",
    tags: ["NEW_ARRIVAL"],
    inStock: true,
    arc: "VOYAGE ARC",
    blurb: "No chart. No captain. Only the horizon.",
    details: [
      "220gsm combed cotton.",
      "Relaxed oversized fit.",
      "Water-based print, soft hand feel.",
    ],
    sizes: SIZES,
  },
  {
    slug: "limitless-tee",
    image: "Limitless",
    name: "LIMITLESS TEE",
    sku: "ZNJ-LIM-006",
    price: 39.99,
    colorway: "STATIC WHITE",
    kanji: "無",
    kanjiMeaning: "INFINITY",
    tags: ["LIMITED"],
    inStock: true,
    arc: "AWAKENING ARC",
    blurb: "Distance means nothing to the one who never stops.",
    details: [
      "240gsm heavyweight cotton.",
      "Oversized fit. Dropped shoulder.",
      "Reflective ink detail on sleeve.",
    ],
    sizes: SIZES,
  },
  {
    slug: "paradise-spirit-tee",
    image: "Paradise-spirit",
    name: "PARADISE SPIRIT TEE",
    sku: "ZNJ-PDS-007",
    price: 39.99,
    colorway: "SAKURA ASH",
    kanji: "楽",
    kanjiMeaning: "PARADISE",
    tags: ["NEW_ARRIVAL"],
    inStock: true,
    arc: "BLOSSOM ARC",
    blurb: "Petals fall so the next season can arrive.",
    details: [
      "220gsm combed cotton.",
      "Oversized fit. Garment washed.",
      "Two-tone gradient screenprint.",
    ],
    sizes: SIZES,
  },
  {
    slug: "warrior-spirit-tee",
    image: "Warrior-spirit",
    name: "WARRIOR SPIRIT TEE",
    sku: "ZNJ-WRS-008",
    price: 33.99,
    compareAt: 39.99,
    colorway: "OBSIDIAN",
    kanji: "力",
    kanjiMeaning: "STRENGTH",
    tags: ["SALE"],
    inStock: true,
    arc: "ORIGIN ARC",
    blurb: "The warrior within refuses to fade into the crowd.",
    details: [
      "240gsm heavyweight cotton.",
      "Oversized fit. Garment washed.",
      "Signature ZENJI back print.",
    ],
    sizes: SIZES,
  },
  {
    slug: "water-breathing-tee",
    image: "Water-breathing",
    name: "WATER BREATHING TEE",
    sku: "ZNJ-WTR-009",
    price: 39.99,
    colorway: "DEEP CURRENT",
    kanji: "水",
    kanjiMeaning: "WATER",
    tags: ["LIMITED"],
    inStock: true,
    arc: "SLAYER ARC",
    blurb: "Ten forms. One breath. Every wave answers.",
    details: [
      "240gsm heavyweight cotton.",
      "Oversized fit. Dropped shoulder.",
      "Gradient wave print, front and back.",
    ],
    sizes: SIZES,
  },
  {
    slug: "will-of-the-sun-tee",
    image: "Will-of-the-sun",
    name: "WILL OF THE SUN TEE",
    sku: "ZNJ-SUN-010",
    price: 33.99,
    compareAt: 39.99,
    colorway: "EMBER SAND",
    kanji: "陽",
    kanjiMeaning: "SUN",
    tags: ["SALE"],
    inStock: false,
    arc: "DAWN ARC",
    blurb: "Burn loud enough and the dark has to move.",
    details: [
      "240gsm heavyweight cotton.",
      "Oversized fit. Garment washed.",
      "Sun-bleached wash, limited run of 200.",
    ],
    sizes: SIZES,
  },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);

export const featuredProducts = () =>
  products.filter((product) =>
    ["demon-blood-tee", "blue-flame-tee", "will-of-the-sun-tee", "warrior-spirit-tee"].includes(
      product.slug,
    ),
  );

export const saleProducts = () => products.filter((product) => product.tags.includes("SALE"));

export function relatedProducts(slug: string, count = 4) {
  const current = getProduct(slug);
  return products
    .filter((product) => product.slug !== slug)
    .sort((a, b) => {
      const aScore = current && a.arc === current.arc ? 0 : 1;
      const bScore = current && b.arc === current.arc ? 0 : 1;
      return aScore - bScore;
    })
    .slice(0, count);
}

/* ------------------------------------------------------------------ */
/*  Product photography                                                */
/* ------------------------------------------------------------------ */

/**
 * Images are served from the ZENJI Cloudinary account, the same source the live
 * site uses. Every product has five frames: 1 front, 2 back, 3 & 4 detail,
 * 5 on model.
 *
 * To host the photography yourself instead, drop the files into
 * `public/products/` and change IMAGE_BASE to "/products".
 */
export const IMAGE_BASE =
  "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products";

export const lookbookViews = ["FRONT", "BACK", "ON MODEL"] as const;
export type LookbookView = (typeof lookbookViews)[number];

const VIEW_FRAME: Record<LookbookView, number> = {
  FRONT: 1,
  BACK: 2,
  "ON MODEL": 5,
};

/** URL for one frame of a product, 1–5. */
export function productImage(product: Product, frame = 1) {
  return `${IMAGE_BASE}/${product.image}-${Math.min(5, Math.max(1, frame))}.webp`;
}

/** URL for a named view — what the cards, lookbook and cart use. */
export function productView(product: Product, view: LookbookView = "FRONT") {
  return productImage(product, VIEW_FRAME[view]);
}

/** All five frames, for the product-page gallery. */
export function productGallery(product: Product) {
  const labels = ["FRONT", "BACK", "DETAIL", "FABRIC", "ON MODEL"];
  return [1, 2, 3, 4, 5].map((frame) => ({
    frame,
    label: labels[frame - 1],
    src: productImage(product, frame),
    alt: `${product.name} — ${labels[frame - 1].toLowerCase()}`,
  }));
}

export interface LookbookShot {
  id: string;
  product: Product;
  view: LookbookView;
  src: string;
}

export const lookbookShots: LookbookShot[] = products.flatMap((product) =>
  lookbookViews.map((view) => ({
    id: `${product.slug}-${view.toLowerCase().replace(/\s/g, "-")}`,
    product,
    view,
    src: productView(product, view),
  })),
);
