import { useEffect, useState } from 'react'
import { Input, ScrollView, Text, Textarea, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const API_BASE = 'https://43.134.3.158/api'
const STORAGE_KEY = 'dreamlab_reflections'

const STAGES = [
  { title: '情境', desc: '写清楚发生了什么、梦到了什么', icon: '境' },
  { title: '感受', desc: '记录情绪、身体反应和自动想法', icon: '感' },
  { title: '理解', desc: '寻找证据、反例和更温和的解释', icon: '解' },
  { title: '照护', desc: '设定一个可完成的小行动', icon: '护' },
]

const PROMPTS = [
  { q: '今天最强烈的情绪是什么？它出现在什么情境里？', hint: '先命名，再理解' },
  { q: '我反复出现的梦境、念头或身体感受在提醒什么？', hint: '把材料写清楚' },
  { q: '支持这个想法的证据是什么？有没有其他解释？', hint: '用 CBT 的方式温和求证' },
  { q: '我真正需要的支持、边界或行动是什么？', hint: '从觉察走向照护' },
  { q: '下一次复盘要观察哪个小变化？', hint: '让成长可以被回看' },
]

const MOODS = ['低落', '焦虑', '平稳', '清明', '有力']

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
      Taro.showToast({ title: '反思已保存', icon: 'success' })
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
          <Text className='reflect-kicker'>DreamLab 反思日志</Text>
          <Text className='reflect-title'>心理反思</Text>
          <Text className='reflect-desc'>
            把梦境、情绪、想法和行动写成可回看的成长档案。
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
          <Text className='section-title'>写一份可复盘反思</Text>
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
              <Text className='section-kicker'>我的反思</Text>
              <Text className='section-title'>写下你的心理观察</Text>
            </View>
            <View className='write-btn' onClick={() => setShowForm((value) => !value)}>
              <Text>{showForm ? '收起' : '+ 写反思'}</Text>
            </View>
          </View>

          {showForm && (
            <View className='reflect-form'>
              <Text className='field-label'>标题</Text>
              <Input
                className='field-input'
                value={title}
                placeholder='例如：反复梦到迷路后的情绪记录'
                onInput={(event) => setTitle(event.detail.value)}
              />

              <Text className='field-label'>内容</Text>
              <Textarea
                className='field-textarea'
                value={content}
                placeholder='写下情境、梦境片段、情绪、自动想法、证据和下一步照护动作'
                maxlength={2000}
                onInput={(event) => setContent(event.detail.value)}
              />

              <Text className='field-label'>当前状态</Text>
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
                <Text>{saving ? '保存中...' : '保存反思'}</Text>
              </View>
            </View>
          )}
        </View>

        <View className='reflection-list'>
          {reflections.length === 0 ? (
            <View className='empty-reflect'>
              <Text className='empty-icon'>◇</Text>
              <Text className='empty-title'>还没有反思记录</Text>
              <Text className='empty-desc'>第一篇反思会成为你 DreamLab 成长档案的起点。</Text>
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
