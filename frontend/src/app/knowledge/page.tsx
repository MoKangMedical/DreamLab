'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MOCK_KNOWLEDGE_CATEGORIES, MOCK_KNOWLEDGE_ARTICLES, MOCK_KNOWLEDGE_FEATURED, MOCK_QUIZ_RESULT } from '@/lib/mock-knowledge';

const API_BASE = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || '') : '';

interface Category {
  id: number; name: string; slug: string; description: string; icon: string; color: string;
}

interface Article {
  id: number; title: string; slug: string; summary: string;
  key_concepts: string[]; evidence_level: string; reading_time: number;
  is_featured: boolean; category: { name: string; slug: string; icon: string; color: string } | null;
  created_at: string;
}

interface ArticleDetail extends Article {
  content: string; source: string; quiz: any[];
}

// ════════════════ 学科标签 ════════════════
const EVIDENCE_BADGES: Record<string, { label: string; color: string }> = {
  '强': { label: '强证据', color: '#3b8b7a' },
  '中等': { label: '中等证据', color: '#d4a853' },
  '初步': { label: '初步证据', color: '#c4554d' },
  '理论': { label: '理论', color: '#6b5b8a' },
};

export default function KnowledgePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [featured, setFeatured] = useState<Article[]>([]);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState<ArticleDetail | null>(null);
  const [quizState, setQuizState] = useState<{ answers: number[]; submitted: boolean; result: any } | null>(null);

  useEffect(() => { setVisible(true); fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [catRes, featRes] = await Promise.all([
        fetch(`${API_BASE}/api/knowledge/categories`),
        fetch(`${API_BASE}/api/knowledge/featured`),
      ]);
      if (!catRes.ok || !featRes.ok) throw new Error('API unavailable');
      setCategories(await catRes.json());
      setFeatured(await featRes.json());
      await fetchArticles(null, '');
    } catch {
      // Offline: fall back to mock data
      setCategories(MOCK_KNOWLEDGE_CATEGORIES);
      setFeatured(MOCK_KNOWLEDGE_FEATURED.map(a => ({
        ...a,
        category: MOCK_KNOWLEDGE_CATEGORIES.find(c => c.slug === a.category_slug) || null,
        created_at: '2026-04-15T08:00:00Z',
      })));
      const allArticles = MOCK_KNOWLEDGE_ARTICLES.map(a => ({
        ...a,
        category: MOCK_KNOWLEDGE_CATEGORIES.find(c => c.slug === a.category_slug) || null,
        created_at: '2026-04-15T08:00:00Z',
      }));
      setArticles(allArticles);
      setLoading(false);
    }
  };

  const fetchArticles = async (cat: string | null, q: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (cat) params.set('category', cat);
      if (q) params.set('search', q);
      const res = await fetch(`${API_BASE}/api/knowledge?${params}`);
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      setArticles(data.items || []);
    } catch {
      // Offline: filter mock data
      let filtered = MOCK_KNOWLEDGE_ARTICLES.map(a => ({
        ...a,
        category: MOCK_KNOWLEDGE_CATEGORIES.find(c => c.slug === a.category_slug) || null,
        created_at: '2026-04-15T08:00:00Z',
      }));
      if (cat) filtered = filtered.filter(a => a.category_slug === cat);
      if (q) {
        const lower = q.toLowerCase();
        filtered = filtered.filter(a => a.title.toLowerCase().includes(lower) || a.summary.toLowerCase().includes(lower));
      }
      setArticles(filtered);
    } finally { setLoading(false); }
  };

  const fetchDetail = async (slug: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/knowledge/${slug}`);
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      if (!data.error) {
        setDetail(data);
        setQuizState(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {
      // Offline: find in mock data
      const article = MOCK_KNOWLEDGE_ARTICLES.find(a => a.slug === slug);
      if (article) {
        const category = MOCK_KNOWLEDGE_CATEGORIES.find(c => c.slug === article.category_slug) || null;
        setDetail({ ...article, category, created_at: '2026-04-15T08:00:00Z', source: '学术来源 · 同行评审' } as ArticleDetail);
        setQuizState(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const submitQuiz = async () => {
    if (!detail || !quizState) return;
    try {
      const res = await fetch(`${API_BASE}/api/knowledge/quiz/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article_id: detail.id,
          user_id: 1,
          answers: quizState.answers.map((selected, i) => ({ question_index: i, selected })),
        }),
      });
      if (!res.ok) throw new Error('API unavailable');
      const result = await res.json();
      setQuizState({ ...quizState, submitted: true, result });
    } catch {
      // Offline: compute quiz result locally
      const total = detail.quiz?.length || 0;
      const correct = quizState.answers.filter((a, i) => a === detail.quiz[i]?.answer).length;
      const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
      setQuizState({ ...quizState, submitted: true, result: { score: correct, total, percentage: pct } });
    }
  };

  // ═══════════════════════════════════════════════
  // 文章详情 + 测验视图
  // ═══════════════════════════════════════════════
  if (detail) {
    return (
      <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-32">
          <button onClick={() => setDetail(null)}
            className="text-xs mb-8 transition-colors" style={{ color: '#52525b', background: 'none', border: 'none', cursor: 'pointer' }}>
            ← 返回知识库
          </button>

          {/* 文章头部 */}
          <div className="mb-8">
            {detail.category && (
              <div className="flex items-center gap-2 mb-4">
                <span>{detail.category.icon}</span>
                <span className="text-xs px-2 py-0.5" style={{ background: detail.category.color + '12', border: `1px solid ${detail.category.color}22`, color: detail.category.color, borderRadius: 2 }}>
                  {detail.category.name}
                </span>
                {EVIDENCE_BADGES[detail.evidence_level] && (
                  <span className="text-xs px-2 py-0.5" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: EVIDENCE_BADGES[detail.evidence_level].color, borderRadius: 2 }}>
                    {EVIDENCE_BADGES[detail.evidence_level].label}
                  </span>
                )}
                <span className="text-xs" style={{ color: '#52525b' }}>{detail.reading_time} 分钟</span>
              </div>
            )}
            <h1 className="font-bold mb-3" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(24px, 4vw, 42px)', color: '#f4f4f6', lineHeight: 1.3 }}>
              {detail.title}
            </h1>
            {detail.key_concepts?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {detail.key_concepts.map((k: string) => (
                  <span key={k} className="text-xs px-2 py-1" style={{ background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.12)', color: '#d4a853', borderRadius: 2 }}>
                    {k}
                  </span>
                ))}
              </div>
            )}
            {detail.source && (
              <p className="text-xs leading-relaxed" style={{ color: '#52525b' }}>
                📚 {detail.source}
              </p>
            )}
          </div>

          {/* 文章正文 (简易Markdown渲染) */}
          <div className="p-6 md:p-8 mb-8" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
            <div className="prose prose-invert max-w-none text-sm leading-relaxed" style={{ color: '#a1a1aa', lineHeight: 2 }}
              dangerouslySetInnerHTML={{
                __html: detail.content
                  .replace(/^### (.+)$/gm, '<h3 style="color:#f4f4f6;font-size:16px;font-weight:700;margin:24px 0 8px">$1</h3>')
                  .replace(/^## (.+)$/gm, '<h2 style="color:#f4f4f6;font-size:20px;font-weight:700;margin:32px 0 12px;font-family:\'Noto Serif SC\',serif">$1</h2>')
                  .replace(/^# (.+)$/gm, '<h1 style="color:#f4f4f6;font-size:26px;font-weight:700;margin:0 0 20px;font-family:\'Noto Serif SC\',serif">$1</h1>')
                  .replace(/^- (.+)$/gm, '<li style="margin-left:16px;color:#a1a1aa">$1</li>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#f4f4f6">$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em>$1</em>')
                  .replace(/\n\n/g, '<br/><br/>')
                  .replace(/\n/g, '<br/>')
              }}
            />
          </div>

          {/* 测验区 */}
          {detail.quiz?.length > 0 && (
            <div className="p-6 md:p-8 mb-8" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
              <h2 className="font-bold text-xl mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>
                📝 知识自测
              </h2>

              {!quizState ? (
                <div>
                  <p className="text-sm mb-4" style={{ color: '#71717a' }}>
                    共 {detail.quiz.length} 题，测试你对文章内容的理解
                  </p>
                  <button onClick={() => setQuizState({ answers: new Array(detail.quiz.length).fill(-1), submitted: false, result: null })}
                    className="px-6 py-3 text-sm font-semibold transition-all"
                    style={{ background: '#d4a853', color: '#0a0a0c', borderRadius: 2, border: 'none', cursor: 'pointer' }}>
                    开始测验 →
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {detail.quiz.map((q: any, qi: number) => (
                    <div key={qi} className="p-4" style={{ background: '#0a0a0c', borderRadius: 2 }}>
                      <p className="text-sm font-bold mb-3" style={{ color: '#f4f4f6' }}>
                        {qi + 1}. {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt: string, oi: number) => {
                          const isSelected = quizState.answers[qi] === oi;
                          const isCorrect = quizState.submitted && oi === q.answer;
                          const isWrongSelected = quizState.submitted && isSelected && oi !== q.answer;
                          return (
                            <button key={oi}
                              onClick={() => {
                                if (quizState.submitted) return;
                                const newAnswers = [...quizState.answers];
                                newAnswers[qi] = oi;
                                setQuizState({ ...quizState, answers: newAnswers });
                              }}
                              className="w-full text-left text-sm px-4 py-2.5 transition-all"
                              style={{
                                background: isCorrect ? 'rgba(59,139,122,0.12)' : isWrongSelected ? 'rgba(196,85,77,0.12)' : isSelected ? 'rgba(212,168,83,0.08)' : 'transparent',
                                border: `1px solid ${isCorrect ? 'rgba(59,139,122,0.3)' : isWrongSelected ? 'rgba(196,85,77,0.3)' : isSelected ? 'rgba(212,168,83,0.25)' : 'rgba(255,255,255,0.06)'}`,
                                color: isCorrect ? '#3b8b7a' : isWrongSelected ? '#c4554d' : isSelected ? '#d4a853' : '#a1a1aa',
                                borderRadius: 2,
                                cursor: quizState.submitted ? 'default' : 'pointer',
                              }}>
                              {opt}
                              {quizState.submitted && isCorrect && ' ✓'}
                              {quizState.submitted && isWrongSelected && ' ✗'}
                            </button>
                          );
                        })}
                      </div>
                      {quizState.submitted && quizState.result?.details?.[qi] && (
                        <p className="text-xs mt-2" style={{ color: '#71717a' }}>
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}

                  {!quizState.submitted && quizState.answers.every((a: number) => a >= 0) && (
                    <button onClick={submitQuiz}
                      className="w-full py-3 text-sm font-semibold transition-all"
                      style={{ background: '#d4a853', color: '#0a0a0c', borderRadius: 2, border: 'none', cursor: 'pointer' }}>
                      提交答案
                    </button>
                  )}

                  {quizState.submitted && quizState.result && (
                    <div className="p-5 text-center" style={{ background: '#0a0a0c', borderRadius: 2 }}>
                      <div className="text-4xl mb-2">
                        {quizState.result.percentage >= 80 ? '🎉' : quizState.result.percentage >= 50 ? '👍' : '📚'}
                      </div>
                      <p className="text-lg font-bold mb-1" style={{ color: '#f4f4f6' }}>
                        {quizState.result.score} / {quizState.result.total} 正确
                      </p>
                      <p className="text-sm" style={{ color: '#71717a' }}>
                        正确率 {quizState.result.percentage}%
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════
  // 主列表视图
  // ═══════════════════════════════════════════════
  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-32">
        
        {/* Hero */}
        <div className={`text-center mb-12 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-5xl md:text-6xl mb-6">📚</div>
          <h1 className="font-bold mb-4" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: '#f4f4f6',
            lineHeight: 1.1,
          }}>
            证据级知识库
          </h1>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: '#71717a' }}>
            从焦虑到睡眠、从CBT到正念——每篇文章都有同行评审来源。
            不只是科普，每一句话都有据可查。
          </p>
        </div>

        {/* 搜索 */}
        <div className="max-w-xl mx-auto mb-10">
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); if (!e.target.value) fetchArticles(selectedCat, ''); }}
            onKeyDown={e => { if (e.key === 'Enter') fetchArticles(selectedCat, search); }}
            placeholder="搜索文章...（如：焦虑、CBT、睡眠）"
            className="w-full text-sm px-5 py-3"
            style={{
              background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2,
              color: '#a1a1aa', outline: 'none',
            }}
          />
        </div>

        {/* 分类筛选 */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => { setSelectedCat(null); fetchArticles(null, search); }}
              className="text-xs px-4 py-2 transition-all"
              style={{
                background: !selectedCat ? 'rgba(212,168,83,0.08)' : 'transparent',
                border: `1px solid ${!selectedCat ? 'rgba(212,168,83,0.2)' : 'rgba(255,255,255,0.06)'}`,
                color: !selectedCat ? '#d4a853' : '#52525b',
                borderRadius: 2, cursor: 'pointer',
              }}>
              全部
            </button>
            {categories.map(cat => (
              <button key={cat.id}
                onClick={() => { setSelectedCat(cat.slug); fetchArticles(cat.slug, search); }}
                className="text-xs px-4 py-2 transition-all flex items-center gap-1.5"
                style={{
                  background: selectedCat === cat.slug ? cat.color + '12' : 'transparent',
                  border: `1px solid ${selectedCat === cat.slug ? cat.color + '30' : 'rgba(255,255,255,0.06)'}`,
                  color: selectedCat === cat.slug ? cat.color : '#52525b',
                  borderRadius: 2, cursor: 'pointer',
                }}>
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* 精选文章 */}
        {featured.length > 0 && !search && !selectedCat && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>精选推荐</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map(a => (
                <ArticleCard key={a.id} article={a} onClick={() => fetchDetail(a.slug)} />
              ))}
            </div>
          </div>
        )}

        {/* 文章列表 */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,83,0.5)' }}>
              {selectedCat ? categories.find(c => c.slug === selectedCat)?.name : '全部文章'}
              {articles.length > 0 && ` (${articles.length})`}
            </span>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="p-6 animate-pulse" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <div className="h-5 w-2/3 mb-3" style={{ background: '#ffffff05', borderRadius: 1 }} />
                  <div className="h-4 w-full mb-2" style={{ background: '#ffffff05', borderRadius: 1 }} />
                  <div className="h-4 w-1/2" style={{ background: '#ffffff05', borderRadius: 1 }} />
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-sm" style={{ color: '#71717a' }}>
                {search ? '没有找到匹配的文章' : '暂无文章'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map(a => (
                <ArticleCard key={a.id} article={a} onClick={() => fetchDetail(a.slug)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article, onClick }: { article: Article; onClick: () => void }) {
  const badge = EVIDENCE_BADGES[article.evidence_level];
  return (
    <div onClick={onClick}
      className="p-6 cursor-pointer transition-all hover:translate-y-[-2px]"
      style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
      <div className="flex items-center gap-2 mb-3">
        {article.category && <span>{article.category.icon}</span>}
        {badge && (
          <span className="text-xs px-2 py-0.5" style={{ background: badge.color + '12', border: `1px solid ${badge.color}22`, color: badge.color, borderRadius: 2 }}>
            {badge.label}
          </span>
        )}
        <span className="text-xs" style={{ color: '#52525b' }}>{article.reading_time} 分钟</span>
      </div>
      <h3 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6', fontSize: 16 }}>
        {article.title}
      </h3>
      <p className="text-sm leading-relaxed mb-3" style={{ color: '#71717a', lineHeight: 1.7 }}>
        {article.summary}
      </p>
      {article.key_concepts?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {article.key_concepts.slice(0, 3).map(k => (
            <span key={k} className="text-xs px-2 py-0.5" style={{ background: 'rgba(255,255,255,0.03)', color: '#52525b', borderRadius: 1 }}>
              {k}
            </span>
          ))}
          {article.key_concepts.length > 3 && (
            <span className="text-xs px-2 py-0.5" style={{ color: '#52525b' }}>+{article.key_concepts.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
}
