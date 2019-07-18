---
中介者模式（Mediator Pattern）是用来降低多个对象和类之间的通信复杂性。这种模式提供了一个中介类，该类通常处理不同类之间的通信，并支持松耦合，使代码易于维护。中介者模式属于行为型模式。

* 主要解决: 对象与对象之间存在大量的关联关系，这样势必会导致系统的结构变得很复杂，同时若一个对象发生改变，我们也需要跟踪与之相关联的对象，同时做出相应的处理。
* 何时使用: 多个类相互耦合，形成了网状结构。

tip: 中介者模式实例很多， 如QQ游戏平台，聊天室、QQ群、短信平台和房产中介等

```js
// 中介者模式
// es6实现
class ChatRoom {
  static users = []
  static distribute (msg) {
    ChatRoom.users.forEach(user => {
      user.receiveMessage(msg)
    })
  }
  static join (user) {
    ChatRoom.users.push(user)
  }
}

class User {
  constructor (name) {
    this.name = name
  }
  sendMessage (msg) {
    ChatRoom.distribute(msg)
  }
  receiveMessage (msg) {
    console.log(`I am ${this.name}.The message I have just received is: ${msg}`)
  }
}

let user1 = new User('John')
let user2 = new User('Ami')
ChatRoom.join(user1)
ChatRoom.join(user2)
user1.sendMessage('Hello! My name is John.')
```
