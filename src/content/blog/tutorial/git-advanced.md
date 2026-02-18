---
title: "Git 进阶教程"
pubDate: 2024-03-15
description: "Git 进阶技巧和工作流"
category: "教程"
---

# Git 进阶教程

本教程介绍 Git 的进阶技巧和工作流。

## 分支管理

### 分支策略

```
main/master  →  生产分支，只接受合并
develop      →  开发分支，日常开发
feature/*    →  功能分支
bugfix/*     →  Bug 修复分支
release/*    →  发布分支
hotfix/*     →  热修复分支
```

### 创建分支

```bash
# 创建并切换
git checkout -b feature/login

# 基于远程分支创建
git checkout -b feature/login origin/develop

# 创建分支（不切换）
git branch feature/login
```

### 合并分支

```bash
# 合并分支
git checkout main
git merge feature/login

# 不用 fast-forward（保留分支历史）
git merge --no-ff feature/login

# 压缩合并（合并为一个提交）
git merge --squash feature/login
git commit -m "Feature: login"
```

### 删除分支

```bash
# 删除本地分支
git branch -d feature/login
git branch -D feature/login  # 强制删除

# 删除远程分支
git push origin --delete feature/login
```

## 变基（Rebase）

### 基本变基

```bash
# 变基到主分支
git checkout feature/login
git rebase develop

# 解决冲突后继续
git add .
git rebase --continue

# 放弃变基
git rebase --abort
```

### 交互式变基

```bash
# 修改最近 3 个提交
git rebase -i HEAD~3
```

交互式命令：
```
pick   →  使用提交
reword →  修改提交信息
edit   →  暂停以便修改
squash →  合并到上一个提交
drop   →  删除提交
```

### 保持整洁

```bash
# 定期变基，保持线性历史
git pull --rebase origin develop

# 别名配置
git config --global alias.rb "rebase"
git config --global alias.co "checkout"
```

## 储藏（Stash）

### 基本使用

```bash
# 储藏当前修改
git stash

# 储藏并添加消息
git stash save "WIP: working on login"

# 查看储藏列表
git stash list

# 应用储藏（保留储藏）
git stash apply

# 应用并删除储藏
git stash pop

# 删除储藏
git stash drop
git stash clear  # 清空所有
```

### 高级用法

```bash
# 储藏未跟踪文件
git stash -u

# 从储藏创建分支
git stash branch new-branch

# 只储藏部分文件
git stash push -m "message" file1 file2

# 查看储藏内容
git stash show
git stash show -p  # 详细内容
```

## 子模块（Submodule）

### 添加子模块

```bash
# 添加子模块
git submodule add https://github.com/user/repo.git libs/repo

# 初始化子模块
git submodule init

# 克隆包含子模块的仓库
git clone --recursive
```

### 更新子模块

```bash
# 更新所有子模块
git submodule update --recursive

# 在子模块中更新
cd libs/repo
git fetch
git checkout main
cd -
git add libs/repo
git commit -m "Update submodule"
```

## 钩子（Hooks）

### 常用钩子

```bash
# .git/hooks/

# pre-commit: 提交前检查
# commit-msg: 提交信息检查
# pre-push: 推送前检查
```

### 示例：ESLint 钩子

```bash
#!/bin/sh
npm run lint
if [ $? -ne 0 ]; then
  echo "Lint failed, commit rejected"
  exit 1
fi
```

### Husky

```bash
# 安装
npm install husky --save-dev

# 初始化
npx husky init

# 添加钩子
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```

## 高级操作

### 查找问题

```bash
# 查看某行代码的最后修改
git blame file.txt

# 查看文件的历史
git log -p file.txt

# 查看两个分支的差异
git log main..feature
git diff main..feature

# 找打问题提交的 commit
git bisect start
git bisect bad
git bisect good <commit>
git bisect reset  # 结束
```

### 重写历史

```bash
# 修改最后一次提交
git commit --amend

# 修改提交信息
git rebase -i HEAD~3
# 将 pick 改为 reword

# 删除敏感数据
git filter-branch --force --tree-filter \
  'rm -f password.txt' HEAD --all
git push --force --all
```

### Cherry-pick

```bash
# 挑选单个提交
git cherry-pick <commit-id>

# 挑选多个提交
git cherry-pick commit1 commit2

# 挑选并继续
git cherry-pick -n <commit-id>  # 不自动提交
```

## Git Flow 工作流

### 安装

```bash
# macOS
brew install git-flow

# Linux
apt-get install git-flow
```

### 初始化

```bash
git flow init
# 全部回车使用默认值
```

### 功能开发

```bash
# 开始新功能
git flow feature start login

# 完成功能
git flow feature finish login
```

### 发布

```bash
# 开始发布
git flow release start 1.0.0

# 完成发布
git flow release finish 1.0.0
```

### 热修复

```bash
# 开始热修复
git flow hotfix start fix-name

# 完成热修复
git flow hotfix finish fix-name
```

## 团队协作

### 多人协作

```bash
# 克隆仓库
git clone url

# 查看远程
git remote -v

# 添加远程
git remote add upstream original-url

# 同步远程分支
git fetch origin
git checkout -b feature/login origin/feature/login
```

### Pull Request

```bash
# 1. 创建分支
git checkout -b feature/login

# 2. 提交修改
git add .
git commit -m "Add login feature"

# 3. 推送
git push -u origin feature/login

# 4. 在 GitHub/GitLab 创建 PR
```

### 代码审查

```bash
# 查看 PR 差异
git fetch origin
git diff main...origin/feature-name

# 检出 PR 分支
git fetch origin pull/123/head:pr-123
git checkout pr-123
```

## 配置优化

### .gitignore 模板

```
# 依赖
node_modules/

# 构建产物
dist/
build/

# 环境变量
.env
.env.local

# IDE
.vscode/
.idea/

# 日志
*.log
npm-debug.log*

# 操作系统
.DS_Store
Thumbs.db
```

### Git 配置

```bash
# 用户信息
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 默认分支
git config --global init.defaultBranch main

# 颜色
git config --global color.ui auto

# 拉取策略
git config --global pull.rebase false

# 推送策略
git config --global push.default current
```

### 别名

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.df diff
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.last "log -1 HEAD"
```

## 总结

本教程涵盖：
- 分支管理策略
- 变基操作
- 储藏使用
- 子模块
- Git 钩子
- Git Flow 工作流
- 团队协作

掌握这些技巧，提升 Git 使用效率！
