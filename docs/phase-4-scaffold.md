---
phase: 4
title: 项目脚手架与核心框架
status: frozen
frozen_at: 2026-07-11
---

# Phase 4: 项目脚手架与核心框架

## 项目结构

- `astro.config.mjs` — Astro 配置（MDX, Sitemap, Tailwind, Shiki）
- `src/content.config.ts` — 四个 Content Collection 定义
- `src/layouts/BaseLayout.astro` — 基础布局（导航栏 + 页脚 + 暗色模式）
- `src/lib/constants.ts` — 站点常量
- `src/lib/utils.ts` — 工具函数
- `src/styles/global.css` — 全局样式 + Tailwind 设计令牌
- `src/pages/index.astro` — 首页 Hero
- `src/pages/about.astro` — 个人介绍页
- `src/pages/blog/rss.xml.ts` — 博客 RSS
- `src/pages/notes/rss.xml.ts` — 笔记 RSS

## 技术栈

| 包 | 用途 |
|---|---|
| astro ^7 | 静态站点生成器 |
| @astrojs/mdx | MDX 支持 |
| @astrojs/rss | RSS Feed 生成 |
| @astrojs/sitemap | Sitemap 自动生成 |
| tailwindcss + @tailwindcss/vite | 样式框架 |
| @tailwindcss/typography | 文章排版插件 |
| @lucide/astro | 图标组件库 |

## 已实现功能

- 四个 Content Collection（blog/notes/projects/docs），Astro 7 glob loader
- BaseLayout（SEO meta、Google Fonts、Sticky 导航栏、页脚社交图标、暗色模式切换）
- Tailwind CSS v4 自定义 @theme 令牌，对应 Phase 3 设计系统
- 亮色/暗色双模式（localStorage + 系统偏好）
- 交互过渡 150ms ease-out
- Shiki 双主题代码高亮（github-light/dark）
- 博客/笔记 RSS Feed 生成
- Sitemap 自动生成

## 验证结果

`npm run build` 通过，0 error。
生成页面：index, about, blog/rss.xml, notes/rss.xml, sitemap-index.xml。

## 待后续实现（Phase 5+）

内容详情页模板、列表页、文档侧边栏、首页聚合、跨内容引用、
成熟度标记组件、KaTeX 数学公式、GitHub Actions 部署、示例内容。
