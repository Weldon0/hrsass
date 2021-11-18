import axios from 'axios'
import { Message } from 'element-ui'
import pending from './pending.js'
import store from '@/store'
import router from '@/router'
import { getTimeStamp } from '@/utils/auth'
const TIMEOUT = 3600

// this.$message

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // /api/sys/login
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // token注入
  // 是否有token
  const token = store.getters.token
  if (token) {
    // token是否过期
    if (checkTime()) {
    //  true过期
    //  退出登录
      store.dispatch('user/logout')
      //  跳转登录页面
      router.push('/login')
      //  接口抛错
      Message.error('token失效了~~~~~~')
      return Promise.reject('token失效了，时jj~~~~~')
    }
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, err => {
  return Promise.reject(new Error(err))
})

// 响应拦截器
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  //   要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, err => {
  // 状态码不是2xx的时候
  // 是不是token失效报的错
  // 退出登录
  // 跳转登录界面
  if (err?.response?.status === 401) {
    // token失效
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token过期，请重新登录') // 提示错误信息
    return Promise.reject(err)
  }
  Message.error(err.message) // 提示错误信息
  return Promise.reject(err) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})

function checkTime() {
// 当前时间-cookie里面存储的时间
  const currentTime = Date.now()
  const timeTamp = getTimeStamp()

  return (currentTime - timeTamp) / 1000 > TIMEOUT
}
export default service

