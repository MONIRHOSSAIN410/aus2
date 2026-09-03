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

  /**
   * `stride` samples the source sequence instead of loading every still. The
   * source has 150 desktop frames; at stride 3 we fetch 50, which is about
   * 1/3 the bytes and still reads as continuous motion under a scrub — the
   * single biggest lever on how fast the homepage becomes usable.
   */
  desktop: { dir: "frames", total: 150, stride: 3, width: 1086, height: 720 },
  mobile: { dir: "frames-m", total: 75, stride: 3, width: 815, height: 540 },

  /** Still shown until the sequence has buffered, and the reduced-motion fallback. */
  poster: (dir: string) => `${heroStage.BASE}/${dir}/f-000.webp`,

  frame: (dir: string, index: number) =>
    `${heroStage.BASE}/${dir}/f-${String(index).padStart(3, "0")}.webp`,

  /** How many frames to fetch at once while buffering. */
  concurrency: 4,

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

/** The source frame numbers actually fetched for a variant. */
export function frameIndices(variant: HeroVariant) {
  const { total, stride } = heroStage[variant];
  const indices: number[] = [];
  for (let i = 0; i < total; i += stride) indices.push(i);
  // Always land on the final frame so the sequence ends where it should.
  if (indices[indices.length - 1] !== total - 1) indices.push(total - 1);
  return indices;
}
