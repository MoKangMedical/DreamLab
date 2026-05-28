import Link from 'next/link';
import PageAtmosphere from '@/components/PageAtmosphere';
import { getCourses } from '@/lib/api';
import { DREAMLAB_CATEGORIES, DREAMLAB_PHASES, type DreamLabCourse } from '@/lib/dreamlab-courses';

const DIFFICULTY_MAP: Record<string, { label: string; color: string }> = {
  beginner: { label: '入门', color: '#a1a1aa' },
  core: { label: '核心', color: '#d4a853' },
  intermediate: { label: '进阶', color: '#d4a853' },
  advanced: { label: '高级', color: '#c4554d' },
  master: { label: '终极', color: '#f5d98a' },
};

export default async function CoursesPage() {
  const courses = (await getCourses()) as DreamLabCourse[];
  const totalChapters = courses.reduce((sum, course) => sum + (course.chapter_count || course.chapters?.length || 0), 0);
  const totalWords = courses.reduce((sum, course) => (
    sum + (course.chapters || []).reduce((chapterSum, chapter) => chapterSum + (chapter.body?.length || 0), 0)
  ), 0);

  return (
    <div className="academy-shell">
      <PageAtmosphere />
      <div className="relative z-10">
        <section className="academy-hero" style={{ minHeight: 820 }}>
          <div className="academy-container relative z-10">
            <div className="academy-badge">DreamLab 核心课程 · 7 大学院路径</div>
            <h1 className="academy-hero-title">
              从梦境到行动，<br className="md:hidden" />
              <span className="gold">一百节课</span><br className="md:hidden" />
              建立心理学坐标
            </h1>
            <p className="academy-hero-copy">
              按照学院与阶段组织课程，每门课保留案例、理论、章节、反思产出和音频入口，形成可持续学习的心理成长路线。
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-20">
              {[
                { value: String(courses.length), label: '系统课程' },
                { value: String(DREAMLAB_PHASES.length), label: '学院分类' },
                { value: String(totalChapters), label: '课程章节' },
                { value: `${Math.round(totalWords / 10000)}万`, label: '正文规模' },
              ].map((item) => (
                <div key={item.label} className="premium-panel p-6">
                  <div className="text-3xl font-bold leading-none whitespace-nowrap" style={{ fontFamily: "'Noto Serif SC', serif", color: '#e2b64f' }}>{item.value}</div>
                  <div className="text-xs mt-1" style={{ color: '#71717a' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="academy-section academy-section-muted">
          <div className="academy-container-wide">
            <div className="academy-section-header">
              <div className="academy-kicker">课程地图</div>
              <h2 className="academy-section-title">先看学院结构，再进入单课学习</h2>
              <p className="academy-section-copy">
                课程不再用普通卡片堆叠，而是采用阶段化目录：先理解所在学院，再逐课推进。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-10">
              {DREAMLAB_PHASES.map((phase) => {
                const phaseCourses = courses.filter((course) => course.phaseKey === phase.key);
                return (
                  <div key={phase.key} className="premium-panel p-8 md:p-10">
                    <div className="flex items-start gap-7">
                      <div
                        className="w-12 h-12 flex items-center justify-center text-sm font-bold shrink-0"
                        style={{ color: '#0a0a0c', background: phase.color, borderRadius: 8 }}
                      >
                        {phase.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Noto Serif SC', serif", color: '#f4f4f6' }}>{phase.title}</h2>
                        <p className="text-sm leading-8" style={{ color: '#71717a' }}>{phase.subtitle}</p>
                        <div className="mt-5 text-xs" style={{ color: phase.color }}>{phaseCourses.length} 门课程</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="academy-section">
          <div className="academy-container">
            {DREAMLAB_PHASES.map((phase) => {
              const phaseCourses = courses.filter((course) => course.phaseKey === phase.key);
              return (
                <div key={phase.key} className="mb-28 md:mb-36">
                  <div className="flex items-end justify-between gap-10 mb-10">
                    <div>
                      <div className="academy-kicker" style={{ color: phase.color }}>Phase {phase.index}</div>
                      <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif", color: '#fafafa', lineHeight: 1.18 }}>
                        {phase.title}
                      </h2>
                    </div>
                    <div className="text-xs shrink-0" style={{ color: '#52525b' }}>
                      {phase.courseCount} 门课
                    </div>
                  </div>

                  <div className="academy-course-list">
                    {phaseCourses.map((course) => {
                      const category = DREAMLAB_CATEGORIES[course.category] || { label: course.category, icon: '课', color: phase.color };
                      const difficulty = DIFFICULTY_MAP[course.difficulty] || DIFFICULTY_MAP.beginner;
                      return (
                        <Link
                          key={course.id}
                          href={`/courses/${course.id}`}
                          className="academy-course-card"
                        >
                          <div className="academy-course-row">
                            <div className="academy-course-index">
                              {course.id}
                            </div>
                            <div>
                              <h3 className="academy-course-title">
                                {course.title}
                              </h3>
                              <p className="academy-course-desc">{course.description}</p>
                              <div className="academy-course-tags">
                                <span style={{ color: category.color }}>{category.label}</span>
                                <span>{difficulty.label}</span>
                                <span>⏱ {course.minutes || Math.max(20, Math.round((course.chapter_count || 4) * 9))}分钟</span>
                                <span>含 {course.chapter_count} 章练习</span>
                              </div>
                            </div>
                            <div className="academy-course-arrow">›</div>
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
