'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Comment {
  id: number; author: string; content: string; time: string;
}
interface Post {
  id: number; title: string; content: string; category: string;
  author: string; time: string; comments: Comment[]; likes: number;
}

const CATEGORIES = [
  { key: 'all', name: '全部', icon: '🏮', color: '#e8a820' },
  { key: 'mood', name: '心情', icon: '🌸', color: '#c0392b' },
  { key: 'dream', name: '梦境', icon: '🌙', color: '#8b7ab8' },
  { key: 'growth', name: '成长', icon: '🌱', color: '#6b9e7a' },
  { key: 'help', name: '互助', icon: '🤝', color: '#4a90b8' },
];

const GHIBLI_NAMES = ['千寻', '白龙', '无脸男', '锅炉爷爷', '小玲', '坊宝宝', '钱婆婆'];

const SEED_POSTS: Post[] = [
  { id: 1, title: '做完SAS测评，发现自己比想象中更焦虑', category: 'mood',
    content: '一直以为自己只是"想太多"，做完量表才发现标准分到了58。看到"轻度焦虑"的结果反而松了口气——原来这不是我的错。',
    author: '小玲', time: '2小时前', likes: 12,
    comments: [
      { id: 1, author: '锅炉爷爷', content: '焦虑不是缺陷，是身体在提醒你。锅炉房的火大一些没关系。', time: '1小时前' },
      { id: 2, author: '无脸男', content: '......嗯。（默默递给你一杯热茶）', time: '30分钟前' },
    ] },
  { id: 2, title: '连续7天记录梦境，发现了惊人的模式', category: 'dream',
    content: '反复出现"被追赶"和"找不到路"的主题。弗洛伊德说这些可能和安全感的缺失有关。',
    author: '千寻', time: '5小时前', likes: 8,
    comments: [
      { id: 1, author: '白龙', content: '被追赶的梦往往与现实中逃避的问题有关。转过身，看看追赶你的是什么。', time: '3小时前' },
    ] },
  { id: 3, title: '学到荣格"阴影"概念，整个人都不好了——但是好的那种', category: 'growth',
    content: '之前不能接受自己会嫉妒朋友的成功。荣格说阴影不是敌人，承认之后反而轻松了。',
    author: '坊宝宝', time: '昨天', likes: 15,
    comments: [
      { id: 1, author: '钱婆婆', content: '能承认阴影的人，已经比大多数人勇敢了。', time: '昨天' },
    ] },
  { id: 4, title: '失眠三周，4-7-8呼吸法让我昨晚睡了6小时', category: 'help',
    content: '之前觉得呼吸法太简单不可能有用，但昨晚真的在第三轮就睡着了。',
    author: '煤煤虫', time: '昨天', likes: 20,
    comments: [
      { id: 1, author: '锅炉爷爷', content: '睡前泡个热水澡。最好的安眠药就是热水。', time: '昨天' },
    ] },
];

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
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dreamlab_community_posts');
      setPosts(stored ? JSON.parse(stored) : SEED_POSTS);
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
      id: Date.now(), title: newTitle.trim(), content: newContent.trim(),
      category: newCat, author: randomName(), time: '刚刚', likes: 0, comments: [],
    };
    savePosts([post, ...posts]);
    setNewTitle(''); setNewContent(''); setShowNewPost(false);
  };

  const handleComment = (postId: number) => {
    const text = commentText[postId]?.trim();
    if (!text) return;
    const updated = posts.map(p => p.id !== postId ? p : {
      ...p, comments: [...p.comments, { id: Date.now(), author: randomName(), content: text, time: '刚刚' }],
    });
    savePosts(updated);
    setCommentText({ ...commentText, [postId]: '' });
  };

  const handleLike = (postId: number) => {
    savePosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div style={{ background: '#060f18' }}>
      <section className={`m-section animate-fade-in`} style={{ paddingTop: 8 }}>
        {/* Header */}
        <div className="m-page-header">
          <div>
            <h1 className="m-title" style={{ fontSize: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🏮</span>油屋互助社区
            </h1>
            <p className="m-caption mt-1" style={{ fontSize: 12 }}>匿名分享，安全表达</p>
          </div>
          <button onClick={() => setShowNewPost(!showNewPost)}
            className="m-btn m-btn-primary m-btn-sm">
            {showNewPost ? '✕ 取消' : '✏️ 发帖'}
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1.5 mb-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => setActiveCat(cat.key)}
              className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-all"
              style={{
                background: activeCat === cat.key ? cat.color + '18' : 'transparent',
                border: `1px solid ${activeCat === cat.key ? cat.color + '30' : 'rgba(255,255,255,0.06)'}`,
                color: activeCat === cat.key ? cat.color : '#7a7062',
              }}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <div className="m-card mb-5" style={{ padding: 16 }}>
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)}
              placeholder="标题..."
              className="input-field mb-3" style={{ borderRadius: 10, fontSize: 14 }} />
            <textarea value={newContent} onChange={e => setNewContent(e.target.value)}
              placeholder="安全地分享你的想法..."
              rows={3} className="input-field mb-3 resize-none"
              style={{ borderRadius: 10, fontSize: 14, lineHeight: 1.7 }} />
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {CATEGORIES.filter(c => c.key !== 'all').map(cat => (
                  <button key={cat.key} onClick={() => setNewCat(cat.key)}
                    className="px-2.5 py-1 text-xs rounded-full"
                    style={{
                      background: newCat === cat.key ? cat.color + '15' : 'transparent',
                      border: `1px solid ${newCat === cat.key ? cat.color + '25' : 'transparent'}`,
                      color: newCat === cat.key ? cat.color : '#5a5246',
                    }}>{cat.icon}</button>
                ))}
              </div>
              <button onClick={handleNewPost}
                disabled={!newTitle.trim() || !newContent.trim()}
                className="m-btn m-btn-primary m-btn-sm"
                style={{ opacity: (!newTitle.trim() || !newContent.trim()) ? 0.3 : 1 }}>
                发布
              </button>
            </div>
          </div>
        )}

        {/* Post List */}
        <div className="space-y-2.5">
          {filtered.length === 0 && (
            <div className="text-center py-16 m-card">
              <p style={{ fontSize: 32, marginBottom: 12 }}>🏮</p>
              <p className="m-body" style={{ color: 'var(--text-muted)', fontSize: 14 }}>还没有帖子，来做第一个分享的人吧</p>
            </div>
          )}
          {filtered.map(post => {
            const cat = CATEGORIES.find(c => c.key === post.category);
            const isExpanded = expandedPost === post.id;
            return (
              <div key={post.id}
                className="m-card m-card-interactive"
                onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                style={{ padding: 16 }}>
                {/* Meta */}
                <div className="flex items-center gap-2 mb-2">
                  {cat && <span style={{ fontSize: 14 }}>{cat.icon}</span>}
                  <span className="m-caption" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {post.author} · {post.time}
                  </span>
                </div>
                {/* Title & Preview */}
                <h3 className="m-subtitle mb-1.5" style={{ fontSize: 15 }}>{post.title}</h3>
                <p className="m-caption" style={{ fontSize: 13, lineHeight: 1.7 }}>
                  {isExpanded ? post.content : post.content.slice(0, 100) + (post.content.length > 100 ? '...' : '')}
                </p>
                {/* Actions */}
                <div className="flex items-center gap-4 mt-3">
                  <button onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                    style={{ background: 'none', border: 'none', padding: 0, fontSize: 12, color: '#7a7062', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    💛 {post.likes}
                  </button>
                  <span style={{ fontSize: 12, color: '#5a5246' }}>💬 {post.comments.length}</span>
                </div>
                {/* Comments */}
                {isExpanded && (
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    {post.comments.map(c => (
                      <div key={c.id} className="mb-2 pl-3" style={{ borderLeft: '1px solid rgba(232,168,32,0.1)' }}>
                        <span className="m-caption" style={{ color: '#e8a820', fontSize: 11, fontWeight: 600 }}>{c.author}</span>
                        <span className="m-caption" style={{ color: 'var(--text-deep)', fontSize: 10, marginLeft: 8 }}>{c.time}</span>
                        <p className="m-caption" style={{ fontSize: 12, marginTop: 2 }}>{c.content}</p>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-2" onClick={e => e.stopPropagation()}>
                      <input value={commentText[post.id] || ''}
                        onChange={e => setCommentText({ ...commentText, [post.id]: e.target.value })}
                        onKeyDown={e => e.key === 'Enter' && handleComment(post.id)}
                        placeholder="回应..."
                        className="input-field" style={{ flex: 1, fontSize: 13, padding: '8px 12px', borderRadius: 8 }} />
                      <button onClick={() => handleComment(post.id)}
                        className="m-btn m-btn-primary m-btn-sm">回复</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Counselor Directory */}
        <div className="m-section-sm" style={{ marginTop: 32 }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 16, height: 1, background: 'rgba(232,168,32,0.15)' }} />
            <span className="m-label" style={{ color: 'rgba(232,168,32,0.5)', fontSize: 10 }}>咨询师黄页</span>
          </div>
          <div className="space-y-2">
            {[
              { name: '林医生', title: '临床心理学家', specialty: '焦虑·抑郁·创伤', location: '东京', available: true },
              { name: '王咨询师', title: 'CBT认证治疗师', specialty: '失眠·压力管理', location: '上海', available: true },
              { name: '陈博士', title: '荣格分析心理学家', specialty: '梦境解析·个人成长', location: '北京', available: false },
            ].map((c, i) => (
              <div key={i} className="m-card flex items-center gap-3" style={{ padding: 14 }}>
                <span style={{ fontSize: 28 }}>{['🧑‍⚕️', '👩‍⚕️', '👨‍⚕️'][i]}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="m-subtitle" style={{ fontSize: 14 }}>{c.name}</span>
                    <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4,
                      background: c.available ? 'rgba(30,133,104,0.1)' : 'rgba(122,112,98,0.1)',
                      color: c.available ? '#1e8568' : '#5a5246' }}>
                      {c.available ? '可约' : '已满'}
                    </span>
                  </div>
                  <p className="m-caption" style={{ fontSize: 11 }}>{c.title} · {c.specialty}</p>
                  <p className="m-caption" style={{ fontSize: 10, color: 'var(--text-deep)' }}>📍 {c.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center m-section-sm">
          <Link href="/companion" className="m-caption" style={{ color: 'var(--text-deep)' }}>
            需要立刻倾诉？→ 找无脸男聊聊
          </Link>
        </div>
      </section>
    </div>
  );
}
