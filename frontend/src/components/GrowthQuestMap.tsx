'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DAILY_QUESTS, QUEST_BADGES, QUEST_NODES, QUEST_PROFILE, SKILL_TREE } from '@/lib/growth-quest';

type QuestNode = typeof QUEST_NODES[number];

function nodeStatusLabel(status: QuestNode['status']) {
  if (status === 'done') return '已完成';
  if (status === 'active') return '进行中';
  if (status === 'open') return '可开启';
  return '待解锁';
}

export default function GrowthQuestMap() {
  const [selectedId, setSelectedId] = useState<string>(QUEST_NODES.find((node) => node.status === 'active')?.id || QUEST_NODES[0].id);
  const selected = QUEST_NODES.find((node) => node.id === selectedId) || QUEST_NODES[0];
  const xpPercent = Math.round((QUEST_PROFILE.xp / QUEST_PROFILE.nextLevelXp) * 100);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.58fr_0.92fr] gap-10 lg:gap-12">
      <section className="relative min-h-[740px] p-8 md:p-12 overflow-hidden" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 22% 28%, rgba(212,168,83,0.16), transparent 28%), radial-gradient(circle at 78% 22%, rgba(90,125,154,0.12), transparent 26%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 45%)',
          }}
        />
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-10 mb-16">
          <div>
            <div className="text-xs tracking-[0.18em] mb-4" style={{ color: 'rgba(212,168,83,0.62)' }}>QUEST MAP</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6', lineHeight: 1.12 }}>
              心智成长地图
            </h2>
            <p className="text-sm md:text-base leading-10 max-w-2xl" style={{ color: '#85858e' }}>
              每个节点都是一次真实行动。用户像走主线任务一样完成测评、记录、课程、反思和复盘。
            </p>
          </div>

          <div className="p-8 min-w-[280px]" style={{ background: 'rgba(10,10,12,0.72)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
            <div className="flex items-end justify-between mb-5">
              <div>
                <div className="text-xs mb-1" style={{ color: '#71717a' }}>{QUEST_PROFILE.title}</div>
                <div className="text-3xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#d4a853' }}>Lv.{QUEST_PROFILE.level}</div>
              </div>
              <div className="text-xs text-right" style={{ color: '#71717a' }}>
                连续 {QUEST_PROFILE.streakDays} 天<br />完成率 {QUEST_PROFILE.completionRate}%
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="h-full rounded-full" style={{ width: `${xpPercent}%`, background: 'linear-gradient(90deg, #d4a853, #72a66a)' }} />
            </div>
            <div className="flex justify-between text-xs" style={{ color: '#52525b' }}>
              <span>{QUEST_PROFILE.xp} XP</span>
              <span>{QUEST_PROFILE.nextLevelXp} XP</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 hidden md:block h-[430px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M8 62 C18 28, 31 29, 45 56 S69 22, 82 52 S90 48, 94 26"
              fill="none"
              stroke="rgba(212,168,83,0.18)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="2 2"
            />
            <path
              d="M8 62 C18 28, 31 29, 45 56"
              fill="none"
              stroke="rgba(212,168,83,0.55)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>

          {QUEST_NODES.map((node) => {
            const selectedNode = selected.id === node.id;
            const locked = node.status === 'locked';
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedId(node.id)}
                className="absolute text-left transition-all duration-300"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: locked ? 0.52 : 1,
                }}
              >
                <span
                  className="relative flex items-center justify-center w-[72px] h-[72px] text-lg font-bold"
                  style={{
                    background: selectedNode ? `${node.color}26` : 'rgba(10,10,12,0.86)',
                    border: `1px solid ${selectedNode ? node.color : `${node.color}55`}`,
                    color: node.color,
                    borderRadius: 14,
                    boxShadow: selectedNode ? `0 0 34px ${node.color}26` : 'none',
                  }}
                >
                  {node.status === 'locked' ? '锁' : node.act.replace('第', '').replace('章', '').replace('序章', '序').replace('终章', '终')}
                </span>
                <span className="block mt-4 min-w-[150px]">
                  <span className="block text-sm font-bold" style={{ color: selectedNode ? '#f4f4f6' : '#a1a1aa', fontFamily: "'Noto Serif SC', serif" }}>{node.title}</span>
                  <span className="block text-xs mt-1" style={{ color: node.color }}>{nodeStatusLabel(node.status)}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative z-10 md:hidden space-y-5">
          {QUEST_NODES.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedId(node.id)}
              className="w-full flex items-start gap-5 p-5 text-left"
              style={{
                background: selected.id === node.id ? `${node.color}12` : 'rgba(10,10,12,0.72)',
                border: `1px solid ${selected.id === node.id ? `${node.color}44` : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 8,
                opacity: node.status === 'locked' ? 0.56 : 1,
              }}
            >
              <span className="w-10 h-10 flex items-center justify-center text-sm font-bold shrink-0" style={{ color: node.color, border: `1px solid ${node.color}44`, borderRadius: 8 }}>
                {node.status === 'locked' ? '锁' : node.act.replace('第', '').replace('章', '').replace('序章', '序').replace('终章', '终')}
              </span>
              <span>
                <span className="block text-base font-bold" style={{ color: '#f4f4f6', fontFamily: "'Noto Serif SC', serif" }}>{node.title}</span>
                <span className="block text-xs mt-1" style={{ color: node.color }}>{nodeStatusLabel(node.status)}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <aside className="space-y-8">
        <div className="p-8 md:p-10" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
          <div className="text-xs mb-5" style={{ color: selected.color }}>{selected.act}</div>
          <h3 className="text-2xl font-bold mb-5" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{selected.title}</h3>
          <p className="text-sm leading-10 mb-8" style={{ color: '#85858e' }}>{selected.desc}</p>
          <div className="text-xs mb-10" style={{ color: '#d4a853' }}>{selected.reward}</div>
          <Link href={selected.href} className={selected.status === 'locked' ? 'btn btn-ghost pointer-events-none opacity-50' : 'btn btn-primary'}>
            {selected.status === 'locked' ? '完成前置任务' : '进入任务 →'}
          </Link>
        </div>

        <div className="p-8 md:p-10" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
          <h3 className="text-xl font-bold mb-8" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>今日任务</h3>
          <div className="space-y-6">
            {DAILY_QUESTS.map((quest) => (
              <Link key={quest.title} href={quest.href} className="block p-6" style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                <div className="flex items-center justify-between gap-5 mb-3">
                  <span className="text-sm font-bold" style={{ color: '#f4f4f6' }}>{quest.title}</span>
                  <span className="text-xs" style={{ color: quest.color }}>{quest.reward}</span>
                </div>
                <p className="text-xs leading-7 mb-4" style={{ color: '#85858e' }}>{quest.task}</p>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full" style={{ width: `${quest.progress}%`, background: quest.color }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <section className="xl:col-span-2 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12">
        <div className="p-8 md:p-12" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
          <h3 className="text-2xl font-bold mb-10" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>能力树</h3>
          <div className="space-y-8">
            {SKILL_TREE.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between gap-5 mb-3">
                  <div>
                    <div className="text-sm font-bold" style={{ color: '#f4f4f6' }}>{skill.name}</div>
                    <div className="text-xs mt-1" style={{ color: '#71717a' }}>{skill.desc}</div>
                  </div>
                  <div className="text-sm font-bold" style={{ color: skill.color }}>{skill.level}/{skill.max}</div>
                </div>
                <div className="grid grid-cols-10 gap-1">
                  {Array.from({ length: skill.max }).map((_, index) => (
                    <div
                      key={index}
                      className="h-2 rounded-full"
                      style={{ background: index < skill.level ? skill.color : 'rgba(255,255,255,0.06)' }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
          <h3 className="text-2xl font-bold mb-10" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>徽章墙</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {QUEST_BADGES.map((badge) => (
              <div
                key={badge.name}
                className="p-5 text-center"
                style={{
                  background: badge.unlocked ? `${badge.color}10` : '#0a0a0c',
                  border: `1px solid ${badge.unlocked ? `${badge.color}33` : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: 8,
                  opacity: badge.unlocked ? 1 : 0.55,
                }}
              >
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center font-bold" style={{ color: badge.color, border: `1px solid ${badge.color}44`, borderRadius: '50%', fontFamily: "'Noto Serif SC', serif" }}>
                  {badge.icon}
                </div>
                <div className="text-sm font-bold mb-1" style={{ color: '#f4f4f6', fontFamily: "'Noto Serif SC', serif" }}>{badge.name}</div>
                <div className="text-xs leading-5" style={{ color: '#71717a' }}>{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
