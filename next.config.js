/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next", // Фиксируем .next для всех сред
  images: {
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
