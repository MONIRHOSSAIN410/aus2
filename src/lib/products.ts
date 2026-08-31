export type ProductTag = "SALE" | "NEW_ARRIVAL" | "LIMITED";

export interface Product {
  slug: string;
  name: string;
  sku: string;
  price: number;
  compareAt?: number;
  colorway: string;
  /** Two-tone palette used by the generative artwork component. */
  palette: { base: string; ink: string; accent: string; wash: string };
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
    name: "BLUE FLAME TEE",
    sku: "ZNJ-BLU-001",
    price: 33.99,
    compareAt: 39.99,
    colorway: "STEEL BLUE",
    palette: { base: "#E8E6E1", ink: "#101418", accent: "#3E7CB1", wash: "#9FC3DE" },
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
    name: "BUSHIDO TEE",
    sku: "ZNJ-BSD-002",
    price: 39.99,
    colorway: "MIDNIGHT",
    palette: { base: "#12100E", ink: "#F2EFE9", accent: "#C8102E", wash: "#2A2724" },
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
    name: "DEMON BLOOD TEE",
    sku: "ZNJ-DMN-003",
    price: 33.99,
    compareAt: 39.99,
    colorway: "BONE / CRIMSON",
    palette: { base: "#EFE9E4", ink: "#141414", accent: "#B3122B", wash: "#E7B9C4" },
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
    name: "DOMAIN EXPANSION TEE",
    sku: "ZNJ-DOM-004",
    price: 39.99,
    colorway: "VOID BLACK",
    palette: { base: "#0C0C0E", ink: "#EDEBE8", accent: "#6D4AC4", wash: "#241C3A" },
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
    name: "FREE SOUL TEE",
    sku: "ZNJ-FRS-005",
    price: 39.99,
    colorway: "SEA SALT",
    palette: { base: "#E4EAEA", ink: "#16211F", accent: "#0F8B7E", wash: "#A8D5CE" },
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
    name: "LIMITLESS TEE",
    sku: "ZNJ-LIM-006",
    price: 39.99,
    colorway: "STATIC WHITE",
    palette: { base: "#F4F4F5", ink: "#0B0B0D", accent: "#2E6BE6", wash: "#C2D3F5" },
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
    name: "PARADISE SPIRIT TEE",
    sku: "ZNJ-PDS-007",
    price: 39.99,
    colorway: "SAKURA ASH",
    palette: { base: "#EDE4E4", ink: "#191316", accent: "#D4657F", wash: "#F0C2CE" },
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
    name: "WARRIOR SPIRIT TEE",
    sku: "ZNJ-WRS-008",
    price: 33.99,
    compareAt: 39.99,
    colorway: "OBSIDIAN",
    palette: { base: "#111113", ink: "#F1EEE9", accent: "#E10600", wash: "#2B1D1D" },
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
    name: "WATER BREATHING TEE",
    sku: "ZNJ-WTR-009",
    price: 39.99,
    colorway: "DEEP CURRENT",
    palette: { base: "#DFE7EC", ink: "#0F1A22", accent: "#1E6E9C", wash: "#8FB9D4" },
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
    name: "WILL OF THE SUN TEE",
    sku: "ZNJ-SUN-010",
    price: 33.99,
    compareAt: 39.99,
    colorway: "EMBER SAND",
    palette: { base: "#F0E5D5", ink: "#1A130C", accent: "#E4761B", wash: "#F3C48A" },
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

export const lookbookViews = ["FRONT", "BACK", "ON MODEL"] as const;
export type LookbookView = (typeof lookbookViews)[number];

export interface LookbookShot {
  id: string;
  product: Product;
  view: LookbookView;
}

export const lookbookShots: LookbookShot[] = products.flatMap((product) =>
  lookbookViews.map((view) => ({
    id: `${product.slug}-${view.toLowerCase().replace(/\s/g, "-")}`,
    product,
    view,
  })),
);
