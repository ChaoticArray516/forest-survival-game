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
    title: isZh ? "隐私政策 | 森林生存游戏" : "Privacy Policy | Forest Survival Game",
    description: isZh
      ? "森林生存游戏的隐私政策。了解我们如何收集、使用和保护您的数据。"
      : "Forest Survival Game privacy policy. Learn how we collect, use, and protect your data.",
    alternates: {
      canonical: `https://forestsurvival.org/${locale}/privacy`,
      languages: {
        "zh-CN": "https://forestsurvival.org/zh/privacy",
        "en-US": "https://forestsurvival.org/en/privacy",
        "x-default": "https://forestsurvival.org/en/privacy",
      },
    },
  };
}

const content: Record<Locale, any> = {
  zh: {
    navHome: "首页",
    navCurrent: "隐私政策",
    h1: "隐私政策",
    updated: "最后更新日期：2026年5月7日",
    sections: [
      {
        title: "1. 我们收集的信息",
        text: "森林生存是一款纯客户端浏览器游戏。我们不收集任何个人身份信息。游戏在您的浏览器本地运行，所有游戏数据均存储在您的设备上。",
      },
      {
        title: "2. 本地存储",
        text: "当前版本的游戏不使用 LocalStorage、Cookie 或任何其他本地存储机制。刷新页面后游戏进度将重置。未来版本可能添加存档功能，届时将仅使用 LocalStorage 存储游戏进度，不会上传至任何服务器。",
      },
      {
        title: "3. 第三方服务",
        text: "本网站托管在 Vercel 平台上。Vercel 可能会收集匿名化的访问日志（如 IP 地址、访问时间、浏览器类型等）用于服务运维和安全防护。这些日志不包含任何游戏数据或个人信息。",
      },
      {
        title: "4. 数据安全",
        text: "由于我们不收集或存储任何用户数据，因此不存在数据泄露风险。所有游戏逻辑均在您的浏览器中本地执行。",
      },
      {
        title: "5. 联系我们",
        text: "如果您对隐私政策有任何疑问，请通过 GitHub Issues 联系我们。",
      },
    ],
    backBtn: "← 返回游戏",
  },
  en: {
    navHome: "Home",
    navCurrent: "Privacy Policy",
    h1: "Privacy Policy",
    updated: "Last Updated: May 7, 2026",
    sections: [
      {
        title: "1. Information We Collect",
        text: "Forest Survival is a pure client-side browser game. We do not collect any personally identifiable information. The game runs entirely in your browser, and all game data is stored locally on your device.",
      },
      {
        title: "2. Local Storage",
        text: "The current version of the game does not use LocalStorage, cookies, or any other local storage mechanisms. Game progress resets when you refresh the page. Future versions may add a save feature, which would only use LocalStorage to store game progress locally — nothing is uploaded to any server.",
      },
      {
        title: "3. Third-Party Services",
        text: "This website is hosted on the Vercel platform. Vercel may collect anonymized access logs (such as IP address, access time, browser type) for service operations and security. These logs do not contain any game data or personal information.",
      },
      {
        title: "4. Data Security",
        text: "Since we do not collect or store any user data, there is no risk of data breach. All game logic is executed locally in your browser.",
      },
      {
        title: "5. Contact Us",
        text: "If you have any questions about this privacy policy, please contact us via GitHub Issues.",
      },
    ],
    backBtn: "← Back to Game",
  },
};

export default async function Privacy({ params }: Props) {
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

        <div className="bg-zinc-800 rounded-lg p-6 space-y-6 text-zinc-300 text-sm leading-relaxed">
          <p>{t.updated}</p>

          {t.sections.map((s: any, i: number) => (
            <section key={i}>
              <h2 className="text-lg font-semibold text-white mb-2">{s.title}</h2>
              <p>
                {i === 4 ? (
                  <>
                    {s.text.split("GitHub Issues")[0]}
                    <a
                      href="https://github.com/ChaoticArray516/forest-survival-game/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#55E6C1] hover:underline"
                    >
                      GitHub Issues
                    </a>
                    {s.text.split("GitHub Issues")[1]}
                  </>
                ) : (
                  s.text
                )}
              </p>
            </section>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={`/${locale}`}
            className="inline-block bg-[#55E6C1] text-zinc-900 font-bold px-6 py-3 rounded-lg hover:bg-[#3dd1ac] transition"
          >
            {t.backBtn}
          </Link>
        </div>
      </div>
    </div>
  );
}
