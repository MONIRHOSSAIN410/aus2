import { seededRandom } from "@/lib/utils";
import type { Product } from "@/lib/products";

type View = "FRONT" | "BACK" | "ON MODEL";

interface ProductArtProps {
  product: Product;
  view?: View;
  className?: string;
}

/**
 * Placeholder product artwork.
 *
 * Generates a deterministic, seeded SVG "graphic tee" render per product so the
 * storefront ships with zero binary assets and no third-party imagery. Replace
 * this component with `next/image` once you have real photography — everything
 * else in the app takes a `Product`, not an image URL.
 */
export function ProductArt({ product, view = "FRONT", className }: ProductArtProps) {
  const { palette, kanji, slug, name } = product;
  const id = `${slug}-${view.replace(/\s/g, "")}`;
  const rand = (salt: number) => seededRandom(slug + view, salt);

  const splats = Array.from({ length: 14 }, (_, i) => ({
    cx: 60 + rand(i * 7 + 1) * 480,
    cy: 60 + rand(i * 11 + 2) * 620,
    r: 2 + rand(i * 13 + 3) * 16,
    o: 0.18 + rand(i * 17 + 4) * 0.55,
  }));

  const streaks = Array.from({ length: 5 }, (_, i) => ({
    x: 40 + rand(i * 23 + 5) * 520,
    y: 80 + rand(i * 29 + 6) * 560,
    h: 40 + rand(i * 31 + 7) * 220,
    w: 1 + rand(i * 37 + 8) * 2.5,
    o: 0.1 + rand(i * 41 + 9) * 0.35,
  }));

  const isDark = isColorDark(palette.base);

  return (
    <svg
      viewBox="0 0 600 750"
      className={className}
      role="img"
      aria-label={`${name} — ${view.toLowerCase()} view artwork`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor={palette.base} />
          <stop offset="100%" stopColor={mix(palette.base, isDark ? "#000000" : "#8f8b85", 0.28)} />
        </linearGradient>

        <radialGradient id={`glow-${id}`} cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor={palette.wash} stopOpacity="0.75" />
          <stop offset="100%" stopColor={palette.wash} stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`accent-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.accent} />
          <stop offset="100%" stopColor={mix(palette.accent, palette.ink, 0.45)} />
        </linearGradient>

        <filter id={`grain-${id}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed={Math.floor(rand(99) * 100)} />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.16" />
          </feComponentTransfer>
        </filter>

        <pattern id={`halftone-${id}`} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="1.6" fill={palette.ink} opacity="0.5" />
        </pattern>

        <clipPath id={`tee-${id}`}>
          <path d={TEE_PATH} />
        </clipPath>
      </defs>

      {/* studio ground */}
      <rect width="600" height="750" fill={`url(#bg-${id})`} />
      <rect width="600" height="750" fill={`url(#glow-${id})`} />

      {/* oversized kanji watermark */}
      <text
        x="300"
        y="470"
        textAnchor="middle"
        fontSize="440"
        fontFamily="'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif"
        fill={palette.ink}
        opacity={isDark ? 0.1 : 0.07}
      >
        {kanji}
      </text>

      {/* ink streaks + splatter */}
      {streaks.map((s, i) => (
        <rect key={`s${i}`} x={s.x} y={s.y} width={s.w} height={s.h} fill={palette.ink} opacity={s.o} />
      ))}
      {splats.map((s, i) => (
        <circle key={`c${i}`} cx={s.cx} cy={s.cy} r={s.r} fill={palette.ink} opacity={s.o * 0.7} />
      ))}

      {/* the garment */}
      <g>
        <path d={TEE_PATH} fill={mix(palette.base, isDark ? "#ffffff" : "#000000", 0.06)} />
        <g clipPath={`url(#tee-${id})`}>
          <rect x="120" y="120" width="360" height="520" fill={`url(#halftone-${id})`} opacity="0.18" />

          {view === "FRONT" && (
            <>
              <circle cx="300" cy="360" r="112" fill={`url(#accent-${id})`} opacity="0.9" />
              <circle cx="300" cy="360" r="112" fill="none" stroke={palette.ink} strokeWidth="2" opacity="0.5" />
              <text
                x="300"
                y="412"
                textAnchor="middle"
                fontSize="152"
                fontFamily="'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif"
                fill={contrastOn(palette.accent)}
              >
                {kanji}
              </text>
              <text
                x="300"
                y="512"
                textAnchor="middle"
                fontSize="17"
                letterSpacing="7"
                fontFamily="'IBM Plex Mono',ui-monospace,monospace"
                fill={palette.ink}
                opacity="0.75"
              >
                ZENJI
              </text>
              <text
                x="300"
                y="536"
                textAnchor="middle"
                fontSize="10"
                letterSpacing="4"
                fontFamily="'IBM Plex Mono',ui-monospace,monospace"
                fill={palette.ink}
                opacity="0.45"
              >
                {product.kanjiMeaning} — {product.arc}
              </text>
            </>
          )}

          {view === "BACK" && (
            <>
              {/* vertical banner: glyphs stacked as individual <text> nodes so it
                  renders identically everywhere (writing-mode is patchy in SVG) */}
              <rect x="252" y="196" width="96" height="304" fill={palette.accent} opacity="0.9" />
              <rect
                x="252"
                y="196"
                width="96"
                height="304"
                fill="none"
                stroke={palette.ink}
                strokeWidth="2"
                opacity="0.35"
              />
              {[kanji, "戦", "士"].map((glyph, index) => (
                <text
                  key={glyph + index}
                  x="300"
                  y={276 + index * 96}
                  textAnchor="middle"
                  fontSize="76"
                  fontFamily="'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif"
                  fill={contrastOn(palette.accent)}
                >
                  {glyph}
                </text>
              ))}
              <text
                x="300"
                y="556"
                textAnchor="middle"
                fontSize="12"
                letterSpacing="2"
                fontFamily="'IBM Plex Mono',ui-monospace,monospace"
                fill={palette.ink}
                opacity="0.75"
              >
                NO RESTOCKS. EVER.
              </text>
              <text
                x="300"
                y="578"
                textAnchor="middle"
                fontSize="9"
                letterSpacing="2.5"
                fontFamily="'IBM Plex Mono',ui-monospace,monospace"
                fill={palette.ink}
                opacity="0.45"
              >
                {product.arc}
              </text>
            </>
          )}

          {view === "ON MODEL" && (
            <>
              <rect x="120" y="120" width="360" height="520" fill={palette.ink} opacity="0.12" />
              <circle cx="300" cy="330" r="74" fill={`url(#accent-${id})`} opacity="0.85" />
              <text
                x="300"
                y="366"
                textAnchor="middle"
                fontSize="96"
                fontFamily="'Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif"
                fill={contrastOn(palette.accent)}
              >
                {kanji}
              </text>
              <path d="M120 470 L480 430 L480 640 L120 640 Z" fill={palette.ink} opacity="0.16" />
            </>
          )}
        </g>

        {/* garment seams */}
        <path d={TEE_PATH} fill="none" stroke={palette.ink} strokeWidth="2.2" opacity="0.35" />
        <path
          d="M244 138 q56 46 112 0"
          fill="none"
          stroke={palette.ink}
          strokeWidth="2.2"
          opacity="0.35"
        />
      </g>

      {/* grain + vignette */}
      <rect width="600" height="750" filter={`url(#grain-${id})`} opacity="0.5" />
      <rect width="600" height="750" fill="none" stroke={palette.ink} strokeWidth="1" opacity="0.18" />
    </svg>
  );
}

/** Oversized boxy tee silhouette. */
const TEE_PATH =
  "M244 118 L188 138 L120 186 L96 250 L150 288 L176 258 L176 640 Q300 660 424 640 L424 258 L450 288 L504 250 L480 186 L412 138 L356 118 Q300 158 244 118 Z";

function isColorDark(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

function contrastOn(hex: string) {
  return isColorDark(hex) ? "#F5F3F0" : "#0A0A0A";
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function mix(a: string, b: string, amount: number) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const to = (x: number, y: number) =>
    Math.round(x + (y - x) * amount)
      .toString(16)
      .padStart(2, "0");
  return `#${to(ca.r, cb.r)}${to(ca.g, cb.g)}${to(ca.b, cb.b)}`;
}
