import { useMemo, useState } from 'react'
import { ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { KANGBO_CATEGORIES, KANGBO_PHASES, MOCK_COURSES } from '../../data/mock-courses'
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

  const courses = useMemo(() => {
    if (filter === 'all') return MOCK_COURSES
    return MOCK_COURSES.filter((course) => course.phaseKey === filter)
  }, [filter])

  return (
    <View className='page courses-page'>
      <ScrollView scrollY className='courses-scroll'>
        <View className='courses-hero'>
          <Text className='courses-kicker'>KANGBO ACADEMY</Text>
          <Text className='courses-title'>康波课程体系</Text>
          <Text className='courses-desc'>
            65门课程，覆盖周期理论、投资大师、宏观指标、资产配置、风险管理与30年财富蓝图。
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
            {KANGBO_PHASES.map((item) => (
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
          <Text className='path-desc'>周期基础 → 大师思想 → 经济学派 → 中国经济 → 理财技能 → 投资实战 → 高级策略</Text>
        </View>

        <View className='course-list'>
          {courses.map((course) => {
            const category = KANGBO_CATEGORIES[course.category] || { label: course.category, icon: '课', color: '#6b5b8a' }
            const chapterCount = course.chapters?.length || 0
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
                      <Text className='course-tag'>{course.minutes}分钟</Text>
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
