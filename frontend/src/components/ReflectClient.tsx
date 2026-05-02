'use client';

import { useState, useEffect } from 'react';
import { getReflections, createReflection, getDreams } from '@/lib/api';

export default function ReflectClient() {
  const [reflections, setReflections] = useState<any[]>([]);
  const [dreams, setDreams] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moodScore, setMoodScore] = useState(5);
  const [linkedDreamId, setLinkedDreamId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getReflections(), getDreams()])
      .then(([r, d]) => {
        setReflections(r);
        setDreams(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      await createReflection({
        user_id: 1,
        title,
        content,
        mood_score: moodScore,
        linked_dream_id: linkedDreamId || undefined,
      });
      setTitle('');
      setContent('');
      setMoodScore(5);
      setLinkedDreamId(null);
      setShowForm(false);
      const r = await getReflections();
      setReflections(r);
    } catch {
      alert('提交失败，请确认后端服务已启动');
    }
  };

  const moodEmojis = ['😢', '😟', '😐', '🙂', '😊'];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">人生思考</span>
          </h1>
          <p className="text-[#B0B0C0]">记录梦后的感悟与人生洞察</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? '取消' : '+ 写反思'}
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-8 space-y-4">
          <div>
            <label className="block text-sm text-[#B0B0C0] mb-2">标题</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="给这段思考起个名字..."
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-[#B0B0C0] mb-2">内容</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="写下你的思考与感悟..."
              className="input-field w-full min-h-[150px]"
            />
          </div>
          <div>
            <label className="block text-sm text-[#B0B0C0] mb-2">心情评分</label>
            <div className="flex gap-3">
              {moodEmojis.map((emoji, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMoodScore(i + 1)}
                  className={`text-2xl p-2 rounded-lg transition-all ${
                    moodScore === i + 1 ? 'bg-[var(--accent-purple)]/30 scale-110' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          {dreams.length > 0 && (
            <div>
              <label className="block text-sm text-[#B0B0C0] mb-2">关联梦境（可选）</label>
              <select
                value={linkedDreamId || ''}
                onChange={e => setLinkedDreamId(e.target.value ? Number(e.target.value) : null)}
                className="input-field w-full"
              >
                <option value="">不关联</option>
                {dreams.map((d: any) => (
                  <option key={d.id} value={d.id}>{d.title}</option>
                ))}
              </select>
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim()}
            className="btn-primary w-full"
          >
            保存反思
          </button>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card p-5 animate-pulse">
              <div className="h-5 w-1/3 bg-[#ffffff]/5 rounded mb-3" />
              <div className="h-4 w-full bg-[#ffffff]/5 rounded mb-2" />
              <div className="h-4 w-2/3 bg-[#ffffff]/5 rounded" />
            </div>
          ))}
        </div>
      ) : reflections.length === 0 ? (
        <div className="text-center py-20 text-[#B0B0C0]">
          <span className="text-5xl block mb-4">🌱</span>
          <p className="mb-4">还没有反思记录</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">写第一篇反思</button>
        </div>
      ) : (
        <div className="space-y-4">
          {reflections.map((r: any) => (
            <div key={r.id} className="glass-card p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{r.title}</h3>
                <span className="text-xs text-[#B0B0C0]">
                  {new Date(r.created_at).toLocaleDateString('zh-CN')}
                </span>
              </div>
              <p className="text-sm text-[#d0d0d0] leading-relaxed line-clamp-3">{r.content}</p>
              {r.mood_score && (
                <div className="mt-3 text-sm text-[#B0B0C0]">
                  心情：{'😢😟😐🙂😊'.split('')[r.mood_score - 1] || '😐'}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
