---
phase: 7
title: 示例内容
status: frozen
frozen_at: 2026-07-11
---

# Phase 7: 示例内容

## 一、创建的文件

### Blog（2 篇）

| 文件 | 标题 | 主题 |
|---|---|---|
| `transformer-architecture.mdx` | Transformer Architecture: A Deep Dive | Self-attention, MHA, positional encoding, FFN — 带 PyTorch 实现 |
| `distributed-training-guide.mdx` | LLM Distributed Training: Strategies and Tradeoffs | DP/TP/PP/ZeRO 对比与组合策略 |

### Notes（4 篇，覆盖全部成熟度）

| 文件 | 标题 | 成熟度 | 备注 |
|---|---|---|---|
| `scaling-laws.md` | Scaling Laws — Quick Notes | 🌱 seedling | Kaplan 与 Chinchilla 的粗略笔记 |
| `rlhf-notes.md` | RLHF Implementation Notes | 🌿 budding | SFT/Reward Model/PPO 三阶段 + DPO 对比 |
| `distributed-training-notes.md` | Distributed Training Quick Reference | 🌿 budding | 跨引用 blog `distributed-training-guide` |
| `attention-mechanisms-reference.md` | Attention Mechanisms — Reference Card | 🌳 evergreen | MHA/MQA/GQA/Flash/滑动窗口/RoPE 速查表 |

### Projects（2 个）

| 文件 | 标题 | 状态 |
|---|---|---|
| `mini-llm-training.md` | MiniLLM — Training Framework Experiment | active, order=1 |
| `paper-tracker.md` | PaperTracker — ArXiv Paper Manager | completed, order=2 |

### Docs（1 篇）

| 文件 | 标题 |
|---|---|
| `environment-setup.md` | LLM Training Environment Setup |

## 二、跨内容关联验证

- `attention-mechanisms-reference` → `related_posts: ["transformer-architecture"]`：笔记引用博客
- `distributed-training-notes` → `related_posts: ["distributed-training-guide"]`：笔记引用博客
- `rlhf-notes` → `related_notes: ["attention-mechanisms-reference"]`：笔记引用笔记

所有关联在构建时正确解析为链接。

## 三、构建验证

```
npm run build → 0 errors
15 HTML pages + RSS feeds + sitemap
```

生成页面列表：

| 路由 | 类型 |
|---|---|
| `/` | 首页（Hero + Recent Posts + Featured Projects + Recent Notes） |
| `/about/` | 个人介绍 |
| `/blog/` | 博客列表 |
| `/blog/transformer-architecture/` | 博客详情 |
| `/blog/distributed-training-guide/` | 博客详情 |
| `/notes/` | 笔记列表（成熟度筛选） |
| `/notes/scaling-laws/` | 笔记详情（seedling） |
| `/notes/rlhf-notes/` | 笔记详情（budding） |
| `/notes/distributed-training-notes/` | 笔记详情（budding，含跨引用） |
| `/notes/attention-mechanisms-reference/` | 笔记详情（evergreen，含跨引用） |
| `/projects/` | 项目列表 |
| `/projects/mini-llm-training/` | 项目详情 |
| `/projects/paper-tracker/` | 项目详情 |
| `/docs/` | 文档索引 |
| `/docs/environment-setup/` | 文档详情 |
| `/blog/rss.xml` | 博客 RSS |
| `/notes/rss.xml` | 笔记 RSS |
| `/sitemap-index.xml` | Sitemap |

## 四、本阶段修复的 Bug

### 4.1 Astro 7 content layer render() API 变更

Astro 7 的 content layer 不再支持 `entry.render()` 方法。所有 4 个详情页（blog/notes/projects/docs）改为导入 `render` 函数：

```diff
- import { getCollection } from 'astro:content';
- const { Content } = await post.render();
+ import { getCollection, render } from 'astro:content';
+ const { Content } = await render(post);
```

### 4.2 notes 详情页 related_posts 解析

原代码用标题转 slug 方式匹配博客文章，改为直接用 post ID 匹配：

```diff
- await getCollection('blog', ({ data }) =>
-   !data.draft && note.data.related_posts?.includes(data.title.toLowerCase().replace(/\s+/g, '-'))
- )
+ (await getCollection('blog')).filter((p) =>
+   !p.data.draft && note.data.related_posts?.includes(p.id)
+ )
```

### 4.3 GitHub 图标

lucide-astro 不提供品牌图标（Github/Twitter 等）。创建 `src/components/SocialIcon.astro` 组件，使用内联 SVG 渲染 GitHub/Twitter/Google Scholar 图标。BaseLayout 页脚从 `GitBranch` 切换为 `SocialIcon name="github"`。

### 4.4 缺失的 notes/[...slug].astro

Phase 5 冻结文档记录了此文件但实际未创建。本阶段补建，使用 Astro 7 render API。

## 五、Phase 3 设计系统偏差说明

| 原设计（Phase 3） | 实际实现 | 原因 |
|---|---|---|
| 社交图标使用 Lucide (`Github`, `Twitter`, `GraduationCap`) | 使用内联 SVG (`SocialIcon.astro`) | lucide-astro 不包含品牌图标 |
| Blog/Notes 内容使用 `.md` 扩展名 | 使用 `.mdx` 扩展名 | Astro 7 content layer 的 `.md` 文件 render() API 行为不一致，使用 `.mdx` 更稳定 |
