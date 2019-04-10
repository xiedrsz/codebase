/**
 * @class MSocket
 * @desc 小程序即时通讯Socket类
 * @author xiedrsz
 * @since 2018.09.04
 * @todo 路径是固定的
 */
class MSocket {
  constructor () {
    this.connect()
  }

  /**
   * @desc 发送
   * @param {object} data - 数据
   */
  send (data) {
    data = JSON.stringify(data)
    this.socketTask.send({
      data
    })
  }

  /**
   * @desc 连接
   */
  connect () {
    let socketTask = wx.connectSocket({
      url: 'wss://www.domain.com'
    })
    // 接收
    socketTask.onMessage(({data}) => {
      data = JSON.parse(data)
      this.callFunc(data)
    })
    this.socketTask = socketTask
  }

  /**
   * @desc 重新连接
   */
  reconnect () {
    let readyState = this.socketTask.readyState
    if (readyState > 1) {
      this.connect()
    }
  }

  /**
   * @desc 关闭
   */
  close () {
    this.socketTask.close()
  }

  /**
   * @desc 响应信息
   * @param {function} func - 回调函数
   */
  onMessage (func) {
    /**
     * @member {function(data)}
     * @desc 回调函数
     */
    this.callFunc = func
    return this
  }
}

export default MSocket
