'use client';

import Link from 'next/link';
import { QUEST_BADGES, QUEST_PROFILE } from '@/lib/growth-quest';
import { MEMBERSHIP_PLANS, USER_LOOP_STEPS } from '@/lib/product-loop';

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
    <div className="animate-fade-in max-w-[1180px] mx-auto px-5 md:px-8 pt-20 md:pt-32 pb-32 md:pb-40" style={{ background: '#0a0a0c' }}>
      <div className="text-center mb-12 md:mb-16">
        <div className="text-5xl md:text-6xl mb-8">图</div>
        <h1 className="font-bold mb-6" style={{
          fontFamily: "'Noto Serif SC', serif",
          fontSize: 'clamp(42px, 6vw, 72px)',
          color: '#f4f4f6',
          lineHeight: 1.1,
        }}>
          个人中心
        </h1>
        <p className="max-w-2xl mx-auto text-sm md:text-base leading-8" style={{ color: '#71717a' }}>
          把梦境、测评、课程和反思汇总成一条可回看的心理成长路线。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8">
        <div>
      <div className="m-card mb-6" style={{ padding: 24, border: '1px solid rgba(212,168,83,0.18)' }}>
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="text-xs mb-2" style={{ color: '#d4a853' }}>成长游戏档案</div>
            <h3 className="m-subtitle" style={{ fontSize: 22 }}>Lv.{QUEST_PROFILE.level} · {QUEST_PROFILE.title}</h3>
          </div>
          <Link href="/quest" className="btn btn-primary btn-sm">
            进入游戏
          </Link>
        </div>
        <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full rounded-full" style={{ width: `${Math.round((QUEST_PROFILE.xp / QUEST_PROFILE.nextLevelXp) * 100)}%`, background: 'linear-gradient(90deg, #d4a853, #72a66a)' }} />
        </div>
        <div className="flex justify-between text-xs mb-5" style={{ color: '#71717a' }}>
          <span>{QUEST_PROFILE.xp} XP</span>
          <span>{QUEST_PROFILE.currentAct}</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {QUEST_BADGES.slice(0, 3).map((badge) => (
            <div key={badge.name} className="p-3 text-center" style={{ background: `${badge.color}10`, border: `1px solid ${badge.color}33`, borderRadius: 8 }}>
              <div className="text-sm font-bold mb-1" style={{ color: badge.color, fontFamily: "'Noto Serif SC', serif" }}>{badge.icon}</div>
              <div className="text-[10px] leading-4" style={{ color: '#a1a1aa' }}>{badge.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {STATS.map((s, i) => (
          <div key={s.label} className="m-card text-center" style={{ padding: 18, animation: `card-rise 0.4s ease-out ${i * 0.05}s both` }}>
            <div style={{ fontSize: 26, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div className="m-caption" style={{ fontSize: 11, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Journey */}
      <div className="m-card mb-6" style={{ padding: 24 }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="m-subtitle" style={{ fontSize: 16 }}>成长路线</h3>
          <span style={{ fontSize: 11, color: '#d4a853' }}>{MILESTONES.filter(m => m.done).length}/{MILESTONES.length}</span>
        </div>
        <div className="h-1.5 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${journeyProgress}%`, background: 'linear-gradient(90deg, #c4554d, #d4a853, #5a7d9a)' }} />
        </div>
        <div className="flex justify-between">
          {MILESTONES.map((m, i) => (
            <div key={i} className="text-center flex-1">
              <div style={{
                width: 32, height: 32, margin: '0 auto 8px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
                background: m.done ? m.color + '15' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${m.done ? m.color + '30' : 'rgba(255,255,255,0.06)'}`,
                color: m.done ? m.color : '#52525b',
              }}>
                {m.done ? '✓' : i + 1}
              </div>
              <div className="m-caption" style={{ fontSize: 10, color: m.done ? '#a1a1aa' : '#52525b' }}>{m.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="m-card mb-6" style={{ padding: 24 }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="m-subtitle" style={{ fontSize: 16 }}>下一步闭环任务</h3>
          <Link href="/journey" className="text-xs" style={{ color: '#d4a853' }}>完整路径 →</Link>
        </div>
        <div className="space-y-3">
          {USER_LOOP_STEPS.slice(2, 5).map((step) => (
            <Link key={step.index} href={step.href} className="flex items-start gap-4 p-4" style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
              <span className="text-xs font-bold shrink-0" style={{ color: step.color }}>{step.index}</span>
              <span className="flex-1">
                <span className="block m-subtitle" style={{ fontSize: 14 }}>{step.title}</span>
                <span className="block m-caption mt-1" style={{ fontSize: 12, lineHeight: 1.7 }}>{step.action}</span>
              </span>
              <span style={{ color: '#52525b' }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          { href: '/courses', label: '继续学习', icon: '课', color: '#d4a853' },
          { href: '/reflect', label: '写反思日志', icon: '思', color: '#3b8b7a' },
          { href: '/dream', label: '梦境解析', icon: '梦', color: '#5a7d9a' },
          { href: '/assessments', label: '心理测评', icon: '镜', color: '#c4554d' },
        ].map(item => (
          <Link key={item.href} href={item.href}
            className="m-card m-card-interactive flex items-center gap-3"
            style={{ padding: 18 }}>
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            <span className="m-subtitle" style={{ fontSize: 15 }}>{item.label}</span>
          </Link>
        ))}
      </div>
        </div>

        <div>
      {/* Recent Activity */}
      <div className="m-card mb-6" style={{ padding: 24 }}>
        <h3 className="m-subtitle mb-5" style={{ fontSize: 16 }}>最近活动</h3>
        <div className="space-y-4">
          {ACTIVITIES.map((a, i) => (
            <div key={i} className="flex items-start gap-4" style={{ paddingBottom: i < ACTIVITIES.length - 1 ? 16 : 0, borderBottom: i < ACTIVITIES.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
              <span style={{ fontSize: 18, color: a.color }}>{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="m-caption" style={{ fontSize: 13, lineHeight: 1.8 }}>{a.text}</p>
              </div>
              <span className="m-caption" style={{ fontSize: 10, color: 'var(--text-deep)', flexShrink: 0 }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="m-card mb-6" style={{ padding: 24 }}>
        <Link href="/profile/milestones"
          className="flex items-center justify-between py-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', textDecoration: 'none' }}>
          <span className="m-subtitle" style={{ fontSize: 15 }}>查看完整成长路线</span>
          <span style={{ color: '#52525b' }}>→</span>
        </Link>
        <Link href="/courses"
          className="flex items-center justify-between py-3" style={{ textDecoration: 'none' }}>
          <span className="m-subtitle" style={{ fontSize: 15 }}>进入课程体系</span>
          <span style={{ color: '#52525b' }}>→</span>
        </Link>
      </div>

      <div className="m-card mb-6" style={{ padding: 24, border: '1px solid rgba(212,168,83,0.18)' }}>
        <div className="text-xs mb-3" style={{ color: '#d4a853' }}>商业化承接</div>
        <h3 className="m-subtitle mb-3" style={{ fontSize: 18 }}>{MEMBERSHIP_PLANS[1].name}</h3>
        <p className="m-caption mb-5" style={{ fontSize: 13, lineHeight: 1.8 }}>
          {MEMBERSHIP_PLANS[1].desc}
        </p>
        <div className="flex items-center justify-between gap-4">
          <span className="font-bold" style={{ fontSize: 24, color: '#d4a853', fontFamily: "'Noto Serif SC', serif" }}>
            {MEMBERSHIP_PLANS[1].price}
          </span>
          <Link href="/membership" className="btn btn-primary btn-sm">
            查看方案
          </Link>
        </div>
      </div>

      {/* Quote */}
      <div className="m-card text-center m-section-sm" style={{ padding: 32 }}>
        <p className="m-body" style={{ fontSize: 16, lineHeight: 1.9, fontFamily: "'Noto Serif SC', serif", fontStyle: 'italic' }}>
          "把梦境、情绪和行动记录下来，成长才会留下线索。"
        </p>
        <p className="m-caption mt-2" style={{ fontSize: 11 }}>—— DreamLab</p>
      </div>
        </div>
      </div>
    </div>
  );
}
