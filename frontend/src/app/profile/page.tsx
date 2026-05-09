'use client';

import Link from 'next/link';

const STATS = [
  { label: '课程', value: 12, icon: '课', color: '#d4a853' },
  { label: '反思', value: 3, icon: '思', color: '#3b8b7a' },
  { label: '梦境', value: 4, icon: '梦', color: '#5a7d9a' },
  { label: '测评', value: 2, icon: '镜', color: '#c4554d' },
  { label: '知识', value: 5, icon: '研', color: '#6b5b8a' },
  { label: '路线', value: 1, icon: '图', color: '#cfa34d' },
];

const ACTIVITIES = [
  { text: '学习：弗洛伊德梦的解析入门，完成梦境双层拆解', time: '2小时前', icon: '课', color: '#d4a853' },
  { text: '反思：反复梦到迷路后的情绪记录', time: '昨天', icon: '思', color: '#3b8b7a' },
  { text: '完成心理测评：睡眠与焦虑状态观察', time: '2天前', icon: '镜', color: '#c4554d' },
  { text: '学习：正念冥想，完成 10 分钟觉察练习', time: '3天前', icon: '研', color: '#5a7d9a' },
];

const MILESTONES = [
  { name: '梦境记录', desc: '收集素材', done: true, color: '#d4a853' },
  { name: '心理测评', desc: '建立画像', done: true, color: '#5a7d9a' },
  { name: '课程学习', desc: '建立坐标', done: true, color: '#3b8b7a' },
  { name: '反思日志', desc: '持续复盘', done: false, color: '#c4554d' },
  { name: '成长路线', desc: '长期照护', done: false, color: '#cfa34d' },
];

export default function ProfilePage() {
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
          <h3 className="m-subtitle" style={{ fontSize: 14 }}>成长路线</h3>
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
          { href: '/courses', label: '继续学习', icon: '课', color: '#d4a853' },
          { href: '/reflect', label: '写反思日志', icon: '思', color: '#3b8b7a' },
          { href: '/dream', label: '梦境解析', icon: '梦', color: '#5a7d9a' },
          { href: '/assessments', label: '心理测评', icon: '镜', color: '#c4554d' },
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
          <span className="m-subtitle" style={{ fontSize: 14 }}>查看完整成长路线</span>
          <span style={{ color: '#52525b' }}>→</span>
        </Link>
        <Link href="/courses"
          className="flex items-center justify-between py-2" style={{ textDecoration: 'none' }}>
          <span className="m-subtitle" style={{ fontSize: 14 }}>进入课程体系</span>
          <span style={{ color: '#52525b' }}>→</span>
        </Link>
      </div>

      {/* Quote */}
      <div className="m-card text-center m-section-sm" style={{ padding: 24 }}>
        <p className="m-body" style={{ fontSize: 14, fontFamily: "'Noto Serif SC', serif", fontStyle: 'italic' }}>
          "把梦境、情绪和行动记录下来，成长才会留下线索。"
        </p>
        <p className="m-caption mt-2" style={{ fontSize: 11 }}>—— DreamLab</p>
      </div>

      <div style={{ height: 16 }} />
    </div>
  );
}
