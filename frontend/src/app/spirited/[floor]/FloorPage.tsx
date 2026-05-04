'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ALL_DIALOGUES } from '@/lib/mock-dialogues';
import { advanceFloor, forgetName, collectKey, setTitle, getProgress } from '@/lib/storage';

const FLOOR_THEME: Record<number, { bg: string; accent: string; glow: string; description: string }> = {
  1: { bg: 'from-[#1a1a3a] to-[#2a2a4a]', accent: 'var(--accent-purple)', glow: 'rgba(123,47,247,0.3)', description: '你站在油屋的入口，汤婆婆正等着你。记住——在这里，名字就是你的锚。' },
  2: { bg: 'from-[#3a1a1a] to-[#4a2a2a]', accent: 'var(--accent-coral)', glow: 'rgba(233,69,96,0.3)', description: '锅炉房热气腾腾，锅炉爷爷在炉前忙碌。他要考验你对自我的认知。' },
  3: { bg: 'from-[#1a2a1a] to-[#2a3a2a]', accent: '#00d2ff', glow: 'rgba(0,210,255,0.3)', description: '浴场里人声鼎沸，无脸男安静地坐在角落。他需要的不是金子，是理解。' },
  4: { bg: 'from-[#1a1a2a] to-[#2a2a3a]', accent: '#f7b232', glow: 'rgba(247,178,50,0.3)', description: '花园里，河神正在清理身体里的垃圾。帮他净化，你也帮他净化一个梦境。' },
  5: { bg: 'from-[#2a1a3a] to-[#3a2a4a]', accent: 'var(--accent-coral)', glow: 'rgba(233,69,96,0.3)', description: '白龙在顶层等着你。你已经收集了所有钥匙，是时候找回自己的名字了。' },
};

const NPC_EMOJI: Record<string, string> = {
  '汤婆婆': '👵',
  '锅炉爷爷': '👴',
  '玲': '👩',
  '无脸男': '👤',
  '河神': '🏞️',
  '白龙': '🐉',
};

interface DialogueNode {
  npc_name: string;
  npc_text: string;
  player_choices: { text: string; next_key: string; effect?: { advance_floor?: number; forget_name?: boolean; flag?: string } }[];
  dialogue_key: string;
  next_dialogue: string;
}

export default function SpiritedFloorPage({ params }: { params: { floor: string } }) {
  const router = useRouter();
  const floor = Number(params.floor);
  const dialogues = ALL_DIALOGUES[floor] || [];
  const [dialogue, setDialogue] = useState<DialogueNode | null>(dialogues[0] || null);
  const [stage, setStage] = useState<'enter' | 'dialogue' | 'complete'>('enter');
  const [npcText, setNpcText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const theme = FLOOR_THEME[floor] || FLOOR_THEME[1];

  const typeText = (text: string, callback?: () => void) => {
    setIsTyping(true);
    setNpcText('');
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setNpcText(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer); setIsTyping(false); callback?.(); }
    }, 40);
  };

  useEffect(() => {
    if (dialogue && stage === 'dialogue') typeText(dialogue.npc_text);
  }, [dialogue, stage]);

  const handleEnter = () => {
    setStage('dialogue');
    if (dialogue) typeText(dialogue.npc_text);
  };

  const handleChoice = (choice: any) => {
    if (choice.effect) {
      if (choice.effect.advance_floor) {
        advanceFloor(choice.effect.advance_floor);
      }
      if (choice.effect.forget_name) {
        forgetName();
      }
      if (choice.effect.flag === 'name_remembered' && floor === 1) {
        collectKey({ floor: 1, name: '自我认知之钥', type: 'memory' });
      }
      if (choice.effect.flag === 'empathy_shown' && floor === 3) {
        collectKey({ floor: 3, name: '情绪辨识之钥', type: 'emotion' });
      }
      if (choice.effect.flag === 'dream_analyzed' && floor === 4) {
        collectKey({ floor: 4, name: '梦境净化之钥', type: 'purification' });
      }
      if (choice.effect.flag === 'final_title' && floor === 5) {
        collectKey({ floor: 5, name: '梦的解析师之印', type: 'mastery' });
        setTitle('梦的解析师');
        setStage('complete');
        return;
      }
      if (choice.effect.advance_floor) {
        router.push(`/spirited/${choice.effect.advance_floor}`);
        return;
      }
    }
    if (choice.next_key && dialogue) {
      const next = dialogues.find((d: any) => d.dialogue_key === choice.next_key);
      if (next) { setDialogue(next); typeText(next.npc_text); }
    }
  };

  if (!dialogues.length) {
    return (
      <div className={`min-h-screen bg-gradient-to-b ${theme.bg} flex items-center justify-center`}>
        <div className="text-center"><div className="text-4xl mb-4">❓</div><p className="text-[#B0B0C0]">该楼层尚未开放</p></div>
      </div>
    );
  }

  if (stage === 'complete') {
    return (
      <div className={`min-h-screen bg-gradient-to-b ${theme.bg} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-[#f7b232] rounded-full animate-pulse"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`, opacity: 0.6 }} />
          ))}
        </div>
        <div className="text-center z-10 px-4" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4">恭喜，千寻！</h2>
          <p className="text-[#d0d0d0] mb-2">你已找回自己的名字</p>
          <p className="text-[#f7b232] text-xl font-bold mb-8">「梦的解析师」</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => router.push('/spirited')} className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95">← 返回地图</button>
            <button onClick={() => router.push('/')} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9B7ED8] to-[#FF8A7A] text-white font-bold hover:scale-105 transition-transform active:scale-95">进入 DreamLab →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme.bg} relative overflow-hidden`}>
      {/* 场景装饰 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-20"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${2 + Math.random() * 4}px`, height: `${2 + Math.random() * 4}px`, backgroundColor: theme.accent, animation: `float ${5 + Math.random() * 10}s infinite linear`, animationDelay: `${Math.random() * 5}s` }} />
        ))}
      </div>

      {/* 返回按钮 */}
      <div className="absolute top-4 left-4 z-20">
        <button onClick={() => router.push('/spirited')} className="px-4 py-2 rounded-lg bg-black/30 backdrop-blur-sm text-white/70 hover:text-white text-sm border border-white/10 hover:border-white/30 transition-all active:scale-95">← 返回地图</button>
      </div>

      {/* 楼层标题 */}
      <div className="pt-14 pb-8 text-center relative z-10">
        <div className="text-5xl mb-3" style={{ animation: 'fadeIn 0.5s ease-out' }}>
          {floor === 1 && '🌉'}{floor === 2 && '🔥'}{floor === 3 && '👤'}{floor === 4 && '🏞️'}{floor === 5 && '🐉'}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ textShadow: `0 0 20px ${theme.glow}` }}>{floor}F</h1>
      </div>

      {/* 主内容区 */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-24">
        {stage === 'enter' && (
          <div className="text-center" style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className="glass-card p-8 mb-6">
              <p className="text-[#B0B0C0] mb-6 leading-relaxed">{theme.description}</p>
              <button onClick={handleEnter} className="btn-primary text-lg px-8 py-3 active:scale-95 transition-transform">进入 →</button>
            </div>
          </div>
        )}

        {stage === 'dialogue' && dialogue && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            {/* NPC 头像 */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-2"
                style={{ backgroundColor: `${theme.accent}20`, border: `2px solid ${theme.accent}40` }}>
                {NPC_EMOJI[dialogue.npc_name] || '❓'}
              </div>
              <p className="text-sm" style={{ color: theme.accent }}>{dialogue.npc_name}</p>
            </div>

            {/* 对话气泡 */}
            <div className="glass-card p-6 mb-6 relative">
              <div className="absolute -top-2 left-8 w-4 h-4 bg-[#1a1a2a] border-l border-t border-[#ffffff]/10 rotate-45" />
              <p className="text-[#e0e0e0] leading-relaxed min-h-[60px]">{npcText}{isTyping && <span className="animate-pulse">|</span>}</p>
            </div>

            {/* 选项 */}
            {!isTyping && dialogue.player_choices.length > 0 && (
              <div className="space-y-3" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                {dialogue.player_choices.map((choice: any, i: number) => (
                  <button key={i} onClick={() => handleChoice(choice)}
                    className="w-full text-left p-4 rounded-xl bg-[#ffffff]/5 border border-[#ffffff]/10 hover:border-[var(--accent-purple)]/50 hover:bg-[var(--accent-purple)]/10 text-white transition-all duration-300 active:scale-[0.98]"
                    style={{ touchAction: 'manipulation' }}>
                    <span className="text-[var(--accent-purple)] mr-2">{String(i + 1)}.</span>{choice.text}
                  </button>
                ))}
              </div>
            )}

            {/* 自动继续 */}
            {!isTyping && dialogue.player_choices.length === 0 && dialogue.next_dialogue && (
              <button onClick={() => handleChoice({ next_key: dialogue.next_dialogue })} className="w-full btn-primary active:scale-95">继续 →</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
