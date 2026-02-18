---
title: "TypeScript 5.0 新特性详解"
pubDate: 2024-01-15
description: "深入了解 TypeScript 5.0 带来的全新特性，包括泛型参数修饰符、const 断言增强等"
category: "技术"
---

# TypeScript 5.0 新特性详解

TypeScript 5.0 是一个重大版本更新，带来了许多令人兴奋的新特性。本文将详细介绍这些新功能，帮助你更好地理解和使用这个版本。

## 泛型参数修饰符

TypeScript 5.0 引入了泛型参数修饰符，这是自泛型推出以来最重要的改进之一。

### const 修饰符

现在可以在泛型参数中使用 `const` 关键字，这使得类型推断更加精确：

```typescript
function createArray<T extends const>(arr: T[]): T[] {
    return arr;
}

// 之前：string[]
// 现在：readonly ["a", "b", "c"]
const result = createArray(["a", "b", "c"]);
```

### 泛型参数的默认值

5.0 增强了泛型参数的默认类型支持，使得创建灵活的可复用组件更加方便：

```typescript
interface Repository<T, ID = string> {
    getById(id: ID): Promise<T>;
    getAll(): Promise<T[]>;
    create(item: T): Promise<T>;
    update(id: ID, item: Partial<T>): Promise<T>;
    delete(id: ID): Promise<void>;
}
```

## 性能优化

TypeScript 5.0 在编译速度和内存使用方面都有显著提升。

### 增量编译优化

新的构建系统使用了更高效的缓存机制，大型项目的编译时间减少了 30%-50%。

### 内存占用降低

通过优化内部数据结构，TypeScript 5.0 的内存占用比 4.x 版本降低了约 20%。

## 新的配置选项

### verbatimModuleSyntax

这个新选项确保导入和导出的类型被正确处理：

```typescript
import type { Interface } from './types';
import { value } from './values';
```

### moduleResolution

新增了 `bundler` 模块解析策略，专门为打包工具优化。

## 装饰器增强

TypeScript 5.0 完全实现了装饰器提案的第三阶段：

```typescript
function logged<T extends (...args: any[]) => any>(
    target: T,
    context: ClassMethodDecoratorContext
) {
    return function (...args: Parameters<T>) {
        console.log(`Calling ${String(context.name)}`);
        return target.apply(this, args);
    };
}

class Calculator {
    @logged
    add(a: number, b: number) {
        return a + b;
    }
}
```

## 总结

TypeScript 5.0 带来了许多激动人心的新特性，从泛型增强到性能优化，从新的配置选项到装饰器支持。这些特性使得 TypeScript 更加强大和易用。建议开发团队尽快升级体验这些新功能。
