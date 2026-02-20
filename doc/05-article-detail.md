# 文章详情页实现计划

## 目标

创建单篇文章详情页，展示博客文章的完整内容和元信息。

## 实现方案

使用 Astro 的动态路由 `[...slug].astro`，配合 Content Collections 的 `render()` 函数渲染 Markdown 内容。

## 文件变更

| 操作 | 文件路径                         |
| ---- | -------------------------------- |
| 新建 | `src/pages/blog/[...slug].astro` |

## 路由结构

| 文章                                            | URL                               |
| ----------------------------------------------- | --------------------------------- |
| `src/content/blog/tech/docker-microservices.md` | `/blog/tech/docker-microservices` |

## 待办

- [x] 创建 `src/pages/blog/[...slug].astro`
- [x] 获取文章数据并渲染
- [x] 展示文章元信息（标题、日期、分类）
- [x] 渲染 Markdown 内容
- [x] 添加返回链接
