import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { locales, type Locale } from "@/i18n/config";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const metadataByLocale: Record<Locale, Metadata> = {
  zh: {
    title: "森林生存：免费在线浏览器生存游戏 | Forest Survival",
    description:
      "在广袤森林中挑战10天极限生存！免费HTML5网页游戏，无需下载。收集资源、建造营火、抵御黑夜严寒。支持PC键盘与手机触屏操作。",
    keywords: [
      "森林生存游戏",
      "网页生存游戏",
      "浏览器生存游戏",
      "HTML5生存游戏",
      "在线生存游戏",
      "免费生存游戏",
      "像素风游戏",
    ],
    authors: [{ name: "ChaoticArray", url: "https://github.com/ChaoticArray516" }],
    creator: "ChaoticArray",
    publisher: "ChaoticArray",
    robots: "index, follow",
    openGraph: {
      title: "森林生存：免费在线浏览器生存游戏",
      description: "在广袤森林中挑战10天极限生存！免费HTML5网页游戏，无需下载。",
      url: "https://forestsurvival.org/zh",
      siteName: "森林生存",
      locale: "zh_CN",
      type: "website",
      images: [
        {
          url: "https://forestsurvival.org/og-image.png",
          width: 1200,
          height: 630,
          alt: "森林生存游戏截图 - 像素风森林生存挑战",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "森林生存：免费在线浏览器生存游戏",
      description: "在广袤森林中挑战10天极限生存！免费HTML5网页游戏。",
      images: ["https://forestsurvival.org/og-image.png"],
      creator: "@ChaoticArray516",
    },
  },
  en: {
    title: "Forest Survival Game - Play Free Online, No Download",
    description:
      "Survive 10 days in a dangerous forest! Collect wood, build campfires, manage hunger & thirst. Free browser survival game — no download, no login. Play now!",
    keywords: [
      "forest survival game",
      "browser survival game",
      "online survival game",
      "HTML5 survival game",
      "free survival game",
      "pixel survival game",
      "no download survival game",
      "play survival game online",
    ],
    authors: [{ name: "ChaoticArray", url: "https://github.com/ChaoticArray516" }],
    creator: "ChaoticArray",
    publisher: "ChaoticArray",
    robots: "index, follow",
    openGraph: {
      title: "Forest Survival Game - Play Free Online, No Download",
      description:
        "Survive 10 days in a dangerous forest! Collect wood, build campfires, manage hunger & thirst. Free browser game — no download.",
      url: "https://forestsurvival.org/en",
      siteName: "Forest Survival",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://forestsurvival.org/og-image.png",
          width: 1200,
          height: 630,
          alt: "Forest Survival Game Screenshot - Pixel Art Forest Challenge",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Forest Survival Game - Play Free Online, No Download",
      description: "Survive 10 days in a dangerous forest! Free browser survival game.",
      images: ["https://forestsurvival.org/og-image.png"],
      creator: "@ChaoticArray516",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const locale = resolved.locale as Locale;
  const baseMeta = metadataByLocale[locale];

  return {
    ...baseMeta,
    alternates: {
      canonical: `https://forestsurvival.org/${locale}`,
      languages: {
        "zh-CN": "https://forestsurvival.org/zh",
        "en-US": "https://forestsurvival.org/en",
        "x-default": "https://forestsurvival.org/en",
      },
    },
  };
}

function getStructuredData(locale: Locale) {
  const isZh = locale === "zh";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: isZh ? "森林生存" : "Forest Survival",
        url: `https://forestsurvival.org/${locale}`,
        inLanguage: isZh ? "zh-CN" : "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: `https://forestsurvival.org/${locale}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "VideoGame",
        name: isZh ? "森林生存" : "Forest Survival Game",
        description: isZh
          ? "一款基于网页的2D像素风生存冒险游戏，玩家需要在森林中收集资源、建造营火、生存10天。"
          : "A free browser-based survival game. Collect wood, build campfires, manage hunger and thirst to survive 10 days in the forest. No download required.",
        url: `https://forestsurvival.org/${locale}`,
        genre: ["Survival", "Adventure", "Pixel Art"],
        gamePlatform: ["Web Browser", "PC", "Mobile Browser"],
        applicationCategory: "Game",
        operatingSystem: "Any",
        inLanguage: isZh ? "zh-CN" : "en-US",
        datePublished: "2026-05-09",
        image: `https://forestsurvival.org/og-image.png`,
        author: {
          "@type": "Person",
          name: "ChaoticArray",
          url: "https://github.com/ChaoticArray516",
          sameAs: [
            "https://github.com/ChaoticArray516",
            "https://github.com/ChaoticArray516/forest-survival-game",
          ],
        },
        publisher: {
          "@type": "Person",
          name: "ChaoticArray",
          url: "https://github.com/ChaoticArray516",
          sameAs: [
            "https://github.com/ChaoticArray516",
            "https://github.com/ChaoticArray516/forest-survival-game",
          ],
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: isZh ? "CNY" : "USD",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolved2 = await params;
  const locale2 = resolved2.locale as Locale;
  const structuredData = getStructuredData(locale2);

  return (
    <html
      lang={locale2 === "zh" ? "zh-CN" : "en"}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-900 text-white">
        {children}
      </body>
    </html>
  );
}
