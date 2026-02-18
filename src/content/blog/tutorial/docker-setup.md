---
title: "Docker 入门教程"
pubDate: 2024-02-10
description: "Docker 基础概念和常用命令入门教程"
category: "教程"
---

# Docker 入门教程

本教程介绍 Docker 的基础概念和常用操作。

## 什么是 Docker

Docker 是一个容器化平台，可以将应用及其依赖打包成轻量级的容器。

### 核心概念

- **镜像（Image）**：模板，只读的
- **容器（Container）**：镜像的运行实例
- **仓库（Repository）**：存储镜像的地方

## 安装 Docker

### macOS

```bash
# 使用 Homebrew
brew install --cask docker

# 启动
open -a Docker
```

### Linux (Ubuntu)

```bash
# 安装
sudo apt update
sudo apt install docker.io

# 启动
sudo systemctl start docker
sudo systemctl enable docker
```

## 镜像操作

### 拉取镜像

```bash
# 拉取镜像
docker pull nginx:latest

# 拉取指定版本
docker pull node:18-alpine

# 查看本地镜像
docker images
```

### 删除镜像

```bash
# 删除镜像
docker rmi nginx:latest

# 强制删除
docker rmi -f nginx

# 删除未使用的镜像
docker image prune
```

### 构建镜像

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```

```bash
# 构建
docker build -t my-app:latest .
```

## 容器操作

### 运行容器

```bash
# 运行容器
docker run nginx

# 后台运行
docker run -d nginx

# 指定端口映射
docker run -d -p 8080:80 nginx
# 格式: -p 主机端口:容器端口

# 指定名称
docker run -d --name my-nginx nginx

# 挂载卷
docker run -d -v /host/path:/container/path nginx

# 环境变量
docker run -d -e MY_VAR=value nginx
```

### 查看容器

```bash
# 运行中的容器
docker ps

# 所有容器
docker ps -a

# 查看容器详情
docker inspect my-container

# 查看容器日志
docker logs my-container
docker logs -f my-container  # 实时
docker logs --tail 100 my-container  # 最后100行
```

### 容器操作

```bash
# 启动容器
docker start my-container

# 停止容器
docker stop my-container

# 重启容器
docker restart my-container

# 删除容器
docker rm my-container
docker rm -f my-container  # 强制删除

# 进入容器
docker exec -it my-container bash
docker exec -it my-container sh

# 查看容器资源
docker stats my-container
```

## Docker Compose

### 安装

```bash
# macOS/Windows 自带
# Linux 需要单独安装
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./data:/app/data
    depends_on:
      - redis
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    restart: unless-stopped

volumes:
  redis-data:
```

### 常用命令

```bash
# 启动
docker-compose up
docker-compose up -d  # 后台

# 停止
docker-compose down

# 查看日志
docker-compose logs -f

# 构建
docker-compose build

# 查看状态
docker-compose ps
```

## 实战示例

### Node.js 应用

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["node", "index.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine

volumes:
  postgres-data:
```

### 启动

```bash
# 开发环境
docker-compose up --build

# 生产环境
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 常用技巧

### 清理

```bash
# 停止并删除容器
docker-compose down

# 删除未使用的镜像
docker image prune -a

# 删除未使用的卷
docker volume prune

# 清理所有
docker system prune -a
```

### 调试

```bash
# 进入运行中的容器
docker exec -it container_name sh

# 查看日志
docker logs -f container_name

# 查看资源使用
docker stats

# 查看网络
docker network ls
```

### 数据拷贝

```bash
# 从容器拷贝到主机
docker cp container_name:/path/in/container /path/on/host

# 从主机拷贝到容器
docker cp /path/on/host container_name:/path/in/container
```

## 总结

本教程涵盖：
- Docker 基础概念
- 镜像操作
- 容器操作
- Docker Compose
- 实战示例

继续学习 Docker 的高级特性吧！
