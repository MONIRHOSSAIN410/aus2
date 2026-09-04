# ZENJI — Anime Streetwear Storefront

A full storefront rebuilt in the style of [zenji.shop](https://zenji.shop): Neo-Tokyo dark theme,
Anton display type over IBM Plex Mono, blood-red accent, and scroll-driven motion throughout.

**Next.js 14 (App Router) · TypeScript · Redux Toolkit · Tailwind CSS · shadcn/ui · Framer Motion · Lenis · Embla Carousel**

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production
npm run lint                 # eslint
```

Node 18.17+ required. No environment variables needed — it runs as-is.

### Deploying to Vercel

Import the repo and deploy; the defaults are correct (Next.js preset, `npm run build`).
`package-lock.json` is committed so Vercel installs the exact tree this was built and
tested against rather than re-resolving on each deploy.

Optionally set `NEXT_PUBLIC_SITE_URL` to your domain so `sitemap.xml` emits real URLs.

---

## Pages

| Route | What's on it |
| --- | --- |
| `/` | Intro splash, scroll-scrubbed hero sequence, about block, SALE scroll-stack, full-bleed carousel, latest-drops rail, manifesto |
| `/login` | **Google / Apple / email sign-in**, guest link, animated provider→email transition |
| `/drop` | Next-drop countdown, waitlist form, still-available grid |
| `/drop/[slug]` | Product detail — five-frame gallery, size picker, wishlist, accordions, related rail (10 static routes) |
| `/collection` | Filter by tag, live search, sort, animated masonry regrid |
| `/lookbook` | Editorial masonry, 30 frames, filter by FRONT / BACK / ON MODEL |
| `/our-story` | Brand narrative, fact grid, timeline |
| `/cart` | Full cart with quantity controls, shipping threshold, order summary |
| `/account` | Guarded route — wishlist, orders, details tabs |
| `/faq` | Grouped accordions |
| `/contact` | Contact form with topic picker |
| `/terms`, `/privacy-policy`, `/return-policy` | Legal templates |
| `404` | Themed not-found |

Plus global chrome: marquee announcement bar, sticky header with mega-menu, mobile drawer nav,
slide-out cart, quick-view dialog, first-order popup, cookie banner, toast system, scroll-progress bar.

### The first-order popup

`FREE SHIPPING ON FIRST ORDER` opens a couple of seconds into a visit, just after the
intro splash clears. Tune it in one place, `promo` in `src/lib/site.ts`:

```ts
delayMs: 2200,          // when it opens
scope: "session",       // once per visit; "forever" for once per browser
mutedPaths: ["/login", "/account", "/cart"],
```

It stays off the sign-in, account and cart routes — interrupting someone mid-checkout
costs more than the offer is worth, and a modal there hides the form behind it from
screen readers.

---

## The login page

`src/components/auth/login-card.tsx` + `src/app/login/page.tsx`.

Three sign-in paths, all dispatching the same Redux thunk:

- **Continue with Apple** — light button, inline Apple mark
- **Continue with Google** — outlined button, inline four-colour Google mark
- **Continue with Email** — swaps the card to an email + password form (animated, reversible)
- **Browse as Guest** — link through to the collection

State lives in `src/store/slices/authSlice.ts`. Right now `signInWithProvider` is a mock thunk with
a 900 ms delay that returns a fabricated user, so the flow works with zero configuration.

### Wiring real OAuth

Only the thunk body changes — nothing in the UI or the reducers cares where the user comes from.

**NextAuth.js**

```bash
npm i next-auth
```

```ts
// src/store/slices/authSlice.ts
import { signIn, getSession } from "next-auth/react";

export const signInWithProvider = createAsyncThunk(
  "auth/signInWithProvider",
  async ({ provider, email }: { provider: AuthProvider; email?: string }) => {
    if (provider === "email") {
      await signIn("email", { email, redirect: false });
    } else {
      await signIn(provider, { redirect: false });   // "google" | "apple"
    }
    const session = await getSession();
    if (!session?.user) throw new Error("SIGNIN_FAILED");
    return mapSessionToAuthUser(session.user);
  },
);
```

Then add `src/app/api/auth/[...nextauth]/route.ts` with the Google and Apple providers and set
`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `APPLE_ID`, `APPLE_SECRET`, `NEXTAUTH_SECRET`.

**Supabase** — replace the same body with `supabase.auth.signInWithOAuth({ provider })`.

---

## Architecture

```
src/
├── app/                     App Router — one folder per route
│   ├── layout.tsx           providers, fonts, global chrome
│   ├── globals.css          design tokens + component layer
│   ├── icon.png             favicon, built from the ZJ monogram
│   ├── robots.ts sitemap.ts SEO metadata routes
│   └── …                    page routes
├── components/
│   ├── ui/                  shadcn/ui primitives (button, input, dialog, sheet, accordion, tabs…)
│   ├── layout/              header, footer, cart drawer, promo modal, cookie banner, toaster
│   ├── motion/              Reveal, SplitHeading, Marquee, Magnetic, PageTransition, ScrollProgress
│   ├── auth/                login card + provider marks
│   ├── home/                hero, intro splash, about, carousel, manifesto
│   ├── product/             card, rail, grid, detail, quick view, size selector, image wrapper
│   ├── lookbook/ drop/ cart/ account/ contact/ shared/
│   ├── providers.tsx        Redux Provider + localStorage bridge
│   └── smooth-scroll.tsx    Lenis
├── store/
│   ├── index.ts hooks.ts selectors.ts
│   └── slices/              auth · cart · wishlist · ui
├── lib/                     products, faq, site config, fonts, utils
└── fonts/                   self-hosted woff2

public/                      logos, favicon source, custom cursor
```

### Redux Toolkit

Four slices, per-request store creation (`makeStore()`), typed `useAppSelector` / `useAppDispatch`,
and memoised selectors in `store/selectors.ts`. Cart, wishlist and session are mirrored to
`localStorage` by a subscription in `providers.tsx` — every write is wrapped in try/catch so private
browsing doesn't break the app.

### Motion

| Effect | Where |
| --- | --- |
| Hero sequence | `home/hero-stage.tsx` — 150 stills scrubbed to a canvas by scroll position |
| SALE scroll-stack | `home/drop-showcase.tsx` — cards pin, shrink and dim as the next rides over |
| Katana cursor | `katana-cursor.tsx` — follower that scales on interactive elements |
| Smooth scroll | Lenis in `smooth-scroll.tsx` — anchor interception, route reset, disabled under `prefers-reduced-motion` |
| Scroll progress | `motion/scroll-progress.tsx`, spring-damped bar under the header |
| Parallax | `useScroll` + `useTransform` on the about image and manifesto wordmark; `lookbook/parallax-tile.tsx` per tile |
| Counting stats | `motion/count-up.tsx` — numbers tick up on entry, non-numeric labels pass through |
| Timeline | `motion/timeline.tsx` — rail draws itself, markers spring in |
| Headline reveal | `SplitHeading` — per-line clip-and-rise |
| Scroll entrance | `Reveal`, `StaggerGroup`/`StaggerItem` via `whileInView` |
| Page transitions | `AnimatePresence mode="wait"` keyed on pathname |
| Layout animation | `layout` + `AnimatePresence popLayout` on collection and lookbook regrids |
| Magnetic buttons | `Magnetic` — pointer-follow spring, mouse only |
| Marquees | CSS keyframes, pause on hover |
| Intro splash | Diagonal clip wipe, once per session |

Every animation checks `useReducedMotion()` or is neutralised by the reduced-motion block in
`globals.css`.

### Carousels (Embla)

- `home/featured-carousel.tsx` — full-bleed hero slides, autoplay with pause-on-hover, arrow-key
  support, progress-bar pagination
- `product/product-rail.tsx` — draggable free-scroll product rail with edge-aware arrows

### Performance

The page is built so nothing expensive blocks first paint:

| Lever | Effect |
| --- | --- |
| Cloudinary loader (`src/lib/image-loader.ts`) | `next/image` resizes on the CDN, not on this server. Zero `/_next/image` requests, no local re-encoding, no image cache to warm. |
| Hero frame sampling (`stride` in `lib/hero-stage.ts`) | 50 stills instead of 150 — about a third of the bytes, still smooth under a scrub. |
| Idle + capped preloading | The sequence starts on `requestIdleCallback` and fetches 4 at a time, so it never competes with first paint. |
| Shared scroll pool (`lookbook/parallax-tile.tsx`) | One scroll listener and one rAF loop for all 30 tiles, with off-screen tiles parked by an IntersectionObserver. |
| `optimizePackageImports` | Icon and motion imports are rewritten to deep paths so a single icon doesn't pull in the set. |

Measured on the homepage: first contentful paint ~0.55s, no optimizer round-trips,
52 hero frames fetched in the background rather than 150 up front.

If it still feels slow, check you are not judging it from `npm run dev` — the dev
server compiles routes on demand. `npm run build && npm start` is representative.

### Tailwind + shadcn/ui

`components.json` is configured, so `npx shadcn@latest add <component>` drops new primitives into
`src/components/ui` with the right paths. Brand scale lives in `tailwind.config.ts`
(`blood`, `ink`, `bone`, `steel`) alongside the HSL token layer the shadcn components read.

---

## Imagery and brand assets

### Product photography

Real ZENJI photography, served from the same Cloudinary account the live site uses. Every product
has five frames:

| Frame | View |
| --- | --- |
| `-1` | Front |
| `-2` | Back |
| `-3`, `-4` | Detail |
| `-5` | On model |

`src/lib/products.ts` holds the base URL and the helpers:

```ts
productImage(product, 3)          // one frame
productView(product, "ON MODEL")  // a named view
productGallery(product)           // all five, for the PDP gallery
```

`components/product/product-image.tsx` wraps `next/image` around them, and
`res.cloudinary.com` is allow-listed in `next.config.mjs`.

**To host the photos yourself:** download the files into `public/products/` keeping the
`Name-1.webp … Name-5.webp` naming, then change one line:

```ts
export const IMAGE_BASE = "/products";
```

### The hero sequence

The homepage hero is a scroll-scrubbed frame sequence, the same technique the live
site uses — a run of webp stills painted to a canvas, with the frame index tied to
scroll position, so the shot plays as you scroll.

`src/lib/hero-stage.ts` holds the config: 150 wide frames from the md breakpoint up,
75 lighter ones on phones, and how far you scroll to play them through.

Frames are fitted by **height**, not cover, so the subject stays in shot head-to-toe at
every viewport — the sides overflow instead of the figure being cropped.

It degrades in three steps, so the hero always shows something: reduced motion gets
the poster still with no scrubbing; a slow connection gets the poster until frame 0
decodes; a blocked frame source leaves the gradient ground.

**To host the frames yourself:** copy the `hero-stage` folder into `public/` and set

```ts
BASE: "/hero-stage",
```

### Logos

The supplied ZENJI wordmark and ZJ monogram live in `public/`, in white and black variants:

- `zenji-wordmark.png` / `zenji-wordmark-dark.png`
- `zenji-mark.png` / `zenji-mark-dark.png`
- `src/app/icon.png` + `public/apple-icon.png` — favicon and touch icon, built from the monogram
- `public/cursor-katana.png` — the katana cursor, driven by `katana-cursor.tsx`

`components/layout/wordmark.tsx` renders them:

```tsx
<Wordmark height={26} />                    // header
<Wordmark variant="mark" height={40} />     // monogram
<Wordmark tone="dark" href={null} />        // on a light surface
```

---

## Responsive & accessibility

Mobile-first from 390 px up. Drawer nav under `lg`, single-column product grid on phones,
carousels reflow 1 → 2 → 3 → 4 across breakpoints.

Semantic landmarks, labelled icon buttons, `role="radiogroup"` size pickers, `aria-pressed` on
toggles, `aria-live` countdown, visible focus rings, Radix focus traps in every overlay, and full
reduced-motion support.

---

## Notes for going live

- Checkout is a stub — wire Stripe or Shopify in `cart-page-content.tsx`
- The contact and waitlist forms resolve locally — point them at your endpoint
- Legal pages are placeholders — replace before launch
- Set `NEXT_PUBLIC_SITE_URL` so `sitemap.xml` emits real URLs
- Product photography and the hero frames load from the live site — see **Imagery** and **The hero sequence** above to self-host them
- Bump `NEXT_DROP_DATE` in `src/lib/products.ts` when the countdown expires
