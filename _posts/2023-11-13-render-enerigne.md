---
title: toy web render energy
layout: post
categories: ["写点儿项目"]
---

## Toy browser render energy

项目来源参考自robinson，用rust实现的浏览器渲染引擎，作者是Matt Brubeck，Mozilla成员之一，还写这个项目的

[学习教程]: https://limpet.net/mbrubeck/2014/08/08/toy-layout-engine-1.html

整个项目分成七个板块

- HTML Parser
- CSS Parser
- Style Paser
- Boxes modle
- Block layout
- Paint

本次我打算采取Typescript来写，因为Typescript的类型系统可以很好地避免很多奇怪的错误，当然前提是类型要写对，然后顺便练练手。

## HTML Parser

html parser类似这种的标记语言解析器已经快写烂了，还在我写cpp的时候，就写过XML parser，http parser，原理都是一样的。具体实现思路的话，感觉都大差不差，设置两个变量，存储当前下标以及输出，通过判断各种情况来切割字符串，并存储在对应的对象中，中途还需要消耗空格，换行等等。以及存在递归的情况

写的时候经常会出现很烦躁的情况，就是有太多逻辑需要处理，感觉这些逻辑很简单，但就是很繁琐，很难受🤧🤧经常会出现想让GPT4写这个，自己也不想动，
