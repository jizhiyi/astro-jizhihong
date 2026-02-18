---
title: "Code Review 经验分享"
pubDate: 2024-04-22
description: "如何做好 Code Review，提升团队代码质量"
category: "学习"
---

# Code Review 经验分享

Code Review（代码审查）是软件开发中非常重要的一环。作为一个有几年经验的前端开发者，我在 Code Review 中踩过不少坑，也积累了一些心得。今天分享给大家。

## 为什么要 Code Review

### 对团队的价值

1. **代码质量** —— 提前发现 bug 和潜在问题
2. **知识共享** —— 成员之间互相学习
3. **统一风格** —— 保持代码一致性
4. **新人培养** —— 帮助新人快速成长

### 对个人的价值

1. **反馈** —— 知道自己的问题在哪
2. **学习** —— 看到别人的优秀代码
3. **表达** —— 解释自己的思路

## 作为 Reviewer

### 审查原则

1. **对代码不对人**
   - 只评论代码，不评论人
   - 不要说"你这样写不对"，说"这里可以这样改"

2. **关注重点**
   - 功能是否正确
   - 逻辑是否清晰
   - 是否有安全隐患
   - 性能是否达标

3. **不要过于严格**
   - 不是所有代码都要完美
   - 风格问题可以用工具自动修复
   - 小的改进建议可以语气轻松

### 常见审查点

#### 1. 代码规范

- 命名是否清晰
- 是否有不必要的注释
- 函数是否过长
- 是否有重复代码

```javascript
// ❌ 不好的例子
function a(b, c) {
  // 处理业务
  let d = b.map(e => e.id);
  // 处理业务
  d.forEach(f => {
    // 处理业务
  });
  return d;
}

// ✅ 好的例子
function getUserIds(users) {
  return users.map(user => user.id);
}

function processUsers(users) {
  const ids = getUserIds(users);
  ids.forEach(id => {
    // 处理
  });
}
```

#### 2. 逻辑正确

- 边界条件是否处理
- 异常情况是否考虑
- 是否有潜在的 bug

```javascript
// ❌ 可能的问题
function divide(a, b) {
  return a / b; // b 为 0 会怎样？
}

// ✅ 改进
function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为 0');
  }
  return a / b;
}
```

#### 3. 性能问题

- 是否有不必要的重复计算
- 循环是否可以优化
- 大量数据是否需要分页

```javascript
// ❌ 性能问题
users.forEach(user => {
  const roles = getUserRoles(user.id); // 每次都调用 API
});

// ✅ 优化
const userIds = users.map(u => u.id);
const rolesMap = await getUserRolesBatch(userIds);
```

#### 4. 安全问题

- 敏感信息是否暴露
- 是否有 XSS 风险
- 权限校验是否到位

```javascript
// ❌ XSS 风险
function renderContent(content) {
  return `<div>${content}</div>`;
}

// ✅ 防范 XSS
import DOMPurify from 'dompurify';
function renderContent(content) {
  return `<div>${DOMPurify.sanitize(content)}</div>`;
}
```

#### 5. 可读性

- 复杂的逻辑是否有注释
- 业务逻辑是否容易理解
- 是否有过于技巧性的代码

### 常用评论

```markdown
# 建议性评论
- 这里可以提取成一个函数，提高复用性
- 这个变量名可以更清晰一些

# 疑问性评论
- 这里为什么这样处理？是为了解决什么问题？
- 这个逻辑我没太看懂，能解释一下吗？

# 必须修改
- 这里有 bug，需要修复
- 缺少权限校验，需要加上
- 这个安全问题需要处理

# 小问题
- Nit: 这个可以写成单行
- Optional: 如果有时间可以优化
```

### Review 技巧

1. **先看整体再看细节**
   - 先了解 PR 的整体结构和目的
   - 再仔细审查具体的代码

2. **分批审查**
   - 一次不要看太多代码
   - 超过 400 行建议分多次

3. **使用工具**
   - GitHub/GitLab 的 Review 功能
   - IDE 的 Code Analysis

4. **及时 Review**
   - 不要让 PR 堆积
   - 当天 Review 当天的 PR

## 作为 Author

### 提交前自检

在提交 PR 前，自己先检查：

1. **功能是否完成**
   - 代码是否完整
   - 测试是否通过

2. **是否符合规范**
   - ESLint 是否通过
   - 命名是否统一

3. **是否易于理解**
   - 提交信息是否清晰
   - PR 描述是否完整

### PR 描述模板

```markdown
## 背景
为什么需要这个改动？

## 改动内容
- 新增了 XXX 功能
- 修改了 XXX 逻辑

## 测试
- [ ] 单元测试通过
- [ ] 本地测试通过

## 截图（如有 UI 改动）

## 相关 Issue
Closes #123
```

### 如何应对 Review

1. **认真对待每条评论**
   - 每条都看，都回复
   - 不要觉得烦

2. **有不同意见要沟通**
   - 可以解释自己的思路
   - 可以讨论最优方案

3. **不要 personal attack**
   - 对事不对人
   - 保持专业和礼貌

4. **小问题尽快修改**
   - 立即改，不要拖着

### 常见问题和应对

| 问题 | 建议 |
|------|------|
| Review 太慢 | 主动催一下 |
| 意见太多 | 优先处理必须的 |
| 意见不统一 | 讨论或找第三人 |
| Review 质量低 | 可以友好提醒 |

## 团队 Code Review 规范

### Review 清单

```
- [ ] 代码逻辑正确
- [ ] 没有明显的 bug
- [ ] 边界条件处理
- [ ] 命名清晰
- [ ] 函数长度合适
- [ ] 重复代码已提取
- [ ] 注释充分
- [ ] 单元测试通过
- [ ] 代码风格一致
- [ ] 无敏感信息泄露
```

### Review 时长

- 单次 Review < 30 分钟
- 单个 PR < 400 行
- 审查周期 < 24 小时

### 奖励机制

可以建立一些激励机制：
- 每周评选最佳 Reviewer
- 感谢认真 Review 的同事
- 把 Code Review 纳入绩效

## 我的经验总结

1. **心态要开放**
   - Review 是学习的机会，不是批判
   - 感谢帮你 Review 的人

2. **沟通要到位**
   - 有问题及时讨论
   - 不要猜测对方意图

3. **习惯要养成**
   - 每天 Review
   - 不要堆积

4. **工具要用好**
   - 配置好 ESLint/Prettier
   - 使用自动化工具

## 常见问题

### Q: 团队没有 Code Review 怎么办？

A: 从自己做起，主动让同事帮你 Review。时间长了自然会形成习惯。

### Q: 遇到强势的 Reviewer 怎么办？

A: 对事不对人，可以解释自己的思路。如果对方坚持，可以找第三人评判。

### Q: Code Review 占用太多时间怎么办？

A: 限制单次 Review 时长和 PR 大小。小的改动 Review 更快。

### Q: 不会 Review 怎么办？

A: 先从关注基础问题开始：命名、格式、明显 bug。慢慢积累经验。

---

Code Review 看起来是小事，但坚持做会发现它带来的价值：代码质量提升、团队氛围变好、个人能力成长。

希望这篇文章对你有帮助！
