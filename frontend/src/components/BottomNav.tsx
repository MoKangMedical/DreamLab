'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const TABS = [
  { href: '/', label: '首页', icon: '◆' },
  { href: '/assessments', label: '测评', icon: '🪞' },
  { href: '/companion', label: '陪伴', icon: '👤' },
  { href: '/wellness', label: '健康', icon: '♨️' },
  { href: '/spirited', label: '油屋', icon: '◇' },
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
      <div className="absolute inset-0 frost-panel rounded-t"
        style={{ background: 'rgba(9,9,11,0.94)', borderTop: '1px solid rgba(255,255,255,0.05)' }} />

      <div className="relative flex items-center justify-around h-14 px-1">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full group transition-all duration-300 active:scale-90"
              style={{ touchAction: 'manipulation' }}
            >
              {active && (
                <>
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-0.5"
                    style={{ background: 'var(--accent-gold)' }} />
                  <div className="absolute inset-0 opacity-8"
                    style={{ background: 'radial-gradient(ellipse at 50% 30%, var(--accent-gold), transparent 70%)' }} />
                </>
              )}

              <span
                className={`text-lg transition-all duration-300 ${
                  active ? 'scale-110' : 'text-[#52525b] group-active:scale-110'
                }`}
                style={active ? {
                  color: 'var(--accent-gold)',
                  filter: 'drop-shadow(0 0 4px rgba(226,182,79,0.3))',
                } : {}}>
                {tab.icon}
              </span>

              <span
                className={`text-[10px] mt-0.5 font-medium transition-all duration-300 ${
                  active ? 'opacity-100' : 'text-[#52525b] opacity-70'
                }`}
                style={active ? {
                  background: 'linear-gradient(135deg, var(--accent-gold), #f0d078)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                } : {}}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
