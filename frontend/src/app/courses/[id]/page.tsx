import Link from 'next/link';
import ChapterList from '@/components/ChapterList';
import { getCourse, getProgress } from '@/lib/server-data';

const CATEGORIES: Record<string, { label: string; icon: string; color: string }> = {
  freud:     { label: '弗洛伊德', icon: '🛋️', color: '#c4554d' },
  jung:      { label: '荣格',     icon: '🔮', color: '#6b5b8a' },
  modern:    { label: '神经科学', icon: '🧠', color: '#5a7d9a' },
  eastern:   { label: '东方解梦', icon: '🏮', color: '#d4a853' },
  economics: { label: '康波周期', icon: '🌊', color: '#5a9a6f' },
  personality: { label: '人格心理', icon: '🪞', color: '#9a7ab8' },
  evolutionary: { label: '进化心理', icon: '🧬', color: '#8a9a5a' },
  developmental: { label: '发展心理', icon: '🌱', color: '#6aab8a' },
  social:    { label: '社会心理', icon: '👥', color: '#5a8aba' },
  behaviorism: { label: '行为主义', icon: '🐕', color: '#aa7a5a' },
  gestalt:   { label: '格式塔',   icon: '🔷', color: '#7a6aaa' },
  existential: { label: '存在主义', icon: '🌌', color: '#5a6a9a' },
  cbt:       { label: '认知行为', icon: '🔧', color: '#4a90b8' },
  positive:  { label: '积极心理', icon: '☀️', color: '#e8a850' },
  mindfulness: { label: '正念冥想', icon: '🧘', color: '#7a9aad' },
  attachment: { label: '依恋理论', icon: '💕', color: '#c47a8a' },
  humanistic: { label: '人本主义', icon: '🌻', color: '#d4a860' },
  abnormal:  { label: '异常心理', icon: '🩺', color: '#9a5a6a' },
  trauma:    { label: '创伤修复', icon: '🕊️', color: '#8a8a6a' },
  health:    { label: '健康心理', icon: '🍃', color: '#6a9a6a' },
  neuropsychology: { label: '神经心理', icon: '⚡', color: '#5a6aba' },
  emotion:   { label: '情绪心理', icon: '🌈', color: '#d4708a' },
  educational: { label: '教育心理', icon: '📚', color: '#4a8a9a' },
  child:     { label: '儿童心理', icon: '🧸', color: '#d4906a' },
  love:      { label: '爱情心理', icon: '💝', color: '#d4607a' },
  creativity: { label: '创造心理', icon: '🎨', color: '#aa7aba' },
  forensic:  { label: '犯罪心理', icon: '🔍', color: '#6a5a6a' },
  consumer:  { label: '消费心理', icon: '🛒', color: '#5a9a8a' },
  thanatology: { label: '死亡心理', icon: '🕯️', color: '#7a7a8a' },
  sports:    { label: '运动心理', icon: '🏃', color: '#4a8a6a' },
};

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: '入门', intermediate: '进阶', advanced: '高级',
};

export function generateStaticParams() {
  return Array.from({ length: 30 }, (_, i) => ({ id: String(i + 1) }));
}

interface PageProps { params: { id: string } }

export default async function CourseDetailPage({ params }: PageProps) {
  const id = Number(params.id);
  const [course, progress] = await Promise.all([getCourse(id), getProgress(id)]);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <span className="text-5xl block mb-4">📭</span>
        <p style={{ color: '#71717a' }} className="mb-4">课程未找到</p>
        <Link href="/courses" className="text-sm" style={{ color: '#d4a853' }}>← 返回课程列表</Link>
      </div>
    );
  }

  const cat = CATEGORIES[course.category] || { label: course.category, icon: '📖', color: '#6b5b8a' };
  const chapters = Array.isArray(course.content) ? course.content : [];
  const totalWords = chapters.reduce((sum: number, ch: any) => sum + (ch.body?.length || 0), 0);

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <Link href="/courses" className="text-sm mb-4 inline-block" style={{ color: '#d4a853' }}>
            ← 返回课程列表
          </Link>
          <div className="flex items-start gap-4">
            <span className="text-5xl">{cat.icon}</span>
            <div>
              <div className="flex gap-2 mb-2">
                <span className="text-xs px-2 py-0.5" style={{ background: cat.color + '12', border: `1px solid ${cat.color}22`, color: cat.color, borderRadius: 2 }}>{cat.label}</span>
                <span className="text-xs px-2 py-0.5" style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa', borderRadius: 2 }}>
                  {DIFFICULTY_LABELS[course.difficulty] || course.difficulty}
                </span>
                <span className="text-xs px-2 py-0.5" style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#52525b', borderRadius: 2 }}>
                  {chapters.length}章 · {totalWords.toLocaleString()}字
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>
                {course.title}
              </h1>
              <p style={{ color: '#71717a', fontSize: '0.875rem' }}>{course.description}</p>
            </div>
          </div>
        </div>

        <ChapterList chapters={chapters} courseId={id} progress={progress || []} />
      </div>
    </div>
  );
}
