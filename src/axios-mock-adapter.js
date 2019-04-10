/**
 * @module axios-mock-adapter
 * @desc axios mock 配置
 * @author xiedrsz
 * @since 2018.09.04
 * @example
 * // Apis.js
 * export default [
 *    'getUsers'
 * ]
 * // test.js
 * export default {
 *    getUsers: {
 *       path: '/users',
 *       method: 'GET',
 *       pattern: {
 *         'users|1-10': [{
 *             // 属性id是一个自增数，起始值为1，每次增1 
 *             'id|+1': 1,
 *             'name': '@name'
 *         }]
 *       }
 *    }
 * }
 */

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Mock from 'mockjs'

import Apis from './Apis'
import Test from './test'

const mock = new MockAdapter(axios)
const Responses = Object.assign({}, Test)
const Meth = {
  GET: 'onGet',
  POST: 'onPost'
}

Apis.forEach(name => {
  let item = Responses[name] || {}
  let path = item.path
  let method = item.method
  let pattern = item.pattern
  /* eslint no-cond-assign: "off" */
  if (method = Meth[method]) {
    mock[method](path).reply(() => {
      let res = Mock.mock(pattern)
      return [200, res]
    })
  }
})

// 通过没有配置的
mock.onAny().passThrough()
