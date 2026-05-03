'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';

const DREAM_QUOTES = [
  { quote: '曾经发生过的事情不会忘记，只是想不起来而已', author: '钱婆婆' },
  { quote: '我不知道将去何方，但我已在路上', author: '千寻' },
  { quote: '名字一旦被夺走，就再也找不到回家的路了', author: '白龙' },
  { quote: '不管前方的路有多苦，都比站在原地更接近幸福', author: '千寻' },
  { quote: '人们常常会欺骗你，是为了让你明白，有时候你唯一应该相信的是你自己', author: '锅炉爷爷' },
  { quote: '梦是一面镜子，照见被遗忘的那个自己', author: 'DreamLab' },
  { quote: '在油屋，名字是最珍贵的财富。在梦中，自我是最深的归宿', author: '千寻' },
];

// 光灵粒子生成
function useSpirits(count: number) {
  return useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 5 + Math.random() * 90,
    size: 2 + Math.random() * 4,
    color: ['#a8d8ea', '#f0c8d8', '#ffd89b', '#c4b5d4', '#b8d4c8'][Math.floor(Math.random() * 5)],
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 10,
  })), [count]);
}

// 海洋光点
function useOceanSparkles(count: number) {
  return useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: 60 + Math.random() * 35,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 4,
  })), [count]);
}

const ENTRIES = [
  {
    href: '/assessments', icon: '🪞', title: '契约之镜', sub: '心理测评',
    desc: 'SAS·SDS·大五人格·SCL-90',
    colors: { from: '#f0c060', to: '#f2a094', glow: '#ffd89b', bg: 'rgba(240,192,96,0.08)' },
    badge: '科学', badgeClass: 'badge-gold',
  },
  {
    href: '/companion', icon: '👤', title: '无脸男的倾听', sub: '心灵陪伴',
    desc: 'CBT共情对话 · 安静守护',
    colors: { from: '#a8d8ea', to: '#c4b5d4', glow: '#a8d8ea', bg: 'rgba(168,216,234,0.08)' },
    badge: '温暖', badgeClass: 'badge-ocean',
  },
  {
    href: '/wellness', icon: '♨️', title: '河神的净化汤', sub: '健康工具箱',
    desc: '冥想·呼吸·情绪·感恩',
    colors: { from: '#8db580', to: '#5c8a6e', glow: '#b8d4c8', bg: 'rgba(141,181,128,0.08)' },
    badge: '疗愈', badgeClass: 'badge-mint',
  },
  {
    href: '/spirited', icon: '🏯', title: '油屋探险', sub: '千寻之旅',
    desc: '5层梦境 · 对话探索',
    colors: { from: '#c44536', to: '#f2a094', glow: '#c44536', bg: 'rgba(196,69,54,0.08)' },
    badge: '冒险', badgeClass: 'badge-coral',
  },
  {
    href: '/courses', icon: '📜', title: '梦学殿堂', sub: '系统课程',
    desc: '弗洛伊德·荣格·现代·东方',
    colors: { from: '#4a8db7', to: '#a8d8ea', glow: '#4a8db7', bg: 'rgba(74,141,183,0.08)' },
    badge: '学习', badgeClass: 'badge-ocean',
  },
  {
    href: '/dream', icon: '🌙', title: '梦境工坊', sub: '记录解析',
    desc: '四重视角 · AI深度分析',
    colors: { from: '#c4b5d4', to: '#9b7ed8', glow: '#c4b5d4', bg: 'rgba(196,181,212,0.08)' },
    badge: '创造', badgeClass: 'badge-lavender',
  },
];

export default function HomePage() {
  const [visible, setVisible] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const spirits = useSpirits(40);
  const sparkles = useOceanSparkles(30);

  useEffect(() => {
    setVisible(true);
    setQuoteIdx(new Date().getDate() % DREAM_QUOTES.length);
  }, []);

  const q = DREAM_QUOTES[quoteIdx];

  return (
    <div className="ocean-bg min-h-screen relative">
      {/* ═══════════ 星空层 ═══════════ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={`star-${i}`} className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 60}%`,
              width: `${1 + Math.random() * 2}px`, height: `${1 + Math.random() * 2}px`,
              opacity: 0.2 + Math.random() * 0.5,
              animation: `twinkle ${3 + Math.random() * 5}s infinite ${Math.random() * 4}s`,
            }} />
        ))}
      </div>

      {/* ═══════════ 海洋波浪层 ═══════════ */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ bottom: '-5%' }}>
        <div className="ocean-waves">
          <div className="ocean-wave" />
          <div className="ocean-wave" />
          <div className="ocean-wave" />
        </div>
        {/* 海面光点 */}
        <div className="ocean-sparkles">
          {sparkles.map(s => (
            <div key={s.id} className="absolute rounded-full bg-white"
              style={{
                left: `${s.x}%`, top: `${s.y}%`,
                width: `${s.size}px`, height: `${s.size}px`,
                animation: `sparkle ${s.duration}s ease-in-out infinite ${s.delay}s`,
              }} />
          ))}
        </div>
      </div>

      {/* ═══════════ 光灵粒子 ═══════════ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {spirits.map(s => (
          <div key={s.id} className="spirit-particle spirit-light"
            style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: `${s.size}px`, height: `${s.size}px`,
              backgroundColor: s.color,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }} />
        ))}
      </div>

      {/* ═══════════ 油屋建筑 — 固定背景 ═══════════ */}
      <div className="fixed right-[3%] bottom-[8%] pointer-events-none z-[1] hidden lg:block"
        style={{ transform: 'scale(0.8)', opacity: 0.5 }}>
        <div className="bathhouse">
          {/* 顶层塔楼 */}
          <div style={{ width: 40, height: 30, background: 'linear-gradient(180deg, #3d1a10, #2d1810)', borderRadius: '4px 4px 0 0', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', width: 2, height: 8, background: '#c44536' }} />
          </div>
          {/* 主体 */}
          <div className="bathhouse-body">
            {[[15, 15, 14, 8], [15, 40, 14, 8], [55, 15, 14, 8], [55, 40, 14, 8], [90, 15, 14, 8], [90, 40, 14, 8], [38, 65, 20, 12], [78, 65, 20, 12]].map(([x, y, w, h], i) => (
              <div key={i} className="bathhouse-window" style={{ left: x, top: y, width: w, height: h }} />
            ))}
            {/* 大门 */}
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 30, height: 25, background: 'rgba(240,192,96,0.3)', borderRadius: '4px 4px 0 0' }} />
          </div>
          {/* 红桥 */}
          <div className="bathhouse-bridge" />
          {/* 灯笼 */}
          <div style={{ position: 'absolute', bottom: 8, left: -16 }}>
            <div className="lantern" />
          </div>
          <div style={{ position: 'absolute', bottom: 12, right: -14 }}>
            <div className="lantern" style={{ animationDelay: '1s' }} />
          </div>
          <div style={{ position: 'absolute', top: 10, right: -12 }}>
            <div className="lantern" style={{ animationDelay: '2s', width: 8, height: 11 }} />
          </div>
        </div>
      </div>

      {/* ═══════════ 纪念碑谷几何块 ═══════════ */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
        {/* 左上几何块 */}
        <div className="geo-platform" style={{
          position: 'absolute', left: '3%', top: '20%',
          width: 60, height: 60, transform: 'rotate(12deg)',
          background: 'linear-gradient(135deg, rgba(168,216,234,0.12), rgba(196,181,212,0.06))',
        }} />
        {/* 右下几何块 */}
        <div className="geo-block" style={{
          position: 'absolute', right: '18%', bottom: '25%',
          width: 40, height: 40, transform: 'rotate(45deg)',
          border: '1px solid rgba(240,192,96,0.1)',
          background: 'rgba(240,192,96,0.05)',
        }} />
        {/* 左侧浮台 */}
        <div className="geo-block animate-float-slower" style={{
          position: 'absolute', left: '8%', bottom: '30%',
          width: 80, height: 6, borderRadius: 3,
          background: 'linear-gradient(90deg, transparent, rgba(196,181,212,0.15), transparent)',
        }} />
      </div>

      {/* ═══════════ 主内容 ═══════════ */}
      <div className={`relative z-10 max-w-5xl mx-auto px-4 pt-8 md:pt-6 pb-32 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* ── Hero 区 ── */}
        <div className="text-center mb-8 animate-card-rise">
          {/* 徽章 */}
          <div className="inline-block mb-4 relative">
            <div style={{
              width: 72, height: 72, margin: '0 auto', position: 'relative',
              background: 'radial-gradient(circle, rgba(240,192,96,0.15), transparent 70%)',
            }}>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 40, height: 40, transform: 'rotate(45deg)', borderRadius: 8,
                  background: 'linear-gradient(135deg, rgba(240,192,96,0.3), rgba(168,216,234,0.2))',
                  border: '1px solid rgba(240,192,96,0.2)',
                }} />
                <div className="absolute text-3xl" style={{ filter: 'drop-shadow(0 0 12px rgba(240,192,96,0.4))' }}>
                  🏯
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-3 tracking-wider">
            <span className="text-ocean-gradient">DreamLab</span>
          </h1>
          <p className="text-[#a8d8ea] text-lg mb-2">千と千尋の夢の解析</p>
          <p className="text-[#6A8AA8] text-sm max-w-lg mx-auto leading-relaxed">
            穿过油屋的层层迷雾，在梦境的最深处<br/>找回被遗忘的名字与真实的自己
          </p>
        </div>

        {/* ── 今日梦境语录 ── */}
        <div className="mb-10 text-center animate-card-rise" style={{ animationDelay: '0.1s' }}>
          <div className="inline-block relative px-6 py-3">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#ffd89b]/20" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#ffd89b]/20" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#ffd89b]/20" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#ffd89b]/20" />
            <p className="text-[#B8C8D8] text-base italic leading-relaxed max-w-md mx-auto">
              「{q.quote}」
            </p>
            <p className="text-[#6A8AA8] text-xs mt-2">—— {q.author} · 今日梦境</p>
          </div>
        </div>

        {/* ── 6大入口 — 浮动几何卡片 ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {ENTRIES.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative block animate-card-rise"
              style={{ animationDelay: `${0.12 + i * 0.07}s`, touchAction: 'manipulation' }}
            >
              {/* 底座阴影 */}
              <div className="absolute -bottom-1.5 left-1.5 right-1.5 h-3 rounded-2xl opacity-15 transition-all duration-500 group-hover:opacity-25 group-hover:-bottom-2.5"
                style={{ background: card.colors.from }} />

              {/* 主卡片 */}
              <div className="geo-card p-5 relative overflow-hidden transition-all duration-500"
                style={{
                  background: `linear-gradient(145deg, rgba(22,45,72,0.85), rgba(15,43,69,0.9))`,
                  borderColor: 'rgba(255,255,255,0.05)',
                }}>
                {/* 角装饰 */}
                <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                  <div className="absolute top-2 right-2 w-2 h-2 rotate-45" style={{ backgroundColor: card.colors.from }} />
                </div>

                {/* 悬浮光晕 */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 30%, ${card.colors.glow}10 0%, transparent 70%)` }} />

                <div className="relative z-10">
                  <div className="w-11 h-11 mb-4 rounded-xl flex items-center justify-center text-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: card.colors.bg,
                      border: `1px solid ${card.colors.from}20`,
                    }}>
                    <span style={{ filter: `drop-shadow(0 0 6px ${card.colors.from}30)` }}>{card.icon}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#d0e0f0] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs mb-1" style={{ color: card.colors.from }}>{card.sub}</p>
                  <p className="text-[11px] text-[#6A8AA8] leading-relaxed mb-3">{card.desc}</p>
                  <span className={`badge-geo ${card.badgeClass} text-[10px]`}>{card.badge}</span>
                </div>

                {/* 底部渐变线 */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-8 group-hover:opacity-20 transition-opacity"
                  style={{ color: card.colors.from }} />
              </div>
            </Link>
          ))}
        </div>

        {/* ── 诗意引导 — 火车+大海 ── */}
        <div className="relative rounded-3xl overflow-hidden mb-10 animate-card-rise"
          style={{
            animationDelay: '0.5s',
            background: 'linear-gradient(135deg, rgba(15,43,69,0.8), rgba(10,22,40,0.9))',
            border: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
          }}>
          {/* 海洋装饰 */}
          <div className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              background: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(74,141,183,0.3) 3px, rgba(74,141,183,0.3) 4px)`,
              maskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
            }} />

          {/* 几何装饰 */}
          <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-8">
            <div className="absolute top-4 left-4 w-4 h-4 rotate-45" style={{ backgroundColor: 'var(--bathhouse-gold)' }} />
            <div className="absolute top-10 left-10 w-3 h-3 rotate-45" style={{ backgroundColor: 'var(--accent-ocean)' }} />
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-8">
            <div className="absolute bottom-4 right-4 w-4 h-4 rotate-45" style={{ backgroundColor: 'var(--geo-coral)' }} />
            <div className="absolute bottom-10 right-10 w-3 h-3 rotate-45" style={{ backgroundColor: 'var(--accent-spirit)' }} />
          </div>

          <div className="relative z-10 text-center p-8 md:p-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-xs tracking-[0.2em] text-[#ffd89b]/50">油 屋 の 案 内</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              在油屋的每一层，找到被遗忘的自己
            </h2>
            <p className="text-[#8aa8c0] max-w-2xl mx-auto leading-relaxed text-sm">
              汤婆婆的契约之镜映照真实的内心，无脸男安静倾听未说出口的情绪。<br/>
              河神净化疲惫的心灵，白龙引领找回最初的自己。<br/>
              六种专业量表 + AI 深度解读 + CBT共情对话，让每一次探索都成为温暖的自我重逢。
            </p>
            <div className="flex justify-center gap-4 mt-7">
              <Link href="/assessments" className="btn-geo px-6 py-2.5 text-sm"
                style={{ background: 'linear-gradient(135deg, var(--bathhouse-gold), var(--geo-coral))', color: 'var(--bg-deep)' }}>
                🪞 契约之镜 →
              </Link>
              <Link href="/companion" className="btn-geo-ghost px-6 py-2.5 text-sm">
                👤 安静陪伴 →
              </Link>
            </div>
          </div>
        </div>

        {/* ── 页脚 ── */}
        <div className="text-center animate-card-rise" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-center gap-3 text-xs text-[#3A5A78]">
            <span className="w-4 h-px bg-[#ffffff]/06" />
            DreamLab · 千と千尋の夢の解析 · 2026
            <span className="w-4 h-px bg-[#ffffff]/06" />
          </div>
          <p className="text-[10px] text-[#2A4A68] mt-2">梦是一面镜子，照见被遗忘的那个自己</p>
        </div>
      </div>
    </div>
  );
}
