---
* #### 装饰器模式

装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。

> * 主要解决：一般的，我们为了扩展一个类经常使用继承方式实现，由于继承为类引入静态特征，并且随着扩展功能的增多，子类会很膨胀。
> * 何时使用：在不想增加很多子类的情况下扩展类。

```js
// es7 实现(es7中引入了装饰器，目前在实验阶段)
// 构建一个英雄 百里
// 百里是个人，创建一个普通人
class Bali1 {
  constructor (def = 20, atk = 20, speed = 20) {
    this.init(def, atk, speed)
  }
  init (def, atk, speed) {
    this.def = def
    this.atk = atk
    this.speed = speed
  }
  toString () {
    let {def, atk, speed} = this
    return `当前英雄属性：防御 ${def}，攻击 ${atk}，速度 ${speed}。`
  }
}

let baili = new Bali1()
console.log(baili + '')
// ==> 当前英雄属性：防御 20，攻击 20，速度 20。

// 给百里装配把枪
function decorateGun (target, key, descriptor) {
  const method = descriptor.value
  // 增加 100 攻击
  let moreAtk = 100
  descriptor.value = (...args) => {
    // 攻击在第二个参数
    args[1] += moreAtk
    return method.apply(target, args)
  }
  return descriptor
}

// 给百里装配双靴子
function decorateBoots (target, key, descriptor) {
  const method = descriptor.value
  // 增加 100 移动速度
  let moreSpeed = 100
  descriptor.value = (...args) => {
    // 移动速度在第三个参数
    args[2] += moreSpeed
    return method.apply(target, args)
  }
  return descriptor
}

// 教百里射击技能
function addFire (isGet) {
  return function (target) {
    target.prototype.fire = () => {
      let msg = isGet ? '射出一颗子弹' : '呃哦，还没学会!'
      console.log(msg)
    }
    return target
  }
}

// 重新对百里进行封装
@addFire(true)
class Baili {
  constructor (def = 20, atk = 20, speed = 20) {
    this.init(def, atk, speed)
  }
  @decorateGun
  @decorateBoots
  init (def, atk, speed) {
    this.def = def
    this.atk = atk
    this.speed = speed
  }
  toString () {
    let {def, atk, speed} = this
    return `当前英雄属性：防御 ${def}，攻击 ${atk}，速度 ${speed}。`
  }
}

let baili2 = new Baili()
console.log(baili2 + '')
// ==> 当前英雄属性：防御 20，攻击 120，速度 120。
```
