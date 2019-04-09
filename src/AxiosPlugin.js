import axios from 'axios'

/**
 * @module AxiosPlugin
 * @desc Vue axios 插件
 * @author xiedrsz
 * @since 2018.09.04
 * @example
 * // 用法：
 * import Vue from 'vue'
 * import AxiosPlugin from './AxiosPlugin'
 * Vue.use(AxiosPlugin)
 */
export default {
  install (Vue) {
    Vue.prototype.$http = axios
    Vue.http = axios
  },
  $http: axios
}

export const $http = axios
