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
  { href: '/assessments', label: 'Assessments', desc: '6 clinical scales', accent: '#c4554d' },
  { href: '/companion', label: 'AI Companion', desc: 'Empathetic dialogue', accent: '#6b5b8a' },
  { href: '/wellness', label: 'Wellness', desc: 'Meditation & breathing', accent: '#3b8b7a' },
  { href: '/knowledge', label: 'Knowledge', desc: 'Peer-reviewed articles', accent: '#d4a853' },
  { href: '/spirited', label: 'Spirited Journey', desc: 'Narrative adventure', accent: '#5a7d9a' },
  { href: '/courses', label: 'Courses', desc: 'Freud · Jung · Science', accent: '#6b5b8a' },
  { href: '/dream', label: 'Dreams', desc: 'Record & decode', accent: '#d4a853' },
  { href: '/bathhouse', label: 'Bathhouse', desc: 'Cinematic landing', accent: '#c4554d' },
];

function getLinksFor(pathname: string): ExploreLink[] {
  const current = EXPLORE_ALL.find((l) => pathname === l.href || pathname.startsWith(l.href + '/'));
  if (!current) return EXPLORE_ALL.slice(0, 4);
  return EXPLORE_ALL.filter((l) => l.href !== current.href && !pathname.startsWith(l.href + '/')).slice(0, 4);
}

function getTitleFor(pathname: string): string {
  if (pathname.startsWith('/dream')) return 'Continue Your Journey';
  if (pathname.startsWith('/assessments')) return 'After the Assessment';
  if (pathname.startsWith('/companion')) return 'After the Conversation';
  if (pathname.startsWith('/wellness')) return 'Keep Exploring';
  if (pathname.startsWith('/knowledge')) return 'Further Reading';
  if (pathname.startsWith('/spirited')) return 'Return from the Bathhouse';
  if (pathname.startsWith('/courses')) return 'Continue Learning';
  if (pathname.startsWith('/profile')) return 'Your Growth Path';
  if (pathname.startsWith('/bathhouse')) return 'Enter the Bathhouse';
  return 'Continue Exploring';
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
