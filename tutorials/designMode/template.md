---
在模板模式（Template Pattern）中，一个抽象类公开定义了执行它的方法的方式/模板。它的子类可以按需要重写方法实现，但调用将以抽象类中定义的方式进行。这种类型的设计模式属于行为型模式。

* 主要解决: 一些方法通用，却在每一个子类都重新写了这一方法。
* 何时使用: 有一些通用的方法。

```js
// 模板方法模式
// es6实现
class Man {
  constructor (type) {
    this.type = type
  }
  morning () {
    return ''
  }
  noon () {
    return '吃饭'
  }
  afternoon () {
    return ''
  }
  evening () {
    return ''
  }
  getDay () {
    let type = this.type
    let morning = this.morning()
    let noon = this.noon()
    let afternoon = this.afternoon()
    let evening = this.evening()
    console.log(`${type}的一天：
    早上： ${morning};
    中午： ${noon};
    下午： ${afternoon};
    晚上： ${evening}。`)
  }
}

class Programmer extends Man {
  constructor () {
    super('程序猿')
  }
  morning () {
    return '敲代码'
  }
  afternoon () {
    return '敲代码'
  }
  evening () {
    return '玩游戏'
  }
}

class Farmer extends Man {
  constructor () {
    super('农民')
  }
  morning () {
    return '锄禾'
  }
  afternoon () {
    return '锄禾'
  }
  evening () {
    return '树下乘凉'
  }
}

let programmer = new Programmer()
let farmer = new Farmer()
programmer.getDay()
// ==> 程序猿的一天：
// ==>    早上： 敲代码;
// ==>    中午： 吃饭;
// ==>    下午： 敲代码;
// ==>    晚上： 玩游戏。
farmer.getDay()
// ==> 农民的一天：
// ==>    早上： 锄禾;
// ==>    中午： 吃饭;
// ==>    下午： 锄禾;
// ==>    晚上： 树下乘凉。
```
