'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';

/* ═══════════════════════════════════════════════════
   DreamLab · 电影级首页
   全屏英雄 · 视差海洋 · 戏剧性入场 · 非对称布局
   ═══════════════════════════════════════════════════ */

const QUOTES = [
  { quote: '曾经发生过的事情不会忘记，只是想不起来而已', author: '钱婆婆' },
  { quote: '我不知道将去何方，但我已在路上', author: '千寻' },
  { quote: '名字一旦被夺走，就再也找不到回家的路了', author: '白龙' },
];

// ── 粒子系统 ──
function useParticles(count: number, layer: number) {
  return useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: layer === 0 ? 1.5 + Math.random() * 2 : layer === 1 ? 3 + Math.random() * 6 : 6 + Math.random() * 12,
    opacity: layer === 0 ? 0.15 + Math.random() * 0.3 : 0.06 + Math.random() * 0.12,
    color: ['#e2b64f', '#7eb8da', '#c47868', '#9b8ab8', '#8aaf9d', '#ffffff'][i % 6],
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 15,
    drift: (Math.random() - 0.5) * 20,
  })), [count, layer]);
}

// ── 卡片数据 ──
const FEATURES = [
  { href: '/assessments', icon: '🪞', title: '契约之镜', sub: '6 大标准心理量表', desc: 'SAS · SDS · 大五人格 · SCL-90 · PSQI · CD-RISC\nAI 深度解读 + 趋势追踪', accent: '#e2b64f', size: 'tall', dir: 'left' },
  { href: '/companion', icon: '👤', title: '无脸男的倾听', sub: 'CBT 共情 AI 陪伴', desc: '深度共情对话 · 危机识别\n安静守护每一份情绪', accent: '#7eb8da', size: 'normal', dir: 'right' },
  { href: '/wellness', icon: '♨️', title: '河神的净化汤', sub: '心智健康工具箱', desc: '引导冥想 · 呼吸训练\n情绪仪表盘 · 感恩日记', accent: '#8aaf9d', size: 'normal', dir: 'left' },
  { href: '/spirited', icon: '🏯', title: '油屋探险', sub: '千寻的成长之旅', desc: '5 层梦境场景\n对话探索 · 收集钥匙', accent: '#c47868', size: 'tall', dir: 'right' },
  { href: '/courses', icon: '📜', title: '梦学殿堂', sub: '系统心理学课程', desc: '弗洛伊德 · 荣格\n现代科学 · 东方智慧', accent: '#9b8ab8', size: 'wide', dir: 'left' },
  { href: '/dream', icon: '🌙', title: '梦境工坊', sub: 'AI 梦境深度解析', desc: '四重视角 · 潜意识探索\n记录每一场心灵旅程', accent: '#e2b64f', size: 'wide', dir: 'right' },
];

// ── 滚动可见性检测 ──
function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

// ── 卡片组件 ──
function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.1);
  const isWide = feature.size === 'wide';
  const isTall = feature.size === 'tall';

  return (
    <div ref={ref}
      className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      style={{ transitionDelay: `${index * 0.1}s` }}>
      <Link href={feature.href} className="group block h-full">
        <div className="relative h-full overflow-hidden transition-all duration-700 group-hover:scale-[1.02]"
          style={{
            background: '#131316',
            border: '1px solid #27272a',
            borderRadius: 2,
            padding: isTall ? '48px 36px' : isWide ? '40px 36px' : '36px 32px',
            minHeight: isTall ? 420 : isWide ? 220 : 280,
          }}>
          {/* 顶部强调线 */}
          <div className="absolute top-0 left-0 right-0 transition-all duration-700"
            style={{ height: 2, background: feature.accent, opacity: 0, transform: 'scaleX(0)', transformOrigin: 'left' }} />
          <style>{`
            .group:hover .accent-line-${index} { opacity: 1; transform: scaleX(1); }
          `}</style>
          <div className={`accent-line-${index} absolute top-0 left-0 right-0 transition-all duration-700`}
            style={{ height: 2, background: feature.accent }} />

          {/* 图标 — 巨大 */}
          <div className="mb-6 transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-1"
            style={{ fontSize: isTall ? 64 : 48, lineHeight: 1, filter: 'grayscale(0.3)' }}>
            {feature.icon}
          </div>

          {/* 标题 */}
          <h3 className="font-bold mb-2" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: isTall ? 32 : isWide ? 28 : 24,
            color: '#fafafa',
            lineHeight: 1.2,
          }}>
            {feature.title}
          </h3>

          {/* 副标题 */}
          <p className="text-sm mb-4" style={{ color: feature.accent, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            {feature.sub}
          </p>

          {/* 描述 */}
          <p className="text-sm leading-relaxed" style={{ color: '#71717a', whiteSpace: 'pre-line', lineHeight: 1.8 }}>
            {feature.desc}
          </p>

          {/* 底部箭头 */}
          <div className="absolute bottom-6 right-8 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
            style={{ color: feature.accent, fontSize: 20 }}>
            →
          </div>
        </div>
      </Link>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// 主页
// ═══════════════════════════════════════════════════
export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesBg = useParticles(50, 0);
  const particlesMid = useParticles(20, 1);
  const particlesFg = useParticles(12, 2);
  const quoteIdx = useMemo(() => new Date().getDate() % QUOTES.length, []);

  useEffect(() => {
    setLoaded(true);
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const q = QUOTES[quoteIdx];
  const heroParallax = scrollY * 0.4;
  const heroOpacity = Math.max(0, 1 - scrollY / 800);

  return (
    <div style={{ background: '#09090b', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ═════════════ 背景粒子系统 (三层视差) ═════════════ */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* 远景 — 微小星点 */}
        {particlesBg.map(p => (
          <div key={`bg-${p.id}`} className="absolute rounded-full"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              backgroundColor: p.color, opacity: p.opacity,
              animation: `spirit-float ${p.duration}s ease-in-out infinite ${p.delay}s`,
              transform: `translateY(${-heroParallax * 0.3}px)`,
            }} />
        ))}
        {/* 中景 — 彩色光点 */}
        {particlesMid.map(p => (
          <div key={`mid-${p.id}`} className="absolute rounded-full"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              backgroundColor: p.color, opacity: p.opacity,
              filter: 'blur(1px)',
              animation: `spirit-float ${p.duration}s ease-in-out infinite ${p.delay}s`,
              transform: `translateY(${-heroParallax * 0.6}px)`,
            }} />
        ))}
        {/* 近景 — 大光斑 */}
        {particlesFg.map(p => (
          <div key={`fg-${p.id}`} className="absolute rounded-full"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              backgroundColor: p.color, opacity: p.opacity,
              filter: 'blur(3px)',
              animation: `spirit-float ${p.duration}s ease-in-out infinite ${p.delay}s`,
              transform: `translateY(${-heroParallax}px)`,
            }} />
        ))}
      </div>

      {/* ═════════════ 海洋波浪 — 横向线条 ═════════════ */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{
            position: 'absolute',
            bottom: `${30 + i * 50 + Math.sin(scrollY * 0.001 + i) * 20}px`,
            left: 0, right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, rgba(226,182,79,${0.04 + i * 0.015}), transparent)`,
            transform: `translateX(${Math.sin(scrollY * 0.0005 + i) * 30}px)`,
          }} />
        ))}
      </div>

      {/* ════════════════ HERO — 100vh 电影级开场 ════════════════ */}
      <div ref={heroRef} className="relative flex flex-col items-center justify-center"
        style={{ minHeight: '100vh', zIndex: 10, opacity: heroOpacity }}>
        
        {/* 大几何装饰 — 左上 */}
        <div className="absolute top-[15%] left-[5%] md:left-[12%]"
          style={{ transform: `translateY(${-heroParallax * 0.5}px)` }}>
          <div className="w-20 h-20 md:w-32 md:h-32 rotate-45 opacity-[0.04]"
            style={{ border: '2px solid #e2b64f', borderRadius: 2 }} />
          <div className="w-12 h-12 md:w-20 md:h-20 rotate-45 opacity-[0.06] absolute top-4 left-4"
            style={{ border: '1px solid #7eb8da', borderRadius: 1 }} />
        </div>

        {/* 大几何装饰 — 右下 */}
        <div className="absolute bottom-[20%] right-[5%] md:right-[12%]"
          style={{ transform: `translateY(${heroParallax * 0.3}px)` }}>
          <div className="w-24 h-24 md:w-40 md:h-40 rotate-12 opacity-[0.03]"
            style={{ border: '2px solid #c47868', borderRadius: 2 }} />
        </div>

        {/* 油屋 — 中景，大幅 */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2"
          style={{ transform: `translate(-50%, ${-heroParallax * 0.2}px)`, opacity: 0.25 }}>
          <div style={{ width: 200, height: 180, position: 'relative' }}>
            {/* 塔尖 */}
            <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:4, height:20, background:'#e2b64f', opacity:0.4 }} />
            {/* 顶层 */}
            <div style={{ position:'absolute', top:20, left:'50%', transform:'translateX(-50%)', width:50, height:30, background:'#1c1c21', border:'1px solid #27272a', borderRadius:'2px 2px 0 0' }} />
            {/* 主体 */}
            <div style={{ position:'absolute', top:50, left:'50%', transform:'translateX(-50%)', width:180, height:130, background:'#131316', border:'1px solid #27272a', borderRadius:1 }}>
              {/* 窗户 — 温暖灯光 */}
              {[[15,15,12,7],[15,40,12,7],[55,15,12,7],[55,40,12,7],[90,15,12,7],[90,40,12,7],[35,70,18,12],[75,70,18,12]].map(([x,y,w,h], i) => (
                <div key={i} style={{ position:'absolute', left:x, top:y, width:w, height:h,
                  background:'rgba(226,182,79,0.06)', border:'1px solid rgba(226,182,79,0.06)', borderRadius:1 }} />
              ))}
            </div>
            {/* 红桥 */}
            <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:100, height:5, background:'#c47868', opacity:0.3, borderRadius:1 }} />
            {/* 灯笼 */}
            <div style={{ position:'absolute', bottom:8, left:-8, width:10, height:14, background:'#e2b64f', borderRadius:'50%', opacity:0.5, boxShadow:'0 0 20px rgba(226,182,79,0.3)' }} />
            <div style={{ position:'absolute', bottom:12, right:-8, width:10, height:14, background:'#e2b64f', borderRadius:'50%', opacity:0.5, boxShadow:'0 0 20px rgba(226,182,79,0.3)' }} />
          </div>
        </div>

        {/* ── 主标题 ── */}
        <div className={`text-center transition-all duration-1500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* 小标签 */}
          <div className="mb-8">
            <span className="text-xs tracking-[0.3em] uppercase"
              style={{ color: 'rgba(226,182,79,0.5)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.4em' }}>
              油屋 · 夢の解析
            </span>
          </div>

          {/* DREAMLAB — 巨大标题 */}
          <h1 className="font-bold leading-none mb-4 tracking-tighter"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(56px, 12vw, 140px)',
              background: 'linear-gradient(180deg, #fafafa 0%, #71717a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            DreamLab
          </h1>

          {/* 日文副标题 */}
          <p className="mb-6" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(18px, 3vw, 32px)',
            color: '#52525b',
          }}>
            千 と 千 尋 の 夢 の 解 析
          </p>

          {/* 分割线 */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 md:w-24" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(226,182,79,0.3))' }} />
            <div style={{ width: 4, height: 4, background: '#e2b64f', borderRadius: '50%' }} />
            <div className="w-16 md:w-24" style={{ height: 1, background: 'linear-gradient(90deg, rgba(226,182,79,0.3), transparent)' }} />
          </div>

          {/* 描述 */}
          <p className="max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-10"
            style={{ color: '#71717a', fontFamily: 'Inter, sans-serif' }}>
            穿过油屋的层层迷雾，在梦境的最深处<br/>
            找回被遗忘的名字与真实的自己
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/assessments"
              className="transition-all duration-500 hover:scale-105"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '16px 36px', background: '#e2b64f', color: '#09090b',
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
                borderRadius: 2, letterSpacing: '0.05em',
              }}>
              契约之镜 🪞
            </Link>
            <Link href="/companion"
              className="transition-all duration-500 hover:scale-105"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '16px 36px', background: 'transparent', color: '#a1a1aa',
                fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14,
                border: '1px solid #27272a', borderRadius: 2, letterSpacing: '0.05em',
              }}>
              安静陪伴 👤
            </Link>
          </div>
        </div>

        {/* 向下滚动引导 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float-slower"
          style={{ opacity: heroOpacity }}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.2em]" style={{ color: '#52525b' }}>滚动探索</span>
            <div style={{ width: 1, height: 32, background: 'linear-gradient(180deg, rgba(226,182,79,0.3), transparent)' }} />
          </div>
        </div>
      </div>

      {/* ════════════════ 引用区块 — 全宽 ════════════════ */}
      <div className="relative py-32 md:py-48" style={{ zIndex: 10 }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-bold leading-tight mb-4" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(24px, 4vw, 42px)',
            color: '#fafafa',
            lineHeight: 1.5,
          }}>
            「{q.quote}」
          </p>
          <p className="text-sm" style={{ color: '#52525b', fontFamily: 'Inter, sans-serif' }}>
            —— {q.author} · 今日梦境
          </p>
        </div>
      </div>

      {/* ════════════════ 功能卡片 — 非对称网格 ════════════════ */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pb-40" style={{ zIndex: 10 }}>
        {/* 区域标题 */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-4">
            <div style={{ width: 40, height: 1, background: '#27272a' }} />
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(226,182,79,0.5)', fontFamily: 'Inter, sans-serif' }}>
              探索油屋
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: '#fafafa',
            lineHeight: 1.2,
          }}>
            每一层，都是一扇<br/>通往内心的门
          </h2>
        </div>

        {/* 非对称网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-auto">
          {FEATURES.map((f, i) => (
            <div key={f.href}
              className={f.size === 'wide' ? 'md:col-span-2' : f.size === 'tall' ? 'md:row-span-2' : ''}>
              <FeatureCard feature={f} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════ CTA区块 — 全宽 ════════════════ */}
      <div className="relative py-32 md:py-48" style={{ zIndex: 10, background: '#0c0c0e' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="mb-8">
            <span className="text-5xl md:text-7xl">🏯</span>
          </div>
          <h2 className="font-bold mb-6" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#fafafa',
            lineHeight: 1.3,
          }}>
            在油屋的深处<br/>找回你真正的名字
          </h2>
          <p className="max-w-xl mx-auto mb-10 text-base leading-relaxed" style={{ color: '#71717a' }}>
            汤婆婆的契约之镜映照真实的内心 · 无脸男安静倾听未说出口的情绪<br/>
            河神净化疲惫的心灵 · 白龙引领找回最初的自己
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/assessments"
              className="transition-all duration-500 hover:scale-105"
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'16px 36px', background:'#e2b64f', color:'#09090b', fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:14, borderRadius:2, letterSpacing:'0.05em' }}>
              🪞 开始探索
            </Link>
            <Link href="/courses"
              className="transition-all duration-500 hover:scale-105"
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'16px 36px', background:'transparent', color:'#a1a1aa', fontFamily:'Inter, sans-serif', fontWeight:500, fontSize:14, border:'1px solid #27272a', borderRadius:2, letterSpacing:'0.05em' }}>
              📜 先学理论
            </Link>
          </div>
        </div>
      </div>

      {/* ════════════════ 页脚 ════════════════ */}
      <div className="relative py-16 text-center" style={{ zIndex: 10 }}>
        <p style={{ color: '#3f3f46', fontSize: 12 }}>
          DreamLab · 千と千尋の夢の解析 · 2026
        </p>
        <p className="mt-2" style={{ color: '#27272a', fontSize: 11 }}>
          梦是一面镜子，照见被遗忘的那个自己
        </p>
      </div>
    </div>
  );
}
