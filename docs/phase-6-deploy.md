---
phase: 6
title: 部署配置
status: frozen
frozen_at: 2026-07-11
---

# Phase 6: 部署配置

## 一、部署方案

| 决策项 | 选择 | 理由 |
|---|---|---|
| 部署平台 | GitHub Pages | 源码已在 GitHub，零额外成本 |
| 构建方式 | GitHub Actions | 自动化构建 + 部署，无需手动推送 dist |
| 部署目标 | 仓库 `Dokivot/Dokivot.github.io` | 用户/组织站点，域名即 `dokivot.github.io` |
| 触发条件 | push 到 main 分支 | 内容更新即自动部署 |

## 二、GitHub Actions Workflow

文件：`.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - uses: actions/deploy-pages@v4
```

## 三、部署流程

1. 开发者 push 到 `main` 分支
2. GitHub Actions 自动触发 workflow
3. Checkout 代码 → 安装 Node 22 → `npm ci` → `npm run build`
4. 构建产物（`dist/`）上传为 Pages artifact
5. 部署到 GitHub Pages

## 四、首次部署需手动操作

推送代码到 GitHub 后，在仓库 Settings → Pages → Build and deployment → Source 中选择 "GitHub Actions"。此操作仅需执行一次。

## 五、与 Astro 配置的关系

`astro.config.mjs` 中 `site` 设为 `https://dokivot.github.io`，确保 RSS feed、sitemap、OG 标签中的 URL 为绝对路径。

## 六、技术细节

- Node 版本：22（与 `package.json` 中 `engines.node >=22.12.0` 一致）
- 包管理器：npm（workflow 使用 `npm ci`）
- 构建输出：`dist/`（Astro 默认输出目录）
- 权限模型：OIDC token 认证，无需配置 Personal Access Token
