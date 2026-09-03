import localFont from "next/font/local";

/**
 * Self-hosted fonts (woff2 checked into src/fonts).
 *
 * Anton — display / headlines. IBM Plex Mono — body + UI. Archivo — utility sans.
 * Using next/font/local rather than next/font/google keeps builds working offline
 * and in CI sandboxes with no egress to fonts.googleapis.com.
 */

export const anton = localFont({
  src: [{ path: "../fonts/anton-400.woff2", weight: "400", style: "normal" }],
  variable: "--font-anton",
  display: "swap",
  fallback: ["Impact", "Haettenschweiler", "Arial Narrow Bold", "sans-serif"],
});

export const plexMono = localFont({
  src: [
    { path: "../fonts/plex-mono-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/plex-mono-300-italic.woff2", weight: "300", style: "italic" },
    { path: "../fonts/plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/plex-mono-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/plex-mono-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/plex-mono-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/plex-mono-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/plex-mono-600-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const archivo = localFont({
  src: [{ path: "../fonts/archivo-var.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-archivo",
  display: "swap",
  fallback: ["system-ui", "Helvetica Neue", "sans-serif"],
});
