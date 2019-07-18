---
* #### 备忘录模式

备忘录模式（Memento Pattern）保存一个对象的某个状态，以便在适当的时候恢复对象。备忘录模式属于行为型模式。

> * 主要解决: 所谓备忘录模式就是在不破坏封装的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，这样可以在以后将对象恢复到原先保存的状态。
> * 何时使用：很多时候我们总是需要记录一个对象的内部状态，这样做的目的就是为了允许用户取消不确定或者错误的操作，能够恢复到他原先的状态，使得他有"后悔药"可吃。

> tip: 下面创建了一个备忘录类，可供 vuex 的 state 使用

```js
// es6实现
class Memento {
  constructor (stateObj = {}) {
    Object.assign(this, stateObj)
    this.__notebook = {}
  }
  backup (key) {
    if (!key) {
      throw '请输入备份名'
    }
    if (this.__notebook[key]) {
      throw '备份名已存在，请换个名字'
    } else {
      this.__notebook[key] = this.getState()
    }
  }
  restore (key) {
    let state = this.__notebook[key]
    if (state) {
      Object.assign(this, state)
      delete this.__notebook[key]
    }
  }
  clear () {
    this.__notebook = {}
  }
  getState () {
    let state = Object.assign({}, this)
    delete state.__notebook
    return state
  }
}

let state = new Memento({
  color: '#FFFFFF'
})
state.backup('white')
state.color = '#FFFF00'
console.log(state.color)
// ==> '#FFFF00'
state.restore('white')
console.log(state.color)
// ==> '#FFFFFF'
```
