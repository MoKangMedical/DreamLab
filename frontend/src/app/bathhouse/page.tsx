'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';

/* ═══════════════════════════════════════════════════
   千と千尋 · 油屋 — Spirited Away Cinematic Landing
   电影级粒子 · 浮动汉字 · 油屋建筑 · 灯笼摇曳
   ═══════════════════════════════════════════════════ */

const QUOTES = [
  { quote: '曾经发生过的事情不会忘记，只是想不起来而已', author: '钱婆婆' },
  { quote: '我不知道将去何方，但我已在路上', author: '千寻' },
  { quote: '名字一旦被夺走，就再也找不到回家的路了', author: '白龙' },
];

function useParticles(count: number) {
  return useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 3,
    opacity: 0.06 + Math.random() * 0.15,
    color: ['#e8a820', '#4a90b8', '#c0392b', '#8b7ab8', '#6b9e7a', '#f5efe0'][i % 6],
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 15,
    drift: (Math.random() - 0.5) * 20,
  })), [count]);
}

const FEATURES = [
  { href: '/assessments', icon: '🪞', title: '契约之镜', sub: '6 大标准心理量表', desc: 'SAS · SDS · 大五人格 · SCL-90\nPSQI · CD-RISC · AI 深度解读', accent: '#e8a820', size: 'tall' },
  { href: '/companion', icon: '👤', title: '无脸男的倾听', sub: 'CBT 共情 AI 陪伴', desc: '深度共情对话 · 危机识别\n安静守护每一份情绪', accent: '#4a90b8', size: 'normal' },
  { href: '/wellness', icon: '♨️', title: '河神的净化汤', sub: '心智健康工具箱', desc: '引导冥想 · 呼吸训练\n情绪仪表盘 · 感恩日记', accent: '#6b9e7a', size: 'normal' },
  { href: '/knowledge', icon: '📚', title: '证据级知识库', sub: '心理学百科', desc: '12篇同行评审科普 · CBT\n正念 · 依恋理论 · 神经科学', accent: '#c0392b', size: 'wide' },
  { href: '/spirited', icon: '🏯', title: '油屋探险', sub: '千寻的成长之旅', desc: '5 层梦境场景\n对话探索 · 收集钥匙', accent: '#c0392b', size: 'tall' },
  { href: '/courses', icon: '📜', title: '梦学殿堂', sub: '系统心理学课程', desc: '弗洛伊德 · 荣格\n现代科学 · 东方智慧', accent: '#8b7ab8', size: 'normal' },
  { href: '/dream', icon: '🌙', title: '梦境工坊', sub: 'AI 梦境深度解析', desc: '四重视角 · 潜意识探索\n记录每一场心灵旅程', accent: '#e8a820', size: 'normal' },
];

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
            background: '#0d1a28',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: isTall ? '48px 36px' : isWide ? '40px 36px' : '36px 32px',
            minHeight: isTall ? 420 : isWide ? 220 : 280,
          }}>
          <div className={`accent-line-${index} absolute top-0 left-0 right-0 transition-all duration-700`}
            style={{ height: 2, background: feature.accent }} />
          <style>{`.group:hover .accent-line-${index} { opacity: 1; } .accent-line-${index} { opacity: 0; }`}</style>

          <div className="mb-6 transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-1"
            style={{ fontSize: isTall ? 64 : 48, lineHeight: 1, filter: 'grayscale(0.3)' }}>
            {feature.icon}
          </div>
          <h3 className="font-bold mb-2" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: isTall ? 32 : isWide ? 28 : 24,
            color: '#f5efe0', lineHeight: 1.2,
          }}>{feature.title}</h3>
          <p className="text-sm mb-4" style={{ color: feature.accent, fontWeight: 500 }}>{feature.sub}</p>
          <p className="text-sm leading-relaxed" style={{ color: '#7a7062', whiteSpace: 'pre-line', lineHeight: 1.8 }}>{feature.desc}</p>
          <div className="absolute bottom-6 right-8 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
            style={{ color: feature.accent, fontSize: 20 }}>→</div>
        </div>
      </Link>
    </div>
  );
}

// ════════════════ 主页 ════════════════
export default function BathhousePage() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesBg = useParticles(50);
  const particlesMid = useParticles(20);
  const particlesFg = useParticles(12);
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
    <div style={{ background: '#060f18', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ════════ 背景粒子系统 (三层视差) ════════ */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
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

      {/* ════════ 浮动灵体汉字 ════════ */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {['夢', '油', '屋', '千', '尋', '霊'].map((char, i) => (
          <div key={char} className="absolute font-bold"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              fontSize: `${24 + i * 8}px`,
              color: ['#e8a820', '#4a90b8', '#c0392b', '#8b7ab8', '#6b9e7a', '#f5efe0'][i],
              opacity: 0.05 + i * 0.015,
              fontFamily: "'Noto Serif SC', serif",
              animation: `float-kanji ${6 + i * 1.5}s ease-in-out infinite ${i * 0.8}s`,
              filter: 'blur(0.5px)',
            }}>
            {char}
          </div>
        ))}
      </div>

      {/* ════════ 几何轨道 ════════ */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {[0, 1, 2].map(i => (
          <div key={`orbit-${i}`} style={{ position: 'absolute', left: '50%', top: '50%' }}>
            <div style={{
              position: 'absolute',
              width: `${8 + i * 6}px`, height: `${8 + i * 6}px`,
              border: '1px solid rgba(232,168,32,0.08)',
              transform: 'rotate(45deg)',
              animation: `geo-orbit ${10 + i * 4}s linear infinite ${i * 2}s`,
              transformOrigin: `${-100 - i * 40}px ${-100 - i * 40}px`,
            }} />
          </div>
        ))}
      </div>

      {/* ════════ HERO ════════ */}
      <div ref={heroRef} className="relative flex flex-col items-center justify-center"
        style={{ minHeight: '100vh', zIndex: 10, opacity: heroOpacity }}>
        
        {/* 几何装饰 — 左上 */}
        <div className="absolute top-[15%] left-[5%] md:left-[12%]"
          style={{ transform: `translateY(${-heroParallax * 0.5}px)` }}>
          <div className="w-20 h-20 md:w-32 md:h-32 rotate-45 opacity-[0.04]"
            style={{ border: '2px solid #e8a820' }} />
          <div className="w-12 h-12 md:w-20 md:h-20 rotate-45 opacity-[0.06] absolute top-4 left-4"
            style={{ border: '1px solid #4a90b8' }} />
        </div>

        {/* 几何装饰 — 右下 */}
        <div className="absolute bottom-[20%] right-[5%] md:right-[12%]"
          style={{ transform: `translateY(${heroParallax * 0.3}px)` }}>
          <div className="w-24 h-24 md:w-40 md:h-40 rotate-12 opacity-[0.03]"
            style={{ border: '2px solid #c0392b' }} />
        </div>

        {/* 油屋 */}
        <a href="/spirited"
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 group cursor-pointer block"
          style={{ transform: `translate(-50%, ${-heroParallax * 0.2}px)`, opacity: 0.2, transition: 'opacity 0.6s' }}
          title="点击进入油屋">
          <style>{`.oil-house:hover { opacity: 0.35 !important; }`}</style>
          <div className="oil-house" style={{ width: 200, height: 180, position: 'relative', transition: 'opacity 0.6s' }}>
            <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:4, height:20, background:'#e8a820', opacity:0.4 }} />
            <div style={{ position:'absolute', top:20, left:'50%', transform:'translateX(-50%)', width:50, height:30, background:'#0d1a28', border:'1px solid rgba(255,255,255,0.06)' }} />
            <div style={{ position:'absolute', top:50, left:'50%', transform:'translateX(-50%)', width:180, height:130, background:'#0a1620', border:'1px solid rgba(255,255,255,0.06)' }}>
              {[[15,15,12,7],[15,40,12,7],[55,15,12,7],[55,40,12,7],[90,15,12,7],[90,40,12,7],[35,70,18,12],[75,70,18,12]].map(([x,y,w,h], i) => (
                <div key={i} style={{ position:'absolute', left:x, top:y, width:w, height:h, background:'rgba(232,168,32,0.05)', border:'1px solid rgba(232,168,32,0.05)' }} />
              ))}
            </div>
            <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:100, height:5, background:'#c0392b', opacity:0.3 }} />
            <div style={{ position:'absolute', bottom:8, left:-8, width:10, height:14, background:'#e8a820', borderRadius:'50%', opacity:0.5, boxShadow:'0 0 20px rgba(232,168,32,0.3)', animation: 'lantern-swing 4s ease-in-out infinite' }} />
            <div style={{ position:'absolute', bottom:12, right:-8, width:10, height:14, background:'#e8a820', borderRadius:'50%', opacity:0.5, boxShadow:'0 0 20px rgba(232,168,32,0.3)', animation: 'lantern-swing 4s ease-in-out 1.5s infinite' }} />
          </div>
        </a>

        {/* 主标题 */}
        <div className={`text-center transition-all duration-1500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="mb-8">
            <span className="text-xs tracking-[0.3em] uppercase"
              style={{ color: 'rgba(232,168,32,0.5)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.4em' }}>
              油屋 · 夢の解析
            </span>
          </div>

          <h1 className="font-bold leading-none mb-4 tracking-tighter"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(56px, 12vw, 140px)',
              background: 'linear-gradient(180deg, #f5efe0 0%, #7a7062 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            DreamLab
          </h1>

          <p className="mb-6" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(18px, 3vw, 32px)',
            color: '#5a5246',
          }}>
            千 と 千 尋 の 夢 の 解 析
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 md:w-24" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(232,168,32,0.3))' }} />
            <div style={{ width: 4, height: 4, background: '#e8a820', borderRadius: '50%' }} />
            <div className="w-16 md:w-24" style={{ height: 1, background: 'linear-gradient(90deg, rgba(232,168,32,0.3), transparent)' }} />
          </div>

          <p className="max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-10"
            style={{ color: '#7a7062', fontFamily: 'Inter, sans-serif' }}>
            穿过油屋的层层迷雾，在梦境的最深处<br/>
            找回被遗忘的名字与真实的自己
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/assessments"
              className="transition-all duration-500 hover:scale-105 inline-flex items-center gap-2 px-9 py-4 text-sm font-semibold"
              style={{ background: '#e8a820', color: '#060f18', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
              契约之镜 🪞
            </Link>
            <Link href="/companion"
              className="transition-all duration-500 hover:scale-105 inline-flex items-center gap-2 px-9 py-4 text-sm font-medium"
              style={{ background: 'transparent', color: '#b8ad9a', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
              安静陪伴 👤
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ opacity: heroOpacity }}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.2em]" style={{ color: '#5a5246' }}>滚动探索</span>
            <div style={{ width: 1, height: 32, background: 'linear-gradient(180deg, rgba(232,168,32,0.3), transparent)' }} />
          </div>
        </div>
      </div>

      {/* ════════ 引用 ════════ */}
      <div className="relative py-32 md:py-48" style={{ zIndex: 10 }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-bold leading-tight mb-4" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(24px, 4vw, 42px)',
            color: '#f5efe0', lineHeight: 1.5,
          }}>
            「{q.quote}」
          </p>
          <p className="text-sm" style={{ color: '#5a5246', fontFamily: 'Inter, sans-serif' }}>
            —— {q.author} · 今日梦境
          </p>
        </div>
      </div>

      {/* ════════ 功能卡片 ════════ */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pb-40" style={{ zIndex: 10 }}>
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-4">
            <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(232,168,32,0.5)', fontFamily: 'Inter, sans-serif' }}>
              探索油屋
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: '#f5efe0', lineHeight: 1.2,
          }}>
            每一层，都是一扇<br/>通往内心的门
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-auto">
          {FEATURES.map((f, i) => (
            <div key={f.href}
              className={f.size === 'wide' ? 'md:col-span-2' : f.size === 'tall' ? 'md:row-span-2' : ''}>
              <FeatureCard feature={f} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* ════════ 价值主张 ════════ */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32" style={{ zIndex: 10 }}>
        <div className="text-center mb-16">
          <h2 style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#f5efe0', lineHeight: 1.3,
          }}>
            为什么需要<br/>探索内心世界？
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🔬', title: '科学依据', desc: '所有量表基于国际标准心理学工具，经过数十年学术验证。不是星座测试，不是娱乐 quiz，而是真正被全球精神科和心理咨询师使用的评估工具。', color: '#e8a820' },
            { icon: '🤖', title: 'AI 深度解读', desc: 'DeepSeek 大模型提供个性化解读，不仅仅给你一个分数，而是帮你理解分数背后的你——为什么会有这些感受，可以怎么做。', color: '#4a90b8' },
            { icon: '🏯', title: '温暖的体验', desc: '以千与千寻为叙事框架，将心理学探索变成一场冒险。你不需要正襟危坐面对白大褂，只需要在油屋里，与无脸男聊聊，照照契约之镜。', color: '#c0392b' },
          ].map((item, i) => (
            <div key={i} className="p-8" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Noto Serif SC', serif", color: item.color }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#7a7062', lineHeight: 1.8 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ════════ CTA ════════ */}
      <div className="relative py-32 md:py-48" style={{ zIndex: 10, background: '#0a1620' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="mb-8"><span className="text-5xl md:text-7xl">🏯</span></div>
          <h2 className="font-bold mb-6" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#f5efe0', lineHeight: 1.3,
          }}>
            在油屋的深处<br/>找回你真正的名字
          </h2>
          <p className="max-w-xl mx-auto mb-10 text-base leading-relaxed" style={{ color: '#7a7062' }}>
            汤婆婆的契约之镜映照真实的内心 · 无脸男安静倾听未说出口的情绪<br/>
            河神净化疲惫的心灵 · 白龙引领找回最初的自己
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/assessments"
              className="inline-flex items-center gap-2 px-9 py-4 text-sm font-semibold transition-all duration-500 hover:scale-105"
              style={{ background: '#e8a820', color: '#060f18', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
              🪞 开始探索
            </Link>
            <Link href="/"
              className="inline-flex items-center gap-2 px-9 py-4 text-sm font-medium transition-all duration-500 hover:scale-105"
              style={{ background: 'transparent', color: '#b8ad9a', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
              ← 返回专业主页
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spirit-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-8px) translateX(4px); opacity: 0.6; }
        }
        @keyframes float-kanji {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.06; }
          25% { transform: translateY(-20px) rotate(3deg); opacity: 0.14; }
          50% { transform: translateY(-8px) rotate(-2deg); opacity: 0.08; }
          75% { transform: translateY(-30px) rotate(1deg); opacity: 0.16; }
        }
        @keyframes geo-orbit {
          0% { transform: rotate(0deg) rotate(45deg); }
          100% { transform: rotate(360deg) rotate(45deg); }
        }
      `}</style>
    </div>
  );
}
