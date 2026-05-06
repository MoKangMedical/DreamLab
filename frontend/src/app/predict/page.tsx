'use client';

import { useState } from 'react';
import Link from 'next/link';

const PREDICTION_TYPES = [
  { key: 'personality', icon: '🔮', name: '人格发展趋势', desc: '基于测评数据预测你的人格成长方向', color: '#d4a853' },
  { key: 'trend', icon: '📈', name: '心理健康趋势', desc: '分析你的情绪、睡眠和健康趋势', color: '#3b8b7a' },
  { key: 'compatibility', icon: '💫', name: '人际兼容分析', desc: '了解你与他人的互动模式和匹配度', color: '#6b5b8a' },
  { key: 'dream-pattern', icon: '🌙', name: '梦境模式预测', desc: '发现你梦境中的隐藏规律', color: '#5a7d9a' },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export default function PredictPage() {
  const [activeType, setActiveType] = useState('personality');
  const [concern, setConcern] = useState('');
  const [relationship, setRelationship] = useState('');
  const [targetTraits, setTargetTraits] = useState('');
  const [recentDream, setRecentDream] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState('');

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    setError('');
    try {
      const body: any = { user_id: 1 };
      if (activeType === 'trend') body.concern = concern;
      if (activeType === 'compatibility') { body.relationship = relationship; body.target_traits = targetTraits; }
      if (activeType === 'dream-pattern') body.recent_dream = recentDream;

      const res = await fetch(`${API_BASE}/api/predict/${activeType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('预测请求失败');
      const data = await res.json();
      setResult(data.prediction);
      setStats(data);
    } catch (e: any) {
      setError(e.message || '预测服务暂时不可用，请稍后再试');
    }
    setLoading(false);
  };

  const active = PREDICTION_TYPES.find(t => t.key === activeType)!;

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-32">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🔮</span>
            <h1 className="font-bold" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(24px, 4vw, 42px)', color: '#f4f4f6' }}>
              AI 心理预测
            </h1>
          </div>
          <p style={{ color: '#71717a', fontSize: 15, lineHeight: 1.9 }}>
            基于你的测评数据、梦境记录和健康日志，AI 为你生成个性化的心理预测。
            像钱婆婆的占卜一样——不是命运，而是提醒。
          </p>
        </div>

        {/* Prediction Type Selector */}
        <div className="grid grid-cols-2 gap-2 mb-8">
          {PREDICTION_TYPES.map(type => (
            <button
              key={type.key}
              onClick={() => { setActiveType(type.key); setResult(null); setError(''); }}
              className="text-left p-4 transition-all duration-200"
              style={{
                background: activeType === type.key ? `${type.color}10` : '#111113',
                border: `1px solid ${activeType === type.key ? type.color + '30' : 'rgba(255,255,255,0.04)'}`,
                borderRadius: 12,
              }}
            >
              <div className="text-xl mb-1">{type.icon}</div>
              <div className="text-sm font-semibold mb-0.5" style={{ color: activeType === type.key ? type.color : '#a1a1aa' }}>
                {type.name}
              </div>
              <div className="text-xs" style={{ color: '#52525b' }}>{type.desc}</div>
            </button>
          ))}
        </div>

        {/* Input Form */}
        <div className="mb-8 p-6" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12 }}>
          <div className="flex items-center gap-2 mb-5">
            <span style={{ fontSize: 20 }}>{active.icon}</span>
            <h3 className="text-sm font-bold" style={{ color: active.color }}>{active.name}</h3>
          </div>

          {activeType === 'trend' && (
            <div className="mb-4">
              <label className="block text-xs mb-2" style={{ color: '#71717a' }}>你最关心什么？（可选）</label>
              <textarea
                value={concern} onChange={e => setConcern(e.target.value)}
                placeholder="比如：最近睡眠不好、工作压力大、情绪波动..."
                rows={2}
                className="w-full p-3 text-sm resize-none"
                style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, color: '#a1a1aa', outline: 'none' }}
              />
            </div>
          )}

          {activeType === 'compatibility' && (
            <>
              <div className="mb-3">
                <label className="block text-xs mb-2" style={{ color: '#71717a' }}>关系类型</label>
                <select value={relationship} onChange={e => setRelationship(e.target.value)}
                  className="w-full p-3 text-sm"
                  style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, color: '#a1a1aa', outline: 'none' }}>
                  <option value="">选择关系类型...</option>
                  <option value="恋人/伴侣">恋人/伴侣</option>
                  <option value="朋友">朋友</option>
                  <option value="同事">同事</option>
                  <option value="家人">家人</option>
                  <option value="自己">与自己的关系</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-xs mb-2" style={{ color: '#71717a' }}>对方特质描述（可选）</label>
                <textarea
                  value={targetTraits} onChange={e => setTargetTraits(e.target.value)}
                  placeholder="比如：ta比较内向但很细心，容易想太多..."
                  rows={2}
                  className="w-full p-3 text-sm resize-none"
                  style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, color: '#a1a1aa', outline: 'none' }}
                />
              </div>
            </>
          )}

          {activeType === 'dream-pattern' && (
            <div className="mb-4">
              <label className="block text-xs mb-2" style={{ color: '#71717a' }}>最近印象深刻的梦（可选）</label>
              <textarea
                value={recentDream} onChange={e => setRecentDream(e.target.value)}
                placeholder="描述你最近做的一个梦..."
                rows={3}
                className="w-full p-3 text-sm resize-none"
                style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, color: '#a1a1aa', outline: 'none' }}
              />
            </div>
          )}

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full py-3 px-6 text-sm font-semibold transition-all duration-200"
            style={{
              background: loading ? 'rgba(255,255,255,0.04)' : active.color + '15',
              border: `1px solid ${active.color}30`,
              borderRadius: 10,
              color: loading ? '#52525b' : active.color,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? '🔮 AI 正在分析...' : `🔮 开始${active.name}`}
          </button>
        </div>

        {/* Result */}
        {error && (
          <div className="p-6 mb-8" style={{ background: 'rgba(196,85,77,0.05)', border: '1px solid rgba(196,85,77,0.1)', borderRadius: 12 }}>
            <p className="text-sm" style={{ color: '#c4554d' }}>{error}</p>
          </div>
        )}

        {result && (
          <div className="mb-8">
            {/* Stats bar */}
            {stats && (stats.data_points !== undefined) && (
              <div className="flex items-center gap-4 mb-6 px-4 py-2"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 8 }}>
                <span className="text-xs" style={{ color: '#52525b' }}>
                  📊 基于 {stats.data_points} 条数据
                </span>
                {stats.avg_mood && (
                  <span className="text-xs" style={{ color: '#3b8b7a' }}>
                    😊 情绪均分 {stats.avg_mood}/10
                  </span>
                )}
                {stats.avg_sleep && (
                  <span className="text-xs" style={{ color: '#5a7d9a' }}>
                    😴 睡眠均长 {stats.avg_sleep}h
                  </span>
                )}
                {stats.dream_count !== undefined && (
                  <span className="text-xs" style={{ color: '#6b5b8a' }}>
                    🌙 {stats.dream_count} 个梦
                  </span>
                )}
              </div>
            )}

            {/* Prediction text */}
            <div className="p-6 leading-relaxed text-sm"
              style={{
                background: '#111113',
                border: `1px solid ${active.color}15`,
                borderRadius: 12,
                color: '#a1a1aa',
                lineHeight: 1.9,
                whiteSpace: 'pre-wrap',
              }}>
              {result}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/assessments" className="text-xs transition-colors" style={{ color: '#52525b' }}>
            ← 去做测评
          </Link>
          <span style={{ color: '#27272a' }}>·</span>
          <Link href="/dream" className="text-xs transition-colors" style={{ color: '#52525b' }}>
            记录梦境 →
          </Link>
          <span style={{ color: '#27272a' }}>·</span>
          <Link href="/wellness" className="text-xs transition-colors" style={{ color: '#52525b' }}>
            健康工坊 →
          </Link>
        </div>
      </div>
    </div>
  );
}
