---
* #### 原型模式

将一个类的原型指向一个对象（或另个一类/实例化对象的原型），实现对类的原型的共享。实现原理是基于JavaScript的原型链（prototype）

```js
// es5 实现
function Human () {}
Human.prototype = {
  character: 'yellow',
  sayHello: function () {
    console.log('Hi! I am a yellow race.')
  }
}

var person1 = new Human()
var person2 = new Human()
person1.character === person2.character  // ==> true
person1.sayHello()                       // ==> Hi! I am a yellow race.
person2.sayHello()                       // ==> Hi! I am a yellow race.
person1 === person2                      // ==> false

Human.prototype.country = 'china'
person1.country                          // ==> china

```
