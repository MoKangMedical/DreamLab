'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';

const AGE_GROUPS = [
  { key: 'learning', label: '学习成长', focus: '自我认识、能力建立和身份探索', action: '把重点放在课程学习、情绪记录和稳定作息，减少用标签定义自己。' },
  { key: 'work', label: '工作压力', focus: '压力调节、边界感和长期精力管理', action: '建立压力触发记录，区分可改变事项和需要接纳的现实限制。' },
  { key: 'relationship', label: '关系议题', focus: '依恋模式、沟通方式和安全感修复', action: '记录触发点、自动想法和真实需求，再选择更温和的表达方式。' },
  { key: 'sleep', label: '睡眠梦境', focus: '睡眠质量、梦境主题和身体信号', action: '连续记录睡眠、梦境和醒后情绪，观察反复出现的主题。' },
];

const RISK_LEVELS = [
  { key: 'low', label: '温和观察', allocation: '适合从课程、梦境记录和每周反思开始，不急于做重大改变' },
  { key: 'mid', label: '需要调整', allocation: '建议加入 CBT 记录、正念练习和关系沟通复盘' },
  { key: 'high', label: '高压预警', allocation: '优先建立支持系统；若影响睡眠、饮食或工作，请考虑寻求专业帮助' },
];

const CYCLE_STAGE = [
  { key: 'dream', label: '梦境频繁', signal: '梦境清晰、重复主题增多，醒后情绪明显' },
  { key: 'emotion', label: '情绪波动', signal: '焦虑、低落、烦躁或空白感更容易被触发' },
  { key: 'relation', label: '关系触发', signal: '亲密、边界、被忽视或被评价的主题反复出现' },
  { key: 'recovery', label: '修复窗口', signal: '有能量学习、记录、调整习惯并尝试新的回应方式' },
];

export default function PredictPage() {
  const [ageGroup, setAgeGroup] = useState('work');
  const [risk, setRisk] = useState('mid');
  const [stage, setStage] = useState('dream');
  const [industry, setIndustry] = useState('反复梦境 / 工作压力 / 关系冲突');

  const result = useMemo(() => {
    const age = AGE_GROUPS.find((item) => item.key === ageGroup)!;
    const riskLevel = RISK_LEVELS.find((item) => item.key === risk)!;
    const cycle = CYCLE_STAGE.find((item) => item.key === stage)!;
    return {
      title: `${age.label} · ${riskLevel.label}型 · ${cycle.label}`,
      summary: `你的观察重点可以放在「${industry || '近期心理主题'}」与情绪、梦境和关系触发之间的联系。当前状态假设为${cycle.label}，优先观察${cycle.signal}。`,
      actions: [
        age.action,
        `支持方式：${riskLevel.allocation}。`,
        `主题观察：为「${industry || '近期心理主题'}」记录触发情境、身体反应、自动想法和梦境意象。`,
        '每 7 天复盘一次：如果睡眠、食欲、工作或关系持续受影响，请把求助放在优先级前列。',
      ],
    };
  }, [ageGroup, industry, risk, stage]);

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-5 md:px-6 pt-14 md:pt-22 pb-24">
        <div className="mb-10">
          <h1 className="font-bold mb-4" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(34px, 6vw, 64px)', color: '#f4f4f6', lineHeight: 1.1 }}>
            AI 心理趋势观察工具
          </h1>
          <p className="text-sm md:text-base leading-8 max-w-2xl" style={{ color: '#a1a1aa' }}>
            输入当前主题、压力水平和心理状态，生成一份用于自我观察和反思记录的参考框架。
            结果用于心理学学习和自我照护，不能替代专业诊断或治疗。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-4">
          <div className="p-5 md:p-6" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
            <Section title="当前议题">
              <Segmented options={AGE_GROUPS} value={ageGroup} onChange={setAgeGroup} />
            </Section>

            <Section title="压力水平">
              <Segmented options={RISK_LEVELS} value={risk} onChange={setRisk} />
            </Section>

            <Section title="心理状态">
              <Segmented options={CYCLE_STAGE} value={stage} onChange={setStage} />
            </Section>

            <label className="block text-xs mb-2" style={{ color: '#71717a' }}>近期主题</label>
            <input
              value={industry}
              onChange={(event) => setIndustry(event.target.value)}
              className="w-full px-4 py-3 text-sm"
              style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#f4f4f6', outline: 'none' }}
              placeholder="例如：梦到迷路 / 工作压力 / 关系冲突"
            />
          </div>

          <div className="p-5 md:p-6" style={{ background: '#111113', border: '1px solid rgba(212,168,83,0.18)', borderRadius: 8 }}>
            <div className="text-xs mb-3" style={{ color: '#d4a853' }}>观察结果</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{result.title}</h2>
            <p className="text-sm leading-7 mb-6" style={{ color: '#a1a1aa' }}>{result.summary}</p>

            <div className="space-y-3">
              {result.actions.map((action, index) => (
                <div key={action} className="flex gap-3 p-4" style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                  <div className="text-xs font-bold shrink-0" style={{ color: '#d4a853' }}>{index + 1}</div>
                  <p className="text-sm leading-7" style={{ color: '#c8c8d0' }}>{action}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link href="/reflect" className="btn btn-primary" style={{ padding: '12px 22px' }}>
                写入反思日志 →
              </Link>
              <Link href="/courses/15" className="btn btn-ghost">
                学习 CBT 工具
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <div className="text-xs mb-2" style={{ color: '#71717a' }}>{title}</div>
      {children}
    </div>
  );
}

function Segmented({
  options,
  value,
  onChange,
}: {
  options: { key: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => {
        const active = value === option.key;
        return (
          <button
            key={option.key}
            onClick={() => onChange(option.key)}
            className="px-3 py-2 text-sm text-left transition-colors"
            style={{
              color: active ? '#0a0a0c' : '#a1a1aa',
              background: active ? '#d4a853' : '#0a0a0c',
              border: `1px solid ${active ? 'rgba(212,168,83,0.5)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 8,
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
