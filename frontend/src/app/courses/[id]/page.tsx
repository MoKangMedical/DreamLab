import Link from 'next/link';
import ChapterList from '@/components/ChapterList';
import { getCourse, getProgress } from '@/lib/server-data';

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

const CATEGORIES: Record<string, { label: string; icon: string; badge: string }> = {
  freud: { label: '弗洛伊德', icon: '🛋️', badge: 'badge-freud' },
  jung: { label: '荣格', icon: '🔮', badge: 'badge-jung' },
  modern: { label: '现代科学', icon: '🧠', badge: 'badge-modern' },
  eastern: { label: '东方解梦', icon: '🏮', badge: 'badge-eastern' },
};

interface PageProps {
  params: { id: string };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const id = Number(params.id);
  const [course, progress] = await Promise.all([
    getCourse(id),
    getProgress(id),
  ]);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <span className="text-5xl block mb-4">📭</span>
        <p className="text-[#B0B0C0] mb-4">课程未找到</p>
        <Link href="/courses" className="btn-primary">返回课程列表</Link>
      </div>
    );
  }

  const cat = CATEGORIES[course.category] || { label: course.category, icon: '📖', badge: '' };
  const chapters = Array.isArray(course.content) ? course.content : [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <Link href="/courses" className="text-sm text-[#B0B0C0] hover:text-white mb-4 inline-block">
          ← 返回课程列表
        </Link>
        <div className="flex items-start gap-4">
          <span className="text-5xl">{cat.icon}</span>
          <div>
            <div className="flex gap-2 mb-2">
              <span className={`badge ${cat.badge}`}>{cat.label}</span>
              <span className="badge border border-[#B0B0C0]/20 text-[#B0B0C0]">{course.difficulty}</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
            <p className="text-[#B0B0C0]">{course.description}</p>
          </div>
        </div>
      </div>

      <ChapterList chapters={chapters} courseId={id} progress={progress || []} />
    </div>
  );
}
