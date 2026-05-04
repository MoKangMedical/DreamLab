'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MOCK_COMPANION_REPLIES } from '@/lib/mock-data';

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
      // Offline: use diverse empathetic replies
      const i = Math.floor(Math.random() * MOCK_COMPANION_REPLIES.length);
      setMessages(prev => prev.filter(m => m.id !== typingId).concat({
        id: Date.now(),
        role: 'assistant',
        content: MOCK_COMPANION_REPLIES[i],
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(180deg, #060f18 0%, #0d1a28 40%, #13212f 100%)',
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
          <Link href="/" className="text-[#5a5246] hover:text-white transition-colors text-sm">
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
                  style={{ background: 'linear-gradient(135deg, rgba(123,94,168,0.3), rgba(139,122,184,0.2))' }}>
                  👤
                </div>
              )}
              <div
                className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.content === '...'
                    ? 'text-[var(--accent-purple)] animate-pulse'
                    : msg.role === 'user'
                    ? 'text-white'
                    : 'text-[#d8d0c8]'
                }`}
                style={msg.role === 'user' ? {
                  background: 'linear-gradient(135deg, rgba(123,94,168,0.25), rgba(192,57,43,0.15))',
                  border: '1px solid rgba(139,122,184,0.15)',
                  borderBottomRightRadius: '6px',
                } : {
                  background: 'rgba(19,19,22,0.8)',
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
        style={{ background: 'rgba(9,9,11,0.95)', backdropFilter: 'blur(20px)' }}>
        {/* CBT 提示卡 */}
        <div className="max-w-3xl mx-auto px-4 pt-3">
          <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {[
              { text: '今天是什么让我感到焦虑？', icon: '🌊' },
              { text: '帮我识别一个负性自动思维', icon: '🧠' },
              { text: '我今天做了哪些积极的事？', icon: '✨' },
              { text: '最近反复出现的情绪是什么？', icon: '💭' },
              { text: '安静地陪我一会儿吧', icon: '👤' },
            ].map(s => (
              <button
                key={s.text}
                onClick={() => { setInput(s.text); }}
                className="shrink-0 px-3 py-1.5 text-xs transition-all duration-200 whitespace-nowrap"
                style={{
                  background: 'rgba(232,168,32,0.04)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  color: '#7a7062',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {s.icon} {s.text}
              </button>
            ))}
          </div>
        </div>
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
                background: 'rgba(19,19,22,0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: '44px',
                maxHeight: '120px',
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="btn-geo px-5 py-3 text-sm shrink-0 disabled:opacity-40"
              style={{ background: 'var(--accent-purple)' }}
            >
              {loading ? '...' : '发送'}
            </button>
          </div>
          <p className="text-[10px] text-[#5a5246] text-center mt-2">
            🫂 无脸男是你安静的朋友 · 倾听不评判 · 紧急情况请拨打 <span className="text-[#7a7062]">400-161-9995</span>
          </p>
        </div>
      </div>
    </div>
  );
}
