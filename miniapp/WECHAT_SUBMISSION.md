# DreamLab 小程序交付说明

## 构建与导入

- 安装依赖：`npm install`
- 构建微信小程序：`npm run build:weapp`
- 微信开发者工具导入目录：`miniapp/dist`
- 当前构建产物：构建验证后以 `miniapp/dist` 为准

## 已实现页面

- 首页：`pages/index/index`
- 梦境解析工具：`pages/dream/index`
- 梦境结果：`pages/dream/result`
- 心理测评列表：`pages/assessments/index`
- 心理测评答题与结果：`pages/assessments/detail`
- 心理课程列表：`pages/courses/index`
- 课程详情与章节进度：`pages/courses/detail`
- 反思日志：`pages/reflect/index`
- 我的成长：`pages/profile/index`

## 数据与接口

- 课程体系已内置 100 门 DreamLab 心理学课程，覆盖梦境解析、心理学核心理论、疗愈工具、生活应用和前沿交叉。
- 测评题目保留静态数据，用于情绪、睡眠、人格、韧性和综合心理状态观察。
- 反思日志保存会尝试请求 `https://43.134.3.158/api/reflect`，失败时自动本地保存。
- 生产审核前需在微信公众平台配置合法请求域名，并确保后端使用 HTTPS。

## 验证记录

- `npx tsc --noEmit --skipLibCheck`
- `npm run build:weapp`

两项均已通过。
