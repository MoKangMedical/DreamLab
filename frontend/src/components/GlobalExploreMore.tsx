'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface ExploreLink {
  href: string; label: string; desc: string; accent?: string;
}

const EXPLORE_ALL: ExploreLink[] = [
  { href: '/assessments', label: 'Assessments', desc: '6 standardized scales', accent: '#e8a820' },
  { href: '/companion', label: 'AI Companion', desc: 'CBT-informed dialogue', accent: '#4a90b8' },
  { href: '/wellness', label: 'Wellness Toolkit', desc: 'Meditation · Breathing · Journal', accent: '#1e8568' },
  { href: '/knowledge', label: 'Knowledge Base', desc: '12 peer-reviewed articles', accent: '#c0392b' },
  { href: '/spirited', label: 'Spirited Journey', desc: 'Ghibli-inspired exploration', accent: '#7b5ea8' },
  { href: '/courses', label: 'Courses', desc: 'Freud · Jung · Neuroscience', accent: '#6b4fa0' },
  { href: '/dream', label: 'Dream Analysis', desc: 'Record & decode your dreams', accent: '#e8a820' },
  { href: '/reflect', label: 'Reflection', desc: 'Post-dream contemplation', accent: '#4a90b8' },
];

function getLinksFor(pathname: string): ExploreLink[] {
  const current = EXPLORE_ALL.find(l => pathname === l.href || pathname.startsWith(l.href + '/'));
  if (!current) return EXPLORE_ALL;
  return EXPLORE_ALL.filter(l => l.href !== current.href && !pathname.startsWith(l.href + '/')).slice(0, 4);
}

function getTitleFor(pathname: string): string {
  if (pathname.startsWith('/dream')) return 'Continue your journey';
  if (pathname.startsWith('/assessments')) return 'What\'s next';
  if (pathname.startsWith('/companion')) return 'After the conversation';
  if (pathname.startsWith('/wellness')) return 'Keep exploring';
  if (pathname.startsWith('/knowledge')) return 'Further reading';
  if (pathname.startsWith('/spirited')) return 'Return from the bathhouse';
  if (pathname.startsWith('/courses')) return 'Continue learning';
  if (pathname.startsWith('/reflect')) return 'Deeper reflection';
  if (pathname.startsWith('/profile')) return 'Your growth path';
  return 'Continue exploring';
}

export default function GlobalExploreMore() {
  const pathname = usePathname();
  const links = getLinksFor(pathname);
  const title = getTitleFor(pathname);

  if (pathname === '/') return null;

  return (
    <div style={{ background: '#0a1620', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-10">
          <div style={{ width: 32, height: 1, background: 'rgba(232,168,32,0.15)' }} />
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(232,168,32,0.5)' }}>
            {title}
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.04)' }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1" style={{ background: 'rgba(255,255,255,0.03)' }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block p-8 transition-all duration-300"
              style={{ background: '#060f18' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0a1620'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#060f18'}
            >
              <div className="w-6 h-0.5 mb-4" style={{ background: link.accent || '#e8a820' }} />
              <div className="text-sm font-semibold mb-1" style={{ color: '#f5efe0' }}>{link.label}</div>
              <div className="text-xs" style={{ color: '#5a5246' }}>{link.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
