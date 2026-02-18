---
title: "正则表达式入门教程"
pubDate: 2024-06-08
description: "正则表达式基础知识和常用模式"
category: "教程"
---

# 正则表达式入门教程

本教程介绍正则表达式的基础知识和常用模式。

## 基础语法

### 元字符

| 字符 | 含义 |
|------|------|
| `.` | 任意单个字符（除换行） |
| `\d` | 任意数字 [0-9] |
| `\D` | 任意非数字 |
| `\w` | 任意单词字符 [a-zA-Z0-9_] |
| `\W` | 任意非单词字符 |
| `\s` | 空白字符 |
| `\S` | 非空白字符 |
| `^` | 字符串开始 |
| `$` | 字符串结束 |

### 量词

| 字符 | 含义 |
|------|------|
| `*` | 0 次或多次 |
| `+` | 1 次或多次 |
| `?` | 0 次或 1 次 |
| `{n}` | n 次 |
| `{n,}` | n 次或更多 |
| `{n,m}` | n 到 m 次 |

### 字符类

```regex
[abc]      # a, b, c 中的任意一个
[^abc]     # 除了 a, b, c
[a-z]      # a 到 z
[A-Z]      # A 到 Z
[0-9]      # 0 到 9
```

### 分组和引用

```regex
(ab)       # 捕获组
(?:ab)     # 非捕获组
\1         # 引用第一个捕获组
```

### 断言

```regex
(?=...)    # 正向先行断言
(?!...)    # 负向先行断言
(?<=...)   # 正向后行断言
(?<!...)   # 负向后行断言
```

## JavaScript 中的使用

### 基本方法

```javascript
const regex = /pattern/flags

// test() - 测试是否匹配
/regex/.test('string')

// match() - 获取匹配结果
'string'.match(/regex/)
'string'.match(/regex/g)  // 全局匹配

// replace() - 替换
'string'.replace(/regex/, 'replacement')

// split() - 分割
'string'.split(/regex/)

// search() - 查找位置
'string'.search(/regex/)
```

### 标志（Flags）

```javascript
/g     // 全局匹配
/i     // 忽略大小写
/m     // 多行模式
/s     // 单行模式（. 匹配换行）
/u     // Unicode 模式
```

## 常用模式

### 验证类

```javascript
// 邮箱
/^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 手机号（中国大陆）
/^1[3-9]\d{9}$/

// URL
/https?:\/\/[\w\-.]+(:\d+)?(\/[\w\-./?%&=]*)?/

// 身份证号（中国）
/^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/

// IP 地址
/^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/

// 端口号
/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
```

### 提取类

```javascript
// 提取数字
'abc123def456'.match(/\d+/g)  // ['123', '456']

// 提取单词
'Hello World'.match(/\b\w+\b/g)  // ['Hello', 'World']

// 提取 HTML 标签
'<div><span>text</span></div>'.match(/<[^>]+>/g)

// 提取日期
'2024-01-15'.match(/\d{4}-\d{2}-\d{2}/)

// 提取中文
'hello世界'.match(/[\u4e00-\u9fa5]+/g)  // ['世界']
```

### 替换类

```javascript
// 去除空格
'  hello  world  '.replace(/\s+/g, ' ').trim()

// 替换敏感信息
'13812345678'.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')

// 驼峰转短横线
'helloWorld'.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)

// HTML 转义
const escapeHTML = str => str
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
```

### 匹配类

```javascript
// 密码强度（8位以上，含数字、字母）
/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/

// 强密码（8位以上，大小写，数字，特殊字符）
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// 用户名（字母开头，字母数字下划线）
/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/

// QQ 号
/^[1-9][0-9]{4,10}$/

// 微信号
/^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/

// 邮政编码（中国）
/^[1-9]\d{5}$/
```

## 实战示例

### 表单验证

```javascript
function validateForm(data) {
  const errors = {}

  if (!data.name || !/^[\u4e00-\u9fa5]{2,10}$/.test(data.name)) {
    errors.name = '请输入2-10个中文字符'
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = '请输入正确的邮箱地址'
  }

  if (!data.phone || !/^1[3-9]\d{9}$/.test(data.phone)) {
    errors.phone = '请输入正确的手机号'
  }

  if (!data.password || !/^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/.test(data.password)) {
    errors.password = '密码需要6-20位，包含字母和数字'
  }

  return errors
}
```

### 解析 URL

```javascript
function parseURL(url) {
  const pattern = /^(\w+):\/\/([^/:]+)(:\d+)?(\/.*)?$/
  const [, protocol, host, port, path] = url.match(pattern) || []

  return { protocol, host, port: port?.slice(1), path }
}

parseURL('https://example.com:8080/path?query=1')
// { protocol: 'https', host: 'example.com', port: '8080', path: '/path?query=1' }
```

### 解析时间

```javascript
function parseTime(timeStr) {
  const pattern = /(\d{1,2}):(\d{2})(?::(\d{2}))?/
  const [, hour, minute, second = 0] = timeStr.match(pattern).map(Number)

  return { hour, minute, second }
}

parseTime('14:30')  // { hour: 14, minute: 30, second: 0 }
```

### 提取函数名

```javascript
const code = `
function helloWorld() {
  return 'hello'
}

const foo = () => {}
`

// 提取函数声明
code.match(/(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:async\s*)?\(?)/g)

// 提取所有函数名
const functions = code.match(/(?:function\s+(\w+)|=>\s*function\s+(\w+))/g)
```

### 颜色转换

```javascript
// HEX 转 RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// RGB 转 HEX
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}
```

### Markdown 处理

```javascript
// 提取标题
const md = '# Hello\n## World\n### Test'
md.match(/^#{1,6}\s+.+$/gm)
// ['# Hello', '## World', '### Test']

// 提取链接
const link = '[Google](https://google.com)'
link.match(/\[([^\]]+)\]\(([^)]+)\)/)
// ['[Google](https://google.com)', 'Google', 'https://google.com']

// 提取代码块
const code = '```js\nconst a = 1\n```'
code.match(/```(\w+)?\n([\s\S]*?)```/)
```

## 常用技巧

### 贪婪 vs 非贪婪

```javascript
// 贪婪：匹配最多
'abcabc'.match(/a.*c/)  // ['abcabc']

// 非贪婪：匹配最少
'abcabc'.match(/a.*?c/)  // ['abc']

// 量词后加 ? 变为非贪婪
*? +? ?? {n,m}?
```

### 捕获组命名

```javascript
// 命名捕获组
const date = '2024-01-15'
const pattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
const { year, month, day } = date.match(pattern).groups
```

### 零宽断言

```javascript
// 正向先行：后面是 XXX
'hello'.match(/hello(?= world)/)  // ['hello']

// 负向先行：后面不是 XXX
'hello'.match(/hello(?! world)/)  // null

// 正向后行：前面是 XXX
'hello world'.match(/(?<=hello )world/)  // ['world']

// 负向后行：前面不是 XXX
'hi world'.match(/(?<!hello )world/)  // null
```

### 环视断言

```javascript
// 密码：必须包含数字和字母
/(?=.*\d)(?=.*[a-zA-Z])^[a-zA-Z0-9]{6,}$/

// 单词边界
/\bword\b/  // 匹配完整单词

// 邮箱验证（更严格）
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
```

## 工具推荐

### 在线工具
- regex101.com - 正则表达式测试
- regexr.com - 正则表达式学习
- debuggex.com - 正则可视化

### VS Code 插件
- Regex Previewer
- vscode-regex

## 总结

本教程涵盖：
- 基础语法
- JavaScript 中的使用
- 常用模式
- 实战示例
- 常用技巧

正则表达式需要多练习才能熟练掌握！
