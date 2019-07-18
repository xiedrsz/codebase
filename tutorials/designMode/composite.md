---
组合模式（Composite Pattern），又叫部分整体模式，是用于把一组相似的对象当作一个单一的对象。组合模式依据树形结构来组合对象，用来表示部分以及整体层次。这种类型的设计模式属于结构型模式，它创建了对象组的树形结构。
这种模式创建了一个包含自己对象组的类。该类提供了修改相同对象组的方式。

* 主要解决：它在我们树型结构的问题中，模糊了简单元素和复杂元素的概念，客户程序可以向处理简单元素一样来处理复杂元素，从而使得客户程序与复杂元素的内部结构解耦。
* 何时使用：
  * 您想表示对象的部分-整体层次结构（树形结构）。 
  * 您希望用户忽略组合对象与单个对象的不同，用户将统一地使用组合结构中的所有对象。

```js
// 组合模式
// ES6 的实现
// 树形
class Node {
  constructor (name) {
    this.childs = []
    this.name = name
  }
  add (node) {
    this.childs.push(node)
  }
  remove (node) {
    let tName = node.name
    this.childs = this.childs.filter(({name}) => (name !== tName))
  }
  print (suffix = '') {
    console.log(`${suffix}|--${this.name}\n`)
    if (this.childs.length) {
      this.childs.forEach(node => {
        node.print(suffix + '   ')
      });
    }
  }
}

let root = new Node('root')
let parents = new Node('parents')
let son1 = new Node('son1')
let son2 = new Node('son2')
let grandson1 = new Node('grandson1')
let grandson2 = new Node('grandson2')

root.add(parents)
parents.add(son1)
parents.add(son2)
son2.add(grandson1)
son2.add(grandson2)

root.print()
// ==>
/**
 |--root
    |--parents
       |--sun1
       |--sun2
          |--grandson1
          |--grandson2
*/
```
