'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const TABS = [
  { href: '/', label: '首页', icon: '🏠' },
  { href: '/assessments', label: '测评', icon: '🪞' },
  { href: '/companion', label: '陪伴', icon: '👤' },
  { href: '/community', label: '社区', icon: '🏮' },
  { href: '/profile', label: '我的', icon: '🐉' },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom,0px)]"
      style={{ touchAction: 'manipulation' }}
    >
      <div className="absolute inset-0"
        style={{ background: 'rgba(6,15,24,0.96)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)' }} />

      <div className="relative flex items-center justify-around h-14 px-1">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-200"
              style={{ touchAction: 'manipulation' }}
            >
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{ background: '#e8a820' }} />
              )}
              <span style={{ fontSize: 18, lineHeight: 1, opacity: active ? 1 : 0.5, transition: 'opacity 0.2s' }}>
                {tab.icon}
              </span>
              <span style={{
                fontSize: 10,
                color: active ? '#f5efe0' : '#5a5246',
                fontFamily: 'Inter, sans-serif',
                fontWeight: active ? 600 : 400,
                transition: 'color 0.2s',
              }}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
