import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
  transpilePackages: ["lucide-react"],
};

export default nextConfig;
