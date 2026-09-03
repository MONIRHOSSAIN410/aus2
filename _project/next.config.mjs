/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // ZENJI product photography lives on Cloudinary — same source as the live site.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/diqbikizp/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
