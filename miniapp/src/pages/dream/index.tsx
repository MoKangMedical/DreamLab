// 梦境解析页面 — 用户输入梦境，AI四重视角分析

import { useState } from 'react'
import { View, Text, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { API_BASE, DREAM_RESULT_STORAGE_PREFIX } from '../../config/env'
import './index.scss'

function buildLocalDreamResult(content: string) {
  const id = Date.now()
  const shortDream = content.trim().slice(0, 80)

  return {
    id,
    created_at: new Date().toISOString(),
    freudian_analysis: `从弗洛伊德视角看，这段梦境可能呈现了被压抑的愿望、压力或未表达的情绪。你可以回想梦中最强烈的画面「${shortDream}」，观察它是否连接到近期的关系、责任或安全感议题。`,
    jungian_analysis: `从荣格视角看，梦境中的人物、地点和物件可以被视为内在原型。请留意梦里最有力量的象征，它可能代表你正在发展但尚未被充分看见的一部分自我。`,
    modern_analysis: '从现代睡眠科学看，梦常常会把近期记忆、情绪压力和身体状态重新组合。这个梦可以被当作一次情绪整理的线索，而不是确定的预言或诊断。',
    eastern_analysis: '从东方心象视角看，梦境提醒你观察当下身心是否失衡。可以记录梦后的身体感受、情绪余波和当天发生的事件，再选择一个温和的小行动照顾自己。',
  }
}

export default function DreamPage() {
  const [dream, setDream] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!dream.trim()) return
    setLoading(true)
    try {
      if (API_BASE) {
        const res = await Taro.request({
          url: `${API_BASE}/dreams/analyze`,
          method: 'POST',
          header: { 'Content-Type': 'application/json' },
          data: { content: dream },
          timeout: 12000,
        })
        if (res.statusCode === 200) {
          const data = res.data as { id?: number }
          const id = data.id || Date.now()
          Taro.setStorageSync(`${DREAM_RESULT_STORAGE_PREFIX}${id}`, { ...data, id })
          Taro.navigateTo({ url: `/pages/dream/result?id=${id}` })
          return
        }
      }

      const result = buildLocalDreamResult(dream)
      Taro.setStorageSync(`${DREAM_RESULT_STORAGE_PREFIX}${result.id}`, result)
      Taro.navigateTo({ url: `/pages/dream/result?id=${result.id}` })
    } catch {
      const result = buildLocalDreamResult(dream)
      Taro.setStorageSync(`${DREAM_RESULT_STORAGE_PREFIX}${result.id}`, result)
      Taro.navigateTo({ url: `/pages/dream/result?id=${result.id}` })
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
