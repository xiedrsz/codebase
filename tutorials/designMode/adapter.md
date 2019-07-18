---
适配器模式（Adapter Pattern）是作为两个不兼容的接口之间的桥梁，将一个接口转换成客户希望的另一个接口。

* 主要解决：主要解决在软件系统中，常常要将一些"现存的对象"放到新的环境中，而新环境要求的接口是现对象不能满足的。
* 何时使用：
  * 系统需要使用现有的类，而此类的接口不符合系统的需要。
  * 想要建立一个可以重复使用的类，用于与一些彼此之间没有太大关联的一些类，包括一些可能在将来引进的类一起工作，这些源类不一定有一致的接口。
  * 通过接口转换，将一个类插入另一个类系中。（比如老虎和飞禽，现在多了一个飞虎，在不增加实体的需求下，增加一个适配器，在里面包容一个虎对象，实现飞的接口。）

```js
// 适配器模式
// es6的实现 电源适配器
// 插座
class Receptacle {
  constructor (type) {
    this.type = type
  }
  // 接通电源
  processing (plug) {
    if (this.type === plug.from) {
      console.log('电源接通了')
    }
  }
}

// 插头
class Plug {
  constructor (from) {
    this.from = from
  }
}

// 国内插座
class ReceptacleCN extends Receptacle {
  constructor () {
    super('China')
  }
}

// 香港电源适配器
class PowerAdapter extends Receptacle {
  constructor () {
    super()
    this.type = 'HongKong'
  }
}

// 装有适配器的插座
class ReceptacleTS extends ReceptacleCN {
  constructor () {
    super()
    // 装上适配器以支持香港插头
    this.adapter = new PowerAdapter()
  }
  // 接通电源
  processing (plug) {
    if (plug.from === 'China') {
      super.processing(plug)
    } else if (plug.from === 'HongKong') {
      this.adapter.processing(plug)
    } else {
      console.log('不支持的插头')
    }
  }
}

let plugA = new Plug('China')
let plugB = new Plug('HongKong')
let plugC = new Plug('Japan')
let receptacle = new ReceptacleTS()
receptacle.processing(plugA)  // ==> 电源接通了
receptacle.processing(plugB)  // ==> 电源接通了
receptacle.processing(plugC)  // ==> 不支持的插头

```