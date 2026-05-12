import GameClient from "./game/GameClient";
import Link from "next/link";
import { type Locale } from "@/i18n/config";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

const content: Record<
  Locale,
  {
    h1: string;
    tagline: string;
    gameplayTitle: string;
    features: { title: string; desc: string }[];
    coreMechanics: {
      title: string;
      intro: string;
      items: { name: string; desc: string }[];
    };
    survivalDays: {
      title: string;
      intro: string;
      phases: { days: string; title: string; strategy: string }[];
      readMore: string;
    };
    controlsTitle: string;
    pcControls: { key: string; action: string }[];
    mobileTitle: string;
    mobileControls: string[];
    whyBrowser: {
      title: string;
      intro: string;
      points: { heading: string; desc: string }[];
    };
    faqTitle: string;
    faq: { q: string; a: string }[];
    devLogTitle: string;
    devLogTeaser: string;
    devLogLink: string;
    relatedGuides: {
      title: string;
      intro: string;
      links: { label: string; href: string; desc: string }[];
    };
    footer: {
      copyright: string;
      privacy: string;
      guide: string;
    };
  }
> = {
  zh: {
    h1: "森林生存 — 免费在线浏览器生存游戏",
    tagline: "无需下载，打开即玩。轻量级 HTML5 Canvas 像素风森林，挑战10天极限生存！",
    gameplayTitle: "游戏玩法介绍",
    features: [
      {
        title: "10天生存挑战",
        desc: "你被遗弃在一片广袤的像素风森林中，必须依靠收集木材、苹果与水源、建造营火来活过10个越来越艰难的日夜。每一天的难度都会递增——树木与水池更稀缺、黑夜更长、环境更严酷。",
      },
      {
        title: "资源收集系统",
        desc: "砍伐树木获得木材、采集苹果树获得食物、靠近水池补充水源。木材可用于建造营火抵御夜间严寒。合理分配木材、苹果与水源是生存的关键。",
      },
      {
        title: "昼夜循环与难度递增",
        desc: "白天是收集资源的安全时间，黑夜温度骤降会快速消耗生命值，除非待在营火附近。第6天起最大饥饿和口渴上限降低，第10天将面临终极考验。",
      },
      {
        title: "生存指标管理",
        desc: "时刻关注 HP（生命值）、饥饿值和口渴值。吃苹果恢复饥饿，喝水恢复口渴。营火在约 90 像素范围内提供温暖，是黑夜生存的关键。整个游戏基于 HTML5 Canvas 构建，浏览器打开即玩，无需任何安装。",
      },
    ],
    coreMechanics: {
      title: "核心游戏机制",
      intro:
        "森林生存的核心循环围绕三项生存指标与四类资源展开。所有数值在 Canvas 内实时计算，你可以通过页面顶部的 HUD 状态条直接看到当前数值变化。理解这些机制是制定 10 天生存策略的基础。",
      items: [
        {
          name: "HP（生命值）",
          desc: "最大值 100，归零即游戏结束。HP 会在饥饿或口渴归零时持续损失，也会在黑夜远离营火时受寒冷伤害。",
        },
        {
          name: "饥饿（Hunger）",
          desc: "每秒自然下降，归零后开始扣 HP。吃苹果可恢复约 25 点饥饿值。第 6 天起上限从 100 降至 80，容错空间骤减。",
        },
        {
          name: "口渴（Thirst）",
          desc: "下降速度与饥饿相近，归零后扣 HP 比饥饿更致命。水池位置固定且第 6 天起减少，提前规划水源路线至关重要。",
        },
        {
          name: "木材（Wood）",
          desc: "砍树获得，主要用于建造营火（每个营火消耗 3 木材）。第 1-2 天建议储备至少 6 木材以度过前 2 个黑夜。",
        },
        {
          name: "苹果（Apple）",
          desc: "从苹果树采集，是恢复饥饿的唯一来源。苹果树数量少于普通树，需主动记忆位置。",
        },
        {
          name: "水（Water）",
          desc: "在水池边自动补充饮用水。水池位置固定，第 8 天后全图仅剩 2-3 个水池，路线规划是核心。",
        },
        {
          name: "营火（Campfire）",
          desc: "建造后在约 90 像素半径内提供温暖，抵消黑夜寒冷伤害。营火有持续时间，需要在熄灭前补充或建造新营火。",
        },
      ],
    },
    survivalDays: {
      title: "如何活过 10 天：阶段策略",
      intro:
        "森林生存的 10 天难度曲线设计为渐进式压力递增。下面是三个关键阶段的核心策略，详细每日攻略请参考玩法攻略页。",
      phases: [
        {
          days: "第 1-3 天",
          title: "适应期",
          strategy:
            "资源充足、白天最长。建议立即记忆水池和苹果树的大致位置，储备 2-3 个木材的安全库存。第 1 天结束前应至少建造 1 个营火。",
        },
        {
          days: "第 4-6 天",
          title: "转折点",
          strategy:
            "第 5 天黑夜占比升至 45%、寒冷伤害提升至 8/秒。第 6 天起饥饿和口渴上限降至 80。建议在黄昏前 10 秒就开始寻找安全位置建营火。",
        },
        {
          days: "第 7-10 天",
          title: "极限挑战",
          strategy:
            "树木仅剩 20 棵以下、水池仅剩 2-3 个、寒冷伤害高达 12-15/秒。营火是唯一生存手段，建议在水池附近建立营火基地。",
        },
      ],
      readMore: "→ 阅读完整 10 天通关攻略",
    },
    controlsTitle: "操作指南",
    pcControls: [
      { key: "W/A/S/D", action: "或方向键移动" },
      { key: "空格", action: "采集资源 / 砍伐树木 / 建造营火" },
      { key: "1", action: "吃苹果（恢复饥饿）" },
      { key: "2", action: "喝水（恢复口渴）" },
      { key: "3", action: "建造营火（消耗 3 木材）" },
    ],
    mobileTitle: "移动端触屏操作",
    mobileControls: [
      "屏幕左下角虚拟摇杆控制移动",
      "屏幕右下角采集按钮进行互动",
      "靠近资源时自动显示可采集提示",
      "支持全屏模式获得最佳体验",
    ],
    whyBrowser: {
      title: "为什么选择浏览器版生存游戏？",
      intro:
        "和《饥荒》《森林》《绿色地狱》等大型下载式生存游戏不同，森林生存专注于轻量化网页体验。下面是我们的核心差异化定位。",
      points: [
        {
          heading: "无需下载、无需注册",
          desc:
            "打开浏览器立即开始游戏，不需要 Steam 客户端、不需要邮箱注册、不需要等待加载安装包。整个游戏总体积约 5MB，浏览器缓存后秒开。",
        },
        {
          heading: "HTML5 Canvas 跨平台",
          desc:
            "基于原生 HTML5 Canvas 2D API 渲染，无需 WebGL、无需插件。Chrome、Firefox、Safari、Edge 全部支持，PC 与移动浏览器均可流畅运行 60fps。",
        },
        {
          heading: "轻量级与即时体验",
          desc:
            "整体使用 React 19 + TypeScript + Next.js 16 静态导出构建，首屏 LCP < 1 秒，TTI < 3 秒。不会占用磁盘空间、不会消耗系统资源、不会强制后台更新。",
        },
        {
          heading: "移动端完整适配",
          desc:
            "左下角虚拟摇杆 + 右下角采集按钮，专为移动浏览器设计。支持全屏模式与触屏自动检测。地铁、午休、课间都能玩 5 分钟。",
        },
        {
          heading: "完全免费、无广告、无内购",
          desc:
            "本项目为独立开发者作品，开源在 GitHub 上。没有任何付费门槛、没有广告插入、没有付费道具。所有功能开放给所有玩家。",
        },
      ],
    },
    faqTitle: "常见问题",
    faq: [
      {
        q: "游戏需要下载吗？",
        a: "完全不需要！这是一款基于 HTML5 的浏览器游戏，直接在浏览器中打开即可游玩，无需安装任何客户端或插件。整个游戏总体积约 5MB，加载速度非常快。",
      },
      {
        q: "支持哪些浏览器？",
        a: "支持所有现代浏览器，包括 Chrome、Firefox、Safari、Edge 等。推荐 Chrome 或 Edge 以获得最佳性能。移动浏览器同样支持。",
      },
      {
        q: "游戏进度会保存吗？",
        a: "当前版本暂不支持存档功能，每次刷新页面将重新开始游戏。本地最佳记录（Top 5）的存档功能已在开发计划中。",
      },
      {
        q: "可以在学校或公司网络环境玩吗？",
        a: "是的。游戏完全基于浏览器运行，不需要安装任何客户端，也不调用受限端口。只要能访问 forestsurvival.org 网站，就能正常游玩。",
      },
      {
        q: "在手机上玩流畅吗？",
        a: "完全流畅。游戏针对移动端做了完整优化：虚拟摇杆 + 采集按钮 + 触屏自动检测。iPhone SE 及以上、主流 Android 旗舰机均可保持 60fps 流畅运行。",
      },
      {
        q: "游戏总共要多久通关？",
        a: "一次完整 10 天通关约需 12-15 分钟（白天 + 黑夜节奏化推进）。新手通常前 2-3 局会在第 4-6 天失败，掌握资源管理后单局成功率会显著提升。",
      },
    ],
    devLogTitle: "开发者日志",
    devLogTeaser:
      "这款森林生存游戏由 ChaoticArray 独立开发，使用 React 19 + TypeScript + HTML5 Canvas 构建。开发初衷是打造一款无需下载、即开即玩的轻量级网页生存游戏。游戏采用像素风美术风格，核心机制围绕资源管理、昼夜循环和渐进式难度展开。",
    devLogLink: "阅读完整开发者日志 →",
    relatedGuides: {
      title: "相关攻略与资源",
      intro:
        "想深入了解机制、提升通关率？以下页面提供更详细的攻略与开发背景，建议在游戏前后阅读。",
      links: [
        {
          label: "完整玩法攻略",
          href: "/zh/how-to-play",
          desc: "10 天通关策略、3-2-1 资源优先级法则、新手常见错误清单。",
        },
        {
          label: "开发者日志",
          href: "/zh/developer-log",
          desc: "技术栈、架构设计、难度曲线设计理念、AI 辅助披露。",
        },
        {
          label: "GitHub 仓库",
          href: "https://github.com/ChaoticArray516/forest-survival-game",
          desc: "开源代码、Issue 反馈、贡献指南、版本更新。",
        },
        {
          label: "隐私政策",
          href: "/zh/privacy",
          desc: "本游戏的数据收集与使用说明（实际上几乎不收集任何数据）。",
        },
      ],
    },
    footer: {
      copyright: "© 2026 森林生存 (Forest Survival) — 由",
      privacy: "隐私政策",
      guide: "玩法攻略",
    },
  },
  en: {
    h1: "Forest Survival Game — Survive 10 Days in the Wild",
    tagline:
      "No download. No login. Play instantly in your browser. A lightweight HTML5 Canvas pixel-art survival challenge!",
    gameplayTitle: "How to Play",
    features: [
      {
        title: "10-Day Survival Challenge",
        desc: "Stranded in a vast pixel forest, you must gather resources and build campfires to survive 10 increasingly brutal days. Each day gets harder — wood, apple trees, and water pools become scarcer, nights grow longer, and the environment turns deadlier.",
      },
      {
        title: "Resource Gathering System",
        desc: "Chop trees for wood, harvest apple trees for food, and collect water from scattered water pools. Wood is essential for building campfires to survive freezing nights. Smart resource management — balancing wood, apples, and water — is the key to staying alive.",
      },
      {
        title: "Day/Night Cycle & Difficulty Scaling",
        desc: "Daytime is safe for gathering resources. But when night falls, temperatures drop rapidly and the cold drains your HP unless you stay near a campfire. From Day 6, max hunger and thirst caps decrease. Day 10 is the ultimate survival test.",
      },
      {
        title: "Survival Stats Management",
        desc: "Keep a close eye on your HP, hunger, and thirst stats. Eat apples to restore hunger, drink water to quench thirst. Campfires provide warmth within a ~90-pixel radius — absolutely critical during freezing nights. Built with HTML5 Canvas for instant browser play, no installation required.",
      },
    ],
    coreMechanics: {
      title: "Core Game Mechanics",
      intro:
        "Forest Survival's core loop revolves around three survival stats and four resource types. All values are calculated live inside the HTML5 Canvas and visible in the HUD bar at the top of the game. Understanding these mechanics is the foundation of any 10-day survival strategy.",
      items: [
        {
          name: "HP (Health Points)",
          desc: "Max 100. Game over when HP reaches zero. HP drains when hunger or thirst hit zero, and when you're far from a campfire at night (cold damage).",
        },
        {
          name: "Hunger",
          desc: "Decays passively each second. Once it hits zero, HP starts dropping. Eating an apple restores ~25 hunger. From Day 6, the max cap drops from 100 to 80 — drastically reducing your margin for error.",
        },
        {
          name: "Thirst",
          desc: "Decays at a similar rate to hunger. Zero thirst drains HP faster than zero hunger. Water pools are fixed in location and decrease in number from Day 6, so route planning is essential.",
        },
        {
          name: "Wood",
          desc: "Obtained by chopping trees. Primarily used to build campfires (each campfire costs 3 wood). Aim for at least 6 wood by end of Day 1 to survive your first 2 nights.",
        },
        {
          name: "Apple",
          desc: "Harvested from apple trees. The only source of hunger restoration. Apple trees are rarer than regular trees, so memorize their locations early.",
        },
        {
          name: "Water",
          desc: "Auto-refills when standing near a water pool. Pool locations are fixed. By Day 8, only 2-3 pools remain on the entire map — efficient routing becomes critical.",
        },
        {
          name: "Campfire",
          desc: "Once built, provides warmth within a ~90-pixel radius, canceling cold damage at night. Campfires have a limited duration — replace or build new ones before they burn out.",
        },
      ],
    },
    survivalDays: {
      title: "How to Survive 10 Days: Phase Strategy",
      intro:
        "Forest Survival's 10-day difficulty curve is designed as a progressive pressure escalation. Below is the core strategy for three key phases. For day-by-day detail, see the full survival guide.",
      phases: [
        {
          days: "Day 1-3",
          title: "Adaptation Phase",
          strategy:
            "Resources are abundant, daytime is longest. Immediately memorize the rough positions of water pools and apple trees. Aim for a safety stockpile of 2-3 wood. Build at least 1 campfire before the first night ends.",
        },
        {
          days: "Day 4-6",
          title: "Turning Point",
          strategy:
            "Day 5 night ratio rises to 45% with cold damage at 8/second. From Day 6, max hunger and thirst drop to 80. Start scouting safe campfire spots 10 seconds before dusk.",
        },
        {
          days: "Day 7-10",
          title: "Ultimate Challenge",
          strategy:
            "Fewer than 20 trees and only 2-3 water pools remain. Cold damage hits 12-15/second. Campfires become your only lifeline — build a base camp near remaining water pools.",
        },
      ],
      readMore: "→ Read the full 10-day survival guide",
    },
    controlsTitle: "Controls",
    pcControls: [
      { key: "W/A/S/D", action: "or Arrow Keys to move" },
      { key: "Space", action: "Gather / Chop trees / Build campfire" },
      { key: "1", action: "Eat apple (restore hunger)" },
      { key: "2", action: "Drink water (restore thirst)" },
      { key: "3", action: "Build campfire (costs 3 wood)" },
    ],
    mobileTitle: "Mobile Touch Controls",
    mobileControls: [
      "Virtual joystick at bottom-left to move",
      "Gather button at bottom-right to interact",
      "Auto hints appear when near resources",
      "Full-screen mode for best experience",
    ],
    whyBrowser: {
      title: "Why a Browser Survival Game?",
      intro:
        "Unlike heavy downloadable survival games like Don't Starve, The Forest, or Green Hell, Forest Survival focuses on a lightweight web experience. Here's our core differentiation.",
      points: [
        {
          heading: "No Download, No Login",
          desc:
            "Open your browser and start playing instantly — no Steam client, no email registration, no waiting for installers. Total game size is around 5MB, and it loads near-instantly after the first visit.",
        },
        {
          heading: "HTML5 Canvas — Truly Cross-Platform",
          desc:
            "Rendered using the native HTML5 Canvas 2D API — no WebGL, no plugins. Chrome, Firefox, Safari, Edge all supported. Runs smoothly at 60fps on both PC and mobile browsers.",
        },
        {
          heading: "Lightweight & Instant Play",
          desc:
            "Built with React 19 + TypeScript + Next.js 16 static export. First Contentful Paint under 1 second, Time to Interactive under 3 seconds. Zero disk space, zero system resource hogging, zero forced background updates.",
        },
        {
          heading: "Full Mobile Browser Support",
          desc:
            "Virtual joystick at bottom-left, gather button at bottom-right — designed for mobile browsers from the start. Supports full-screen mode and auto-detects touch input. Perfect for 5-minute breaks on the train, at lunch, or between classes.",
        },
        {
          heading: "Completely Free, No Ads, No IAP",
          desc:
            "This is an indie developer project, open-sourced on GitHub. No paywalls, no ad insertion, no in-app purchases. Every feature is available to every player from day one.",
        },
      ],
    },
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "Do I need to download anything?",
        a: "Not at all! This is an HTML5 browser game — open it in your browser and play instantly. No client or plugin installation required. Total game size is around 5MB, loading speed is very fast.",
      },
      {
        q: "Which browsers are supported?",
        a: "All modern browsers: Chrome, Firefox, Safari, Edge. Chrome or Edge recommended for best performance. Mobile browsers fully supported.",
      },
      {
        q: "Does the game save progress?",
        a: "The current version does not support save functionality — each page refresh starts a new game. Local best records (Top 5) save feature is on the development roadmap.",
      },
      {
        q: "Can I play this on a school or office network?",
        a: "Yes. The game runs entirely in your browser without installing any client and without using restricted ports. If you can access forestsurvival.org, you can play.",
      },
      {
        q: "Does it run smoothly on mobile?",
        a: "Yes. The game is fully optimized for mobile: virtual joystick + gather button + auto-detected touch input. iPhone SE and above, and all mainstream Android flagships maintain 60fps.",
      },
      {
        q: "How long does one playthrough take?",
        a: "A full 10-day run takes about 12-15 minutes (day + night cycle paced). New players often die between Day 4-6 on their first 2-3 attempts. Once you master resource management, single-run success rate climbs sharply.",
      },
    ],
    devLogTitle: "Developer Log",
    devLogTeaser:
      "Forest Survival was independently developed by ChaoticArray using React 19 + TypeScript + HTML5 Canvas. The goal was to create a lightweight browser survival game that requires no download and opens instantly. The game features pixel-art graphics with core mechanics built around resource management, day/night cycles, and progressive difficulty.",
    devLogLink: "Read full developer log →",
    relatedGuides: {
      title: "Related Guides & Resources",
      intro:
        "Want to dig deeper into mechanics or improve your win rate? The pages below provide detailed strategy and dev background — recommended reading before and after your first run.",
      links: [
        {
          label: "Complete Game Guide",
          href: "/en/how-to-play",
          desc: "Full 10-day clear strategy, 3-2-1 resource priority rule, beginner mistakes checklist.",
        },
        {
          label: "Developer Log",
          href: "/en/developer-log",
          desc: "Tech stack, architecture decisions, difficulty curve design rationale, AI assistance disclosure.",
        },
        {
          label: "GitHub Repository",
          href: "https://github.com/ChaoticArray516/forest-survival-game",
          desc: "Open-source code, issue tracker, contribution guide, version updates.",
        },
        {
          label: "Privacy Policy",
          href: "/en/privacy",
          desc: "How this game handles user data (spoiler: we collect almost nothing).",
        },
      ],
    },
    footer: {
      copyright: "© 2026 Forest Survival — Developed by",
      privacy: "Privacy Policy",
      guide: "How to Play",
    },
  },
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const t = content[locale as Locale];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.h1}</h1>
        <p className="text-zinc-400 text-lg">{t.tagline}</p>
      </section>

      {/* Game Canvas */}
      <section className="px-4 pb-8">
        <GameClient locale={locale} />
      </section>

      {/* Game Introduction (4 feature cards) */}
      <section className="px-4 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
          {t.gameplayTitle}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {t.features.map((f, i) => (
            <div key={i} className="bg-zinc-800 rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-2 text-[#F8B500]">
                {f.title}
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Game Mechanics (new H2 — SOP 2.1) */}
      <section className="px-4 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-3 text-[#55E6C1]">
          {t.coreMechanics.title}
        </h2>
        <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
          {t.coreMechanics.intro}
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {t.coreMechanics.items.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-800/60 rounded-lg p-4 border border-zinc-700/50"
            >
              <h3 className="text-base font-semibold mb-1 text-[#F8B500]">
                {item.name}
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Survive 10 Days (new H2 — SOP 2.1) */}
      <section className="px-4 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-3 text-[#55E6C1]">
          {t.survivalDays.title}
        </h2>
        <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
          {t.survivalDays.intro}
        </p>
        <div className="space-y-3">
          {t.survivalDays.phases.map((phase, i) => (
            <div
              key={i}
              className="bg-zinc-800 rounded-lg p-5 border-l-4 border-[#F8B500]"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-[#F8B500] font-bold text-sm">
                  {phase.days}
                </span>
                <h3 className="text-lg font-semibold text-zinc-100">
                  {phase.title}
                </h3>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {phase.strategy}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link
            href={`/${locale}/how-to-play`}
            className="inline-block text-[#55E6C1] hover:underline text-sm"
          >
            {t.survivalDays.readMore}
          </Link>
        </div>
      </section>

      {/* Controls Guide */}
      <section className="px-4 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
          {t.controlsTitle}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-800 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-3 text-[#48DBFB]">
              PC {locale === "zh" ? "键盘操作" : "Keyboard"}
            </h3>
            <ul className="text-zinc-300 text-sm space-y-2">
              {t.pcControls.map((c, i) => (
                <li key={i}>
                  <span className="bg-zinc-700 px-2 py-0.5 rounded text-xs mr-2">
                    {c.key}
                  </span>
                  {c.action}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-zinc-800 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-3 text-[#48DBFB]">
              {t.mobileTitle}
            </h3>
            <ul className="text-zinc-300 text-sm space-y-2">
              {t.mobileControls.map((c, i) => (
                <li key={i}>
                  <span className="text-[#55E6C1] mr-2">●</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why Play in Browser? (new H2 — SOP 2.1) */}
      <section className="px-4 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-3 text-[#55E6C1]">
          {t.whyBrowser.title}
        </h2>
        <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
          {t.whyBrowser.intro}
        </p>
        <div className="space-y-3">
          {t.whyBrowser.points.map((point, i) => (
            <div key={i} className="bg-zinc-800 rounded-lg p-4">
              <h3 className="text-base font-semibold mb-1 text-[#55E6C1]">
                {point.heading}
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">{t.faqTitle}</h2>
        <div className="space-y-4">
          {t.faq.map((item, i) => (
            <details key={i} className="bg-zinc-800 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer text-zinc-200">
                {item.q}
              </summary>
              <p className="mt-2 text-zinc-400 text-sm">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Developer Log Teaser */}
      <section className="px-4 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
          {t.devLogTitle}
        </h2>
        <div className="bg-zinc-800 rounded-lg p-5">
          <p className="text-zinc-300 text-sm leading-relaxed mb-4">
            {t.devLogTeaser}
          </p>
          <Link
            href={`/${locale}/developer-log`}
            className="inline-block text-[#55E6C1] hover:underline text-sm"
          >
            {t.devLogLink}
          </Link>
        </div>
      </section>

      {/* Related Guides (new H2 — SOP 2.1) */}
      <section className="px-4 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-3 text-[#55E6C1]">
          {t.relatedGuides.title}
        </h2>
        <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
          {t.relatedGuides.intro}
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {t.relatedGuides.links.map((link, i) => {
            const isExternal = link.href.startsWith("http");
            const linkProps = isExternal
              ? {
                  href: link.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : { href: link.href };
            const Tag = isExternal ? "a" : Link;
            return (
              <Tag
                key={i}
                {...linkProps}
                className="block bg-zinc-800 hover:bg-zinc-700 rounded-lg p-4 transition-colors"
              >
                <h3 className="text-base font-semibold mb-1 text-[#55E6C1]">
                  {link.label} →
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {link.desc}
                </p>
              </Tag>
            );
          })}
        </div>
      </section>

      {/* Language Switcher */}
      <section className="px-4 py-4 max-w-4xl mx-auto w-full text-center">
        <div className="inline-flex gap-2 bg-zinc-800 rounded-lg p-1">
          <Link
            href="/zh"
            className={`px-3 py-1 rounded text-sm ${
              locale === "zh"
                ? "bg-zinc-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            中文
          </Link>
          <Link
            href="/en"
            className={`px-3 py-1 rounded text-sm ${
              locale === "en"
                ? "bg-zinc-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            English
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-zinc-950 py-6 px-4 text-center text-zinc-500 text-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            {t.footer.copyright}{" "}
            <a
              href="https://github.com/ChaoticArray516"
              target="_blank"
              rel="author noopener noreferrer"
              className="text-zinc-400 hover:text-white"
            >
              ChaoticArray
            </a>
          </div>
          <div className="flex gap-4">
            <Link
              href={`/${locale}/privacy`}
              className="text-zinc-400 hover:text-white"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href={`/${locale}/how-to-play`}
              className="text-zinc-400 hover:text-white"
            >
              {t.footer.guide}
            </Link>
            <a
              href="https://github.com/ChaoticArray516/forest-survival-game"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
