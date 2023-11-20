---
title: 观 react as a ui runtime 有感
layout: post
categories: ["reactの仙术"]
---
# 观 react as a ui runtime 有感

[原文]:https://overreacted.io/react-as-a-ui-runtime/

最近看了react作者 Dan 写得这篇介绍react的博客，年度好文！备受启发，因此打算写点儿观后感，趁着余热还在🥵🥵

起因是在看react作者 Dan 写得另一篇博客 A Completeed Guide to useEffect中提到了

```jsx
function Counter() {
  const [count, setCount] = useState(0);
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

What does it mean? Does count somehow “watch” changes to our state and update automatically? That might be a useful first intuition when you learn React but it’s not an 
[accurate mental model]:https://overreacted.io/react-as-a-ui-runtime/

在React中，没有响应式编程，数据绑定的概念，这篇文章主要介绍了react的心智模型，帮助理解react的工作方式

dan把react比做成了电影中的每一帧的概念来帮助我们认识react，通过帧的概念，我们就能很清楚，react其实是一个UI框架，他让我们的web页面变成了一帧一帧的东西。他彻底让UI和状态管理分离了。每一帧就是一个UI，当你改变状态的时候，实际上就是创建了一个新的动画帧，然后这一帧被用来渲染。这是我看完之后的浅显理解

然后介绍了，react为了实现这个目的，都用了哪些方法，提出了哪些东西。
- Host Tree 这是react所需要操纵的目标，在web中是Dom Tree，在其他app里面可以是其操作系统所构造的数据结构。总之Host Tree可以粗浅地理解成描述UI的数据结构。
- Renderers 渲染器。渲染器来充当react与Host Tree之间通话的工具。在Dom上可以是 React Dom，在手机中可以是 React Native。介绍了两种渲染模式：Mutation 和 Persistent 突变和持久
- React Elements react用来描述Host Tree Node的对象，比如描述dom节点。在描述完所有的Host Tree Node后，react Element也可以形成一个Tree
- Entry Point 每个 rendered都存在一个 entry point，渲染器需要构造这样一个API来提供entry point
- Reconciliation React的工作就是让Host Tree和React Element Tree相匹配。Reconciliation就是这项工作的具体细节，或者说是算法
- Purity 组件的纯度，比起纯度，react更关心组件的幂等性，即多次调用组件函数，渲染组件不会影响到其他的组件渲染。我们所有的更改都都将在Effect中完成，react的escape hatches
- Recursion and Inversion of Control 介绍了对于组件中的递归的处理方式，以及为甚了不直接调用组件函数，要采用JSX的语法形式
- State, Host Tree Node往往会具有各种本地状态：焦点，选择，输入。自然而然就会想到需要提供一个API来保存这些状态，防止丢失
- Consistency 介绍了对于Reconciliation过程中的一致性问题，避免浏览器渲染半成品的UI
- Effect 展示web中总是存在一些effect需要去处理，获取数据，订阅消息，绘制
- Static Use Order hook的调用顺序

OK，接下来讲讲这里面对我触动很大的地方

## Host Tree

"Some programs output numbers. Other programs output poems. Different languages and their runtimes are often optimized for a particular set of use cases, and React is no exception to that."

不同的语言以及它的运行时通常针对一组特定的用例进行优化，react要针对的用例就是Host Tree。react负责的工作就是帮助我们操作这个Host Tree。

在原生JS中，我们需要对DOM进行操作来实现各种交互效果。通过dom先获取到对应的dom节点元素，然后调用该dom节点元素的一些方法，绑定相应的交互事件，操作该节点元素的样式属性，以及操作节点元素的内容等等。又或者我们需要对整个DOM Tree进行操作，添加、删除或替换一个dom节点，以及对于DOM Tree的遍历操作。

"A specialized tool works better than a generic one when it can impose and benefit from particular constraints."

通过创造一些条件，施加一些特定的约束，从而让整个结构可以满足一些特性，我们能够从这些特性中受益。React就是这样做的，它施加了两个原则：稳定性和正规性
- 稳定性：React会假设UI的结构，或者说是Host Tree是稳定的，即没有频繁地增删改查
- 正规性：React会假设Host Tree是可分解地，即可以分解成一致的组件，一致体现在外观和行为上，具体呈现为组件的纯度。

## Renderers

渲染器充当react与Host Tree之间的通信工具，react dom、react native等等都是Renderers，也可以自己写Renderers。将react tree翻译成host tree，即将react tree上的操作，转换成host tree上的操作

渲染器的两种操作模式
- Mutation 这种模式下，可以随意更改Host Tree Node，dom就是这种模式，你可以随意增删改查dom节点
- Persistent 这种模式下，就不能随意更改Tree Node，而是克隆一份新的树去替换它，有点像函数式编程中的不可变性

## React Elements

react元素用来描述Host Tree Node。react元素是不会持久存储以及是不可变的，会被一直创造然后销毁。想要更改就必须创建新的react元素来描述新的UI

这也是作者为什么喜欢把 React元素 比作成电影中的 **帧** 它们捕获UI在特定时间点的外观，不会改变

## Reconciliation

当元素发生变化时，react会重新渲染当前的react元素，如何协调之前的react元素树和当前的react元素树的过程就是 Reconciliation。在这里存在两个选择
- 直接不管原先的元素节点，重新创建一个新的，但这样如果该元素递归节点非常大，重新创建的开销是非常大的
- 更新现有的节点，这样就避免了创建的开销

于是不难引出react需要面对的一个选择问题
- 什么时候更新 Host Tree Node
- 什么时候创建 Host Tree Node

更新意味着不用创建，意味着重用，我们需要找到这个元素，然后重用它。怎么找到他呢？react是这样做的：如果树中**同一位置**的**元素类型**在两个帧之间匹配就重用

对于条件渲染中，react会尽量保证其相邻元素的重用。

对于列表渲染中，由于元素类型都相同，react无法判断，因此需要通过key来判断

## Recursion And Inversion of Control

在渲染中，react对于组件中递归的处理也是一个挑战。组件在 react 就是一个函数，为什么我们一般都用JSX，而不是通过函数调用的形式来使用组件。

当我们通过函数调用，react就必须一层一层调用，查找该组件的子元素，而当我们使用JSX，组件的子元素就会一目了然。换句话说，不是通过我们来调用组件函数，而是将控制权交付给react，让react来调用组件函数。例如原文中提到的一个例子

```jsx
// 🔴 React has no idea Layout and Article exist.
// You're calling them.
ReactDOM.render(
  Layout({ children: Article() }),
  domContainer
)
 
// ✅ React knows Layout and Article exist.
// React calls them.
ReactDOM.render(
  <Layout><Article /></Layout>,
  domContainer
)
```
将组件控制权交给react还有一个好处就是惰性评估，当组件中涉及到条件渲染的时候，react可以在不调用该组件的情况下提前决定什么时候调用它，从而避免不必要的渲染工作。

## Consistency

在reconciliation中，会涉及到大量对Host Tree的操作，有时为了加快速度，我们可能会拆分这些操作，但是为了要保证一致性的问题，即避免改到一半，浏览器就拿去渲染了，从而展示出办成品的UI。我们应该在单个同步中去执行实际的Host Tree操作。

这也是为什么在Effect中，必须是同步函数，不能用异步函数的原因。