---
* #### 单例模式

这种模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建。这个类提供了一种访问其唯一的对象的方式，可以直接访问，不需要实例化该类的对象。

> * 主要解决：一个全局使用的类频繁地创建与销毁。
> * 何时使用：当您想控制实例数目，节省系统资源的时候(如全局弹框）。

```js
// es5实现

// [1] 创建构造函数
var Singleton = function (name) {
  this.name = name
}
// [2] 原型方法
Singleton.prototype.showName = function () {
  console.log('My name is ' + this.name + '!')
}
// [3] 开通获取实例对象的方法
Singleton.getInstance = (function () {
  // 闭包中的变量会一直维持在内存中，不会被回收
  var instance;
  return function (name) {
    instance = instance || new Singleton(name)
    return instance
  }
})();

// es6实现
class SingletonES {
  // 静态属性（相当于类的属性）
  static instance;
  // 构造函数
  constructor (name) {
    this.name = name
  }
  // 实例方法
  showName () {
    console.log(`My name is ${this.name}`)
  }
  // 静态方法（相当于类的方法）
  static getInstance (name) {
    SingletonES.instance = SingletonES.instance || new SingletonES(name)
    return SingletonES.instance
  }
}

// 验证
// es5
var a = Singleton.getInstance('A')
var b = Singleton.getInstance('B')
a === b         // ==> true
a.showName()    // ===> My name is A!
b.showName()    // ===> My name is A!

// es6
let c = SingletonES.getInstance('C)
let d = SingletonES.getInstance('D)
c === d         // ==> true
c.showName()    // ===> My name is C!
d.showName()    // ===> My name is C!

```
