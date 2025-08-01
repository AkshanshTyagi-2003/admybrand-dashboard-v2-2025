import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ This line disables lint blocking builds
  },
};

export default nextConfig;
