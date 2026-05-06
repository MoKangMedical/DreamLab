// 梦境解析结果页

import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import './result.scss'

interface DreamResult {
  id: number
  created_at: string
  freudian_analysis: string
  jungian_analysis: string
  modern_analysis: string
  eastern_analysis: string
}

const API_BASE = 'https://43.134.3.158/api'

export default function DreamResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<DreamResult | null>(null)
  const [activeTab, setActiveTab] = useState(0) // 0=freud, 1=jung, 2=modern, 3=eastern

  useEffect(() => {
    const id = router.params.id
    if (id) {
      Taro.request({
        url: `${API_BASE}/dreams/${id}`,
        method: 'GET',
      }).then((res) => {
        if (res.statusCode === 200) {
          setResult(res.data as DreamResult)
        }
      })
    }
  }, [router.params.id])

  const tabs = [
    { label: '弗洛伊德', icon: '🧠', key: 'freudian_analysis' },
    { label: '荣格', icon: '🌌', key: 'jungian_analysis' },
    { label: '现代科学', icon: '🔬', key: 'modern_analysis' },
    { label: '东方智慧', icon: '☯️', key: 'eastern_analysis' },
  ]

  return (
    <View className='page'>
      <ScrollView scrollY className='result-container'>
        <View className='result-header'>
          <Text className='result-tag'>AI 深度解读</Text>
          <Text className='result-title'>你的梦境分析</Text>
        </View>

        {/* Tab bar */}
        <ScrollView scrollX className='tab-bar'>
          {tabs.map((tab, i) => (
            <View
              key={i}
              className={`tab-item ${activeTab === i ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              <Text className='tab-icon'>{tab.icon}</Text>
              <Text className='tab-label'>{tab.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Content */}
        <View className='analysis-content'>
          {result ? (
            <Text className='analysis-text'>
              {String(result[tabs[activeTab].key as keyof DreamResult] || '分析中...')}
            </Text>
          ) : (
            <View className='loading'>
              <Text>AI 正在四重视角解读你的梦...</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
