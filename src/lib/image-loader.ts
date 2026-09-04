import type { ImageLoaderProps } from "next/image";

/**
 * next/image loader.
 *
 * Product photography is resized by Cloudinary itself rather than by the Next
 * server. The built-in optimizer would fetch every original, re-encode it and
 * cache it locally — slow in dev and a needless hop in production when the
 * images already sit behind a CDN that does the same job in the URL.
 *
 * Local files in `public/` are returned untouched: they are small, already
 * optimised, and served straight off the static route.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith("/") || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }

  const cloudinary = src.match(/^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload)\/(.+)$/);
  if (cloudinary) {
    const [, base, path] = cloudinary;
    // f_auto picks avif/webp per browser, dpr_auto handles retina,
    // c_limit never upscales past the original.
    const transforms = `f_auto,q_${quality ?? 70},w_${width},c_limit,dpr_auto`;
    return `${base}/${transforms}/${path}`;
  }

  return src;
}
