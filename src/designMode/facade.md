---
* #### 外观模式

外观模式（Facade Pattern）隐藏系统的复杂性，并向客户端提供了一个客户端可以访问系统的接口。

> * 主要解决: 降低访问复杂系统的内部子系统时的复杂度，简化客户端与之的接口。
> * 何时使用：
>   > 1. 客户端不需要知道系统内部的复杂联系，整个系统只需提供一个"接待员"即可。
>   > 2. 定义系统的入口。

```js
// es6 实现
class Circle {
  constructor () {}
  draw () {
    // Todo
  }
}

class Square {
  constructor () {}
  draw () {
    // Todo
  }
}

class Triangle {
  constructor () {}
  draw () {
    // Todo
  }
}

class ShapeMarket {
  constructor () {
    this.circle = new Circle()
    this.square = new Square()
    this.triangle = new Triangle()
  }
  drawCircle () {
    this.circle.draw()
  }
  drawSquare () {
    this.square.draw()
  }
  drawTriangle () {
    this.triangle.draw()
  }
}

let shapeMarket = new ShapeMarket()
shapeMarket.drawCircle()
shapeMarket.drawSquare()
shapeMarket.drawTriangle()
```
