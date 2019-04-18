// 减 1
function minus (seconds = 0, minutes = 0, hours = 0, days = 0, dLen = 0) {
  let isEnd = false
  // 秒针
  function secondHandle () {
    seconds--
    if (!~seconds) {
      seconds = 59
      minuteHandle()
    }
  }

  // 分针
  function minuteHandle () {
    minutes--
    if (!~minutes) {
      minutes = 59
      hourHandle()
    }
  }

  // 时针
  function hourHandle () {
    hours--
    if (!~hours) {
      hours = 23
      dayHandle()
    }
  }

  // 天数
  function dayHandle () {
    days--
    if (!~days) {
      // 终止
      isEnd = true
    }
  }

  secondHandle()
  seconds = `00${seconds}`.substr(-2)
  minutes = `00${minutes}`.substr(-2)
  hours = `00${hours}`.substr(-2)
  days = dLen ? `000${days}`.substr(-dLen) : days
  return !isEnd ? {seconds, minutes, hours, days} : false
}

/**
 * @class Clock
 * @param {object} [config = {}] - 配置项
 * @property {string} config.minutes - 分钟数
 * @property {string} config.seconds - 秒钟数
 * @property {string} config.hours - 小时数
 * @property {string} config.days - 天数
 * @desc 计时器
 * @author xiedrsz
 * @since 2018.09.04
 */
class Clock {
  // 构造函数
  constructor (config = {}) {
    let {days, hours, minutes, seconds} = config
    // 配置
    this.config = Object.assign({
      days: '0',
      hours: '00',
      minutes: '02',
      seconds: '00'
    }, config)
    // 天数
    this.days = days || '0'
    // 天数长度
    this.dLen = this.days.length
    // 小时
    this.hours = hours || '00'
    // 分钟
    this.minutes = minutes || '02'
    // 秒钟
    this.seconds = seconds || '00'
  }

  /**
   * @desc 开始
   */
  start () {
    let {minutes, seconds, days, hours, dLen} = this
    let newTimes
    // 计时器
    this.timer = setInterval(() => {
      newTimes = minus(seconds, minutes, hours, days, dLen)
      if (newTimes) {
        this.seconds = seconds = newTimes.seconds
        this.minutes = minutes = newTimes.minutes
        this.hours = hours = newTimes.hours
        this.days = days = newTimes.days
        this.update(newTimes, 'Ing')
      } else {
        // 终止
        this.update({minutes, seconds, days, hours}, 'Stop')
        clearInterval(this.timer)
      }
    }, 1000)
  }

  /**
   * @desc 暂停
   */
  pause () {
    clearInterval(this.timer)
    let {minutes, seconds, days, hours} = this
    this.update({minutes, seconds, days, hours}, 'Pause')
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
    let {minutes, seconds, days, hours} = this.config
    this.minutes = minutes
    this.seconds = seconds
    this.hours = hours
    this.days = days
    this.update({minutes, seconds, days, hours}, 'ReInit')
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
     * @member {function(newTime, status)}
     * @desc 更新函数
     */
    this.update = func
    return this
  }
}

export default Clock
