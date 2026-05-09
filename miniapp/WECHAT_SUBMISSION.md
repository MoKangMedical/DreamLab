# DreamLab 小程序交付说明

## 构建与导入

- 安装依赖：`npm install`
- 构建微信小程序：`npm run build:weapp`
- 微信开发者工具推荐导入目录：`miniapp`
  - `project.config.json` 已设置 `miniprogramRoot: "dist/"`
  - 首次上线前把 `project.config.json` 里的 `appid` 从 `touristappid` 改成微信公众平台的小程序 AppID
- 也可以手动导入构建产物目录：`miniapp/dist`
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

- 课程体系使用 GitHub Pages 静态数据源，包含 100 门 DreamLab 心理学课程，覆盖梦境解析、心理学核心理论、疗愈工具、生活应用和前沿交叉。
  - 课程索引：`https://MoKangMedical.github.io/DreamLab/data/course-index.json`
  - 单课详情：`https://MoKangMedical.github.io/DreamLab/data/courses/{id}.json`
- 测评题目保留静态数据，用于情绪、睡眠、人格、韧性和综合心理状态观察。
- 梦境解析和反思日志默认本地可用，不依赖裸 IP 后端，避免审核预览时报网络错误。
- 如需接回后端，在 `src/config/env.ts` 设置 `API_BASE` 为已备案、证书有效、已配置到微信公众平台的 HTTPS 域名。

## 上线前配置

1. 在微信公众平台获取小程序 AppID。
2. 修改 `miniapp/project.config.json`：
   - `"appid": "touristappid"` → `"appid": "你的 AppID"`
3. 在微信公众平台后台配置服务器域名：
   - `request` 域名至少包含：`https://MoKangMedical.github.io`
   - 如果启用后端 API，再加入你的 HTTPS API 域名。
4. 使用微信开发者工具导入 `miniapp`，点击“上传”，填写版本号与项目备注。
5. 到微信公众平台“版本管理”提交审核；审核通过后点击发布。

## 验证记录

- `npx tsc --noEmit --skipLibCheck`
- `npm run build:weapp`

两项均已通过。
