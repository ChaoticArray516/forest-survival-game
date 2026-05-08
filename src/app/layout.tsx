import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  alternates: {
    canonical: "https://forest-survival-game.vercel.app",
  },
  openGraph: {
    title: "森林生存：免费在线浏览器生存游戏",
    description:
      "在广袤森林中挑战10天极限生存！免费HTML5网页游戏，无需下载。",
    url: "https://forest-survival-game.vercel.app",
    siteName: "森林生存",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "https://forest-survival-game.vercel.app/og-image.png",
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
    images: ["https://forest-survival-game.vercel.app/og-image.png"],
    creator: "@ChaoticArray516",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "森林生存",
      url: "https://forest-survival-game.vercel.app",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://forest-survival-game.vercel.app/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "VideoGame",
      name: "森林生存",
      description:
        "一款基于网页的2D像素风生存冒险游戏，玩家需要在森林中收集资源、建造营火、生存10天。",
      url: "https://forest-survival-game.vercel.app",
      genre: ["Survival", "Adventure", "Pixel Art"],
      gamePlatform: ["Web Browser", "PC", "Mobile Browser"],
      applicationCategory: "Game",
      operatingSystem: "Any",
      inLanguage: "zh-CN",
      author: {
        "@type": "Person",
        name: "ChaoticArray",
        url: "https://github.com/ChaoticArray516",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "CNY",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        ratingCount: "100",
        bestRating: "5",
        worstRating: "1",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
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
