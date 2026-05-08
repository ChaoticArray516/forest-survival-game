import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "森林生存游戏攻略与生存技巧 | Forest Survival Guide",
  description:
    "完整的森林生存游戏攻略：10天生存策略、资源管理技巧、新手入门指南。掌握营火建造时机和资源优先级，挑战极限生存。",
  alternates: {
    canonical: "https://forest-survival-game.vercel.app/how-to-play",
  },
};

export default function HowToPlay() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white">
            首页
          </Link>
          <span className="mx-2">/</span>
          <span>玩法攻略</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          森林生存游戏完整攻略与生存技巧
        </h1>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
            新手入门指南
          </h2>
          <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#F8B500]">
              第一天应该做什么
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              游戏开始后，你位于地图正中央。第一天的白天最长（约84秒），这是你收集资源的黄金时间。
              优先寻找水池获取水源，然后找到苹果树补充食物，最后砍伐树木储备木材。
              建议在天黑前至少储备 6 个木材，确保能建造 2 个营火度过第一夜。
            </p>
            <h3 className="text-lg font-semibold text-[#F8B500]">
              3-2-1 资源优先级法则
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              我们经过大量实测总结出的资源收集优先级：水 &gt; 食物 &gt; 木材。
              口渴值下降速度与饥饿值相近，但水源（水池）比苹果树更稀少且位置固定。
              一旦口渴归零，每秒损失 2 HP，比饥饿更致命。因此优先保证水源，再考虑食物储备。
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
            10天生存策略
          </h2>
          <div className="space-y-4">
            {[
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
            ].map((item) => (
              <div key={item.day} className="bg-zinc-800 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#FF4757] text-white text-xs font-bold px-2 py-1 rounded">
                    {item.day}
                  </span>
                  <h3 className="text-lg font-semibold text-[#F8B500]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
            高级技巧
          </h2>
          <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#F8B500]">
              资源最大化收集路线
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              不要随机游走。采用"圆圈式"路线：以当前位置为中心，向外螺旋探索。
              记住已访问区域，优先向未探索方向移动。水池位置固定，记住它们的位置可以节省大量时间。
            </p>
            <h3 className="text-lg font-semibold text-[#F8B500]">
              夜间生存技巧
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              营火有效范围约 90 像素。不要离营火太远。如果木材不足，优先靠近已有的营火（包括之前建造的），
              它们的剩余时间可以叠加利用。第 9-10 天夜间伤害极高，营火是唯一生存手段。
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#55E6C1]">
            常见问题解答
          </h2>
          <div className="space-y-4">
            {[
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
            ].map((faq, i) => (
              <details key={i} className="bg-zinc-800 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer text-zinc-200">
                  {faq.q}
                </summary>
                <p className="mt-2 text-zinc-400 text-sm">{faq.a}</p>
              </details>
            ))}
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
