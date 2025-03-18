/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // devIndicators: false,
  distDir: process.env.NODE_ENV === "production" ? "build" : ".next",
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
      },
    ],
  },
};

export default nextConfig;
