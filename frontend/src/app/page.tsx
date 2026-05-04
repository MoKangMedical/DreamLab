'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════
   DreamLab — Professional International Platform
   Clean · Confident · Spacious
   ═══════════════════════════════════════════════════ */

const STATS = [
  { value: '6', label: 'Standardized Scales', sub: 'SAS · SDS · BFI · PSQI · CD-RISC · SCL-90' },
  { value: '12', label: 'Peer-Reviewed Articles', sub: 'Evidence-based knowledge base' },
  { value: '4', label: 'Theoretical Lenses', sub: 'Freud · Jung · Neuroscience · Eastern' },
];

const FEATURES = [
  {
    title: 'Psychological Assessment',
    desc: 'Six internationally recognized scales with AI-powered interpretation. Not quizzes — clinical-grade tools used by professionals worldwide.',
    href: '/assessments',
    color: '#e8a820',
  },
  {
    title: 'AI Companion',
    desc: 'CBT-informed empathetic dialogue. Your silent listener — always present, never judging. Powered by DeepSeek.',
    href: '/companion',
    color: '#4a90b8',
  },
  {
    title: 'Dream Analysis',
    desc: 'Record and decode your dreams through four theoretical perspectives. Understand the language of your subconscious.',
    href: '/dream',
    color: '#7b5ea8',
  },
  {
    title: 'Evidence Knowledge Base',
    desc: '12 peer-reviewed articles on CBT, mindfulness, attachment theory, and neuroscience. Every claim backed by research.',
    href: '/knowledge',
    color: '#c0392b',
  },
  {
    title: 'Wellness Toolkit',
    desc: 'Guided meditation, breathing exercises, gratitude journaling, and sleep tracking — your daily mental hygiene routine.',
    href: '/wellness',
    color: '#1e8568',
  },
  {
    title: 'Systematic Courses',
    desc: 'Structured learning path from Freud to modern neuroscience. Earn your Dream Analyst certification.',
    href: '/courses',
    color: '#6b4fa0',
  },
];

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div style={{ background: '#060f18', minHeight: '100vh' }}>

      {/* ════════════════════════════════════════════
          HERO — Full Viewport
          ════════════════════════════════════════════ */}
      <section className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: '100vh' }}>

        {/* ── Subtle geometric backdrop ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #e8a820, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full opacity-[0.02]"
            style={{ background: 'radial-gradient(circle, #4a90b8, transparent 70%)', filter: 'blur(80px)' }} />
        </div>

        {/* ── Content ── */}
        <div className={`relative z-10 text-center max-w-4xl mx-auto px-6 transition-all duration-1200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Label */}
          <div className="mb-8">
            <span className="text-xs tracking-[0.3em] uppercase"
              style={{ color: 'rgba(232,168,32,0.6)', fontFamily: 'Inter, sans-serif' }}>
              Evidence-Based · AI-Powered · Clinically Informed
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-bold leading-none mb-6 tracking-tight"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(48px, 9vw, 96px)',
              color: '#f5efe0',
              lineHeight: 1.05,
            }}>
            Understand Your<br/>
            <span style={{ color: '#e8a820' }}>Inner World</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-10"
            style={{ color: '#7a7062', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>
            A psychology platform built on standardized assessments, 
            AI-powered interpretation, and evidence-based knowledge — 
            designed to help you explore the architecture of your mind.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/assessments"
              className="group relative inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold transition-all duration-300"
              style={{
                background: '#e8a820', color: '#060f18',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.03em',
              }}>
              Start Assessment
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/knowledge"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium transition-all duration-300"
              style={{
                background: 'transparent', color: '#b8ad9a',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.03em',
              }}>
              Explore Knowledge Base
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: '#f5efe0', fontFamily: 'Inter, sans-serif' }}>
                  {s.value}
                </div>
                <div className="text-xs tracking-wide uppercase mb-1" style={{ color: '#e8a820' }}>
                  {s.label}
                </div>
                <div className="text-xs" style={{ color: '#5a5246' }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4" style={{ zIndex: 10 }}>
          <Link href="/bathhouse"
            className="text-[10px] tracking-[0.2em] transition-colors duration-300"
            style={{ color: '#5a5246', fontFamily: 'Inter, sans-serif' }}>
            油屋へ · Enter the Bathhouse
          </Link>
          <div className="w-px h-8 mx-auto" style={{ background: 'linear-gradient(180deg, rgba(232,168,32,0.3), transparent)' }} />
          <span className="text-[10px] tracking-[0.3em]" style={{ color: '#3a352e' }}>SCROLL</span>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          FEATURES — Professional Card Grid
          ════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-40">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div style={{ width: 40, height: 1, background: 'rgba(232,168,32,0.2)' }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(232,168,32,0.6)' }}>
                Platform Capabilities
              </span>
            </div>
            <h2 className="font-bold mb-6" style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: '#f5efe0',
              lineHeight: 1.2,
            }}>
              Everything you need to explore<br/>the architecture of your mind
            </h2>
            <p className="max-w-2xl text-base leading-relaxed" style={{ color: '#7a7062', lineHeight: 1.7 }}>
              From clinical-grade assessments to AI-powered dream interpretation — 
              a complete toolkit grounded in decades of psychological research.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: 'rgba(255,255,255,0.04)' }}>
            {FEATURES.map((f, i) => (
              <Link
                key={f.href}
                href={f.href}
                className="group block p-10 transition-all duration-500"
                style={{
                  background: '#0a1620',
                  border: 'none',
                }}
              >
                {/* Accent line */}
                <div className="mb-8 transition-all duration-500"
                  style={{
                    width: 24, height: 2,
                    background: f.color,
                    opacity: 0.6,
                  }}
                />

                <h3 className="text-lg font-bold mb-3 transition-colors duration-300"
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    color: '#f5efe0',
                    fontSize: 20,
                  }}>
                  {f.title}
                </h3>

                <p className="text-sm leading-relaxed mb-6"
                  style={{ color: '#7a7062', lineHeight: 1.8 }}>
                  {f.desc}
                </p>

                <span className="inline-flex items-center gap-1 text-xs font-medium transition-all duration-300 group-hover:gap-2"
                  style={{ color: f.color, letterSpacing: '0.05em' }}>
                  EXPLORE <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          VALUE PROPS — Three Pillars
          ════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-40" style={{ background: '#0a1620' }}>
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="mb-20">
            <h2 className="font-bold mb-6" style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: '#f5efe0',
              lineHeight: 1.2,
            }}>
              Why DreamLab exists
            </h2>
            <p className="max-w-2xl text-base leading-relaxed" style={{ color: '#7a7062', lineHeight: 1.7 }}>
              Mental health tools should be accessible, scientifically grounded, and beautifully designed. 
              We built DreamLab to bridge the gap between clinical rigor and human warmth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1" style={{ background: 'rgba(255,255,255,0.03)' }}>
            {[
              {
                title: 'Scientific Foundation',
                desc: 'Every assessment is a validated instrument with decades of peer-reviewed research behind it. SAS, SDS, BFI, PSQI, CD-RISC, SCL-90 — these are the same tools used in clinical settings worldwide.',
                accent: '#e8a820',
              },
              {
                title: 'AI-Powered Depth',
                desc: 'Traditional assessments give you a score. Our DeepSeek-powered engine provides personalized interpretation — helping you understand not just what the numbers mean, but what they mean for you.',
                accent: '#4a90b8',
              },
              {
                title: 'Designed for Humans',
                desc: 'Psychology doesn\'t have to feel clinical. We\'ve wrapped evidence-based tools in an experience that feels warm, inviting, and safe — because that\'s how healing should feel.',
                accent: '#c0392b',
              },
            ].map((item, i) => (
              <div key={i} className="p-10" style={{ background: '#060f18' }}>
                <div className="w-8 h-0.5 mb-8" style={{ background: item.accent }} />
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f5efe0' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7a7062', lineHeight: 1.9 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          CTA — Final Conversion
          ════════════════════════════════════════════ */}
      <section className="relative py-40 md:py-48 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bold mb-6" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(28px, 5vw, 56px)',
            color: '#f5efe0',
            lineHeight: 1.15,
          }}>
            Begin your journey<br/>of self-discovery
          </h2>
          <p className="max-w-lg mx-auto text-base leading-relaxed mb-10" style={{ color: '#7a7062', lineHeight: 1.7 }}>
            Six standardized scales. AI-powered interpretation. 
            Evidence-based knowledge. All in one place.
          </p>
          <Link href="/assessments"
            className="inline-flex items-center gap-2 px-10 py-5 text-base font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: '#e8a820', color: '#060f18',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.03em',
            }}>
            Start Your First Assessment →
          </Link>
        </div>
      </section>

    </div>
  );
}
