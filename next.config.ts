import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev overlay stalls compositing on this machine during screenshot QA.
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // YouTube poster frames for the campaign and pay-per-click clips.
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;
