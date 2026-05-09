# 康波研究院小程序交付说明

## 构建与导入

- 安装依赖：`npm install`
- 构建微信小程序：`npm run build:weapp`
- 微信开发者工具导入目录：`miniapp/dist`
- 当前构建产物：构建验证后以 `miniapp/dist` 为准

## 已实现页面

- 首页：`pages/index/index`
- 梦境解析工具：`pages/dream/index`
- 梦境结果：`pages/dream/result`
- 投资者画像/测评列表：`pages/assessments/index`
- 投资者画像答题与结果：`pages/assessments/detail`
- 康波课程列表：`pages/courses/index`
- 课程详情与章节进度：`pages/courses/detail`
- 策略复盘：`pages/reflect/index`
- 我的路线：`pages/profile/index`

## 数据与接口

- 课程体系已内置 65 门康波研究院课程，保证无后端时可完整预览。
- 测评题目保留静态数据，用于投资者画像的风险与行为观察辅助。
- 策略复盘保存会尝试请求 `https://43.134.3.158/api/reflect`，失败时自动本地保存。
- 生产审核前需在微信公众平台配置合法请求域名，并确保后端使用 HTTPS。

## 验证记录

- `npx tsc --noEmit --skipLibCheck`
- `npm run build:weapp`

两项均已通过。
