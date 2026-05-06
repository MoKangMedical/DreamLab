# DreamLab Codex 接管计划

> 2026-05-06 | Codex CLI v0.104.0 | DeepSeek v4-pro

## Codex 配置

```toml
# ~/.codex/config.toml
[model]
provider = "openai"
model = "deepseek-v4-pro"

[openai]
api_key = "sk-2989a4f388484aa9a6ab880f28012182"
base_url = "https://api.deepseek.com/v1"

[workspace]
trust_level = "trusted"
```

## Codex 任务队列

### P0: 生产环境稳定
- [ ] 修复 nginx 自动重启（systemd 已配，需验证 fail2ban）
- [ ] 前端 serve 进程守护（pm2 或 systemd）
- [ ] 后端 uvicorn 进程守护
- [ ] 健康检查端点 `/api/health`

### P1: 小程序完善
```
/root/.openclaw/workspace/dreamlab/miniapp/
```

- [ ] npm install（Taro + React 依赖）
- [ ] 完善 `pages/assessments/index.tsx` — 量表列表 + 答题界面
- [ ] 完善 `pages/assessments/detail/index.tsx` — 量表详情 + 提交
- [ ] 完善 `pages/courses/index.tsx` — 10门课程卡片
- [ ] 完善 `pages/courses/detail/index.tsx` — 章节内容阅读
- [ ] 完善 `pages/reflect/index.tsx` — 每日反思输入
- [ ] 完善 `pages/profile/index.tsx` — 用户数据统计
- [ ] 对接后端 API（`https://43.134.3.158/api`）
- [ ] `taro build --type weapp` 构建验证

### P2: Web 平台增强
- [ ] 首页 `/` 性能优化（Lighthouse 90+）
- [ ] PWA Service Worker 完善
- [ ] 社区模块 — 评论回复功能
- [ ] AI 陪伴 — 对话历史持久化
- [ ] 知识库 — 搜索功能

### P3: 新功能
- [ ] 梦境日记 — 连续记录 + 趋势分析
- [ ] 咨询师黄页（静态数据）
- [ ] 多人协作解梦（社区功能扩展）

## 常用 Codex 命令

```bash
# 在新分支上开发功能
cd /root/.openclaw/workspace/dreamlab
git checkout -b feat/xxx
codex exec --full-auto "你的任务描述"

# 审查 PR
codex review --base main

# 批量修复
codex --yolo "修复所有 TypeScript 类型错误"
```

## 项目关键信息

| 项 | 值 |
|----|-----|
| 仓库 | https://github.com/MoKangMedical/DreamLab |
| 前端技术 | Next.js 16 + React 19 + Tailwind CSS v4 |
| 后端技术 | FastAPI + SQLAlchemy + SQLite |
| AI 引擎 | DeepSeek v4-pro |
| 生产 URL | http://43.134.3.158/DreamLab |
| API 文档 | http://43.134.3.158/docs |
| 前端端口 | 3002 (serve 静态) / dev: `next dev -p 3002` |
| 后端端口 | 8002 (uvicorn) |
| 小程序 | `/dreamlab/miniapp/` (Taro React) |
