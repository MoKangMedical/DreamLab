'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';

const AGE_GROUPS = [
  { key: '20s', label: '20-29 岁', focus: '技能、城市、行业选择优先于资产收益', action: '把主要资金投入学习、迁移和高质量现金流能力。' },
  { key: '30s', label: '30-39 岁', focus: '收入曲线、家庭资产和风险预算开始定型', action: '建立核心资产仓位、保险与应急现金流，避免过早重仓单一资产。' },
  { key: '40s', label: '40-49 岁', focus: '资产防守、事业第二曲线和家庭责任并重', action: '压低杠杆，扩大现金流资产，布局下一轮产业机会。' },
  { key: '50s', label: '50 岁以上', focus: '保值、现金流、传承和医疗支出优先', action: '降低组合波动，强化现金流、税务和传承安排。' },
];

const RISK_LEVELS = [
  { key: 'low', label: '稳健', allocation: '现金流资产 / 高等级固收 / 黄金保险属性' },
  { key: 'mid', label: '均衡', allocation: '核心资产 + 卫星赛道 + 定期再平衡' },
  { key: 'high', label: '进取', allocation: '提高权益和创新产业暴露，但必须设置回撤上限' },
];

const CYCLE_STAGE = [
  { key: 'recovery', label: '回升初期', signal: '流动性修复、产业资本开支抬头、风险偏好恢复' },
  { key: 'boom', label: '繁荣扩散', signal: '技术渗透加速、盈利扩张、估值分化加剧' },
  { key: 'slowdown', label: '增长放缓', signal: '信用收缩、库存压力、政策托底信号增多' },
  { key: 'stress', label: '压力出清', signal: '违约、失业、资产折价和政策转向集中出现' },
];

export default function PredictPage() {
  const [ageGroup, setAgeGroup] = useState('30s');
  const [risk, setRisk] = useState('mid');
  const [stage, setStage] = useState('recovery');
  const [industry, setIndustry] = useState('AI / 算力 / 自动化');

  const result = useMemo(() => {
    const age = AGE_GROUPS.find((item) => item.key === ageGroup)!;
    const riskLevel = RISK_LEVELS.find((item) => item.key === risk)!;
    const cycle = CYCLE_STAGE.find((item) => item.key === stage)!;
    return {
      title: `${age.label} · ${riskLevel.label}型 · ${cycle.label}`,
      summary: `你的研究重点应放在「${industry || '主导产业'}」与个人现金流能力的匹配上。当前假设为${cycle.label}，优先观察${cycle.signal}。`,
      actions: [
        age.action,
        `组合框架：${riskLevel.allocation}。`,
        `产业观察：为「${industry || '主导产业'}」建立估值、政策、订单和人才流动四类指标。`,
        '每 30 天复盘一次：如果关键指标连续两次恶化，降低风险暴露并更新假设。',
      ],
    };
  }, [ageGroup, industry, risk, stage]);

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-5 md:px-6 pt-14 md:pt-22 pb-24">
        <div className="mb-10">
          <h1 className="font-bold mb-4" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(34px, 6vw, 64px)', color: '#f4f4f6', lineHeight: 1.1 }}>
            康波周期定位工具
          </h1>
          <p className="text-sm md:text-base leading-8 max-w-2xl" style={{ color: '#a1a1aa' }}>
            输入年龄阶段、风险偏好、周期假设和关注产业，生成一份研究参考版的 2026-2040 行动框架。
            结果用于学习和复盘，不构成投资建议。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-4">
          <div className="p-5 md:p-6" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
            <Section title="年龄阶段">
              <Segmented options={AGE_GROUPS} value={ageGroup} onChange={setAgeGroup} />
            </Section>

            <Section title="风险偏好">
              <Segmented options={RISK_LEVELS} value={risk} onChange={setRisk} />
            </Section>

            <Section title="周期假设">
              <Segmented options={CYCLE_STAGE} value={stage} onChange={setStage} />
            </Section>

            <label className="block text-xs mb-2" style={{ color: '#71717a' }}>关注产业</label>
            <input
              value={industry}
              onChange={(event) => setIndustry(event.target.value)}
              className="w-full px-4 py-3 text-sm"
              style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#f4f4f6', outline: 'none' }}
              placeholder="例如：AI / 新能源 / 生物科技"
            />
          </div>

          <div className="p-5 md:p-6" style={{ background: '#111113', border: '1px solid rgba(212,168,83,0.18)', borderRadius: 8 }}>
            <div className="text-xs mb-3" style={{ color: '#d4a853' }}>定位结果</div>
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
                写入策略复盘 →
              </Link>
              <Link href="/courses/6" className="btn btn-ghost">
                学习操作手册
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
