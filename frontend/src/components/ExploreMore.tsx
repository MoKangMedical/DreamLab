'use client';

import Link from 'next/link';

interface ExploreLink {
  href: string;
  icon: string;
  label: string;
  desc: string;
  accent?: string;
}

/**
 * 继续探索 — 页面底部跨链接导航
 * 确保每个页面都不是死胡同，总有后续内容可探索
 */
export default function ExploreMore({ links, title = '继续你的心灵之旅' }: { links: ExploreLink[]; title?: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 pb-20 md:pb-32">
      <div className="flex items-center gap-3 mb-6">
        <div style={{ width: 32, height: 1, background: 'rgba(212,168,83,0.2)' }} />
        <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)', fontFamily: "'Inter', sans-serif" }}>
          {title}
        </span>
        <div style={{ flex: 1, height: 1, background: 'rgba(212,168,83,0.08)' }} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block p-5 transition-all duration-300 hover:translate-y-[-2px]"
            style={{
              background: '#111113',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 2,
            }}
          >
            <div className="text-2xl mb-3">{link.icon}</div>
            <div className="text-xs font-bold mb-1" style={{ color: link.accent || '#f4f4f6' }}>
              {link.label}
            </div>
            <div className="text-[11px] leading-relaxed" style={{ color: '#52525b' }}>
              {link.desc}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/** 全站探索链接配置 */
export const EXPLORE_ALL: ExploreLink[] = [
  { href: '/assessments', icon: '🪞', label: '心理测评', desc: '6大标准量表', accent: '#d4a853' },
  { href: '/companion', icon: '👤', label: '无脸男陪伴', desc: 'CBT共情对话', accent: '#5a7d9a' },
  { href: '/wellness', icon: '♨️', label: '健康工具箱', desc: '冥想·呼吸·感恩', accent: '#3b8b7a' },
  { href: '/knowledge', icon: '📚', label: '知识百科', desc: '12篇同行评审科普', accent: '#c4554d' },
  { href: '/spirited', icon: '🏯', label: '油屋探险', desc: '千寻的成长之旅', accent: '#c4554d' },
  { href: '/courses', icon: '📜', label: '梦学课程', desc: '弗洛伊德·荣格', accent: '#6b5b8a' },
  { href: '/dream', icon: '🌙', label: '梦境工坊', desc: '记录你的梦', accent: '#d4a853' },
  { href: '/dream/history', icon: '📖', label: '梦境之书', desc: '回看旧梦的智慧', accent: '#5a7d9a' },
  { href: '/reflect', icon: '💭', label: '心灵反思', desc: '白日梦的深度思考', accent: '#6b5b8a' },
  { href: '/profile', icon: '✨', label: '个人中心', desc: '成长轨迹一览', accent: '#d4a853' },
];

export const EXPLORE_AFTER_ASSESSMENT: ExploreLink[] = [
  { href: '/profile', icon: '✨', label: '查看成长轨迹', desc: '测评趋势变化', accent: '#d4a853' },
  { href: '/knowledge', icon: '📚', label: '了解相关知识', desc: '焦虑·抑郁·睡眠', accent: '#c4554d' },
  { href: '/companion', icon: '👤', label: '与无脸男聊聊', desc: '说说测评感受', accent: '#5a7d9a' },
  { href: '/wellness', icon: '♨️', label: '开始冥想练习', desc: '缓解测评发现的压力', accent: '#3b8b7a' },
];

export const EXPLORE_AFTER_DREAM: ExploreLink[] = [
  { href: '/dream/history', icon: '📖', label: '梦境之书', desc: '回看所有梦境分析', accent: '#5a7d9a' },
  { href: '/courses', icon: '📜', label: '学习解梦理论', desc: '弗洛伊德·荣格课程', accent: '#6b5b8a' },
  { href: '/reflect', icon: '💭', label: '写下今天的反思', desc: '梦与白天的连接', accent: '#d4a853' },
  { href: '/knowledge', icon: '📚', label: 'REM睡眠科学', desc: '了解梦的神经基础', accent: '#c4554d' },
];

export const EXPLORE_AFTER_COMPANION: ExploreLink[] = [
  { href: '/assessments', icon: '🪞', label: '心理测评', desc: '更系统地了解自己', accent: '#d4a853' },
  { href: '/wellness', icon: '♨️', label: '冥想练习', desc: '延续刚才的平静', accent: '#3b8b7a' },
  { href: '/reflect', icon: '💭', label: '写下此刻感受', desc: '把对话的启发记下来', accent: '#6b5b8a' },
  { href: '/knowledge', icon: '📚', label: 'CBT原理', desc: '了解背后的科学', accent: '#c4554d' },
];
