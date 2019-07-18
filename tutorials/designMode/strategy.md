---
在策略模式（Strategy Pattern）中，一个类的行为或其算法可以在运行时更改。这种类型的设计模式属于行为型模式。
在策略模式中，我们创建表示各种策略的对象和一个行为随着策略对象改变而改变的 context 对象。策略对象改变 context 对象的执行算法。

* 主要解决: 在有多种算法相似的情况下，使用 if...else 所带来的复杂和难以维护。
* 何时使用: 一个系统有许多许多类，而区分它们的只是他们直接的行为。
* 状态模式与策略模式的不同:
  * 状态模式的的思想是，状态之间的切换，在状态A执行完毕后自己控制状态指向状态B。状态模式是不停的切换状态执行。
  * 策略模式的思想上是，考虑多种不同的业务规则将不同的算法封装起来，便于调用者选择调用。策略模式只是条件选择执行一次。

```js
// 策略模式
// es6实现
const Strategys = {
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

function executeStrategy (strategy, ...args) {
  let result = Strategys[strategy].apply(null, args)
  console.log(result)
}

executeStrategy('plus', 1, 2, 3)
// ==> 6
executeStrategy('multi', 2, 4, 6)
// ==> 48
```
