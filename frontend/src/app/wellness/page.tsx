'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const API_BASE = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || '') : '';

type Tab = 'meditation' | 'breathing' | 'dashboard' | 'gratitude' | 'sleep';

const TABS: { key: Tab; label: string; icon: string; desc: string }[] = [
  { key: 'meditation', label: '冥想', icon: '🧘', desc: '引导式冥想，安住在当下' },
  { key: 'breathing', label: '呼吸', icon: '🫁', desc: '呼吸是唯一同时由自主和非自主神经控制的生理活动——它是意识与身体的桥梁' },
  { key: 'dashboard', label: '仪表盘', icon: '📊', desc: '数据可视化你的心理状态变化' },
  { key: 'gratitude', label: '感恩', icon: '💝', desc: '研究表明，每天写下3件感恩的事，持续21天可显著提升幸福感' },
  { key: 'sleep', label: '睡眠', icon: '🌙', desc: '睡眠是大脑的"垃圾清理时间"——类淋巴系统在深度睡眠中清除代谢废物' },
];

// ── 预设冥想 ──
const MEDITATION_PRESETS = [
  {
    id: 1, title: '河神的净化', icon: '♨️', duration: 3,
    description: '跟随河神，想象清流冲刷身体的每一个角落，带走所有疲惫与不安。',
    steps: [
      { type: 'breathe_in', text: '深长吸气，想象清澈的水流入身体', seconds: 4 },
      { type: 'hold', text: '屏息，感受水的清凉在体内停留', seconds: 2 },
      { type: 'breathe_out', text: '缓缓呼气，水带走所有疲惫与不安', seconds: 6 },
      { type: 'rest', text: '安静感受此刻的清澈', seconds: 3 },
      { type: 'breathe_in', text: '再次吸气，水从头顶流向脚底', seconds: 4 },
      { type: 'breathe_out', text: '呼出最后一丝沉闷', seconds: 6 },
    ],
    science: '引导式身体扫描冥想通过将注意力在身体各部位之间移动，降低杏仁核活动（焦虑中枢），增强前额叶对情绪的调控能力。',
  },
  {
    id: 2, title: '千寻的勇气', icon: '🌅', duration: 5,
    description: '像千寻一样面对未知——恐惧不是敌人，是成长的信使。',
    steps: [
      { type: 'breathe_in', text: '吸气，感受勇气的温暖在胸口聚集', seconds: 4 },
      { type: 'hold', text: '屏息，面对内心的恐惧而不逃避', seconds: 3 },
      { type: 'breathe_out', text: '呼气，让恐惧随着呼吸离开', seconds: 6 },
      { type: 'rest', text: '安静感受勇敢的存在', seconds: 4 },
      { type: 'breathe_in', text: '吸气——我是安全的', seconds: 4 },
      { type: 'breathe_out', text: '呼气——我能够面对', seconds: 6 },
      { type: 'rest', text: '勇气不需要完美，只需要一步', seconds: 5 },
    ],
    science: '重复积极自我肯定与深呼吸结合，可激活腹侧纹状体的奖赏回路，提升自我效能感。8周正念练习可增加前额叶灰质密度。',
  },
  {
    id: 3, title: '无脸男的安宁', icon: '👤', duration: 3,
    description: '和无脸男一起，安静地在角落里坐一会儿。不需要说话，不需要做什么。',
    steps: [
      { type: 'breathe_in', text: '放慢呼吸——不着急', seconds: 5 },
      { type: 'rest', text: '只是坐着，什么都不需要做', seconds: 8 },
      { type: 'breathe_in', text: '再慢一点', seconds: 5 },
      { type: 'rest', text: '被接纳的感觉——就是这样', seconds: 10 },
    ],
    science: '"无为"冥想激活默认模式网络中的自我参照处理，同时降低后扣带回皮层的过度活跃——这正是焦虑和反刍思维的核心区域。',
  },
  {
    id: 4, title: '锅炉爷爷的专注', icon: '🔥', duration: 5,
    description: '像锅炉爷爷一样，全神贯注于当下的一件事。杂念来了又走，你只是继续手上的工作。',
    steps: [
      { type: 'breathe_in', text: '把注意力锚定在呼吸上', seconds: 4 },
      { type: 'breathe_out', text: '杂念就像锅炉房的蒸汽——让它飘走', seconds: 6 },
      { type: 'breathe_in', text: '回来，回到呼吸', seconds: 4 },
      { type: 'breathe_out', text: '每一次回来，都是专注力的锻炼', seconds: 6 },
      { type: 'rest', text: '专注地观察内心此刻的状态', seconds: 5 },
    ],
    science: '专注冥想（Focused Attention）训练背侧注意网络，每次觉察走神并"拉回"的过程，就像大脑做俯卧撑。持续练习8周可显著提升持续注意力。',
  },
];

// ── 呼吸练习 ──
const BREATHING_EXERCISES = [
  { id: 'box', title: '盒式呼吸 (Navy SEALs 法)', icon: '⬜', desc: '4-4-4-4 · 稳定情绪 · 专注放松', pattern: { in: 4, hold: 4, out: 4, holdOut: 4 }, science: '激活副交感神经系统，降低心率变异性。被美国海军海豹突击队用于高压环境下的情绪调控。' },
  { id: '478', title: '4-7-8 呼吸 (Weil 法)', icon: '🌙', desc: '吸气4·屏息7·呼气8 · 助眠', pattern: { in: 4, hold: 7, out: 8, holdOut: 0 }, science: 'Andrew Weil 博士推广的自然镇静法。延长呼气时间触发"放松反应"，是已知最快的非药物入眠诱导法之一。' },
  { id: 'calm', title: '平静呼吸', icon: '🕯️', desc: '吸气4·呼气6 · 日常减压', pattern: { in: 4, hold: 0, out: 6, holdOut: 0 }, science: '呼气时间 > 吸气时间时，心率自然下降。每次练习5分钟，每日3次，可显著降低皮质醇水平。' },
  { id: 'energy', title: '能量呼吸 (Kapalabhati)', icon: '⚡', desc: '快速呼气·被动吸气 · 提神醒脑', pattern: { in: 2, hold: 0, out: 1, holdOut: 0 }, science: '强力的腹式呼气刺激交感神经系统，提升警觉度。注意：高血压、心脏病、孕期慎用。' },
];

export default function WellnessPage() {
  const [tab, setTab] = useState<Tab>('meditation');
  const [visible, setVisible] = useState(false);
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => { setVisible(true); }, []);

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <div className={`max-w-4xl mx-auto px-4 pt-14 pb-28 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {/* ════════════════ Hero ════════════════ */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">♨️</div>
          <h1 className="font-bold mb-3" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            color: '#f4f4f6',
          }}>
            河神的净化汤
          </h1>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: '#71717a' }}>
            心智健康不是没有问题，而是拥有应对问题的工具。
            这里是你每日的心灵澡堂。
          </p>
        </div>

        {/* ════════════════ Tabs ════════════════ */}
        <div className="flex justify-center gap-1 mb-8 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all whitespace-nowrap ${
                tab === t.key
                  ? 'text-[#f4f4f6] border-[#d4a85330]'
                  : 'text-[#52525b] hover:text-[#a1a1aa]'
              }`}
              style={{
                background: tab === t.key ? 'rgba(212,168,83,0.08)' : 'transparent',
                border: tab === t.key ? '1px solid rgba(212,168,83,0.2)' : '1px solid transparent',
                borderRadius: 2,
              }}>
              <span>{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* 标签描述 */}
        <p className="text-xs text-center mb-8 leading-relaxed" style={{ color: '#52525b' }}>
          {TABS.find(t => t.key === tab)?.desc}
        </p>

        {/* Content */}
        <div ref={el => { tabRefs.current[tab] = el; }}>
          {tab === 'meditation' && <MeditationTab />}
          {tab === 'breathing' && <BreathingTab />}
          {tab === 'dashboard' && <DashboardTab />}
          {tab === 'gratitude' && <GratitudeTab />}
          {tab === 'sleep' && <SleepTab />}
        </div>
      </div>
    </div>
  );
}

// ============ 冥想标签 ============
function MeditationTab() {
  const [active, setActive] = useState<any>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showScience, setShowScience] = useState(false);
  const timerRef = useRef<any>(null);

  const start = (m: any) => {
    stop();
    setActive(m);
    setStep(0);
    setPlaying(true);
    setShowScience(false);
  };

  const stop = () => {
    setPlaying(false);
    setActive(null);
    setStep(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (!playing || !active) return;
    if (step >= active.steps.length) { stop(); return; }
    const s = active.steps[step];
    timerRef.current = setTimeout(() => setStep(prev => prev + 1), s.seconds * 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [step, playing, active]);

  if (active) {
    const s = active.steps[step];
    const progress = ((step + 1) / active.steps.length) * 100;
    const isIn = s?.type === 'breathe_in';
    const isOut = s?.type === 'breathe_out';

    return (
      <div className="p-8 text-center" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
        <div className="text-5xl mb-4">{active.icon}</div>
        <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>
          {active.title}
        </h3>
        <p className="text-xs mb-6" style={{ color: '#52525b' }}>
          步骤 {step + 1} / {active.steps.length} · {active.duration} 分钟
        </p>

        {/* 呼吸动画圈 */}
        <div className="flex justify-center mb-6">
          <div className={`w-28 h-28 rounded-full transition-all duration-[2000ms] flex items-center justify-center ${
            isIn ? 'scale-125' : isOut ? 'scale-75' : 'scale-100'
          }`} style={{
            background: isIn ? 'radial-gradient(circle, rgba(212,168,83,0.15), rgba(19,19,22,0.5))'
              : isOut ? 'radial-gradient(circle, rgba(90,125,154,0.15), rgba(19,19,22,0.5))'
              : 'radial-gradient(circle, rgba(59,139,122,0.15), rgba(19,19,22,0.5))',
            border: `2px solid ${isIn ? 'rgba(212,168,83,0.3)' : isOut ? 'rgba(90,125,154,0.3)' : 'rgba(59,139,122,0.3)'}`,
          }}>
            <span className="text-3xl">{isIn ? '🫁' : isOut ? '💨' : '✨'}</span>
          </div>
        </div>

        <p className="text-lg mb-2" style={{ color: '#f4f4f6' }}>{s?.text}</p>
        <p className="text-xs" style={{ color: '#71717a' }}>{s?.seconds}秒</p>

        {/* 进度条 */}
        <div className="mt-6 h-1 rounded-full overflow-hidden" style={{ background: '#ffffff08' }}>
          <div className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #3b8b7a, #d4a853)' }} />
        </div>

        <button onClick={stop} className="mt-6 px-6 py-2 text-sm transition-all"
          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#a1a1aa', borderRadius: 2, cursor: 'pointer' }}>
          结束冥想
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 冥想科普 */}
      <div className="p-6" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🧘</span>
          <h3 className="font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>
            为什么冥想？
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
          {[
            { label: '降低焦虑', desc: '8周正念冥想可减少杏仁核灰质密度，降低应激反应', icon: '😌' },
            { label: '提升专注', desc: '每次"走神-拉回"都是注意力肌肉的锻炼', icon: '🎯' },
            { label: '改善睡眠', desc: '入睡前冥想激活副交感神经，帮助身体进入休息模式', icon: '😴' },
          ].map(item => (
            <div key={item.label} className="p-3" style={{ background: '#0a0a0c', borderRadius: 2 }}>
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="text-xs font-bold mb-1" style={{ color: '#f4f4f6' }}>{item.label}</div>
              <div className="text-xs leading-relaxed" style={{ color: '#71717a' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 冥想列表 */}
      <div className="space-y-3">
        {MEDITATION_PRESETS.map(m => (
          <div key={m.id} className="p-5 cursor-pointer transition-all hover:translate-x-1"
            style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}
            onClick={() => start(m)}>
            <div className="flex items-center gap-4">
              <div className="text-3xl">{m.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm mb-1" style={{ color: '#f4f4f6' }}>{m.title}</h3>
                <p className="text-xs mb-1" style={{ color: '#71717a' }}>{m.description}</p>
                <p className="text-xs" style={{ color: '#52525b' }}>
                  {m.duration} 分钟 · {m.steps.length} 步
                </p>
              </div>
              <div className="text-xs shrink-0" style={{ color: '#d4a853' }}>▶ 开始</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ 呼吸标签 ============
function BreathingTab() {
  const [activeEx, setActiveEx] = useState<any>(null);
  const [phase, setPhase] = useState<'in' | 'hold' | 'out' | 'holdOut' | null>(null);
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [running, setRunning] = useState(false);
  const [showScience, setShowScience] = useState<string | null>(null);
  const timerRef = useRef<any>(null);

  const run = useCallback((ex: any, ph: 'in' | 'hold' | 'out' | 'holdOut' | 'start', cy: number) => {
    if (ph === 'start') {
      setActiveEx(ex); setRunning(true); setCycle(0);
      run(ex, 'in', 0);
      return;
    }
    const seconds = ex.pattern[ph === 'holdOut' ? 'holdOut' : ph];
    if (seconds === 0) {
      const next: Record<string, string> = { in: 'hold', hold: 'out', out: 'holdOut', holdOut: 'in' };
      const n = next[ph] as 'in' | 'hold' | 'out' | 'holdOut';
      const newCycle = n === 'in' ? cy + 1 : cy;
      if (newCycle >= 5) { setRunning(false); setPhase(null); setActiveEx(null); return; }
      setCycle(newCycle); setPhase(n); setCount(0);
      timerRef.current = setTimeout(() => run(ex, n, newCycle), 100);
      return;
    }
    setPhase(ph); setCount(seconds);
    const interval = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          clearInterval(interval);
          const next: Record<string, string> = { in: 'hold', hold: 'out', out: 'holdOut', holdOut: 'in' };
          const n = next[ph] as 'in' | 'hold' | 'out' | 'holdOut';
          const newCycle = n === 'in' ? cy + 1 : cy;
          if (newCycle >= 5) { setRunning(false); setPhase(null); setActiveEx(null); return 0; }
          setTimeout(() => run(ex, n, newCycle), 50);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    timerRef.current = interval;
  }, []);

  const stopBreathing = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRunning(false); setPhase(null); setActiveEx(null); setCount(0);
  };

  const phaseLabel: Record<string, string> = { in: '吸气', hold: '屏息', out: '呼气', holdOut: '屏息' };

  return (
    <div>
      {running && activeEx ? (
        <div className="p-8 text-center" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
          <div className="text-5xl mb-4">{activeEx.icon}</div>
          <h3 className="text-lg font-bold mb-2" style={{ color: '#f4f4f6' }}>{activeEx.title}</h3>

          <div className="flex justify-center my-8">
            <div className={`w-36 h-36 rounded-full transition-all duration-[4000ms] flex items-center justify-center ${
              phase === 'in' ? 'scale-125' : phase === 'out' ? 'scale-75' : 'scale-100'
            }`} style={{
              background: phase === 'in' ? 'radial-gradient(circle, rgba(59,139,122,0.2), rgba(19,19,22,0.5))'
                : phase === 'out' ? 'radial-gradient(circle, rgba(90,125,154,0.2), rgba(19,19,22,0.5))'
                : 'radial-gradient(circle, rgba(212,168,83,0.2), rgba(19,19,22,0.5))',
              border: `2px solid ${phase === 'in' ? 'rgba(59,139,122,0.3)' : phase === 'out' ? 'rgba(90,125,154,0.3)' : 'rgba(212,168,83,0.3)'}`,
            }}>
              <span className="text-3xl font-bold" style={{ color: '#f4f4f6' }}>{count}</span>
            </div>
          </div>

          <p className="text-sm" style={{ color: '#a1a1aa' }}>
            {phase && phaseLabel[phase]} · 第 {cycle + 1} / 5 轮
          </p>

          <button onClick={stopBreathing} className="mt-6 px-6 py-2 text-sm"
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#a1a1aa', borderRadius: 2, cursor: 'pointer' }}>
            停止
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {BREATHING_EXERCISES.map(ex => (
            <div key={ex.id} className="p-5 transition-all"
              style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
              <div className="flex items-center gap-4">
                <div className="text-3xl">{ex.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-1" style={{ color: '#f4f4f6' }}>{ex.title}</h3>
                  <p className="text-xs" style={{ color: '#71717a' }}>{ex.desc}</p>
                  {showScience === ex.id && (
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: '#52525b' }}>
                      {ex.science}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); setShowScience(showScience === ex.id ? null : ex.id); }}
                    className="text-xs transition-colors" style={{ color: showScience === ex.id ? '#d4a853' : '#52525b' }}>
                    {showScience === ex.id ? '收起' : '原理'}
                  </button>
                  <button onClick={() => run(ex, 'start', 0)}
                    className="text-xs px-3 py-1.5 transition-all"
                    style={{ background: '#d4a853', color: '#0a0a0c', borderRadius: 2, border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                    ▶ 开始
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ 仪表盘 ============
function DashboardTab() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch(`${API_BASE}/api/wellness/dashboard?user_id=1`).then(r => r.json()).then(setData).catch(() => {});
  }, []);

  if (!data) return (
    <div className="text-center py-16">
      <div className="text-4xl mb-4">📊</div>
      <p className="text-sm" style={{ color: '#71717a' }}>正在加载你的仪表盘...</p>
      <p className="text-xs mt-2" style={{ color: '#52525b' }}>需要更多数据才能生成趋势（请先记录情绪、睡眠和感恩日记）</p>
    </div>
  );

  const moodMax = Math.max(...(data.mood_trend || []).map((d: any) => d.score), 10);

  return (
    <div className="space-y-6">
      {/* 概览卡片 */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: '平均情绪', value: data.avg_mood || '--', unit: '/10', color: '#d4a853', tip: '情绪是内心的晴雨表——没有"好"或"坏"的情绪，每一种都在告诉你一些重要的信息' },
          { label: '感恩日记', value: data.gratitude_count || 0, unit: '篇', color: '#c4554d', tip: '感恩是一项可以锻炼的心理技能，而非天生的性格特质' },
          { label: '冥想次数', value: data.meditation_count || 0, unit: '次', color: '#6b5b8a', tip: '冥想不在于"想什么"，而在于"觉察什么"' },
          { label: '统计天数', value: data.days, unit: '天', color: '#3b8b7a', tip: '坚持是唯一的捷径——21天足以养成一个新习惯' },
        ].map((card, i) => (
          <div key={i} className="p-4 text-center" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
            <div className="text-3xl font-bold mb-1" style={{ color: card.color }}>{card.value}</div>
            <div className="text-xs mb-2" style={{ color: '#52525b' }}>{card.label}{card.unit}</div>
            <div className="text-xs leading-relaxed" style={{ color: '#52525b' }}>{card.tip}</div>
          </div>
        ))}
      </div>

      {/* 情绪趋势 */}
      {data.mood_trend?.length > 0 && (
        <div className="p-6" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: '#f4f4f6' }}>📈 情绪趋势</h3>
          <div className="flex items-end gap-1 h-24">
            {data.mood_trend.map((d: any, i: number) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t transition-all"
                  style={{
                    height: `${(d.score / moodMax) * 80}px`,
                    background: `linear-gradient(180deg, #c4554d, #d4a853)`,
                    opacity: 0.6 + (d.score / moodMax) * 0.4,
                  }} />
                <span className="text-xs" style={{ color: '#52525b' }}>{d.date.slice(3)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 睡眠趋势 */}
      {data.sleep_trend?.length > 0 && (
        <div className="p-6" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: '#f4f4f6' }}>😴 睡眠趋势</h3>
          <div className="space-y-2">
            {data.sleep_trend.slice(-7).map((d: any, i: number) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <span className="w-10" style={{ color: '#52525b' }}>{d.date.slice(3)}</span>
                <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: '#ffffff05' }}>
                  <div className="h-full rounded-full transition-all"
                    style={{
                      width: `${(d.hours / 10) * 100}%`,
                      background: d.hours >= 7 ? 'linear-gradient(90deg, #5a7d9a, #3b8b7a)' : 'linear-gradient(90deg, #c4554d, #d4a853)',
                    }} />
                </div>
                <span className="w-12 text-right" style={{ color: '#a1a1aa' }}>{d.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ 感恩日记 ============
function GratitudeTab() {
  const [logs, setLogs] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);

  const PROMPTS = [
    '今天让我微笑的一件小事是...',
    '有一个人让我感到被关心——那是...',
    '我为自己今天做的这件事感到骄傲...',
    '今天的大自然给了我一个惊喜...',
    '一个让我感到舒适的日常习惯是...',
  ];

  useEffect(() => {
    fetch(`${API_BASE}/api/wellness/logs?log_type=gratitude&user_id=1`)
      .then(r => r.json()).then(setLogs).catch(() => {});
  }, [submitted]);

  const submit = async () => {
    if (!content.trim()) return;
    await fetch(`${API_BASE}/api/wellness/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 1, log_type: 'gratitude',
        title: '感恩时刻', content, tags: ['感恩'],
      }),
    });
    setContent(''); setSubmitted(s => !s); setShowPrompts(false);
  };

  return (
    <div className="space-y-5">
      {/* 科普 */}
      <div className="p-5" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">💝</span>
          <h3 className="font-bold text-sm" style={{ color: '#f4f4f6' }}>感恩的科学</h3>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: '#71717a', lineHeight: 2.0 }}>
          2003年，Emmons & McCullough 的经典实验发现：连续10周每周写下5件感恩事件的小组，比"写烦恼"和"写日常"的小组表现出+25%的幸福感提升和更少的身体不适。感恩不是否认困难，而是在困难中训练自己看见光亮的能力。
        </p>
      </div>

      {/* 写作区 */}
      <div className="p-6" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
        <h3 className="text-sm font-bold mb-3" style={{ color: '#f4f4f6' }}>今天，你感恩什么？</h3>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="写下三件让你感恩的小事...可以是清晨的咖啡、朋友的消息、一阵凉风。"
          className="w-full resize-none text-sm mb-3 p-4"
          style={{
            background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2,
            color: '#a1a1aa', outline: 'none', minHeight: '80px', lineHeight: 2.0,
          }}
          rows={3}
        />
        <div className="flex items-center justify-between">
          <button onClick={() => setShowPrompts(!showPrompts)} className="text-xs"
            style={{ color: '#52525b', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
            {showPrompts ? '收起提示' : '需要灵感？'}
          </button>
          <button onClick={submit} disabled={!content.trim()}
            className="px-6 py-2.5 text-sm font-semibold transition-all disabled:opacity-30"
            style={{ background: '#d4a853', color: '#0a0a0c', borderRadius: 2, border: 'none', cursor: 'pointer' }}>
            记录感恩
          </button>
        </div>

        {showPrompts && (
          <div className="mt-4 space-y-2">
            {PROMPTS.map((p, i) => (
              <div key={i} className="p-3 cursor-pointer text-xs transition-all hover:border-[#d4a85320]"
                style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}
                onClick={() => setContent(prev => prev + (prev ? '\n' : '') + p + ' ')}>
                <span style={{ color: '#a1a1aa' }}>{p}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 记录列表 */}
      {logs.map((log: any) => (
        <div key={log.id} className="p-4 text-sm"
          style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
          <p className="leading-relaxed mb-2" style={{ color: '#a1a1aa' }}>{log.content}</p>
          <span className="text-xs" style={{ color: '#52525b' }}>
            {new Date(log.created_at).toLocaleDateString('zh-CN')}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============ 睡眠日志 ============
function SleepTab() {
  const [logs, setLogs] = useState<any[]>([]);
  const [hours, setHours] = useState(7);
  const [quality, setQuality] = useState(3);
  const [dreamRecall, setDreamRecall] = useState(false);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const HYGIENE_TIPS = [
    '🕐 每天同一时间上床和起床——包括周末',
    '📱 睡前1小时放下手机（蓝光抑制褪黑素分泌）',
    '🌡️ 卧室温度18-22°C最适合睡眠',
    '☕ 咖啡因的半衰期是5小时——下午2点后避免摄入',
    '🧘 睡前做5分钟呼吸练习有助于入睡',
    '📝 如果脑子很乱，把想法写下来再睡',
  ];

  useEffect(() => {
    fetch(`${API_BASE}/api/wellness/logs?log_type=sleep&user_id=1`)
      .then(r => r.json()).then(setLogs).catch(() => {});
  }, [submitted]);

  const submit = async () => {
    await fetch(`${API_BASE}/api/wellness/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 1, log_type: 'sleep',
        title: `睡眠 ${hours}小时`,
        content: notes || null,
        sleep_hours: hours,
        sleep_quality: quality,
        tags: dreamRecall ? ['做梦'] : [],
      }),
    });
    setNotes(''); setSubmitted(s => !s);
  };

  return (
    <div className="space-y-5">
      {/* 睡眠卫生 */}
      <div className="p-5" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🌙</span>
          <h3 className="font-bold text-sm" style={{ color: '#f4f4f6' }}>睡眠卫生小贴士</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {HYGIENE_TIPS.map((tip, i) => (
            <div key={i} className="text-xs leading-relaxed" style={{ color: '#71717a' }}>
              {tip}
            </div>
          ))}
        </div>
      </div>

      {/* 记录表单 */}
      <div className="p-6" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
        <h3 className="text-sm font-bold mb-4" style={{ color: '#f4f4f6' }}>记录昨晚的睡眠</h3>

        <label className="text-xs mb-2 block font-medium" style={{ color: '#71717a' }}>
          睡眠时长: {hours} 小时
        </label>
        <input
          type="range" min={0} max={14} step={0.5} value={hours}
          onChange={e => setHours(parseFloat(e.target.value))}
          className="w-full mb-4"
          style={{ accentColor: '#d4a853' }}
        />

        <label className="text-xs mb-2 block font-medium" style={{ color: '#71717a' }}>睡眠质量</label>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map(q => (
            <button key={q} onClick={() => setQuality(q)}
              className="w-10 h-10 text-lg transition-all"
              style={{
                background: quality >= q ? 'rgba(212,168,83,0.1)' : '#0a0a0c',
                border: quality >= q ? '1px solid rgba(212,168,83,0.3)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: 2,
                color: quality >= q ? '#d4a853' : '#52525b',
              }}>
              {q <= 3 ? '😴' : q === 4 ? '😊' : '✨'}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 mb-4 text-xs" style={{ color: '#71717a', cursor: 'pointer' }}>
          <input type="checkbox" checked={dreamRecall} onChange={e => setDreamRecall(e.target.checked)}
            style={{ accentColor: '#d4a853' }} />
          记得昨晚的梦
        </label>

        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="笔记（可选）：睡前在做什么？有没有半夜醒来？醒来时什么感觉？"
          rows={2}
          className="w-full resize-none text-xs mb-4 p-3"
          style={{
            background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2,
            color: '#a1a1aa', outline: 'none', lineHeight: 1.9,
          }}
        />

        <button onClick={submit}
          className="px-6 py-2.5 text-sm font-semibold transition-all"
          style={{ background: '#d4a853', color: '#0a0a0c', borderRadius: 2, border: 'none', cursor: 'pointer' }}>
          记录睡眠
        </button>
      </div>

      {/* 记录列表 */}
      {logs.map((log: any) => (
        <div key={log.id} className="p-4 flex items-center justify-between text-sm"
          style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
          <div>
            <span className="font-bold mr-2" style={{ color: '#f4f4f6' }}>{log.sleep_hours}h</span>
            <span style={{ color: '#52525b' }}>品质 {log.sleep_quality}/5</span>
          </div>
          <span className="text-xs" style={{ color: '#52525b' }}>
            {new Date(log.created_at).toLocaleDateString('zh-CN')}
          </span>
        </div>
      ))}
    </div>
  );
}
