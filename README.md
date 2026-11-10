# SkillPath

把学习目标拆成课程，匹配相关教程，并记录学习笔记。

[在线使用](https://bbds2802-maker.github.io/skillpath/)

## 使用

1. 启动页会自动进入学习空间，选择技能并设置学习时间。
2. 生成计划、搜索教程时自动接入服务；如出现访问验证，按提示完成即可，无需配置 API。
3. 生成学习计划，进入课时查看教程、练习和记笔记。

支持 B站、YouTube 教程和小红书原帖链接。计划与笔记保存在当前浏览器；联网功能依赖已部署的后端，受网络和服务额度影响。

## 部署

静态文件已编译，可直接部署到 GitHub Pages。`index.html` 自动进入 `learn.html`，约一秒后显示应用。

启动页源码位于 `homepage/`，使用 React、Tailwind CSS 和 [Cult UI](https://www.cult-ui.com/) Texture Card（MIT 许可）；运行 `npm ci` 和 `npm run publish:local` 可重新构建。

API 密钥只保存在服务端。本仓库不包含个人计划、笔记、密钥、测试截图或依赖目录。联网功能需使用正式网页域名，本地文件仅供界面预览。
