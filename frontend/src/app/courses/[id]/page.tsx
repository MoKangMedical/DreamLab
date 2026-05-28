import Link from 'next/link';
import ChapterList from '@/components/ChapterList';
import { getCourse, getProgress } from '@/lib/server-data';
import { DREAMLAB_CATEGORIES, DREAMLAB_COURSES } from '@/lib/dreamlab-courses';

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: '入门', core: '核心', intermediate: '进阶', advanced: '高级', master: '终极',
};

interface CourseChapter {
  title: string;
  description?: string;
  body?: string;
  content?: string;
  audio_intro?: string;
  order?: number;
}

export function generateStaticParams() {
  return DREAMLAB_COURSES.map((course) => ({ id: String(course.id) }));
}

interface PageProps { params: Promise<{ id: string }> }

export default async function CourseDetailPage({ params }: PageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);
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

  const cat = DREAMLAB_CATEGORIES[course.category] || { label: course.category, icon: '课', color: '#6b5b8a' };
  const chapters: CourseChapter[] = Array.isArray(course.content) ? course.content : [];
  const totalWords = chapters.reduce((sum, ch) => sum + (ch.body?.length || 0), 0);

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <div className="max-w-[1120px] mx-auto px-6 md:px-12 py-24 md:py-40">

        {/* Header */}
        <div className="mb-20 md:mb-28">
          <Link href="/courses" className="text-sm mb-10 inline-block" style={{ color: '#d4a853' }}>
            ← 返回课程列表
          </Link>
          <div className="flex items-start gap-7 md:gap-12">
            <span className="text-5xl md:text-6xl">{cat.icon}</span>
            <div>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="text-xs px-2 py-0.5" style={{ background: cat.color + '12', border: `1px solid ${cat.color}22`, color: cat.color, borderRadius: 2 }}>{cat.label}</span>
                <span className="text-xs px-2 py-0.5" style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa', borderRadius: 2 }}>
                  {DIFFICULTY_LABELS[course.difficulty] || course.difficulty}
                </span>
                <span className="text-xs px-2 py-0.5" style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#52525b', borderRadius: 2 }}>
                  {chapters.length}章 · {totalWords.toLocaleString()}字
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-8" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6', lineHeight: 1.18, letterSpacing: 0 }}>
                {course.title}
              </h1>
              <p className="text-base md:text-lg leading-10 max-w-4xl" style={{ color: '#85858e' }}>{course.description}</p>
            </div>
          </div>
        </div>

        <ChapterList chapters={chapters} courseId={id} progress={progress || []} />
      </div>
    </div>
  );
}
