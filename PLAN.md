# DreamLab 2.0 — 顶级心理学平台实施计划

> **For Hermes:** Build module by module, verify at each step.

**Goal:** 将 DreamLab 从「梦境分析工具」升级为顶级心理学综合平台

**Architecture:** Next.js 16 (静态导出) + FastAPI + SQLite + DeepSeek AI，千与千寻主题

**Tech Stack:** Next.js 16, Tailwind CSS v4, TypeScript, FastAPI, SQLAlchemy + SQLite, DeepSeek API

---

## 模块总览

| # | 模块 | 前端路由 | 后端路由 | 数据表 | 状态 |
|---|------|---------|---------|--------|------|
| 1 | 专业心理测评 | /assessments | /api/assessments | assessments, assessment_results | 🔜 |
| 2 | AI心灵陪伴 | /companion | /api/companion | companion_sessions, companion_messages | 🔜 |
| 3 | 心智健康工具箱 | /wellness | /api/wellness | wellness_logs, meditation_sessions | 🔜 |
| 4 | 证据级知识库 | /library | /api/library | articles, concepts, quiz_results | 🔜 |
| 5 | 互助社区 | /community | /api/community | community_posts, comments | 🔜 |
| 6 | 白龙成长 | /profile/milestones | /api/milestones | milestones, achievements | 🔜 |
| 7 | 首页重设计 | / | - | - | 🔜 |

---

## 设计原则

1. **千与千寻叙事贯穿** — 每个心理功能映射油屋场景/角色
2. **科学严谨** — 量表标准化，引用同行评审文献
3. **隐私优先** — 本地存储优先，匿名社区
4. **移动优先** — PWA 离线可用，触摸友好
5. **渐进增强** — 一个模块做完验证后再做下一个

---

## 模块1: 专业心理测评系统

### 后端

**新增数据表:**
- `assessments`: 量表定义 (name, category, description, questions JSON, scoring_rules JSON)
- `assessment_results`: 用户测评结果 (user_id, assessment_id, answers JSON, scores JSON, interpretation, created_at)

**新增路由:** `backend/routes/assessments.py`
- `GET /api/assessments` — 量表列表
- `GET /api/assessments/{id}` — 量表详情（含题目）
- `POST /api/assessments/{id}/submit` — 提交答案，AI生成解读
- `GET /api/assessments/results/{user_id}` — 用户历史结果 + 趋势数据

**内置量表（种子数据）:**
1. **SAS 焦虑自评量表** (20题, 1-4分, 标准分=总分×1.25)
2. **SDS 抑郁自评量表** (20题, 1-4分, 抑郁指数=总分/80)
3. **SCL-90 症状自评** (9因子简版, 36题)
4. **大五人格简版** (BFI-20, 20题)
5. **匹兹堡睡眠质量指数** (PSQI简版)
6. **心理弹性量表** (CD-RISC简版, 10题)

### 前端

**新增页面:**
- `src/app/assessments/page.tsx` — 量表列表（彩色卡片 + 千寻主题）
- `src/app/assessments/[id]/page.tsx` — 答题界面（步骤条 + 动画过渡）
- `src/app/assessments/[id]/result/page.tsx` — 结果页（雷达图 + AI解读）

**组件:**
- `AssessmentCard.tsx` — 量表入口卡片
- `QuestionStepper.tsx` — 答题步骤器
- `ResultRadar.tsx` — 雷达图（SVG实现）
- `TrendChart.tsx` — 趋势折线图

### 千与千寻主题映射
- 标题：「汤婆婆的契约之镜」— 在镜中看见真实的自己
- 答题过程：每一步对应油屋一层
- 结果展示：镜中映出「另一个自己」
- 图标：🪞

---

## 模块2: AI心灵陪伴

### 后端
- `companion_sessions` 表
- `companion_messages` 表
- POST /api/companion/chat — AI对话（CBT框架prompt）
- 危机关键词检测 → 触发紧急资源推送

### 前端
- /companion — 对话界面（无脸男主题）
- 无名温暖感设计

---

## 模块3: 心智健康工具箱

- 引导冥想（文字+呼吸动画）
- 情绪记录仪表盘
- 感恩日记
- 睡眠日志

---

## 模块4: 证据级知识库

- 心理学概念百科
- 同行评审摘要
- 交互自测题

---

## 模块5: 互助社区

- 匿名发帖/评论
- 主题小组
- 咨询师黄页（静态数据）

---

## 模块6: 白龙成长

- 里程碑系统
- 成就徽章
- 连续打卡
- 成长报告

---

## 模块7: 首页重设计

- 6大模块导航
- 油屋全景图
- 千寻之旅进度条

---

*计划创建于 2026-05-03 · 逐步构建中*
