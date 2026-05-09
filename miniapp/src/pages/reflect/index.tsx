import { useEffect, useState } from 'react'
import { Input, ScrollView, Text, Textarea, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const API_BASE = 'https://43.134.3.158/api'
const STORAGE_KEY = 'dreamlab_reflections'

const STAGES = [
  { title: '假设', desc: '写清楚你对周期和资产的判断', icon: '假' },
  { title: '证据', desc: '列出支持和反对这次判断的数据', icon: '证' },
  { title: '风险', desc: '明确什么情况会证明你错了', icon: '险' },
  { title: '行动', desc: '设定仓位、学习或观察的下一步', icon: '行' },
]

const PROMPTS = [
  { q: '我现在判断处于哪个周期阶段？为什么？', hint: '先定位，再行动' },
  { q: '支持这个判断的三条证据是什么？', hint: '证据要能被复查' },
  { q: '如果判断错误，最可能错在哪里？', hint: '先写反例，避免自我确认' },
  { q: '本次判断对应的资产、职业或学习动作是什么？', hint: '判断必须落到行动' },
  { q: '下一次复盘日期和观察指标是什么？', hint: '没有复盘就没有系统' },
]

const MOODS = ['谨慎', '观望', '中性', '积极', '进攻']

interface ReflectionItem {
  id: number
  title: string
  content: string
  mood: number
  created_at: string
}

export default function ReflectPage() {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState(3)
  const [saving, setSaving] = useState(false)
  const [reflections, setReflections] = useState<ReflectionItem[]>([])

  useEffect(() => {
    try {
      const stored = Taro.getStorageSync(STORAGE_KEY)
      setReflections(Array.isArray(stored) ? stored : [])
    } catch {
      setReflections([])
    }
  }, [])

  const persist = (items: ReflectionItem[]) => {
    setReflections(items)
    Taro.setStorageSync(STORAGE_KEY, items)
  }

  const usePrompt = (prompt: string) => {
    setContent((value) => `${value}${value ? '\n\n' : ''}${prompt}\n`)
    setShowForm(true)
  }

  const saveReflection = async () => {
    if (!title.trim() || !content.trim()) {
      Taro.showToast({ title: '请填写标题和内容', icon: 'none' })
      return
    }

    const item: ReflectionItem = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      mood,
      created_at: new Date().toISOString(),
    }

    setSaving(true)
    try {
      await Taro.request({
        url: `${API_BASE}/reflect`,
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        data: {
          user_id: 1,
          title: item.title,
          content: item.content,
          mood_score: item.mood,
        },
        timeout: 8000,
      })
      Taro.showToast({ title: '复盘已保存', icon: 'success' })
    } catch {
      Taro.showToast({ title: '已本地保存', icon: 'none' })
    } finally {
      persist([item, ...reflections])
      setTitle('')
      setContent('')
      setMood(3)
      setShowForm(false)
      setSaving(false)
    }
  }

  return (
    <View className='page reflect-page'>
      <ScrollView scrollY className='reflect-scroll'>
        <View className='reflect-hero'>
          <Text className='reflect-kicker'>周期研究日志</Text>
          <Text className='reflect-title'>策略复盘</Text>
          <Text className='reflect-desc'>
            每一次判断都写下假设、证据、风险和复盘日期，让课程知识进入真实决策流程。
          </Text>
        </View>

        <View className='stage-grid'>
          {STAGES.map((stage, index) => (
            <View key={stage.title} className='stage-card'>
              <View className='stage-icon'>
                <Text>{stage.icon}</Text>
              </View>
              <Text className='stage-title'>{index + 1}. {stage.title}</Text>
              <Text className='stage-desc'>{stage.desc}</Text>
            </View>
          ))}
        </View>

        <View className='section-block'>
          <Text className='section-kicker'>引导问题</Text>
          <Text className='section-title'>写一份可复盘判断</Text>
          {PROMPTS.map((prompt) => (
            <View key={prompt.q} className='prompt-card' onClick={() => usePrompt(prompt.q)}>
              <Text className='prompt-q'>{prompt.q}</Text>
              <Text className='prompt-hint'>{prompt.hint}</Text>
            </View>
          ))}
        </View>

        <View className='section-block'>
          <View className='section-head'>
            <View>
              <Text className='section-kicker'>我的复盘</Text>
              <Text className='section-title'>写下你的策略判断</Text>
            </View>
            <View className='write-btn' onClick={() => setShowForm((value) => !value)}>
              <Text>{showForm ? '收起' : '+ 写复盘'}</Text>
            </View>
          </View>

          {showForm && (
            <View className='reflect-form'>
              <Text className='field-label'>标题</Text>
              <Input
                className='field-input'
                value={title}
                placeholder='例如：第六轮康波 AI 赛道判断'
                onInput={(event) => setTitle(event.detail.value)}
              />

              <Text className='field-label'>内容</Text>
              <Textarea
                className='field-textarea'
                value={content}
                placeholder='写下假设、证据、反例、风险和下一步动作'
                maxlength={2000}
                onInput={(event) => setContent(event.detail.value)}
              />

              <Text className='field-label'>策略状态</Text>
              <View className='mood-row'>
                {MOODS.map((label, index) => (
                  <View
                    key={label}
                    className={`mood-item ${mood === index + 1 ? 'mood-active' : ''}`}
                    onClick={() => setMood(index + 1)}
                  >
                    <Text>{label}</Text>
                  </View>
                ))}
              </View>

              <View className={`save-btn ${saving ? 'save-disabled' : ''}`} onClick={saving ? undefined : saveReflection}>
                <Text>{saving ? '保存中...' : '保存复盘'}</Text>
              </View>
            </View>
          )}
        </View>

        <View className='reflection-list'>
          {reflections.length === 0 ? (
            <View className='empty-reflect'>
              <Text className='empty-icon'>◇</Text>
              <Text className='empty-title'>还没有复盘记录</Text>
              <Text className='empty-desc'>第一篇复盘会成为你周期研究档案的起点。</Text>
            </View>
          ) : (
            reflections.map((item) => (
              <View key={item.id} className='reflection-card'>
                <View className='reflection-head'>
                  <Text className='reflection-title'>{item.title}</Text>
                  <Text className='reflection-date'>{new Date(item.created_at).toLocaleDateString('zh-CN')}</Text>
                </View>
                <Text className='reflection-content'>{item.content}</Text>
                <Text className='reflection-mood'>状态：{MOODS[item.mood - 1]}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  )
}
