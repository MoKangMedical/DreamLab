'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface ExploreLink {
  href: string;
  label: string;
  desc: string;
  accent: string;
}

const EXPLORE_ALL: ExploreLink[] = [
  { href: '/courses', label: '课程体系', desc: '65 门 · 10 阶段', accent: '#d4a853' },
  { href: '/predict', label: '周期工具', desc: '定位 2026-2040', accent: '#4f9db8' },
  { href: '/knowledge', label: '心理知识库', desc: 'CBT · 正念 · 睡眠', accent: '#8b7cf6' },
  { href: '/reflect', label: '策略复盘', desc: '假设 · 证据 · 风险', accent: '#72a66a' },
  { href: '/assessments', label: '投资者画像', desc: '风险与行为偏差', accent: '#c4554d' },
  { href: '/profile', label: '我的路线', desc: '课程进度与目标', accent: '#cfa34d' },
];

function getLinksFor(pathname: string): ExploreLink[] {
  const current = EXPLORE_ALL.find((l) => pathname === l.href || pathname.startsWith(l.href + '/'));
  if (!current) return EXPLORE_ALL.slice(0, 4);
  return EXPLORE_ALL.filter((l) => l.href !== current.href && !pathname.startsWith(l.href + '/')).slice(0, 4);
}

function getTitleFor(pathname: string): string {
  if (pathname.startsWith('/courses')) return '继续学习';
  if (pathname.startsWith('/predict')) return '继续定位';
  if (pathname.startsWith('/knowledge')) return '继续研究';
  if (pathname.startsWith('/reflect')) return '继续复盘';
  if (pathname.startsWith('/profile')) return '我的路线';
  return '继续探索';
}

export default function GlobalExploreMore() {
  const pathname = usePathname();
  const links = getLinksFor(pathname);
  const title = getTitleFor(pathname);

  if (pathname === '/') return null;

  return (
    <div style={{ background: '#0a0a0c', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-8">
          <div style={{ width: 24, height: 1, background: 'rgba(212,168,83,0.15)' }} />
          <span className="text-xs tracking-[0.12em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>
            {title}
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.04)' }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 1, background: 'rgba(255,255,255,0.03)' }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block p-8 transition-all duration-300 hover:bg-[#111113]"
              style={{ background: '#0a0a0c' }}
            >
              <div className="w-5 h-0.5 mb-5" style={{ background: link.accent, borderRadius: 1 }} />
              <div className="text-sm font-semibold mb-1" style={{ color: '#f4f4f6' }}>
                {link.label}
              </div>
              <div className="text-xs" style={{ color: '#71717a' }}>
                {link.desc}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
