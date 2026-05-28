import { useEffect, useMemo, useRef, useState } from 'react'
import { ScrollView, Slider, Text, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { COURSE_AUDIO_BASE_URL } from '../../config/env'
import { DREAMLAB_CATEGORIES, DreamLabCourse, loadDreamLabCourseDetail } from '../../data/mock-courses'
import './detail.scss'

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: '入门',
  core: '核心',
  intermediate: '进阶',
  advanced: '高级',
  master: '终极',
}

function storageKey(courseId: number) {
  return `dreamlab_course_progress_${courseId}`
}

function chapterContent(chapter: any, index: number) {
  const body = chapter.content || chapter.body || ''
  if (body) return body
  return `第${index + 1}章内容将在课程资料同步后展示。你可以先阅读课程简介，建立本主题的学习框架。`
}

function formatTime(value: number) {
  const total = Math.max(0, Math.floor(value || 0))
  const minutes = Math.floor(total / 60)
  const seconds = String(total % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

export default function CourseDetailPage() {
  const router = useRouter()
  const courseId = Number(router.params.id || 1)
  const [course, setCourse] = useState<DreamLabCourse | null>(null)
  const [activeChapter, setActiveChapter] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const audioRef = useRef<ReturnType<typeof Taro.createInnerAudioContext> | null>(null)
  const [audioState, setAudioState] = useState({
    chapterIndex: -1,
    playing: false,
    loading: false,
    current: 0,
    duration: 0,
    error: '',
  })

  const destroyAudio = (resetState = true) => {
    if (audioRef.current) {
      audioRef.current.stop()
      audioRef.current.destroy()
      audioRef.current = null
    }
    if (resetState) {
      setAudioState({ chapterIndex: -1, playing: false, loading: false, current: 0, duration: 0, error: '' })
    }
  }

  const playChapterAudio = (index: number, src: string) => {
    if (audioRef.current && audioState.chapterIndex === index) {
      if (audioState.playing) {
        audioRef.current.pause()
        setAudioState((prev) => ({ ...prev, playing: false }))
      } else {
        audioRef.current.play()
        setAudioState((prev) => ({ ...prev, loading: true, error: '' }))
      }
      return
    }

    destroyAudio()
    const audio = Taro.createInnerAudioContext()
    audio.src = src
    audio.autoplay = false
    audioRef.current = audio
    setAudioState({ chapterIndex: index, playing: false, loading: true, current: 0, duration: 0, error: '' })

    audio.onPlay(() => {
      setAudioState((prev) => ({ ...prev, playing: true, loading: false, error: '' }))
    })
    audio.onPause(() => {
      setAudioState((prev) => ({ ...prev, playing: false, loading: false }))
    })
    audio.onEnded(() => {
      setAudioState((prev) => ({ ...prev, playing: false, loading: false, current: 0 }))
    })
    audio.onTimeUpdate(() => {
      setAudioState((prev) => ({
        ...prev,
        current: audio.currentTime || 0,
        duration: audio.duration || prev.duration,
      }))
    })
    audio.onCanplay(() => {
      setAudioState((prev) => ({ ...prev, loading: false, duration: audio.duration || prev.duration }))
    })
    audio.onError(() => {
      setAudioState((prev) => ({ ...prev, playing: false, loading: false, error: '音频加载失败，请稍后重试' }))
      Taro.showToast({ title: '音频加载失败', icon: 'none' })
    })
    audio.play()
  }

  const seekAudio = (value: number) => {
    if (!audioRef.current) return
    audioRef.current.seek(value)
    setAudioState((prev) => ({ ...prev, current: value }))
  }

  const loadCourse = async () => {
    setLoading(true)
    setError('')
    try {
      const nextCourse = await loadDreamLabCourseDetail(courseId)
      setCourse(nextCourse)
      setActiveChapter(0)
    } catch (err) {
      setCourse(null)
      setError(err instanceof Error ? err.message : '课程内容加载失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    try {
      const stored = Taro.getStorageSync(storageKey(courseId))
      setCompleted(Array.isArray(stored) ? stored : [])
    } catch {
      setCompleted([])
    }
  }, [courseId])

  useEffect(() => {
    loadCourse()
    destroyAudio()
  }, [courseId])

  useEffect(() => {
    return () => destroyAudio(false)
  }, [])

  const fallbackCategory = { label: '心理课程', icon: '课', color: '#d4a853' }
  const category = course ? (DREAMLAB_CATEGORIES[course.category] || { label: course.category, icon: '课', color: '#6b5b8a' }) : fallbackCategory
  const chapters = course?.chapters || []
  const progress = chapters.length > 0 ? Math.round((completed.length / chapters.length) * 100) : 0
  const totalWords = useMemo(() => {
    return chapters.reduce((sum, chapter, index) => sum + chapterContent(chapter, index).length, 0)
  }, [chapters])

  const toggleComplete = (index: number) => {
    const next = completed.includes(index)
      ? completed.filter((item) => item !== index)
      : [...completed, index]
    setCompleted(next)
    Taro.setStorageSync(storageKey(courseId), next)
  }

  if (loading) {
    return (
      <View className='page course-detail-page'>
        <View className='empty-course'>
          <Text className='empty-icon'>⌛</Text>
          <Text className='empty-text'>正在同步课程内容</Text>
        </View>
      </View>
    )
  }

  if (!course) {
    return (
      <View className='page course-detail-page'>
        <View className='empty-course'>
          <Text className='empty-icon'>📭</Text>
          <Text className='empty-text'>{error || '课程未找到'}</Text>
          <View className='gold-btn retry-btn' onClick={loadCourse}>
            <Text>重新加载</Text>
          </View>
          <View className='gold-btn' onClick={() => Taro.navigateBack()}>
            <Text>返回课程列表</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className='page course-detail-page'>
      <ScrollView scrollY className='course-detail-scroll'>
        <View className='course-detail-header'>
          <Text className='back-link' onClick={() => Taro.navigateBack()}>← 返回课程列表</Text>
          <View className='course-title-row'>
            <View className='course-symbol-large' style={{ color: category.color, borderColor: `${category.color}40` }}>
              <Text>{category.icon}</Text>
            </View>
            <View className='course-title-main'>
              <View className='course-tags'>
                <Text className='course-tag' style={{ color: category.color, borderColor: `${category.color}30` }}>{category.label}</Text>
                <Text className='course-tag'>{DIFFICULTY_LABELS[course.difficulty] || course.difficulty}</Text>
                <Text className='course-tag'>{chapters.length || 4}章</Text>
              </View>
              <Text className='course-detail-title'>{course.title}</Text>
            </View>
          </View>
          <Text className='course-detail-desc'>{course.description}</Text>
        </View>

        <View className='progress-card'>
          <View className='progress-meta'>
            <Text>学习进度</Text>
            <Text>{progress}%</Text>
          </View>
          <View className='progress-track'>
            <View className='progress-fill' style={{ width: `${progress}%`, background: category.color }} />
          </View>
          <Text className='progress-note'>已完成 {completed.length}/{chapters.length || 0} 章 · 约 {totalWords || 1200} 字</Text>
        </View>

        <View className='chapter-list'>
          {(chapters.length > 0 ? chapters : [{ title: '课程导读', content: course.description }]).map((chapter, index) => {
            const isActive = activeChapter === index
            const isDone = completed.includes(index)
            const content = chapterContent(chapter, index)
            const chapterOrder = chapter.order ?? index + 1
            const hasAudio = courseId > 0 && chapterOrder > 0
            const audioUrl = `${COURSE_AUDIO_BASE_URL}/course${courseId}_ch${chapterOrder}.mp3`
            const isAudioActive = audioState.chapterIndex === index

            return (
              <View key={`${chapter.title}-${index}`} className={`chapter-card ${isActive ? 'chapter-active' : ''}`}>
                <View className='chapter-head' onClick={() => setActiveChapter(isActive ? -1 : index)}>
                  <View className={`chapter-index ${isDone ? 'chapter-done' : ''}`} style={isDone ? { background: category.color } : {}}>
                    <Text>{isDone ? '✓' : index + 1}</Text>
                  </View>
                  <View className='chapter-title-block'>
                    <Text className='chapter-title'>{chapter.title}</Text>
                    <Text className='chapter-meta'>{content.length}字{hasAudio ? ' · 音频' : ''}</Text>
                  </View>
                  <Text className='chapter-toggle'>{isActive ? '收起' : '展开'}</Text>
                </View>

                {isActive && (
                  <View className='chapter-body'>
                    {hasAudio && (
                      <View className='audio-card'>
                        <View className='audio-top'>
                          <View
                            className={`audio-play ${isAudioActive && audioState.playing ? 'audio-play-active' : ''}`}
                            onClick={() => playChapterAudio(index, audioUrl)}
                          >
                            <Text>{isAudioActive && audioState.playing ? '暂停' : '播放'}</Text>
                          </View>
                          <View className='audio-info'>
                            <Text className='audio-title'>章节口播导入</Text>
                            <Text className='audio-subtitle'>
                              {isAudioActive && audioState.loading ? '正在加载音频' : '云扬男声 · 慢速低音调 · 标准化音频'}
                            </Text>
                          </View>
                        </View>
                        <View className='audio-progress'>
                          <Text className='audio-time'>{formatTime(isAudioActive ? audioState.current : 0)}</Text>
                          <Slider
                            className='audio-slider'
                            min={0}
                            max={Math.max(1, isAudioActive ? audioState.duration || 1 : 1)}
                            value={isAudioActive ? audioState.current : 0}
                            activeColor='#d4a853'
                            backgroundColor='rgba(255,255,255,0.1)'
                            blockColor='#d4a853'
                            blockSize={14}
                            disabled={!isAudioActive}
                            onChange={(event: { detail: { value: number } }) => seekAudio(event.detail.value)}
                          />
                          <Text className='audio-time'>{formatTime(isAudioActive ? audioState.duration : 0)}</Text>
                        </View>
                        {isAudioActive && audioState.error && <Text className='audio-error'>{audioState.error}</Text>}
                      </View>
                    )}
                    <Text className='chapter-content'>{content}</Text>
                    <View
                      className={`complete-btn ${isDone ? 'complete-active' : ''}`}
                      onClick={() => toggleComplete(index)}
                    >
                      <Text>{isDone ? '已完成' : '标记完成'}</Text>
                    </View>
                  </View>
                )}
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
