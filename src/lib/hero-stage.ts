/**
 * Hero stage configuration.
 *
 * The homepage hero is a scroll-scrubbed frame sequence — the same technique the
 * live site uses: a run of webp stills drawn to a canvas, with the frame index
 * tied to scroll position, so the shot "plays" as you scroll.
 *
 * The frames are served from zenji.shop by default. To host them yourself, copy
 * the `hero-stage` folder into `public/` and set BASE to "/hero-stage".
 */
export const heroStage = {
  BASE: "https://zenji.shop/hero-stage",

  /** Wide sequence, used from the md breakpoint up. */
  desktop: { dir: "frames", count: 150, width: 1086, height: 720 },
  /** Lighter sequence for phones — half the frames, smaller stills. */
  mobile: { dir: "frames-m", count: 75, width: 815, height: 540 },

  /** Still shown until the sequence has buffered, and the reduced-motion fallback. */
  poster: (dir: string) => `${heroStage.BASE}/${dir}/f-000.webp`,

  frame: (dir: string, index: number) =>
    `${heroStage.BASE}/${dir}/f-${String(index).padStart(3, "0")}.webp`,

  /**
   * How tall the hero spacer is. The sequence plays over
   * (scrollLength − viewport height), so these need enough headroom above 100vh
   * to give the scrub a comfortable run — at 150vh on a tall phone the whole
   * sequence was over in a couple of flicks.
   */
  scrollLength: { desktop: "260vh", mobile: "220vh" },

  /** Fraction of the scroll after which the copy fades out and the page hands off. */
  handoff: 0.9,
} as const;

export type HeroVariant = "desktop" | "mobile";
