'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ── 统计数据 ──
const STATS = [
  { label: '梦境记录', value: 12, icon: '🌙', color: '#e8a820' },
  { label: '测评完成', value: 3, icon: '🪞', color: '#c0392b' },
  { label: '课程学习', value: 8, icon: '📜', color: '#4a90b8' },
  { label: '陪伴对话', value: 24, icon: '👤', color: '#8b7ab8' },
  { label: '冥想次数', value: 5, icon: '🧘', color: '#6b9e7a' },
  { label: '感恩日记', value: 7, icon: '💝', color: '#e8a820' },
];

// ── 最近活动 ──
const ACTIVITIES = [
  { type: 'assessment', text: '完成了 SAS 焦虑自评量表', result: '正常', time: '2 小时前', icon: '🪞', color: '#c0392b' },
  { type: 'dream', text: '记录了一个梦境：飞翔在城市上空', result: '', time: '昨天', icon: '🌙', color: '#e8a820' },
  { type: 'gratitude', text: '写下感恩日记：今天阳光很好', result: '', time: '昨天', icon: '💝', color: '#6b9e7a' },
  { type: 'companion', text: '与无脸男对话 15 分钟', result: '', time: '2 天前', icon: '👤', color: '#8b7ab8' },
  { type: 'course', text: '学习了荣格：集体无意识与原型', result: '完成 40%', time: '3 天前', icon: '📜', color: '#4a90b8' },
  { type: 'meditation', text: '完成了「河神的净化」3分钟冥想', result: '', time: '3 天前', icon: '🧘', color: '#6b9e7a' },
];

// ── 快捷入口 ──
const QUICK_ACTIONS = [
  { href: '/assessments', label: '心理测评', icon: '🪞', desc: '了解自己的心理状态', color: '#c0392b' },
  { href: '/companion', label: '找无脸男聊聊', icon: '👤', desc: '有时候只是需要被倾听', color: '#4a90b8' },
  { href: '/wellness', label: '5分钟冥想', icon: '🧘', desc: '河神的净化汤，洗去疲惫', color: '#6b9e7a' },
  { href: '/dream', label: '记录梦境', icon: '🌙', desc: '每一个梦都是潜意识的信', color: '#e8a820' },
  { href: '/wellness', label: '写感恩日记', icon: '💝', desc: '三件小事，改变看世界的方式', color: '#8b7ab8' },
  { href: '/courses', label: '继续学习', icon: '📜', desc: '荣格分析心理学待完成', color: '#e8a820' },
];

// ── 找回名字之旅 ──
const JOURNEY_MILESTONES = [
  { name: '穿越遗忘之桥', desc: '面对阴影', done: true, icon: '◇', color: '#c0392b' },
  { name: '汤婆婆的锅炉房', desc: '识别欲望', done: true, icon: '◎', color: '#e8a820' },
  { name: '无脸男的浴场', desc: '接纳孤独', done: true, icon: '◈', color: '#8b7ab8' },
  { name: '河神的净化', desc: '释放淤积', done: false, icon: '⬡', color: '#6b9e7a' },
  { name: '白龙的天空', desc: '找回名字', done: false, icon: '◆', color: '#4a90b8' },
];

const journeyProgress = JOURNEY_MILESTONES.filter(m => m.done).length / JOURNEY_MILESTONES.length * 100;

// ── 今日金句 ──
const TODAY_MESSAGE = {
  quote: '每完成一次测评、每一次冥想，都是向真实的自己靠近一步。',
  author: '钱婆婆',
};

export default function ProfilePage() {
  const [visible, setVisible] = useState(false);
  const [countedStats, setCountedStats] = useState(STATS.map(() => 0));
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  // 数字滚动动画
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCountedStats(prev => {
          const next = prev.map((v, i) => {
            const target = STATS[i].value;
            const step = Math.max(1, Math.ceil(target / 20));
            return v + step >= target ? target : v + step;
          });
          if (next.every((v, i) => v >= STATS[i].value)) {
            clearInterval(interval);
            setStatsAnimated(true);
          }
          return next;
        });
      }, 40);
      return () => clearInterval(interval);
    }, 500);
  }, [visible]);

  return (
    <div style={{ background: '#060f18', minHeight: '100vh' }}>
      {/* 背景装饰 — 柔和水彩圆 */}  
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {[
          { color: '#e8a820', top: '10%', left: '5%', size: 300, opacity: 0.03 },
          { color: '#4a90b8', top: '60%', left: '80%', size: 250, opacity: 0.03 },
          { color: '#c0392b', top: '40%', left: '50%', size: 200, opacity: 0.02 },
        ].map((p, i) => (
          <div key={i} className="absolute rounded-full" style={{
            top: p.top, left: p.left,
            width: p.size, height: p.size,
            background: `radial-gradient(circle, ${p.color}22, transparent 70%)`,
            opacity: p.opacity,
            filter: 'blur(40px)',
            transform: 'translate(-50%, -50%)',
          }} />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-32 relative z-10">
        
        {/* ── 头部 ── */}
        <div className={`text-center mb-12 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center justify-center w-24 h-24 mb-5 relative"
            style={{ background: '#0d1a28', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }}>
            <span className="text-4xl">👤</span>
            {/* 光环 */}
            <div className="absolute inset-0 rounded-full animate-spin-slow" style={{
              border: '1px dashed rgba(232,168,32,0.15)',
              animation: 'spin 20s linear infinite',
            }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f5efe0' }}>
            千寻
          </h1>
          <p className="text-sm mb-4" style={{ color: '#7a7062' }}>
            油屋的见习生 · 正在找回自己的名字
          </p>
          <div className="max-w-sm mx-auto">
            <div className="text-xs mb-1" style={{ color: '#5a5246' }}>
              找回名字的旅程 · {Math.round(journeyProgress)}%
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#ffffff06' }}>
              <div className="h-full rounded-full transition-all duration-1500"
                style={{
                  width: visible ? `${journeyProgress}%` : '0%',
                  background: 'linear-gradient(90deg, #c0392b, #e8a820, #4a90b8)',
                  transitionDelay: '0.8s',
                }} />
            </div>
          </div>
        </div>

        {/* ── 找回名字之旅 · 五层进度卡 ── */}
        <div className="mb-16" style={{
          animation: visible ? 'fadeInUp 0.8s ease-out 0.6s both' : 'none',
        }}>
          <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f5efe0' }}>
            找回名字の旅
          </h2>
          <div className="space-y-2">
            {JOURNEY_MILESTONES.map((m, i) => (
              <div key={m.name} className="flex items-center gap-4 p-4 transition-all duration-500"
                style={{
                  background: m.done ? `${m.color}08` : '#0a1620',
                  border: `1px solid ${m.done ? `${m.color}20` : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 2,
                  opacity: m.done ? 1 : 0.6,
                }}>
                <div className="shrink-0 w-10 h-10 flex items-center justify-center text-lg"
                  style={{
                    background: m.done ? `${m.color}12` : '#ffffff04',
                    border: `1px solid ${m.done ? `${m.color}25` : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 2,
                  }}>
                  {m.done ? '✓' : m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold mb-0.5" style={{ color: m.done ? '#f5efe0' : '#7a7062' }}>
                    {m.name}
                  </div>
                  <div className="text-xs" style={{ color: m.done ? m.color : '#5a5246' }}>
                    {m.done ? `✓ ${m.desc}` : '待解锁'}
                  </div>
                </div>
                <span className="text-xs shrink-0 px-2 py-0.5" style={{
                  background: m.done ? `${m.color}10` : 'transparent',
                  color: m.done ? m.color : '#4a4038',
                  borderRadius: 2,
                  border: m.done ? `1px solid ${m.color}20` : '1px solid transparent',
                }}>
                  {m.done ? '已解锁' : '未解锁'}
                </span>
              </div>
            ))}
          </div>
          <div className="text-right mt-3">
            <Link href="/profile/milestones"
              className="text-xs transition-colors duration-300"
              style={{ color: '#5a5246', fontFamily: 'Inter, sans-serif' }}>
              查看完整成长记录 →
            </Link>
          </div>
        </div>

        {/* ── 数据统计 ── */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-16">
          {STATS.map((s, i) => (
            <div key={s.label}
              className={`text-center p-4 transition-all duration-800 ${countedStats[i] >= s.value ? 'ring-1 ring-inset' : ''}`}
              style={{
                transitionDelay: `${0.1 + i * 0.06}s`,
                background: '#0a1620',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 2,
              }}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold mb-1 transition-all"
                style={{
                  color: s.color,
                  textShadow: statsAnimated ? `0 0 12px ${s.color}30` : 'none',
                }}>
                {countedStats[i]}
              </div>
              <div className="text-xs" style={{ color: '#5a5246' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── 今日金句 ── */}
        <div className="mb-16 p-6 text-center" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
          <div className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(232,168,32,0.5)' }}>
            今日の言葉
          </div>
          <p className="text-lg leading-relaxed mb-3 italic" style={{
            fontFamily: "'Noto Serif SC', serif",
            color: '#f5efe0',
            lineHeight: 1.8,
          }}>
            「{TODAY_MESSAGE.quote}」
          </p>
          <p className="text-xs" style={{ color: '#5a5246' }}>
            —— {TODAY_MESSAGE.author}
          </p>
        </div>

        {/* ── 快捷操作 ── */}
        <div className="mb-16">
          <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f5efe0' }}>
            今天想做些什么？
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {QUICK_ACTIONS.map((a) => (
              <Link key={a.label} href={a.href}
                className="group p-5 transition-all duration-400 hover:scale-[1.02]"
                style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="text-2xl mb-3">{a.icon}</div>
                <div className="text-sm font-bold mb-1 transition-colors group-hover:text-[#f5efe0]" style={{ color: '#b8ad9a' }}>{a.label}</div>
                <div className="text-xs" style={{ color: '#5a5246' }}>{a.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── 最近活动 ── */}
        <div>
          <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f5efe0' }}>
            最近动态
          </h2>
          <div className="space-y-1">
            {ACTIVITIES.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-4 transition-all duration-300 hover:bg-[#ffffff02]"
                style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <span className="text-xl">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ color: '#b8ad9a' }}>{a.text}</p>
                </div>
                {a.result && (
                  <span className="text-xs px-2 py-1" style={{ background: `${a.color}15`, color: a.color, borderRadius: 2 }}>
                    {a.result}
                  </span>
                )}
                <span className="text-xs shrink-0" style={{ color: '#5a5246' }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
