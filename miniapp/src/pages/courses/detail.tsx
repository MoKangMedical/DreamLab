import { useEffect, useMemo, useState } from 'react'
import { ScrollView, Text, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { DREAMLAB_CATEGORIES, DreamLabCourse, loadDreamLabCourseDetail } from '../../data/mock-courses'
import './detail.scss'

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: '入门',
  core: '核心',
  intermediate: '进阶',
  advanced: '高级',
  master: '终极',
}

function storageKey(courseId: number) {
  return `dreamlab_course_progress_${courseId}`
}

function chapterContent(chapter: any, index: number) {
  const body = chapter.content || chapter.body || ''
  if (body) return body
  return `第${index + 1}章内容将在课程资料同步后展示。你可以先阅读课程简介，建立本主题的学习框架。`
}

export default function CourseDetailPage() {
  const router = useRouter()
  const courseId = Number(router.params.id || 1)
  const [course, setCourse] = useState<DreamLabCourse | null>(null)
  const [activeChapter, setActiveChapter] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadCourse = async () => {
    setLoading(true)
    setError('')
    try {
      const nextCourse = await loadDreamLabCourseDetail(courseId)
      setCourse(nextCourse)
      setActiveChapter(0)
    } catch (err) {
      setCourse(null)
      setError(err instanceof Error ? err.message : '课程内容加载失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    try {
      const stored = Taro.getStorageSync(storageKey(courseId))
      setCompleted(Array.isArray(stored) ? stored : [])
    } catch {
      setCompleted([])
    }
  }, [courseId])

  useEffect(() => {
    loadCourse()
  }, [courseId])

  const fallbackCategory = { label: '心理课程', icon: '课', color: '#d4a853' }
  const category = course ? (DREAMLAB_CATEGORIES[course.category] || { label: course.category, icon: '课', color: '#6b5b8a' }) : fallbackCategory
  const chapters = course?.chapters || []
  const progress = chapters.length > 0 ? Math.round((completed.length / chapters.length) * 100) : 0
  const totalWords = useMemo(() => {
    return chapters.reduce((sum, chapter, index) => sum + chapterContent(chapter, index).length, 0)
  }, [chapters])

  const toggleComplete = (index: number) => {
    const next = completed.includes(index)
      ? completed.filter((item) => item !== index)
      : [...completed, index]
    setCompleted(next)
    Taro.setStorageSync(storageKey(courseId), next)
  }

  if (loading) {
    return (
      <View className='page course-detail-page'>
        <View className='empty-course'>
          <Text className='empty-icon'>⌛</Text>
          <Text className='empty-text'>正在同步课程内容</Text>
        </View>
      </View>
    )
  }

  if (!course) {
    return (
      <View className='page course-detail-page'>
        <View className='empty-course'>
          <Text className='empty-icon'>📭</Text>
          <Text className='empty-text'>{error || '课程未找到'}</Text>
          <View className='gold-btn retry-btn' onClick={loadCourse}>
            <Text>重新加载</Text>
          </View>
          <View className='gold-btn' onClick={() => Taro.navigateBack()}>
            <Text>返回课程列表</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className='page course-detail-page'>
      <ScrollView scrollY className='course-detail-scroll'>
        <View className='course-detail-header'>
          <Text className='back-link' onClick={() => Taro.navigateBack()}>← 返回课程列表</Text>
          <View className='course-title-row'>
            <View className='course-symbol-large' style={{ color: category.color, borderColor: `${category.color}40` }}>
              <Text>{category.icon}</Text>
            </View>
            <View className='course-title-main'>
              <View className='course-tags'>
                <Text className='course-tag' style={{ color: category.color, borderColor: `${category.color}30` }}>{category.label}</Text>
                <Text className='course-tag'>{DIFFICULTY_LABELS[course.difficulty] || course.difficulty}</Text>
                <Text className='course-tag'>{chapters.length || 4}章</Text>
              </View>
              <Text className='course-detail-title'>{course.title}</Text>
            </View>
          </View>
          <Text className='course-detail-desc'>{course.description}</Text>
        </View>

        <View className='progress-card'>
          <View className='progress-meta'>
            <Text>学习进度</Text>
            <Text>{progress}%</Text>
          </View>
          <View className='progress-track'>
            <View className='progress-fill' style={{ width: `${progress}%`, background: category.color }} />
          </View>
          <Text className='progress-note'>已完成 {completed.length}/{chapters.length || 0} 章 · 约 {totalWords || 1200} 字</Text>
        </View>

        <View className='chapter-list'>
          {(chapters.length > 0 ? chapters : [{ title: '课程导读', content: course.description }]).map((chapter, index) => {
            const isActive = activeChapter === index
            const isDone = completed.includes(index)
            const content = chapterContent(chapter, index)

            return (
              <View key={`${chapter.title}-${index}`} className={`chapter-card ${isActive ? 'chapter-active' : ''}`}>
                <View className='chapter-head' onClick={() => setActiveChapter(isActive ? -1 : index)}>
                  <View className={`chapter-index ${isDone ? 'chapter-done' : ''}`} style={isDone ? { background: category.color } : {}}>
                    <Text>{isDone ? '✓' : index + 1}</Text>
                  </View>
                  <View className='chapter-title-block'>
                    <Text className='chapter-title'>{chapter.title}</Text>
                    <Text className='chapter-meta'>{content.length}字</Text>
                  </View>
                  <Text className='chapter-toggle'>{isActive ? '收起' : '展开'}</Text>
                </View>

                {isActive && (
                  <View className='chapter-body'>
                    <Text className='chapter-content'>{content}</Text>
                    <View
                      className={`complete-btn ${isDone ? 'complete-active' : ''}`}
                      onClick={() => toggleComplete(index)}
                    >
                      <Text>{isDone ? '已完成' : '标记完成'}</Text>
                    </View>
                  </View>
                )}
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
