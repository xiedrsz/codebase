---
责任链模式（Chain of Responsibility Pattern）为请求创建了一个接收者对象的链。这种模式给予请求的类型，对请求的发送者和接收者进行解耦。在这种模式中，通常每个接收者都包含对另一个接收者的引用。如果一个对象不能处理该请求，那么它会把相同的请求传给下一个接收者，依此类推。

* 主要解决: 职责链上的处理者负责处理请求，客户只需要将请求发送到职责链上即可，无须关心请求的处理细节和请求的传递，所以职责链将请求的发送者和请求的处理者解耦了。
* 何时使用: 在处理消息的时候以过滤很多道。

tip: javascript的事件冒泡就是一种责任链模式

```js
// 责任链模式
// es6实现
// 实例：有人被打
class Guangdong {
  report () {
    console.log('广东人被打了')
  }
}

class Leizhou {
  constructor () {
    this.superior = new Guangdong()
  }
  report () {
    console.log('雷州人被打了')
    // 告诉上级
    this.superior.report()
  }
}

class Qishui {
  constructor () {
    this.superior = new Leizhou()
  }
  report () {
    console.log('企水人被打了')
    // 告诉上级
    this.superior.report()
  }
  fighted () {
    this.report()
  }
}

let man = new Qishui()
man.fighted()
// ==> 企水人被打了
// ==> 雷州人被打了
// ==> 广东人被打了
```
