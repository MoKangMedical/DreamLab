'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDream, analyzeDream } from '@/lib/api';

const WRITING_PROMPTS = [
  { q: '你梦见了谁？他们说了什么？', hint: '人物是梦的核心' },
  { q: '你在哪里？那个地方长什么样？', hint: '场景设定情绪基调' },
  { q: '梦里你感受到什么情绪？', hint: '情绪是潜意识的语言' },
  { q: '梦里有重复出现的符号吗？', hint: '水、飞行、坠落、追逐...' },
  { q: '醒来时你的第一感受是什么？', hint: '最初的感受最重要' },
];

const TIPS = [
  '📝 醒来后立即记录，哪怕是关键词',
  '🌙 床边放笔记本，养成习惯',
  '🔍 不要试图让梦变得合理——越荒诞越真实',
  '💭 关注感受而非情节——梦是情绪的剧场',
];

export default function DreamClient() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emotions, setEmotions] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const emotionOptions = ['喜悦', '恐惧', '焦虑', '好奇', '悲伤', '兴奋', '困惑', '平静', '愤怒', '温暖', '孤独', '自由'];

  const toggleEmotion = (e: string) => {
    setEmotions(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    try {
      const res = await createDream({
        user_id: 1, title, content, emotions, elements: [],
        dream_date: new Date().toISOString().split('T')[0],
      });
      if (res?.id) {
        await analyzeDream(res.id);
        router.push('/dream/history');
      }
    } catch {
      alert('提交失败，请确认后端服务已启动');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <div className="max-w-[1180px] mx-auto px-5 md:px-8 pt-20 md:pt-32 pb-32 md:pb-40">
        
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="text-5xl md:text-6xl mb-8">🌙</div>
          <h1 className="font-bold mb-6" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(42px, 6vw, 72px)',
            color: '#f4f4f6',
          }}>
            梦境工坊
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base leading-8" style={{ color: '#71717a' }}>
            每一个梦都是潜意识的来信——
            <br/>弗洛伊德 · 荣格 · 现代科学 · 东方智慧，四重视角为你解读
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] gap-6 lg:gap-8">
          
          {/* ── 写作引导 (左侧边栏) ── */}
          <div className="space-y-5">
            {/* 写作提示 */}
            <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 28 }}>
              <h3 className="text-base font-bold mb-5" style={{ color: '#f4f4f6' }}>💡 写作引导</h3>
              <div className="space-y-4">
                {WRITING_PROMPTS.map((p, i) => (
                  <div key={i} className="cursor-pointer p-4 transition-all hover:bg-[#ffffff]/02"
                    style={{ borderLeft: '2px solid transparent', borderRadius: '0 8px 8px 0' }}
                    onClick={() => setContent(prev => prev + (prev ? '\n\n' : '') + '· ' + p.q + ' ')}
                    onMouseEnter={e => (e.currentTarget.style.borderLeftColor = '#d4a853')}
                    onMouseLeave={e => (e.currentTarget.style.borderLeftColor = 'transparent')}>
                    <p className="text-sm leading-6 mb-1" style={{ color: '#a1a1aa' }}>{p.q}</p>
                    <p className="text-xs" style={{ color: '#52525b' }}>{p.hint}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 记录技巧 */}
            <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 28 }}>
              <button onClick={() => setShowTips(!showTips)}
                className="w-full text-left text-sm font-bold mb-3 flex items-center justify-between"
                style={{ color: '#f4f4f6' }}>
                📖 记录技巧
                <span style={{ color: '#52525b', fontSize: 12 }}>{showTips ? '收起' : '展开'}</span>
              </button>
              {showTips && (
                <div className="space-y-2">
                  {TIPS.map((t, i) => (
                    <p key={i} className="text-xs leading-relaxed" style={{ color: '#71717a' }}>{t}</p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── 主表单 ── */}
          <div className="space-y-6">
            <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 36 }}>
              {/* 标题 */}
              <div className="mb-5">
                <label className="block text-xs mb-2 font-medium" style={{ color: '#71717a' }}>梦境标题</label>
                <input
                  type="text" value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="给你的梦起个名字..."
                  className="w-full text-lg"
                  style={{
                    background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)',
                    padding: '12px 0', color: '#f4f4f6', fontFamily: "'Noto Serif SC', serif",
                    outline: 'none', fontSize: 20,
                  }}
                />
              </div>

              {/* 内容 */}
              <div className="mb-5">
                <label className="block text-xs mb-2 font-medium" style={{ color: '#71717a' }}>梦境描述</label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="尽可能详细地描述你的梦境…人物、场景、情绪、颜色、声音…"
                  rows={13}
                  className="w-full resize-none text-sm leading-relaxed"
                  style={{
                    background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8,
                    padding: '18px 20px', color: '#a1a1aa', fontFamily: 'Inter, sans-serif',
                    outline: 'none', lineHeight: 2.0,
                  }}
                />
              </div>

              {/* 情绪标签 */}
              <div className="mb-6">
                <label className="block text-xs mb-3 font-medium" style={{ color: '#71717a' }}>梦中的情绪</label>
                <div className="flex flex-wrap gap-2">
                  {emotionOptions.map(e => {
                    const active = emotions.includes(e);
                    return (
                      <button key={e} onClick={() => toggleEmotion(e)}
                        className="text-xs px-3 py-1.5 transition-all"
                        style={{
                          background: active ? `${'#d4a853'}18` : '#0a0a0c',
                          border: `1px solid ${active ? '#d4a853' : 'rgba(255,255,255,0.06)'}`,
                          color: active ? '#d4a853' : '#71717a',
                          borderRadius: 2,
                        }}>
                        {e}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 提交 */}
              <button onClick={handleSubmit} disabled={submitting || !title.trim() || !content.trim()}
                className="w-full transition-all duration-300 disabled:opacity-30"
                style={{
                  padding: '16px', background: '#d4a853', color: '#0a0a0c',
                  fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14,
                  borderRadius: 2, border: 'none', cursor: submitting ? 'wait' : 'pointer',
                  letterSpacing: '0.05em',
                }}>
                {submitting ? '🔮 正在送往油屋解析...' : '🌙 提交梦境分析'}
              </button>
            </div>

            {/* 四视角预览 */}
            <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: 28 }}>
              <p className="text-xs font-bold mb-3" style={{ color: '#f4f4f6' }}>🔬 AI 将从四个维度解读你的梦</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: '弗洛伊德视角', desc: '潜意识欲望 · 压抑 · 童年', color: '#c4554d' },
                  { name: '荣格视角', desc: '原型 · 集体无意识 · 补偿', color: '#6b5b8a' },
                  { name: '现代科学', desc: '记忆巩固 · 情绪调节 · REM', color: '#5a7d9a' },
                  { name: '东方智慧', desc: '周公解梦 · 五行 · 庄周梦蝶', color: '#3b8b7a' },
                ].map(p => (
                  <div key={p.name} className="p-4" style={{ background: '#0a0a0c', borderRadius: 8 }}>
                    <div className="text-xs font-bold mb-1" style={{ color: p.color }}>{p.name}</div>
                    <div className="text-xs" style={{ color: '#52525b' }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
