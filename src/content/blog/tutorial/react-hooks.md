---
title: "React Hooks 进阶教程"
pubDate: 2024-05-15
description: "React Hooks 进阶技巧和最佳实践"
category: "教程"
---

# React Hooks 进阶教程

本教程介绍 React Hooks 的进阶技巧和最佳实践。

## 自定义 Hooks

### useDebounce

```typescript
import { useState, useEffect } from 'react'

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// 使用
function Search() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    // 搜索
    fetch(`/api/search?q=${debouncedQuery}`)
  }, [debouncedQuery])
}
```

### useLocalStorage

```typescript
import { useState, useEffect } from 'react'

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}

// 使用
function App() {
  const [name, setName] = useLocalStorage('name', '')
}
```

### useFetch

```typescript
import { useState, useEffect } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(data => setState({ data, loading: false, error: null }))
      .catch(error => {
        if (error.name !== 'AbortError') {
          setState({ data: null, loading: false, error })
        }
      })

    return () => controller.abort()
  }, [url])

  return state
}

// 使用
function UserList() {
  const { data, loading, error } = useFetch<User[]>('/api/users')

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data?.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}
```

### useInterval

```typescript
import { useEffect, useRef } from 'react'

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return

    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

// 使用
function Timer() {
  const [count, setCount] = useState(0)

  useInterval(() => {
    setCount(c => c + 1)
  }, 1000)
}
```

## 性能优化

### useMemo

```typescript
function ExpensiveComponent({ data, filter }: Props) {
  // 计算属性
  const filteredData = useMemo(() => {
    return data.filter(item => item.name.includes(filter))
  }, [data, filter])

  // 对象 memo
  const config = useMemo(() => ({
    threshold: 0.5,
    rootMargin: '10px'
  }), [])

  return <List data={filteredData} config={config} />
}
```

### useCallback

```typescript
function Parent() {
  const [count, setCount] = useState(0)

  // 函数 memo
  const handleClick = useCallback((id: number) => {
    console.log(id)
    setCount(c => c + 1)
  }, [])

  return <Child onClick={handleClick} />
}
```

### React.memo

```typescript
interface Props {
  name: string
  onClick: () => void
}

// 函数组件 memo
const Button = React.memo<Props>(({ name, onClick }) => {
  return <button onClick={onClick}>{name}</button>
})

// 自定义比较
const UserCard = React.memo<UserProps>(({ user }) => {
  return <div>{user.name}</div>
}, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id
})
```

### 虚拟列表

```typescript
import { useVirtualizer } from '@tanstack/react-virtual'

function VirtualList({ items }: { items: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  })

  return (
    <div ref={parentRef} style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: virtualRow.start,
              height: virtualRow.size,
            }}
          >
            {items[virtualRow.index]}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 状态管理

### useReducer

```typescript
interface State {
  count: number
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  )
}
```

### Context + useReducer

```typescript
// 创建 Context
const AppContext = createContext<{
  state: State
  dispatch: Dispatch<Action>
} | null>(null)

// Provider
function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// 使用
function SomeComponent() {
  const { state, dispatch } = useContext(AppContext)!
}
```

## 进阶技巧

### useImperativeHandle

```typescript
interface RefHandle {
  focus: () => void
  scrollTo: () => void
}

const Input = forwardRef<RefHandle, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    scrollTo: () => inputRef.current?.scrollIntoView()
  }))

  return <input ref={inputRef} />
})

// 使用
function Parent() {
  const inputRef = useRef<RefHandle>(null)

  return (
    <>
      <Input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </>
  )
}
```

### useDebugValue

```typescript
function useCustomHook(value: string) {
  // DevTools 中显示
  useDebugValue(value, v => v.toUpperCase())

  return value
}
```

### useId（React 18+）

```typescript
function FormField({ label }: { label: string }) {
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </div>
  )
}
```

## 常见问题

### 闭包陷阱

```typescript
function Counter() {
  const [count, setCount] = useState(0)

  // ❌ 错误：闭包中始终是 0
  useEffect(() => {
    const id = setInterval(() => {
      console.log(count)
    }, 1000)
    return () => clearInterval(id)
  }, []) // 空依赖

  // ✅ 正确：使用函数式更新
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  // ✅ 正确：添加依赖
  useEffect(() => {
    const id = setInterval(() => {
      console.log(count)
    }, 1000)
    return () => clearInterval(id)
  }, [count])
}
```

### 无限循环

```typescript
function App() {
  const [data, setData] = useState<Data>()

  // ❌ 错误：useEffect 依赖对象，导致无限循环
  useEffect(() => {
    fetchData().then(setData)
  }, [data]) // data 作为依赖

  // ✅ 正确
  useEffect(() => {
    fetchData().then(setData)
  }, []) // 空依赖
}
```

### useEffect 清理

```typescript
function App() {
  useEffect(() => {
    const handleResize = () => {}

    window.addEventListener('resize', handleResize)

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // ✅ 异步清理
  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      const data = await fetch('/api')
      if (!cancelled) {
        setData(data)
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [])
}
```

## 总结

本教程涵盖：
- 自定义 Hooks
- 性能优化
- 状态管理
- 进阶技巧
- 常见问题

掌握这些，成为 React Hooks 高手！
