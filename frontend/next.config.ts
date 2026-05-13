import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // 静态导出，适配 GitHub Pages
  basePath: "/DreamLab",    // 仓库名即路径前缀
  trailingSlash: true,       // 目录式静态页面，避免 GitHub Pages 直达路由 404
  images: {
    unoptimized: true,      // 静态导出不支持 Image Optimization
  },
};

export default nextConfig;
