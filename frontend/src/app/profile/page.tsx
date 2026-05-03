'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, [ref]);
  return inView;
}

// ── 统计数据 ──
const STATS = [
  { label: '梦境记录', value: 12, icon: '🌙', color: '#e2b64f' },
  { label: '测评完成', value: 3, icon: '🪞', color: '#c47868' },
  { label: '课程学习', value: 8, icon: '📜', color: '#7eb8da' },
  { label: '陪伴对话', value: 24, icon: '👤', color: '#9b8ab8' },
  { label: '冥想次数', value: 5, icon: '🧘', color: '#8aaf9d' },
  { label: '感恩日记', value: 7, icon: '💝', color: '#e2b64f' },
];

// ── 最近活动 ──
const ACTIVITIES = [
  { type: 'assessment', text: '完成了 SAS 焦虑自评量表', result: '正常', time: '2 小时前', icon: '🪞', color: '#c47868' },
  { type: 'dream', text: '记录了一个梦境：飞翔在城市上空', result: '', time: '昨天', icon: '🌙', color: '#e2b64f' },
  { type: 'gratitude', text: '写下感恩日记：今天阳光很好', result: '', time: '昨天', icon: '💝', color: '#8aaf9d' },
  { type: 'companion', text: '与无脸男对话 15 分钟', result: '', time: '2 天前', icon: '👤', color: '#9b8ab8' },
  { type: 'course', text: '学习了荣格：集体无意识与原型', result: '完成 40%', time: '3 天前', icon: '📜', color: '#7eb8da' },
  { type: 'meditation', text: '完成了「河神的净化」3分钟冥想', result: '', time: '3 天前', icon: '🧘', color: '#8aaf9d' },
];

// ── 快捷入口 ──
const QUICK_ACTIONS = [
  { href: '/assessments', label: '心理测评', icon: '🪞', desc: '了解自己的心理状态', color: '#c47868' },
  { href: '/companion', label: '找无脸男聊聊', icon: '👤', desc: '有时候只是需要被倾听', color: '#7eb8da' },
  { href: '/wellness', label: '5分钟冥想', icon: '🧘', desc: '河神的净化汤，洗去疲惫', color: '#8aaf9d' },
  { href: '/dream', label: '记录梦境', icon: '🌙', desc: '每一个梦都是潜意识的信', color: '#e2b64f' },
  { href: '/wellness', label: '写感恩日记', icon: '💝', desc: '三件小事，改变看世界的方式', color: '#9b8ab8' },
  { href: '/courses', label: '继续学习', icon: '📜', desc: '荣格分析心理学待完成', color: '#e2b64f' },
];

export default function ProfilePage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{ background: '#09090b', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-32">
        
        {/* ── 头部 ── */}
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 mb-5"
            style={{ background: '#131316', border: '1px solid #27272a', borderRadius: '50%' }}>
            <span className="text-3xl">👤</span>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#fafafa' }}>
            千寻
          </h1>
          <p className="text-sm" style={{ color: '#71717a' }}>
            油屋的见习生 · 正在找回自己的名字
          </p>
        </div>

        {/* ── 数据统计 ── */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-16">
          {STATS.map((s, i) => (
            <div key={s.label} className={`text-center p-4 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${0.1 + i * 0.06}s`, background: '#0c0c0e', border: '1px solid #1c1c1f', borderRadius: 2 }}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs" style={{ color: '#52525b' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── 快捷操作 ── */}
        <div className="mb-16">
          <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#fafafa' }}>
            今天想做些什么？
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {QUICK_ACTIONS.map((a, i) => (
              <Link key={a.label} href={a.href}
                className="group p-5 transition-all duration-400 hover:scale-[1.02]"
                style={{ background: '#0c0c0e', border: '1px solid #1c1c1f', borderRadius: 2 }}>
                <div className="text-2xl mb-3">{a.icon}</div>
                <div className="text-sm font-bold mb-1 transition-colors group-hover:text-[#fafafa]" style={{ color: '#a1a1aa' }}>{a.label}</div>
                <div className="text-xs" style={{ color: '#52525b' }}>{a.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── 最近活动 ── */}
        <div>
          <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#fafafa' }}>
            最近动态
          </h2>
          <div className="space-y-1">
            {ACTIVITIES.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-4"
                style={{ background: '#0c0c0e', border: '1px solid #1c1c1f', borderRadius: 2 }}>
                <span className="text-xl">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate" style={{ color: '#a1a1aa' }}>{a.text}</p>
                </div>
                {a.result && (
                  <span className="text-xs px-2 py-1" style={{ background: `${a.color}15`, color: a.color, borderRadius: 2 }}>
                    {a.result}
                  </span>
                )}
                <span className="text-xs shrink-0" style={{ color: '#52525b' }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
