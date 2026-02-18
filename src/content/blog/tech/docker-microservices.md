---
title: "Docker 微服务部署实战"
pubDate: 2024-04-05
description: "详细介绍如何使用 Docker 和 Docker Compose 部署微服务架构应用"
category: "技术"
---

# Docker 微服务部署实战

微服务架构已经成为现代应用开发的主流选择，它可以帮助我们将大型应用拆分为独立、可部署的服务单元。Docker 作为容器化技术的代表，为微服务部署提供了标准化、轻量级的解决方案。本文将详细介绍如何使用 Docker 和 Docker Compose 构建和部署微服务应用。

## 微服务架构概述

在深入实践之前，我们先了解一下微服务架构的基本概念。

### 什么是微服务

微服务是一种架构风格，它将应用程序构建为一组小型、自治的服务。每个服务：
- 围绕业务能力组织
- 可以独立部署和扩展
- 拥有自己的数据存储
- 通过轻量级 API 进行通信

### 微服务架构的优势

1. **独立部署**：每个服务可以独立部署，不影响其他服务
2. **技术多样性**：不同服务可以使用不同的技术栈
3. **可扩展性**：根据需求独立扩展特定服务
4. **故障隔离**：一个服务的问题不会影响整个系统
5. **快速迭代**：小团队可以快速开发、测试和部署单个服务

### 微服务架构的挑战

1. **分布式系统复杂性**：网络延迟、容错、事务管理
2. **数据一致性**：跨服务的数据同步问题
3. **运维复杂度**：多服务部署、监控、日志聚合
4. **服务间通信**：需要处理服务发现、负载均衡等

## 项目结构

我们将以一个典型的电商系统为例，展示微服务的组织结构：

```
ecommerce-platform/
├── user-service/          # 用户服务
│   ├── Dockerfile
│   ├── src/
│   │   ├── index.js
│   │   ├── routes.js
│   │   └── models/
│   ├── package.json
│   └── .env.example
├── order-service/         # 订单服务
│   ├── Dockerfile
│   ├── src/
│   │   ├── index.js
│   │   ├── routes.js
│   │   └── models/
│   ├── package.json
│   └── .env.example
├── product-service/       # 商品服务
│   ├── Dockerfile
│   ├── src/
│   │   ├── index.js
│   │   ├── routes.js
│   │   └── models/
│   ├── package.json
│   └── .env.example
├── notification-service/ # 通知服务
│   ├── Dockerfile
│   ├── src/
│   └── package.json
├── api-gateway/           # API 网关
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
├── database/              # 数据库配置
│   ├── postgres/
│   └── redis/
├── monitoring/            # 监控配置
│   ├── prometheus.yml
│   └── grafana/
├── docker-compose.yml
├── .env
└── README.md
```

## Dockerfile 最佳实践

编写高效的 Dockerfile 是微服务部署的关键。

### 多阶段构建

使用多阶段构建可以显著减小镜像体积：

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY --chown=node:node . .

# 构建
RUN npm run build

# 运行阶段
FROM node:18-alpine AS runner

WORKDIR /app

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# 从构建阶段复制产物
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./

# 切换到非 root 用户
USER nodejs

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "dist/main.js"]
```

### 优化镜像层

合理安排指令顺序，充分利用 Docker 的层缓存：

```dockerfile
# 变化不频繁的层放前面
FROM node:18-alpine

WORKDIR /app

# 先复制依赖文件并安装
COPY package*.json ./
RUN npm ci --only=production

# 再复制源代码
COPY . .

# 构建和运行放最后
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### 使用 .dockerignore

排除不必要的文件，减小构建上下文：

```
# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env*
*.md
dist
coverage
.vscode
.idea
.DS_Store
```

### 镜像安全最佳实践

```dockerfile
# 使用特定版本标签，不要使用 latest
FROM node:18.17.0-alpine3.18

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# 使用 node 用户运行
USER nodejs

# 设置只读文件系统（如果应用支持）
# USER node --readonly /app
```

## Docker Compose 编排

Docker Compose 是本地开发和测试微服务的有力工具。

### 基本配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  # 用户服务
  user-service:
    build: ./user-service
    container_name: user-service
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - DB_PORT=5432
      - REDIS_HOST=redis
    depends_on:
      - postgres
      - redis
    networks:
      - ecommerce-network
    restart: unless-stopped

  # 订单服务
  order-service:
    build: ./order-service
    container_name: order-service
    ports:
      - "3002:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - DB_PORT=5432
      - USER_SERVICE_URL=http://user-service:3000
    depends_on:
      - postgres
      - user-service
    networks:
      - ecommerce-network
    restart: unless-stopped

  # 商品服务
  product-service:
    build: ./product-service
    container_name: product-service
    ports:
      - "3003:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - DB_PORT=5432
    depends_on:
      - postgres
    networks:
      - ecommerce-network
    restart: unless-stopped

  # 通知服务
  notification-service:
    build: ./notification-service
    container_name: notification-service
    environment:
      - NODE_ENV=production
      - SMTP_HOST=smtp.example.com
      - SMTP_PORT=587
    networks:
      - ecommerce-network
    restart: unless-stopped

  # API 网关 (Nginx)
  api-gateway:
    build: ./api-gateway
    container_name: api-gateway
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - user-service
      - order-service
      - product-service
    networks:
      - ecommerce-network
    restart: unless-stopped

  # PostgreSQL 数据库
  postgres:
    image: postgres:15-alpine
    container_name: postgres
    environment:
      - POSTGRES_USER=ecommerce
      - POSTGRES_PASSWORD=changeme
      - POSTGRES_DB=ecommerce
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./database/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - ecommerce-network
    restart: unless-stopped

  # Redis 缓存
  redis:
    image: redis:7-alpine
    container_name: redis
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    ports:
      - "6379:6379"
    networks:
      - ecommerce-network
    restart: unless-stopped

networks:
  ecommerce-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:
```

### 环境变量配置

```bash
# .env
# 公共配置
COMPOSE_PROJECT_NAME=ecommerce
NODE_ENV=production

# 数据库
POSTGRES_USER=ecommerce
POSTGRES_PASSWORD=changeme_strong_password
POSTGRES_DB=ecommerce

# Redis
REDIS_PASSWORD=redis_password

# 服务配置
USER_SERVICE_PORT=3000
ORDER_SERVICE_PORT=3000
PRODUCT_SERVICE_PORT=3000

# 外部服务
SMTP_HOST=smtp.example.com
SMTP_USER=noreply@example.com
SMTP_PASSWORD=smtp_password
```

### 健康检查配置

```yaml
services:
  user-service:
    build: ./user-service
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    environment:
      - NODE_ENV=production

  postgres:
    image: postgres:15-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ecommerce"]
      interval: 10s
      timeout: 5s
      retries: 5
```

### 服务依赖与启动顺序

使用 `depends_on` 结合健康检查确保服务启动顺序：

```yaml
services:
  order-service:
    build: ./order-service
    depends_on:
      user-service:
        condition: service_healthy
      postgres:
        condition: service_healthy
```

## API 网关配置

Nginx 作为 API 网关，处理负载均衡、SSL 终止和请求路由。

```nginx
# nginx.conf
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    upstream user_service {
        server user-service:3000;
    }

    upstream order_service {
        server order-service:3000;
    }

    upstream product_service {
        server product-service:3000;
    }

    server {
        listen 80;
        server_name api.example.com;

        # 用户服务
        location /api/users/ {
            proxy_pass http://user_service/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # 订单服务
        location /api/orders/ {
            proxy_pass http://order_service/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # 商品服务
        location /api/products/ {
            proxy_pass http://product_service/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # 错误处理
        error_page 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }
}
```

## 监控与日志

### Prometheus 配置

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'user-service'
    static_configs:
      - targets: ['user-service:3000']
        labels:
          service: 'user-service'

  - job_name: 'order-service'
    static_configs:
      - targets: ['order-service:3000']
        labels:
          service: 'order-service'

  - job_name: 'product-service'
    static_configs:
      - targets: ['product-service:3000']
        labels:
          service: 'product-service'

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['host.docker.internal:9100']
```

### 日志聚合

```yaml
services:
  # 日志聚合
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.10.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data
    networks:
      - monitoring-network

  kibana:
    image: docker.elastic.co/kibana/kibana:8.10.0
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch
    networks:
      - monitoring-network

  # 日志收集器
  fluentd:
    build: ./monitoring/fluentd
    volumes:
      - ./monitoring/fluentd/conf:/fluentd/etc
      - /var/lib/docker/containers:/var/lib/docker/containers
    depends_on:
      - elasticsearch
    networks:
      - monitoring-network
```

## 部署命令

### 开发环境启动

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down
```

### 生产环境部署

```bash
# 构建镜像
docker-compose -f docker-compose.yml build

# 启动服务
docker-compose -f docker-compose.yml up -d

# 滚动更新
docker-compose -f docker-compose.yml up -d --build
docker-compose -f docker-compose.yml up -d --no-deps --build service-name
```

### 扩缩容

```bash
# 扩展服务实例
docker-compose up -d --scale order-service=3

# 缩减服务实例
docker-compose up -d --scale order-service=1
```

## 总结

使用 Docker 和 Docker Compose 部署微服务架构应用，可以实现：

1. **环境一致性**：开发、测试、生产环境保持一致
2. **快速部署**：简化部署流程，加快迭代速度
3. **资源隔离**：服务之间相互隔离，互不影响
4. **易于扩展**：根据需求灵活调整服务规模
5. **简化运维**：统一的日志、监控、网络配置

在实际项目中，还需要考虑：
- CI/CD 自动化流程
- 密钥和安全管理
- 服务发现机制
- 分布式追踪
- 灾难恢复策略

掌握这些技术和最佳实践，你将能够构建高效、可靠的微服务部署方案。
