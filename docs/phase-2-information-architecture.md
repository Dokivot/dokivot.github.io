---
phase: 2
title: 信息架构与路由设计
status: frozen
frozen_at: 2026-07-11
---

# Phase 2: 信息架构与路由设计

## 一、站点结构（方案 A：首页作为内容枢纽）

```
/
├── /               → 首页（聚合入口：最新博文 + 精选项目 + 最近笔记）
├── /blog/          → 博客列表（时间倒序，支持标签筛选）
│   └── /blog/[slug]/
├── /notes/         → 笔记列表（支持按标签/成熟度筛选）
│   └── /notes/[slug]/
├── /projects/      → 项目列表（卡片网格，按 order 排序）
│   └── /projects/[slug]/
├── /docs/          → 文档（左侧目录树 + 正文内容）
│   └── /docs/[...slug]/
└── /about/         → 个人介绍
```

全局导航栏：Blog / Notes / Projects / Docs / About，五个等权入口。

## 二、路由设计

| 路由 | 页面类型 | 说明 |
|---|---|---|
| `/` | 首页聚合 | 展示最新 3 篇博客、精选 3 个项目、最近更新的 5 条笔记 |
| `/blog/` | 列表页 | 时间倒序，支持 `?tag=xxx` 筛选 |
| `/blog/[slug]/` | 详情页 | 单篇博客正文 |
| `/notes/` | 列表页 | 支持 `?tag=xxx&maturity=xxx` 筛选 |
| `/notes/[slug]/` | 详情页 | 单条笔记正文，显示成熟度标记和相关引用 |
| `/projects/` | 列表页 | 卡片网格，按 order 字段排序 |
| `/projects/[slug]/` | 详情页 | 项目详情（背景、架构、难点、链接） |
| `/docs/` | 列表/索引页 | 文档目录索引 |
| `/docs/[...slug]/` | 详情页 | 单篇文档，左侧目录树导航 |
| `/about/` | 静态页 | 个人介绍 |

## 三、内容 Collection Schema

### Blog

```yaml
title: string              # 文章标题
date: Date                 # 发布日期
description: string        # 列表页摘要
tags: string[]             # 标签
draft: boolean             # true 时构建忽略
og_image?: string          # Open Graph 社交分享图
```

### Notes

```yaml
title: string              # 笔记标题
created: Date              # 创建日期
updated: Date              # 最后修改日期（体现迭代）
maturity: "seedling" | "budding" | "evergreen"
tags: string[]
related_notes?: string[]   # 引用其他笔记的 slug
related_posts?: string[]   # 引用博客文章的 slug
```

### Projects

```yaml
title: string              # 项目名称
description: string        # 简短描述
tech_stack: string[]       # 技术栈
repo_url?: string          # 仓库链接
demo_url?: string          # 演示链接
status: "active" | "completed" | "archived"
order: number              # 排序权重（数值越小越靠前）
cover_image?: string       # 封面图
```

### Docs

```yaml
title: string              # 文档标题
order: number              # 目录排序权重
tags: string[]             # 标签
```

## 四、跨内容关联

博客与笔记之间支持双向引用，通过 frontmatter 中的 `related_notes` / `related_posts` 字段声明。
构建时 Astro 将 slug 引用解析为实际链接，渲染在详情页底部。这是纯静态方案，无需运行时查询。

关联规则：
- 笔记可引用相关博客（`related_posts`）和其他笔记（`related_notes`）
- 博客可引用相关笔记（`related_notes`）
- 引用是单向声明的，但详情页会展示双向关系（通过构建时反向索引实现）

## 五、导航设计

- **全局导航栏**：固定在页面顶部，包含 Logo/名称 + 五个入口链接 + 可选的主题切换按钮
- **文档侧边栏**：仅在 `/docs/` 路径下出现，按 order 排序的目录树
- **面包屑**：博客和笔记详情页显示 `Home > Blog > 文章标题`
- **页脚**：极简，仅版权信息和 RSS 订阅链接

## 六、RSS 与 SEO

- 博客和笔记各自生成独立的 RSS Feed（`/blog/rss.xml` 和 `/notes/rss.xml`）
- 所有内容页面生成标准 Open Graph meta 标签
- 自动生成 `sitemap.xml`
- 博客和笔记的 `[slug]` 应使用英文 slug，便于 URL 可读性和 SEO
