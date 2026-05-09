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
      ? "森林生存游戏攻略与生存技巧 | Forest Survival Guide"
      : "Forest Survival Game Guide & Survival Tips",
    description: isZh
      ? "完整的森林生存游戏攻略：10天生存策略、资源管理技巧、新手入门指南。掌握营火建造时机和资源优先级，挑战极限生存。"
      : "Complete Forest Survival game guide: 10-day survival strategies, resource management tips, beginner walkthrough. Master campfire timing and resource priority.",
    alternates: {
      canonical: `https://forestsurvival.org/${locale}/how-to-play`,
      languages: {
        "zh-CN": "https://forestsurvival.org/zh/how-to-play",
        "en-US": "https://forestsurvival.org/en/how-to-play",
        "x-default": "https://forestsurvival.org/en/how-to-play",
      },
    },
  };
}

const content: Record<
  Locale,
  {
    navHome: string;
    navCurrent: string;
    h1: string;
    beginnerTitle: string;
    day1Title: string;
    day1Desc: string;
    priorityTitle: string;
    priorityDesc: string;
    strategyTitle: string;
    strategies: { day: string; title: string; desc: string }[];
    advancedTitle: string;
    routeTitle: string;
    routeDesc: string;
    nightTitle: string;
    nightDesc: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
    backBtn: string;
  }
> = {
  zh: {
    navHome: "首页",
    navCurrent: "玩法攻略",
    h1: "森林生存游戏完整攻略与生存技巧",
    beginnerTitle: "新手入门指南",
    day1Title: "第一天应该做什么",
    day1Desc:
      "游戏开始后，你位于地图正中央。第一天的白天最长（约84秒），这是你收集资源的黄金时间。优先寻找水池获取水源，然后找到苹果树补充食物，最后砍伐树木储备木材。建议在天黑前至少储备 6 个木材，确保能建造 2 个营火度过第一夜。",
    priorityTitle: "3-2-1 资源优先级法则",
    priorityDesc:
      "我们经过大量实测总结出的资源收集优先级：水 > 食物 > 木材。口渴值下降速度与饥饿值相近，但水源（水池）比苹果树更稀少且位置固定。一旦口渴归零，每秒损失 2 HP，比饥饿更致命。因此优先保证水源，再考虑食物储备。",
    strategyTitle: "10天生存策略",
    strategies: [
      {
        day: "第 1-2 天",
        title: "适应期",
        desc: "难度较低，资源充足。熟悉地图布局，记住水池和苹果树的大致位置。建立 2-3 个木材的安全储备。",
      },
      {
        day: "第 3-4 天",
        title: "资源紧张期",
        desc: "树木刷新时间延长至 5-7 秒，水池减少。开始有策略地规划路线，避免无效移动浪费时间和饥饿/口渴。",
      },
      {
        day: "第 5 天",
        title: "转折点",
        desc: "寒冷伤害提升至 8/s，黑夜占比 45%。营火建造时机变得至关重要。建议在黄昏前 10 秒就开始寻找安全位置建营火。",
      },
      {
        day: "第 6-7 天",
        title: "高压期",
        desc: "最大饥饿/口渴上限降至 80，容错率大幅降低。每一个资源都不能浪费。优先在水池附近建立营火基地。",
      },
      {
        day: "第 8-10 天",
        title: "极限挑战",
        desc: "树木仅剩 20 棵以下，水池仅剩 2-3 个。寒冷伤害高达 12-15/s。这是最考验资源管理和路线规划的阶段。",
      },
    ],
    advancedTitle: "高级技巧",
    routeTitle: "资源最大化收集路线",
    routeDesc:
      "不要随机游走。采用「圆圈式」路线：以当前位置为中心，向外螺旋探索。记住已访问区域，优先向未探索方向移动。水池位置固定，记住它们的位置可以节省大量时间。",
    nightTitle: "夜间生存技巧",
    nightDesc:
      "营火有效范围约 90 像素。不要离营火太远。如果木材不足，优先靠近已有的营火（包括之前建造的），它们的剩余时间可以叠加利用。第 9-10 天夜间伤害极高，营火是唯一生存手段。",
    faqTitle: "常见问题解答",
    faq: [
      {
        q: "营火可以叠加吗？",
        a: "不能叠加建造在同一位置，但可以在不同位置建造多个营火。合理分散营火可以扩大安全活动范围。",
      },
      {
        q: "砍树的时候会被攻击吗？",
        a: "游戏中没有敌对生物，唯一威胁来自环境（饥饿、口渴、寒冷）。安心砍树即可。",
      },
      {
        q: "为什么第 6 天感觉突然变难了？",
        a: "第 6 天开始最大饥饿/口渴上限从 100 降至 80，同时资源进一步减少。这是设计上的难度跳跃点。",
      },
    ],
    backBtn: "← 返回游戏",
  },
  en: {
    navHome: "Home",
    navCurrent: "How to Play",
    h1: "Forest Survival Game Guide & Survival Tips",
    beginnerTitle: "Beginner's Guide",
    day1Title: "What to Do on Day 1",
    day1Desc:
      "You start at the center of the map. Day 1 has the longest daytime (~84 seconds), your golden window for gathering resources. Prioritize finding water pools first, then apple trees for food, and finally chop trees for wood stockpile. Aim to gather at least 6 wood before sunset to build 2 campfires for your first night.",
    priorityTitle: "The 3-2-1 Resource Priority Rule",
    priorityDesc:
      "Based on extensive testing, our recommended gathering priority is: Water > Food > Wood. Thirst and hunger decay at similar rates, but water sources (pools) are scarcer and fixed in position. Once thirst hits zero, you lose 2 HP per second — deadlier than hunger. Secure water first, then focus on food reserves.",
    strategyTitle: "10-Day Survival Strategy",
    strategies: [
      {
        day: "Day 1-2",
        title: "Adaptation",
        desc: "Low difficulty, abundant resources. Learn the map layout, memorize approximate positions of pools and apple trees. Build a safety stockpile of 2-3 wood.",
      },
      {
        day: "Day 3-4",
        title: "Resource Scarcity",
        desc: "Tree respawn extends to 5-7 seconds, pools decrease. Start planning routes strategically to avoid wasting time and hunger/thirst on unnecessary movement.",
      },
      {
        day: "Day 5",
        title: "Turning Point",
        desc: "Cold damage rises to 8/s, night ratio hits 45%. Campfire timing becomes critical. Start looking for a safe build spot 10 seconds before dusk.",
      },
      {
        day: "Day 6-7",
        title: "High Pressure",
        desc: "Max hunger/thirst caps drop to 80, drastically reducing margin for error. Every resource counts. Prioritize establishing a campfire base near water pools.",
      },
      {
        day: "Day 8-10",
        title: "Ultimate Challenge",
        desc: "Less than 20 trees remain, only 2-3 pools. Cold damage reaches 12-15/s. This is the ultimate test of resource management and route planning.",
      },
    ],
    advancedTitle: "Advanced Techniques",
    routeTitle: "Maximizing Resource Collection Routes",
    routeDesc:
      "Don't wander randomly. Use a spiral pattern: start from your current position and explore outward in circles. Remember visited areas and prioritize unexplored directions. Pool positions are fixed — memorizing them saves enormous amounts of time.",
    nightTitle: "Night Survival Tactics",
    nightDesc:
      "Campfire effective range is about 90 pixels. Don't stray too far. If low on wood, prioritize staying near existing campfires (including previously built ones) — their remaining time can be leveraged. On Days 9-10, night damage is extreme; campfires are your only lifeline.",
    faqTitle: "FAQ",
    faq: [
      {
        q: "Can campfires stack?",
        a: "You can't stack multiple campfires on the same spot, but you can build several at different locations. Strategically spreading campfires expands your safe movement area.",
      },
      {
        q: "Will I get attacked while chopping trees?",
        a: "There are no hostile creatures in the game. The only threats are environmental (hunger, thirst, cold). Chop away without worry.",
      },
      {
        q: "Why does Day 6 suddenly feel much harder?",
        a: "Starting Day 6, max hunger/thirst caps drop from 100 to 80 while resources continue to decrease. This is an intentional difficulty spike in the design.",
      },
    ],
    backBtn: "← Back to Game",
  },
};

export default async function HowToPlay({ params }: Props) {
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
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
            {t.beginnerTitle}
          </h2>
          <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#F8B500]">
              {t.day1Title}
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{t.day1Desc}</p>
            <h3 className="text-lg font-semibold text-[#F8B500]">
              {t.priorityTitle}
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{t.priorityDesc}</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
            {t.strategyTitle}
          </h2>
          <div className="space-y-4">
            {t.strategies.map((item) => (
              <div key={item.day} className="bg-zinc-800 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#FF4757] text-white text-xs font-bold px-2 py-1 rounded">
                    {item.day}
                  </span>
                  <h3 className="text-lg font-semibold text-[#F8B500]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
            {t.advancedTitle}
          </h2>
          <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#F8B500]">
              {t.routeTitle}
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{t.routeDesc}</p>
            <h3 className="text-lg font-semibold text-[#F8B500]">
              {t.nightTitle}
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{t.nightDesc}</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
            {t.faqTitle}
          </h2>
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
