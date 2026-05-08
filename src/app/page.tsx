import GameClient from "./game/GameClient";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          森林生存 — 免费在线浏览器生存游戏
        </h1>
        <p className="text-zinc-400 text-lg">
          无需下载，打开即玩。在像素风森林中挑战10天极限生存！
        </p>
      </section>

      {/* Game Canvas */}
      <section className="px-4 pb-8">
        <GameClient />
      </section>

      {/* Game Introduction */}
      <section className="px-4 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
          游戏玩法介绍
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-800 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2 text-[#F8B500]">
              10天生存挑战
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              你被遗弃在一片广袤的森林中，必须依靠收集资源、建造营火来活过
              10 个越来越艰难的日夜。每一天的难度都会递增——资源更稀缺、黑夜更长、环境更严酷。
            </p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2 text-[#F8B500]">
              资源收集系统
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              砍伐树木获得木材，采集苹果树获得食物，靠近水池获取水源。
              木材可用于建造营火抵御夜间严寒。合理分配资源是生存的关键。
            </p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2 text-[#F8B500]">
              昼夜循环与难度递增
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              白天是收集资源的安全时间，黑夜温度骤降会快速消耗生命值。
              第6天起最大饥饿和口渴上限降低，第10天将面临终极考验。
            </p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-2 text-[#F8B500]">
              生存指标管理
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              时刻关注 HP（生命值）、饥饿值和口渴值。吃苹果恢复饥饿，
              喝水恢复口渴。营火提供温暖，在黑夜中至关重要。
            </p>
          </div>
        </div>
      </section>

      {/* Controls Guide */}
      <section className="px-4 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
          操作指南
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-800 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-3 text-[#48DBFB]">
              PC 键盘操作
            </h3>
            <ul className="text-zinc-300 text-sm space-y-2">
              <li>
                <span className="bg-zinc-700 px-2 py-0.5 rounded text-xs mr-2">
                  W/A/S/D
                </span>
                或方向键移动
              </li>
              <li>
                <span className="bg-zinc-700 px-2 py-0.5 rounded text-xs mr-2">
                  空格
                </span>
                采集资源 / 砍伐树木 / 建造营火
              </li>
              <li>
                <span className="bg-zinc-700 px-2 py-0.5 rounded text-xs mr-2">
                  1
                </span>
                吃苹果（恢复饥饿）
              </li>
              <li>
                <span className="bg-zinc-700 px-2 py-0.5 rounded text-xs mr-2">
                  2
                </span>
                喝水（恢复口渴）
              </li>
              <li>
                <span className="bg-zinc-700 px-2 py-0.5 rounded text-xs mr-2">
                  3
                </span>
                建造营火（消耗 3 木材）
              </li>
            </ul>
          </div>
          <div className="bg-zinc-800 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-3 text-[#48DBFB]">
              移动端触屏操作
            </h3>
            <ul className="text-zinc-300 text-sm space-y-2">
              <li>
                <span className="text-[#55E6C1] mr-2">●</span>
                屏幕左下角虚拟摇杆控制移动
              </li>
              <li>
                <span className="text-[#55E6C1] mr-2">●</span>
                屏幕右下角采集按钮进行互动
              </li>
              <li>
                <span className="text-[#55E6C1] mr-2">●</span>
                靠近资源时自动显示可采集提示
              </li>
              <li>
                <span className="text-[#55E6C1] mr-2">●</span>
                支持全屏模式获得最佳体验
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">常见问题</h2>
        <div className="space-y-4">
          <details className="bg-zinc-800 rounded-lg p-4">
            <summary className="font-semibold cursor-pointer text-zinc-200">
              游戏需要下载吗？
            </summary>
            <p className="mt-2 text-zinc-400 text-sm">
              完全不需要！这是一款基于 HTML5 的浏览器游戏，直接在浏览器中打开即可游玩，
              无需安装任何客户端或插件。
            </p>
          </details>
          <details className="bg-zinc-800 rounded-lg p-4">
            <summary className="font-semibold cursor-pointer text-zinc-200">
              支持哪些浏览器？
            </summary>
            <p className="mt-2 text-zinc-400 text-sm">
              支持所有现代浏览器，包括 Chrome、Firefox、Safari、Edge 等。
              推荐 Chrome 或 Edge 以获得最佳性能。
            </p>
          </details>
          <details className="bg-zinc-800 rounded-lg p-4">
            <summary className="font-semibold cursor-pointer text-zinc-200">
              游戏进度会保存吗？
            </summary>
            <p className="mt-2 text-zinc-400 text-sm">
              当前版本暂不支持存档功能，每次刷新页面将重新开始游戏。存档功能已在开发计划中。
            </p>
          </details>
        </div>
      </section>

      {/* Developer Log Teaser */}
      <section className="px-4 py-8 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
          开发者日志
        </h2>
        <div className="bg-zinc-800 rounded-lg p-5">
          <p className="text-zinc-300 text-sm leading-relaxed mb-4">
            这款森林生存游戏由 ChaoticArray 独立开发，使用 React 19 + TypeScript + HTML5
            Canvas 构建。开发初衷是打造一款无需下载、即开即玩的轻量级网页生存游戏。
            游戏采用像素风美术风格，核心机制围绕资源管理、昼夜循环和渐进式难度展开。
          </p>
          <Link
            href="/developer-log"
            className="inline-block text-[#55E6C1] hover:underline text-sm"
          >
            阅读完整开发者日志 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-zinc-950 py-6 px-4 text-center text-zinc-500 text-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            © 2026 森林生存 (Forest Survival) — 由{" "}
            <a
              href="https://github.com/ChaoticArray516"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white"
            >
              ChaoticArray
            </a>{" "}
            开发
          </div>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-zinc-400 hover:text-white"
            >
              隐私政策
            </Link>
            <Link
              href="/how-to-play"
              className="text-zinc-400 hover:text-white"
            >
              玩法攻略
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
