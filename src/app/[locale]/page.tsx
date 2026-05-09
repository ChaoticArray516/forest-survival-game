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
    controlsTitle: string;
    pcControls: { key: string; action: string }[];
    mobileTitle: string;
    mobileControls: string[];
    faqTitle: string;
    faq: { q: string; a: string }[];
    devLogTitle: string;
    devLogTeaser: string;
    devLogLink: string;
    footer: {
      copyright: string;
      privacy: string;
      guide: string;
    };
  }
> = {
  zh: {
    h1: "森林生存 — 免费在线浏览器生存游戏",
    tagline: "无需下载，打开即玩。在像素风森林中挑战10天极限生存！",
    gameplayTitle: "游戏玩法介绍",
    features: [
      {
        title: "10天生存挑战",
        desc: "你被遗弃在一片广袤的森林中，必须依靠收集资源、建造营火来活过10个越来越艰难的日夜。每一天的难度都会递增——资源更稀缺、黑夜更长、环境更严酷。",
      },
      {
        title: "资源收集系统",
        desc: "砍伐树木获得木材，采集苹果树获得食物，靠近水池获取水源。木材可用于建造营火抵御夜间严寒。合理分配资源是生存的关键。",
      },
      {
        title: "昼夜循环与难度递增",
        desc: "白天是收集资源的安全时间，黑夜温度骤降会快速消耗生命值。第6天起最大饥饿和口渴上限降低，第10天将面临终极考验。",
      },
      {
        title: "生存指标管理",
        desc: "时刻关注 HP（生命值）、饥饿值和口渴值。吃苹果恢复饥饿，喝水恢复口渴。营火提供温暖，在黑夜中至关重要。",
      },
    ],
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
    faqTitle: "常见问题",
    faq: [
      {
        q: "游戏需要下载吗？",
        a: "完全不需要！这是一款基于 HTML5 的浏览器游戏，直接在浏览器中打开即可游玩，无需安装任何客户端或插件。",
      },
      {
        q: "支持哪些浏览器？",
        a: "支持所有现代浏览器，包括 Chrome、Firefox、Safari、Edge 等。推荐 Chrome 或 Edge 以获得最佳性能。",
      },
      {
        q: "游戏进度会保存吗？",
        a: "当前版本暂不支持存档功能，每次刷新页面将重新开始游戏。存档功能已在开发计划中。",
      },
    ],
    devLogTitle: "开发者日志",
    devLogTeaser:
      "这款森林生存游戏由 ChaoticArray 独立开发，使用 React 19 + TypeScript + HTML5 Canvas 构建。开发初衷是打造一款无需下载、即开即玩的轻量级网页生存游戏。游戏采用像素风美术风格，核心机制围绕资源管理、昼夜循环和渐进式难度展开。",
    devLogLink: "阅读完整开发者日志 →",
    footer: {
      copyright: "© 2026 森林生存 (Forest Survival) — 由",
      privacy: "隐私政策",
      guide: "玩法攻略",
    },
  },
  en: {
    h1: "Forest Survival Game — Survive 10 Days in the Wild",
    tagline:
      "No download. No login. Play instantly in your browser. A pixel-art survival challenge!",
    gameplayTitle: "How to Play",
    features: [
      {
        title: "10-Day Survival Challenge",
        desc: "Stranded in a vast forest, you must gather resources and build campfires to survive 10 increasingly brutal days. Each day gets harder — resources become scarcer, nights grow longer, and the environment turns deadlier.",
      },
      {
        title: "Resource Gathering System",
        desc: "Chop trees for wood, harvest apple trees for food, and collect water from pools. Wood is essential for building campfires to survive the freezing nights. Smart resource management is the key to staying alive.",
      },
      {
        title: "Day/Night Cycle & Difficulty Scaling",
        desc: "Daytime is safe for gathering resources. But when night falls, temperatures drop rapidly and drain your HP. From Day 6, max hunger and thirst caps decrease. Day 10 is the ultimate test of survival.",
      },
      {
        title: "Survival Stats Management",
        desc: "Keep a close eye on your HP, hunger, and thirst. Eat apples to restore hunger, drink water to quench thirst. Campfires provide warmth — absolutely critical during freezing nights.",
      },
    ],
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
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "Do I need to download anything?",
        a: "Not at all! This is an HTML5 browser game — open it in your browser and play instantly. No client or plugin installation required.",
      },
      {
        q: "Which browsers are supported?",
        a: "All modern browsers: Chrome, Firefox, Safari, Edge. Chrome or Edge recommended for best performance.",
      },
      {
        q: "Does the game save progress?",
        a: "The current version does not support save functionality. Each page refresh starts a new game. Save feature is on the development roadmap.",
      },
    ],
    devLogTitle: "Developer Log",
    devLogTeaser:
      "Forest Survival was independently developed by ChaoticArray using React 19 + TypeScript + HTML5 Canvas. The goal was to create a lightweight browser survival game that requires no download and opens instantly. The game features pixel-art graphics with core mechanics built around resource management, day/night cycles, and progressive difficulty.",
    devLogLink: "Read full developer log →",
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

      {/* Game Introduction */}
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
