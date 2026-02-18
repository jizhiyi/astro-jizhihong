---
title: "TypeScript 进阶教程"
pubDate: 2024-04-20
description: "TypeScript 进阶技巧和最佳实践"
category: "教程"
---

# TypeScript 进阶教程

本教程介绍 TypeScript 的进阶技巧和最佳实践。

## 泛型

### 基础泛型

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg
}

// 泛型接口
interface Container<T> {
  value: T
  getValue(): T
}

// 泛型类
class Box<T> {
  private value: T

  constructor(value: T) {
    this.value = value
  }

  getValue(): T {
    return this.value
  }
}
```

### 约束泛型

```typescript
// 使用 extends 约束
interface Lengthwise {
  length: number
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

logLength('hello')      // OK
logLength([1, 2, 3])   // OK
logLength({ length: 1 }) // OK
logLength(123)          // Error

// 约束属性
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
```

### 条件类型

```typescript
// 基础条件类型
type IsString<T> = T extends string ? true : false

type A = IsString<string>  // true
type B = IsString<number> // false

// 提取返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type R = ReturnType<() => number>  // number
```

## 高级类型

### 交叉类型

```typescript
interface A {
  a: string
}

interface B {
  b: number
}

type C = A & B
const c: C = { a: 'hello', b: 123 }
```

### 联合类型

```typescript
type Status = 'pending' | 'success' | 'error'

function handleStatus(status: Status) {
  switch (status) {
    case 'pending':
      return '等待中'
    case 'success':
      return '成功'
    case 'error':
      return '错误'
  }
}
```

### 类型守卫

```typescript
// typeof
function padLeft(value: string | number, padding: number | string) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  return padding + value
}

// instanceof
class Fish {
  swim() {
    console.log('swim')
  }
}

class Bird {
  fly() {
    console.log('fly')
  }
}

function move(animal: Fish | Bird) {
  if (animal instanceof Fish) {
    animal.swim()
  } else {
    animal.fly()
  }
}

// 自定义类型守卫
interface Dog {
  kind: 'dog'
  bark(): void
}

interface Cat {
  kind: 'cat'
  meow(): void
}

function isDog(animal: Dog | Cat): animal is Dog {
  return animal.kind === 'dog'
}
```

### 类型映射

```typescript
// Readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Partial<T> = {
  [P in keyof T]?: T[P]
}

type Required<T> = {
  [P in keyof T]-?: T[P]
}

// 示例
interface User {
  name: string
  age: number
}

type ReadonlyUser = Readonly<User>
type PartialUser = Partial<User>
```

### 类型断言

```typescript
// as 断言
const value = something as string

// 尖括号断言
const value = <string>something

// 非空断言
const value = something!

// 双重断言
const value = something as unknown as string
```

## 装饰器

### 类装饰器

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}

@sealed
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}
```

### 方法装饰器

```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args)
    return original.apply(this, args)
  }

  return descriptor
}

class Calculator {
  @log
  add(a: number, b: number) {
    return a + b
  }
}
```

### 参数装饰器

```typescript
function logged(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`Parameter at index ${parameterIndex} in ${propertyKey}`)
}

class Person {
  greet(@logged name: string) {
    return `Hello, ${name}`
  }
}
```

## 模块系统

### 导出导入

```typescript
// 命名导出
export const name = 'hello'
export function greet() {}

// 默认导出
export default class {}

// 导入
import { name, greet } from './module'
import MyClass from './module'

// 类型导入
import type { User } from './types'
import { type User } from './types'
```

### namespace

```typescript
// MyMath.ts
namespace MyMath {
  export function add(a: number, b: number): number {
    return a + b
  }
}

// 使用
MyMath.add(1, 2)
```

## 声明文件

### 创建声明文件

```typescript
// global.d.ts
declare global {
  interface Window {
    MyPlugin: {
      init(): void
      destroy(): void
    }
  }
}

// 添加模块
declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}
```

### 三斜线指令

```typescript
/// <reference types="node" />
/// <reference path="./other.d.ts" />
```

## 工具类型

### 内置工具类型

```typescript
// Partial - 所有属性可选
type Partial<T>

// Required - 所有属性必需
type Required<T>

// Readonly - 所有属性只读
type Readonly<T>

// Pick - 选取属性
type Pick<T, K extends keyof T>

// Omit - 排除属性
type Omit<T, K>

// Record - 构造对象类型
type Record<K, T>

// Exclude - 排除类型
type Exclude<T, U>

// Extract - 提取类型
type Extract<T, U>

// NonNullable - 非空类型
type NonNullable<T>

// ReturnType - 返回类型
type ReturnType<T>

// Parameters - 参数类型
type Parameters<T>

// InstanceType - 实例类型
type InstanceType<T>
```

### 自定义工具类型

```typescript
// 深 Partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// DeepReadonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// Nullable
type Nullable<T> = { [P in keyof T]: T[P] | null }
```

## 配置优化

### tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  }
}
```

## 最佳实践

### 1. 使用 strict 模式

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 2. 避免 any

```typescript
// ❌
const data: any = getData()

// ✅
const data = getData() as DataType
```

### 3. 使用类型推断

```typescript
// ✅ 足够清晰
const name = 'hello'

// ❌ 多余
const name: string = 'hello'
```

### 4. 优先使用接口

```typescript
// ✅ 接口可以合并
interface User {
  name: string
}
interface User {
  age: number
}

// ❌ 类型别名不行
type User = { name: string }
type User = { age: number } // Error
```

### 5. 使用类型守卫

```typescript
// ❌
function isString(s: any): boolean {
  return typeof s === 'string'
}

// ✅
function isString(s: unknown): s is string {
  return typeof s === 'string'
}
```

## 总结

本教程涵盖：
- 泛型的使用
- 高级类型
- 装饰器
- 模块系统
- 声明文件
- 工具类型
- 最佳实践

熟练掌握这些，提升 TypeScript 水平！
