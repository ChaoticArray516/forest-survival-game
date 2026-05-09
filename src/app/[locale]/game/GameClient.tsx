"use client";

import dynamic from "next/dynamic";

const GameCanvas = dynamic(() => import("./GameCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-[#2D3436] text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#55E6C1] mx-auto mb-4" />
        <p>Loading...</p>
      </div>
    </div>
  ),
});

export default function GameClient({ locale }: { locale: string }) {
  return (
    <div className="w-full aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl border border-zinc-700">
      <GameCanvas locale={locale} />
    </div>
  );
}
