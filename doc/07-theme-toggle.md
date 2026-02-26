# 主题切换组件创建计划

## 目标

创建亮色/暗色主题切换功能，适配 Tailwind CSS v4 的主题系统。

## 技术方案

### 1. 主题机制

- 使用 Tailwind CSS v4 的 `.dark` 类切换主题
- 主题状态保存在 `localStorage` 中
- 支持系统主题偏好自动检测

### 2. 组件功能

#### ThemeToggle.astro

- 太阳/月亮图标切换按钮
- 主题初始化脚本（防止页面闪烁）
- 主题切换逻辑
- 系统主题偏好监听
- Astro View Transitions 支持

### 3. 集成到 Header

在 `src/components/Header.astro` 中引入 ThemeToggle 组件。

## 待办

- [x] 分析项目结构和现有主题 CSS
- [x] 创建 ThemeToggle.astro 组件
- [x] 集成到 Header.astro
