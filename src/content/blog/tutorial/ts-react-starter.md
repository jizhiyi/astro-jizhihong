---
title: "TypeScript + React 项目搭建教程"
pubDate: 2024-01-05
description: "从零开始搭建 TypeScript + React 项目"
category: "教程"
---

# TypeScript + React 项目搭建教程

本教程将带你从零开始搭建一个 TypeScript + React 项目。

## 环境准备

确保安装了以下工具：

```bash
# 检查 Node.js 版本
node -v  # >= 18.0.0

# 检查 npm 版本
npm -v   # >= 8.0.0
```

## 创建项目

### 方式一：使用 Vite（推荐）

```bash
# 创建项目
npm create vite@latest my-app -- --template react-ts

# 进入目录
cd my-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 方式二：使用 CRA

```bash
# 创建项目
npx create-react-app my-app --template typescript

# 进入目录
cd my-app

# 启动
npm start
```

## 项目结构

```
my-app/
├── src/
│   ├── components/    # 组件
│   ├── pages/         # 页面
│   ├── hooks/         # 自定义 Hooks
│   ├── utils/         # 工具函数
│   ├── types/         # 类型定义
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## 配置 TypeScript

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 配置 Vite

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

## 编写代码

### App.tsx

```typescript
import { useState } from 'react'

interface User {
  id: number
  name: string
  email: string
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>用户列表</h1>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? '加载中...' : '获取用户'}
      </button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
```

## 添加样式

### 使用 CSS Modules

```css
/* App.module.css */
.container {
  padding: 20px;
}

.title {
  font-size: 24px;
  color: #333;
}
```

### 使用

```typescript
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>用户列表</h1>
    </div>
  )
}
```

## 添加路由

### 安装

```bash
npm install react-router-dom
```

### 使用

```typescript
// main.tsx
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

```typescript
// App.tsx
import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return <h1>首页</h1>
}

function About() {
  return <h1>关于</h1>
}

function App() {
  return (
    <nav>
      <Link to="/">首页</Link>
      <Link to="/about">关于</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}
```

## 状态管理

### 使用 Zustand（轻量级）

```bash
npm install zustand
```

```typescript
// store/useStore.ts
import { create } from 'zustand'

interface CounterStore {
  count: number
  increment: () => void
  decrement: () => void
}

const useStore = create<CounterStore>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}))

export default useStore
```

```typescript
// 使用
import useStore from './store/useStore'

function Counter() {
  const { count, increment, decrement } = useStore()

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
```

## 组件库

### 安装 Ant Design

```bash
npm install antd
```

```typescript
import { Button, DatePicker } from 'antd'

function App() {
  return (
    <div>
      <Button type="primary">Primary Button</Button>
      <DatePicker />
    </div>
  )
}
```

## 打包部署

### 构建

```bash
npm run build
```

### 预览

```bash
npm run preview
```

### 部署到 GitHub Pages

1. 安装 gh-pages：

```bash
npm install -D gh-pages
```

2. 添加脚本到 package.json：

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. 配置 vite.config.ts：

```typescript
export default defineConfig({
  base: '/your-repo-name/',
})
```

4. 部署：

```bash
npm run deploy
```

## 总结

本教程涵盖：
- 使用 Vite 创建项目
- TypeScript 配置
- Vite 别名配置
- 路由配置
- 状态管理
- 组件库使用
- 打包部署

继续扩展你的项目吧！
