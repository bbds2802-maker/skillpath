# SkillPath

把学习目标变成课程计划，结合真实 YouTube 教程、页面内播放器、学习笔记与完成进度。

- [在线使用](https://bbds2802-maker.github.io/skillpath/)
- [Cloudflare 备用入口](https://skillpath-entry.pages.dev/app/)

## 2026-11-01 网页更新

采用 Figma RT / Soft ABS 组件库：米白 ABS 材质、氧化橙强调色、微凸按钮与浅凹输入槽。保留手机界面比例、课程日历、视频播放、笔记与进度功能。

联网前在设置中连接服务并完成访问验证。Groq 和 YouTube API 密钥由后端保管，访客无需输入。访问凭证最长两小时，不代表注册账号。

当前计划、笔记与完成状态保存在当前浏览器，不跨设备或域名同步；清除浏览器数据会删除本地记录。目前同时保留一份当前计划，创建新计划会先提示替换。未连接或服务失败时会明确显示本地大纲，不虚构视频。

在 iPhone 上使用 Safari 打开网页，可从分享菜单添加到主屏幕。视频播放受网络对 YouTube 的可达性及视频嵌入权限影响。

## 前端文件

`index.html`、`theme.css`、`web-session.js`、`web-api.js`、`web-ui.js`、`manifest.webmanifest`、`web-icon.png`、`youtube-player.html` 与 `assets/figma/` 构成当前网页。保留的历史 HTML 文件不是当前入口。

本次同步仅发布前端运行文件和说明，不包含运营密钥、本地备份、私有资料或云开发账号配置。后端沿用已部署的 Cloudflare 服务与访问验证、请求限额。

MIT license.
