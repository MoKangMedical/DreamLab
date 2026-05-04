'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ═══════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════
interface Comment {
  id: number;
  author: string;
  content: string;
  time: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  time: string;
  comments: Comment[];
  likes: number;
}

// ═══════════════════════════════════════════════════
// Categories — Ghibli themed
// ═══════════════════════════════════════════════════
const CATEGORIES = [
  { key: 'all', name: '全部', icon: '🏮', desc: '油屋大厅的所有声音', color: '#e8a820' },
  { key: 'mood', name: '心情', icon: '🌸', desc: '分享此刻的心情', color: '#c0392b' },
  { key: 'dream', name: '梦境', icon: '🌙', desc: '那些神秘的梦境', color: '#8b7ab8' },
  { key: 'growth', name: '成长', icon: '🌱', desc: '记录成长的点滴', color: '#6b9e7a' },
  { key: 'help', name: '互助', icon: '🤝', desc: '彼此扶持，共同前行', color: '#4a90b8' },
];

const GHIBLI_NAMES = ['千寻', '白龙', '无脸男', '锅炉爷爷', '小玲', '坊宝宝', '钱婆婆', '河神', '煤煤虫', '汤婆婆的鸟'];

// ═══════════════════════════════════════════════════
// Mock seed posts
// ═══════════════════════════════════════════════════
const SEED_POSTS: Post[] = [
  {
    id: 1, title: '今天做完了SAS测评，发现自己比想象中更焦虑', category: 'mood',
    content: '一直以为自己只是"想太多"，做完量表才发现标准分到了58。看到"轻度焦虑"的结果反而松了口气——原来这不是我的错，是有原因的。有人和我一样吗？',
    author: '小玲', time: '2小时前', likes: 12,
    comments: [
      { id: 1, author: '锅炉爷爷', content: '焦虑不是缺陷，是身体在提醒你有些事情需要关注。锅炉房的火大一些没关系，关键是别让它失控。', time: '1小时前' },
      { id: 2, author: '无脸男', content: '......嗯。（默默递给你一杯热茶）', time: '30分钟前' },
    ],
  },
  {
    id: 2, title: '连续7天记录梦境，发现了一个惊人的模式', category: 'dream',
    content: '用DreamLab记录了一周的梦，发现反复出现"被追赶"和"找不到路"的主题。看了弗洛伊德课程的解读，原来这些可能和安全感的缺失有关。',
    author: '千寻', time: '5小时前', likes: 8,
    comments: [
      { id: 1, author: '白龙', content: '被追赶的梦往往与现实中逃避的问题有关。你的潜意识在邀请你转过身，看看追赶你的是什么。', time: '3小时前' },
    ],
  },
  {
    id: 3, title: '学到荣格的"阴影"概念，整个人都不好了——但是好的那种不好', category: 'growth',
    content: '之前一直不能接受自己有时候会嫉妒朋友的成功。荣格说阴影不是敌人，是被否认的那部分自己。承认嫉妒的存在之后，反而觉得轻松了。',
    author: '坊宝宝', time: '昨天', likes: 15,
    comments: [
      { id: 1, author: '钱婆婆', content: '亲爱的，每个人都有自己的阴影。能承认它的人，已经比大多数人勇敢了。', time: '昨天' },
      { id: 2, author: '河神', content: '嫉妒像河里的淤泥。你越搅动它，水越浑。让它沉淀下去，清水自然浮上来。', time: '12小时前' },
    ],
  },
  {
    id: 4, title: '失眠三周了，试了4-7-8呼吸法，昨晚终于睡了6小时', category: 'help',
    content: '之前觉得呼吸法太简单不可能有用，但昨晚真的在第三轮就睡着了。想问一下大家还有什么睡眠技巧推荐？',
    author: '煤煤虫', time: '昨天', likes: 20,
    comments: [
      { id: 1, author: '锅炉爷爷', content: '睡前1小时放下手机，泡个热水澡。我在锅炉房烧了几十年的水，最好的安眠药就是热水。', time: '昨天' },
      { id: 2, author: '无脸男', content: '......（安静地坐在床边）有时候，只是被陪伴着，就能睡着。', time: '16小时前' },
    ],
  },
  {
    id: 5, title: 'BFI-20结果显示我是高神经质+高开放性，这是什么组合？', category: 'mood',
    content: '神经质82分，开放性85分。感觉自己是"敏感但好奇"的类型。有没有同样组合的朋友？你们的体验是什么样的？',
    author: '小千', time: '3天前', likes: 6,
    comments: [],
  },
];

// ═══════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════
export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCat, setActiveCat] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCat, setNewCat] = useState('mood');
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [commentText, setCommentText] = useState<Record<number, string>>({});
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  // Load posts from localStorage + seed
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dreamlab_community_posts');
      if (stored) {
        setPosts(JSON.parse(stored));
      } else {
        setPosts(SEED_POSTS);
      }
    } catch { setPosts(SEED_POSTS); }
  }, []);

  const savePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    localStorage.setItem('dreamlab_community_posts', JSON.stringify(newPosts));
  };

  const filtered = activeCat === 'all' ? posts : posts.filter(p => p.category === activeCat);

  const randomName = () => GHIBLI_NAMES[Math.floor(Math.random() * GHIBLI_NAMES.length)];

  const handleNewPost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const post: Post = {
      id: Date.now(),
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCat,
      author: randomName(),
      time: '刚刚',
      likes: 0,
      comments: [],
    };
    savePosts([post, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowNewPost(false);
  };

  const handleComment = (postId: number) => {
    const text = commentText[postId]?.trim();
    if (!text) return;
    const updated = posts.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        comments: [...p.comments, {
          id: Date.now(),
          author: randomName(),
          content: text,
          time: '刚刚',
        }],
      };
    });
    savePosts(updated);
    setCommentText({ ...commentText, [postId]: '' });
  };

  const handleLike = (postId: number) => {
    const updated = posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p);
    savePosts(updated);
  };

  return (
    <div style={{ background: '#060f18', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-32">

        {/* ── Header ── */}
        <div className={`mb-12 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏮</span>
                <h1 className="font-bold" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(24px, 4vw, 42px)', color: '#f5efe0' }}>
                  油屋互助社区
                </h1>
              </div>
              <p style={{ color: '#7a7062', fontSize: 15, lineHeight: 1.7 }}>
                在这里，每个人都是匿名的旅客。像千寻一样，你可以安全地分享、倾听和被倾听。
              </p>
            </div>
            <button
              onClick={() => setShowNewPost(!showNewPost)}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300"
              style={{ background: '#e8a820', color: '#060f18', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', letterSpacing: '0.03em' }}
            >
              {showNewPost ? '✕ 取消' : '✏️ 发帖'}
            </button>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCat(cat.key)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs transition-all duration-200"
                style={{
                  background: activeCat === cat.key ? cat.color + '18' : 'transparent',
                  border: `1px solid ${activeCat === cat.key ? cat.color + '30' : 'rgba(255,255,255,0.06)'}`,
                  color: activeCat === cat.key ? cat.color : '#7a7062',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.02em',
                }}
              >
                {cat.icon} {cat.name}
                {cat.key !== 'all' && (
                  <span style={{ color: activeCat === cat.key ? cat.color + '99' : '#5a5246', fontSize: 10 }}>
                    {posts.filter(p => p.category === cat.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── New Post Form ── */}
        {showNewPost && (
          <div className="mb-8 p-6 transition-all duration-500" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)' }}>
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="写下你的标题..."
              className="w-full mb-4 px-4 py-3 text-sm"
              style={{ background: '#0d1a28', border: '1px solid rgba(255,255,255,0.08)', color: '#f5efe0', fontFamily: 'Inter, sans-serif', outline: 'none' }}
            />
            <textarea
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              placeholder="在这里安全地分享你的想法..."
              rows={4}
              className="w-full mb-4 px-4 py-3 text-sm resize-none"
              style={{ background: '#0d1a28', border: '1px solid rgba(255,255,255,0.08)', color: '#f5efe0', fontFamily: 'Inter, sans-serif', outline: 'none', lineHeight: 1.8 }}
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {CATEGORIES.filter(c => c.key !== 'all').map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setNewCat(cat.key)}
                    className="px-3 py-1 text-xs"
                    style={{
                      background: newCat === cat.key ? cat.color + '18' : 'transparent',
                      border: `1px solid ${newCat === cat.key ? cat.color + '30' : 'rgba(255,255,255,0.05)'}`,
                      color: newCat === cat.key ? cat.color : '#5a5246',
                      cursor: 'pointer',
                    }}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNewPost}
                disabled={!newTitle.trim() || !newContent.trim()}
                className="px-6 py-2 text-sm font-semibold transition-all duration-200"
                style={{
                  background: (!newTitle.trim() || !newContent.trim()) ? 'rgba(232,168,32,0.1)' : '#e8a820',
                  color: (!newTitle.trim() || !newContent.trim()) ? '#5a5246' : '#060f18',
                  border: 'none', cursor: (!newTitle.trim() || !newContent.trim()) ? 'not-allowed' : 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                发布
              </button>
            </div>
          </div>
        )}

        {/* ── Post List ── */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <div className="text-center py-20" style={{ color: '#5a5246' }}>
              <p className="text-3xl mb-4">🏮</p>
              <p>还没有帖子，来做第一个分享的人吧</p>
            </div>
          )}
          {filtered.map(post => {
            const cat = CATEGORIES.find(c => c.key === post.category);
            const isExpanded = expandedPost === post.id;
            return (
              <div key={post.id}
                className="p-5 md:p-6 transition-all duration-300"
                style={{ background: '#0a1620', border: isExpanded ? '1px solid rgba(232,168,32,0.12)' : '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
                onClick={() => setExpandedPost(isExpanded ? null : post.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {cat && <span className="text-xs px-2 py-0.5" style={{ background: cat.color + '12', color: cat.color, border: `1px solid ${cat.color}22`, fontSize: 10 }}>{cat.icon} {cat.name}</span>}
                      <span className="text-xs" style={{ color: '#5a5246' }}>{post.time}</span>
                    </div>
                    <h3 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f5efe0', fontSize: 17 }}>
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#7a7062', lineHeight: 1.8 }}>
                      {isExpanded ? post.content : post.content.slice(0, 120) + (post.content.length > 120 ? '...' : '')}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 text-xs" style={{ color: '#5a5246' }}>
                  <span>👤 {post.author}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                    className="flex items-center gap-1 transition-colors"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7a7062' }}
                  >
                    💛 {post.likes}
                  </button>
                  <span>💬 {post.comments.length}</span>
                </div>

                {/* Expanded comments */}
                {isExpanded && (
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    {post.comments.map(c => (
                      <div key={c.id} className="mb-3 pl-4" style={{ borderLeft: '1px solid rgba(232,168,32,0.1)' }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold" style={{ color: '#e8a820' }}>{c.author}</span>
                          <span className="text-xs" style={{ color: '#5a5246' }}>{c.time}</span>
                        </div>
                        <p className="text-sm" style={{ color: '#b8ad9a', lineHeight: 1.7 }}>{c.content}</p>
                      </div>
                    ))}
                    {/* Comment input */}
                    <div className="flex gap-2 mt-3" onClick={e => e.stopPropagation()}>
                      <input
                        value={commentText[post.id] || ''}
                        onChange={e => setCommentText({ ...commentText, [post.id]: e.target.value })}
                        onKeyDown={e => e.key === 'Enter' && handleComment(post.id)}
                        placeholder="写下你的回应..."
                        className="flex-1 px-3 py-2 text-xs"
                        style={{ background: '#0d1a28', border: '1px solid rgba(255,255,255,0.06)', color: '#f5efe0', fontFamily: 'Inter, sans-serif', outline: 'none' }}
                      />
                      <button
                        onClick={() => handleComment(post.id)}
                        className="px-4 py-2 text-xs font-semibold"
                        style={{ background: '#e8a820', color: '#060f18', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                      >
                        回复
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Counselor Directory (咨询师黄页) ── */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: 24, height: 1, background: 'rgba(232,168,32,0.15)' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(232,168,32,0.5)', fontFamily: 'Inter, sans-serif' }}>
              咨询师黄页
            </span>
          </div>
          <p className="text-sm mb-6" style={{ color: '#7a7062', lineHeight: 1.7 }}>
            以下是平台合作的认证心理咨询师。如果需要专业帮助，请勇敢地伸出援手——就像千寻说的："没关系，我来帮你。"
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: '林医生', title: '临床心理学家', specialty: '焦虑·抑郁·创伤', location: '东京', available: true },
              { name: '王咨询师', title: 'CBT认证治疗师', specialty: '失眠·压力管理', location: '上海', available: true },
              { name: '陈博士', title: '荣格分析心理学家', specialty: '梦境解析·个人成长', location: '北京', available: false },
              { name: '李心理师', title: '家庭治疗师', specialty: '亲子关系·依恋问题', location: '广州', available: true },
            ].map((c, i) => (
              <div key={i} className="p-4 transition-all duration-300 flex items-center gap-4"
                style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="w-10 h-10 flex items-center justify-center text-lg"
                  style={{ background: c.available ? 'rgba(30,133,104,0.08)' : 'rgba(122,112,98,0.08)', color: c.available ? '#1e8568' : '#5a5246' }}>
                  {String.fromCodePoint(0x1F9D1 + i)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold" style={{ color: '#f5efe0' }}>{c.name}</span>
                    <span className="text-xs px-1.5 py-0.5" style={{
                      background: c.available ? 'rgba(30,133,104,0.1)' : 'rgba(122,112,98,0.1)',
                      color: c.available ? '#1e8568' : '#5a5246',
                      border: `1px solid ${c.available ? 'rgba(30,133,104,0.12)' : 'rgba(122,112,98,0.12)'}`,
                      fontSize: 9,
                    }}>
                      {c.available ? '可预约' : '已满'}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#7a7062' }}>{c.title} · {c.specialty}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#5a5246' }}>📍 {c.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Link ── */}
        <div className="mt-16 text-center">
          <Link href="/companion"
            className="text-xs transition-colors duration-300"
            style={{ color: '#5a5246', fontFamily: 'Inter, sans-serif' }}>
            需要立刻倾诉？→ 找无脸男聊聊
          </Link>
        </div>
      </div>
    </div>
  );
}
