---
title: "Git 常用命令速查"
pubDate: 2024-01-10
description: "日常开发中常用的 Git 命令速查表"
category: "笔记"
---

# Git 常用命令速查

本文记录日常开发中常用的 Git 命令，供快速查阅。

## 基础操作

### 创建仓库

```bash
# 初始化仓库
git init

# 克隆仓库
git clone <url>
git clone <url> <folder-name>
```

### 基本操作

```bash
# 查看状态
git status

# 查看变更
git diff
git diff --staged

# 添加文件
git add <file>
git add .              # 添加所有
git add -p            # 分块添加

# 提交
git commit -m "message"
git commit -am "message"  # add + commit（仅追踪文件）
git commit --amend      # 修改最后一次提交
```

### 查看历史

```bash
# 查看提交历史
git log
git log --oneline          # 简洁格式
git log -n 10              # 最近10条
git log --graph            # 图形化

# 查看文件变更
git show <commit-id>
git blame <file>           # 文件每行最后修改
```

## 分支操作

### 分支管理

```bash
# 查看分支
git branch                # 本地分支
git branch -r             # 远程分支
git branch -a              # 所有分支

# 创建分支
git branch <branch-name>
git checkout -b <branch-name>   # 创建并切换

# 切换分支
git checkout <branch-name>
git switch <branch-name>      # 推荐（Git 2.23+）

# 删除分支
git branch -d <branch-name>    # 删除已合并
git branch -D <branch-name>   # 强制删除

# 重命名分支
git branch -m <old-name> <new-name>
```

### 合并与衍合

```bash
# 合并分支
git merge <branch-name>
git merge --no-ff <branch-name>  # 不使用 fast-forward

# 衍合（变基）
git rebase <branch-name>

# 解决冲突
git mergetool
```

## 远程操作

### 远程仓库

```bash
# 添加远程仓库
git remote add origin <url>

# 查看远程仓库
git remote -v

# 修改远程仓库
git remote set-url origin <url>

# 删除远程仓库
git remote remove origin
```

### 拉取与推送

```bash
# 拉取
git fetch origin
git pull origin <branch>
git pull --rebase origin <branch>

# 推送
git push origin <branch>
git push -u origin <branch>  # 首次推送并设置上游
git push --force             # 强制推送（慎用）
```

## 暂存操作

```bash
# 暂存工作区
git stash
git stash save "message"
git stash -u                  # 包括未跟踪文件

# 查看暂存
git stash list
git stash show
git stash show -p             # 详细

# 恢复暂存
git stash apply               # 恢复但不删除
git stash pop                 # 恢复并删除
git stash drop                # 删除暂存
git stash clear               # 清空所有暂存
```

## 撤销操作

```bash
# 撤销工作区修改
git checkout -- <file>
git restore <file>

# 撤销暂存区
git reset HEAD <file>
git restore --staged <file>

# 撤销提交（软撤销）
git reset --soft HEAD~1

# 撤销提交（混合撤销）
git reset HEAD~1

# 撤销提交（硬撤销）
git reset --hard HEAD~1
git reset --hard <commit-id>

# 丢弃未提交的修改
git checkout .
git restore .
```

## 标签操作

```bash
# 创建标签
git tag <tag-name>
git tag -a <tag-name> -m "message"

# 查看标签
git tag
git tag -l "v1.*"

# 推送标签
git push origin <tag-name>
git push origin --tags       # 推送所有

# 删除标签
git tag -d <tag-name>
git push origin --delete <tag-name>
```

## 实用技巧

### 别名配置

```bash
# 配置别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --oneline --graph --all"
```

### 高级用法

```bash
# 查看某文件在哪些提交中修改过
git log --follow -p <file>

# 查看两个分支的差异
git diff <branch1>..<branch2>

# 查看某文件在某个提交的修改
git show <commit-id>:<file>

# 清理未跟踪文件
git clean -n           # 预览
git clean -f          # 删除
git clean -fd         # 包括目录

# 压缩提交
git rebase -i HEAD~3  # 压缩最近3个提交
```

### 解决冲突

```bash
# 查看冲突文件
git status

# 查看冲突内容
git diff

# 接受我们的/他们的
git checkout --ours <file>
git checkout --theirs <file>

# 标记冲突已解决
git add <file>
git commit
```

## 工作流

### Feature 分支工作流

```bash
# 从 develop 创建功能分支
git checkout -b feature/my-feature develop

# 开发完成后合并到 develop
git checkout develop
git merge --no-ff feature/my-feature

# 删除功能分支
git branch -d feature/my-feature
```

### Git Flow

```bash
# 初始化
git flow init

# 开发功能
git flow feature start my-feature
git flow feature finish my-feature

# 发布
git flow release start 1.0.0
git flow finish 1.0.0

# 修复 bug
git flow hotfix start hotfix-name
git flow hotfix finish hotfix-name
```

## 常见问题

### Q: 如何恢复删除的 commit？

```bash
git reflog                    # 查看操作历史
git checkout <commit-id>      # 恢复到那个提交
```

### Q: 如何修改最后一次提交？

```bash
git commit --amend -m "new message"
git commit --amend --no-edit  # 不修改提交信息
```

### Q: 如何放弃本地修改？

```bash
git checkout .
# 或
git restore .
```

### Q: 推送到错误的分支？

```bash
# 从目标分支删除
git push origin :branch-name
# 推送到正确的分支
git push origin correct-branch
```
