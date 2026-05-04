'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const FEATURES = [
  {
    href: '/assessments',
    title: 'Psychological Assessments',
    desc: '6 standardized clinical scales with AI-powered interpretation.',
    accent: '#c4554d',
    metric: '6',
    metricLabel: 'Scales',
  },
  {
    href: '/companion',
    title: 'AI Companion',
    desc: 'CBT-informed empathetic dialogue. Talk without judgment.',
    accent: '#6b5b8a',
    metric: '24/7',
    metricLabel: 'Available',
  },
  {
    href: '/dream',
    title: 'Dream Analysis',
    desc: 'Four theoretical perspectives to decode your subconscious.',
    accent: '#d4a853',
    metric: '4',
    metricLabel: 'Lenses',
  },
  {
    href: '/knowledge',
    title: 'Knowledge Base',
    desc: 'Peer-reviewed psychology articles with interactive quizzes.',
    accent: '#3b8b7a',
    metric: '12',
    metricLabel: 'Articles',
  },
  {
    href: '/wellness',
    title: 'Wellness Toolkit',
    desc: 'Guided meditation, breathing exercises, gratitude journaling.',
    accent: '#5a7d9a',
    metric: '5',
    metricLabel: 'Tools',
  },
  {
    href: '/community',
    title: 'Community',
    desc: 'Anonymous sharing in a warm, supportive space.',
    accent: '#c4554d',
    metric: '100+',
    metricLabel: 'Members',
  },
];

const VALUE_PROPS = [
  {
    title: 'Science-Backed',
    desc: 'Every scale is a validated clinical instrument with decades of peer-reviewed research behind it. No pseudoscience, no horoscopes — just rigorous psychometrics.',
    accent: '#d4a853',
  },
  {
    title: 'AI-Powered Insight',
    desc: 'DeepSeek provides personalized interpretations that go beyond raw scores. We help you understand not just what the numbers say, but what they mean for you.',
    accent: '#3b8b7a',
  },
  {
    title: 'Designed for Humans',
    desc: 'Psychology doesn\'t have to feel clinical. We\'ve wrapped evidence-based tools in the warmth of Spirited Away\'s bathhouse — because healing should feel like coming home.',
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
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(212,168,83,0.5)',
            }}
          >
            Evidence-Based · AI-Powered · Clinically Informed
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
            Understand Your
            <br />
            <span style={{ color: '#d4a853' }}>Inner World</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mb-10 max-w-md mx-auto"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              lineHeight: 1.7,
              color: '#a1a1aa',
            }}
          >
            A psychology platform built on standardized assessments,
            AI-powered interpretation, and evidence-based knowledge.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link href="/assessments" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: 16 }}>
              Start Assessment →
            </Link>
            <Link href="/bathhouse" className="btn btn-ghost">
              Explore Bathhouse
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
              { value: '6', label: 'Clinical Scales' },
              { value: '12', label: 'Articles' },
              { value: '4', label: 'Theoretical Lenses' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 28, fontWeight: 700, color: '#d4a853' }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500, color: '#71717a', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
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
            <span className="t-label">Platform Features</span>
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
            <span className="t-label">Why DreamLab</span>
          </div>
          <h2 className="t-display mb-3">Science meets warmth</h2>
          <p className="t-body mb-10 max-w-lg">
            We don&apos;t just give you scores — we help you understand what they mean for your life.
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
            <span className="t-label">Continue Exploring</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { href: '/bathhouse', label: 'Bathhouse', desc: 'Spirited Away', accent: '#c4554d' },
              { href: '/spirited', label: 'Spirited Journey', desc: '5-floor adventure', accent: '#d4a853' },
              { href: '/courses', label: 'Courses', desc: 'Freud · Jung · Science', accent: '#6b5b8a' },
              { href: '/profile/milestones', label: 'Growth', desc: 'Track your progress', accent: '#3b8b7a' },
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
