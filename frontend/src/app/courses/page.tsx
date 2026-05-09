import Link from 'next/link';
import PageAtmosphere from '@/components/PageAtmosphere';
import { getCourses } from '@/lib/api';
import { DREAMLAB_CATEGORIES, DREAMLAB_PHASES } from '@/lib/dreamlab-courses';

const DIFFICULTY_MAP: Record<string, { label: string; color: string }> = {
  beginner: { label: '入门', color: '#a1a1aa' },
  core: { label: '核心', color: '#d4a853' },
  intermediate: { label: '进阶', color: '#d4a853' },
  advanced: { label: '高级', color: '#c4554d' },
  master: { label: '终极', color: '#f5d98a' },
};

export default async function CoursesPage() {
  const courses = await getCourses();
  const totalChapters = courses.reduce((sum: number, course: any) => sum + (course.chapter_count || course.chapters?.length || 0), 0);
  const totalWords = courses.reduce((sum: number, course: any) => (
    sum + (course.chapters || []).reduce((chapterSum: number, chapter: any) => chapterSum + (chapter.body?.length || 0), 0)
  ), 0);

  return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh' }}>
      <PageAtmosphere />
      <div className="relative z-10">
        <section className="px-5 md:px-6 pt-16 md:pt-24 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <h1
                className="font-bold mb-5"
                style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'clamp(38px, 7vw, 76px)', lineHeight: 1.08, color: '#f4f4f6' }}
              >
                DreamLab 课程体系
              </h1>
              <p className="text-base md:text-lg leading-8 max-w-2xl" style={{ color: '#a1a1aa' }}>
                100 门课程、7 个学院，从梦境解析到 AI 心理学，从临床工具到生活应用，
                每门课围绕案例、理论和反思展开，形成完整的 DreamLab 心理学学习路径。
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-10">
              {[
                { value: String(courses.length), label: '系统课程' },
                { value: String(DREAMLAB_PHASES.length), label: '学院分类' },
                { value: String(totalChapters), label: '课程章节' },
                { value: `${Math.round(totalWords / 10000)}万`, label: '正文规模' },
              ].map((item) => (
                <div key={item.label} className="p-5" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                  <div className="text-3xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#d4a853' }}>{item.value}</div>
                  <div className="text-xs mt-1" style={{ color: '#71717a' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 md:px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-7">
              <div style={{ width: 28, height: 1, background: 'rgba(212,168,83,0.22)' }} />
              <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>
                课程地图
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DREAMLAB_PHASES.map((phase) => {
                const phaseCourses = courses.filter((course: any) => course.phaseKey === phase.key);
                return (
                  <div key={phase.key} className="p-5 md:p-6" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 flex items-center justify-center text-sm font-bold shrink-0"
                        style={{ color: '#0a0a0c', background: phase.color, borderRadius: 8 }}
                      >
                        {phase.icon}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold mb-1" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{phase.title}</h2>
                        <p className="text-xs leading-6" style={{ color: '#71717a' }}>{phase.subtitle}</p>
                        <div className="mt-3 text-xs" style={{ color: phase.color }}>{phaseCourses.length} 门课程</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 md:px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            {DREAMLAB_PHASES.map((phase) => {
              const phaseCourses = courses.filter((course: any) => course.phaseKey === phase.key);
              return (
                <div key={phase.key} className="mb-14">
                  <div className="flex items-end justify-between gap-4 mb-4">
                    <div>
                      <div className="text-xs mb-2" style={{ color: phase.color }}>Phase {phase.index}</div>
                      <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>
                        {phase.title}
                      </h2>
                    </div>
                    <div className="text-xs shrink-0" style={{ color: '#52525b' }}>
                      {phase.courseCount} 门课
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {phaseCourses.map((course: any) => {
                      const category = DREAMLAB_CATEGORIES[course.category] || { label: course.category, icon: '课', color: phase.color };
                      const difficulty = DIFFICULTY_MAP[course.difficulty] || DIFFICULTY_MAP.beginner;
                      return (
                        <Link
                          key={course.id}
                          href={`/courses/${course.id}`}
                          className="group block p-5 transition-all duration-300 hover:translate-y-[-2px]"
                          style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <div
                              className="w-10 h-10 flex items-center justify-center text-sm font-bold shrink-0"
                              style={{ border: `1px solid ${category.color}55`, color: category.color, borderRadius: 8, background: `${category.color}12` }}
                            >
                              {course.id}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-base font-bold leading-6 group-hover:text-[#f4f4f6]" style={{ fontFamily: "'Noto Serif SC', serif", color: '#d7d7dc' }}>
                                {course.title}
                              </h3>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                <span className="text-[11px] px-2 py-0.5" style={{ color: category.color, border: `1px solid ${category.color}33`, borderRadius: 999 }}>{category.label}</span>
                                <span className="text-[11px] px-2 py-0.5" style={{ color: difficulty.color, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999 }}>{difficulty.label}</span>
                                <span className="text-[11px] px-2 py-0.5" style={{ color: '#71717a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999 }}>{course.chapter_count} 章</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs leading-6 mb-4" style={{ color: '#85858e' }}>{course.description}</p>
                          <div className="text-xs leading-5" style={{ color: '#d4a853' }}>
                            产出：{course.outcome}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
