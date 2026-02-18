---
title: "HTTP 状态码速查"
pubDate: 2024-05-10
description: "HTTP 状态码分类与含义速查"
category: "笔记"
---

# HTTP 状态码速查

## 状态码分类

| 范围 | 含义 |
|------|------|
| 1xx | 信息响应 |
| 2xx | 成功响应 |
| 3xx | 重定向 |
| 4xx | 客户端错误 |
| 5xx | 服务器错误 |

## 1xx - 信息响应

| 状态码 | 含义 |
|--------|------|
| 100 | Continue - 继续请求 |
| 101 | Switching Protocols - 切换协议 |
| 102 | Processing - 处理中 |

## 2xx - 成功响应

| 状态码 | 含义 |
|--------|------|
| 200 | OK - 请求成功 |
| 201 | Created - 创建成功 |
| 202 | Accepted - 已接受 |
| 204 | No Content - 无内容 |
| 206 | Partial Content - 部分内容 |

### 常用

```javascript
// 200 - 标准成功响应
res.status(200).json({ data: 'success' })

// 201 - 创建资源成功
res.status(201).json({ id: 1, ... })

// 204 - 删除成功，无返回内容
res.status(204).send()

// 206 - 断点续传
res.status(206).send(data)
```

## 3xx - 重定向

| 状态码 | 含义 |
|--------|------|
| 301 | Moved Permanently - 永久重定向 |
| 302 | Found - 临时重定向 |
| 303 | See Other - 查看其他位置 |
| 304 | Not Modified - 未修改（缓存） |
| 307 | Temporary Redirect - 临时重定向（保持方法） |
| 308 | Permanent Redirect - 永久重定向（保持方法） |

### 常用

```javascript
// 301 - 永久重定向（SEO 推荐）
res.redirect(301, '/new-url')

// 302 - 临时重定向
res.redirect(302, '/temp-url')

// 304 - 缓存
res.status(304)

// 307 - 临时重定向，POST 保持 POST
res.redirect(307, '/temp-url')
```

## 4xx - 客户端错误

### 400 - Bad Request

请求语法错误、无效请求

```javascript
// 参数错误
res.status(400).json({ error: 'Invalid parameter' })
```

### 401 - Unauthorized

需要认证

```javascript
// 未登录
res.status(401).json({ error: 'Please login' })

// 请求头格式
res.set('WWW-Authenticate', 'Bearer')
```

### 403 - Forbidden

权限不足

```javascript
// 无权限访问
res.status(403).json({ error: 'Access denied' })
// vs 401: 401 是未认证，403 是认证了但没权限
```

### 404 - Not Found

资源不存在

```javascript
// 资源未找到
res.status(404).json({ error: 'User not found' })
```

### 405 - Method Not Allowed

请求方法不支持

```javascript
// 只支持 GET，但用了 POST
res.set('Allow', 'GET')
res.status(405).json({ error: 'Method not allowed' })
```

### 408 - Request Timeout

请求超时

```javascript
res.status(408).json({ error: 'Request timeout' })
```

### 409 - Conflict

资源冲突

```javascript
// 重复创建
res.status(409).json({ error: 'Resource already exists' })
```

### 422 - Unprocessable Entity

请求格式正确但无法处理

```javascript
// 验证失败
res.status(422).json({
  errors: [{ field: 'email', message: 'Invalid format' }]
})
```

### 429 - Too Many Requests

请求过多（限流）

```javascript
res.set('Retry-After', '3600')
res.status(429).json({ error: 'Too many requests' })
```

## 5xx - 服务器错误

### 500 - Internal Server Error

服务器内部错误

```javascript
// 未知错误
res.status(500).json({ error: 'Internal server error' })
```

### 502 - Bad Gateway

网关错误

```javascript
// Nginx/代理服务器问题
res.status(502).json({ error: 'Bad gateway' })
```

### 503 - Service Unavailable

服务不可用

```javascript
// 维护中
res.set('Retry-After', '3600')
res.status(503).json({ error: 'Service unavailable' })
```

### 504 - Gateway Timeout

网关超时

```javascript
// 上游服务响应超时
res.status(504).json({ error: 'Gateway timeout' })
```

## 常用状态码速查

| 场景 | 状态码 |
|------|--------|
| 请求成功 | 200 |
| 创建成功 | 201 |
| 删除成功 | 204 |
| 参数错误 | 400 |
| 未认证 | 401 |
| 无权限 | 403 |
| 资源不存在 | 404 |
| 请求方法不支持 | 405 |
| 验证失败 | 422 |
| 请求过多 | 429 |
| 服务器错误 | 500 |
| 服务不可用 | 503 |
| 网关超时 | 504 |

## RESTful API 设计建议

```
GET    /users      → 200 获取列表
GET    /users/:id  → 200 获取单个
POST   /users      → 201 创建
PUT    /users/:id  → 200 更新
PATCH  /users/:id  → 200 部分更新
DELETE /users/:id  → 204 删除
```
