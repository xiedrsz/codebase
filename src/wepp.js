/**
 * @module wepp
 * @desc wepy框架小程序API库，来源于招聘项目
 * @author xiedrsz
 * @since 2018.09.04
 */
import wepy from 'wepy'

/**
 * @method chooseImageFromAlbum
 * @desc 从相册中选择图片
 * @return {Promise} Promise 对象.
 */
export const chooseImageFromAlbum = () => {
  return wepy.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album']
  })
}

/**
 * @method chooseImageByCapture
 * @desc 拍照
 * @return {Promise} Promise 对象.
 */
export const chooseImageByCapture = () => {
  return wepy.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['camera']
  })
}

/**
 * @method imgTobs64 图片转base64
 * @desc 图片转base64
 * @param {string} filePath 图片路径（包括临时路径）.
 * @return {Promise} Promise 对象.
 */
export const imgTobs64 = filePath => {
  let FSM = wx.getFileSystemManager()
  return new Promise(resolve => {
    FSM.readFile({
      filePath,
      encoding: 'base64',
      complete (res) {
        resolve(`data:image/jpg;base64,${res.data}`)
      }
    })
  })
}

/**
 * @method bs64Tofile base64转文件
 * @desc base64转文件
 * @param {string} bs64 - 图片的base64编码
 * @param {string} path - 图片保存路径
 */
export const bs64Tofile = (bs64, path) => {
  let userPath = wx.env.USER_DATA_PATH
  let manager = wx.getFileSystemManager()
  path = path ? `${userPath}/${path}` : `${userPath}/pa_picker_head.jpg`
  bs64 = bs64.replace(/^data.*,/, '')
  manager.writeFileSync(path, bs64, 'base64')
}

/**
 * @method saveFile 保存临时文件
 * @desc 保存临时文件，目前只针对头像
 * @param {string} tempFilePath - 临时文件路径
 */
export const saveFile = tempFilePath => {
  let userPath = wx.env.USER_DATA_PATH
  let filePath = `${userPath}/pa_picker_head.jpg`
  let manager = wx.getFileSystemManager()
  manager.saveFile({
    tempFilePath,
    filePath,
    success (res) {
      console.log(res)
    },
    fail (err) {
      console.log(err)
    }
  })
}

/**
 * @method saveImageToPhotosAlbum 保存到相册
 * @desc saveImageToPhotosAlbum
 * @param {string} filePath - 文件路径
 */
export const saveImageToPhotosAlbum = filePath => {
  let userPath = wx.env.USER_DATA_PATH
  return wepy.saveImageToPhotosAlbum({
    filePath: `${userPath}/${filePath}`
  })
}
