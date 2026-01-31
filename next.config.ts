import mdx from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = mdx();

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  compiler: {
    removeConsole: isProd,
    reactRemoveProperties: isProd,
  },
  experimental: {
    cssChunking: true,
    mdxRs: true,
    taint: true,
    useLightningcss: true,
    browserDebugInfoInTerminal: !isProd,
  },
};

export default withMDX(nextConfig);
