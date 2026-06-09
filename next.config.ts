import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "198.19.254.2"],
  turbopack: {
    root: "/Users/danielshar/Desktop/ascends",
  },
};

export default nextConfig;
