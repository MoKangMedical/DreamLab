'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const CATEGORIES: Record<string, { name: string; desc: string; icon: string; color: string }> = {
  anxiety: { name: '焦虑评估', desc: '了解你的紧张与不安从何而来', icon: '🌊', color: '#c4554d' },
  depression: { name: '抑郁评估', desc: '正视情绪的低谷，是疗愈的第一步', icon: '🌧️', color: '#6b5b8a' },
  personality: { name: '人格探索', desc: '没有好坏，只有独一无二的你', icon: '🎭', color: '#d4a853' },
  sleep: { name: '睡眠健康', desc: '每一个梦境，都需要安稳的港湾', icon: '🌙', color: '#5a7d9a' },
  resilience: { name: '心理韧性', desc: '像竹子一样，被压弯却不断裂', icon: '🌱', color: '#3b8b7a' },
  symptom: { name: '综合筛查', desc: '360°扫描，看清心灵的全貌', icon: '📋', color: '#d4a853' },
};

const ASSESSMENTS = [
  {
    id: 1, name: 'SAS 焦虑自评量表', category: 'anxiety', questions: 20, time: '3-5 分钟',
    icon: '🌊',
    intro: '焦虑自评量表（Self-Rating Anxiety Scale）由美国杜克大学 Zung 教授于 1971 年编制，是全球使用最广泛的焦虑筛查工具之一。量表从躯体症状（心悸、发抖）到心理体验（紧张、恐慌），系统评估过去一周的焦虑水平。',
    suitable: '感到持续紧张、心慌、入睡困难的人群',
    scoring: '20题 × 4级评分 → 原始分 × 1.25 = 标准分。50-59 轻度 · 60-69 中度 · ≥70 重度',
    source: 'Zung WWK. A rating instrument for anxiety disorders. Psychosomatics. 1971.',
  },
  {
    id: 2, name: 'SDS 抑郁自评量表', category: 'depression', questions: 20, time: '3-5 分钟',
    icon: '🌧️',
    intro: '抑郁自评量表（Self-Rating Depression Scale）由 Zung 教授于 1965 年编制，覆盖情感、躯体、精神运动与心理四大症状维度。量表不仅评估"不开心"，更系统测量睡眠、食欲、精力等躯体信号。',
    suitable: '情绪持续低落、失去兴趣、精力下降的人群',
    scoring: '20题 × 4级评分 → 抑郁指数 = 总分/80。0.50-0.59 轻度 · 0.60-0.69 中度 · ≥0.70 重度',
    source: 'Zung WWK. A self-rating depression scale. Arch Gen Psychiatry. 1965.',
  },
  {
    id: 3, name: '大五人格简版 (BFI-20)', category: 'personality', questions: 20, time: '2-3 分钟',
    icon: '🎭',
    intro: '大五人格模型（Big Five）是当代人格心理学最广泛接受的框架。五个维度——开放性(O)、尽责性(C)、外向性(E)、宜人性(A)、神经质(N)——构成了你的人格画像。BFI-20 简版仅需 20 题即完成评估。',
    suitable: '想了解自己性格特质、职业倾向、人际风格的任何人',
    scoring: '5个维度分别计分。分数反映的是倾向，不是好坏——世界上没有"错误"的人格。',
    source: 'John OP, Srivastava S. The Big Five trait taxonomy. Handbook of Personality. 1999.',
  },
  {
    id: 4, name: '匹兹堡睡眠质量指数', category: 'sleep', questions: 7, time: '1-2 分钟',
    icon: '🌙',
    intro: '匹兹堡睡眠质量指数（PSQI）由匹兹堡大学 Buysse 博士团队于 1989 年开发，是评估睡眠质量的国际金标准。本简版聚焦7个核心指标：时长、入睡时间、中断频率、主观质量、药物依赖、日间功能和精力水平。',
    suitable: '入睡困难、早醒、睡眠浅、白天嗜睡的人群',
    scoring: '7题累计评分 0-21。0-7 良好 · 8-14 一般 · 15-21 需关注',
    source: 'Buysse DJ, et al. The Pittsburgh Sleep Quality Index. Psychiatry Res. 1989.',
  },
  {
    id: 5, name: '心理弹性量表 (CD-RISC)', category: 'resilience', questions: 10, time: '2-3 分钟',
    icon: '🌱',
    intro: '心理弹性（Resilience）不是天生的——它是可以被锻炼的"心理肌肉"。Connor-Davidson 心理弹性量表由杜克大学团队研发，测量你面对逆境时恢复的能力。研究表明，高心理弹性与更好的身心健康、职业成就密切相关。',
    suitable: '面临生活转变、压力情境、或想了解自己抗压能力的任何人',
    scoring: '10题 × 4级评分。10-20 待提升 · 21-30 中等 · 31-40 良好',
    source: 'Connor KM, Davidson JRT. Development of a new resilience scale. Depress Anxiety. 2003.',
  },
  {
    id: 6, name: 'SCL-90 症状自评简版', category: 'symptom', questions: 36, time: '5-8 分钟',
    icon: '📋',
    intro: 'SCL-90（Symptom Checklist-90）由 Derogatis 博士开发，是精神科和心理咨询中最常用的多维症状筛查工具。本简版覆盖9个维度：躯体化、强迫、人际敏感、抑郁、焦虑、敌对、恐怖、偏执、精神病性，提供全方位的心理健康快照。',
    suitable: '想全面了解心理健康状况，或感到多方面不适但不确定原因的人群',
    scoring: '36题累计评分。36-71 健康 · 72-107 轻度异常 · 108-144 中度异常',
    source: 'Derogatis LR. SCL-90-R: Administration, Scoring and Procedures Manual. 1994.',
  },
];

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function AssessmentCard({ a, index }: { a: typeof ASSESSMENTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const cat = CATEGORIES[a.category];

  return (
    <div ref={ref} className={`transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{ transitionDelay: `${index * 0.08}s` }}>
      <div className="p-8 md:p-10 mb-2" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
        {/* 头部 */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{a.icon}</span>
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>
                {a.name}
              </h3>
              <div className="flex items-center gap-3 text-xs" style={{ color: '#71717a' }}>
                <span>{a.questions} 题</span>
                <span>·</span>
                <span>{a.time}</span>
                <span>·</span>
                <span style={{ color: cat.color }}>{cat.name}</span>
              </div>
            </div>
          </div>
          <Link href={`/assessments/${a.id}`}
            className="shrink-0 transition-all duration-300 hover:scale-105"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '12px 28px', background: cat.color, color: '#0a0a0c',
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13,
              borderRadius: 2, letterSpacing: '0.03em',
            }}>
            开始测评 →
          </Link>
        </div>

        {/* 量表介绍 */}
        <p className="text-sm leading-relaxed mb-6" style={{ color: '#a1a1aa', lineHeight: 2.0 }}>
          {a.intro}
        </p>

        {/* 详细信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div style={{ background: '#0a0a0c', padding: '14px 16px', borderRadius: 2 }}>
            <div className="text-xs mb-1" style={{ color: '#52525b' }}>适合人群</div>
            <div className="text-xs leading-relaxed" style={{ color: '#a1a1aa' }}>{a.suitable}</div>
          </div>
          <div style={{ background: '#0a0a0c', padding: '14px 16px', borderRadius: 2 }}>
            <div className="text-xs mb-1" style={{ color: '#52525b' }}>评分方式</div>
            <div className="text-xs leading-relaxed" style={{ color: '#a1a1aa' }}>{a.scoring}</div>
          </div>
          <div style={{ background: '#0a0a0c', padding: '14px 16px', borderRadius: 2 }}>
            <div className="text-xs mb-1" style={{ color: '#52525b' }}>学术来源</div>
            <div className="text-xs leading-relaxed" style={{ color: '#71717a', fontStyle: 'italic' }}>{a.source}</div>
          </div>
        </div>

        {/* 免责声明 */}
        <p className="text-xs" style={{ color: '#52525b' }}>
          ⚠️ 本测评仅为心理健康参考工具，不能替代专业诊断。如有需要请咨询心理医生。
        </p>
      </div>
    </div>
  );
}

export default function AssessmentsPage() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative pt-14 md:pt-20 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-5xl md:text-7xl mb-6">🪞</div>
            <h1 className="font-bold mb-4" style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 'clamp(36px, 6vw, 64px)',
              color: '#f4f4f6',
              lineHeight: 1.1,
            }}>
              汤婆婆の契约之镜
            </h1>
            <p className="text-lg mb-2" style={{ color: '#a1a1aa' }}>
              六把钥匙，开启内心深处的六扇门
            </p>
            <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: '#71717a' }}>
              所有量表均基于国际标准心理学工具，经过数十年临床验证。
              AI 深度解读帮助你将数据转化为对自己的理解。
            </p>
          </div>
        </div>
      </div>

      {/* 量表列表 */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 pb-32">
        <div className="space-y-3">
          {ASSESSMENTS.map((a, i) => (
            <AssessmentCard key={a.id} a={a} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
