# Astro Blog

基于 Astro + Tailwind CSS 的个人博客。

## 技术栈

- Astro 5.0
- Tailwind CSS
- Astro Content Collections

## 项目结构

```
src/
├── components/        # UI 组件
├── content/blog/      # 博客文章
├── layouts/          # 布局组件
├── pages/            # 页面路由
└── styles/          # 全局样式
```

## 开发命令

| 命令           | 说明           |
| -------------- | -------------- |
| `pnpm dev`     | 启动开发服务器 |
| `pnpm build`   | 构建生产版本   |
| `pnpm preview` | 预览生产版本   |

## 文档

详细开发文档见 `doc/` 目录：

- [开发策略](./doc/01-development-strategy.md)
- [Content Collections 配置](./doc/02-content-collections.md)
- [基础 UI 组件](./doc/03-ui-components.md)
