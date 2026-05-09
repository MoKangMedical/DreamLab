import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { MOCK_ASSESSMENTS } from '../../data/mock-assessments'
import './index.scss'

const CATEGORIES: Record<string, { name: string; desc: string; color: string }> = {
  anxiety: { name: '焦虑评估', desc: '紧张与不安的来源', color: '#c4554d' },
  depression: { name: '抑郁评估', desc: '情绪低谷的信号', color: '#6b5b8a' },
  personality: { name: '人格探索', desc: '理解独特的自己', color: '#d4a853' },
  sleep: { name: '睡眠健康', desc: '安稳睡眠的基础', color: '#5a7d9a' },
  resilience: { name: '心理韧性', desc: '逆境恢复力', color: '#3b8b7a' },
  symptom: { name: '综合筛查', desc: '多维心理健康快照', color: '#d4a853' },
}

export default function AssessmentsPage() {
  return (
    <View className='page assessments-page'>
      <ScrollView scrollY className='assessments-scroll'>
        <View className='assessments-hero'>
          <Text className='page-kicker'>投资者画像</Text>
          <Text className='assessments-icon'>◎</Text>
          <Text className='page-title'>风险与行为观察</Text>
          <Text className='page-desc'>
            六套标准化量表，辅助观察情绪、睡眠、人格、韧性和投资行为偏差。
          </Text>
        </View>

        <View className='assessment-list'>
          {MOCK_ASSESSMENTS.map((item) => {
            const category = CATEGORIES[item.category] || CATEGORIES.symptom
            return (
              <View
                key={item.id}
                className='assessment-card'
                onClick={() => Taro.navigateTo({ url: `/pages/assessments/detail?id=${item.id}` })}
              >
                <View className='assessment-head'>
                  <View className='assessment-icon-wrap' style={{ borderColor: `${category.color}40` }}>
                    <Text className='assessment-icon'>{item.icon}</Text>
                  </View>
                  <View className='assessment-main'>
                    <Text className='assessment-title'>{item.name}</Text>
                    <Text className='assessment-meta'>
                      {item.question_count}题 · {category.name}
                    </Text>
                  </View>
                </View>

                <Text className='assessment-desc'>{item.description}</Text>

                <View className='assessment-info'>
                  <View className='assessment-pill' style={{ color: category.color, borderColor: `${category.color}30` }}>
                    <Text>{category.desc}</Text>
                  </View>
                  <Text className='assessment-action'>开始 →</Text>
                </View>
              </View>
            )
          })}
        </View>

        <View className='assessment-notice'>
          <Text>测评结果仅供自我观察，不能替代专业诊断或投资建议。</Text>
        </View>
      </ScrollView>
    </View>
  )
}
