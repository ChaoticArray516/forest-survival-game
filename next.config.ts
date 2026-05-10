import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // SEO: 把根路径 / 从 next-intl 默认的 307 临时重定向
        // 升级为 308 永久重定向,让 Google 把权重传递到 /en。
        // forestsurvival.org 主打英文市场,/en 作为规范默认 locale。
        // 中文用户通过页面底部语言切换器或直接访问 /zh 仍可正常使用。
        source: "/",
        destination: "/en",
        permanent: true, // 308
      },
    ];
  },
};

export default nextConfig;
