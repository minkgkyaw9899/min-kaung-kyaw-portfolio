import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/en/portfolio",
      permanent: true,
    },
  ],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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
