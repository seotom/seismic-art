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
        hostname: "vlinohzazsdhrdsqzlsj.supabase.co",
        pathname: "/storage/v1/object/public/artworks/**", // Разрешаем все пути в бакете artworks
      },
    ],
  },
};

export default nextConfig;
