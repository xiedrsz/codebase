---
* #### 解决 vuex 因为页面跳出导致状态被清除

> 原理：利用代理监听状态的改动，当状态发生变化时，将变化后的状态保存在sessionStorage中，页面跳回来时优先从sessionStorage中初始化，具体实现如下。
> tips: sessionStorage不保存空（''或数字0），所以初始化时要注意合并

```js
// [1] 在store/index.js中设置事件代理
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

let mstate = new Proxy(state, {
  set (target, key, value, receiver) {
    let oldState = sessionStorage.getItem('mstate') || '{}'
    oldState = JSON.parse(oldState)
    oldState[key] = value
    sessionStorage.setItem('mstate', JSON.stringify(oldState))
    return Reflect.set(target, key, value, receiver)
  }
})

export default new Vuex.Store({
  actions,
  getters,
  state: mstate,
  mutations
})
// [2] 在store/state.js中优先从sessionStorage初始化
let oldState = sessionStorage.getItem('mstate') || '{}'
let state = {
  // 默认值
  current: 0
}

oldState = JSON.parse(oldState)
Object.assign(state, oldState)

export default state
```
