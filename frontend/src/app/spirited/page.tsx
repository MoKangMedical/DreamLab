'use client';

import Link from 'next/link';
import FloorMap from '@/components/SpiritedFloorMap';
import GameHUD from '@/components/GameHUD';

export default function SpiritedPage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0d0d1f 0%, #141428 40%, #1a1a2e 70%, #141428 100%)' }}>
      {/* 星空背景 */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              opacity: 0.15 + Math.random() * 0.3,
              animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* 标题 */}
      <div className="relative z-10 text-center pt-10 md:pt-14 pb-4 px-4 animate-card-rise">
        <div className="inline-flex items-center gap-2 mb-4 text-xs tracking-[0.2em] text-[#F0C060]/70">
          <span className="w-5 h-px bg-[#ffffff]/10" />
          <span>油屋の探索</span>
          <span className="w-5 h-px bg-[#ffffff]/10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-3">
          <span className="text-geo-gradient">千と千尋の神隠し</span>
        </h1>
        <p className="text-[#B0B0C0] text-lg mb-2">— 梦境探索 · 找回名字 —</p>
        <p className="text-[#707090] text-sm max-w-md mx-auto leading-relaxed">
          油屋的每一层，藏着一个梦境的秘密<br/>穿越五层迷雾，成为梦的解析师
        </p>
      </div>

      {/* 游戏主体 */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-10">
        <GameHUD />
        <div className="mt-6">
          <FloorMap />
        </div>
      </div>

      {/* 返回链接 */}
      <div className="relative z-10 text-center pb-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#707090] hover:text-[#B0B0C0] transition-colors">
          <span>←</span> 返回 DreamLab 主页
        </Link>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
