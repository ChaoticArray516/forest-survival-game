import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "开发者日志 | 森林生存游戏开发背后的故事",
  description:
    "了解森林生存游戏的开发历程：从创意到上线的完整故事。技术选型、架构设计、10天难度曲线的设计理念，以及独立开发者的第一手经验。",
  alternates: {
    canonical: "https://forest-survival-game.vercel.app/developer-log",
  },
};

export default function DeveloperLog() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white">
            首页
          </Link>
          <span className="mx-2">/</span>
          <span>开发者日志</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          开发者日志
        </h1>

        {/* Who */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
            我是谁
          </h2>
          <div className="bg-zinc-800 rounded-lg p-6">
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              你好，我是 <strong className="text-white">ChaoticArray</strong>，
              一名热爱游戏开发的独立开发者。
              你可以在{" "}
              <a
                href="https://github.com/ChaoticArray516"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#55E6C1] hover:underline"
              >
                GitHub
              </a>{" "}
              上找到我的其他项目。
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              我的技术背景主要是前端开发（React、TypeScript），但一直对游戏开发充满热情。
              森林生存是我将前端技术与游戏设计结合的第一次完整尝试，从概念到可玩版本历时约 2 周。
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              选择独立开发这款游戏的原因很简单：我想在浏览器中玩到一款真正"即开即玩"的生存游戏，
              不需要下载、不需要注册、不需要等待加载。如果市面上没有，那就自己做一个。
            </p>
          </div>
        </section>

        {/* How */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
            如何构建
          </h2>

          <div className="space-y-6">
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#F8B500] mb-3">
                技术选型
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-3">
                前端框架选择了 <strong>React 19</strong> 配合 <strong>TypeScript</strong>，
                游戏渲染使用原生 <strong>HTML5 Canvas 2D API</strong>，构建工具使用 <strong>Vite</strong>。
                整个项目采用单文件组件设计，游戏核心逻辑集中在 engine.ts、renderer.ts 和 GameCanvas.tsx 三个文件中。
              </p>
              <p className="text-zinc-300 text-sm leading-relaxed">
                选择 Canvas 而非 WebGL 的原因是：这是一款 2D 像素风游戏，Canvas 2D 完全够用，
                且不需要引入 Three.js 等重型库。游戏地图尺寸为 2400×2400 像素，同时渲染的实体不超过 50 个，
                Canvas 2D 在主流设备上可以轻松保持 60fps。
              </p>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#F8B500] mb-3">
                游戏架构设计
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-3">
                游戏采用经典的"游戏循环 + 状态机"架构：
              </p>
              <ul className="text-zinc-300 text-sm space-y-2 list-disc list-inside mb-3">
                <li>
                  <strong>engine.ts</strong> — 游戏逻辑引擎，负责状态更新、碰撞检测、
                  昼夜循环、资源生成与消耗计算
                </li>
                <li>
                  <strong>renderer.ts</strong> — Canvas 渲染器，负责画面绘制、
                  粒子效果、浮动文字、UI 状态条
                </li>
                <li>
                  <strong>config.ts</strong> — 10天难度配置表，每天独立配置饥饿/口渴消耗速度、
                  树木刷新时间、黑夜占比等参数
                </li>
                <li>
                  <strong>types.ts</strong> — TypeScript 类型定义，确保全链路类型安全
                </li>
              </ul>
              <p className="text-zinc-300 text-sm leading-relaxed">
                输入系统同时支持键盘事件（PC）和触摸事件（移动端虚拟摇杆），
                通过统一的 InputState 接口抽象，游戏逻辑层无需关心输入来源。
              </p>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#F8B500] mb-3">
                10天难度曲线设计
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-3">
                难度曲线是整个游戏设计的核心。我采用"渐进式压力递增"模型，
                从多个维度同时提升难度，而非单一维度（如只增加敌人血量）：
              </p>
              <ul className="text-zinc-300 text-sm space-y-2 list-disc list-inside mb-3">
                <li>
                  <strong>资源消耗加速</strong>：饥饿/口渴消耗从 0.4/s 递增至 1.8/s
                </li>
                <li>
                  <strong>资源供给减少</strong>：初始树木从 40 棵减至 15 棵，水池从 8 个减至 2 个
                </li>
                <li>
                  <strong>环境威胁加剧</strong>：夜间寒冷伤害从 2/s 递增至 15/s
                </li>
                <li>
                  <strong>时间压力增加</strong>：黑夜占比从 30% 递增至 55%
                </li>
                <li>
                  <strong>上限压缩</strong>：第6天起最大饥饿/口渴从 100 降至 80，降低容错空间
                </li>
              </ul>
              <p className="text-zinc-300 text-sm leading-relaxed">
                这套设计经过 20 多次内部测试调整，目标是让新手能活过第 3-4 天，
                有经验的玩家在第 8-9 天感受到真正的生存压力，只有精通资源管理的玩家才能通关。
              </p>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#F8B500] mb-3">
                AI 辅助披露
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                本项目的游戏代码（engine.ts、renderer.ts 等）由开发者手动编写，
                AI 工具仅用于生成部分 UI 组件代码和开发文档。游戏设计决策（难度曲线、数值平衡、
                美术风格）完全由人工制定并经过多次测试验证。
              </p>
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
            为什么做这款游戏
          </h2>
          <div className="bg-zinc-800 rounded-lg p-6">
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              市面上优秀的生存游戏很多——《饥荒》、《森林》、《绿色地狱》等，
              但它们都需要下载安装、占用大量存储空间、学习成本高。
              我想填补"轻量级网页生存游戏"这个细分市场的空白。
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              目标用户很明确：想在浏览器中快速体验生存游戏乐趣的玩家。
              他们可能在工作间隙想玩一局，或者在手机上不想下载 App。
              核心价值主张是三个关键词：无需下载、即开即玩、渐进式难度。
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              长远来看，我希望将这款游戏发展为一个小型游戏系列的基础，
              后续可能加入多人联机、自定义地图、MOD 支持等功能。
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
            更新日志
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="text-sm text-[#55E6C1] font-mono whitespace-nowrap">
                2026-05-07
              </div>
              <div className="bg-zinc-800 rounded-lg p-4 flex-1">
                <h3 className="font-semibold text-white mb-1">v1.0 初始版本</h3>
                <p className="text-zinc-400 text-sm">
                  核心生存系统、10天渐进难度、资源收集与建造、昼夜循环、PC键盘+移动端触屏双平台支持
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-zinc-500 font-mono whitespace-nowrap">
                计划中
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4 flex-1 border border-zinc-700 border-dashed">
                <h3 className="font-semibold text-zinc-300 mb-1">v1.1 音效与沉浸感</h3>
                <p className="text-zinc-500 text-sm">
                  环境音效（鸟鸣、风声、篝火声）、背景音乐、采集音效反馈
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-zinc-500 font-mono whitespace-nowrap">
                计划中
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4 flex-1 border border-zinc-700 border-dashed">
                <h3 className="font-semibold text-zinc-300 mb-1">v1.2 存档与进度</h3>
                <p className="text-zinc-500 text-sm">
                  LocalStorage 存档、通关记录、最佳生存天数排行榜
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-zinc-500 font-mono whitespace-nowrap">
                计划中
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4 flex-1 border border-zinc-700 border-dashed">
                <h3 className="font-semibold text-zinc-300 mb-1">v2.0 生物与战斗</h3>
                <p className="text-zinc-500 text-sm">
                  野生动物（狼、熊）、战斗系统、武器制作、陷阱系统
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-block bg-[#55E6C1] text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-[#3dd1ac] transition"
          >
            ← 返回游戏
          </Link>
        </div>
      </div>
    </div>
  );
}
