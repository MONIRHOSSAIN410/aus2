export const site = {
  name: "ZENJI",
  kanji: "力",
  tagline: "Wear the Arc. Anime-inspired streetwear for gamers and otaku.",
  promise: "Every drop limited. No restocks. Ever.",
  url: "https://example.com",
  currency: "AUD",
  freeShippingOver: 150,
  flatShipping: 9.99,
};

export const announcements = [
  "NEW DROP: BLUE FLAME TEE NOW AVAILABLE",
  "LIMITED STOCK",
  "THE_ORIGIN_DROP COLLECTION LIVE",
  "FREE SHIPPING AUSTRALIA-WIDE ON ORDERS OVER A$150",
];

export const primaryNav = [
  { label: "DROP", href: "/drop" },
  { label: "COLLECTION", href: "/collection" },
  { label: "LOOKBOOK", href: "/lookbook" },
  { label: "OUR STORY", href: "/our-story" },
];

export const moreNav = [
  { label: "FAQ", href: "/faq" },
  { label: "CONTACT", href: "/contact" },
  { label: "RETURN POLICY", href: "/return-policy" },
  { label: "TERMS", href: "/terms" },
  { label: "PRIVACY POLICY", href: "/privacy-policy" },
];

export const footerColumns = [
  {
    title: "DROPS",
    links: [
      { label: "Home", href: "/" },
      { label: "Drop", href: "/drop" },
      { label: "Collection", href: "/collection" },
    ],
  },
  {
    title: "EXPLORE",
    links: [
      { label: "Lookbook", href: "/lookbook" },
      { label: "Our Story", href: "/our-story" },
      { label: "Collection", href: "/collection" },
    ],
  },
  {
    title: "COMMUNITY",
    links: [
      { label: "TikTok", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
    ],
  },
  {
    title: "CONTACT",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
      { label: "Return Policy", href: "/return-policy" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

/**
 * First-order popup.
 *
 * Session-scoped rather than permanent: it greets every fresh visit but stops
 * nagging within one. `delayMs` is measured from load and sits just after the
 * intro splash clears, so the two never overlap.
 */
export const promo = {
  delayMs: 2200,
  /** "session" shows once per visit; "forever" shows once per browser. */
  scope: "session" as "session" | "forever",
  storageKey: "zenji.promo.v2",
  /**
   * Routes the offer stays out of the way on. Interrupting someone who is
   * signing in or checking out costs more than the offer is worth — and a modal
   * over those pages hides the form behind it from screen readers too.
   */
  mutedPaths: ["/login", "/account", "/cart"],
};

export const fighterOptions = [
  "JUJUTSU KAISEN",
  "DEMON SLAYER",
  "ONE PIECE",
  "NARUTO",
  "DRAGON BALL",
  "OTHER",
];
