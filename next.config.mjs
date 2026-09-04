/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // Resizing happens on Cloudinary, not on this server — see src/lib/image-loader.ts.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // Widths the loader is allowed to request. A short list means fewer distinct
    // CDN transforms to warm, and smaller srcsets in the HTML.
    deviceSizes: [390, 640, 828, 1080, 1440, 1920],
    imageSizes: [80, 128, 256, 384],
  },

  experimental: {
    // Rewrites barrel imports to deep ones so a single icon doesn't pull the
    // whole icon set into the client bundle.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
