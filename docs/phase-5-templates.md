---
phase: 5
title: 内容模板与页面实现
status: frozen
frozen_at: 2026-07-11
---

# Phase 5: 内容模板与页面实现

## 实现内容

### 共享组件（3 个）

| 组件 | 路径 | 功能 |
|---|---|---|
| MaturityBadge | src/components/MaturityBadge.astro | 成熟度标记（Sprout/Leaf/TreePine 图标 + 文字） |
| TagList | src/components/TagList.astro | 标签列表（# 前缀，可配 linkPrefix） |
| Card | src/components/Card.astro | 通用卡片（标题/描述/元信息，悬停边框高亮） |

### 列表页（4 个）

| 页面 | 路由 | 功能 |
|---|---|---|
| 博客列表 | /blog/ | 时间倒序，支持 ?tag= 筛选，过滤草稿 |
| 笔记列表 | /notes/ | 时间倒序，支持 ?tag= 和 ?maturity= 筛选 |
| 项目列表 | /projects/ | 卡片网格，按 order 排序，显示状态和 tech stack |
| 文档索引 | /docs/ | 左侧目录侧边栏 + 文档列表 |

### 详情页（4 个）

| 页面 | 路由 | 功能 |
|---|---|---|
| 博客详情 | /blog/[slug]/ | 标题/日期/标签/正文 + 底部相关笔记引用 |
| 笔记详情 | /notes/[slug]/ | 成熟度标记/创建更新日期/标签/正文 + 底部相关引用 |
| 项目详情 | /projects/[slug]/ | 描述/tech stack/状态/链接/正文 |
| 文档详情 | /docs/[slug]/ | 左侧目录侧边栏 + 标题/标签/正文 |

### 首页更新

| 区块 | 内容 |
|---|---|
| Hero | 渐变背景 + 标题/描述 + CTA 按钮 |
| Recent Posts | 最新 3 篇博客（Card 组件） |
| Featured Projects | 精选 3 个项目（非 archived 状态） |
| Recent Notes | 最近 5 条笔记（含 MaturityBadge） |

## 技术要点

- 所有列表/详情页使用 Astro `getStaticPaths` + `[...slug]` 动态路由
- 跨内容引用：博客详情页通过 `related_posts` 字段反向查询相关笔记
- 导航高亮：通过 `Astro.url.pathname.startsWith()` 检测当前页面
- 成熟度筛选：笔记列表页提供 seedling/budding/evergreen 三级过滤器

## 构建验证

构建成功，生成 6 个页面：

```
/index.html              — 首页（Hero + 内容聚合）
/about/index.html        — 个人介绍
/blog/index.html         — 博客列表
/notes/index.html        — 笔记列表（含成熟度筛选）
/projects/index.html     — 项目列表
/docs/index.html         — 文档索引
/blog/rss.xml            — 博客 RSS
/notes/rss.xml           — 笔记 RSS
/sitemap-index.xml       — Sitemap
```

0 error。空 collection 警告为预期行为，Phase 7 填充内容后消解。
