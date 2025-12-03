import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // hostnames
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ]
  },
};

export default nextConfig;
