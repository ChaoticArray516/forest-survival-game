import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/i18n/config";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  return {
    title: isZh
      ? "开发者日志 | 森林生存游戏开发背后的故事"
      : "Developer Log | Forest Survival Game",
    description: isZh
      ? "了解森林生存游戏的开发历程：从创意到上线的完整故事。技术选型、架构设计、10天难度曲线的设计理念，以及独立开发者的第一手经验。"
      : "Behind the scenes of Forest Survival: the full story from concept to launch. Tech stack, architecture design, 10-day difficulty curve, and firsthand indie dev experience.",
    alternates: {
      canonical: `https://forest-survival-game.vercel.app/${locale}/developer-log`,
      languages: {
        "zh-CN": "https://forest-survival-game.vercel.app/zh/developer-log",
        "en-US": "https://forest-survival-game.vercel.app/en/developer-log",
        "x-default": "https://forest-survival-game.vercel.app/en/developer-log",
      },
    },
  };
}

const content: Record<Locale, any> = {
  zh: {
    navHome: "首页",
    navCurrent: "开发者日志",
    h1: "开发者日志",
    whoTitle: "我是谁",
    whoText: [
      "你好，我是 ChaoticArray，一名热爱游戏开发的独立开发者。你可以在 GitHub 上找到我的其他项目。",
      "我的技术背景主要是前端开发（React、TypeScript），但一直对游戏开发充满热情。森林生存是我将前端技术与游戏设计结合的第一次完整尝试，从概念到可玩版本历时约 2 周。",
      "选择独立开发这款游戏的原因很简单：我想在浏览器中玩到一款真正“即开即玩”的生存游戏，不需要下载、不需要注册、不需要等待加载。如果市面上没有，那就自己做一个。",
    ],
    howTitle: "如何构建",
    techTitle: "技术选型",
    techText: [
      "前端框架选择了 React 19 配合 TypeScript，游戏渲染使用原生 HTML5 Canvas 2D API，构建工具使用 Vite。整个项目采用单文件组件设计，游戏核心逻辑集中在 engine.ts、renderer.ts 和 GameCanvas.tsx 三个文件中。",
      "选择 Canvas 而非 WebGL 的原因是：这是一款 2D 像素风游戏，Canvas 2D 完全够用，且不需要引入 Three.js 等重型库。游戏地图尺寸为 2400×2400 像素，同时渲染的实体不超过 50 个，Canvas 2D 在主流设备上可以轻松保持 60fps。",
    ],
    archTitle: "游戏架构设计",
    archIntro: "游戏采用经典的「游戏循环 + 状态机」架构：",
    archItems: [
      "engine.ts — 游戏逻辑引擎，负责状态更新、碰撞检测、昼夜循环、资源生成与消耗计算",
      "renderer.ts — Canvas 渲染器，负责画面绘制、粒子效果、浮动文字、UI 状态条",
      "config.ts — 10天难度配置表，每天独立配置饥饿/口渴消耗速度、树木刷新时间、黑夜占比等参数",
      "types.ts — TypeScript 类型定义，确保全链路类型安全",
    ],
    archOutro: "输入系统同时支持键盘事件（PC）和触摸事件（移动端虚拟摇杆），通过统一的 InputState 接口抽象，游戏逻辑层无需关心输入来源。",
    curveTitle: "10天难度曲线设计",
    curveIntro: "难度曲线是整个游戏设计的核心。我采用「渐进式压力递增」模型，从多个维度同时提升难度，而非单一维度（如只增加敌人血量）：",
    curveItems: [
      "资源消耗加速：饥饿/口渴消耗从 0.4/s 递增至 1.8/s",
      "资源供给减少：初始树木从 40 棵减至 15 棵，水池从 8 个减至 2 个",
      "环境威胁加剧：夜间寒冷伤害从 2/s 递增至 15/s",
      "时间压力增加：黑夜占比从 30% 递增至 55%",
      "上限压缩：第6天起最大饥饿/口渴从 100 降至 80，降低容错空间",
    ],
    curveOutro: "这套设计经过 20 多次内部测试调整，目标是让新手能活过第 3-4 天，有经验的玩家在第 8-9 天感受到真正的生存压力，只有精通资源管理的玩家才能通关。",
    aiTitle: "AI 辅助披露",
    aiText: "本项目的游戏代码（engine.ts、renderer.ts 等）由开发者手动编写，AI 工具仅用于生成部分 UI 组件代码和开发文档。游戏设计决策（难度曲线、数值平衡、美术风格）完全由人工制定并经过多次测试验证。",
    whyTitle: "为什么做这款游戏",
    whyText: [
      "市面上优秀的生存游戏很多——《饥荒》、《森林》、《绿色地狱》等，但它们都需要下载安装、占用大量存储空间、学习成本高。我想填补「轻量级网页生存游戏」这个细分市场的空白。",
      "目标用户很明确：想在浏览器中快速体验生存游戏乐趣的玩家。他们可能在工作间隙想玩一局，或者在手机上不想下载 App。核心价值主张是三个关键词：无需下载、即开即玩、渐进式难度。",
      "长远来看，我希望将这款游戏发展为一个小型游戏系列的基础，后续可能加入多人联机、自定义地图、MOD 支持等功能。",
    ],
    timelineTitle: "更新日志",
    versions: [
      { date: "2026-05-07", status: "发布", title: "v1.0 初始版本", desc: "核心生存系统、10天渐进难度、资源收集与建造、昼夜循环、PC键盘+移动端触屏双平台支持" },
      { date: "计划中", status: "计划", title: "v1.1 音效与沉浸感", desc: "环境音效（鸟鸣、风声、篝火声）、背景音乐、采集音效反馈" },
      { date: "计划中", status: "计划", title: "v1.2 存档与进度", desc: "LocalStorage 存档、通关记录、最佳生存天数排行榜" },
      { date: "计划中", status: "计划", title: "v2.0 生物与战斗", desc: "野生动物（狼、熊）、战斗系统、武器制作、陷阱系统" },
    ],
    backBtn: "← 返回游戏",
  },
  en: {
    navHome: "Home",
    navCurrent: "Developer Log",
    h1: "Developer Log",
    whoTitle: "Who I Am",
    whoText: [
      "Hi, I'm ChaoticArray, an indie developer passionate about game development. You can find my other projects on GitHub.",
      "My technical background is mainly in frontend development (React, TypeScript), but I've always been passionate about game development. Forest Survival is my first complete attempt at combining frontend tech with game design, from concept to playable version in about 2 weeks.",
      "The reason I chose to develop this game independently is simple: I wanted to play a truly instant-play survival game in the browser — no download, no registration, no loading screens. If it doesn't exist, build it yourself.",
    ],
    howTitle: "How It's Built",
    techTitle: "Tech Stack",
    techText: [
      "The frontend uses React 19 with TypeScript, game rendering uses native HTML5 Canvas 2D API, and the build tool is Vite. The entire project follows a single-file component design, with core game logic concentrated in three files: engine.ts, renderer.ts, and GameCanvas.tsx.",
      "Canvas 2D was chosen over WebGL because this is a 2D pixel-art game where Canvas 2D is more than sufficient, without needing heavy libraries like Three.js. The game map is 2400×2400 pixels with no more than 50 entities rendered simultaneously — Canvas 2D easily maintains 60fps on mainstream devices.",
    ],
    archTitle: "Game Architecture",
    archIntro: "The game uses a classic game loop + state machine architecture:",
    archItems: [
      "engine.ts — Game logic engine, handles state updates, collision detection, day/night cycle, resource generation and consumption",
      "renderer.ts — Canvas renderer, handles drawing, particle effects, floating text, UI status bars",
      "config.ts — 10-day difficulty config table, each day independently configures hunger/thirst decay, tree respawn time, night ratio, etc.",
      "types.ts — TypeScript type definitions, ensuring full-stack type safety",
    ],
    archOutro: "The input system supports both keyboard events (PC) and touch events (mobile virtual joystick) simultaneously, abstracted through a unified InputState interface so the game logic layer doesn't need to care about input source.",
    curveTitle: "10-Day Difficulty Curve Design",
    curveIntro: "The difficulty curve is the heart of the game design. I use a progressive pressure escalation model that increases difficulty across multiple dimensions simultaneously, rather than a single dimension (like just increasing enemy HP):",
    curveItems: [
      "Resource consumption acceleration: hunger/thirst decay increases from 0.4/s to 1.8/s",
      "Resource supply reduction: initial trees decrease from 40 to 15, pools from 8 to 2",
      "Environmental threat escalation: nighttime cold damage increases from 2/s to 15/s",
      "Time pressure increase: night ratio grows from 30% to 55%",
      "Cap compression: from Day 6, max hunger/thirst drops from 100 to 80, reducing margin for error",
    ],
    curveOutro: "This design was tuned through 20+ internal test iterations. The goal: beginners survive Days 3-4, experienced players feel real pressure on Days 8-9, and only resource management masters can clear all 10 days.",
    aiTitle: "AI Assistance Disclosure",
    aiText: "The game code (engine.ts, renderer.ts, etc.) was manually written by the developer. AI tools were only used for generating some UI component code and development documentation. All game design decisions (difficulty curve, value balancing, art style) were made by humans and validated through multiple testing rounds.",
    whyTitle: "Why Build This Game",
    whyText: [
      "There are many excellent survival games — Don't Starve, The Forest, Green Hell — but they all require downloads, take up storage space, and have steep learning curves. I wanted to fill the niche of lightweight browser survival games.",
      "The target user is clear: players who want to quickly experience survival game fun in a browser. Maybe during a work break, or on mobile without downloading an app. The core value proposition is three words: no download, instant play, progressive difficulty.",
      "In the long term, I hope to evolve this game into the foundation of a small game series, potentially adding multiplayer, custom maps, and mod support.",
    ],
    timelineTitle: "Changelog",
    versions: [
      { date: "2026-05-07", status: "Released", title: "v1.0 Initial Release", desc: "Core survival system, 10-day progressive difficulty, resource gathering and crafting, day/night cycle, PC keyboard + mobile touch dual-platform support" },
      { date: "Planned", status: "Planned", title: "v1.1 Sound & Immersion", desc: "Ambient sounds (birds, wind, campfire), background music, collection sound feedback" },
      { date: "Planned", status: "Planned", title: "v1.2 Save & Progress", desc: "LocalStorage save, completion records, best survival day leaderboard" },
      { date: "Planned", status: "Planned", title: "v2.0 Creatures & Combat", desc: "Wild animals (wolves, bears), combat system, weapon crafting, trap system" },
    ],
    backBtn: "← Back to Game",
  },
};

export default async function DeveloperLog({ params }: Props) {
  const { locale } = await params;
  const t = content[locale as Locale];

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-zinc-400 mb-6">
          <Link href={`/${locale}`} className="hover:text-white">
            {t.navHome}
          </Link>
          <span className="mx-2">/</span>
          <span>{t.navCurrent}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">{t.h1}</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">{t.whoTitle}</h2>
          <div className="bg-zinc-800 rounded-lg p-6">
            {t.whoText.map((p: string, i: number) => (
              <p key={i} className={`text-zinc-300 text-sm leading-relaxed ${i < t.whoText.length - 1 ? "mb-4" : ""}`}>
                {i === 0 ? (
                  <>
                    {p.split("GitHub")[0]}
                    <a href="https://github.com/ChaoticArray516" target="_blank" rel="noopener noreferrer" className="text-[#55E6C1] hover:underline">GitHub</a>
                    {p.split("GitHub")[1]}
                  </>
                ) : (
                  p
                )}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">{t.howTitle}</h2>
          <div className="space-y-6">
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#F8B500] mb-3">{t.techTitle}</h3>
              {t.techText.map((p: string, i: number) => (
                <p key={i} className={`text-zinc-300 text-sm leading-relaxed ${i === 0 ? "mb-3" : ""}`}>{p}</p>
              ))}
            </div>
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#F8B500] mb-3">{t.archTitle}</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-3">{t.archIntro}</p>
              <ul className="text-zinc-300 text-sm space-y-2 list-disc list-inside mb-3">
                {t.archItems.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-zinc-300 text-sm leading-relaxed">{t.archOutro}</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#F8B500] mb-3">{t.curveTitle}</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-3">{t.curveIntro}</p>
              <ul className="text-zinc-300 text-sm space-y-2 list-disc list-inside mb-3">
                {t.curveItems.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-zinc-300 text-sm leading-relaxed">{t.curveOutro}</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#F8B500] mb-3">{t.aiTitle}</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">{t.aiText}</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">{t.whyTitle}</h2>
          <div className="bg-zinc-800 rounded-lg p-6">
            {t.whyText.map((p: string, i: number) => (
              <p key={i} className={`text-zinc-300 text-sm leading-relaxed ${i < t.whyText.length - 1 ? "mb-4" : ""}`}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">{t.timelineTitle}</h2>
          <div className="space-y-4">
            {t.versions.map((v: any, i: number) => (
              <div key={i} className="flex gap-4">
                <div className={`text-sm font-mono whitespace-nowrap ${v.status === "Released" || v.status === "发布" ? "text-[#55E6C1]" : "text-zinc-500"}`}>
                  {v.date}
                </div>
                <div className={`rounded-lg p-4 flex-1 ${v.status === "Released" || v.status === "发布" ? "bg-zinc-800" : "bg-zinc-800/50 border border-zinc-700 border-dashed"}`}>
                  <h3 className={`font-semibold mb-1 ${v.status === "Released" || v.status === "发布" ? "text-white" : "text-zinc-300"}`}>{v.title}</h3>
                  <p className={`text-sm ${v.status === "Released" || v.status === "发布" ? "text-zinc-400" : "text-zinc-500"}`}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-10">
          <Link href={`/${locale}`} className="inline-block bg-[#55E6C1] text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-[#3dd1ac] transition">
            {t.backBtn}
          </Link>
        </div>
      </div>
    </div>
  );
}
