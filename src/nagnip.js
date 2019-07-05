/**
 * @module P_A
 * @desc nagnip(反)
 * @author xiedrsz
 * @since 2018.09.04
 */

/**
 * @method shareImg 分享图片
 * @desc 分享图片
 * @param {string} imgUrl - 图片base64编码
 */
export const shareImg = imgUrl => {
  return new Promise(resolve => {
    window.onShareImg = () => {
      resolve()
    }
    let params = {
      'MethodName': 'showShareViewWithImg',
      'Parameters': {
        'ImageData': imgUrl,
        'jsCallBack': 'onShareImg',
        'talkDataParams': 'H5埋点talkdata数据'
      }
    }
    // ppAzch (反)
    window.ppAzch.CallNative(JSON.stringify(params))
  })
}

/**
 * @method popWebview
 * @desc 关闭webView，并返回上一页
 */
export const popWebview = () => {
  // ppAzch (反)
  window.ppAzch.CallNative('{"MethodName":"popSelfVC"}')
}
