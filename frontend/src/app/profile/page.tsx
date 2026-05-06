'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const STATS = [
  { label: '梦境', value: 12, icon: '🌙', color: '#d4a853' },
  { label: '测评', value: 3, icon: '🪞', color: '#c4554d' },
  { label: '课程', value: 8, icon: '📜', color: '#5a7d9a' },
  { label: '陪伴', value: 24, icon: '👤', color: '#6b5b8a' },
  { label: '冥想', value: 5, icon: '🧘', color: '#3b8b7a' },
  { label: '日记', value: 7, icon: '💝', color: '#d4a853' },
];

const ACTIVITIES = [
  { text: '完成 SAS 焦虑自评量表 · 正常', time: '2小时前', icon: '🪞', color: '#c4554d' },
  { text: '记录梦境：飞翔在城市上空', time: '昨天', icon: '🌙', color: '#d4a853' },
  { text: '与无脸男对话 15 分钟', time: '2天前', icon: '👤', color: '#6b5b8a' },
  { text: '学习荣格：集体无意识与原型', time: '3天前', icon: '📜', color: '#5a7d9a' },
];

const MILESTONES = [
  { name: '穿越遗忘之桥', desc: '面对阴影', done: true, color: '#c4554d' },
  { name: '汤婆婆的锅炉房', desc: '识别欲望', done: true, color: '#d4a853' },
  { name: '无脸男的浴场', desc: '接纳孤独', done: true, color: '#6b5b8a' },
  { name: '河神的净化', desc: '释放淤积', done: false, color: '#3b8b7a' },
  { name: '白龙的天空', desc: '找回名字', done: false, color: '#5a7d9a' },
];

export default function ProfilePage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const journeyProgress = (MILESTONES.filter(m => m.done).length / MILESTONES.length) * 100;

  return (
    <div className={`animate-fade-in max-w-lg mx-auto`} style={{ background: '#0a0a0c' }}>
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 mb-6" style={{ paddingTop: 4 }}>
        {STATS.map((s, i) => (
          <div key={s.label} className="m-card text-center" style={{ padding: 14, animation: `card-rise 0.4s ease-out ${i * 0.05}s both` }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div className="m-caption" style={{ fontSize: 10, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Journey */}
      <div className="m-card mb-4" style={{ padding: 18 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="m-subtitle" style={{ fontSize: 14 }}>千寻之旅</h3>
          <span style={{ fontSize: 11, color: '#d4a853' }}>{MILESTONES.filter(m => m.done).length}/{MILESTONES.length}</span>
        </div>
        <div className="h-1.5 rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${journeyProgress}%`, background: 'linear-gradient(90deg, #c4554d, #d4a853, #5a7d9a)' }} />
        </div>
        <div className="flex justify-between">
          {MILESTONES.map((m, i) => (
            <div key={i} className="text-center flex-1">
              <div style={{
                width: 28, height: 28, margin: '0 auto 4px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
                background: m.done ? m.color + '15' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${m.done ? m.color + '30' : 'rgba(255,255,255,0.06)'}`,
                color: m.done ? m.color : '#52525b',
              }}>
                {m.done ? '✓' : i + 1}
              </div>
              <div className="m-caption" style={{ fontSize: 9, color: m.done ? '#a1a1aa' : '#52525b' }}>{m.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { href: '/assessments', label: '心理测评', icon: '🪞', color: '#c4554d' },
          { href: '/companion', label: '找无脸男聊聊', icon: '👤', color: '#5a7d9a' },
          { href: '/wellness', label: '5分钟冥想', icon: '🧘', color: '#3b8b7a' },
          { href: '/dream', label: '记录梦境', icon: '🌙', color: '#d4a853' },
        ].map(item => (
          <Link key={item.href} href={item.href}
            className="m-card m-card-interactive flex items-center gap-3"
            style={{ padding: 14 }}>
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            <span className="m-subtitle" style={{ fontSize: 13 }}>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="m-card mb-4" style={{ padding: 18 }}>
        <h3 className="m-subtitle mb-3" style={{ fontSize: 14 }}>最近活动</h3>
        <div className="space-y-2.5">
          {ACTIVITIES.map((a, i) => (
            <div key={i} className="flex items-center gap-3" style={{ paddingBottom: i < ACTIVITIES.length - 1 ? 10 : 0, borderBottom: i < ACTIVITIES.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
              <span style={{ fontSize: 16 }}>{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="m-caption" style={{ fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.text}</p>
              </div>
              <span className="m-caption" style={{ fontSize: 10, color: 'var(--text-deep)', flexShrink: 0 }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="m-card mb-4" style={{ padding: 18 }}>
        <Link href="/profile/milestones"
          className="flex items-center justify-between py-2"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', textDecoration: 'none' }}>
          <span className="m-subtitle" style={{ fontSize: 14 }}>✨ 查看完整成长记录</span>
          <span style={{ color: '#52525b' }}>→</span>
        </Link>
        <Link href="/bathhouse"
          className="flex items-center justify-between py-2" style={{ textDecoration: 'none' }}>
          <span className="m-subtitle" style={{ fontSize: 14 }}>🏯 前往油屋大厅</span>
          <span style={{ color: '#52525b' }}>→</span>
        </Link>
      </div>

      {/* Quote */}
      <div className="m-card text-center m-section-sm" style={{ padding: 24 }}>
        <p className="m-body" style={{ fontSize: 14, fontFamily: "'Noto Serif SC', serif", fontStyle: 'italic' }}>
          "每完成一次测评、每一次冥想，都是向真实的自己靠近一步。"
        </p>
        <p className="m-caption mt-2" style={{ fontSize: 11 }}>—— 钱婆婆</p>
      </div>

      <div style={{ height: 16 }} />
    </div>
  );
}
