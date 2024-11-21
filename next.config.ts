import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "seed-mix-image.spotifycdn.com",
      },
      {
        hostname: "image-cdn-ak.spotifycdn.com",
      },
    ],
  },
  transpilePackages: ["lucide-react"],
};

export default nextConfig;
