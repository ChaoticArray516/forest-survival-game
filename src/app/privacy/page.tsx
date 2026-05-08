import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "隐私政策 | 森林生存游戏",
  description: "森林生存游戏的隐私政策。了解我们如何收集、使用和保护您的数据。",
  alternates: {
    canonical: "https://forest-survival-game.vercel.app/privacy",
  },
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white">
            首页
          </Link>
          <span className="mx-2">/</span>
          <span>隐私政策</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">隐私政策</h1>

        <div className="bg-zinc-800 rounded-lg p-6 space-y-6 text-zinc-300 text-sm leading-relaxed">
          <p>
            最后更新日期：2026年5月7日
          </p>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">1. 我们收集的信息</h2>
            <p>
              森林生存是一款纯客户端浏览器游戏。我们不收集任何个人身份信息。
              游戏在您的浏览器本地运行，所有游戏数据均存储在您的设备上。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">2. 本地存储</h2>
            <p>
              当前版本的游戏不使用 LocalStorage、Cookie 或任何其他本地存储机制。
              刷新页面后游戏进度将重置。未来版本可能添加存档功能，届时将仅使用
              LocalStorage 存储游戏进度，不会上传至任何服务器。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">3. 第三方服务</h2>
            <p>
              本网站托管在 Vercel 平台上。Vercel 可能会收集匿名化的访问日志（如 IP 地址、
              访问时间、浏览器类型等）用于服务运维和安全防护。这些日志不包含任何游戏数据
              或个人信息。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">4. 数据安全</h2>
            <p>
              由于我们不收集或存储任何用户数据，因此不存在数据泄露风险。
              所有游戏逻辑均在您的浏览器中本地执行。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">5. 联系我们</h2>
            <p>
              如果您对隐私政策有任何疑问，请通过{" "}
              <a
                href="https://github.com/ChaoticArray516/forest-survival-game/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#55E6C1] hover:underline"
              >
                GitHub Issues
              </a>{" "}
              联系我们。
            </p>
          </section>
        </div>

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
