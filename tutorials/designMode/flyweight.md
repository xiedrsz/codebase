---
享元模式（Flyweight Pattern）主要用于减少创建对象的数量，以减少内存占用和提高性能。享元模式尝试重用现有的同类对象，如果未找到匹配的对象，则创建新对象。

* 主要解决：在有大量对象时，有可能会造成内存溢出，我们把其中共同的部分抽象出来，如果有相同的业务请求，直接返回在内存中已有的对象，避免重新创建。
* 何时使用：
  * 系统中有大量对象。
  * 这些对象消耗大量内存。
  * 这些对象的状态大部分可以外部化。
  * 这些对象可以按照内蕴状态分为很多组，当把外蕴对象从对象中剔除出来时，每一组对象都可以用一个对象来代替。
  * 系统不依赖于这些对象身份，这些对象是不可分辨的。

tip: 如解决DOM长列表问题

```js
// 享元模式
// es6 实现
// 实例 视频中的弹幕消息
class Message {
  constructor (msg = '', x = 0) {
    this.msg = msg
    this.x = x
  }
  setMsg (msg) {
    this.msg = msg
    this.x = 0
  }
  move () {
    return new Promise(resolve => {
      let timer = setInterval(() => {
        if (this.x < 10) {
          this.x += 1
        } else {
          clearInterval(timer)
          resolve('消失了')
        }
      }, 100)
    })
  }
}

// 消息堆
let messageContainer = []
// 获取消息
function getMessage (msg) {
  let message = messageContainer.shift()
  if (!message) {
    console.log('new')
    message = new Message()
  }
  message.setMsg(msg)
  return message
}

let num = 0
setInterval(() => {
  console.log(messageContainer.length)
  num += 1
  let message = getMessage(num)
  message.move().then(() => {
    // 回收资源
    messageContainer.push(message)
  })
}, 600)
// ==> 0
// ==> new
// ==> 0
// ==> new
// ==> 1
```
