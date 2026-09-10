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

| 内容                                        | 位置                       |
| ------------------------------------------- | -------------------------- |
| 姓名、邮箱、GitHub、介绍、教育、技术分类    | `src/data/site.ts`         |
| 项目内容、真实/概念标记、可选源码和演示 URL | `src/data/projects.ts`     |
| 架构节点与说明                              | `src/data/architecture.ts` |
| 文章正文与元信息                            | `src/content/notes/*.md`   |
| 公开版简历资料                              | `src/data/resume.json`     |
| 颜色、字体、共享样式                        | `src/styles/global.css`    |

项目 `kind` 为 `real` 或 `concept`，概念项目会自动显示标记。可选 `github`、`demo` 应填写真实的 HTTPS URL；留空时展示“暂未公开”。个人 GitHub 在 `profile.github` 设置。

新增笔记时填写 `title`、`description`、`category`、`readingTime`、`order`，文件名即访问路径。示例：`src/content/notes/your-note.md` 对应 `/notes/your-note/`。

项目封面是原创 SVG 界面示意，不是生产系统截图。其中图表仅为示例数据；第三个 AI 项目是概念设计。未来引入真实截图时请使用有明确宽高和说明的图片，非首屏图片设置 `loading="lazy"`。

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
npm run audit:site -- http://127.0.0.1:4321 local
```

Lighthouse 需要本机 Chrome，可用 `CHROME_PATH` 指定浏览器路径。测试脚本只操作本地预览；`output/` 中的浏览器配置仅用于本次测试。`npm run format:check` 检查格式，`npm run format` 统一排版。两个 Playwright 脚本是 CLI 所需的函数表达式，不添加结尾分号。
