'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const FEATURES = [
  {
    href: '/assessments',
    title: '专业心理测评',
    desc: '6 套标准化临床量表，AI 智能解读，看见真实的自己。',
    accent: '#c4554d',
    metric: '6',
    metricLabel: '专业量表',
  },
  {
    href: '/companion',
    title: 'AI 心灵陪伴',
    desc: '基于 CBT 框架的共情对话，无需担心被评判。',
    accent: '#6b5b8a',
    metric: '24/7',
    metricLabel: '随时陪伴',
  },
  {
    href: '/dream',
    title: '梦境解析',
    desc: '弗洛伊德、荣格、现代科学、东方智慧——四重视角解码潜意识。',
    accent: '#d4a853',
    metric: '4',
    metricLabel: '解读维度',
  },
  {
    href: '/knowledge',
    title: '证据级知识库',
    desc: '同行评审心理学文献 + 交互测验，科学不枯燥。',
    accent: '#3b8b7a',
    metric: '12',
    metricLabel: '精选文章',
  },
  {
    href: '/wellness',
    title: '心智健康工坊',
    desc: '引导冥想、呼吸练习、感恩日记——给心灵一个温柔的港湾。',
    accent: '#5a7d9a',
    metric: '5',
    metricLabel: '实用工具',
  },
  {
    href: '/community',
    title: '互助社区',
    desc: '匿名分享，温暖陪伴。你从不孤单。',
    accent: '#c4554d',
    metric: '100+',
    metricLabel: '社区成员',
  },
];

const VALUE_PROPS = [
  {
    title: '科学循证',
    desc: '每一个量表都是经过数十年同行评审验证的临床工具。没有伪科学，没有星座运势——只有严谨的心理测量学。',
    accent: '#d4a853',
  },
  {
    title: 'AI 深度洞察',
    desc: 'DeepSeek 提供超越分数的个性化解读。我们帮你理解的不仅是数字，更是数字背后关于你的故事。',
    accent: '#3b8b7a',
  },
  {
    title: '为人而设计',
    desc: '心理学不必冷冰冰。我们把循证工具包裹在千与千寻油屋的温暖里——因为疗愈，应该像回家一样。',
    accent: '#6b5b8a',
  },
];

export default function HomePage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <div style={{ background: '#0a0a0c' }}>
      {/* ════════════════ HERO ════════════════ */}
      <section
        className={`section-lg transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ paddingTop: 48, paddingBottom: 64 }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212,168,83,0.06), transparent 70%)',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />

        <div className="relative z-10 text-center px-4">
          {/* Label */}
          <p
            className="mb-4"
            style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(212,168,83,0.5)',
            }}
          >
            循证心理 · AI 驱动 · 临床级量表
          </p>

          {/* Headline */}
          <h1
            className="mb-2"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontWeight: 700,
              fontSize: 'clamp(44px, 11vw, 80px)',
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
              color: '#f4f4f6',
            }}
          >
            读懂你的
            <br />
            <span style={{ color: '#d4a853' }}>内心世界</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mb-10 max-w-md mx-auto"
            style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              fontSize: 16,
              lineHeight: 1.7,
              color: '#a1a1aa',
            }}
          >
            基于标准化心理测评、AI 深度解读与循证知识库
            构建的心理学综合平台
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link href="/assessments" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: 16 }}>
              开始测评 →
            </Link>
            <Link href="/bathhouse" className="btn btn-ghost">
              探索油屋
            </Link>
          </div>

          {/* Trust indicators */}
          <div
            className="inline-flex items-center gap-12 px-10 py-6"
            style={{
              background: 'rgba(24,24,27,0.5)',
              border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: 16,
            }}
          >
            {[
              { value: '6', label: '临床量表' },
              { value: '12', label: '精选文章' },
              { value: '4', label: '解读维度' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 28, fontWeight: 700, color: '#d4a853' }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: 10, fontWeight: 500, color: '#71717a', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ FEATURES ════════════════ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <div style={{ width: 24, height: 1, background: 'rgba(212,168,83,0.15)' }} />
            <span className="t-label">平台功能</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURES.map((f, i) => (
              <Link
                key={f.href}
                href={f.href}
                className="card card-interactive group"
                style={{ animation: `fade-up 0.4s ease-out ${i * 0.05}s both` }}
              >
                {/* Accent line */}
                <div
                  className="mb-5 transition-all duration-300"
                  style={{ width: 28, height: 3, background: f.accent, borderRadius: 2 }}
                />

                {/* Title */}
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#f4f4f6',
                  }}
                >
                  {f.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-5 text-sm leading-relaxed"
                  style={{ color: '#71717a' }}
                >
                  {f.desc}
                </p>

                {/* Metric */}
                <div className="flex items-baseline gap-2 mt-auto">
                  <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 22, fontWeight: 700, color: f.accent }}>
                    {f.metric}
                  </span>
                  <span className="t-caption">{f.metricLabel}</span>
                </div>

                {/* Arrow on hover */}
                <div
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ color: f.accent, fontSize: 18 }}
                >
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ VALUE PROPS ════════════════ */}
      <section className="section-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 24, height: 1, background: 'rgba(212,168,83,0.15)' }} />
            <span className="t-label">为什么选择 DreamLab</span>
          </div>
          <h2 className="t-display mb-3">科学 × 温度</h2>
          <p className="t-body mb-10 max-w-lg">
            我们不只给你一个分数——我们帮你理解，这些数字对你的生活意味着什么。
          </p>

          <div className="space-y-3">
            {VALUE_PROPS.map((vp, i) => (
              <div
                key={i}
                className="card"
                style={{
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                  animation: `fade-up 0.4s ease-out ${i * 0.08}s both`,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 40,
                    background: vp.accent,
                    borderRadius: 2,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <h3 className="t-subtitle mb-1">{vp.title}</h3>
                  <p className="t-caption" style={{ lineHeight: 1.7 }}>{vp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ EXPLORE ════════════════ */}
      <section className="section" style={{ paddingBottom: 48 }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: 24, height: 1, background: 'rgba(212,168,83,0.15)' }} />
            <span className="t-label">继续探索</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { href: '/bathhouse', label: '油屋广场', desc: '千与千寻世界', accent: '#c4554d' },
              { href: '/spirited', label: '千寻之旅', desc: '五层梦境冒险', accent: '#d4a853' },
              { href: '/courses', label: '系统课程', desc: '弗洛伊德 · 荣格 · 现代科学', accent: '#6b5b8a' },
              { href: '/profile/milestones', label: '成长轨迹', desc: '记录你的心理成长', accent: '#3b8b7a' },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="card card-interactive"
                style={{ padding: '18px 20px', animation: `fade-up 0.4s ease-out ${i * 0.06 + 0.3}s both` }}
              >
                <div className="flex items-center gap-3">
                  <div style={{ width: 4, height: 4, background: item.accent, borderRadius: '50%' }} />
                  <div>
                    <p className="t-subtitle" style={{ fontSize: 14 }}>{item.label}</p>
                    <p className="t-caption" style={{ fontSize: 11 }}>{item.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
