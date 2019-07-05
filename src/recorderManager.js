import wepy from 'wepy'

// 录音选项
const RecordOption = {
  // 2分钟 (调多10s)
  duration: 130000,
  // 采样率
  sampleRate: 8000,
  // 单通道
  numberOfChannels: 1,
  // 格式，暂
  format: 'mp3'
}

/**
 * @class RecorderManager
 * @desc 小程序录音管理类
 * @author xiedrsz
 * @since 2018.09.04
 */
export default class RecorderManager {
  // 构造函数
  constructor () {
    // 管理器
    this.manager = wepy.getRecorderManager()
    // 状态
    this.status = 'Created'
    // 监听开始
    this.manager.onStart(() => {
      this.status = 'Start'
      this.update(this.status)
    })
    // 监听错误
    this.manager.onError(({errMsg}) => {
      this.status = 'Error'
      this.update(this.status, errMsg)
    })
    // 监听停止
    this.manager.onStop(({tempFilePath}) => {
      this.status = 'Stop'
      this.update(this.status, tempFilePath)
    })
  }

  /**
   * @desc 开始
   */
  start () {
    this.manager.start(RecordOption)
  }

  /**
   * @desc 停止
   */
  stop () {
    if (this.status === 'Start') {
      this.manager.stop()
    }
  }

  /**
   * @desc 状态变化
   * @param {function} func - 处理函数.
   * @return {this}
   */
  onStatusChange (func) {
    // Todo 非函数
    if (!func) {
      return this
    }
    /**
     * @member {function(status, tempFilePath)}
     * @desc 更新函数
     */
    this.update = func
    return this
  }
}
