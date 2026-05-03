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
      <div className="absolute inset-0 frost-panel border-t border-[#ffffff]/06 rounded-t-2xl"
        style={{ background: 'rgba(10,22,40,0.9)', backdropFilter: 'blur(24px) saturate(180%)' }} />

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
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--bathhouse-gold), var(--geo-coral))' }} />
                  <div className="absolute inset-0 rounded-xl opacity-15"
                    style={{ background: 'radial-gradient(ellipse at 50% 30%, var(--accent-ocean), transparent 70%)' }} />
                </>
              )}

              <span
                className={`text-lg transition-all duration-300 ${
                  active ? 'scale-110' : 'text-[#3A5A78] group-active:scale-110'
                }`}
                style={active ? {
                  color: 'var(--bathhouse-gold)',
                  filter: 'drop-shadow(0 0 6px rgba(240,192,96,0.4))',
                } : {}}>
                {tab.icon}
              </span>

              <span
                className={`text-[10px] mt-0.5 font-medium transition-all duration-300 ${
                  active ? 'opacity-100' : 'text-[#3A5A78] opacity-60'
                }`}
                style={active ? {
                  background: 'linear-gradient(135deg, var(--bathhouse-gold), var(--accent-ocean))',
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
