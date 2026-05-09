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
  { href: '/courses', label: '心理课程', desc: '100 门 · 7 学院', accent: '#d4a853' },
  { href: '/dream', label: '梦境解析', desc: '象征 · 情绪 · 潜意识', accent: '#4f9db8' },
  { href: '/knowledge', label: '心理知识库', desc: 'CBT · 正念 · 睡眠', accent: '#8b7cf6' },
  { href: '/reflect', label: '反思日志', desc: '情绪 · 想法 · 行动', accent: '#72a66a' },
  { href: '/assessments', label: '心理测评', desc: '情绪与人格观察', accent: '#c4554d' },
  { href: '/profile', label: '我的成长', desc: '课程进度与目标', accent: '#cfa34d' },
];

function getLinksFor(pathname: string): ExploreLink[] {
  const current = EXPLORE_ALL.find((l) => pathname === l.href || pathname.startsWith(l.href + '/'));
  if (!current) return EXPLORE_ALL.slice(0, 4);
  return EXPLORE_ALL.filter((l) => l.href !== current.href && !pathname.startsWith(l.href + '/')).slice(0, 4);
}

function getTitleFor(pathname: string): string {
  if (pathname.startsWith('/courses')) return '继续学习';
  if (pathname.startsWith('/dream')) return '继续解析';
  if (pathname.startsWith('/knowledge')) return '继续研究';
  if (pathname.startsWith('/reflect')) return '继续反思';
  if (pathname.startsWith('/profile')) return '我的成长';
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
