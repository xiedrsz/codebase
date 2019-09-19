/**
 * @module libs
 * @desc 第三方库
 * @author xiedrsz
 * @since 2018.09.04
 */
import moment from 'moment'

const Today = moment()

const charMapForVin = {
  'A': 1,
  'B': 2,
  'C': 3,
  'D': 4,
  'E': 5,
  'F': 6,
  'G': 7,
  'H': 8,
  'J': 1,
  'K': 2,
  'L': 3,
  'M': 4,
  'N': 5,
  'P': 7,
  'R': 9,
  'S': 2,
  'T': 3,
  'U': 4,
  'V': 5,
  'W': 6,
  'X': 7,
  'Y': 8,
  'Z': 9
}

/**
 * @method sleep 等待
 * @desc 等待
 * @param {number} s - 等待时间，毫秒.
 * @return {Promise} Promise 对象.
 */
export const sleep = s => {
  return new Promise(resolve => {
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
 * @todo 待认证
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
      // eslint-disable-next-line no-undef
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

/**
 * @method checkVin 车架号校验
 * @desc 车架号算法校验
 * @param {string} [vin = ''] 车架号
 * @return {boolean} [true | false]
 */
export const checkVin = (vin = '') => {
  if (vin.length > 0 && vin.length !== 17) {
    return false
  }
  let sum = 0
  let check
  let i
  vin = vin.toUpperCase().split('').map((temp, i) => {
    if (i === 8) {
      return temp
    } else {
      return charMapForVin[temp] || +temp
    }
  })
  for (i = 0; i < 7; i++) {
    sum += vin[i] * (8 - i)
  }
  sum += vin[7] * 10
  for (i = 9; i < 17; i++) {
    sum += vin[i] * (18 - i)
  }
  check = sum % 11 + ''
  if (check === '10') {
    return vin[8] === 'X'
  } else {
    return vin[8] === check
  }
}

/**
 * @method downloadFile 下载
 * @desc 浏览器端生成文件并下载
 * @param {string} [filename = '下载'] 文件名
 * @param {string} [content = ''] 文件内容
 */
export const downloadFile = (filename = '下载', content = '') => {
  let uriContent = `data:application/octet-stream,${encodeURIComponent(content)}`
  let link = document.createElement('a')

  link.download = filename
  link.href = uriContent
  link.target = '_blank'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  link.remove()
}
