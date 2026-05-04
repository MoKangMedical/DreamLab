'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const TABS = [
  { href: '/', label: 'Home' },
  { href: '/assessments', label: 'Tests' },
  { href: '/companion', label: 'Chat' },
  { href: '/dream', label: 'Dreams' },
  { href: '/knowledge', label: 'Learn' },
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
        style={{ background: 'rgba(6,15,24,0.96)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.05)' }} />

      <div className="relative flex items-center justify-around h-14 px-1">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex items-center justify-center flex-1 h-full transition-all duration-200"
              style={{ touchAction: 'manipulation' }}
            >
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5"
                  style={{ background: '#e8a820' }} />
              )}
              <span className={`text-xs font-medium transition-colors duration-200 ${
                active ? '' : ''
              }`}
                style={{
                  color: active ? '#f5efe0' : '#5a5246',
                  fontFamily: 'Inter, sans-serif',
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
