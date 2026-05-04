'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import FloorMap from '@/components/SpiritedFloorMap';
import GameHUD from '@/components/GameHUD';

// ── 油屋 Lore ──
const LORE = {
  title: '千与千寻 · 梦之解析',
  tagline: '穿过油屋的层层迷雾，找回被遗忘的名字',
  intro: '在宫崎骏的《千与千寻》中，油屋是一座为神明提供服务的汤屋。而在 DreamLab，油屋是一座探索心灵的塔——每一层对应一段心理成长之旅：面对阴影、识别情绪、净化创伤、找回自我、完成整合。',
  inspiration: '荣格认为，每个人的心灵都是一座多层建筑。地下室住着被压抑的记忆，顶层是意识与自我。真正的成长，不是逃避地下室，而是提着灯走进去，温柔地对待每一个被遗弃的部分。',
};

// ── 楼层详解 ──
const FLOOR_DETAILS = [
  {
    floor: 1, name: '遗忘之桥', icon: '◇',
    color: '#c4554d', npc: '千寻的父母',
    theme: '面对阴影 · 认识完整的自己',
    symbolism: '桥上是最初的分离——离开熟悉的世界，进入未知。在心理学中，桥象征过渡空间：旧我已逝、新我未生。你准备好了吗？',
    parallel: '弗洛伊德：压抑的内容从不会消失，它们会在梦里以扭曲的方式回归。进入油屋，就是勇敢面对那些曾被压抑的部分。',
    gift: '正视恐惧的勇气',
  },
  {
    floor: 2, name: '汤婆婆的锅炉房', icon: '◎',
    color: '#d4a853', npc: '汤婆婆 · 锅炉爷爷',
    theme: '识别欲望 · 不被贪婪吞噬',
    symbolism: '汤婆婆代表被放大的欲望与控制欲。她夺走名字、让人忘记自己是谁。这一层的核心是对抗内在的"汤婆婆"——那个想控制一切、害怕失去的声音。',
    parallel: 'CBT认知行为疗法：识别并挑战自动化负性思维——"我不够好"、"一切都糟透了"——这些就是夺走你名字的诅咒。',
    gift: '看清欲望的能力',
  },
  {
    floor: 3, name: '无脸男的浴场', icon: '◈',
    color: '#6b5b8a', npc: '无脸男',
    theme: '接纳孤独 · 转化内在空虚',
    symbolism: '无脸男是孤独的化身——他不断吞噬外界的事物来填补内在的空洞，却发现外在的一切都无法真正满足。直到千寻给他真诚的陪伴，他才平静下来。',
    parallel: '人本主义心理学：无条件的积极关注是治愈的基础。无脸男需要的是被看见、被理解，而不是更多的金子。',
    gift: '被真诚倾听的体验',
  },
  {
    floor: 4, name: '河神的净化', icon: '⬡',
    color: '#3b8b7a', npc: '河神',
    theme: '释放淤积 · 让清澈回归',
    symbolism: '河神被人类倾倒的垃圾堵塞——正如我们的心灵被未处理的情绪和创伤堵塞。千寻和众人协力拔出垃圾，河神才恢复真身。净化是集体的工作，不是孤独的战斗。',
    parallel: '正念冥想与身体疗法：创伤储存在身体里，释放需要回到身体的感知。河神的"拔出"正是将隐性记忆转化为显性的过程。',
    gift: '释放与净化的力量',
  },
  {
    floor: 5, name: '白龙的天空', icon: '◆',
    color: '#5a7d9a', npc: '白龙 · 钱婆婆',
    theme: '找回名字 · 完成自我整合',
    symbolism: '名字代表真实的自我认同。白龙记起自己是"赈早见琥珀主"的那一刻，他获得了自由。千寻也完成了从胆怯到勇敢的蜕变。他们不再需要留在油屋。',
    parallel: '荣格个性化：接受阴影、整合阿尼玛/阿尼姆斯、放下人格面具——自我实现不是成为别人，而是成为自己。',
    gift: '完整的自我认同',
  },
];

export default function SpiritedPage() {
  const [showLore, setShowLore] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0c 0%, #0a1522 30%, #0f1e2e 60%, #0a1522 100%)' }}>
      {/* 星空背景 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              background: `rgba(255,255,255,${0.1 + Math.random() * 0.3})`,
              animation: `twinkle ${2 + Math.random() * 4}s infinite ${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 max-w-5xl mx-auto px-4 pb-10 pt-10 md:pt-14 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>

        {/* ════════════════ 标题 ════════════════ */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 text-xs tracking-[0.2em]"
            style={{ color: 'rgba(212,168,83,0.5)' }}>
            <span className="w-5 h-px" style={{ background: 'rgba(212,168,83,0.1)' }} />
            油屋の探索
            <span className="w-5 h-px" style={{ background: 'rgba(212,168,83,0.1)' }} />
          </div>
          <h1 className="font-bold mb-3" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(36px, 6vw, 60px)',
            color: '#f4f4f6',
            lineHeight: 1.1,
          }}>
            千と千尋<br/>の夢の解析
          </h1>
          <p className="text-sm mb-2" style={{ color: '#a1a1aa' }}>
            梦境探索 · 找回名字
          </p>
          <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: '#71717a' }}>
            油屋的每一层，都是一个心灵成长的阶段。
            穿越五层迷雾，收集五把钥匙，成为梦的解析师。
          </p>
        </div>

        {/* ════════════════ Lore 折叠区 ════════════════ */}
        <div className="mb-10">
          <button onClick={() => setShowLore(!showLore)}
            className="w-full p-6 text-left transition-all"
            style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-xl">📖</span>
                <h2 className="font-bold text-lg" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>
                  关于这座油屋
                </h2>
              </div>
              <span className="text-xs" style={{ color: '#52525b' }}>{showLore ? '收起' : '展开'}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#71717a' }}>
              {showLore ? '' : LORE.intro.slice(0, 80) + '...'}
            </p>

            {showLore && (
              <div className="mt-4 space-y-4">
                <p className="text-sm leading-relaxed" style={{ color: '#a1a1aa', lineHeight: 1.8 }}>
                  {LORE.intro}
                </p>
                <blockquote className="border-l-2 pl-4 py-2 text-sm italic leading-relaxed"
                  style={{ borderColor: '#d4a85330', color: '#71717a', lineHeight: 1.8 }}>
                  {LORE.inspiration}
                </blockquote>
                <div className="text-xs" style={{ color: '#52525b' }}>
                  每一个伟大故事的深层，都藏着心理学的密码。
                  我们邀请你以千寻的视角，走一段发现自己的旅程。
                </div>
              </div>
            )}
          </button>
        </div>

        {/* ════════════════ 游戏主体 ════════════════ */}
        <GameHUD />
        <div className="mt-6">
          <FloorMap />
        </div>

        {/* ════════════════ 楼层详解 ════════════════ */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-2">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>楼层指南</span>
          </div>
          <h2 className="font-bold mb-2" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(22px, 3vw, 36px)',
            color: '#f4f4f6',
          }}>
            每一层的心理地图
          </h2>
          <p className="text-sm mb-8" style={{ color: '#71717a' }}>
            左边是千与千寻的叙事，右边是心理学的语言——它们说的是同一件事
          </p>

          <div className="space-y-4">
            {FLOOR_DETAILS.map((floor, i) => (
              <div key={floor.floor} className="p-6 md:p-8 transition-all"
                style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div className="flex items-start gap-5 mb-5">
                  {/* 层号 */}
                  <div className="shrink-0 w-14 h-14 flex items-center justify-center"
                    style={{
                      background: `${floor.color}10`,
                      border: `1px solid ${floor.color}25`,
                      borderRadius: 2,
                    }}>
                    <span className="text-2xl font-bold" style={{ color: floor.color }}>{floor.floor}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg" style={{ color: floor.color }}>{floor.icon}</span>
                      <h3 className="text-xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>
                        {floor.name}
                      </h3>
                    </div>
                    <p className="text-sm" style={{ color: floor.color }}>
                      NPC：{floor.npc}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* 叙事层 */}
                  <div className="p-4" style={{ background: '#0a0a0c', borderRadius: 2 }}>
                    <div className="text-xs mb-2 font-bold" style={{ color: floor.color }}>🎬 电影叙事</div>
                    <p className="text-sm leading-relaxed mb-2" style={{ color: '#a1a1aa', lineHeight: 1.7 }}>
                      {floor.symbolism}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5" style={{ background: `${floor.color}08`, border: `1px solid ${floor.color}15`, color: floor.color, borderRadius: 2 }}>
                        🗝️ {floor.gift}
                      </span>
                    </div>
                  </div>

                  {/* 心理学层 */}
                  <div className="p-4" style={{ background: '#0a0a0c', borderRadius: 2 }}>
                    <div className="text-xs mb-2 font-bold" style={{ color: '#d4a853' }}>🧠 心理学对应</div>
                    <p className="text-sm leading-relaxed" style={{ color: '#71717a', lineHeight: 1.7 }}>
                      {floor.parallel}
                    </p>
                  </div>
                </div>

                {/* 主题标签 */}
                <div className="text-xs" style={{ color: '#52525b' }}>
                  🎯 成长课题：{floor.theme}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部 */}
      <div className="relative z-10 text-center pb-16 pt-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: '#52525b' }}>
          <span>←</span> 返回 DreamLab 主页
        </Link>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
