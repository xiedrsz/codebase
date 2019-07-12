---
* #### 工厂模式

在工厂模式中，我们在创建对象时不会对客户端暴露创建逻辑，并且是通过使用一个共同的接口来指向新创建的对象。

> * 主要解决：主要解决接口选择的问题。
> * 何时使用：我们明确地计划不同条件下创建不同实例时。

```js
// es6 实现
class Shape {
  constructor (name) {
    console.log(`I am ${name}`)
  }
  showArea () {
    console.log('I don\'t know how to calculate the area!')
  }
}

class Circle extends Shape {
  constructor () {
    super('Circle')
  }
  showArea () {
    console.log('My area is Pi * r * r')
  }
}

class Square extends Shape {
  constructor () {
    super('Square')
  }
  showArea () {
    console.log('My area is a * a')
  }
}

function factory (type) {
  if (type === 'Circle') {
    return new Circle()
  } else if (type === 'Square') {
    return new Square()
  } else {
    return new Shape(type)
  }
}

let a = factory('Circle')
let b = factory('Square')
let c = factory('Triangle')
a.showArea()
b.showArea()
c.showArea()
```
```js
// es5实现
function ShapeA (name) {
  console.log('I am ' + name)
}
ShapeA.prototype.showArea = function () {
  console.log('I don\'t know how to calculate the area!')
}

function CircleA () {}
CircleA.prototype = new ShapeA('CircleA')
CircleA.prototype.showArea = function () {
  console.log('My area is Pi * r * r')
}

function SquareA () {}
SquareA.prototype = new ShapeA('SquareA')
SquareA.prototype.showArea = function () {
  console.log('My area is a * a')
}

function factoryA (type) {
  if (type === 'Circle') {
    return new CircleA()
  } else if (type === 'Square') {
    return new SquareA()
  } else {
    return new ShapeA(type)
  }
}

var e = factoryA('Circle')
var f = factoryA('Square')
var g = factoryA('Triangle')
e.showArea()
f.showArea()
g.showArea()

```
