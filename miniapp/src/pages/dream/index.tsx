// 梦境解析页面 — 用户输入梦境，AI四重视角分析

import { useState } from 'react'
import { View, Text, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const API_BASE = 'https://43.134.3.158/api'

export default function DreamPage() {
  const [dream, setDream] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!dream.trim()) return
    setLoading(true)
    try {
      const res = await Taro.request({
        url: `${API_BASE}/dreams/analyze`,
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        data: { content: dream },
      })
      if (res.statusCode === 200) {
        const data = res.data as {
          id?: number
          freudian_analysis?: string
          jungian_analysis?: string
          modern_analysis?: string
          eastern_analysis?: string
        }
        Taro.navigateTo({
          url: `/pages/dream/result?id=${data.id || 0}`,
        })
      }
    } catch (e) {
      Taro.showToast({ title: '分析失败，请重试', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className='page'>
      <View className='dream-header'>
        <Text className='dream-tag'>记录你的梦</Text>
        <Text className='dream-title'>昨晚，你梦见了什么？</Text>
        <Text className='dream-desc'>
          弗洛伊德 · 荣格 · 现代科学 · 东方智慧{'\n'}
          四重视角，解读你的潜意识
        </Text>
      </View>

      <View className='dream-input-area'>
        <Textarea
          className='dream-textarea'
          placeholder='写下你记得的梦境片段...&#10;&#10;比如：我梦见自己在一个古老的图书馆里，书架延伸到天际，每一本书都是透明的，翻开后看到的不是文字，而是流动的光...'
          value={dream}
          onInput={(e) => setDream(e.detail.value)}
          maxlength={2000}
          autoHeight
        />
      </View>

      <View className='dream-actions'>
        <View
          className={`btn-gold ${loading ? 'btn-disabled' : ''}`}
          onClick={handleSubmit}
        >
          <Text>{loading ? '分析中...' : '开始解梦'}</Text>
        </View>
      </View>

      <View className='dream-perspectives'>
        <Text className='perspectives-title'>四重视角</Text>
        <View className='perspective-grid'>
          {[
            { icon: '🧠', name: '弗洛伊德', desc: '潜意识的欲望与冲突' },
            { icon: '🌌', name: '荣格', desc: '集体无意识的原型' },
            { icon: '🔬', name: '现代科学', desc: '睡眠与记忆整合' },
            { icon: '☯️', name: '东方智慧', desc: '阴阳五行与心象' },
          ].map((p, i) => (
            <View key={i} className='perspective-card'>
              <Text className='perspective-icon'>{p.icon}</Text>
              <Text className='perspective-name'>{p.name}</Text>
              <Text className='perspective-desc'>{p.desc}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
