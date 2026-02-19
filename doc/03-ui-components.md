# 基础 UI 组件创建计划

## 目标

创建博客的基础 UI 组件和布局。

## 需要创建的组件

| 组件       | 文件路径                       | 说明                              |
| ---------- | ------------------------------ | --------------------------------- |
| Header     | `src/components/Header.astro`  | 导航栏 - Logo、首页/分类/关于链接 |
| Footer     | `src/components/Footer.astro`  | 页脚 - 版权信息                   |
| BaseLayout | `src/layouts/BaseLayout.astro` | 更新基础布局 - 整合 Header/Footer |

## 页面布局结构

```
┌─────────────────────────────────┐
│           Header                │
│  Logo    首页  分类  关于        │
├─────────────────────────────────┤
│                                 │
│         Main Content            │
│                                 │
├─────────────────────────────────┤
│           Footer                │
│      © 2024 Author Name         │
└─────────────────────────────────┘
```

## 待办

- [x] 创建 `src/components/Header.astro`
- [x] 创建 `src/components/Footer.astro`
- [x] 更新 `src/layouts/BaseLayout.astro`
