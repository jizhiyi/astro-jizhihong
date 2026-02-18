---
title: "VS Code 快捷键速查"
pubDate: 2024-02-05
description: "VS Code 常用快捷键速查表"
category: "笔记"
---

# VS Code 快捷键速查

## 通用快捷键

### 基本操作

| 快捷键 | 功能 |
|--------|------|
| Ctrl+Shift+P | 命令面板 |
| Ctrl+P | 快速打开文件 |
| Ctrl+Shift+N | 新建窗口 |
| Ctrl+W | 关闭当前窗口 |
| Ctrl+K Ctrl+S | 打开快捷键设置 |

### 多个光标

| 快捷键 | 功能 |
|--------|------|
| Alt+Click | 添加光标 |
| Ctrl+Alt+Down | 向下添加光标 |
| Ctrl+Alt+Up | 向上添加光标 |
| Ctrl+D | 选中当前单词，下一个相同词 |
| Ctrl+Shift+L | 选中所有相同词 |
| Ctrl+Shift+Space | 触发建议（显示参数提示） |

## 编辑操作

### 行操作

| 快捷键 | 功能 |
|--------|------|
| Ctrl+C | 复制当前行（无选中） |
| Ctrl+X | 剪切当前行（无选中） |
| Ctrl+Shift+K | 删除当前行 |
| Alt+Up | 上移当前行 |
| Alt+Down | 下移当前行 |
| Ctrl+Shift+Alt+Up | 向上复制当前行 |
| Ctrl+Shift+Alt+Down | 向下复制当前行 |

### 括号操作

| 快捷键 | 功能 |
|--------|------|
| Ctrl+Shift+\ | 跳转到匹配的括号 |
| Ctrl+[ | 减少缩进 |
| Ctrl+] | 增加缩进 |
| Tab | 增加缩进（选中行） |

### 撤销与重做

| 快捷键 | 功能 |
|--------|------|
| Ctrl+Z | 撤销 |
| Ctrl+Y | 重做 |
| Ctrl+Shift+Z | 重做（替代 Ctrl+Y） |

## 导航操作

### 文件导航

| 快捷键 | 功能 |
|--------|------|
| Ctrl+G | 跳转到指定行 |
| Ctrl+Tab | 切换文件 |
| Ctrl+Shift+Tab | 反向切换 |
| Alt+Left | 返回上一个位置 |
| Alt+Right | 前进到下一个位置 |
| Ctrl+Shift+O | 跳转到文件符号 |

### 侧边栏

| 快捷键 | 功能 |
|--------|------|
| Ctrl+B | 显示/隐藏侧边栏 |
| Ctrl+Shift+E | 显示资源管理器 |
| Ctrl+Shift+F | 显示搜索 |
| Ctrl+Shift+G | 显示源代码管理 |
| Ctrl+Shift+D | 显示调试 |
| Ctrl+Shift+X | 显示扩展 |

## 搜索操作

### 搜索

| 快捷键 | 功能 |
|--------|------|
| Ctrl+F | 当前文件搜索 |
| Ctrl+H | 当前文件替换 |
| Ctrl+Shift+F | 全局搜索 |
| Ctrl+Shift+H | 全局替换 |
| F3 / Shift+F3 | 查找下一个/上一个 |
| Alt+Enter | 选中所有匹配项 |

### 搜索选项

| 快捷键 | 功能 |
|--------|------|
| Ctrl+C | 复制选中 |
| Ctrl+F2 | 选中所有当前单词 |
| Ctrl+D | 逐个选中下一个相同词 |

## 代码操作

### 代码提示

| 快捷键 | 功能 |
|--------|------|
| Ctrl+Space | 触发建议 |
| Ctrl+Shift+Space | 触发参数提示 |
| Ctrl+. | 快速修复（显示代码操作） |

### 代码折叠

| 快捷键 | 功能 |
|--------|------|
| Ctrl+Shift+[ | 折叠区域 |
| Ctrl+Shift+] | 展开区域 |
| Ctrl+K Ctrl+0 | 折叠所有 |
| Ctrl+K Ctrl+J | 展开所有 |

### 代码注释

| 快捷键 | 功能 |
|--------|------|
| Ctrl+/ | 切换行注释 |
| Ctrl+Shift+A | 切换块注释 |

### 重构

| 快捷键 | 功能 |
|--------|------|
| F2 | 重命名符号 |
| Ctrl+Shift+R | 重构操作 |
| Ctrl+. | 快速修复 |

## 终端操作

| 快捷键 | 功能 |
|--------|------|
| Ctrl+` | 显示/隐藏终端 |
| Ctrl+Shift+` | 新建终端 |
| Ctrl+Shift+C | 复制选中 |
| Ctrl+Shift+V | 粘贴到终端 |
| Ctrl+Up/Down | 滚动终端 |

## 调试操作

| 快捷键 | 功能 |
|--------|------|
| F5 | 开始/继续调试 |
| F9 | 切换断点 |
| F10 | 单步跳过 |
| F11 | 单步进入 |
| Shift+F11 | 单步退出 |

## 自定义快捷键

### 推荐配置

```json
{
  "key": "ctrl+shift+[",
  "command": "editor.action.outline"
}
```

### 常用自定义

```json
{
  // 关闭其他标签
  "key": "ctrl+alt+w",
  "command": "workbench.action.closeOtherEditors"
},
{
  // 格式化选中
  "key": "ctrl+shift+f",
  "command": "editor.action.formatSelection",
  "when": "editorHasSelection"
},
{
  // 打开最近文件
  "key": "ctrl+e",
  "command": "workbench.action.quickOpenRecent"
}
```

## 技巧

### 多光标技巧

1. **选中所有相同词**
   - Ctrl+Shift+L

2. **添加多个光标**
   - Alt+Click
   - Ctrl+Alt+Up/Down

3. **列选择**
   - Shift+Alt+拖动

### 高效编辑

1. **复制行**
   - 选中 + Ctrl+C

2. **删除行**
   - Ctrl+Shift+K

3. **移动行**
   - Alt+Up/Down

### 快速导航

1. **命令面板**
   - Ctrl+Shift+P

2. **文件跳转**
   - Ctrl+P

3. **符号跳转**
   - Ctrl+Shift+O
