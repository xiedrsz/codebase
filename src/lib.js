/**
 * @module libs
 * @desc 第三方库
 * @author xiedrsz
 * @since 2018.09.04
 */
import moment from 'moment'

const Today = moment()

/**
 * @method sleep 等待
 * @desc 等待
 * @param {number} s - 等待时间，毫秒.
 * @return {Promise} Promise 对象.
 */
export const sleep = s => {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      resolve('promise resolved')
    }, s)
  })
}

/**
 * @method calcAge 计算年龄
 * @desc 根据身份证号计算年龄
 * @param {string} identityNo - 证件号码.
 * @return {number} 年龄.
 */
export const calcAge = identityNo => {
  if (!identityNo) {
    return
  }
  let ages = identityNo.match(/^[1-9]\d{5}(\d{4})(\d{2})(\d{2})(\d{3}[0-9Xx]|\*{4})$/) || []
  let birth = moment(`${ages[1]}-${ages[2]}-${ages[3]}`, 'YYYY-MM-DD')
  ages = Today.diff(birth, 'years', true)
  return ages
}

/**
 * @method formatDate 格式化时间
 * @desc 格式化时间
 * @param {Date} date - 时间
 * @param {string} fmt - 格式字符串
 * @return {string} 时间格式化字符串
 */
export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

/**
 * @method fmoney 金额格式化
 * @desc 金额格式化
 * @param {string} str 金额
 * @param {number} [num = 0] 保留小数点数
 */
export const fmoney = (str, num) => {
  let n = num > 0 && num <= 20 ? num : 0
  let s = parseFloat((str + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  let i = 0
  let len = l.length
  let res = ''
  for (; i < len; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== len ? ',' : '')
  }
  res = t.split('').reverse().join('')
  return r ? (res + '.' + r) : res
}

/**
 * @method getDistance 计算两点距离
 * @desc 根据经纬度计算两点距离
 * @param {number} lat1 纬度1
 * @param {number} lng1 经度1
 * @param {number} lat2 纬度2
 * @param {number} lng2 经度2
 * @return {number} 米
 */
export const getDistance = (lat1 = 0, lng1 = 0, lat2 = 0, lng2 = 0) => {
  let rad1 = lat1 * Math.PI / 180.0
  let rad2 = lat2 * Math.PI / 180.0
  let a = rad1 - rad2
  let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
  let r = 6378137
  let distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
  return distance
}

/**
 * @method timeDiff 计算时差
 * @desc 计算时差，距离现在
 * @param {string | number} end 结束时间
 * @return {object} days, hours, minutes, seconds
 */
export const timeDiff = end => {
  let now = moment()
  let seconds, days, hours, minutes
  end = moment(end)
  seconds = end.diff(now, 'seconds')
  days = seconds / 86400 | 0
  seconds %= 86400
  hours = seconds / 3600 | 0
  seconds %= 3600
  minutes = seconds / 60 | 0
  seconds %= 60
  return {
    days, hours, minutes, seconds
  }
}
