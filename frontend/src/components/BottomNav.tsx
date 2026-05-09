'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const TABS = [
  { href: '/', label: '首页', icon: '⌂' },
  { href: '/courses', label: '课程', icon: '▣' },
  { href: '/predict', label: '工具', icon: '◎' },
  { href: '/knowledge', label: '知识', icon: '◇' },
  { href: '/reflect', label: '复盘', icon: '◉' },
  { href: '/profile', label: '我的', icon: '○' },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="md:hidden glass-bottom-nav">
      <div className="flex items-center justify-around">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`nav-item ${active ? 'nav-item-active' : ''}`}
            >
              {active && <div className="nav-pill" />}
              <span
                className="nav-item-icon"
                style={{
                  color: active ? '#d4a853' : '#52525b',
                  fontSize: 18,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {tab.icon}
              </span>
              <span
                className="nav-item-label"
                style={{ color: active ? '#f4f4f6' : '#52525b' }}
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
