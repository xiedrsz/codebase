/**
 * @module public
 * @desc nodejs 前端自动部署
 * @author xiedrsz
 * @since 2018.09.04
 * @example
 * // 用法：
 * // [1] 将该文件放置与 build 文件夹中
 * // [2] 配置 package.json
 * "scripts": {
 *    "public": "npm run build && node build/public.js"
 *  }
 */

// .public.js
// module.exports = {
//   "host": "10.6.99.105",
//   "port": "22",
//   "username": "root",
//   "password": "qOoxhNzjxG@20171222",
//   "ROOT": "/software/workspace/jiulong-web/apache-tomcat-8.5.27/webapps/ROOT/"
// }

'use strict'
var ssh2 = require('ssh2');
var Client = ssh2.Client;
var config = require('../.public.js')
var ROOT = config.ROOT

/**
 * @function Connect 连接远程电脑
 * @desc 连接远程电脑
 * @param {object} server - 远程电脑凭证
 * @param {function(client)} then - 回调函数
 */
function Connect (server, then) {
  var conn = new Client();
  conn.on('ready', function () {
    console.log('Client :: ready');
    then(conn);
  }).on('error', function () {
    // console.log("connect error!");
  }).on('end', function () {
    // console.log("connect end!");
  }).on('close', function () {
    // console.log("connect close");
  }).connect(server);
}

/**
 * @function Shell 运行shell命令
 * @desc 运行shell命令
 * @param {object} server - 远程电脑凭证
 * @param {string} cmd - 执行的命令
 * @param {function} then - 回调函数
 */
function Shell (server, cmd, then) {
  Connect(server, function (conn) {
    conn.shell(function (err, stream) {
      if (err) {
        throw err;
      }
      stream
        .on('close', function () {
          console.log('Stream :: close');
          then()
          conn.end();
        })
        .on('data', function (data) {
          console.log('STDOUT: ' + data);
        })
        .stderr.on('data', function (data) {
          console.log('STDERR: ' + data);
        });
      stream.end(cmd);
    });
  });
}

/**
 * @function UploadFile 上传文件
 * @desc 上传文件
 * @param {object} server - 远程电脑凭证
 * @param {string} localPath - 本地路径
 * @param {string} remotePath - 远程路径
 * @param {function(err, result)} then - 回调函数
 */
function UploadFile (server, localPath, remotePath, then) {
  Connect(server, function (conn) {
    conn.sftp(function (err, sftp) {
      if (err) {
        then(err);
      } else {
        sftp.fastPut(localPath, remotePath, function (err, result) {
          conn.end();
          then(err, result);
        });
      }
    });
  });
}

// console.log('本地发布已关闭，请前往 Jenkins 发布')

/**
* 描述：发布
* [1] 上传文件 [2] 跳转到静态文件根目录 [3] 删除static文件夹 [4] 解压 [5] 删除dist.zip [6] 登出
* 回调：then(err, result)
*/
UploadFile(config, './dist/dist.zip', ROOT + 'dist.zip', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Upload Finish!!')
  var sh = 'cd ' + ROOT + ' && rm -rf static/ && unzip -o dist.zip && rm -f dist.zip && logout\n'
  Shell(config, sh, function () {
    console.log('Public success!!')
  })
})
