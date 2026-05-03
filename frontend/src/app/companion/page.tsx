'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const API_BASE = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || '') : '';

interface Message {
  id: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function CompanionPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 开场白
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 0,
        role: 'assistant',
        content: '...（无脸男安静地坐在你旁边，递给你一张温暖的坐垫）\n\n嗯。我在这里。你可以说任何想说的话，也可以只是静静地坐着。',
      }]);
    }
  }, []);

  const send = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim();
    setInput('');
    setLoading(true);

    // 添加用户消息
    const userMsg: Message = { id: Date.now(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);

    // 显示“正在倾听...”
    const typingId = Date.now() + 1;
    setMessages(prev => [...prev, { id: typingId, role: 'assistant', content: '...' }]);

    try {
      const res = await fetch(`${API_BASE}/api/companion/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 1, session_id: sessionId, message: text }),
      });
      const data = await res.json();
      setSessionId(data.session_id);
      // 替换 typing indicator
      setMessages(prev => prev.filter(m => m.id !== typingId).concat({
        id: data.session_id * 1000 + Date.now(),
        role: 'assistant',
        content: data.reply,
      }));
    } catch {
      setMessages(prev => prev.filter(m => m.id !== typingId).concat({
        id: Date.now(),
        role: 'assistant',
        content: '🫂 嗯...我还在。有时候不说话也没关系。',
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(180deg, #0a1628 0%, #0f2b45 40%, #162d48 100%)',
    }}>
      {/* 星空粒子 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="absolute"
            style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 90}%`,
              width: `${2 + Math.random() * 3}px`, height: `${2 + Math.random() * 3}px`,
              background: `rgba(155,126,216,${0.1 + Math.random() * 0.3})`,
              borderRadius: '50%',
              animation: `float-slower ${6 + Math.random() * 8}s ease-in-out infinite ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* 顶栏 */}
      <header className="relative z-10 frost-panel border-b border-[#ffffff]/06">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-[#707090] hover:text-white transition-colors text-sm">
            ← 返回
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl">👤</span>
            <span className="text-white font-bold text-sm">无脸男</span>
            <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)] animate-glow" />
          </div>
          <div className="w-12" />
        </div>
      </header>

      {/* 消息列表 */}
      <div className={`relative z-10 flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="space-y-5">
          {messages.filter(m => m.role !== 'system').map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-card-rise`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full mr-2 shrink-0 flex items-center justify-center text-sm mt-1"
                  style={{ background: 'linear-gradient(135deg, #2a2040, #3a2a50)' }}>
                  👤
                </div>
              )}
              <div
                className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.content === '...'
                    ? 'text-[var(--accent-purple)] animate-pulse'
                    : msg.role === 'user'
                    ? 'text-white'
                    : 'text-[#c8c0e0]'
                }`}
                style={msg.role === 'user' ? {
                  background: 'linear-gradient(135deg, rgba(155,126,216,0.3), rgba(232,165,152,0.2))',
                  border: '1px solid rgba(155,126,216,0.2)',
                  borderBottomRightRadius: '6px',
                } : {
                  background: 'rgba(26,22,46,0.8)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderBottomLeftRadius: '6px',
                }}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* 输入框 */}
      <div className="relative z-10 border-t border-[#ffffff]/04 pb-[env(safe-area-inset-bottom,0px)]"
        style={{ background: 'rgba(15,13,26,0.95)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex gap-3 items-end">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
              }}
              placeholder="说点什么吧...或者只是安静地坐一会儿"
              rows={1}
              className="flex-1 input-geo resize-none text-sm py-3"
              style={{
                background: 'rgba(26,22,46,0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: '44px',
                maxHeight: '120px',
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="btn-geo px-5 py-3 text-sm shrink-0 disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, var(--accent-purple), #6a5acd)' }}
            >
              {loading ? '...' : '发送'}
            </button>
          </div>
          <p className="text-[10px] text-[#404060] text-center mt-2">
            🫂 无脸男是你安静的朋友 · 倾听不评判 · 紧急情况请拨打 <span className="text-[#707090]">400-161-9995</span>
          </p>
        </div>
      </div>
    </div>
  );
}
