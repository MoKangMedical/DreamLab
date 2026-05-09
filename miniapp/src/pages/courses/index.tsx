import { useEffect, useMemo, useState } from 'react'
import { ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { DREAMLAB_CATEGORIES, DREAMLAB_PHASES, DreamLabCourse, loadDreamLabCourseIndex } from '../../data/mock-courses'
import './index.scss'

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: '入门',
  core: '核心',
  intermediate: '进阶',
  advanced: '高级',
  master: '终极',
}

export default function CoursesPage() {
  const [filter, setFilter] = useState('all')
  const [courses, setCourses] = useState<DreamLabCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadCourses = async () => {
    setLoading(true)
    setError('')
    try {
      const nextCourses = await loadDreamLabCourseIndex()
      setCourses(nextCourses)
    } catch (err) {
      setError(err instanceof Error ? err.message : '课程列表加载失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])

  const filteredCourses = useMemo(() => {
    if (filter === 'all') return courses
    return courses.filter((course) => course.phaseKey === filter)
  }, [courses, filter])

  return (
    <View className='page courses-page'>
      <ScrollView scrollY className='courses-scroll'>
        <View className='courses-hero'>
          <Text className='courses-kicker'>DREAMLAB ACADEMY</Text>
          <Text className='courses-title'>心理课程体系</Text>
          <Text className='courses-desc'>
            100门课程，覆盖梦境解析、心理学理论、疗愈工具、心智健康、生活应用与前沿交叉。
          </Text>
        </View>

        <ScrollView scrollX className='course-filter-scroll'>
          <View className='course-filters'>
            <View
              className={`filter-pill ${filter === 'all' ? 'filter-active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <Text>全部</Text>
            </View>
            {DREAMLAB_PHASES.map((item) => (
              <View
                key={item.key}
                className={`filter-pill ${filter === item.key ? 'filter-active' : ''}`}
                onClick={() => setFilter(item.key)}
              >
                <Text>{item.title}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View className='path-card'>
          <Text className='path-title'>学习路径</Text>
          <Text className='path-desc'>梦境解析 → 理论基础 → 心理疗法 → 心智健康 → 神经认知 → 生活应用 → 前沿交叉</Text>
        </View>

        <View className='course-list'>
          {loading && (
            <View className='course-state-card'>
              <Text className='course-state-title'>正在同步课程体系</Text>
              <Text className='course-state-desc'>从 DreamLab GitHub Pages 拉取 100 门心理课程...</Text>
            </View>
          )}

          {!loading && error && (
            <View className='course-state-card'>
              <Text className='course-state-title'>课程暂时无法加载</Text>
              <Text className='course-state-desc'>{error}</Text>
              <View className='course-retry-btn' onClick={loadCourses}>
                <Text>重新加载</Text>
              </View>
            </View>
          )}

          {!loading && !error && filteredCourses.length === 0 && (
            <View className='course-state-card'>
              <Text className='course-state-title'>暂无课程</Text>
              <Text className='course-state-desc'>切换学院分类或稍后再试。</Text>
            </View>
          )}

          {!loading && !error && filteredCourses.map((course) => {
            const category = DREAMLAB_CATEGORIES[course.category] || { label: course.category, icon: '课', color: '#6b5b8a' }
            const chapterCount = course.chapter_count || course.chapters?.length || 0
            return (
              <View
                key={course.id}
                className='course-card'
                onClick={() => Taro.navigateTo({ url: `/pages/courses/detail?id=${course.id}` })}
              >
                <View className='course-card-top'>
                  <View className='course-symbol' style={{ color: category.color, borderColor: `${category.color}40` }}>
                    <Text>{course.id}</Text>
                  </View>
                  <View className='course-main'>
                    <Text className='course-title'>{course.title}</Text>
                    <View className='course-tags'>
                      <Text className='course-tag' style={{ color: category.color, borderColor: `${category.color}30` }}>
                        {category.label}
                      </Text>
                      <Text className='course-tag'>{DIFFICULTY_LABELS[course.difficulty] || course.difficulty}</Text>
                      <Text className='course-tag'>{chapterCount || 4}章</Text>
                    </View>
                  </View>
                  <Text className='chapter-count'>{chapterCount || 4}章</Text>
                </View>
                <Text className='course-desc'>{course.description}</Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
