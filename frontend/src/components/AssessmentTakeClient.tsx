'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getAssessment, submitAssessment } from '@/lib/api';
import { showBathToken, showShikigami } from '@/components/SpiritedInteractions';
import ResultRadar from '@/components/ResultRadar';

type Phase = 'loading' | 'taking' | 'submitting' | 'result';

export default function AssessmentTakeClient() {
  const params = useParams();
  const id = Number(params.id);

  const [phase, setPhase] = useState<Phase>('loading');
  const [assessment, setAssessment] = useState<any>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getAssessment(id).then(a => {
      setAssessment(a);
      setPhase('taking');
    }).catch(() => setError('加载失败'));
  }, [id]);

  const totalQuestions = assessment?.questions?.length || 0;
  const progress = totalQuestions > 0 ? Math.round((Object.keys(answers).length / totalQuestions) * 100) : 0;

  const selectOption = useCallback((questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
    if (currentQ < totalQuestions - 1) {
      setTimeout(() => setCurrentQ(c => c + 1), 250);
    }
  }, [currentQ, totalQuestions]);

  const handleSubmit = async () => {
    if (Object.keys(answers).length < totalQuestions) {
      setError('请回答所有问题后再提交');
      return;
    }
    setPhase('submitting');
    setError('');
    try {
      const ansArray = Object.entries(answers).map(([qid, score]) => ({
        question_id: Number(qid),
        score,
      }));
      const res = await submitAssessment(id, { user_id: 1, answers: ansArray });
      setResult(res);
      setPhase('result');
      // 🎴 浴牌奖励
      setTimeout(() => {
        showBathToken('契约之镜已映照', '🪞', `${assessment?.name || '测评'} · ${res.level}`);
        showShikigami('汤婆婆收下了你的契约，镜中映出新的自己', 'success');
      }, 500);
    } catch {
      setError('提交失败，请重试');
      setPhase('taking');
    }
  };

  if (phase === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gradient-bg)' }}>
        <div className="text-center">
          <div className="text-4xl mb-4 animate-float-slow">🪞</div>
          <p className="text-[#B0B0C0]">正在打开契约之镜...</p>
        </div>
      </div>
    );
  }

  if (phase === 'taking' && assessment) {
    const q = assessment.questions[currentQ];
    const isAnswered = answers[q.id] !== undefined;
    const isLast = currentQ === totalQuestions - 1;
    const allAnswered = Object.keys(answers).length === totalQuestions;

    return (
      <div className="min-h-screen" style={{ background: 'var(--gradient-bg)' }}>
        <div className="max-w-2xl mx-auto px-4 pt-16 pb-28">
          <div className="mb-8">
            <Link href="/assessments" className="text-[#7a7062] text-sm hover:text-white transition-colors mb-4 inline-block">
              ← 返回列表
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">{assessment.name}</h1>
            <p className="text-xs text-[#7a7062]">{assessment.instructions}</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-xs text-[#7a7062] mb-2">
              <span>第 {currentQ + 1} / {totalQuestions} 题</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#ffffff]/08 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--geo-coral), var(--accent-purple))' }} />
            </div>
          </div>

          <div className="geo-card p-8 mb-6 animate-card-rise" key={q.id}>
            <div className="flex items-start gap-3 mb-6">
              <span className="text-sm font-bold text-[#7a7062] shrink-0 mt-0.5">Q{q.id}</span>
              <p className="text-white text-lg leading-relaxed">{q.text}</p>
            </div>
            <div className="space-y-3">
              {q.options.map((opt: any) => {
                const selected = answers[q.id] === opt.score;
                return (
                  <button
                    key={opt.score}
                    onClick={() => selectOption(q.id, opt.score)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                      selected
                        ? 'border-[var(--accent-purple)] bg-[var(--accent-purple)]/12 text-white'
                        : 'border-[#ffffff]/08 bg-[#ffffff]/03 text-[#B0B0C0] hover:border-[#ffffff]/15 hover:bg-[#ffffff]/06'
                    }`}
                  >
                    <span className="text-sm">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQ(c => Math.max(0, c - 1))}
              disabled={currentQ === 0}
              className="btn-geo-ghost text-sm disabled:opacity-30"
            >
              ← 上一题
            </button>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex gap-1.5 mr-4">
                {assessment.questions.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQ(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentQ ? 'bg-[var(--accent-purple)] w-4' :
                      answers[assessment.questions[idx].id] !== undefined ? 'bg-[var(--geo-coral)]/50' :
                      'bg-[#ffffff]/10'
                    }`}
                  />
                ))}
              </div>
              {isLast ? (
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="btn-geo px-6 py-2.5 text-sm disabled:opacity-40"
                >
                  {allAnswered ? '🪞 照见自己' : '请完成所有题目'}
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQ(c => Math.min(totalQuestions - 1, c + 1))}
                  disabled={!isAnswered}
                  className="btn-geo-ghost text-sm disabled:opacity-30"
                >
                  下一题 →
                </button>
              )}
            </div>
          </div>
          {error && <p className="text-center text-sm text-[#FF8A7A] mt-4">{error}</p>}
        </div>
      </div>
    );
  }

  if (phase === 'submitting') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gradient-bg)' }}>
        <div className="text-center">
          <div className="text-4xl mb-4 animate-glow">🔮</div>
          <p className="text-[#B0B0C0] mb-2">契约之镜正在映照...</p>
          <p className="text-xs text-[#7a7062]">AI 正在解读你的内心世界</p>
        </div>
      </div>
    );
  }

  if (phase === 'result' && result && assessment) {
    const li = result.level_info;
    return (
      <div className="min-h-screen" style={{ background: 'var(--gradient-bg)' }}>
        <div className="max-w-2xl mx-auto px-4 pt-12 pb-28">
          <div className="text-center mb-10 animate-card-rise">
            <div className="text-6xl mb-4">{assessment.icon}</div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              {assessment.name}
            </h1>
            <div className="my-8 flex justify-center">
              <div className="relative w-36 h-36 flex items-center justify-center"
                style={{ background: `radial-gradient(circle, ${li?.color || '#C4B5D4'}20 0%, transparent 70%)` }}>
                <div className="absolute inset-2 rounded-full border-2"
                  style={{ borderColor: li?.color || '#C4B5D4', opacity: 0.3 }} />
                <div className="absolute inset-4 rounded-full border"
                  style={{ borderColor: li?.color || '#C4B5D4', opacity: 0.15 }} />
                <div className="text-center z-10">
                  <div className="text-3xl font-bold" style={{ color: li?.color || '#C4B5D4' }}>
                    {result.standard_score}
                  </div>
                  <div className="text-xs text-[#7a7062] mt-1">标准分</div>
                </div>
              </div>
            </div>
            <div className="inline-block px-6 py-2 rounded-full text-lg font-bold"
              style={{
                backgroundColor: `${li?.color || '#C4B5D4'}18`,
                color: li?.color || '#C4B5D4',
                border: `1px solid ${li?.color || '#C4B5D4'}30`,
              }}>
              {result.level}
            </div>
            {li && <p className="text-sm text-[#B0B0C0] mt-3 max-w-md mx-auto">{li.description}</p>}
          </div>

          {/* Radar chart for multi-dimensional scales */}
          {assessment.category === 'personality' && (
            <div className="mb-8 animate-card-rise" style={{ display: 'flex', justifyContent: 'center', animationDelay: '0.1s' }}>
              <ResultRadar
                data={[
                  { label: '开放性', value: 78 },
                  { label: '尽责性', value: 62 },
                  { label: '外向性', value: 45 },
                  { label: '宜人性', value: 70 },
                  { label: '神经质', value: 82 },
                ]}
                color="#e8a820"
              />
            </div>
          )}
          {assessment.category === 'symptom' && (
            <div className="mb-8 animate-card-rise" style={{ display: 'flex', justifyContent: 'center', animationDelay: '0.1s' }}>
              <ResultRadar
                data={[
                  { label: '躯体化', value: 35 },
                  { label: '强迫', value: 55 },
                  { label: '人际敏感', value: 42 },
                  { label: '抑郁', value: 30 },
                  { label: '焦虑', value: 48 },
                  { label: '敌对', value: 25 },
                  { label: '恐怖', value: 20 },
                  { label: '偏执', value: 32 },
                  { label: '精神病性', value: 18 },
                ]}
                size={280}
                color="#4a90b8"
              />
            </div>
          )}

          {result.interpretation && (
            <div className="geo-card p-6 mb-6 animate-card-rise" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💭</span>
                <span className="text-sm font-bold text-white">白龙的低语</span>
              </div>
              <p className="text-sm text-[#B0B0C0] leading-relaxed">{result.interpretation}</p>
            </div>
          )}

          <div className="text-center mb-8 animate-card-rise" style={{ animationDelay: '0.25s' }}>
            <p className="text-xs text-[#505060] italic">{assessment.disclaimer}</p>
          </div>

          <div className="flex justify-center gap-4 animate-card-rise" style={{ animationDelay: '0.3s' }}>
            <Link href="/assessments" className="btn-geo-ghost text-sm">← 返回列表</Link>
            <button
              onClick={() => { setPhase('taking'); setAnswers({}); setCurrentQ(0); setResult(null); }}
              className="btn-geo text-sm px-6"
            >🔄 重新测试</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
