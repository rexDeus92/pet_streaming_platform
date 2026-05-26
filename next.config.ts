import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/pet_streaming_platform' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
