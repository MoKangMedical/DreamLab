# DreamLab 小程序交付说明

## 构建与导入

- 安装依赖：`npm install`
- 构建微信小程序：`npm run build:weapp`
- 微信开发者工具导入目录：`miniapp/dist`
- 当前构建产物：约 `580K`，共 `50` 个文件

## 已实现页面

- 首页：`pages/index/index`
- 梦境解析：`pages/dream/index`
- 梦境结果：`pages/dream/result`
- 心理测评列表：`pages/assessments/index`
- 心理测评答题与结果：`pages/assessments/detail`
- 课程列表：`pages/courses/index`
- 课程详情与章节进度：`pages/courses/detail`
- 人生思考：`pages/reflect/index`
- 个人中心：`pages/profile/index`

## 数据与接口

- 课程与测评题目已内置静态数据，保证无后端时可完整预览。
- 人生思考保存会尝试请求 `https://43.134.3.158/api/reflect`，失败时自动本地保存。
- 生产审核前需在微信公众平台配置合法请求域名，并确保后端使用 HTTPS。

## 验证记录

- `npx tsc --noEmit --skipLibCheck`
- `npm run build:weapp`

两项均已通过。
