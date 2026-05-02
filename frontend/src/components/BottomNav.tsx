'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const TABS = [
  { href: '/', label: '首页', icon: '◆' },
  { href: '/spirited', label: '油屋', icon: '◇' },
  { href: '/courses', label: '课程', icon: '◈' },
  { href: '/dream', label: '解梦', icon: '◎' },
  { href: '/profile', label: '我的', icon: '⬡' },
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
      {/* 毛玻璃背景 + 几何分界线 */}
      <div className="absolute inset-0 frost-panel border-t border-[#ffffff]/08 rounded-t-2xl"
        style={{ background: 'rgba(14,14,32,0.88)', backdropFilter: 'blur(24px) saturate(180%)' }} />

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
              {/* 选中光晕扩散 */}
              {active && (
                <>
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--geo-coral), var(--accent-purple))' }} />
                  <div className="absolute inset-0 rounded-xl opacity-20"
                    style={{ background: 'radial-gradient(ellipse at 50% 30%, var(--accent-purple), transparent 70%)' }} />
                </>
              )}

              {/* 几何图标 */}
              <span
                className={`text-lg transition-all duration-300 ${
                  active
                    ? 'scale-110'
                    : 'text-[#505060] group-active:scale-110'
                }`}
                style={active ? {
                  color: 'var(--geo-coral)',
                  filter: 'drop-shadow(0 0 6px rgba(232,165,152,0.4))',
                } : {}}
              >
                {tab.icon}
              </span>

              {/* 标签文字 */}
              <span
                className={`text-[10px] mt-0.5 font-medium transition-all duration-300 ${
                  active
                    ? 'opacity-100'
                    : 'text-[#505060] opacity-60'
                }`}
                style={active ? {
                  background: 'linear-gradient(135deg, var(--geo-coral), var(--accent-purple))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                } : {}}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
