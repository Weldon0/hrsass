import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

// 白名单
const whiteList = ['/login', '/404']

// 前置守卫判断
router.beforeEach(async function(to, from, next) {
  // 获取token
  const token = store.getters.token
  NProgress.start() // 开启进度条
  //  判断是否含有token
  if (token) {
    // 是否有用户信息
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done() // 关闭进度条
})

router.afterEach(function() {
  NProgress.done() // 关闭进度条
})
