---
title: "我的面试经验总结"
pubDate: 2024-03-15
description: "工作三年面试了 20 家公司，总结出这份面试准备指南"
category: "学习"
---

# 我的面试经验总结

工作三年，我面试了大概 20 家公司，拿到过阿里、字节、拼多多等公司的 offer，也被拒过很多次。这篇文章总结我的面试经验和准备方法。

## 面试流程

互联网公司技术岗的典型流程：

1. **HR 筛选** —— 简历通过后，HR 联系
2. **笔试/测评** —— 部分公司有线上测评
3. **技术面（2-4 轮）** —— 基础、进阶、主管、交叉
4. **HR 面** —— 谈薪资、福利、入职时间
5. **体检/背调** —— 最后环节

大公司通常 3-5 轮技术面，小公司可能 1-2 轮。

## 简历准备

### 简历内容

我的简历结构：

1. **基本信息**
   - 姓名、电话、邮箱、GitHub、博客

2. **工作经历**
   - 公司、职位、时间
   - 工作内容（2-4 条）
   - 成果数据（尽量量化）

3. **项目经验**
   - 项目名称、时间
   - 技术栈
   - 职责（负责什么）
   - 成果（上线后效果）

4. **技能**
   - 熟练：XXX
   - 了解：XXX

5. **教育背景**
   - 学校、专业、时间

### 简历要点

1. **数据化**
   - 不要写"提升了性能"，写"性能提升 50%"
   - 不要写"负责重构"，写"重构模块涉及 10 万行代码"

2. **针对性**
   - 不同公司准备不同简历
   - 突出该公司需要的技能

3. **一页原则**
   - 2 页以内，最好 1 页
   - 突出重点，删除无关

### 简历模板

```markdown
# 张三
- 电话: 138xxxx8888
- 邮箱: zhangsan@email.com
- GitHub: github.com/zhangsan
- 博客: zhangsan.dev

## 工作经历

### 字节跳动 | 前端工程师 | 2022.03 - 至今
- 负责XXX系统前端开发，采用 React + TypeScript
- 性能优化，首屏加载从 3s 优化到 1s
- 推动团队工程化建设，搭建 CI/CD 流程

### 阿里巴巴 | 前端工程师 | 2020.06 - 2022.03
- 负责 XXX 项目重构，从 Vue2 迁移到 Vue3
- 搭建组件库，封装 30+ 通用组件

## 项目经验

### XxxAdmin 后台管理系统 | 2023.06 - 2023.10
- 技术栈: React, TypeScript, Ant Design
- 职责: 核心开发，负责权限模块
- 成果: 支持 500+ 用户，日活 100+

## 技能
- 熟练: JavaScript, TypeScript, React, Vue
- 了解: Node.js, Python, Docker
```

## 技术准备

### 前端知识体系

根据我的经验，前端面试的重点：

#### 1. JavaScript 基础

必考内容：
- 原型和原型链
- 作用域和闭包
- 异步和 Promise
- Event Loop
- 深拷贝和浅拷贝
- 防抖和节流
- 数组方法

#### 2. CSS

常见问题：
- Flex 布局
- Grid 布局
- BFC
- 层叠上下文
- 响应式设计
- CSS 优先级

#### 3. 框架

React 必问：
- Virtual DOM
- 生命周期
- Hooks 原理
- setState 原理
- 性能优化
- 组件通信

Vue 必问：
- 响应式原理
- 虚拟 DOM
- 组件通信
- Vue3 新特性
- 编译原理

#### 4. 网络

- HTTP/HTTPS
- TCP/UDP
- DNS
- 浏览器缓存
- CORS
- 状态码
- 从输入 URL 到页面展示

#### 5. 工程化

- Webpack/Vite 原理
- Babel 原理
- 代码分割
- Tree Shaking
- 模块化

#### 6. 性能优化

- 首屏加载优化
- 重排和重绘
- 长列表优化
- 图片优化
- CDN
- SSR/SSG

#### 7. 算法

常见题型：
- 数组操作（去重、排序、搜索）
- 链表（反转、合并、环检测）
- 二叉树（遍历、深度）
- 动态规划（背包、最长递增）
- 回溯（全排列、组合）

### 学习资源

| 类别 | 资源 |
|------|------|
| 基础 | 《JavaScript 高级程序设计》 |
| 框架 | 官方文档 |
| 网络 | 《图解 HTTP》 |
| 算法 | LeetCode hot100 |
| 项目 | GitHub 高星项目 |

## 算法准备

### 刷题方法

1. **分类刷**
   - 先刷数组、链表、树
   - 再刷动态规划、回溯

2. **高频优先**
   - 先刷 LeetCode 精选 100 题
   - 再刷公司高频题

3. **三遍刷题法**
   - 第一遍：不会做，看答案，理解思路
   - 第二遍：自己写，调试
   - 第三遍：隔几天重做，检验是否真正掌握

### 我的刷题计划

- 每天 1-2 题
- 周末 5-10 题
- 面试前集中刷公司真题

### 常见算法题

```javascript
// 1. 两数之和
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}

// 2. 反转链表
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

// 3. 防抖
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 4. 节流
function throttle(fn, delay) {
  let flag = true;
  return function (...args) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
}

// 5. 深拷贝
function deepClone(obj, map = new Map()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj);

  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map);
    }
  }
  return clone;
}
```

## 项目准备

### 项目梳理

每个项目准备三个版本：
- 1 分钟版（概括）
- 3 分钟版（重点）
- 10 分钟版（详细）

### 常见问题

1. **项目介绍**
   - 项目背景
   - 技术栈
   - 你的角色
   - 成果

2. **技术问题**
   - 为什么用这个技术栈？
   - 遇到的最大挑战？
   - 如何优化性能？
   - 如何保证代码质量？

3. **业务问题**
   - 这个功能怎么设计？
   - 如果流量增加 10 倍怎么办？
   - 如何保证高可用？

### 回答技巧

- 使用 STAR 法则（Situation, Task, Action, Result）
- 突出个人贡献，不要说"我们"
- 结果量化，用数据说话

## 面试技巧

### 1. 不会做怎么办

1. 不要直接说不会
2. 先分析问题，给出思路
3. 提示不会，可以请教面试官
4. 态度诚恳，表示之后会去学习

### 2. 薪资谈判

1. 先了解市场行情
2. 给自己一个合理估值
3. 可以适当夸大 20-30%
4. 不要先报价，等 HR 先开口
5. 强调自己的价值

### 3. 反问环节

准备几个问题：
- 团队规模和架构？
- 技术栈和发展方向？
- 绩效评估标准？
- 有什么培训？

不要问：
- 能不能远程？
- 年假几天？（HR 会问）
- 能不能加班？

## 面试复盘

每次面试后，我都会记录：

1. 问了哪些问题？
2. 哪些没答上来？
3. 有什么可以改进的？
4. 面试官的反馈

这样下次面试就能做得更好。

## 常见问题

### Q: 几年经验合适跳槽？

A: 1-2 年太短，3-5 年合适，5 年以上看发展。频繁跳槽（1 年一跳）是大忌。

### Q: 面试多家还是专注几家？

A: 建议先面几家练手，再投目标公司。

### Q: 裸辞还是骑驴找马？

A: 骑驴找马更稳妥，除非你很确定能找到更好的。

### Q: 被拒了怎么办？

A: 正常现象，继续面。可以问反馈针对性改进。

## 总结

面试是技术和心态的双重考验：

1. **技术要扎实** —— 基础知识 + 项目经验
2. **算法要练习** —— 每天保持手感
3. **项目要熟悉** —— 能讲清楚、讲深入
4. **心态要平和** —— 拒了继续面，不要放弃
5. **复盘要持续** —— 每次面试都是学习机会

祝大家都能拿到满意的 offer！
