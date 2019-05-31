/**
 * @desc 正则表达式
 * @author xiedrsz
 * @since 2018.09.04
 * @enum {RegExp}
 */
const RegEx = {
  /** @desc 手机号 **/
  mobile: /^1[345789]\d{9}$/,
  /** @desc 中国车牌号 **/
  clicense: /^[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][A-Z][A-Z0-9]{5}$/
}

export default RegEx
