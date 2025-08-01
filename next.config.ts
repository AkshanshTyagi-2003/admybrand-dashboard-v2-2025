import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ This disables lint errors from stopping the build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ This disables TypeScript type errors from stopping the build
  },
};

export default nextConfig;
