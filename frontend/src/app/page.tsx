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
];

function useSpirits(count: number) {
  return useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i, x: 5 + Math.random() * 90, y: 5 + Math.random() * 90,
    size: 1.5 + Math.random() * 3,
    color: ['#7eb8da', '#c47868', '#e2b64f', '#9b8ab8', '#8aaf9d'][i % 5],
    delay: Math.random() * 8, duration: 6 + Math.random() * 10,
  })), [count]);
}

const ENTRIES = [
  { href: '/assessments', icon: '🪞', title: '契约之镜', sub: '心理测评',
    desc: 'SAS · SDS · 大五人格 · SCL-90',
    colors: { from: '#e2b64f', to: '#c49a3c', glow: 'rgba(226,182,79,0.08)', text: '#e2b64f' },
    badge: '科学', badgeClass: 'badge-gold' },
  { href: '/companion', icon: '👤', title: '无脸男的倾听', sub: '心灵陪伴',
    desc: 'CBT 共情对话 · 安静守护',
    colors: { from: '#7eb8da', to: '#9b8ab8', glow: 'rgba(126,184,218,0.08)', text: '#7eb8da' },
    badge: '温暖', badgeClass: 'badge-ocean' },
  { href: '/wellness', icon: '♨️', title: '河神的净化汤', sub: '健康工具箱',
    desc: '冥想 · 呼吸 · 情绪 · 感恩',
    colors: { from: '#8aaf9d', to: '#5c8a6e', glow: 'rgba(138,175,157,0.08)', text: '#8aaf9d' },
    badge: '疗愈', badgeClass: 'badge-mint' },
  { href: '/spirited', icon: '🏯', title: '油屋探险', sub: '千寻之旅',
    desc: '5 层梦境 · 对话探索',
    colors: { from: '#c47868', to: '#a06050', glow: 'rgba(196,120,104,0.08)', text: '#c47868' },
    badge: '冒险', badgeClass: 'badge-coral' },
  { href: '/courses', icon: '📜', title: '梦学殿堂', sub: '系统课程',
    desc: '弗洛伊德 · 荣格 · 现代 · 东方',
    colors: { from: '#7eb8da', to: '#5a8aaa', glow: 'rgba(126,184,218,0.08)', text: '#7eb8da' },
    badge: '学习', badgeClass: 'badge-ocean' },
  { href: '/dream', icon: '🌙', title: '梦境工坊', sub: '记录解析',
    desc: '四重视角 · AI 深度分析',
    colors: { from: '#9b8ab8', to: '#7a6a98', glow: 'rgba(155,138,184,0.08)', text: '#9b8ab8' },
    badge: '创造', badgeClass: 'badge-lavender' },
];

export default function HomePage() {
  const [visible, setVisible] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const spirits = useSpirits(35);

  useEffect(() => {
    setVisible(true);
    setQuoteIdx(new Date().getDate() % DREAM_QUOTES.length);
  }, []);

  const q = DREAM_QUOTES[quoteIdx];

  return (
    <div className="ocean-bg min-h-screen relative">
      {/* 星空 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 70}%`,
              width: `${1 + Math.random()}px`, height: `${1 + Math.random()}px`,
              background: i % 5 === 0 ? 'rgba(226,182,79,0.3)' : 'rgba(255,255,255,0.15)',
              animation: `twinkle ${3 + Math.random() * 6}s infinite ${Math.random() * 4}s`,
            }} />
        ))}
      </div>

      {/* 海洋波浪 */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ bottom: '-5%' }}>
        <div className="ocean-waves">
          <div className="ocean-wave" />
          <div className="ocean-wave" />
          <div className="ocean-wave" />
        </div>
      </div>

      {/* 光灵 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {spirits.map(s => (
          <div key={s.id} className="spirit-particle spirit-light"
            style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: `${s.size}px`, height: `${s.size}px`,
              backgroundColor: s.color,
              animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s`,
            }} />
        ))}
      </div>

      {/* 油屋 — 极简版 */}
      <div className="fixed right-[3%] bottom-[10%] pointer-events-none z-[1] hidden lg:block"
        style={{ opacity: 0.3 }}>
        <div className="bathhouse">
          <div style={{ width: 36, height: 24, background: '#1c1c21', border: '1px solid #27272a', borderRadius: '2px 2px 0 0' }} />
          <div className="bathhouse-body">
            {[[12,12,10,6],[12,35,10,6],[48,12,10,6],[48,35,10,6],[82,12,10,6],[82,35,10,6],[32,55,16,10],[72,55,16,10]].map(([x,y,w,h], i) => (
              <div key={i} style={{ position:'absolute', left:x, top:y, width:w, height:h,
                background:'rgba(226,182,79,0.08)', border:'1px solid rgba(226,182,79,0.08)', borderRadius:1 }} />
            ))}
          </div>
          <div className="bathhouse-bridge" />
          <div style={{ position:'absolute', bottom:6, left:-14 }}><div className="lantern" /></div>
          <div style={{ position:'absolute', bottom:10, right:-12 }}><div className="lantern" style={{ animationDelay:'1.5s' }} /></div>
        </div>
      </div>

      {/* 纪念碑谷几何 */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
        <div className="geo-platform" style={{ position:'absolute', left:'3%', top:'18%', width:50, height:50, transform:'rotate(12deg)' }} />
        <div style={{ position:'absolute', right:'20%', bottom:'28%', width:30, height:30, transform:'rotate(45deg)', border:'1px solid rgba(226,182,79,0.06)' }} />
      </div>

      {/* ── 主内容 ── */}
      <div className={`relative z-10 max-w-5xl mx-auto px-4 pt-8 md:pt-6 pb-32 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>

        {/* Hero */}
        <div className="text-center mb-10 animate-card-rise">
          <div className="inline-block mb-5 relative">
            <div style={{ width:64, height:64, margin:'0 auto', position:'relative' }}>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:32, height:32, transform:'rotate(45deg)', borderRadius:2,
                  background:'linear-gradient(135deg, rgba(226,182,79,0.15), rgba(126,184,218,0.06))',
                  border:'1px solid rgba(226,182,79,0.12)' }} />
                <div className="absolute text-2xl">🏯</div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-3 tracking-tight" style={{ fontFamily:"'Noto Serif SC', serif" }}>
            <span className="gradient-text">DreamLab</span>
          </h1>
          <p className="text-[#a1a1aa] text-lg mb-2" style={{ fontFamily:"'Noto Serif SC', serif" }}>
            千と千尋の夢の解析
          </p>
          <p className="text-[#71717a] text-sm max-w-lg mx-auto leading-relaxed">
            穿过油屋的层层迷雾 · 找回被遗忘的名字
          </p>
        </div>

        {/* 今日语录 */}
        <div className="mb-12 text-center animate-card-rise" style={{ animationDelay:'0.1s' }}>
          <div className="inline-block relative px-6 py-3">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor:'rgba(226,182,79,0.12)' }} />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor:'rgba(226,182,79,0.12)' }} />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor:'rgba(226,182,79,0.12)' }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor:'rgba(226,182,79,0.12)' }} />
            <p className="text-[#a1a1aa] text-base italic leading-relaxed max-w-md mx-auto" style={{ fontFamily:"'Noto Serif SC', serif" }}>
              「{q.quote}」
            </p>
            <p className="text-[#71717a] text-xs mt-2">—— {q.author} · 今日梦境</p>
          </div>
        </div>

        {/* 入口卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {ENTRIES.map((card, i) => (
            <Link key={card.href} href={card.href}
              className="group relative block animate-card-rise"
              style={{ animationDelay: `${0.12 + i * 0.06}s`, touchAction:'manipulation' }}>
              <div className="geo-card p-5 relative overflow-hidden"
                style={{ background:'var(--bg-surface)', borderColor:'var(--border-card)' }}>
                {/* 顶部细线 */}
                <div className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background:`linear-gradient(90deg, transparent, ${card.colors.from}40, transparent)` }} />

                <div className="relative z-10">
                  <div className="w-10 h-10 mb-4 flex items-center justify-center text-lg transition-all duration-400 group-hover:scale-110"
                    style={{ background: card.colors.glow, borderRadius:3 }}>
                    <span>{card.icon}</span>
                  </div>
                  <h3 className="text-base font-bold mb-1" style={{ color:'#fafafa', fontFamily:"var(--font-sans)" }}>
                    {card.title}
                  </h3>
                  <p className="text-xs mb-1" style={{ color: card.colors.text }}>{card.sub}</p>
                  <p className="text-[11px] text-[#71717a] leading-relaxed mb-3">{card.desc}</p>
                  <span className={`badge-geo ${card.badgeClass}`}>{card.badge}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 引导区 */}
        <div className="relative overflow-hidden mb-10 animate-card-rise"
          style={{ animationDelay:'0.5s', background:'var(--bg-surface)', border:'1px solid var(--border-card)', borderRadius:4 }}>
          <div className="relative z-10 text-center p-8 md:p-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-xs tracking-[0.2em]" style={{ color:'rgba(226,182,79,0.5)' }}>油 屋 の 案 内</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color:'#fafafa', fontFamily:"'Noto Serif SC', serif" }}>
              在油屋的每一层，找到被遗忘的自己
            </h2>
            <p className="max-w-2xl mx-auto leading-relaxed text-sm" style={{ color:'#a1a1aa' }}>
              汤婆婆的契约之镜映照真实的内心 · 无脸男安静倾听未说出口的情绪<br/>
              河神净化疲惫的心灵 · 白龙引领找回最初的自己
            </p>
            <div className="flex justify-center gap-3 mt-7">
              <Link href="/assessments" className="btn-geo px-6 py-2.5 text-sm">🪞 契约之镜 →</Link>
              <Link href="/companion" className="btn-geo-ghost px-6 py-2.5 text-sm">👤 安静陪伴 →</Link>
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <div className="text-center animate-card-rise" style={{ animationDelay:'0.6s' }}>
          <div className="inline-flex items-center gap-3" style={{ color:'#52525b', fontSize:'12px' }}>
            <span className="w-4 h-px bg-white/4" />
            DreamLab · 千と千尋の夢の解析 · 2026
            <span className="w-4 h-px bg-white/4" />
          </div>
          <p className="text-[11px] mt-2" style={{ color:'#3f3f46' }}>梦是一面镜子，照见被遗忘的那个自己</p>
        </div>
      </div>
    </div>
  );
}
