import wepy from 'wepy'

/**
 * @class InnerAudio
 * @desc 小程序音频控制类
 * @author xiedrsz
 * @since 2018.09.04
 */
class InnerAudio {
  // 构造函数
  constructor () {
    // 上下文
    this.context = wepy.createInnerAudioContext()
    // 静音控制
    wepy.setInnerAudioOption({
      mixWithOther: false,
      obeyMuteSwitch: false
    })
    // 状态
    this.status = 'Created'
    // 监听开始
    this.context.onPlay(() => {
      clearTimeout(this.timer)
      this.status = 'Play'
      this.update(this.status)
    })
    // 监听错误
    this.context.onError(res => {
      this.status = 'Error'
      this.update(this.status, res)
    })
    // 监听结束
    this.context.onEnded(() => {
      this.status = 'End'
      this.update(this.status)
    })
    // 监听停止
    this.context.onStop(() => {
      this.status = 'Stop'
      this.update(this.status)
    })
    // 监听加载中
    this.context.onWaiting(() => {
      this.status = 'Waiting'
      console.log('Waiting')
      this.update(this.status)
    })
    // 监听被暂停
    this.context.onPause(() => {
      this.timer = setTimeout(() => {
        clearTimeout(this.timer)
        this.status = 'Pause'
        this.update(this.status)
      }, 10000)
    })
  }

  /**
   * @desc 设置音频源
   * @param {string} src - 音频源
   * @return {this}
   */
  setSrc (src) {
    this.context.src = src
    return this
  }

  /**
   * @desc 开始
   */
  play () {
    // 设置起点
    this.context.seek(0)
    this.context.play()
  }

  /**
   * @desc 停止
   */
  stop () {
    this.context.stop()
  }

  /**
   * @desc 状态变化
   * @param {function} func - 处理函数
   * @return {this}
   */
  onStatusChange (func) {
    // Todo 非函数
    if (!func) {
      return this
    }
    /**
     * @member {function(status)}
     * @desc 更新函数
     */
    this.update = func
    return this
  }
}

export default InnerAudio
