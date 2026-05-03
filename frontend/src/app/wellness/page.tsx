'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const API_BASE = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || '') : '';

type Tab = 'meditation' | 'breathing' | 'dashboard' | 'gratitude' | 'sleep';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'meditation', label: '冥想', icon: '🧘' },
  { key: 'breathing', label: '呼吸', icon: '🫁' },
  { key: 'dashboard', label: '仪表盘', icon: '📊' },
  { key: 'gratitude', label: '感恩', icon: '💝' },
  { key: 'sleep', label: '睡眠', icon: '🌙' },
];

export default function WellnessPage() {
  const [tab, setTab] = useState<Tab>('meditation');
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-bg)' }}>
      <div className={`max-w-3xl mx-auto px-4 pt-14 pb-28 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <div className="text-center mb-8 animate-card-rise">
          <div className="text-4xl mb-3">♨️</div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            河神的净化汤
          </h1>
          <p className="text-sm text-[#B0B0C0]">洗去心灵的淤泥，让清澈回归</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-8 overflow-x-auto animate-card-rise" style={{ animationDelay: '0.1s' }}>
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                tab === t.key
                  ? 'bg-[var(--accent-purple)]/20 text-white border border-[var(--accent-purple)]/30'
                  : 'text-[#707090] hover:text-[#B0B0C0] border border-transparent'
              }`}
            >
              <span>{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'meditation' && <MeditationTab />}
        {tab === 'breathing' && <BreathingTab />}
        {tab === 'dashboard' && <DashboardTab />}
        {tab === 'gratitude' && <GratitudeTab />}
        {tab === 'sleep' && <SleepTab />}
      </div>
    </div>
  );
}

// ============ 冥想标签 ============
function MeditationTab() {
  const [meditations, setMeditations] = useState<any[]>([]);
  const [active, setActive] = useState<any>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/wellness/meditations`).then(r => r.json()).then(setMeditations);
  }, []);

  const start = (m: any) => {
    stop();
    setActive(m);
    setStep(0);
    setPlaying(true);
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
      <div className="geo-card p-8 text-center animate-card-rise">
        <div className="text-5xl mb-4">{active.icon}</div>
        <h3 className="text-xl font-bold text-white mb-1">{active.title}</h3>
        <p className="text-xs text-[#707090] mb-6">步骤 {step + 1} / {active.steps.length}</p>

        {/* 呼吸动画圈 */}
        <div className="flex justify-center mb-6">
          <div className={`w-24 h-24 rounded-full transition-all duration-[2000ms] flex items-center justify-center ${
            isIn ? 'scale-125' : isOut ? 'scale-75' : 'scale-100'
          }`} style={{
            background: 'radial-gradient(circle, rgba(155,126,216,0.3), rgba(26,26,46,0.5))',
            border: '2px solid rgba(155,126,216,0.3)',
          }}>
            <span className="text-2xl">{isIn ? '🫁' : isOut ? '💨' : '✨'}</span>
          </div>
        </div>

        <p className="text-lg text-[#c8c0e0] mb-2">{s?.text}</p>
        <p className="text-xs text-[#707090]">{s?.seconds}秒</p>

        {/* 进度条 */}
        <div className="mt-6 h-1 rounded-full bg-[#ffffff]/08 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--geo-mint), var(--accent-purple))' }} />
        </div>

        <button onClick={stop} className="btn-geo-ghost text-sm mt-6">结束冥想</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {meditations.map(m => (
        <div key={m.id} className="geo-card p-5 flex items-center gap-4 cursor-pointer hover:border-[var(--accent-purple)]/30 transition-all animate-card-rise"
          style={{ animationDelay: `${m.id * 0.1}s` }}
          onClick={() => start(m)}>
          <div className="text-3xl">{m.icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-sm">{m.title}</h3>
            <p className="text-xs text-[#707090]">{m.description}</p>
          </div>
          <div className="text-xs text-[#505060] shrink-0">{m.duration} 分钟</div>
        </div>
      ))}
    </div>
  );
}

// ============ 呼吸标签 ============
function BreathingTab() {
  const exercises = [
    { id: 'box', title: '盒式呼吸', icon: '⬜', desc: '4-4-4-4 · 专注镇定', pattern: { in: 4, hold: 4, out: 4, holdOut: 4 } },
    { id: '478', title: '4-7-8 呼吸', icon: '🌙', desc: '吸气4·屏息7·呼气8', pattern: { in: 4, hold: 7, out: 8, holdOut: 0 } },
    { id: 'calm', title: '平静呼吸', icon: '🕯️', desc: '吸气4·呼气6 · 简单放松', pattern: { in: 4, hold: 0, out: 6, holdOut: 0 } },
  ];
  const [activeEx, setActiveEx] = useState<any>(null);
  const [phase, setPhase] = useState<'in' | 'hold' | 'out' | 'holdOut' | null>(null);
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<any>(null);

  const run = useCallback((ex: any, ph: 'in' | 'hold' | 'out' | 'holdOut' | 'start', cy: number) => {
    if (ph === 'start') {
      setActiveEx(ex);
      setRunning(true);
      setCycle(0);
      run(ex, 'in', 0);
      return;
    }
    const seconds = ex.pattern[ph === 'holdOut' ? 'holdOut' : ph];
    if (seconds === 0) {
      // 跳过零时长的阶段
      const next: Record<string, string> = { in: 'hold', hold: 'out', out: 'holdOut', holdOut: 'in' };
      const n = next[ph] as 'in' | 'hold' | 'out' | 'holdOut';
      const newCycle = n === 'in' ? cy + 1 : cy;
      if (newCycle >= 5) { setRunning(false); setPhase(null); setActiveEx(null); return; }
      setCycle(newCycle); setPhase(n); setCount(0);
      timerRef.current = setTimeout(() => run(ex, n, newCycle), 100);
      return;
    }
    setPhase(ph);
    setCount(seconds);
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
  const phaseScale: Record<string, number> = { in: 1.3, hold: 1.0, out: 0.7, holdOut: 1.0 };

  return (
    <div>
      {running && activeEx ? (
        // 呼吸动画
        <div className="geo-card p-8 text-center animate-card-rise">
          <div className="text-5xl mb-4">{activeEx.icon}</div>
          <h3 className="text-lg font-bold text-white mb-2">{activeEx.title}</h3>

          <div className="flex justify-center my-8">
            <div className={`w-32 h-32 rounded-full transition-all duration-[4000ms] flex items-center justify-center text-2xl ${
              phase === 'in' ? 'scale-125' : phase === 'out' ? 'scale-75' : 'scale-100'
            }`} style={{
              background: phase === 'in' ? 'radial-gradient(circle, rgba(184,212,200,0.3), rgba(26,26,46,0.5))'
                : phase === 'out' ? 'radial-gradient(circle, rgba(155,126,216,0.3), rgba(26,26,46,0.5))'
                : 'radial-gradient(circle, rgba(240,192,96,0.3), rgba(26,26,46,0.5))',
              border: `2px solid ${phase === 'in' ? 'rgba(184,212,200,0.4)' : phase === 'out' ? 'rgba(155,126,216,0.4)' : 'rgba(240,192,96,0.4)'}`,
            }}>
              <span className="text-3xl font-bold text-white">{count}</span>
            </div>
          </div>

          <p className="text-sm text-[#B0B0C0]">
            {phase && phaseLabel[phase]} · 第 {cycle + 1} / 5 轮
          </p>

          <button onClick={stopBreathing} className="btn-geo-ghost text-sm mt-6">停止</button>
        </div>
      ) : (
        <div className="space-y-4">
          {exercises.map(ex => (
            <div key={ex.id} className="geo-card p-5 flex items-center gap-4 cursor-pointer hover:border-[var(--accent-purple)]/30 transition-all animate-card-rise"
              onClick={() => run(ex, 'start', 0)}>
              <div className="text-3xl">{ex.icon}</div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">{ex.title}</h3>
                <p className="text-xs text-[#707090]">{ex.desc}</p>
              </div>
              <span className="text-xs text-[var(--accent-purple)]">▶ 开始</span>
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

  if (!data) return <div className="text-center text-[#707090] py-12">正在加载仪表盘...</div>;

  const moodMax = Math.max(...(data.mood_trend || []).map((d: any) => d.score), 10);

  return (
    <div className="space-y-6">
      {/* 概览卡片 */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: '平均情绪', value: data.avg_mood || '--', unit: '/10', color: '#F0C060' },
          { label: '感恩日记', value: data.gratitude_count || 0, unit: '篇', color: '#E8A598' },
          { label: '冥想次数', value: data.meditation_count || 0, unit: '次', color: '#C4B5D4' },
          { label: '统计天数', value: data.days, unit: '天', color: '#B8D4C8' },
        ].map((card, i) => (
          <div key={i} className="geo-card p-4 text-center animate-card-rise" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="text-3xl font-bold mb-1" style={{ color: card.color }}>{card.value}</div>
            <div className="text-[10px] text-[#707090]">{card.label}</div>
          </div>
        ))}
      </div>

      {/* 情绪趋势简易图 */}
      {data.mood_trend?.length > 0 && (
        <div className="geo-card p-6 animate-card-rise" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-sm font-bold text-white mb-4">📈 情绪趋势</h3>
          <div className="flex items-end gap-1 h-24">
            {data.mood_trend.map((d: any, i: number) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t transition-all"
                  style={{
                    height: `${(d.score / moodMax) * 80}px`,
                    background: `linear-gradient(180deg, var(--geo-coral), var(--geo-gold))`,
                    opacity: 0.7 + (d.score / moodMax) * 0.3,
                  }} />
                <span className="text-[9px] text-[#505060]">{d.date.slice(3)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 睡眠趋势 */}
      {data.sleep_trend?.length > 0 && (
        <div className="geo-card p-6 animate-card-rise" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-sm font-bold text-white mb-4">😴 睡眠趋势</h3>
          <div className="space-y-2">
            {data.sleep_trend.slice(-7).map((d: any, i: number) => (
              <div key={i} className="flex items-center gap-3 text-xs">
                <span className="text-[#505060] w-10">{d.date.slice(3)}</span>
                <div className="flex-1 h-4 rounded-full bg-[#ffffff]/05 overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{
                      width: `${(d.hours / 10) * 100}%`,
                      background: `linear-gradient(90deg, #4a3a6a, var(--accent-purple))`,
                    }} />
                </div>
                <span className="text-[#B0B0C0] w-12 text-right">{d.hours}h</span>
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
    setContent(''); setSubmitted(s => !s);
  };

  return (
    <div className="space-y-5">
      <div className="geo-card p-6 animate-card-rise">
        <h3 className="text-sm font-bold text-white mb-3">💝 今天，你感恩什么？</h3>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="写下三件让你感恩的小事..."
          className="input-geo w-full resize-none text-sm mb-3"
          style={{ minHeight: '80px', background: 'rgba(26,26,46,0.6)' }}
          rows={3}
        />
        <button onClick={submit} disabled={!content.trim()} className="btn-geo text-sm px-6 disabled:opacity-40">
          记录感恩
        </button>
      </div>

      {logs.map((log: any) => (
        <div key={log.id} className="geo-card p-4 animate-card-rise text-sm">
          <p className="text-[#B0B0C0] leading-relaxed mb-2">{log.content}</p>
          <span className="text-[10px] text-[#505060]">
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
  const [submitted, setSubmitted] = useState(false);

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
        title: `睡眠 ${hours}小时`, sleep_hours: hours, sleep_quality: quality,
      }),
    });
    setSubmitted(s => !s);
  };

  return (
    <div className="space-y-5">
      <div className="geo-card p-6 animate-card-rise">
        <h3 className="text-sm font-bold text-white mb-4">🌙 记录睡眠</h3>

        <label className="text-xs text-[#B0B0C0] mb-2 block">睡眠时长: {hours} 小时</label>
        <input
          type="range" min={0} max={14} step={0.5} value={hours}
          onChange={e => setHours(parseFloat(e.target.value))}
          className="w-full mb-4 accent-[var(--accent-purple)]"
        />

        <label className="text-xs text-[#B0B0C0] mb-2 block">睡眠质量</label>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map(q => (
            <button
              key={q}
              onClick={() => setQuality(q)}
              className={`w-10 h-10 rounded-xl text-lg transition-all ${
                quality >= q ? 'bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]' : 'bg-[#ffffff]/05 text-[#505060]'
              }`}
            >
              {q <= 3 ? '😴' : q === 4 ? '😊' : '✨'}
            </button>
          ))}
        </div>

        <button onClick={submit} className="btn-geo text-sm px-6">记录睡眠</button>
      </div>

      {logs.map((log: any) => (
        <div key={log.id} className="geo-card p-4 flex items-center justify-between animate-card-rise text-sm">
          <div>
            <span className="text-white font-bold">{log.sleep_hours}h</span>
            <span className="text-[#505060] ml-2">品质 {log.sleep_quality}/5</span>
          </div>
          <span className="text-[10px] text-[#505060]">
            {new Date(log.created_at).toLocaleDateString('zh-CN')}
          </span>
        </div>
      ))}
    </div>
  );
}
