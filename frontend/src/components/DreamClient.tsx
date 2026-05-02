'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDream, analyzeDream } from '@/lib/api';

export default function DreamClient() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [emotions, setEmotions] = useState<string[]>([]);
  const [elements, setElements] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const emotionOptions = ['喜悦', '恐惧', '焦虑', '好奇', '悲伤', '兴奋', '困惑', '平静'];

  const toggleEmotion = (e: string) => {
    setEmotions(prev =>
      prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]
    );
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    try {
      const res = await createDream({
        user_id: 1,
        title,
        content,
        emotions,
        elements,
        dream_date: new Date().toISOString().split('T')[0],
      });
      if (res?.id) {
        await analyzeDream(res.id);
        router.push(`/dream/history`);
      }
    } catch {
      alert('提交失败，请确认后端服务已启动');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="gradient-text">记录梦境</span>
        </h1>
        <p className="text-[#B0B0C0]">把梦里的世界保存下来</p>
      </div>

      <div className="glass-card p-6 space-y-6">
        <div>
          <label className="block text-sm text-[#B0B0C0] mb-2">梦境标题</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="给你的梦起个名字..."
            className="input-field w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-[#B0B0C0] mb-2">梦境内容</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="尽可能详细地描述你的梦境..."
            className="input-field w-full min-h-[200px]"
          />
        </div>

        <div>
          <label className="block text-sm text-[#B0B0C0] mb-2">梦境情绪</label>
          <div className="flex flex-wrap gap-2">
            {emotionOptions.map(e => (
              <button
                key={e}
                type="button"
                className={`tag ${emotions.includes(e) ? 'active' : ''}`}
                onClick={() => toggleEmotion(e)}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting || !title.trim() || !content.trim()}
          className="btn-primary w-full"
        >
          {submitting ? '提交中...' : '保存并分析'}
        </button>
      </div>
    </div>
  );
}
