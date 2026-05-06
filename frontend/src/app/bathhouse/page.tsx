'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';

/* ═══════════════════════════════════════════════════
   Bathhouse — Cinematic Landing
   Refined particles · Film-grade typography · Warm minimalism
   ═══════════════════════════════════════════════════ */

const QUOTES = [
  { quote: '曾经发生过的事情不会忘记，只是想不起来而已。', author: 'Zeniba' },
  { quote: '我不知道将去何方，但我已在路上。', author: 'Chihiro' },
  { quote: '名字一旦被夺走，就再也找不到回家的路了。', author: 'Haku' },
];

function useParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        opacity: 0.04 + Math.random() * 0.08,
        color: ['#d4a853', '#5a7d9a', '#c4554d', '#6b5b8a', '#3b8b7a', '#f4f4f6'][i % 6],
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 15,
        drift: (Math.random() - 0.5) * 20,
      })),
    [count]
  );
}

const FEATURES = [
  { href: '/assessments', title: 'Assessments', desc: '6 standardized clinical scales', accent: '#c4554d', tag: 'Clinical' },
  { href: '/companion', title: 'AI Companion', desc: 'CBT-informed empathetic dialogue', accent: '#6b5b8a', tag: 'Therapeutic' },
  { href: '/wellness', title: 'Wellness Toolkit', desc: 'Meditation · Breathing · Journaling', accent: '#3b8b7a', tag: 'Self-Care' },
  { href: '/knowledge', title: 'Knowledge Base', desc: '12 peer-reviewed articles', accent: '#d4a853', tag: 'Evidence' },
  { href: '/spirited', title: 'Spirited Journey', desc: '5-floor narrative adventure', accent: '#c4554d', tag: 'Explore' },
  { href: '/courses', title: 'Courses', desc: 'Freud · Jung · Neuroscience', accent: '#6b5b8a', tag: 'Learn' },
  { href: '/dream', title: 'Dream Analysis', desc: 'Record & decode your dreams', accent: '#5a7d9a', tag: 'Insight' },
];

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function FeatureCard({ feature, index }: { feature: (typeof FEATURES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      <Link href={feature.href} className="group block h-full">
        <div
          className="relative h-full overflow-hidden transition-all duration-500 card card-interactive"
          style={{ padding: '32px 28px', minHeight: 240 }}
        >
          {/* Accent line */}
          <div
            className="mb-6 transition-all duration-500"
            style={{ width: 24, height: 3, background: feature.accent, borderRadius: 2 }}
          />
          {/* Tag */}
          <span
            className="inline-block mb-4 text-xs px-2 py-1"
            style={{
              background: `${feature.accent}10`,
              border: `1px solid ${feature.accent}20`,
              color: feature.accent,
              borderRadius: 100,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
            }}
          >
            {feature.tag}
          </span>
          <h3
            className="font-bold mb-2"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 24,
              color: '#f4f4f6',
              lineHeight: 1.2,
            }}
          >
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#71717a', lineHeight: 1.9 }}>
            {feature.desc}
          </p>
          <div
            className="absolute bottom-6 right-6 transition-all duration-300 opacity-0 group-hover:opacity-100"
            style={{ color: feature.accent, fontSize: 18 }}
          >
            →
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function BathhousePage() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const particles = useParticles(36);
  const quoteIdx = useMemo(() => new Date().getDate() % QUOTES.length, []);

  useEffect(() => {
    setLoaded(true);
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const q = QUOTES[quoteIdx];
  const heroParallax = scrollY * 0.3;
  const heroOpacity = Math.max(0, 1 - scrollY / 700);

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* ════════ Background Particle Layer ════════ */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.opacity,
              animation: `spirit-float ${p.duration}s ease-in-out infinite ${p.delay}s`,
              transform: `translateY(${-heroParallax * (0.3 + p.id * 0.01)}px)`,
            }}
          />
        ))}
        {/* Floating kanji */}
        {['夢', '油', '屋', '千', '尋', '霊'].map((char, i) => (
          <div
            key={char}
            className="absolute font-bold"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 28}%`,
              fontSize: `${26 + i * 6}px`,
              color: ['#d4a853', '#5a7d9a', '#c4554d', '#6b5b8a', '#3b8b7a', '#f4f4f6'][i],
              opacity: 0.03 + i * 0.01,
              fontFamily: "'Noto Serif SC', serif",
              animation: `float-kanji ${8 + i * 2}s ease-in-out infinite ${i * 1.5}s`,
              filter: 'blur(0.5px)',
            }}
          >
            {char}
          </div>
        ))}
      </div>

      {/* ════════ HERO ════════ */}
      <div
        className="relative flex flex-col items-center justify-center px-4"
        style={{ minHeight: '100vh', zIndex: 10, opacity: heroOpacity }}
      >
        <div className={`text-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Label */}
          <p
            className="mb-8"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(212,168,83,0.5)',
            }}
          >
            Bathhouse · Dream Analysis
          </p>

          {/* Main title */}
          <h1
            className="font-bold leading-none mb-3 tracking-tighter"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(52px, 13vw, 130px)',
              background: 'linear-gradient(180deg, #f4f4f6 0%, #71717a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            DreamLab
          </h1>

          <p
            className="mb-6"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(18px, 3vw, 32px)',
              color: '#71717a',
            }}
          >
            千と千尋の夢の解析
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.3))' }} />
            <div style={{ width: 4, height: 4, background: '#d4a853', borderRadius: '50%' }} />
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, rgba(212,168,83,0.3), transparent)' }} />
          </div>

          <p
            className="max-w-lg mx-auto mb-10 leading-relaxed"
            style={{ fontSize: 16, color: '#a1a1aa', lineHeight: 2.0 }}
          >
            Through the bathhouse&apos;s misty floors, in the deepest chambers of dreams,
            rediscover the name you once forgot — and the self you truly are.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/assessments"
              className="btn btn-primary"
              style={{ padding: '16px 32px', fontSize: 15 }}
            >
              Begin Assessment →
            </Link>
            <Link href="/companion" className="btn btn-ghost">
              Talk to No-Face
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ opacity: heroOpacity }}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs tracking-widest uppercase" style={{ color: '#52525b' }}>
              Scroll
            </span>
            <div style={{ width: 1, height: 24, background: 'linear-gradient(180deg, rgba(212,168,83,0.3), transparent)' }} />
          </div>
        </div>
      </div>

      {/* ════════ QUOTE ════════ */}
      <div className="relative py-32 md:py-48" style={{ zIndex: 10 }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(22px, 4vw, 38px)',
              color: '#f4f4f6',
              lineHeight: 1.85,
            }}
          >
            「{q.quote}」
          </p>
          <p className="text-sm" style={{ color: '#71717a' }}>
            — {q.author}
          </p>
        </div>
      </div>

      {/* ════════ FEATURES ════════ */}
      <div className="relative max-w-6xl mx-auto px-4 pb-40" style={{ zIndex: 10 }}>
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>
              Explore the Bathhouse
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(28px, 5vw, 48px)',
              color: '#f4f4f6',
              lineHeight: 1.15,
            }}
          >
            Every floor is a door
            <br />
            into yourself
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.href} feature={f} index={i} />
          ))}
        </div>
      </div>

      {/* ════════ VALUE ════════ */}
      <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32" style={{ zIndex: 10 }}>
        <div className="text-center mb-12">
          <h2
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(26px, 4vw, 44px)',
              color: '#f4f4f6',
              lineHeight: 1.25,
            }}
          >
            Why explore your
            <br />
            inner world?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Scientific Foundation',
              desc: 'All scales are internationally validated clinical instruments, refined through decades of academic research. Not astrology — real psychometrics.',
              accent: '#d4a853',
            },
            {
              title: 'AI Interpretation',
              desc: 'DeepSeek provides personalized analysis. Beyond raw scores, we help you understand the meaning behind the numbers.',
              accent: '#5a7d9a',
            },
            {
              title: 'A Warm Experience',
              desc: 'Psychology through the lens of Spirited Away. You don\'t need a white coat — just the bathhouse, a quiet companion, and the mirror of truth.',
              accent: '#c4554d',
            },
          ].map((item, i) => (
            <div key={i} className="card" style={{ animation: `fade-up 0.4s ease-out ${i * 0.08 + 0.2}s both` }}>
              <div className="mb-4" style={{ width: 20, height: 3, background: item.accent, borderRadius: 2 }} />
              <h3
                className="mb-3"
                style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 18, color: item.accent, fontWeight: 700 }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#71717a', lineHeight: 2.0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ════════ CTA ════════ */}
      <div className="relative py-32 md:py-48" style={{ zIndex: 10, background: '#111113' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2
            className="font-bold mb-6"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(26px, 4vw, 44px)',
              color: '#f4f4f6',
              lineHeight: 1.25,
            }}
          >
            In the depths of the bathhouse,
            <br />
            find your true name
          </h2>
          <p
            className="max-w-lg mx-auto mb-10 leading-relaxed"
            style={{ fontSize: 15, color: '#71717a', lineHeight: 2.0 }}
          >
            Yubaba&apos;s mirror reflects your truth · No-Face quietly listens to unspoken words ·
            The river spirit cleanses a weary soul · Haku guides you to find who you truly are
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/assessments" className="btn btn-primary" style={{ padding: '16px 32px' }}>
              Begin Exploration →
            </Link>
            <Link href="/" className="btn btn-ghost">
              ← Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
