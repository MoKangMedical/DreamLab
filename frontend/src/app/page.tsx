'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// 梦境语录
const DREAM_QUOTES = [
  { quote: '梦是一面镜子，照见被遗忘的那个自己', author: '荣格' },
  { quote: '每一种梦，都是潜意识写给你的信', author: '弗洛伊德' },
  { quote: '曾经发生过的事情不会忘记，只是想不起来而已', author: '千与千寻' },
  { quote: '我不知道将去何方，但我已在路上', author: '千与千寻' },
  { quote: '不管前方的路有多苦，只要走的方向正确，都比站在原地更接近幸福', author: '千与千寻' },
  { quote: '人们常常会欺骗你，是为了让你明白，有时候你唯一应该相信的是你自己', author: '千与千寻' },
  { quote: '梦不是需要解答的谜题，而是需要被理解的另一个自己', author: 'DreamLab' },
  { quote: '在油屋，名字是最珍贵的财富。在梦中，自我是最深的归宿', author: '千寻' },
];

// 几何装饰形状（CSS三角形/菱形坐标）
const GEO_SHAPES = [
  { shape: 'triangle', x: '5%', y: '15%', color: 'rgba(232,165,152,0.15)', size: 40, delay: 0, dur: 9 },
  { shape: 'triangle', x: '92%', y: '25%', color: 'rgba(196,181,212,0.12)', size: 30, delay: 2, dur: 8 },
  { shape: 'diamond', x: '15%', y: '65%', color: 'rgba(184,212,200,0.12)', size: 24, delay: 4, dur: 10 },
  { shape: 'diamond', x: '88%', y: '70%', color: 'rgba(240,192,96,0.1)', size: 20, delay: 1, dur: 7 },
  { shape: 'triangle', x: '48%', y: '10%', color: 'rgba(232,213,183,0.12)', size: 35, delay: 3, dur: 11 },
  { shape: 'diamond', x: '55%', y: '85%', color: 'rgba(196,181,212,0.1)', size: 18, delay: 5, dur: 9 },
  { shape: 'triangle', x: '78%', y: '45%', color: 'rgba(232,165,152,0.08)', size: 28, delay: 6, dur: 8 },
  { shape: 'diamond', x: '25%', y: '35%', color: 'rgba(240,192,96,0.1)', size: 22, delay: 2, dur: 10 },
];

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export default function HomePage() {
  const [visible, setVisible] = useState(false);
  const [showInstall, setShowInstall] = useState(false);
  const [dailyQuote, setDailyQuote] = useState(DREAM_QUOTES[0]);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setVisible(true);
    const idx = new Date().getDate() % DREAM_QUOTES.length;
    setDailyQuote(DREAM_QUOTES[idx]);

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setShowInstall(!isStandalone);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') setShowInstall(false);
      setDeferredPrompt(null);
    }
  };

  const entries = [
    {
      href: '/assessments',
      icon: '🪞',
      title: '心理测评',
      sub: '契约之镜',
      desc: 'SAS·SDS·大五人格·SCL-90 · 6大标准量表',
      colors: { from: 'var(--geo-sand)', to: '#D4B896', glow: '#E8D5B7' },
      badge: '科学',
      badgeClass: 'badge-sand',
      delay: 0,
    },
    {
      href: '/spirited',
      icon: '◇',
      title: '油屋探险',
      sub: '开始千寻之旅',
      desc: '5层梦境场景 · 对话探索 · 收集钥匙',
      colors: { from: 'var(--geo-coral)', to: 'var(--accent-coral)', glow: '#E8A598' },
      badge: '冒险',
      badgeClass: 'badge-coral',
      delay: 0.1,
    },
    {
      href: '/courses',
      icon: '◎',
      title: '梦学殿堂',
      sub: '系统课程',
      desc: '弗洛伊德 · 荣格 · 现代科学 · 东方智慧',
      colors: { from: 'var(--geo-mint)', to: 'var(--geo-mint)', glow: '#B8D4C8' },
      badge: '学习',
      badgeClass: 'badge-mint',
      delay: 0.2,
    },
    {
      href: '/dream',
      icon: '◈',
      title: '梦境工坊',
      sub: '记录与解析',
      desc: '四重视角AI解析 · 反思洞察 · 成长追踪',
      colors: { from: 'var(--geo-lavender)', to: 'var(--accent-purple)', glow: '#C4B5D4' },
      badge: '创造',
      badgeClass: 'badge-lavender',
      delay: 0.3,
    },
    {
      href: '/companion',
      icon: '👤',
      title: '心灵陪伴',
      sub: '无脸男的倾听',
      desc: 'CBT共情对话 · 安静陪伴 · 危机支持',
      colors: { from: 'var(--accent-purple)', to: '#6a5acd', glow: '#9B7ED8' },
      badge: '温暖',
      badgeClass: 'badge-lavender',
      delay: 0.4,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0d0d1f 0%, #141428 40%, #1a1a2e 70%, #141428 100%)' }}>
      {/* ── 深邃星空背景 ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* 微星 */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 85}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              opacity: 0.15 + Math.random() * 0.4,
              animation: `twinkle ${3 + Math.random() * 5}s infinite ${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* ── 漂浮几何装饰 ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {GEO_SHAPES.map((geo, i) => (
          <div
            key={`geo-${i}`}
            className="absolute"
            style={{
              left: geo.x,
              top: geo.y,
              animation: `float-slow ${geo.dur}s ease-in-out infinite ${geo.delay}s`,
            }}
          >
            {geo.shape === 'triangle' ? (
              <div style={{
                width: 0, height: 0,
                borderLeft: `${geo.size/2}px solid transparent`,
                borderRight: `${geo.size/2}px solid transparent`,
                borderBottom: `${geo.size}px solid ${geo.color}`,
              }} />
            ) : (
              <div style={{
                width: `${geo.size}px`, height: `${geo.size}px`,
                backgroundColor: geo.color,
                transform: 'rotate(45deg)',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* ── 主内容 ── */}
      <div className={`relative z-10 max-w-5xl mx-auto px-4 pt-14 md:pt-8 pb-28 md:pb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* PWA 安装引导 */}
        {showInstall && (
          <div className="mb-8 animate-card-rise" style={{ animationDelay: '0.05s' }}>
            <div className="geo-card p-4 backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, rgba(26,26,46,0.8), rgba(30,25,50,0.8))' }}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--geo-coral), var(--accent-purple))' }}>
                    📲
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-bold">添加到桌面</p>
                    <p className="text-[#707090] text-xs truncate">像小程序一样快速打开 DreamLab</p>
                  </div>
                </div>
                <button
                  onClick={handleInstall}
                  className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, var(--geo-coral), var(--accent-purple))', color: 'var(--bg-deep)' }}
                >
                  安装
                </button>
                <button
                  onClick={() => setShowInstall(false)}
                  className="shrink-0 w-6 h-6 rounded-full bg-[#ffffff]/08 flex items-center justify-center text-[#707090] text-xs hover:text-white hover:bg-[#ffffff]/15 transition-all"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── 诗意引言 ── */}
        <div className="mb-10 text-center animate-card-rise" style={{ animationDelay: '0.1s' }}>
          <div className="inline-block relative px-8 py-4">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#ffffff]/10" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#ffffff]/10" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#ffffff]/10" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#ffffff]/10" />
            <p className="text-[#B0B0C0] text-base italic leading-relaxed max-w-md mx-auto">
              「{dailyQuote.quote}」
            </p>
            <p className="text-[#707090] text-xs mt-3">—— {dailyQuote.author} · 今日梦境</p>
          </div>
        </div>

        {/* ── Hero 标题区 ── */}
        <div className="text-center mb-14 animate-card-rise" style={{ animationDelay: '0.15s' }}>
          {/* 标志性几何徽章 */}
          <div className="inline-block mb-6 relative">
            <div className="w-20 h-20 mx-auto relative">
              {/* 几何花形 — 菱形+圆形 */}
              <div className="absolute inset-0 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, var(--geo-coral), transparent 70%)' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rotate-45 rounded-md"
                  style={{ background: 'linear-gradient(135deg, var(--geo-coral), var(--accent-purple))', opacity: 0.3 }} />
                <div className="absolute text-3xl" style={{ filter: 'drop-shadow(0 0 12px rgba(232,165,152,0.4))' }}>🏯</div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-wider text-white"
            style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.08em' }}>
            <span className="text-geo-gradient">DreamLab</span>
          </h1>
          <p className="text-[#B0B0C0] text-lg mb-2">千と千尋の夢の解析</p>
          <p className="text-[#707090] text-sm max-w-lg mx-auto leading-relaxed">
            穿过油屋的层层迷雾，在梦境的最深处<br/>找回被遗忘的名字与真实的自己
          </p>
        </div>

        {/* ── 三大入口 — 浮动的几何平台 ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {entries.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative block animate-card-rise"
              style={{ animationDelay: `${0.2 + card.delay}s`, touchAction: 'manipulation' }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* 卡片底座阴影（等距透视感） */}
              <div className="absolute -bottom-2 left-2 right-2 h-4 rounded-2xl opacity-20 transition-all duration-500 group-hover:opacity-30 group-hover:-bottom-3"
                style={{ background: card.colors.from }} />

              {/* 主卡片 */}
              <div className="geo-card p-7 relative overflow-hidden transition-all duration-500 group-hover:shadow-coral"
                style={{ background: 'linear-gradient(145deg, rgba(26,26,46,0.85), rgba(20,20,40,0.9))' }}>
                {/* 几何角装饰 */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                  <div className="absolute top-3 right-3 w-2 h-2 rotate-45"
                    style={{ backgroundColor: card.colors.from }} />
                  <div className="absolute top-3 right-8 w-1.5 h-1.5 rotate-45"
                    style={{ backgroundColor: card.colors.to, opacity: 0.5 }} />
                </div>

                {/* 悬浮发光光晕 */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${card.colors.glow}12 0%, transparent 70%)`,
                  }} />

                <div className="relative z-10">
                  {/* 几何图标 */}
                  <div className="w-14 h-14 mb-5 rounded-xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: `linear-gradient(135deg, ${card.colors.from}20, ${card.colors.to}20)`, border: `1px solid ${card.colors.from}30` }}>
                    <span style={{ filter: `drop-shadow(0 0 8px ${card.colors.from}40)` }}>{card.icon}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#e0d0ff] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-sm mb-1 transition-colors duration-300"
                    style={{ color: card.colors.from }}>
                    {card.sub}
                  </p>
                  <p className="text-xs text-[#707090] leading-relaxed mb-4">{card.desc}</p>

                  <span className={`badge-geo ${card.badgeClass} text-[10px]`}>{card.badge}</span>
                </div>

                {/* 底部几何线条 */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-10 group-hover:opacity-25 transition-opacity duration-500"
                  style={{ color: card.colors.from }} />
              </div>
            </Link>
          ))}
        </div>

        {/* ── 诗意引导区 ── */}
        <div className="relative rounded-3xl overflow-hidden mb-12 animate-card-rise"
          style={{
            animationDelay: '0.4s',
            background: 'linear-gradient(135deg, rgba(26,20,40,0.6), rgba(20,26,40,0.6))',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
          }}>
          {/* 装饰几何 */}
          <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-10">
            <div className="absolute top-6 left-6 w-5 h-5 rotate-45" style={{ backgroundColor: 'var(--geo-coral)' }} />
            <div className="absolute top-14 left-14 w-3 h-3 rotate-45" style={{ backgroundColor: 'var(--geo-lavender)' }} />
            <div className="absolute top-10 left-8 w-2 h-2 rotate-45" style={{ backgroundColor: 'var(--geo-gold)' }} />
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-10">
            <div className="absolute bottom-6 right-6 w-5 h-5 rotate-45" style={{ backgroundColor: 'var(--geo-mint)' }} />
            <div className="absolute bottom-14 right-14 w-3 h-3 rotate-45" style={{ backgroundColor: 'var(--geo-sand)' }} />
          </div>

          <div className="relative z-10 text-center p-8 md:p-12">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#ffffff]/10" />
              <span className="text-xs tracking-[0.2em] text-[#F0C060]/70">油屋の案内</span>
              <div className="w-6 h-px bg-[#ffffff]/10" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
              在油屋的每一层，找到被遗忘的自己
            </h2>
            <p className="text-[#B0B0C0] max-w-2xl mx-auto leading-relaxed text-sm">
              汤婆婆的契约之镜映照真实的内心，无脸男对话倾诉未说的情绪，
              河神净化疲惫的心灵，白龙引领找回最初的自己。六种专业量表 + AI 深度解读，
              让解梦成为一场温暖的自我重逢。
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <Link
                href="/assessments"
                className="btn-geo px-7 py-3 text-sm font-semibold"
                style={{ background: 'linear-gradient(135deg, var(--geo-sand), var(--geo-gold))', color: 'var(--bg-deep)' }}
              >
                🪞 开始测评 →
              </Link>
              <Link
                href="/courses"
                className="btn-geo-ghost px-7 py-3 text-sm"
              >
                先学理论 →
              </Link>
            </div>
          </div>
        </div>

        {/* ── 页脚 ── */}
        <div className="text-center animate-card-rise" style={{ animationDelay: '0.5s' }}>
          <div className="inline-flex items-center gap-3 text-xs text-[#505060]">
            <span className="w-4 h-px bg-[#ffffff]/08" />
            <span>DreamLab · 2026</span>
            <span className="w-4 h-px bg-[#ffffff]/08" />
          </div>
        </div>
      </div>
    </div>
  );
}
