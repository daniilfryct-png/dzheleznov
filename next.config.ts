import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 85, 90, 95],
  },
  async redirects() {
    return [
      { source: "/magazin", destination: "/katalog", permanent: true },
      { source: "/magazin/:slug", destination: "/katalog/:slug", permanent: true },
      { source: "/novinki", destination: "/katalog", permanent: true },
    ];
  },
};

export default nextConfig;
