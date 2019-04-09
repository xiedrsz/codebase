// 减 1
function minus (minutes, seconds) {
  seconds--
  if (!~seconds) {
    if (!+minutes) {
      // 终止
      return false
    } else {
      minutes--
      seconds = 59
    }
  }
  if (minutes < 10) {
    minutes = '0' + +minutes
  }
  if (seconds < 10) {
    seconds = '0' + +seconds
  }
  return [minutes, seconds]
}

/**
 * @class Clock
 * @param {object} [config = {}] - 配置项
 * @property {string} config.minutes - 分钟数
 * @property {string} config.seconds - 秒钟数
 * @desc 计时器
 * @author xiedrsz
 * @since 2018.09.04
 */
class Clock {
  // 构造函数
  constructor (config = {}) {
    let {minutes, seconds} = config
    // 配置
    this.config = Object.assign({
      minutes: '02',
      seconds: '00'
    }, config)
    // 分钟
    this.minutes = minutes || '02'
    // 秒钟
    this.seconds = seconds || '00'
  }

  /**
   * @desc 开始
   */
  start () {
    let {minutes, seconds} = this
    let newTimes
    // 计时器
    this.timer = setInterval(() => {
      newTimes = minus(minutes, seconds)
      if (newTimes) {
        this.minutes = minutes = newTimes[0]
        this.seconds = seconds = newTimes[1]
        this.update(minutes, seconds, 'Ing')
      } else {
        // 终止
        this.update(minutes, seconds, 'Stop')
        clearInterval(this.timer)
      }
    }, 1000)
  }

  /**
   * @desc 暂停
   */
  pause () {
    clearInterval(this.timer)
    let {minutes, seconds} = this
    this.update(minutes, seconds, 'Pause')
  }

  /**
   * @desc 关闭
   */
  close () {
    clearInterval(this.timer)
  }

  /**
   * @desc 重新初始化，未开始
   */
  reInit () {
    clearInterval(this.timer)
    let config = this.config
    let {minutes, seconds} = config
    this.minutes = minutes
    this.seconds = seconds
    this.update(minutes, seconds, 'ReInit')
  }

  /**
   * @desc 重新开始
   */
  restart () {
    this.reInit()
    this.start()
  }

  /**
   * @desc 状态变化，时间变化
   * @param {function} func - 处理函数.
   * @return {this}
   */
  onStatusChange (func) {
    // Todo 非函数
    if (!func) {
      return this
    }
    /**
     * @member {function(minutes, seconds, status)}
     * @desc 更新函数
     */
    this.update = func
    return this
  }
}
