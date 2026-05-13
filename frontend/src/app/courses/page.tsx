import Link from 'next/link';
import PageAtmosphere from '@/components/PageAtmosphere';
import { getCourses } from '@/lib/api';
import { DREAMLAB_CATEGORIES, DREAMLAB_PHASES } from '@/lib/dreamlab-courses';
import BathhouseBrandScene from '@/components/BathhouseBrandScene';

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
        <section className="px-5 md:px-8 pt-20 md:pt-32 pb-20 md:pb-24">
          <div className="max-w-[1180px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[0.86fr_0.72fr] gap-12 xl:gap-18 items-center">
              <div className="max-w-3xl">
                <h1
                  className="font-bold mb-7"
                  style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 'var(--hero-lg)', lineHeight: 1.08, color: '#f4f4f6', letterSpacing: 0 }}
                >
                  DreamLab 课程体系
                </h1>
                <p className="text-base md:text-lg leading-9 max-w-3xl" style={{ color: '#a1a1aa' }}>
                  100 门课程、7 个学院，从梦境解析到 AI 心理学，从临床工具到生活应用，
                  每门课围绕案例、理论和反思展开，形成完整的 DreamLab 心理学学习路径。
                </p>
              </div>
              <div className="hidden lg:block">
                <BathhouseBrandScene />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { value: String(courses.length), label: '系统课程' },
                { value: String(DREAMLAB_PHASES.length), label: '学院分类' },
                { value: String(totalChapters), label: '课程章节' },
                { value: `${Math.round(totalWords / 10000)}万`, label: '正文规模' },
              ].map((item) => (
                <div key={item.label} className="premium-panel p-6">
                  <div className="text-3xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#d4a853' }}>{item.value}</div>
                  <div className="text-xs mt-1" style={{ color: '#71717a' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 md:px-8 pb-24">
          <div className="max-w-[1180px] mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div style={{ width: 34, height: 1, background: 'rgba(212,168,83,0.22)' }} />
              <span className="text-xs tracking-[0.18em] uppercase" style={{ color: 'rgba(212,168,83,0.62)' }}>
                课程地图
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {DREAMLAB_PHASES.map((phase) => {
                const phaseCourses = courses.filter((course: any) => course.phaseKey === phase.key);
                return (
                  <div key={phase.key} className="premium-panel p-6 md:p-7">
                    <div className="flex items-start gap-5">
                      <div
                        className="w-12 h-12 flex items-center justify-center text-sm font-bold shrink-0"
                        style={{ color: '#0a0a0c', background: phase.color, borderRadius: 8 }}
                      >
                        {phase.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{phase.title}</h2>
                        <p className="text-sm leading-7" style={{ color: '#71717a' }}>{phase.subtitle}</p>
                        <div className="mt-4 text-xs" style={{ color: phase.color }}>{phaseCourses.length} 门课程</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 md:px-8 pb-32 md:pb-40">
          <div className="max-w-[1180px] mx-auto">
            {DREAMLAB_PHASES.map((phase) => {
              const phaseCourses = courses.filter((course: any) => course.phaseKey === phase.key);
              return (
                <div key={phase.key} className="mb-20 md:mb-24">
                  <div className="flex items-end justify-between gap-6 mb-7">
                    <div>
                      <div className="text-xs mb-3" style={{ color: phase.color }}>Phase {phase.index}</div>
                      <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6', lineHeight: 1.18 }}>
                        {phase.title}
                      </h2>
                    </div>
                    <div className="text-xs shrink-0" style={{ color: '#52525b' }}>
                      {phase.courseCount} 门课
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {phaseCourses.map((course: any) => {
                      const category = DREAMLAB_CATEGORIES[course.category] || { label: course.category, icon: '课', color: phase.color };
                      const difficulty = DIFFICULTY_MAP[course.difficulty] || DIFFICULTY_MAP.beginner;
                      return (
                        <Link
                          key={course.id}
                          href={`/courses/${course.id}`}
                          className="premium-panel group block p-6 md:p-7 transition-all duration-300 hover:translate-y-[-2px]"
                        >
                          <div className="flex items-start gap-4 mb-5">
                            <div
                              className="w-11 h-11 flex items-center justify-center text-sm font-bold shrink-0"
                              style={{ border: `1px solid ${category.color}55`, color: category.color, borderRadius: 8, background: `${category.color}12` }}
                            >
                              {course.id}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-lg font-bold leading-7 group-hover:text-[#f4f4f6]" style={{ fontFamily: "'Noto Serif SC', serif", color: '#d7d7dc' }}>
                                {course.title}
                              </h3>
                              <div className="flex flex-wrap gap-2 mt-3">
                                <span className="text-[11px] px-2 py-0.5" style={{ color: category.color, border: `1px solid ${category.color}33`, borderRadius: 999 }}>{category.label}</span>
                                <span className="text-[11px] px-2 py-0.5" style={{ color: difficulty.color, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999 }}>{difficulty.label}</span>
                                <span className="text-[11px] px-2 py-0.5" style={{ color: '#71717a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999 }}>{course.chapter_count} 章</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm leading-7 mb-5" style={{ color: '#85858e' }}>{course.description}</p>
                          <div className="text-xs leading-6" style={{ color: '#d4a853' }}>
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
