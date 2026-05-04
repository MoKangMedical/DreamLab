'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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
  '强': { label: '强证据', color: '#6b9e7a' },
  '中等': { label: '中等证据', color: '#e8a820' },
  '初步': { label: '初步证据', color: '#c0392b' },
  '理论': { label: '理论', color: '#8b7ab8' },
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
      setCategories(await catRes.json());
      setFeatured(await featRes.json());
      await fetchArticles(null, '');
    } catch { setLoading(false); }
  };

  const fetchArticles = async (cat: string | null, q: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (cat) params.set('category', cat);
      if (q) params.set('search', q);
      const res = await fetch(`${API_BASE}/api/knowledge?${params}`);
      const data = await res.json();
      setArticles(data.items || []);
    } catch {} finally { setLoading(false); }
  };

  const fetchDetail = async (slug: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/knowledge/${slug}`);
      const data = await res.json();
      if (!data.error) {
        setDetail(data);
        setQuizState(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {}
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
      const result = await res.json();
      setQuizState({ ...quizState, submitted: true, result });
    } catch {}
  };

  // ═══════════════════════════════════════════════
  // 文章详情 + 测验视图
  // ═══════════════════════════════════════════════
  if (detail) {
    return (
      <div style={{ background: '#060f18', minHeight: '100vh' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-32">
          <button onClick={() => setDetail(null)}
            className="text-xs mb-8 transition-colors" style={{ color: '#5a5246', background: 'none', border: 'none', cursor: 'pointer' }}>
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
                <span className="text-xs" style={{ color: '#5a5246' }}>{detail.reading_time} 分钟</span>
              </div>
            )}
            <h1 className="font-bold mb-3" style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(24px, 4vw, 42px)', color: '#f5efe0', lineHeight: 1.3 }}>
              {detail.title}
            </h1>
            {detail.key_concepts?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {detail.key_concepts.map((k: string) => (
                  <span key={k} className="text-xs px-2 py-1" style={{ background: 'rgba(232,168,32,0.06)', border: '1px solid rgba(232,168,32,0.12)', color: '#e8a820', borderRadius: 2 }}>
                    {k}
                  </span>
                ))}
              </div>
            )}
            {detail.source && (
              <p className="text-xs leading-relaxed" style={{ color: '#5a5246' }}>
                📚 {detail.source}
              </p>
            )}
          </div>

          {/* 文章正文 (简易Markdown渲染) */}
          <div className="p-6 md:p-8 mb-8" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
            <div className="prose prose-invert max-w-none text-sm leading-relaxed" style={{ color: '#b8ad9a', lineHeight: 2 }}
              dangerouslySetInnerHTML={{
                __html: detail.content
                  .replace(/^### (.+)$/gm, '<h3 style="color:#f5efe0;font-size:16px;font-weight:700;margin:24px 0 8px">$1</h3>')
                  .replace(/^## (.+)$/gm, '<h2 style="color:#f5efe0;font-size:20px;font-weight:700;margin:32px 0 12px;font-family:\'Noto Serif SC\',serif">$1</h2>')
                  .replace(/^# (.+)$/gm, '<h1 style="color:#f5efe0;font-size:26px;font-weight:700;margin:0 0 20px;font-family:\'Noto Serif SC\',serif">$1</h1>')
                  .replace(/^- (.+)$/gm, '<li style="margin-left:16px;color:#b8ad9a">$1</li>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#f5efe0">$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em>$1</em>')
                  .replace(/\n\n/g, '<br/><br/>')
                  .replace(/\n/g, '<br/>')
              }}
            />
          </div>

          {/* 测验区 */}
          {detail.quiz?.length > 0 && (
            <div className="p-6 md:p-8 mb-8" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
              <h2 className="font-bold text-xl mb-6" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f5efe0' }}>
                📝 知识自测
              </h2>

              {!quizState ? (
                <div>
                  <p className="text-sm mb-4" style={{ color: '#7a7062' }}>
                    共 {detail.quiz.length} 题，测试你对文章内容的理解
                  </p>
                  <button onClick={() => setQuizState({ answers: new Array(detail.quiz.length).fill(-1), submitted: false, result: null })}
                    className="px-6 py-3 text-sm font-semibold transition-all"
                    style={{ background: '#e8a820', color: '#060f18', borderRadius: 2, border: 'none', cursor: 'pointer' }}>
                    开始测验 →
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {detail.quiz.map((q: any, qi: number) => (
                    <div key={qi} className="p-4" style={{ background: '#060f18', borderRadius: 2 }}>
                      <p className="text-sm font-bold mb-3" style={{ color: '#f5efe0' }}>
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
                                background: isCorrect ? 'rgba(107,158,122,0.12)' : isWrongSelected ? 'rgba(192,57,43,0.12)' : isSelected ? 'rgba(232,168,32,0.08)' : 'transparent',
                                border: `1px solid ${isCorrect ? 'rgba(107,158,122,0.3)' : isWrongSelected ? 'rgba(192,57,43,0.3)' : isSelected ? 'rgba(232,168,32,0.25)' : 'rgba(255,255,255,0.06)'}`,
                                color: isCorrect ? '#6b9e7a' : isWrongSelected ? '#c0392b' : isSelected ? '#e8a820' : '#b8ad9a',
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
                        <p className="text-xs mt-2" style={{ color: '#7a7062' }}>
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}

                  {!quizState.submitted && quizState.answers.every((a: number) => a >= 0) && (
                    <button onClick={submitQuiz}
                      className="w-full py-3 text-sm font-semibold transition-all"
                      style={{ background: '#e8a820', color: '#060f18', borderRadius: 2, border: 'none', cursor: 'pointer' }}>
                      提交答案
                    </button>
                  )}

                  {quizState.submitted && quizState.result && (
                    <div className="p-5 text-center" style={{ background: '#060f18', borderRadius: 2 }}>
                      <div className="text-4xl mb-2">
                        {quizState.result.percentage >= 80 ? '🎉' : quizState.result.percentage >= 50 ? '👍' : '📚'}
                      </div>
                      <p className="text-lg font-bold mb-1" style={{ color: '#f5efe0' }}>
                        {quizState.result.score} / {quizState.result.total} 正确
                      </p>
                      <p className="text-sm" style={{ color: '#7a7062' }}>
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
    <div style={{ background: '#060f18', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-32">
        
        {/* Hero */}
        <div className={`text-center mb-12 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-5xl md:text-6xl mb-6">📚</div>
          <h1 className="font-bold mb-4" style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: '#f5efe0',
            lineHeight: 1.1,
          }}>
            证据级知识库
          </h1>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: '#7a7062' }}>
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
              background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2,
              color: '#b8ad9a', outline: 'none',
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
                background: !selectedCat ? 'rgba(232,168,32,0.08)' : 'transparent',
                border: `1px solid ${!selectedCat ? 'rgba(232,168,32,0.2)' : 'rgba(255,255,255,0.06)'}`,
                color: !selectedCat ? '#e8a820' : '#5a5246',
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
                  color: selectedCat === cat.slug ? cat.color : '#5a5246',
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
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(232,168,32,0.5)' }}>精选推荐</span>
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
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(232,168,32,0.5)' }}>
              {selectedCat ? categories.find(c => c.slug === selectedCat)?.name : '全部文章'}
              {articles.length > 0 && ` (${articles.length})`}
            </span>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="p-6 animate-pulse" style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <div className="h-5 w-2/3 mb-3" style={{ background: '#ffffff05', borderRadius: 1 }} />
                  <div className="h-4 w-full mb-2" style={{ background: '#ffffff05', borderRadius: 1 }} />
                  <div className="h-4 w-1/2" style={{ background: '#ffffff05', borderRadius: 1 }} />
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-sm" style={{ color: '#7a7062' }}>
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
      style={{ background: '#0a1620', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
      <div className="flex items-center gap-2 mb-3">
        {article.category && <span>{article.category.icon}</span>}
        {badge && (
          <span className="text-xs px-2 py-0.5" style={{ background: badge.color + '12', border: `1px solid ${badge.color}22`, color: badge.color, borderRadius: 2 }}>
            {badge.label}
          </span>
        )}
        <span className="text-xs" style={{ color: '#5a5246' }}>{article.reading_time} 分钟</span>
      </div>
      <h3 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f5efe0', fontSize: 16 }}>
        {article.title}
      </h3>
      <p className="text-sm leading-relaxed mb-3" style={{ color: '#7a7062', lineHeight: 1.7 }}>
        {article.summary}
      </p>
      {article.key_concepts?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {article.key_concepts.slice(0, 3).map(k => (
            <span key={k} className="text-xs px-2 py-0.5" style={{ background: 'rgba(255,255,255,0.03)', color: '#5a5246', borderRadius: 1 }}>
              {k}
            </span>
          ))}
          {article.key_concepts.length > 3 && (
            <span className="text-xs px-2 py-0.5" style={{ color: '#5a5246' }}>+{article.key_concepts.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
}
