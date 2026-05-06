'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCommunityPosts, createCommunityPost, likeCommunityPost, addCommunityComment } from '@/lib/api';

interface Comment {
  id: number; author: string; content: string; created_at?: string;
}
interface Post {
  id: number; title: string; content: string; category: string;
  author: string; likes: number; comment_count: number; comments: Comment[];
}

const CATEGORIES = [
  { key: 'all', name: '全部', icon: '🏮', color: '#d4a853' },
  { key: 'mood', name: '心情', icon: '🌸', color: '#c4554d' },
  { key: 'dream', name: '梦境', icon: '🌙', color: '#6b5b8a' },
  { key: 'growth', name: '成长', icon: '🌱', color: '#3b8b7a' },
  { key: 'help', name: '互助', icon: '🤝', color: '#5a7d9a' },
];

const GHIBLI_NAMES = ['千寻', '白龙', '无脸男', '锅炉爷爷', '小玲', '坊宝宝', '钱婆婆'];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCat, setNewCat] = useState('mood');
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [commentText, setCommentText] = useState<Record<number, string>>({});
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  // ── Fetch from API ──
  const fetchPosts = async (category?: string) => {
    setLoading(true);
    try {
      const data = await getCommunityPosts(category);
      if (data?.items) {
        setPosts(data.items);
        setTotal(data.total || data.items.length);
      }
    } catch (e) {
      console.warn('Community fetch failed, using cached', e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(activeCat === 'all' ? undefined : activeCat); }, [activeCat]);

  const randomName = () => GHIBLI_NAMES[Math.floor(Math.random() * GHIBLI_NAMES.length)];

  // ── Create post ──
  const handleNewPost = async () => {
    if (!newTitle.trim() || !newContent.trim() || submitting) return;
    setSubmitting(true);
    const author = randomName();
    try {
      const created = await createCommunityPost({
        author, title: newTitle.trim(), content: newContent.trim(), category: newCat,
      });
      if (created?.id) {
        // Prepend to local list immediately for responsiveness
        const newPost: Post = {
          id: created.id, author, title: newTitle.trim(),
          content: newContent.trim(), category: newCat, likes: 0, comment_count: 0, comments: [],
        };
        setPosts(prev => [newPost, ...prev]);
        setTotal(prev => prev + 1);
      }
    } catch (e) { console.warn('Post creation failed', e); }
    setNewTitle(''); setNewContent(''); setShowNewPost(false); setSubmitting(false);
  };

  // ── Like ──
  const handleLike = async (postId: number) => {
    // Optimistic update
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    try { await likeCommunityPost(postId); } catch { /* ignore */ }
  };

  // ── Comment ──
  const handleComment = async (postId: number) => {
    const text = commentText[postId]?.trim();
    if (!text) return;
    const author = randomName();
    const optimisticId = Date.now();
    // Optimistic
    setPosts(prev => prev.map(p => p.id !== postId ? p : {
      ...p,
      comment_count: p.comment_count + 1,
      comments: [...p.comments, { id: optimisticId, author, content: text }],
    }));
    setCommentText(prev => ({ ...prev, [postId]: '' }));
    try { await addCommunityComment(postId, { author, content: text }); } catch { /* ignore */ }
  };

  return (
    <div style={{ background: '#0a0a0c' }}>
      <section className="m-section animate-fade-in max-w-lg mx-auto" style={{ paddingTop: 8 }}>
        {/* Header */}
        <div className="m-page-header">
          <div>
            <h1 className="m-title" style={{ fontSize: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🏮</span>油屋互助社区
            </h1>
            <p className="m-caption mt-1" style={{ fontSize: 12 }}>匿名分享，安全表达 · {total} 篇帖子</p>
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
                color: activeCat === cat.key ? cat.color : '#71717a',
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
              style={{ borderRadius: 10, fontSize: 14, lineHeight: 1.9 }} />
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {CATEGORIES.filter(c => c.key !== 'all').map(cat => (
                  <button key={cat.key} onClick={() => setNewCat(cat.key)}
                    className="px-2.5 py-1 text-xs rounded-full"
                    style={{
                      background: newCat === cat.key ? cat.color + '15' : 'transparent',
                      border: `1px solid ${newCat === cat.key ? cat.color + '25' : 'transparent'}`,
                      color: newCat === cat.key ? cat.color : '#52525b',
                    }}>{cat.icon}</button>
                ))}
              </div>
              <button onClick={handleNewPost}
                disabled={!newTitle.trim() || !newContent.trim() || submitting}
                className="m-btn m-btn-primary m-btn-sm"
                style={{ opacity: (!newTitle.trim() || !newContent.trim()) ? 0.3 : 1 }}>
                {submitting ? '发布中...' : '发布'}
              </button>
            </div>
          </div>
        )}

        {/* Post List */}
        <div className="space-y-2.5">
          {loading && (
            <div className="text-center py-16 m-card">
              <p className="m-body" style={{ color: 'var(--text-muted)', fontSize: 14 }}>加载中...</p>
            </div>
          )}
          {!loading && posts.length === 0 && (
            <div className="text-center py-16 m-card">
              <p style={{ fontSize: 32, marginBottom: 12 }}>🏮</p>
              <p className="m-body" style={{ color: 'var(--text-muted)', fontSize: 14 }}>还没有帖子，来做第一个分享的人吧</p>
            </div>
          )}
          {posts.map(post => {
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
                    {post.author}
                  </span>
                </div>
                {/* Title & Preview */}
                <h3 className="m-subtitle mb-1.5" style={{ fontSize: 15 }}>{post.title}</h3>
                <p className="m-caption" style={{ fontSize: 13, lineHeight: 1.9 }}>
                  {isExpanded ? post.content : post.content.slice(0, 100) + (post.content.length > 100 ? '...' : '')}
                </p>
                {/* Actions */}
                <div className="flex items-center gap-4 mt-3">
                  <button onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                    style={{ background: 'none', border: 'none', padding: 0, fontSize: 12, color: '#71717a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    💛 {post.likes}
                  </button>
                  <span style={{ fontSize: 12, color: '#52525b' }}>💬 {post.comment_count ?? post.comments.length}</span>
                </div>
                {/* Comments */}
                {isExpanded && (
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    {post.comments.map(c => (
                      <div key={c.id} className="mb-2 pl-3" style={{ borderLeft: '1px solid rgba(212,168,83,0.1)' }}>
                        <span className="m-caption" style={{ color: '#d4a853', fontSize: 11, fontWeight: 600 }}>{c.author}</span>
                        {c.created_at && <span className="m-caption" style={{ color: 'var(--text-deep)', fontSize: 10, marginLeft: 8 }}>{c.created_at}</span>}
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
            <div style={{ width: 16, height: 1, background: 'rgba(212,168,83,0.15)' }} />
            <span className="m-label" style={{ color: 'rgba(212,168,83,0.5)', fontSize: 10 }}>咨询师黄页</span>
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
                      background: c.available ? 'rgba(59,139,122,0.1)' : 'rgba(122,112,98,0.1)',
                      color: c.available ? '#3b8b7a' : '#52525b' }}>
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
