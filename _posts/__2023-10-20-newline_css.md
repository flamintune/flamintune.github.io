---
layout: post
title: CSSの换行
categories: ["地上CSS"]

---

# CSSの换行

## 文本换行的工作原理

工作原理其实就是文本折行的算法，算法有很多，最主要的就是贪心算法和Knuth-Plass算法。

贪心算法原理就是每次分析一行，尽可能多填充一行，装不下就开始下一行



## 浏览器对于文本换行的处理
1. 对相应的容器应用CSS规则

   涉及到换行的CSS规则有

   - `white-space`
   - `word-break`
   - `overflow-wrap`
   - `word-wrap`
   - `hyphens`
   - `text-overflow`
   - `line-break`

2. 在计算每个节点的容器的位置和大小时，会判断是否进行文本换行

| 段落属性 |      |      |
| -------- | ---- | ---- |
| 全数字   |      |      |
| 中文     |      |      |
| 英文     |      |      |

