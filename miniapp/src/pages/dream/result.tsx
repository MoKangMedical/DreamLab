// 梦境解析结果页

import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { API_BASE, DREAM_RESULT_STORAGE_PREFIX } from '../../config/env'
import './result.scss'

interface DreamResult {
  id: number
  created_at: string
  freudian_analysis: string
  jungian_analysis: string
  modern_analysis: string
  eastern_analysis: string
}

export default function DreamResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<DreamResult | null>(null)
  const [activeTab, setActiveTab] = useState(0) // 0=freud, 1=jung, 2=modern, 3=eastern

  useEffect(() => {
    const id = router.params.id
    if (!id) return

    try {
      const stored = Taro.getStorageSync(`${DREAM_RESULT_STORAGE_PREFIX}${id}`)
      if (stored && typeof stored === 'object') {
        setResult(stored as DreamResult)
        return
      }
    } catch {
      // Continue with remote loading when available.
    }

    if (API_BASE) {
      Taro.request({
        url: `${API_BASE}/dreams/${id}`,
        method: 'GET',
        timeout: 12000,
      }).then((res) => {
        if (res.statusCode === 200) {
          const data = res.data as DreamResult
          Taro.setStorageSync(`${DREAM_RESULT_STORAGE_PREFIX}${id}`, data)
          setResult(data)
        }
      }).catch(() => {
        setResult(null)
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
              <Text>暂未找到这次梦境记录，请返回重新输入梦境。</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
