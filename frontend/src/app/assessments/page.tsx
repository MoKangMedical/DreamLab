'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAssessments } from '@/lib/api';

const CATEGORY_NAMES: Record<string, string> = {
  anxiety: '焦虑评估',
  depression: '抑郁评估',
  personality: '人格探索',
  sleep: '睡眠健康',
  resilience: '心理韧性',
  symptom: '综合症状',
};

const CATEGORY_COLORS: Record<string, { from: string; to: string; glow: string; badge: string }> = {
  anxiety: { from: 'var(--geo-coral)', to: '#FF8A7A', glow: '#E8A598', badge: 'badge-coral' },
  depression: { from: 'var(--geo-lavender)', to: '#9B7ED8', glow: '#C4B5D4', badge: 'badge-lavender' },
  personality: { from: 'var(--geo-gold)', to: '#F0C060', glow: '#F0C060', badge: 'badge-gold' },
  sleep: { from: 'var(--geo-mint)', to: '#89B5A0', glow: '#B8D4C8', badge: 'badge-mint' },
  resilience: { from: 'var(--geo-sand)', to: '#D4B896', glow: '#E8D5B7', badge: 'badge-sand' },
  symptom: { from: 'var(--geo-coral)', to: 'var(--geo-lavender)', glow: '#C4B5D4', badge: 'badge-coral' },
};

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getAssessments().then(setAssessments);
    setVisible(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-bg)' }}>
      {/* 星空背景 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 80}%`,
              width: `${1 + Math.random() * 2}px`, height: `${1 + Math.random() * 2}px`,
              opacity: 0.12 + Math.random() * 0.3,
              animation: `twinkle ${3 + Math.random() * 5}s infinite ${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-28 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Header */}
        <div className="text-center mb-12 animate-card-rise">
          <div className="inline-block mb-4 text-5xl">🪞</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            汤婆婆の契约之镜
          </h1>
          <p className="text-[#B0B0C0] max-w-lg mx-auto leading-relaxed">
            在镜中看见真实的自己——六把钥匙，开启内心深处的六扇门
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs text-[#707090] bg-[#ffffff]/05 px-4 py-2 rounded-full">
            <span>⚕️</span> 所有量表均基于国际标准心理学工具 · 仅供参考
          </div>
        </div>

        {/* Assessment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {assessments.map((a, i) => {
            const colors = CATEGORY_COLORS[a.category] || CATEGORY_COLORS.anxiety;
            return (
              <Link
                key={a.id}
                href={`/assessments/${a.id}`}
                className="group relative block animate-card-rise"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                {/* 浮动阴影 */}
                <div className="absolute -bottom-2 left-2 right-2 h-4 rounded-2xl opacity-15 transition-all duration-500 group-hover:opacity-25 group-hover:-bottom-3"
                  style={{ background: colors.from }} />

                {/* 卡片 */}
                <div className="geo-card p-6 relative overflow-hidden h-full transition-all duration-500"
                  style={{ background: 'linear-gradient(145deg, rgba(26,26,46,0.85), rgba(20,20,40,0.9))' }}>
                  {/* 角装饰 */}
                  <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none opacity-25 group-hover:opacity-45 transition-opacity">
                    <div className="absolute top-3 right-3 w-2 h-2 rotate-45" style={{ backgroundColor: colors.from }} />
                  </div>

                  {/* 悬浮光晕 */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 30%, ${colors.glow}10 0%, transparent 70%)` }} />

                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{a.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#e0d0ff] transition-colors">
                      {a.name}
                    </h3>
                    <p className="text-xs text-[#707090] leading-relaxed mb-4 line-clamp-2">
                      {a.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`badge-geo ${colors.badge} text-[10px]`}>
                        {CATEGORY_NAMES[a.category] || a.category}
                      </span>
                      <span className="text-[10px] text-[#505060]">{a.question_count} 题</span>
                    </div>
                  </div>

                  {/* 底部线条 */}
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-8 group-hover:opacity-20 transition-opacity"
                    style={{ color: colors.from }} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* 底部引用 */}
        <div className="text-center mt-16 animate-card-rise" style={{ animationDelay: '0.7s' }}>
          <div className="inline-flex items-center gap-3">
            <span className="w-4 h-px bg-[#ffffff]/08" />
            <p className="text-xs text-[#505060] italic">
              「曾经发生过的事情不会忘记，只是想不起来而已」
            </p>
            <span className="w-4 h-px bg-[#ffffff]/08" />
          </div>
          <p className="text-[10px] text-[#404050] mt-2">—— 千与千寻 · 钱婆婆</p>
        </div>
      </div>
    </div>
  );
}
