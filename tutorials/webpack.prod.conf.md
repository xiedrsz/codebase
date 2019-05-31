---
* 打包后压缩成.zip
```js
// webpack.prod.conf.js
// [1] 引入zip-webpack-plugin
const ZipPlugin = require('zip-webpack-plugin')
// [2] 在plugins数组中追加插件
new ZipPlugin({
    path: path.resolve(__dirname, '../dist'),
    filename: 'dist.zip'
})
```

* 根据环境不同引入不同模块
```js
// [1] 为不同环境创建自个模块，如
// a. /config/profile_dev.js
// b. /config/profile_prod.js
// [2] 在使用的地方导入模块，使用一个标志位（如TARGET）表示环境
import profile from './profile_TARGET'
// [3] 在webpack对应配置文件中将模块替换
// 在plugins数组中追加插件
new webpack.NormalModuleReplacementPlugin(/(.*)_TARGET(\.*)/, function (resource) {
    resource.request = resource.request.replace(/_TARGET/, '_dev');
})
```
