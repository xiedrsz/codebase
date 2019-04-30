/**
 * @module filter
 * @desc vue 过滤器
 * @author xiedrsz
 * @since 2018.09.04
 */
import Vue from 'vue'
import moment from 'moment'

/**
 * @method suffix 前后缀
 * @desc 前后缀
 * @Param {string} label 标签
 * @Param {boolean} [isFront] 是否为前缀
 * @return {string}
 */
Vue.filter('suffix', (value, label, isFront) => {
  if (value === 'undefined' || value === '') {
    return ''
  }
  return !isFront ? (value + label) : (label + value)
})

/**
 * @method fmoney 货币格式化
 * @desc 货币格式化
 * @param {number} [num] 小数点位数，不填为2
 * @return {string}
 */
Vue.filter('fmoney', (str, num) => {
  let n = num > 0 && num <= 20 ? num : 2
  let s = parseFloat((str + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  let i = 0
  let len = l.length
  for (; i < len; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != len ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
})

/**
 * @method signature 正负符号
 * @desc 正负符号
 * @return {string}
 */
Vue.filter('signature', str => {
  let signature = '+'
  str = +str
  if (str < 0) {
    signature = '−'
    str = -str
  }
  return `${signature} ${str}`
})

/**
 * @method divide 分隔数字
 * @desc 分隔数字
 * @param {number} [num = 4] 字符数目
 * @return {string}
 */
Vue.filter('divide', (value, num = 4) => {
  if (value === 'undefined' || value === '') {
    return ''
  }
  let reg = `\\d{${num}}`
  let less = ''
  let front
  value += ''
  value = value.replace(/\s+/g, '')
  reg = new RegExp(reg, 'g')
  front = value.match(reg) || []
  less = front.join('')
  less = value.replace(less, '')
  return `${front.join(' ')} ${less}`
})

/**
 * @method dateTime 时间戳转日期
 * @desc 时间戳转日期
 * @param {string} [format = 'YYYY-MM-DD'] 格式
 * @return {string}
 */
Vue.filter('dateTime', (value, format = 'YYYY-MM-DD') => {
  if (value === undefined || value === '') {
    return ''
  }
  return moment(value).format(format)
})

/**
 * @method maps 码表
 * @desc 码表
 * @param {string} [append = ''] 附加字段
 * @return {string}
 * @example
 * // 需要配置码表codeTB，如
 * {
 *    "__comments": "渠道类型",
 *    "DirectSellingBusiness":	"直销业务"
 * }  
 */
Vue.filter('maps', (value, append = '') => {
  return codeTB[`${append}${value}`] || value
})

/**
 * @method percentage 百分化
 * @desc 百分化
 * @param {number} [num = 0] 小数位数
 * @return {string}
 */
Vue.filter('percentage', (value, num = 0) => {
  if (/^\d+(\.\d+)?/.test(value)) {
    value *= 100
    value = value.toFixed(num)
    return `${value}%`
  }
  return value
})

/**
 * @method W 万
 * @desc 数字转万
 * @param {number} [num = 1] 小数位数
 * @return {string}
 */
Vue.filter('W', (value, num = 1) => {
  let temp = /\d+(.\d+)?/.exec(value) || []
  let wan
  temp = temp[0] || ''
  if (+temp > 10000) {
    wan = (temp / 10000).toFixed(num)
    value = (value + '').replace(temp, `${wan}万`)
  }
  return value
})
