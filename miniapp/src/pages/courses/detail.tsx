import { useEffect, useMemo, useState } from 'react'
import { ScrollView, Text, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { MOCK_COURSES } from '../../data/mock-courses'
import './detail.scss'

const CATEGORIES: Record<string, { label: string; icon: string; color: string }> = {
  freud: { label: '弗洛伊德', icon: '🛋', color: '#c4554d' },
  jung: { label: '荣格', icon: '◇', color: '#6b5b8a' },
  modern: { label: '神经科学', icon: '◎', color: '#5a7d9a' },
  eastern: { label: '东方解梦', icon: '灯', color: '#d4a853' },
  economics: { label: '康波周期', icon: '≈', color: '#5a9a6f' },
  personality: { label: '人格心理', icon: '镜', color: '#9a7ab8' },
  evolutionary: { label: '进化心理', icon: '∴', color: '#8a9a5a' },
  developmental: { label: '发展心理', icon: '芽', color: '#6aab8a' },
  social: { label: '社会心理', icon: '群', color: '#5a8aba' },
  behaviorism: { label: '行为主义', icon: '行', color: '#aa7a5a' },
  gestalt: { label: '格式塔', icon: '◆', color: '#7a6aaa' },
  existential: { label: '存在主义', icon: '星', color: '#5a6a9a' },
  cbt: { label: '认知行为', icon: '器', color: '#4a90b8' },
  positive: { label: '积极心理', icon: '日', color: '#e8a850' },
  mindfulness: { label: '正念冥想', icon: '息', color: '#7a9aad' },
  attachment: { label: '依恋理论', icon: '心', color: '#c47a8a' },
  humanistic: { label: '人本主义', icon: '花', color: '#d4a860' },
  abnormal: { label: '异常心理', icon: '医', color: '#9a5a6a' },
  trauma: { label: '创伤修复', icon: '羽', color: '#8a8a6a' },
  health: { label: '健康心理', icon: '叶', color: '#6a9a6a' },
  neuropsychology: { label: '神经心理', icon: '电', color: '#5a6aba' },
  emotion: { label: '情绪心理', icon: '彩', color: '#d4708a' },
  educational: { label: '教育心理', icon: '书', color: '#4a8a9a' },
  child: { label: '儿童心理', icon: '童', color: '#d4906a' },
  love: { label: '爱情心理', icon: '爱', color: '#d4607a' },
  creativity: { label: '创造心理', icon: '创', color: '#aa7aba' },
  forensic: { label: '犯罪心理', icon: '探', color: '#6a5a6a' },
  consumer: { label: '消费心理', icon: '购', color: '#5a9a8a' },
  thanatology: { label: '死亡心理', icon: '烛', color: '#7a7a8a' },
  sports: { label: '运动心理', icon: '跑', color: '#4a8a6a' },
}

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
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
  const course = MOCK_COURSES.find((item) => item.id === courseId)
  const [activeChapter, setActiveChapter] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])

  useEffect(() => {
    try {
      const stored = Taro.getStorageSync(storageKey(courseId))
      setCompleted(Array.isArray(stored) ? stored : [])
    } catch {
      setCompleted([])
    }
  }, [courseId])

  const category = course ? (CATEGORIES[course.category] || { label: course.category, icon: '书', color: '#6b5b8a' }) : CATEGORIES.freud
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

  if (!course) {
    return (
      <View className='page course-detail-page'>
        <View className='empty-course'>
          <Text className='empty-icon'>📭</Text>
          <Text className='empty-text'>课程未找到</Text>
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
