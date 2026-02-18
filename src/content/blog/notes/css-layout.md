---
title: "CSS Flex 布局速查"
pubDate: 2024-04-12
description: "CSS Flex 布局常用属性速查"
category: "笔记"
---

# CSS Flex 布局速查

## 容器属性

### display

```css
.container {
  display: flex;     /* 块级 flex 容器 */
  display: inline-flex;  /* 行内 flex 容器 */
}
```

### flex-direction

```css
.container {
  flex-direction: row;           /* 默认：水平，起点在左 */
  flex-direction: row-reverse;    /* 水平，起点在右 */
  flex-direction: column;         /* 垂直，起点在上 */
  flex-direction: column-reverse; /* 垂直，起点在下 */
}
```

### flex-wrap

```css
.container {
  flex-wrap: nowrap;         /* 默认：不换行 */
  flex-wrap: wrap;            /* 换行，起点在上 */
  flex-wrap: wrap-reverse;    /* 换行，起点在下 */
}
```

### flex-flow

```css
/* 简写：flex-direction + flex-wrap */
.container {
  flex-flow: row wrap;
  flex-flow: column nowrap;
}
```

### justify-content

```css
.container {
  justify-content: flex-start;    /* 默认：起点对齐 */
  justify-content: flex-end;      /* 终点对齐 */
  justify-content: center;        /* 居中 */
  justify-content: space-between; /* 两端对齐 */
  justify-content: space-around;  /* 等距环绕 */
  justify-content: space-evenly; /* 等距（兼容性较差） */
}
```

### align-items

```css
.container {
  align-items: stretch;       /* 默认：拉伸填满 */
  align-items: flex-start;   /* 交叉轴起点 */
  align-items: flex-end;     /* 交叉轴终点 */
  align-items: center;        /* 居中 */
  align-items: baseline;      /* 基线对齐 */
}
```

### align-content

```css
.container {
  align-content: stretch;        /* 默认：拉伸 */
  align-content: flex-start;     /* 起点 */
  align-content: flex-end;       /* 终点 */
  align-content: center;         /* 居中 */
  align-content: space-between;  /* 两端 */
  align-content: space-around;   /* 环绕 */
}
```

## 项目属性

### flex-basis

```css
.item {
  flex-basis: auto;    /* 默认：内容宽度 */
  flex-basis: 100px;
  flex-basis: 30%;
  flex-basis: 3em;
}
```

### flex-grow

```css
.item {
  flex-grow: 0;    /* 默认：不扩展 */
  flex-grow: 1;    /* 扩展比例 */
  flex-grow: 2;    /* 相对其他项目 */
}
```

### flex-shrink

```css
.item {
  flex-shrink: 1;    /* 默认：可收缩 */
  flex-shrink: 0;    /* 不收缩 */
  flex-shrink: 2;    /* 收缩比例更大 */
}
```

### flex

```css
/* 简写：flex-grow flex-shrink flex-basis */
.item {
  flex: 0 1 auto;     /* 默认值 */
  flex: 1;            /* flex: 1 1 0% */
  flex: auto;          /* flex: 1 1 auto */
  flex: none;         /* flex: 0 0 auto */
}
```

### align-self

```css
.item {
  align-self: auto;      /* 继承容器 align-items */
  align-self: stretch;    /* 拉伸 */
  align-self: flex-start; /* 起点 */
  align-self: flex-end;   /* 终点 */
  align-self: center;     /* 居中 */
  align-self: baseline;   /* 基线 */
}
```

### order

```css
.item {
  order: 0;     /* 默认：0 */
  order: -1;    /* 排最前 */
  order: 1;     /* 排最后 */
}
```

## 常用布局

### 水平居中

```css
.container {
  display: flex;
  justify-content: center;
}
```

### 垂直居中

```css
.container {
  display: flex;
  align-items: center;
}
```

### 完全居中

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 两端对齐

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

### 等高列

```css
.container {
  display: flex;
}
/* 子元素自动等高 */
```

### 三列布局（左右固定，中间自适应）

```css
.container {
  display: flex;
}
.left, .right {
  width: 200px;
}
.center {
  flex: 1;
}
```

### 响应式换行

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  flex: 0 0 calc(33.333% - 20px);
  margin: 10px;
}
```

### Sticky Footer

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
```

### 导航菜单

```css
.nav {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}
```

### 卡片网格

```css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card {
  flex: 0 0 calc(25% - 15px);  /* 4列 */
}
@media (max-width: 768px) {
  .card {
    flex: 0 0 calc(50% - 10px);  /* 2列 */
  }
}
```

### 等距分布

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

### 底部对齐

```css
.container {
  display: flex;
  align-items: flex-end;
}
```

### 垂直居中内容

```css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

### 流式布局

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  flex: 1 1 300px;  /* 最小300px */
}
```

## 图解

```
justify-content (主轴)
flex-start  →  [item][item][item]  ← flex-end
center      →    [item][item][item]    ← 两端对齐
space-between →  [item]   [item]   [item]  ← space-around
```

```
align-items (交叉轴)
flex-start  →  item      ← flex-end
            item  center
            item
```

## 注意事项

1. **flex-basis vs width**：flex-basis 优先级更高
2. **flex-wrap 配合 align-content**：只有换行时 align-content 才生效
3. **flex: 1 vs flex: auto**：flex: 1 基于内容，flex: auto 基于内容+自身大小
4. **min-width/max-width**：flex 项目默认 min-width: auto，可能导致溢出
