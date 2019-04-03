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
