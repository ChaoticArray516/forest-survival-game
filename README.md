# 森林生存 · Forest Survival

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-000000?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwindcss)](https://tailwindcss.com)

一款基于 **HTML5 Canvas 2D** 的浏览器生存游戏，玩家需要在广袤的像素风森林中收集资源、建造营火、管理饥饿与口渴，挑战 **10 天极限生存**。无需下载，无需注册，打开即玩。支持中英文双语。

> **A free browser-based 2D pixel-art survival game. Gather wood, build campfires, manage hunger and thirst — survive 10 days. No download, no login, play instantly. Bilingual (Chinese / English).**

线上地址 / Live: [https://forest-survival-game.vercel.app](https://forest-survival-game.vercel.app)

---

## 预览 · Preview

*(建议在浏览器中打开线上地址体验完整游戏)*

---

## 技术栈 · Stack

| 层 | 技术 | 说明 |
|----|------|------|
| 框架 | Next.js 16.2.6 | App Router + Turbopack，静态导出 |
| 运行时 | React 19.2.4 | Concurrent Features + React Server Components |
| 语言 | TypeScript 5.x | 全链路类型安全 |
| 样式 | Tailwind CSS 4 | Utility-first CSS |
| 国际化 | 手动实现 | `[locale]` 动态路由 + `Record<Locale>` 内容映射 |
| 游戏引擎 | HTML5 Canvas 2D | 原生 Canvas API，60fps 游戏循环 |
| 字体 | Google Fonts (Geist) | Sans + Mono 双字体变量 |
| 部署 | Vercel | 静态站点托管 |

---

## 目录结构 · Layout

```
next-app/
├── public/                         # 静态资源
│   ├── player.png                  # 玩家贴图
│   ├── tree.png                    # 树木贴图
│   ├── apple_tree.png              # 苹果树贴图
│   ├── pool.png                    # 水池贴图
│   ├── campfire.png                # 营火贴图
│   ├── grass_tile.jpg              # 草地背景贴图
│   └── robots.txt                  # 搜索引擎爬虫规则
├── src/
│   ├── i18n/
│   │   ├── config.ts               # 语言配置: locales = ['zh','en']
│   │   └── game.ts                 # 游戏内文本双语字典
│   ├── app/
│   │   ├── layout.tsx              # 根布局（透传 children）
│   │   ├── globals.css             # 全局样式 + Tailwind 导入
│   │   ├── sitemap.ts              # 动态生成 sitemap.xml（8 个 URL）
│   │   ├── og-image.png/route.tsx  # 动态 OG 图片生成（1200x630）
│   │   └── [locale]/               # 多语言路由
│   │       ├── layout.tsx          # 双语 Metadata + Schema.org JSON-LD
│   │       ├── page.tsx            # 首页：游戏 Canvas + SEO 内容
│   │       ├── how-to-play/page.tsx    # 玩法攻略
│   │       ├── developer-log/page.tsx  # 开发者日志
│   │       ├── privacy/page.tsx        # 隐私政策
│   │       └── game/               # 游戏核心代码
│   │           ├── GameClient.tsx  # dynamic import 入口（ssr: false）
│   │           ├── GameCanvas.tsx  # Canvas 主组件 + HUD + 触摸交互
│   │           ├── engine.ts       # 游戏逻辑引擎（状态机 + 游戏循环）
│   │           ├── renderer.ts     # Canvas 渲染器（昼夜遮罩 + 光照）
│   │           ├── config.ts       # 游戏常量 + 10 天难度配置表
│   │           ├── types.ts        # TypeScript 类型定义
│   │           └── utils.ts        # 工具函数 + 世界生成算法
│   └── proxy.ts                    # 代理配置
├── next.config.ts                  # Next.js 配置
├── postcss.config.mjs              # PostCSS 配置（Tailwind）
├── eslint.config.mjs               # ESLint 配置
└── tsconfig.json                   # TypeScript 配置
```

---

## 路由 · Routes

| 路由 | 中文内容 | English Content | 优先级 |
|------|----------|-----------------|--------|
| `/` | 自动重定向到 `/zh` | Redirects to `/zh` | — |
| `/zh` / `/en` | 首页 + 游戏 Canvas | Home + Game Canvas | 1.0 |
| `/zh/how-to-play` | 完整玩法攻略 | Game Guide | 0.6 |
| `/zh/developer-log` | 开发者日志 | Developer Log | 0.6 |
| `/zh/privacy` | 隐私政策 | Privacy Policy | 0.6 |
| `/sitemap.xml` | 8 个 URL 站点地图 | Sitemap | — |
| `/robots.txt` | 爬虫规则 | Robots | — |

---

## 本地开发 · Development

```bash
# 安装依赖
npm install

# 启动开发服务器（Turbopack）
npm run dev
# 访问 http://localhost:3000

# 代码检查
npm run lint
```

## 构建 · Build

```bash
# 静态导出
npm run build

# 产物位于 out/ 目录
# 纯静态 HTML，可部署到任何静态托管平台
```

---

## 游戏机制 · Gameplay

### 核心资源

| 资源 | 图标 | 获取方式 | 用途 |
|------|------|----------|------|
| 木材 | 🪵 | 砍伐树木 | 建造营火 |
| 苹果 | 🍎 | 采集苹果树 | 恢复饥饿值 |
| 水源 | 💧 | 靠近水池收集 | 恢复口渴值 |
| 营火 | 🔥 | 消耗 3 木材建造 | 黑夜御寒 |

### 生存指标

| 指标 | 初始值 | 归零后果 |
|------|--------|----------|
| HP（生命值） | 100 | 死亡 |
| 饥饿值 | 100 | 每秒损失 8 HP |
| 口渴值 | 100 | 每秒损失 8 HP |

### 10 天难度曲线

游戏采用**渐进式压力递增**模型，从 5 个维度同时提升难度：

| 阶段 | 天数 | 核心变化 |
|------|------|----------|
| 适应期 | 第 1-2 天 | 资源充足，饥饿/口渴消耗 0.4-0.6/s |
| 资源紧张期 | 第 3-4 天 | 树木刷新延长至 5-7 秒，水池减少 |
| 转折点 | 第 5 天 | 寒冷伤害提升至 8/s，黑夜占比 45% |
| 高压期 | 第 6-7 天 | 最大饥饿/口渴上限降至 80 |
| 极限挑战 | 第 8-10 天 | 树木仅剩 15-20 棵，寒冷伤害高达 15/s |

### 操作方式

**PC 键盘：**
- `W/A/S/D` 或方向键 — 移动
- `空格` 或 `E` — 采集/砍伐/建造
- `1` — 吃苹果
- `2` — 喝水
- `3` — 建造营火（消耗 3 木材）

**移动端触屏：**
- 左下角虚拟摇杆 — 移动
- 右下角采集按钮 — 互动
- 靠近资源自动显示可采集提示

---

## SEO 架构 · SEO Architecture

本项目采用 **Next.js App Router 静态导出**，实现了完整的搜索引擎优化：

### On-Page SEO

- **双语独立 Metadata**：`generateMetadata()` 按 locale 输出独立的 Title / Description / Keywords / OG / Twitter Card
- **Canonical + Hreflang**：每个页面携带 `zh-CN` / `en-US` / `x-default` 三条 alternate 标签
- **语义化 HTML**：H1（1 个）+ H2（5 个）+ H3（8+ 个），使用 `<section>` / `<nav>` / `<footer>` / `<details>`
- **游戏内文本 i18n**：`gameText[locale]` 字典 + `getTimeText(state, locale)` 实现 HUD 双语化

### 技术 SEO

- **Schema.org JSON-LD**：`WebSite` + `VideoGame` 结构化数据（含 author / offers / genre / gamePlatform）
- **动态 Sitemap**：`src/app/sitemap.ts` 自动生成 8 个 URL（4 路径 × 2 语言）
- **动态 OG 图片**：`src/app/og-image.png/route.tsx` Edge 运行时生成 1200×630 PNG
- **robots.txt**：已配置，允许全站索引
- **静态导出**：HTML 首屏包含完整文本内容，Googlebot 无需执行 JS 即可抓取

### 页面结构示例（首页）

```
<!-- <head>: 完整的 SEO 标签 -->
<!-- <body> -->
  Hero Section
    └─ H1: "森林生存 — 免费在线浏览器生存游戏"
    └─ 游戏 Canvas（客户端渲染）
  游戏玩法介绍
    └─ H2: "游戏玩法介绍"
    └─ H3 × 4: "10天生存挑战" / "资源收集系统" / "昼夜循环" / "生存指标管理"
  操作指南
    └─ H2: "操作指南"
    └─ H3 × 2: "PC 键盘操作" / "移动端触屏操作"
  常见问题（FAQ）
    └─ H2: "常见问题"
    └─ <details> × 3: 无需下载 / 支持浏览器 / 存档说明
  开发者日志预告
    └─ H2: "开发者日志"
    └─ 开发者简介 + 链接
  语言切换器
  Footer
    └─ 版权 + 隐私政策 + 玩法攻略 + GitHub
```

---

## 更新日志 · Changelog

| 版本 | 日期 | 内容 |
|------|------|------|
| v1.0 | 2026-05-07 | 初始版本：核心生存系统、10 天渐进难度、资源收集与建造、昼夜循环、PC 键盘 + 移动端触屏双平台支持 |
| v1.1 | 计划中 | 环境音效（鸟鸣、风声、篝火声）、背景音乐 |
| v1.2 | 计划中 | LocalStorage 存档、通关记录、最佳生存天数排行榜 |
| v2.0 | 计划中 | 野生动物（狼、熊）、战斗系统、武器制作、陷阱系统 |

---

## 作者 · Author

**[ChaoticArray](https://github.com/ChaoticArray516)** — 独立开发者

使用 React 19 + TypeScript + HTML5 Canvas 独立开发。

- GitHub: [@ChaoticArray516](https://github.com/ChaoticArray516)
- Twitter/X: [@ChaoticArray516](https://twitter.com/ChaoticArray516)
- 项目仓库: [forest-survival-game](https://github.com/ChaoticArray516/forest-survival-game)

---

## 许可 · License

MIT License — 自由使用、修改和分发。
