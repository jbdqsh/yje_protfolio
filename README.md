# 严加恩 · 个人作品集

暖白与墨绿的中文编辑式作品集，使用 Astro、TypeScript 和原生 CSS。页面与文章在构建时生成静态 HTML，无数据库或后端服务。

## 本地运行

使用 Node.js 22.12+（推荐 Node.js 24 LTS）和 npm。

```sh
npm ci
npm run dev
```

开发地址以终端输出为准，默认是 `http://127.0.0.1:4321`。

```sh
npm run check
npm run build
npm run preview
```

如果运行环境不允许 Astro 写入用户配置目录，可设置 `ASTRO_TELEMETRY_DISABLED=1`。PowerShell：`$env:ASTRO_TELEMETRY_DISABLED = '1'`。

## 更新内容

| 内容                                     | 位置                       |
| ---------------------------------------- | -------------------------- |
| 姓名、邮箱、GitHub、介绍、教育、技术分类 | `src/data/site.ts`         |
| 项目顺序与导出入口                       | `src/data/projects.ts`     |
| 各项目文案、图片序列、可选源码和演示 URL | `src/data/projects/*.ts`   |
| 真实项目图片                             | `src/assets/projects/`     |
| 架构节点与说明                           | `src/data/architecture.ts` |
| 文章正文与元信息                         | `src/content/notes/*.md`   |
| 公开版简历资料                           | `src/data/resume.json`     |
| 颜色、字体、共享样式                     | `src/styles/global.css`    |

项目 `kind` 为 `real` 或 `concept`，概念项目会自动显示标记。可选 `github`、`demo` 应填写真实的 HTTPS URL；留空时展示“暂未公开”。个人 GitHub 在 `profile.github` 设置。

新增笔记时填写 `title`、`description`、`category`、`readingTime`、`order`，文件名即访问路径。示例：`src/content/notes/your-note.md` 对应 `/notes/your-note/`。

当前展示四个真实项目：众安康、教学质量与 OBE 分析、矿井智能通风管理、Yojex 论坛。原 AI 知识库概念案例不再展示。论坛目前只有首页截图，因此只介绍可见功能，不推断技术栈、开发职责或成果指标。

每个项目单独维护一个数据文件，类型定义在 `src/data/projects/types.ts`。`images` 是非空图片序列，每项包含导入的图片、标题、替代文字与说明。第一张自动作为首页唯一封面；详情展示完整序列。新增或调整封面只需要调整数据顺序，不必修改页面组件。

众安康展示 4 张图片，通风管理展示 2 张；OBE 和论坛各 1 张。多图使用原生滚动吸附轮播，支持触屏、缩略图、前后按钮、键盘方向键及 Home/End，不自动播放。单图不显示切换控件。无 JavaScript 时仍可滚动和打开原图。图片在构建时生成响应式 WebP，非首屏图片延迟加载；原图入口用于查看细节，不通过裁切或拉伸伪造界面。

素材源来自用户提供的个人项目资料，原文件未改动。众安康的“服务员工单”图含有明文手机号，未复制进仓库或构建资源；将来加入前需先生成脱敏版本并检查原图。公开版 PDF 仍保留原先核实过的两个项目，本轮图片更新不自动改写简历。

## 公开版简历与分享图

现有 PDF 已生成并可直接下载，无须安装 Python 才能启动网站。原始简历未复制到仓库；公开版去掉了电话、年龄与性别，只包含真实项目。

重新生成需 Python、reportlab、Pillow 及中文 TTF/TTC 字体：

```sh
python -m pip install reportlab Pillow
python scripts/generate-media.py --font "C:/Windows/Fonts/msyh.ttc"
```

输出位于 `public/resume-jiaen-yan.pdf` 和 `public/og-cover.png`。更新简历资料后需重新执行；其他系统请用 `--font` 指定自己的中文字体。生成脚本中的分享图文案可单独调整。

## SEO 与部署到 Vercel

1. 把代码放入自己的 GitHub 仓库，在 Vercel 导入项目，选择 Astro 预设。
2. Node.js 选择 24，构建命令 `npm run build`，输出目录 `dist`。
3. 在环境变量设置 `SITE_URL` 为真实的 HTTPS 站点根地址，例如自己的 Vercel 正式域名或自定义域名；设置后重新构建。
4. 绑定域名后同步更新 `SITE_URL`，检查 canonical、Open Graph URL、`/sitemap.xml` 和 `/robots.txt`。

无 `SITE_URL` 时用于本地/临时预览：所有 HTML 设置 `noindex, nofollow`，robots 禁止抓取，sitemap 保持空集合，省略 canonical。不要为预览环境填入虚假的正式域名。正式地址配置后，首页、项目及文章自动进入 sitemap，404 始终禁止索引。

网站没有运行时 API；联系按钮使用邮件与浏览器剪贴板。剪贴板不可用时会提示并选中邮箱以便手动复制。移动导航支持 Esc 关闭，架构说明支持键盘与无 JavaScript 阅读。

## 验证产物

类型检查和构建用上述命令。浏览器截图、PDF 渲染预览、Lighthouse 报告位于未纳入版本控制的 `output/` 目录。实际验证结果见 `VERIFICATION.md`。

浏览器验收脚本通过 Playwright CLI 运行，先启动本地预览：

```sh
npx playwright-cli -s=portfolio open http://127.0.0.1:4321 --browser chrome
npx playwright-cli -s=portfolio run-code --filename scripts/browser-review.js
npx playwright-cli -s=portfolio run-code --filename scripts/interaction-review.js
npx playwright-cli -s=portfolio run-code --filename scripts/gallery-review.js
npm run audit:site -- http://127.0.0.1:4321 local
```

Lighthouse 需要本机 Chrome，可用 `CHROME_PATH` 指定浏览器路径。测试脚本只操作本地预览；`output/` 中的浏览器配置仅用于本次测试。`npm run format:check` 检查格式，`npm run format` 统一排版。Playwright 脚本是 CLI 所需的函数表达式，不添加结尾分号。
