---
* #### wxParse - 微信小程序富文本解析自定义组件, 支持HTML及markdown解析

## Github

[点我](https://github.com/icindy/wxParse.git) 查看

## 特性

| 支持特性        | 实验功能           | ToDo  |
| ------------- | ------------------| ------|
| HTML的大部分标签解析 |  小表情emjio |  table标签 |
| 内联style          |  a标签跳转   |         |
| 标签Class          |  动态添加    |            |
| 图片自适应规则       |            |            |
| 图片多图片预览       |            |            |
| 模版层级可扩展性     |            |            |
| 多数据循环方式       |            |            |
| 内联style          |            |            |

## 基本使用方法

* 1. Copy文件夹`wxParse`
  ```
  |- wxParse/
      |- wxParse.js(必须存在)
      |- html2json.js(必须存在)
      |- htmlparser.js(必须存在)
      |- showdown.js(必须存在)
      |- wxDiscode.js(必须存在)
      |- wxParse.wxml(必须存在)
      |- wxParse.wxss(必须存在)
      |- emojis(可选)
  ```

* 2. 引入必要文件
  ``` js
  // 在使用的View中引入WxParse模块
  var WxParse = require('../../wxParse/wxParse.js');
  ```

    ``` css
    /** 在使用的Wxss中引入WxParse.css,可以在app.wxss */
    @import "/wxParse/wxParse.wxss";
    ```

* 3. 数据绑定
  ``` js
  var article = '<div>我是HTML代码</div>';
  var that = this;
  /**
      * WxParse.wxParse(bindName , type, data, target,imagePadding)
      * 1.bindName绑定的数据名(必填)
      * 2.type可以为html或者md(必填)
      * 3.data为传入的具体数据(必填)
      * 4.target为Page对象,一般为this(必填)
      * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
      */
  WxParse.wxParse('article', 'html', article, that, 5);
  ```

* 4. 模版引用
  ``` html
  <!-- 引入模板 -->
  <import src="你的路径/wxParse/wxParse.wxml"/>
  <!-- 这里data中article为bindName -->
  <template is="wxParse" data="{{wxParseData:article.nodes}}"/>
  ```