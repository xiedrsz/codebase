---
* #### 解决 IOS 微信浏览器页面滚动卡顿

> 原因：当滚动页面节点时，IOS 上整个页面也会跟随这滚动，因此导致卡顿
> 原理：阻止页面滚动，至对需要滚动的节点添加滚动事件

```less
// [1] 修改样式，为需要滚动的节点添加样式 -webkit-overflow-scrolling: touch; 该样式只对 IOS 有效，ANDROID 无效, 如
<style lang="less">
  #app {
    -webkit-overflow-scrolling: touch;
  }
</style>
```

```js
// [2] 阻止页面滚动及添加滚动事件: 本来只做 [1] 中的修改后页面滚动已经很好了，但是由于整个页面也会跟着滚动，因此会看到黑色的底部，因此还需做这一步的优化
let overscroll = els => {
  for (let i = 0; i < els.length; ++i) {
    let el = els[i]
    el.addEventListener('touchstart', function () {
      let top = this.scrollTop
      let totalScroll = this.scrollHeight
      let currentScroll = top + this.offsetHeight
      if (top === 0) {
        this.scrollTop = 1
      } else if (currentScroll === totalScroll) {
        this.scrollTop = top - 1
      }
    })
    el.addEventListener('touchmove', function (evt) {
      if (this.offsetHeight < this.scrollHeight)
        evt._isScroller = true
    })
  }
}
// 禁止body的滚动事件
document.body.addEventListener('touchmove', function (evt) {
  if (!evt._isScroller) {
    evt.preventDefault()
  }
})
// 给class为.scroll的元素加上自定义的滚动事件
overscroll(document.querySelectorAll('.scroll'))
```

```html
<!-- [3] 给需要滚动的元素添加类 scroll，如-->
<div id="app" class="scroll">
  <router-view/>
</div>
```

```less
// [4] 添加样式 position: static; 原因不详，可无
<style lang="less">
  #app {
    -webkit-overflow-scrolling: touch;
    position: static;
  }
</style>
```
