import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/*': ['./presentaties/**/*'],
  },
};
export default nextConfig;
