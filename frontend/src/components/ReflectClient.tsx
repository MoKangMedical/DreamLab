'use client';

import { useState, useEffect } from 'react';
import { getReflections, createReflection, getDreams } from '@/lib/api';

// ── 写作引导 ──
const REFLECT_PROMPTS = [
  { q: '这个梦让你想到了生活中的什么？', hint: '梦是现实的隐喻' },
  { q: '梦里最强烈的情绪是什么？为什么？', hint: '情绪比情节更诚实' },
  { q: '如果你是梦里的另一个人物，你会看到什么？', hint: '换位带来全新视角' },
  { q: '这个梦在提醒你什么？', hint: '梦是心灵的自我调节' },
  { q: '醒来后，你做了（或想做）什么不同的事？', hint: '梦是行动的起点' },
];

// ── 反思的阶段 ──
const STAGES = [
  { title: '记录', desc: '诚实地写下梦的内容，不做评判', icon: '📝' },
  { title: '感受', desc: '辨别梦激发的情绪——恐惧、渴望、困惑', icon: '💭' },
  { title: '联想', desc: '梦中的符号让你想到什么人或事？', icon: '🔗' },
  { title: '行动', desc: '这个梦在邀请你做出什么改变？', icon: '🌱' },
];

export default function ReflectClient() {
  const [reflections, setReflections] = useState<any[]>([]);
  const [dreams, setDreams] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moodScore, setMoodScore] = useState(5);
  const [linkedDreamId, setLinkedDreamId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
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
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-32">

        {/* ════════════════ Hero ════════════════ */}
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-5xl md:text-6xl mb-6">🌱</div>
          <h1 className="font-bold mb-4" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: '#f4f4f6',
            lineHeight: 1.1,
          }}>
            梦后的思考
          </h1>
          <p className="max-w-lg mx-auto text-sm leading-relaxed mb-2" style={{ color: '#a1a1aa' }}>
            记录梦只是第一步——理解梦才是真正的工作
          </p>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: '#71717a' }}>
            每一次反思，都是在梦与现实之间搭建一座桥。
            日积月累，你会看到自己心灵的地图渐渐成形。
          </p>
        </div>

        {/* ════════════════ 四个阶段 ════════════════ */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>四步法</span>
          </div>
          <h2 className="font-bold mb-2" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(22px, 3vw, 32px)',
            color: '#f4f4f6',
          }}>
            如何深度反思一个梦
          </h2>
          <p className="text-sm mb-6" style={{ color: '#71717a' }}>
            这是从梦到智慧的四个步骤，每一步都比上一步更深入
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STAGES.map((s, i) => (
              <div key={s.title} className="p-5" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                    style={{ background: '#d4a85318', color: '#d4a853' }}>
                    {i + 1}
                  </span>
                  <span className="text-lg">{s.icon}</span>
                </div>
                <h3 className="text-sm font-bold mb-1" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>
                  {s.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#71717a' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════ 引导提示 ════════════════ */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>引导问题</span>
          </div>
          <h2 className="font-bold mb-6" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(22px, 3vw, 32px)',
            color: '#f4f4f6',
          }}>
            不知怎么开始？试试这些问题
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {REFLECT_PROMPTS.map((p, i) => (
              <div key={i} className="p-5 cursor-pointer transition-all hover:border-[#d4a85320]"
                style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}
                onClick={() => {
                  setContent(prev => prev + (prev ? '\n\n' : '') + '💭 ' + p.q + '\n');
                  setShowForm(true);
                  setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
                }}>
                <p className="text-sm font-medium mb-1" style={{ color: '#a1a1aa' }}>{p.q}</p>
                <p className="text-xs" style={{ color: '#52525b' }}>{p.hint}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════ 编写反思 ════════════════ */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} />
                <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>我的反思</span>
              </div>
              <h2 className="font-bold" style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 'clamp(22px, 3vw, 32px)',
                color: '#f4f4f6',
              }}>
                写下你的思考
              </h2>
            </div>
            <button onClick={() => setShowForm(!showForm)}
              className="transition-all duration-300 hover:scale-105"
              style={{
                padding: '12px 28px', background: '#d4a853', color: '#0a0a0c',
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13,
                borderRadius: 2, border: 'none', cursor: 'pointer',
              }}>
              {showForm ? '收起' : '+ 写反思'}
            </button>
          </div>

          {showForm && (
            <div className="p-6 mb-8" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs mb-2 font-medium" style={{ color: '#71717a' }}>标题</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="给这段思考起个名字..."
                    className="w-full text-sm"
                    style={{
                      background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2,
                      padding: '12px 16px', color: '#f4f4f6', outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-2 font-medium" style={{ color: '#71717a' }}>内容</label>
                  <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="写下你的感悟...可以从上面的引导问题开始"
                    rows={6}
                    className="w-full resize-none text-sm leading-relaxed"
                    style={{
                      background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2,
                      padding: '16px', color: '#a1a1aa', outline: 'none', lineHeight: 1.8,
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-2 font-medium" style={{ color: '#71717a' }}>心情</label>
                  <div className="flex gap-3">
                    {moodEmojis.map((emoji, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setMoodScore(i + 1)}
                        className="text-3xl p-2 transition-all"
                        style={{
                          borderRadius: 2,
                          background: moodScore === i + 1 ? '#d4a85312' : 'transparent',
                          border: moodScore === i + 1 ? '1px solid #d4a85330' : '1px solid transparent',
                          transform: moodScore === i + 1 ? 'scale(1.15)' : 'scale(1)',
                        }}>
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                {dreams.length > 0 && (
                  <div>
                    <label className="block text-xs mb-2 font-medium" style={{ color: '#71717a' }}>关联梦境（可选）</label>
                    <select
                      value={linkedDreamId || ''}
                      onChange={e => setLinkedDreamId(e.target.value ? Number(e.target.value) : null)}
                      className="w-full text-sm"
                      style={{
                        background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2,
                        padding: '12px 16px', color: '#a1a1aa', outline: 'none',
                      }}>
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
                  className="w-full transition-all duration-300 disabled:opacity-30"
                  style={{
                    padding: '14px', background: '#d4a853', color: '#0a0a0c',
                    fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
                    borderRadius: 2, border: 'none', cursor: 'pointer',
                  }}>
                  🌱 保存反思
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ════════════════ 反思列表 ════════════════ */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-5 animate-pulse" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="h-5 w-1/3 mb-3" style={{ background: '#ffffff05', borderRadius: 1 }} />
                <div className="h-4 w-full mb-2" style={{ background: '#ffffff05', borderRadius: 1 }} />
                <div className="h-4 w-2/3" style={{ background: '#ffffff05', borderRadius: 1 }} />
              </div>
            ))}
          </div>
        ) : reflections.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">🌱</span>
            <p className="text-sm mb-4" style={{ color: '#71717a' }}>还没有反思记录</p>
            <p className="text-xs mb-6" style={{ color: '#52525b' }}>
              每一次反思，都是一次与自己的深度对话
            </p>
            <button onClick={() => setShowForm(true)}
              className="transition-all duration-300 hover:scale-105"
              style={{
                padding: '12px 32px', background: '#d4a853', color: '#0a0a0c',
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13,
                borderRadius: 2, border: 'none', cursor: 'pointer',
              }}>
              写第一篇反思
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {reflections.map((r: any) => (
              <div key={r.id} className="p-5 md:p-6 transition-all"
                style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>
                    {r.title}
                  </h3>
                  <span className="text-xs shrink-0 ml-4" style={{ color: '#52525b' }}>
                    {new Date(r.created_at).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: '#a1a1aa', lineHeight: 1.8 }}>
                  {r.content}
                </p>
                {r.mood_score && (
                  <div className="text-xs" style={{ color: '#52525b' }}>
                    心情：{moodEmojis[r.mood_score - 1] || '😐'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
