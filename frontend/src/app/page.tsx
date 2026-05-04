'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const FEATURES = [
  { title: '心理测评', desc: '6大国际标准量表，AI深度解读', href: '/assessments', icon: '🪞', color: '#e8a820' },
  { title: 'AI陪伴', desc: '无脸男安静倾听每一份情绪', href: '/companion', icon: '👤', color: '#4a90b8' },
  { title: '梦境解析', desc: '四重视角，探索潜意识', href: '/dream', icon: '🌙', color: '#8b7ab8' },
  { title: '互助社区', desc: '匿名分享，彼此温暖', href: '/community', icon: '🏮', color: '#c0392b' },
  { title: '知识库', desc: '12篇同行评审科普', href: '/knowledge', icon: '📚', color: '#6b9e7a' },
  { title: '健康工具', desc: '冥想·呼吸·感恩日记', href: '/wellness', icon: '🧘', color: '#1e8568' },
];

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <div style={{ background: '#060f18' }}>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className={`m-section transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ paddingTop: 40, paddingBottom: 48 }}>

        {/* Ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,168,32,0.06), transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />

        <div className="relative z-10 text-center">
          {/* Label */}
          <div className="m-label mb-4" style={{ color: 'rgba(232,168,32,0.5)' }}>
            油屋 · 夢の解析
          </div>

          {/* Title */}
          <h1 className="m-title mb-3" style={{ fontSize: 36, letterSpacing: '-0.02em' }}>
            DreamLab
          </h1>
          <p className="m-body mb-10" style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 320, margin: '0 auto 40px' }}>
            基于标准化评估与AI深度解读<br/>探索你内心世界的建筑学
          </p>

          {/* CTA */}
          <Link href="/assessments"
            className="m-btn m-btn-primary"
            style={{ display: 'inline-flex', padding: '16px 40px', fontSize: 16, borderRadius: 14 }}>
            开始第一次测评 →
          </Link>

          {/* Trust badges */}
          <div className="flex justify-center gap-8 mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            {[
              { value: '6', label: '标准量表' },
              { value: '12', label: '同行评审' },
              { value: '4', label: '理论视角' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="m-subtitle" style={{ color: '#f5efe0', fontSize: 22 }}>{s.value}</div>
                <div className="m-caption mt-1" style={{ color: 'rgba(232,168,32,0.5)', fontSize: 10 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="m-section">
        <div className="flex items-center gap-3 mb-6">
          <div style={{ width: 20, height: 1, background: 'rgba(232,168,32,0.15)' }} />
          <span className="m-label" style={{ color: 'rgba(232,168,32,0.5)' }}>平台功能</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((f, i) => (
            <Link key={f.href} href={f.href}
              className="m-card m-card-interactive flex flex-col items-center text-center"
              style={{ animation: `card-rise 0.4s ease-out ${i * 0.06}s both` }}>
              <span style={{ fontSize: 32, marginBottom: 12, lineHeight: 1 }}>{f.icon}</span>
              <h3 className="m-subtitle mb-1" style={{ fontSize: 15 }}>{f.title}</h3>
              <p className="m-caption" style={{ fontSize: 11 }}>{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════ VALUE PROPS ═══════════════ */}
      <section className="m-section">
        <h2 className="m-title mb-2" style={{ fontSize: 20 }}>为什么选择 DreamLab</h2>
        <p className="m-body mb-6" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          科学严谨，人文温暖——我们不只给你分数，更帮你理解分数背后的意义。
        </p>
        <div className="space-y-3">
          {[
            { title: '科学基础', desc: '每项量表都是经过数十年同行评审验证的临床工具', accent: '#e8a820' },
            { title: 'AI深度解读', desc: 'DeepSeek驱动，不仅告诉你数字，更告诉你这些数字对你意味着什么', accent: '#4a90b8' },
            { title: '为人而设计', desc: '我们不认为心理学就该冷冰冰——疗愈应该感觉温暖', accent: '#c0392b' },
          ].map((item, i) => (
            <div key={i} className="m-card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 4, height: 32, background: item.accent, borderRadius: 2, marginTop: 4, flexShrink: 0 }} />
              <div>
                <h3 className="m-subtitle mb-1" style={{ fontSize: 15 }}>{item.title}</h3>
                <p className="m-caption" style={{ fontSize: 13 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ EXPLORE LINKS ═══════════════ */}
      <section className="m-section" style={{ paddingBottom: 48 }}>
        <div className="flex items-center gap-3 mb-5">
          <div style={{ width: 20, height: 1, background: 'rgba(232,168,32,0.15)' }} />
          <span className="m-label" style={{ color: 'rgba(232,168,32,0.5)' }}>继续探索</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { href: '/bathhouse', label: '油屋大厅', icon: '🏯' },
            { href: '/spirited', label: '千寻之旅', icon: '🐉' },
            { href: '/courses', label: '系统课程', icon: '📜' },
            { href: '/profile/milestones', label: '成长记录', icon: '✨' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className="m-card m-card-interactive flex items-center gap-3"
              style={{ padding: '16px 20px' }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <span className="m-subtitle" style={{ fontSize: 14 }}>{item.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
