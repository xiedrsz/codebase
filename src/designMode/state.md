---
* #### 状态模式

在状态模式（State Pattern）中，类的行为是基于它的状态改变的。这种类型的设计模式属于行为型模式。
在状态模式中，我们创建表示各种状态的对象和一个行为随着状态对象改变而改变的 context 对象。

> * 主要解决：对象的行为依赖于它的状态（属性），并且可以根据它的状态改变而改变它的相关行为。
> * 何时使用：代码中包含大量与对象状态有关的条件语句。
> * 使用场景：
>    > 1. 行为随状态改变而改变的场景。
>    > 2. 条件、分支语句的代替者。

```js
// es6实现
const StateManager = {
  plus (...args) {
    return args.reduce((arg, res) => {
      res += arg
      return res
    }, 0)
  },
  multi (...args) {
    return args.reduce((arg, res) => {
      res *= arg
      return res
    }, 1)
  }
}

function changeState (state, ...args) {
  let result = StateManager[state].apply(null, args)
  console.log(result)
}

changeState('plus', 1, 2, 3)
// ==> 6
changeState('multi', 2, 4, 6)
// ==> 48
```
