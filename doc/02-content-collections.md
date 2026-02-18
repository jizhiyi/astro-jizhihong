# Content Collections 配置计划

## 目标

配置 Astro Content Collections，定义博客文章的 数据结构。

## 集合定义

- **集合名称**: `blog`
- **内容目录**: `src/content/blog/`
- **策略**: 统一使用 blog 集合，通过 category 区分文章分类
- **Loader**: 使用 glob loader 加载本地 Markdown 文件

## Loader 配置

```typescript
loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" });
```

| 配置项  | 说明                                                 |
| ------- | ---------------------------------------------------- |
| pattern | 匹配规则，`**/[^_]*.md` 表示不以 `_` 开头的 .md 文件 |
| base    | 内容目录路径                                         |

## 草稿文件处理

- 正式文章：`hello-world.md` → 会被加载
- 草稿文章：`_hello-world.md` → 会被忽略

## Schema 字段

| 字段        | 类型   | 必需 | 说明                      |
| ----------- | ------ | ---- | ------------------------- |
| title       | string | 是   | 文章标题                  |
| pubDate     | date   | 是   | 发布日期                  |
| description | string | 是   | 文章描述/摘要             |
| image       | string | 否   | 封面图片 URL              |
| category    | string | 否   | 分类（如 "life"、"tech"） |

## 已完成

- [x] 创建 `src/content.config.ts`
- [x] 定义 blog 集合的 schema
- [x] 使用 glob loader 配置
- [x] 验证配置正确性
