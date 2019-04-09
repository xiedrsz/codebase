/**
 * @module filter
 * @desc vue 过滤器
 * @author xiedrsz
 * @since 2018.09.04
 */
import Vue from 'vue'

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
