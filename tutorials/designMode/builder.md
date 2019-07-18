---
建造者模式（Builder Pattern）使用多个简单的对象一步一步构建成一个复杂的对象。

* 主要解决：主要解决在软件系统中，有时候面临着"一个复杂对象"的创建工作，其通常由各个部分的子对象用一定的算法构成；由于需求的变化，这个复杂对象的各个部分经常面临着剧烈的变化，但是将它们组合在一起的算法却相对稳定。
* 何时使用：一些基本部件不会变，而其组合经常变化的时候。

```js
// 建造者模式
// es6实现
// 创建一份菜单
class Menu {
  constructor (foods, processes, price) {
    this.foods = foods
    this.processes = processes
    this.price = price
    let maps = {
      chicken: '鸡肉',
      vegetable: '蔬菜'
    }
    let ingredient = Object.keys(foods).map(key => {
      return `${maps[key]}X${foods[key]}`
    }).join('、')
    processes = processes.join('=>')
    console.log(`配料：${ingredient}`)
    console.log(`工序：${processes}`)
    console.log(`价格：${price}`)
  }
}
class Chicken {
  constructor () {
    this.id = 'chicken'
    this.name = '鸡肉'
    this.price = 20
  }
}
class Vegetable {
  constructor () {
    this.id = 'vegetable'
    this.name = '蔬菜'
    this.price = 5
  }
}
class Fry {
  constructor () {
    this.name = '炒'
    this.price = 18
  }
}
class Freeze {
  constructor () {
    this.name = '冰冻'
    this.price = 10
  }
}
class MenuBuilder {
  constructor () {
    this.foods = {
      chicken: 0,
      vegetable: 0
    }
    this.processes = []
    this.price = 0
  }
  addFood (food) {
    let {id, price} = food
    this.foods[id] += 1
    this.price += price
    return this
  }
  addProcess (process) {
    let {name, price} = process
    let processes = this.processes
    if (!~processes.indexOf(name)) {
      this.processes.push(name)
      this.price += price
    }
    return this
  }
  getMenu () {
    let {foods, processes, price} = this
    !foods.chicken && (delete foods.chicken)
    !foods.vegetable && (delete foods.vegetable)
    return new Menu(foods, processes, price)
  }
}

let menu = new MenuBuilder()
  .addFood(new Chicken())
  .addFood(new Chicken())
  .addFood(new Vegetable())
  .addProcess(new Fry())
  .addProcess(new Freeze())
  .getMenu()

console.log(menu)

```
