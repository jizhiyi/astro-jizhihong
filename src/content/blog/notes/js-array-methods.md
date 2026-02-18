---
title: "JavaScript 数组方法总结"
pubDate: 2024-03-08
description: "JavaScript 数组常用方法速查"
category: "笔记"
---

# JavaScript 数组方法总结

## 创建数组

```javascript
// 基础创建
const arr = [1, 2, 3]
const arr = new Array(3)        // [empty × 3]

// 静态方法
Array.of(1, 2, 3)               // [1, 2, 3]
Array.from('hello')             // ['h', 'e', 'l', 'l', 'o']
Array.from({ length: 3 })       // [undefined, undefined, undefined]
```

## 添加/删除元素

### 开头

```javascript
const arr = [1, 2, 3]

arr.unshift(0)      // 返回长度 4，arr = [0, 1, 2, 3]
arr.shift()        // 返回删除的元素 0，arr = [1, 2, 3]
```

### 结尾

```javascript
const arr = [1, 2, 3]

arr.push(4)        // 返回长度 4，arr = [1, 2, 3, 4]
arr.pop()          // 返回删除的元素 4，arr = [1, 2, 3]
```

### 中间

```javascript
const arr = [1, 2, 3]

arr.splice(1, 0, 'a')   // 插入，arr = [1, 'a', 2, 3]
arr.splice(1, 1, 'b')   // 替换，arr = [1, 'b', 3]
arr.splice(1, 1)        // 删除，arr = [1, 3]
```

## 遍历方法

### forEach

```javascript
[1, 2, 3].forEach((item, index, arr) => {
  console.log(item, index)
})
// 无返回值
```

### map

```javascript
[1, 2, 3].map(x => x * 2)  // [2, 4, 6]
```

### filter

```javascript
[1, 2, 3, 4].filter(x => x > 2)  // [3, 4]
```

### reduce

```javascript
[1, 2, 3].reduce((acc, cur) => acc + cur, 0)  // 6

// 展开数组
[[1, 2], [3, 4]].reduce((a, b) => a.concat(b))  // [1, 2, 3, 4]

// 统计出现次数
[1, 2, 2, 3].reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1
  return acc
}, {})  // {1:1, 2:2, 3:1}
```

### reduceRight

```javascript
// 从右到左
[[1, 2], [3, 4]].reduceRight((a, b) => a.concat(b))  // [3, 4, 1, 2]
```

### every

```javascript
[1, 2, 3].every(x => x > 0)  // true
[1, -1, 2].every(x => x > 0)  // false
```

### some

```javascript
[1, 2, 3].some(x => x > 2)   // true
[1, 2, 3].some(x => x > 5)   // false
```

### find / findIndex

```javascript
[1, 2, 3].find(x => x > 2)         // 3
[1, 2, 3].findIndex(x => x > 2)    // 2

// 找不到时
[1, 2].find(x => x > 5)            // undefined
[1, 2].findIndex(x => x > 5)       // -1
```

### flat / flatMap

```javascript
[[1, 2], [3, 4]].flat()           // [1, 2, 3, 4]

// 展平深度
[1, [2, [3, [4]]]].flat(3)        // [1, 2, 3, 4]
[1, [2, [3, [4]]]].flat(Infinity) // [1, 2, 3, 4]

// flatMap = map + flat
[1, 2, 3].flatMap(x => [x, x * 2])  // [1, 2, 2, 4, 3, 6]
```

## 查找方法

### indexOf / lastIndexOf

```javascript
[1, 2, 3, 2].indexOf(2)      // 1
[1, 2, 3, 2].lastIndexOf(2)  // 3
[1, 2, 3].indexOf(5)         // -1
```

### includes

```javascript
[1, 2, 3].includes(2)   // true
[1, 2, NaN].includes(NaN)  // true（能正确判断 NaN）
[1, 2, 3].includes(5)   // false
```

### find / findIndex

```javascript
[1, 2, 3].find(x => x > 1)      // 2
[1, 2, 3].findIndex(x => x > 1)  // 1
```

## 排序方法

### sort

```javascript
// 默认按字符串排序
[10, 2, 1].sort()   // [1, 10, 2]

// 正确排序
[10, 2, 1].sort((a, b) => a - b)  // [1, 2, 10]
[10, 2, 1].sort((a, b) => b - a)  // [10, 2, 1]

// 对象数组排序
[{n:1}, {n:3}, {n:2}].sort((a, b) => a.n - b.n)
```

### reverse

```javascript
[1, 2, 3].reverse()  // [3, 2, 1]
```

## 转换方法

### toString / toLocaleString

```javascript
[1, 2, 3].toString()    // "1,2,3"

[new Date()].toLocaleString()  // 本地日期字符串
```

### join

```javascript
[1, 2, 3].join('-')    // "1-2-3"
[1, 2, 3].join()       // "1,2,3"
```

### concat

```javascript
[1, 2].concat([3, 4])    // [1, 2, 3, 4]
[1, 2].concat(3, [4, 5]) // [1, 2, 3, 4, 5]
```

### slice

```javascript
[1, 2, 3, 4, 5].slice(1, 3)   // [2, 3]
[1, 2, 3, 4, 5].slice(-2)     // [4, 5]
[1, 2, 3].slice()             // 浅拷贝 [1, 2, 3]
```

## 其他方法

### fill

```javascript
[1, 2, 3].fill(0)           // [0, 0, 0]
[1, 2, 3].fill(0, 1, 2)     // [1, 0, 3]
new Array(3).fill(0)         // [0, 0, 0]
```

### copyWithin

```javascript
[1, 2, 3, 4, 5].copyWithin(0, 3)  // [4, 5, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(0, 2, 4) // [3, 4, 3, 4, 5]
```

### entries / keys / values

```javascript
[1, 2, 3].entries()  // 返回迭代器
[...arr.entries()]   // [[0,1], [1,2], [2,3]]

[1, 2, 3].keys()     // [0, 1, 2]
[1, 2, 3].values()  // [1, 2, 3]
```

## 静态方法

### Array.isArray

```javascript
Array.isArray([])     // true
Array.isArray({})    // false
```

## 常用技巧

### 判断数组

```javascript
Array.isArray(arr)
arr instanceof Array
Object.prototype.toString.call(arr) === '[object Array]'
```

### 数组去重

```javascript
// 方法1: Set
[1, 2, 2, 3].filter((v, i, arr) => arr.indexOf(v) === i)
[...new Set(arr)]

// 方法2: reduce
[1, 2, 2, 3].reduce((acc, cur) => {
  if (!acc.includes(cur)) acc.push(cur)
  return acc
}, [])

// 方法3: map + filter
const seen = new Map()
arr.filter(v => !seen.has(v) && seen.set(v, true))
```

### 打乱数组

```javascript
arr.sort(() => Math.random() - 0.5)
arr.sort(() => Math.random() - 0.5).sort(() => Math.random() - 0.5)
```

### 数组交并差

```javascript
// 交集
[1,2,3].filter(v => [2,3,4].includes(v))  // [2, 3]

// 并集
[...new Set([1,2,3].concat([2,3,4]))]  // [1,2,3,4]

// 差集
[1,2,3].filter(v => ![2,3,4].includes(v))  // [1]
```

### 生成数组

```javascript
// 生成 1-10
[...Array(10)].map((_, i) => i + 1)
Array.from({length: 10}, (_, i) => i + 1)
[...Array(10).keys()].map(x => x + 1)

// 生成随机数组
Array.from({length: 10}, () => Math.floor(Math.random() * 100))
```

### 分块

```javascript
function chunk(arr, size) {
  return Array.from({length: Math.ceil(arr.length / size)},
    (_, i) => arr.slice(i * size, i * size + size))
}
chunk([1,2,3,4,5], 2)  // [[1,2], [3,4], [5]]
```

### 分组

```javascript
function group(arr, key) {
  return arr.reduce((acc, cur) => {
    (acc[cur[key]] = acc[cur[key]] || []).push(cur)
    return acc
  }, {})
}
```
