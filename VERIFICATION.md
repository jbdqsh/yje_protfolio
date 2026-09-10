# 验收记录

## 最新调整：技术标签与省略展示（2026-09-11）

- 项目区介绍删除“四个项目，”前缀，保留其余说明与动态计数。
- 补全众安康、OBE、矿井通风的已提供技术栈；卡片单行省略，title 提供完整列表，详情不截断。论坛未提供技术说明，不虚构其技术栈。
- 技能区删除第 5、6 组，恢复双列四组；技能标签仅使用英文技术名，按用户要求加入 Milvus、Qdrant，未将它们写入真实项目成果。
- 未改动简历、原图与轮播；本次未执行浏览器视觉或交互复测。

## 最新变更：项目卡片与个人资料（2026-09-11）

- 首页项目改为双列卡片，640px 及以下单列；保留四张封面与原详情轮播，卡片展示简介、标签和详情入口。
- 技术能力扩展为六组、36 个技术与实践标签，新增项依据已有项目和简历资料整理。
- 首屏定位改为“JIAEN YAN / Java开发/AI全栈开发”，删除首屏右上角求职提示；个人 GitHub 更新为用户提供的地址。
- Astro 检查 0 errors、0 warnings、0 hints；原生 Astro 构建成功，9 个页面。Sites 环境识别为 portable 且 configured=false，保留现有工程；其构建包装脚本在本机 npm 路径解析失败后使用原项目构建入口完成。
- 静态产物检查确认：4 张项目卡片、4 个封面、6 组技能、正确 GitHub 和定位、无首屏 availability 元素。
- 简历 PDF 未改写，SHA-256 保持 `2F995D938E515872E379AC40E66150847EC1A7CDC2FEB6716323BB83F32FBE11`；保留原下载地址供本人替换。
- 本轮未运行浏览器截图或 Lighthouse；下方浏览器与评分结果均为此前版本，不能作为本轮卡片布局的复测结果。

## 历史变更：真实项目图片与固定导航（2026-09-10）

- 精选项目更新为 4 个真实案例，替换 AI 知识库概念案例；首页每项只渲染 1 张真实封面。
- 众安康详情含 4 张图、矿井通风含 2 张图；OBE、论坛各 1 张图，不显示无效轮播控件。论坛仅介绍截图可确认的功能。
- 顶部导航使用 sticky 定位；详情目录和锚点偏移同步适配导航高度。
- Astro 类型检查：0 errors、0 warnings、0 hints；构建成功，生成 9 个 HTML 页面及 33 个响应式 WebP 资源。
- 9 个页面在 375、768、1440 像素下共 27 组检查：无横向溢出、无浏览器异常；48 个站内链接及锚点有效。
- 轮播专项在 375、725、768、1440 像素下通过 173 项断言，覆盖图片数量、导航固定、锚点位置、缩略图、前后按钮、Home/End、原图访问、真实触屏滑动及无 JavaScript 降级。
- 原功能 17 项回归检查全部通过：移动导航、键盘、架构节点、邮箱复制及降级、简历下载、减少动画与无脚本阅读等。
- 已查看首页、OBE、横向管理界面与移动长图截图。原始验收结果：`output/browser-review-current.json`、`output/gallery-review-current.json`；截图：`output/playwright/gallery-*.png`、`output/playwright/sticky-header-725.png`。
- 本地移动端 Lighthouse 首页：Performance 100、Accessibility 100、Best Practices 100、SEO 63；LCP 0.9 秒、CLS 0。SEO 扣分来自本地预览主动禁止索引，未更改该保护策略。报告：`output/lighthouse-screenshots-home.html`。
- 众安康轮播详情页：Performance 100、Accessibility 100、Best Practices 100、SEO 66；LCP 1.1 秒、CLS 0.034。报告：`output/lighthouse-screenshots-gallery.html`。
- 含明文手机号的“服务员工单”图未复制到仓库或构建资源，原始资料未修改。公开版 PDF 保持原有两个已核实项目，本轮未重新生成 PDF。

以下为首次交付的历史验收记录，页面数量和 Lighthouse 正式配置测试分数不代表本轮更新后的测量结果。

---

验证时间：2026-09-10。环境：Windows、Node.js 24.19.0、Astro 7.3.2、Chrome、Lighthouse 13.4.1。

## 构建与代码

- Astro 检查：0 errors、0 warnings、0 hints。
- 生产构建：8 个 HTML 页面、robots.txt、sitemap.xml，成功生成。
- 依赖安装审计：0 vulnerabilities。
- 数据、文章、共享布局、项目封面、架构交互分别维护；首页样式拆成首屏、关于与技能、架构、笔记与联系四个文件。

## 浏览器验证

- 8 个页面分别在 375、768、1440 像素宽度下验证，共 24 组。均无横向溢出，页面只有一个 H1，具备独立标题与描述。
- 35 个站内链接与锚点有效；项目、笔记、PDF、分享图均可访问；不存在的地址返回 HTTP 404。
- 未发现浏览器 JavaScript 异常。截图保存在 `output/playwright/`；已复核首屏、项目封面、详情页、文章及移动端布局。
- 17 项交互检查全部通过：跳过导航、手机菜单打开/关闭、Esc 焦点恢复、菜单锚点跳转、五个架构节点的键盘操作、邮箱复制及失败降级、真实 PDF 下载、减少动画设置、概念项目标记、无 JavaScript 的导航和架构阅读。
- 原始结果：`output/browser-review.json`、`output/interaction-review.json`。

## 移动端 Lighthouse

使用独立构建目录 `output/production-check/`，仅通过本机 4322 端口访问，`SITE_URL=https://portfolio.test` 为保留测试域名，没有发布到外网。

| 指标           | 得分 |
| -------------- | ---: |
| Performance    |  100 |
| Accessibility  |  100 |
| Best Practices |  100 |
| SEO            |  100 |

- LCP：约 1.2 秒；CLS：0。
- 报告：`output/lighthouse-production.html`、`output/lighthouse-production.json`。
- 报告仍列出图形链接可访问名称的补充人工检查提示，以及本地静态服务器的缓存、请求依赖信息；四项类别评分均为 100。真实域名的网络与缓存配置可能影响上线后的结果。
- 最终 `dist/` 保留本地预览策略：`noindex, nofollow`、robots 禁止抓取、空 sitemap、不输出 canonical。因此本地预览的 SEO 分数会因主动禁止收录而下降，不应据此修改预览策略。
- 正式配置测试确认 sitemap 含首页、三个项目和三篇文章，共 7 个 URL；404 不进入 sitemap。

## 公开版 PDF

- 一页 A4，中文字体嵌入，已渲染查看中文、分页和版面。
- 保留教育、技能、两个真实项目和邮箱；移除电话、年龄、性别，未包含概念项目。
- 已提取 PDF 文本并检查元数据，核对公开资源和构建 HTML 不含原始电话。
- 原 PDF 未复制进项目；下载文件是依据公开数据重新生成的版本。
- 渲染预览：`output/pdf/resume-1.png`。

## 交付状态

本地网站已可预览，代码和静态产物完整。尚未对外部署；个人 GitHub、项目源码/演示地址等待提供，入口显示“暂未公开”。发布时设置真实 `SITE_URL` 后重新构建，按 README 完成域名配置。
