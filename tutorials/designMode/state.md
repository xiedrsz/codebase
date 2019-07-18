---
在状态模式（State Pattern）中，类的行为是基于它的状态改变的。这种类型的设计模式属于行为型模式。
在状态模式中，我们创建表示各种状态的对象和一个行为随着状态对象改变而改变的 context 对象。

* 主要解决: 对象的行为依赖于它的状态（属性），并且可以根据它的状态改变而改变它的相关行为。
* 何时使用: 代码中包含大量与对象状态有关的条件语句。
* 使用场景:
  * 行为随状态改变而改变的场景。
  * 条件、分支语句的代替者。

```js
// 状态模式
// es6实现
// 红绿灯
// ==> 48
// context 对象
class Car {
  stop () {
    console.log('state: STOP')
  }
  move () {
    console.log('state: MOVING')
  }
  slow () {
    console.log('state: SLOW DOWN')
  }
}
// 各种状态
class RedLight {
  constructor (car) {
    this.car = car
  }
  action () {
    this.car.stop()
  }
}
class GreenLight {
  constructor (car) {
    this.car = car
  }
  action () {
    this.car.move()
  }
}
class YellowLight {
  constructor (car) {
    this.car = car
  }
  action () {
    this.car.slow()
  }
}
let car = new Car()
let red = new RedLight(car)
let green = new GreenLight(car)
let yellow = new YellowLight(car)
let timer = 0
function getState (timer) {
  timer %= 60
  if (timer < 10) {
    return red
  } else if (timer < 50) {
    return green
  } else {
    return yellow
  }
}
setInterval(() => {
  timer += 5
  let state = getState(timer)
  state.action()
}, 5000)
// ==> state: STOP
// ==> state: MOVING
// ==> state: SLOW DOWN
// ==> ...
```
