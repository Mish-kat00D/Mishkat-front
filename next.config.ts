import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // hostnames
  images: {
    domains: ["https://placehold.co", "placehold.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ]
  },
};

export default nextConfig;
