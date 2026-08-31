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

---

## Pages

| Route | What's on it |
| --- | --- |
| `/` | Intro splash, parallax hero, about block, sale rail, full-bleed carousel, latest-drops rail, manifesto |
| `/login` | **Google / Apple / email sign-in**, guest link, animated provider→email transition |
| `/drop` | Next-drop countdown, waitlist form, still-available grid |
| `/drop/[slug]` | Product detail — gallery views, size picker, wishlist, accordions, related rail (10 static routes) |
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
slide-out cart, quick-view dialog, promo modal, cookie banner, toast system, scroll-progress bar.

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
│   ├── icon.svg             favicon (力)
│   ├── robots.ts sitemap.ts SEO metadata routes
│   └── …                    page routes
├── components/
│   ├── ui/                  shadcn/ui primitives (button, input, dialog, sheet, accordion, tabs…)
│   ├── layout/              header, footer, cart drawer, promo modal, cookie banner, toaster
│   ├── motion/              Reveal, SplitHeading, Marquee, Magnetic, PageTransition, ScrollProgress
│   ├── auth/                login card + provider marks
│   ├── home/                hero, intro splash, about, carousel, manifesto
│   ├── product/             card, rail, grid, detail, quick view, size selector, generative artwork
│   ├── lookbook/ drop/ cart/ account/ contact/ shared/
│   ├── providers.tsx        Redux Provider + localStorage bridge
│   └── smooth-scroll.tsx    Lenis
├── store/
│   ├── index.ts hooks.ts selectors.ts
│   └── slices/              auth · cart · wishlist · ui
├── lib/                     products, faq, site config, fonts, utils
└── fonts/                   self-hosted woff2
```

### Redux Toolkit

Four slices, per-request store creation (`makeStore()`), typed `useAppSelector` / `useAppDispatch`,
and memoised selectors in `store/selectors.ts`. Cart, wishlist and session are mirrored to
`localStorage` by a subscription in `providers.tsx` — every write is wrapped in try/catch so private
browsing doesn't break the app.

### Motion

| Effect | Where |
| --- | --- |
| Smooth scroll | Lenis in `smooth-scroll.tsx` — anchor interception, route reset, disabled under `prefers-reduced-motion` |
| Scroll progress | `motion/scroll-progress.tsx`, spring-damped bar under the header |
| Parallax | `useScroll` + `useTransform` on hero, about image, manifesto wordmark |
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

### Tailwind + shadcn/ui

`components.json` is configured, so `npx shadcn@latest add <component>` drops new primitives into
`src/components/ui` with the right paths. Brand scale lives in `tailwind.config.ts`
(`blood`, `ink`, `bone`, `steel`) alongside the HSL token layer the shadcn components read.

---

## Product imagery

There are no image files. `components/product/product-art.tsx` generates a deterministic SVG per
product — tee silhouette, seeded ink splatter, halftone, kanji graphic — in three views
(FRONT / BACK / ON MODEL), seeded from the slug so server and client render identically.

To swap in real photography, replace that one component with `next/image`. Everything else takes a
`Product` object, not an image URL, so nothing else changes.

Product names, prices and copy follow the reference site; artwork is original placeholder geometry.

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
- Bump `NEXT_DROP_DATE` in `src/lib/products.ts` when the countdown expires
