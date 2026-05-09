# 森林生存 · Forest Survival

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-000000?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev)
[![next-intl](https://img.shields.io/badge/next--intl-routing-blue)](https://next-intl.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwindcss)](https://tailwindcss.com)

一款基于 HTML5 Canvas 的浏览器生存游戏,玩家需要在森林中收集资源、建造营火、生存 10 天。无需下载,即开即玩。中英文双语 SEO 优化。

> **A free browser-based 2D pixel-art survival game. Gather wood, build campfires, manage hunger and thirst — survive 10 days. Bilingual (Chinese / English).**

线上地址 / Live: https://forestsurvival.org

---

## 技术栈 · Stack

| 层 | 技术 |
|----|------|
| 框架 | Next.js 16.2.6 (App Router + Turbopack, `output: "export"` 静态导出) |
| 视图 | React 19.2 + TypeScript 5 |
| 样式 | Tailwind CSS 4 |
| 国际化 | next-intl middleware(zh / en 路由重定向)+ `Record<Locale>` 内嵌页面翻译 |
| 游戏渲染 | HTML5 Canvas 2D + dynamic import (ssr:false) |
| 部署 | Vercel(静态站点托管) |

## 目录结构 · Layout

```
next-app/
├── public/                  游戏静态贴图 + robots.txt
│   ├── player.png / tree.png / apple_tree.png / pool.png / campfire.png / grass_tile.jpg
│   └── robots.txt
├── src/
│   ├── i18n/
│   │   ├── config.ts        export const locales = ['zh','en']; defaultLocale = 'zh'
│   │   └── game.ts          游戏内文本 i18n 字典(zh/en)
│   ├── middleware.ts        next-intl 重定向中间件
│   └── app/
│       ├── layout.tsx       根 layout
│       ├── sitemap.ts       8 URL 双语 sitemap 生成
│       └── [locale]/
│           ├── layout.tsx   双语 metadata + Schema.org + generateStaticParams
│           ├── page.tsx     首页(Record<Locale> 内嵌翻译)
│           ├── how-to-play/page.tsx
│           ├── developer-log/page.tsx
│           ├── privacy/page.tsx
│           └── game/
│               ├── GameClient.tsx  dynamic import 入口
│               ├── GameCanvas.tsx  Canvas 主组件 + locale prop
│               ├── engine.ts       游戏逻辑(状态机)
│               ├── renderer.ts     Canvas 渲染器 + getTimeText(locale)
│               ├── config.ts       游戏常量(数值/颜色/10天难度配置)
│               ├── types.ts        类型定义
│               └── utils.ts        工具函数
└── next.config.ts           output: "export" + images.unoptimized
```

## 路由 · Routes

| 路由 | 中文 | English |
|------|------|---------|
| `/` | middleware 自动重定向到 `/zh` | redirects to `/zh` |
| `/[locale]` | 首页 + 游戏 Canvas | Home + Game Canvas |
| `/[locale]/how-to-play` | 玩法攻略 | Game Guide |
| `/[locale]/developer-log` | 开发者日志 | Developer Log |
| `/[locale]/privacy` | 隐私政策 | Privacy Policy |
| `/sitemap.xml` | 8 URL(4 路径 × zh/en) | — |
| `/robots.txt` | — | — |

## 本地开发 · Development

```bash
npm install
npm run dev          # http://localhost:3000
```

## 构建与部署 · Build & Deploy

```bash
npm run build        # Turbopack 静态导出,产物在 out/
npm run start        # 生产服务器(本地预览 export)
```

部署 Vercel 时:由于 `output: "export"`,产物为纯静态资源,无需 server runtime。

## SEO 特性 · SEO Features

- **双语 metadata**:`generateMetadata({ params })` 按 locale 输出独立的 Title / Description / OG / Twitter Card
- **hreflang + x-default**:每个页面携带 `zh-CN` / `en-US` / `x-default` 三条 alternate
- **Schema.org JSON-LD**:WebSite + VideoGame,`inLanguage` 随 locale 切换
- **canonical 含 locale 段**:避免双语内容重复
- **sitemap.xml**:8 个 URL 自动生成(`src/app/sitemap.ts`)
- **robots.txt**:已配置(`public/robots.txt`)
- **游戏内文本 i18n**:GameCanvas 通过 `gameText[locale]` 字典 + renderer.ts 的 `getTimeText(state, locale)` 双语化

## 游戏机制 · Gameplay

- **资源**:🪵 木材 / 🍎 苹果 / 💧 水 / 🔥 营火
- **指标**:HP / 饥饿 / 口渴
- **昼夜循环**:白天可采集,黑夜寒冷伤害
- **难度递增**:第 1-2 天适应期 → 第 5 天转折 → 第 8-10 天极限挑战
- **操作**:PC 用 WASD/方向键 + 空格;移动端虚拟摇杆 + 采集按钮

## 作者 · Author

[ChaoticArray](https://github.com/ChaoticArray516) — 独立开发者
