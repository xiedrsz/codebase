/**
 * @class Memento
 * @param {object} stateObj - 目标对象
 * @desc 备忘录
 * @author xiedrsz
 * @since 2019.07.22
 */
class Memento {
  constructor (stateObj = {}) {
    Object.assign(this, stateObj)
    this.__notebook = {}
  }
  /**
   * @desc 备份
   * @param {string} key - 键.
   */
  backup (key) {
    if (!key) {
      throw '请输入备份名'
    }
    if (this.__notebook[key]) {
      throw '备份名已存在，请换个名字'
    } else {
      this.__notebook[key] = this.getState()
    }
  }
  /**
   * @desc 恢复
   * @param {string} key - 键.
   */
  restore (key) {
    let state = this.__notebook[key]
    if (state) {
      Object.assign(this, state)
      delete this.__notebook[key]
    }
  }
  /**
   * @desc 清空备份
   */
  clear () {
    this.__notebook = {}
  }
  /**
   * @desc 获取当前状态
   * @return {object} state
   */
  getState () {
    let state = Object.assign({}, this)
    delete state.__notebook
    return state
  }
}

export default Memento
