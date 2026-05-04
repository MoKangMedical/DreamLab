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
    <nav className="md:hidden m-bottom-nav">
      <div className="flex items-center justify-around">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`m-nav-item ${active ? 'm-nav-active' : ''}`}
            >
              {active && <div className="m-nav-pill" />}
              <span className="m-nav-icon">{tab.icon}</span>
              <span className="m-nav-label" style={{ color: active ? '#f5efe0' : '#5a5246' }}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
