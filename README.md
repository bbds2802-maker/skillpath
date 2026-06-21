<div align="center">

# 📚 SkillPath

**AI-powered skill learning planner — distraction-free video curation and calendar scheduling**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Made with](https://img.shields.io/badge/built%20with-HTML%2FCSS%2FJS-orange.svg)]()
[![AI](https://img.shields.io/badge/AI-Groq%20%7C%20Llama%203.3-purple.svg)]()
[![Status](https://img.shields.io/badge/status-active-success.svg)]()

[Live Demo](https://bbds2802-maker.github.io/skillpath/) · [Report a Bug](../../issues) · [Request a Feature](../../issues)

</div>

---

## English

### Overview

SkillPath is a single-file, mobile-first web app that turns any skill you want to learn into a structured, scheduled learning plan. Instead of endlessly scrolling YouTube, SkillPath curates relevant lessons, schedules them on a calendar, and tracks your progress with streaks and completion stats.

### ✨ Features

- **AI-generated learning plans** — describe a skill, your level, and your weekly availability, and an AI model (via [Groq](https://console.groq.com), running Llama 3.3 70B) generates a complete multi-week lesson plan with specific, searchable video topics.
- **YouTube import** — paste a YouTube link or search a topic to pull in a real video (title, channel, thumbnail, duration) as a lesson, with optional AI-written summaries and practice tips.
- **Drag-and-drop calendar** — open any day to see its lessons, then drag a lesson by its handle onto another date to reschedule it. The calendar, home screen, and plan list all stay in sync automatically.
- **Daily focus mode** — a distraction-free player view with a built-in timer and focus reminders.
- **Progress tracking** — session counts, streaks, and a visual completion ring for every skill in progress.
- **Local-first & private** — all data and API keys are stored in your browser's `localStorage`. Nothing is sent anywhere except directly to the API providers you configure.

### 🚀 Getting Started

1. Open the [live app](https://bbds2802-maker.github.io/skillpath/) (or download `skillpath-app2.3.1.html` and open it in any modern browser).
2. Tap **⚙️ Settings** and add your API keys (both are free, see below).
3. Add your first skill and let SkillPath build a plan, or start importing lessons manually.

> **Note:** Because this app makes live network requests, it must be opened from a real `http://` / `https://` URL (e.g. GitHub Pages) or a local server — opening the raw `.html` file via `file://`, or previewing it inside a sandboxed environment, will block API calls with a "Failed to fetch" error.

### 🔑 API Keys

| Service | Used for | Get a free key |
|---|---|---|
| **Groq** | AI-generated lesson plans & summaries (Llama 3.3 70B) | [console.groq.com](https://console.groq.com) — no credit card required |
| **YouTube Data API v3** | Searching and importing real videos | [console.cloud.google.com](https://console.cloud.google.com) → enable "YouTube Data API v3" → create credentials |

Keys are entered once in **Settings** and stored only on your device.

### 🛠️ Tech Stack

- Vanilla HTML / CSS / JavaScript — no build step, no dependencies
- [Groq API](https://groq.com) (OpenAI-compatible `chat/completions` endpoint) for AI plan generation
- [YouTube Data API v3](https://developers.google.com/youtube/v3) for video search & metadata
- [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) for in-app playback

### 📁 Project Structure

This repo contains a few iterations of the app as standalone HTML files. The actively maintained version is:

```
skillpath-app2.3.1.html   ← current version (GitHub Pages serves this)
```

Earlier files (`app.html`, `app2.2.1.html`, `web.html.html`) are kept for history.

### 🤝 Contributing

Issues and pull requests are welcome. Since this is a single-file app, most changes are simple HTML/CSS/JS edits directly in `skillpath-app2.3.1.html`.

### 📄 License

Released under the [MIT License](LICENSE).

---

## 中文

### 项目简介

SkillPath 是一个单文件、移动端优先的网页应用，能把任何你想学的技能变成一份有结构、有日程安排的学习计划。不用再无止境地刷 YouTube — SkillPath 会帮你筛选相关课程、排进日历，并用连续打卡和完成度统计来追踪你的学习进度。

### ✨ 功能特点

- **AI 自动生成学习计划** — 输入想学的技能、当前水平、每周可用时间，AI 模型（通过 [Groq](https://console.groq.com) 调用 Llama 3.3 70B）会自动生成一份完整的多周课程计划，包含具体、可搜索的视频主题。
- **YouTube 导入** — 粘贴 YouTube 链接或直接搜索主题，把真实视频（标题、频道、缩略图、时长）导入为课程，还可以让 AI 自动生成课程摘要和练习小贴士。
- **可拖拽调整的日历** — 点开任意一天查看当天课程，按住课程右侧的拖拽手柄，直接拖到另一个日期即可改期。日历、首页、计划列表会自动同步更新。
- **专注学习模式** — 无干扰的播放界面，内置计时器和专注提醒。
- **进度追踪** — 每个进行中的技能都有学习次数、连续打卡天数和可视化完成度圆环。
- **本地优先、注重隐私** — 所有数据和 API key 都只保存在你浏览器的 `localStorage` 里，除了你自己配置的 API 服务商之外，不会发送给任何第三方。

### 🚀 快速开始

1. 打开 [在线体验地址](https://bbds2802-maker.github.io/skillpath/)（或者下载 `skillpath-app2.3.1.html`，用任意现代浏览器打开）。
2. 点击 **⚙️ 设置**，填入 API key（两个都是免费的，见下表）。
3. 添加第一个想学的技能，让 SkillPath 自动生成计划，或者手动导入课程。

> **注意：** 这个应用需要发起真实的网络请求，所以必须通过真实的 `http://` / `https://` 网址（比如 GitHub Pages）或本地服务器打开 —— 如果是直接双击 `.html` 文件（`file://` 方式打开），或者在沙箱预览环境里查看，API 请求会被拦截，报 "Failed to fetch" 错误。

### 🔑 API Key 申请

| 服务 | 用途 | 免费申请地址 |
|---|---|---|
| **Groq** | AI 生成学习计划与课程摘要（Llama 3.3 70B） | [console.groq.com](https://console.groq.com) — 无需信用卡 |
| **YouTube Data API v3** | 搜索和导入真实视频 | [console.cloud.google.com](https://console.cloud.google.com) → 启用 "YouTube Data API v3" → 创建凭据 |

key 只需要在 **设置** 里填一次，只存在你自己的设备上。

### 🛠️ 技术栈

- 原生 HTML / CSS / JavaScript — 无需构建工具，无第三方依赖
- [Groq API](https://groq.com)（OpenAI 兼容的 `chat/completions` 接口）用于 AI 计划生成
- [YouTube Data API v3](https://developers.google.com/youtube/v3) 用于视频搜索和元数据获取
- [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) 用于应用内播放

### 📁 项目结构

仓库里保留了这个应用的几个迭代版本，当前正在维护的版本是：

```
skillpath-app2.3.1.html   ← 当前版本（GitHub Pages 提供的就是这个）
```

更早的文件（`app.html`、`app2.2.1.html`、`web.html.html`）作为历史版本保留。

### 🤝 参与贡献

欢迎提 Issue 和 Pull Request。由于这是单文件应用，大部分改动直接在 `skillpath-app2.3.1.html` 里改 HTML/CSS/JS 即可。

### 📄 许可证

基于 [MIT 协议](LICENSE) 开源。
