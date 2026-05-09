import { useMemo, useState } from 'react'
import { ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { MOCK_COURSES } from '../../data/mock-courses'
import './index.scss'

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

const FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'dream', label: '梦学基石' },
  { key: 'theory', label: '系统理论' },
  { key: 'clinical', label: '临床应用' },
  { key: 'special', label: '专项领域' },
]

const GROUPS: Record<string, number[]> = {
  dream: [1, 2, 3, 4],
  theory: [5, 6, 7, 8, 9, 10, 11, 12],
  clinical: [13, 14, 15, 16, 17, 18, 19, 20],
  special: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
}

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
}

export default function CoursesPage() {
  const [filter, setFilter] = useState('all')

  const courses = useMemo(() => {
    if (filter === 'all') return MOCK_COURSES
    return MOCK_COURSES.filter((course) => GROUPS[filter]?.includes(course.id))
  }, [filter])

  return (
    <View className='page courses-page'>
      <ScrollView scrollY className='courses-scroll'>
        <View className='courses-hero'>
          <Text className='courses-kicker'>梦学の殿堂</Text>
          <Text className='courses-title'>心理学完整知识体系</Text>
          <Text className='courses-desc'>
            30门课程，覆盖梦学、人格、认知行为、正念、创伤、情绪与关系等核心主题。
          </Text>
        </View>

        <ScrollView scrollX className='course-filter-scroll'>
          <View className='course-filters'>
            {FILTERS.map((item) => (
              <View
                key={item.key}
                className={`filter-pill ${filter === item.key ? 'filter-active' : ''}`}
                onClick={() => setFilter(item.key)}
              >
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View className='path-card'>
          <Text className='path-title'>六阶段学习路径</Text>
          <Text className='path-desc'>梦学入门 → 深度解梦 → 系统理论 → 幸福科学 → 临床应用 → 专项精通</Text>
        </View>

        <View className='course-list'>
          {courses.map((course) => {
            const category = CATEGORIES[course.category] || { label: course.category, icon: '书', color: '#6b5b8a' }
            const chapterCount = course.chapters?.length || 0
            return (
              <View
                key={course.id}
                className='course-card'
                onClick={() => Taro.navigateTo({ url: `/pages/courses/detail?id=${course.id}` })}
              >
                <View className='course-card-top'>
                  <View className='course-symbol' style={{ color: category.color, borderColor: `${category.color}40` }}>
                    <Text>{category.icon}</Text>
                  </View>
                  <View className='course-main'>
                    <Text className='course-title'>{course.title}</Text>
                    <View className='course-tags'>
                      <Text className='course-tag' style={{ color: category.color, borderColor: `${category.color}30` }}>
                        {category.label}
                      </Text>
                      <Text className='course-tag'>{DIFFICULTY_LABELS[course.difficulty] || course.difficulty}</Text>
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
