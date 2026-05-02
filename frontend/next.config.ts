import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // 静态导出，适配 GitHub Pages
  basePath: "/DreamLab",    // 仓库名即路径前缀
  images: {
    unoptimized: true,      // 静态导出不支持 Image Optimization
  },
  turbopack: {
    root: "/root/.openclaw/workspace/dreamlab/frontend",
  },
};

export default nextConfig;
