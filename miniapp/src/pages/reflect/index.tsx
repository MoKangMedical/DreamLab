import { useEffect, useState } from 'react'
import { Input, ScrollView, Text, Textarea, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const API_BASE = 'https://43.134.3.158/api'
const STORAGE_KEY = 'dreamlab_reflections'

const STAGES = [
  { title: '记录', desc: '诚实写下梦的内容，不急着解释', icon: '记' },
  { title: '感受', desc: '辨别梦里最强烈的情绪', icon: '感' },
  { title: '联想', desc: '把符号连接到现实中的人和事', icon: '联' },
  { title: '行动', desc: '选择一个可以实践的小改变', icon: '行' },
]

const PROMPTS = [
  { q: '这个梦让你想到了生活中的什么？', hint: '梦是现实的隐喻' },
  { q: '梦里最强烈的情绪是什么？为什么？', hint: '情绪比情节更诚实' },
  { q: '如果你是梦里的另一个人物，你会看到什么？', hint: '换位带来新视角' },
  { q: '这个梦在提醒你什么？', hint: '梦是心灵的自我调节' },
  { q: '醒来后，你想做什么不同的事？', hint: '梦可以成为行动起点' },
]

const MOODS = ['低落', '紧绷', '平静', '轻松', '明亮']

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
          <Text className='reflect-kicker'>梦后的桥</Text>
          <Text className='reflect-title'>人生思考</Text>
          <Text className='reflect-desc'>
            记录梦只是第一步。把情绪、联想和行动写下来，才能让梦真正回到生活里。
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
          <Text className='section-title'>不知怎么开始？</Text>
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
              <Text className='section-title'>写下你的思考</Text>
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
                placeholder='给这段思考起个名字'
                onInput={(event) => setTitle(event.detail.value)}
              />

              <Text className='field-label'>内容</Text>
              <Textarea
                className='field-textarea'
                value={content}
                placeholder='写下你的感悟，可以从上面的引导问题开始'
                maxlength={2000}
                onInput={(event) => setContent(event.detail.value)}
              />

              <Text className='field-label'>心情</Text>
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
              <Text className='empty-desc'>第一篇反思会成为你心灵地图的起点。</Text>
            </View>
          ) : (
            reflections.map((item) => (
              <View key={item.id} className='reflection-card'>
                <View className='reflection-head'>
                  <Text className='reflection-title'>{item.title}</Text>
                  <Text className='reflection-date'>{new Date(item.created_at).toLocaleDateString('zh-CN')}</Text>
                </View>
                <Text className='reflection-content'>{item.content}</Text>
                <Text className='reflection-mood'>心情：{MOODS[item.mood - 1]}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  )
}
