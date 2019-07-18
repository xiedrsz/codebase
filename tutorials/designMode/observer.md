---
当对象间存在一对多关系时，则使用观察者模式（Observer Pattern）。比如，当一个对象被修改时，则会自动通知它的依赖对象。观察者模式属于行为型模式。

* 主要解决: 一个对象状态改变给其他对象通知的问题，而且要考虑到易用和低耦合，保证高度的协作。
* 何时使用: 一个对象（目标对象）的状态发生改变，所有的依赖对象（观察者对象）都将得到通知，进行广播通知。

```js
// 观察者模式
// es6实现
class Observer {
  constructor () {
    this.fnList = []
  }
  subscibe (fn) {
    this.fnList.push(fn)
  }
  update (...args) {
    this.fnList.forEach(fn => {
      fn.apply(null, args)
    })
  }
}

let observer = new Observer()
observer.subscibe(function (a) {
  console.log(a)
})
observer.subscibe(function (a, b) {
  console.log(a + b)
})
observer.subscibe(function () {
  console.log(this)
})
observer.update(1, 2)
// ==> 1
// ==> 3
// ==> Window
```
