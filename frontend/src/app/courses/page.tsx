import Link from 'next/link';
import { getCourses } from '@/lib/api';

const CATEGORIES: Record<string, { label: string; icon: string; badge: string; color: string }> = {
  freud: { label: '弗洛伊德', icon: '🛋️', badge: 'badge-coral', color: 'var(--geo-coral)' },
  jung: { label: '荣格', icon: '🔮', badge: 'badge-lavender', color: 'var(--geo-lavender)' },
  modern: { label: '现代科学', icon: '🧠', badge: 'badge-mint', color: 'var(--geo-mint)' },
  eastern: { label: '东方解梦', icon: '🏮', badge: 'badge-sand', color: 'var(--geo-sand)' },
};

const DIFFICULTY_MAP: Record<string, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-in" style={{ background: 'var(--gradient-bg)' }}>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-4 text-xs tracking-[0.2em] text-[#F0C060]/70">
          <span className="w-5 h-px bg-[#ffffff]/10" />
          <span>梦学の殿堂</span>
          <span className="w-5 h-px bg-[#ffffff]/10" />
        </div>
        <h1 className="text-4xl font-bold mb-3">
          <span className="text-geo-gradient">系统课程</span>
        </h1>
        <p className="text-[#B0B0C0]">从理论到实践，系统学习梦的解析</p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center text-[#B0B0C0] py-20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(232,165,152,0.12), rgba(155,126,216,0.12))', border: '1px solid rgba(232,165,152,0.15)' }}>
            ◈
          </div>
          <p>暂无课程数据，请先启动后端服务并运行 seed 脚本</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course: any, idx: number) => {
            const cat = CATEGORIES[course.category] || { label: course.category, icon: '📖', badge: '', color: 'var(--geo-lavender)' };
            return (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="geo-card p-6 group cursor-pointer animate-card-rise"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* 悬浮光晕 */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${cat.color}12 0%, transparent 70%)`,
                  }} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <div className="flex gap-2">
                      <span className={`badge ${cat.badge}`}>{cat.label}</span>
                      <span className="badge border border-[#ffffff]/10 text-[#707090]">
                        {DIFFICULTY_MAP[course.difficulty] || course.difficulty}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 transition-colors duration-300"
                    style={{ color: 'var(--text-white)' }}>
                    {course.title}
                  </h3>
                  <p className="text-sm text-[#B0B0C0] leading-relaxed">{course.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
