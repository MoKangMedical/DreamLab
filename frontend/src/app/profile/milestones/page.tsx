'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ═══════════════════════════════════════════════════
// Achievement definitions
// ═══════════════════════════════════════════════════
interface Achievement {
  id: string;
  name: string;
  desc: string;
  icon: string;
  condition: string;
  unlocked: boolean;
  progress: number; // 0-100
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_assessment', name: '镜子里的自己', desc: '完成第一次心理测评', icon: '🪞', condition: '完成1次测评', unlocked: true, progress: 100 },
  { id: 'dream_keeper', name: '梦境守护者', desc: '记录10个梦境', icon: '🌙', condition: '记录10个梦', unlocked: false, progress: 40 },
  { id: 'three_days', name: '三日的修行', desc: '连续3天打卡', icon: '🔥', condition: '连续3天使用', unlocked: true, progress: 100 },
  { id: 'seven_days', name: '七日的试炼', desc: '连续7天打卡', icon: '✨', condition: '连续7天使用', unlocked: false, progress: 57 },
  { id: 'scholar', name: '油屋的学者', desc: '学完一门完整课程', icon: '📜', condition: '完成1门课程', unlocked: false, progress: 75 },
  { id: 'meditator', name: '河神的弟子', desc: '完成10次冥想', icon: '🧘', condition: '冥想10次', unlocked: false, progress: 50 },
  { id: 'helper', name: '无脸男的馈赠', desc: '在社区帮助他人10次', icon: '👤', condition: '发表10条评论', unlocked: false, progress: 30 },
  { id: 'five_scales', name: '汤婆婆的契约', desc: '完成全部5个量表', icon: '🎭', condition: '完成5个量表', unlocked: false, progress: 60 },
  { id: 'explorer', name: '油屋探险家', desc: '访问平台所有页面', icon: '🏮', condition: '探索全部区域', unlocked: false, progress: 80 },
];

// ═══════════════════════════════════════════════════
// Milestone definitions — 千寻之旅
// ═══════════════════════════════════════════════════
interface Milestone {
  id: string;
  name: string;
  desc: string;
  icon: string;
  color: string;
  done: boolean;
  quote: string;
}

const MILESTONES: Milestone[] = [
  { id: 'face_shadow', name: '穿越遗忘之桥', desc: '完成第一次测评，面对自己的阴影', icon: '◇', color: '#c0392b', done: true, quote: '"不要回头，一直向前。"' },
  { id: 'know_desire', name: '汤婆婆的锅炉房', desc: '学习CBT课程，识别欲望与思维模式', icon: '◎', color: '#e8a820', done: true, quote: '"在油屋不工作的人会变成动物。"' },
  { id: 'accept_lonely', name: '无脸男的浴场', desc: '与AI陪伴对话，接纳孤独', icon: '◈', color: '#8b7ab8', done: true, quote: '"好寂寞...好寂寞啊。"' },
  { id: 'purify', name: '河神的净化', desc: '完成10次冥想，释放情绪淤积', icon: '⬡', color: '#6b9e7a', done: false, quote: '"啊...舒服多了。"' },
  { id: 'find_name', name: '白龙的天空', desc: '完成全部量表和学习，找回自己的名字', icon: '◆', color: '#4a90b8', done: false, quote: '"我想起来了，我的名字是震早剑琥珀主。"' },
];

// ═══════════════════════════════════════════════════
// Stats
// ═══════════════════════════════════════════════════
const STATS = [
  { label: '梦境记录', value: 12, icon: '🌙', color: '#e8a820' },
  { label: '测评完成', value: 3, icon: '🪞', color: '#c0392b' },
  { label: '课程章节', value: 8, icon: '📜', color: '#4a90b8' },
  { label: '冥想次数', value: 5, icon: '🧘', color: '#6b9e7a' },
  { label: '社区发言', value: 6, icon: '💬', color: '#8b7ab8' },
  { label: '连续打卡', value: 4, icon: '🔥', color: '#e8a820' },
];

// ═══════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════
export default function MilestonesPage() {
  const [visible, setVisible] = useState(false);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  const doneCount = MILESTONES.filter(m => m.done).length;
  const journeyProgress = (doneCount / MILESTONES.length) * 100;
  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.unlocked).length;

  const growthReport = {
    totalAssessments: 3,
    totalDreams: 12,
    totalMeditations: 5,
    streak: 4,
    topDimension: '开放性',
    topDimensionScore: 85,
    improvementArea: '睡眠质量',
    summary: '你在过去一个月里展现了积极的自我探索意愿。你完成了3项标准化测评，记录了12个梦境，并坚持了4天连续打卡。你的开放性得分很高——这预示着你对新经验的接纳能力很强。下一步建议关注睡眠质量和冥想习惯的建立。',
  };

  return (
    <div style={{ background: '#060f18', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-32">

        {/* ── Header ── */}
        <div className={`mb-12 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🐉</span>
            <h1 className="font-bold" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(24px, 4vw, 42px)', color: '#f5efe0' }}>
              白龙的成长
            </h1>
          </div>
          <p style={{ color: '#7a7062', fontSize: 15, lineHeight: 1.7 }}>
            像白龙找回自己的名字一样，每一次探索都是拼回完整自我的一块碎片。
          </p>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-12">
          {STATS.map((s, i) => (
            <div key={s.label} className="p-4 text-center transition-all duration-500"
              style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.04)', animationDelay: `${0.1 * i}s` }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs" style={{ color: '#5a5246' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Journey Progress Bar ── */}
        <div className="mb-12 p-6" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold" style={{ color: '#f5efe0' }}>千寻之旅</h3>
            <span className="text-xs" style={{ color: '#e8a820' }}>{doneCount}/{MILESTONES.length} 完成</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 mb-6" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
            <div className="h-full transition-all duration-1000" style={{ width: `${journeyProgress}%`, background: 'linear-gradient(90deg, #c0392b, #e8a820, #4a90b8)', borderRadius: 1 }} />
          </div>
          {/* Milestone nodes */}
          <div className="flex flex-wrap justify-between gap-4">
            {MILESTONES.map((m, i) => (
              <div key={m.id} className="flex-1 min-w-[120px] text-center">
                <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center text-lg transition-all duration-300"
                  style={{
                    background: m.done ? m.color + '15' : 'rgba(122,112,98,0.05)',
                    border: `1px solid ${m.done ? m.color + '30' : 'rgba(122,112,98,0.08)'}`,
                    color: m.done ? m.color : '#5a5246',
                    borderRadius: '50%',
                    opacity: m.done ? 1 : 0.5,
                  }}>
                  {m.icon}
                </div>
                <div className="text-xs font-semibold mb-1" style={{ color: m.done ? '#b8ad9a' : '#5a5246' }}>{m.name}</div>
                <div className="text-xs leading-relaxed" style={{ color: '#5a5246', fontSize: 10 }}>{m.desc}</div>
                {m.done && (
                  <div className="text-xs mt-1 italic" style={{ color: m.color + '99', fontSize: 10 }}>{m.quote}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Achievements ── */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold" style={{ color: '#f5efe0' }}>成就徽章</h3>
            <span className="text-xs" style={{ color: '#e8a820' }}>{unlockedAchievements}/{ACHIEVEMENTS.length} 已解锁</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {ACHIEVEMENTS.map(a => (
              <div key={a.id} className="p-4 transition-all duration-300"
                style={{
                  background: a.unlocked ? `${a.id === 'first_assessment' ? '#c0392b' : '#e8a820'}08` : '#0a1620',
                  border: `1px solid ${a.unlocked ? 'rgba(232,168,32,0.15)' : 'rgba(255,255,255,0.04)'}`,
                  opacity: a.unlocked ? 1 : 0.6,
                }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{a.icon}</span>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: a.unlocked ? '#f5efe0' : '#7a7062' }}>{a.name}</div>
                    <div className="text-xs" style={{ color: '#5a5246' }}>{a.condition}</div>
                  </div>
                  {a.unlocked && <span className="ml-auto text-xs" style={{ color: '#e8a820' }}>✓</span>}
                </div>
                <p className="text-xs" style={{ color: '#7a7062', lineHeight: 1.6 }}>{a.desc}</p>
                {!a.unlocked && (
                  <div className="mt-2 h-1" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 1 }}>
                    <div className="h-full transition-all" style={{ width: `${a.progress}%`, background: 'rgba(232,168,32,0.3)', borderRadius: 1 }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Growth Report ── */}
        <div className="mb-12" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div
            className="p-6 flex items-center justify-between cursor-pointer"
            onClick={() => setShowReport(!showReport)}
            style={{ cursor: 'pointer' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <div>
                <h3 className="text-sm font-bold" style={{ color: '#f5efe0' }}>成长报告</h3>
                <p className="text-xs" style={{ color: '#5a5246' }}>基于你的使用数据生成</p>
              </div>
            </div>
            <span style={{ color: '#5a5246', transform: showReport ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>▼</span>
          </div>
          {showReport && (
            <div className="px-6 pb-6 pt-0">
              <div className="mb-4 p-4" style={{ background: '#060f18', border: '1px solid rgba(255,255,255,0.04)' }}>
                <p className="text-sm leading-relaxed" style={{ color: '#b8ad9a', lineHeight: 1.8 }}>
                  {growthReport.summary}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: '最强维度', value: growthReport.topDimension, sub: `${growthReport.topDimensionScore}分`, color: '#e8a820' },
                  { label: '待改善', value: growthReport.improvementArea, sub: '建议关注', color: '#c0392b' },
                  { label: '测评完成', value: `${growthReport.totalAssessments} 项`, sub: '累计', color: '#4a90b8' },
                  { label: '连续打卡', value: `${growthReport.streak} 天`, sub: '继续加油', color: '#6b9e7a' },
                ].map(item => (
                  <div key={item.label} className="p-3 text-center" style={{ background: '#060f18' }}>
                    <div className="text-xs mb-1" style={{ color: '#5a5246' }}>{item.label}</div>
                    <div className="text-sm font-bold mb-0.5" style={{ color: item.color }}>{item.value}</div>
                    <div className="text-xs" style={{ color: '#5a5246' }}>{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Link back ── */}
        <div className="text-center">
          <Link href="/profile"
            className="text-xs transition-colors duration-300"
            style={{ color: '#5a5246', fontFamily: 'Inter, sans-serif' }}>
            ← 返回个人中心
          </Link>
        </div>
      </div>
    </div>
  );
}
