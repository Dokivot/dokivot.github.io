---
phase: 3
title: 视觉设计与设计系统
status: frozen
frozen_at: 2026-07-11
revised_at: 2026-07-11
---

# Phase 3: 视觉设计与设计系统

## 一、设计方向：学术极简（Academic Minimalist）

以学术论文排版为精神内核——理性、克制，以排版为视觉骨架。
在保持学术极简核心的前提下，允许克制的装饰性元素：微渐变、快速过渡动画、
图标辅助识别、社交链接。装饰始终服务于功能和可读性，不喧宾夺主。

## 二、色彩系统

### 亮色模式（Light）

| 令牌 | 色值 | 用途 |
|---|---|---|
| `--color-bg` | `#FFFFFF` | 页面底色 |
| `--color-bg-secondary` | `#F8FAFC` (slate-50) | 代码块、引用块底色 |
| `--color-bg-tertiary` | `#F1F5F9` (slate-100) | 卡片底色、表格斑马纹 |
| `--color-text` | `#0F172A` (slate-900) | 正文 |
| `--color-text-secondary` | `#475569` (slate-600) | 辅助文字、日期、元信息 |
| `--color-text-tertiary` | `#94A3B8` (slate-400) | 禁用态、占位符 |
| `--color-accent` | `#4F46E5` (indigo-600) | 链接、强调、选中态 |
| `--color-accent-hover` | `#4338CA` (indigo-700) | 链接悬停 |
| `--color-border` | `#E2E8F0` (slate-200) | 分割线、边框 |
| `--color-border-light` | `#F1F5F9` (slate-100) | 轻量分割 |

### 暗色模式（Dark）

| 令牌 | 色值 | 用途 |
|---|---|---|
| `--color-bg` | `#0F172A` (slate-900) | 页面底色 |
| `--color-bg-secondary` | `#1E293B` (slate-800) | 代码块、引用块底色 |
| `--color-bg-tertiary` | `#334155` (slate-700) | 卡片底色 |
| `--color-text` | `#E2E8F0` (slate-200) | 正文 |
| `--color-text-secondary` | `#94A3B8` (slate-400) | 辅助文字 |
| `--color-text-tertiary` | `#64748B` (slate-500) | 禁用态、占位符 |
| `--color-accent` | `#818CF8` (indigo-400) | 链接、强调 |
| `--color-accent-hover` | `#A5B4FC` (indigo-300) | 链接悬停 |
| `--color-border` | `#334155` (slate-700) | 分割线、边框 |
| `--color-border-light` | `#1E293B` (slate-800) | 轻量分割 |

### 成熟度标记色彩（双模式共用）

| 标记 | 色值 | 说明 |
|---|---|---|
| 🌱 Seedling | `#65A30D` (lime-600) | 笔记：碎片化记录 |
| 🌿 Budding | `#D97706` (amber-600) | 草稿：结构完整未精修 |
| 🌳 Evergreen | `#4F46E5` (indigo-600) | 成文：可对外引用 |

## 三、字体系统

| 令牌 | 字体栈 | 用途 |
|---|---|---|
| `--font-heading` | `'Source Serif 4', Georgia, serif` | 标题 H1-H4 |
| `--font-body` | `'Inter', -apple-system, sans-serif` | 正文、UI 文本 |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', monospace` | 代码块、行内代码 |

### 字体大小与行高

| 层级 | 字号 | 行高 | 字重 | 用途 |
|---|---|---|---|---|
| `text-hero` | 2.5rem (40px) | 1.2 | 700 | 首页标题 |
| `text-h1` | 2rem (32px) | 1.3 | 700 | 页面标题 |
| `text-h2` | 1.5rem (24px) | 1.4 | 600 | 二级标题 |
| `text-h3` | 1.25rem (20px) | 1.5 | 600 | 三级标题 |
| `text-h4` | 1.125rem (18px) | 1.5 | 600 | 四级标题 |
| `text-body` | 1rem (16px) | 1.75 | 400 | 正文 |
| `text-body-sm` | 0.875rem (14px) | 1.6 | 400 | 辅助信息、元数据 |
| `text-code` | 0.875rem (14px) | 1.6 | 400 | 行内代码与代码块 |
| `text-caption` | 0.75rem (12px) | 1.5 | 400 | 说明文字、脚注 |

### 文章内排版规则

- 正文段落之间间距：1.5em（约 24px）
- 标题与正文之间间距：标题前 2em，标题后 0.75em
- 列表项间距：0.5em
- 引用块左边框：3px solid `--color-accent`，左内边距 1rem
- 行内代码：`--color-bg-secondary` 底色，`--color-accent` 文字色，圆角 3px，内边距 0.125em 0.375em

## 四、间距系统

基准单位：4px（0.25rem），使用 4 的倍数构建所有间距。

| 令牌 | 值 | 用途 |
|---|---|---|
| `space-1` | 0.25rem (4px) | 最小间距 |
| `space-2` | 0.5rem (8px) | 紧凑间距 |
| `space-3` | 0.75rem (12px) | 元素内间距 |
| `space-4` | 1rem (16px) | 默认间距 |
| `space-6` | 1.5rem (24px) | 段落间距 |
| `space-8` | 2rem (32px) | 区块间距 |
| `space-12` | 3rem (48px) | 大区块间距 |
| `space-16` | 4rem (64px) | 页面区块间距 |
| `space-24` | 6rem (96px) | 首页 hero 区域间距 |

## 五、布局系统

| 令牌 | 值 | 用途 |
|---|---|---|
| `--width-content` | 65ch (~680px) | 文章正文最大宽度 |
| `--width-wide` | 85ch (~900px) | 宽内容（含侧栏注释） |
| `--width-container` | 72rem (1152px) | 页面容器最大宽度 |
| `--width-nav` | 同 `--width-container` | 导航栏内容宽度 |

## 六、组件样式规范

### 首页 Hero

- 背景：双层叠加
  1. 底色：从 `--color-bg` 到 `--color-accent` 的 3% 透明度渐变（`linear-gradient(180deg, ...)`）
  2. 纹理：SVG 噪声纹理覆盖层（`feTurbulence` + `feColorMatrix`），透明度 3%-4%，叠加模式 `mix-blend-mode: overlay`
- 纹理在亮色模式下几乎不可见，在暗色模式下微不可察——仅提供纸张般的质感
- 装饰区域仅限 Hero 区块，不影响下方内容
- 内容区域（标题、副标题）为纯色底色，保持可读性
- 标题上方放置一个装饰性 Lucide 图标（`Code2`），48px，颜色为 `--color-accent` 的 30% 透明度，居中显示
  - 该图标仅为装饰，无交互行为，`aria-hidden="true"`
- CTA 按钮下方放置社交链接图标组：
  - 图标：GitHub（`Github`）、Twitter/X（`Twitter`）、Google Scholar（`GraduationCap`）、Email（`Mail`）、RSS（`Rss`）
  - 尺寸：18px
  - 颜色：`--color-text-tertiary`，悬停 `--color-accent`，过渡 150ms ease-out
  - 间距：1.25rem
  - 水平居中排列，与 CTA 按钮间距 `space-4`
- 聚合区块标题（Recent Posts / Featured Projects / Recent Notes）左侧各带对应导航图标（16px，`--color-accent`）
  - Recent Posts → `FileText`
  - Featured Projects → `FolderGit2`
  - Recent Notes → `StickyNote`

### 导航栏

- 高度：3.5rem (56px)
- 固定在页面顶部（sticky）
- 底色：`--color-bg` + `backdrop-filter: blur(8px)`，底部 1px 边框 `--color-border-light`
- 当前页面入口：`--color-accent` 文字色
- 每个导航入口前带 16px Lucide 图标，图标与文字间距 0.375rem
- 图标颜色继承文字色，悬停时同步过渡

### 导航栏图标映射

| 入口 | Lucide 图标 |
|---|---|
| Blog | `FileText` |
| Notes | `StickyNote` |
| Projects | `FolderGit2` |
| Docs | `BookOpen` |
| About | `User` |

### 卡片（项目列表、笔记列表）

- 底色：`--color-bg-tertiary`
- 圆角：4px（无阴影，仅边框 `--color-border-light`）
- 悬停：边框变为 `--color-border`，过渡 150ms ease-out
- 内边距：`space-6`

### 链接

- 默认：`--color-accent`，无下划线，过渡 150ms ease-out
- 悬停：`--color-accent-hover`，出现下划线，过渡 150ms ease-out
- 文章内链接：始终带下划线（与正文区分）
- 已访问：不改变样式

### 代码块

- 底色：`--color-bg-secondary`
- 语法高亮主题：亮色用 `github-light`，暗色用 `github-dark`
- 圆角：4px
- 内边距：`space-4`
- 字体大小：`text-code`

### 公式（KaTeX）

- 行内公式：与正文保持相同的字号和行高
- 块级公式：居中显示，上下各 `space-4` 间距

### 成熟度标记

- 显示为小型圆角标签，带对应 Lucide 图标
- 底色为该标记色值的 10% 透明度
- 文字色为该标记色值
- 字体大小：`text-caption`

| 标记 | Lucide 图标 |
|---|---|
| 🌱 Seedling | `Sprout` |
| 🌿 Budding | `Leaf` |
| 🌳 Evergreen | `TreePine` |

### 标签（Tags）

- 显示为小型文本链接
- 文字色：`--color-text-secondary`
- 悬停：`--color-accent`，过渡 150ms ease-out
- 前置 `#` 符号
- 无底色、无边框

### 社交链接

- 使用 Lucide 品牌图标，尺寸 18px
- 颜色：`--color-text-secondary`，悬停 `--color-accent`，过渡 150ms ease-out
- 图标间距：1rem
- 出现在页脚和 About 页面

**页脚社交图标**（最小集）：

| 平台 | Lucide 图标 |
|---|---|
| GitHub | `Github` |
| Email | `Mail` |
| RSS | `Rss` |

**About 页面扩展集**（在页脚基础上增加）：

| 平台 | Lucide 图标 |
|---|---|
| Twitter / X | `Twitter` |
| Google Scholar | `GraduationCap` |

## 七、响应式断点

| 断点 | 最小宽度 | 对应设备 |
|---|---|---|
| `sm` | 640px | 大屏手机 |
| `md` | 768px | 平板竖屏 |
| `lg` | 1024px | 平板横屏 / 小笔记本 |
| `xl` | 1280px | 桌面 |

核心规则：
- 正文区在移动端占满屏幕宽度（减去 `space-4` 两侧内边距）
- 导航栏在移动端（< 768px）收起为汉堡菜单
- 项目卡片在移动端由多列变为单列
- 首页 Hero 渐变在移动端保持不变

## 八、交互规范

- 所有可交互元素（链接、按钮、卡片、图标）使用 `transition: 150ms ease-out`，过渡属性：`color`、`border-color`、`background-color`、`opacity`
- 文章正文区域（博客/笔记/文档详情页）无任何动画
- 暗色模式切换使用瞬时过渡（不拖尾）

### 首页入场动画

- 聚合区块（Recent Posts / Featured Projects / Recent Notes）在滚动进入视口时触发一次性 fade-in + 微上移动画：
  - `opacity: 0 → 1`，`transform: translateY(8px) → translateY(0)`
  - 持续时间：600ms，缓动函数：`ease-out`
  - 通过 Intersection Observer 触发，`threshold: 0.1`（区块 10% 可见时触发）
  - 仅触发一次（触发后移除 observer），不重复播放
  - 无 JS 环境下降级为直接显示（`opacity: 1`），不影响可访问性
  - Hero 区块不使用入场动画（始终可见）

## 九、图标库

- 统一使用 Lucide Icons（`lucide-astro` 包）
- 导航图标：16px
- 社交图标：18px
- 成熟度图标：14px
- 图标仅作为视觉辅助，所有交互区域必须有对应的文本或 aria-label

## 十、不包含的元素

以下元素明确不出现在设计中：

- 无阴影（box-shadow），仅用边框表达层级
- 无评论区、无点赞数、无阅读量显示
- 文章正文区域无任何动画
- 卡片、按钮、导航链接无 transform 动画（缩放、位移）
