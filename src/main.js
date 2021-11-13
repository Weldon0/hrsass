import Vue from 'vue'
import Print from 'vue-print-nb'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import '@/utils/request'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import Component from '@/components'

import * as filters from '@/filters'

console.log(filters)
// 获取对象的key，放到数组里面

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// 引入指令文件
import * as directives from './directives'

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

Vue.use(Component) // {install: (Vue) => {}} (Vue) => {}

// 打印插件注册好了
Vue.use(Print)
// 传入的参数对象 ==> install

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
