---
* 打包后压缩成.zip
```
// webpack.prod.conf.js
// [1] 引入zip-webpack-plugin
const ZipPlugin = require('zip-webpack-plugin')
// [2] 在plugins数组中追加插件
new ZipPlugin({
    path: path.resolve(__dirname, '../dist'),
    filename: 'dist.zip'
})
```
