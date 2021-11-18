import { setToken, removeToken, getToken, setTimeStamp } from '@/utils/auth'
import { getInfo, getUserDetailById, login } from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userInfo: {} // 存储用户信息的数据
}

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo }
  },
  removeUserInfo(state) {
    state.userInfo = {}
  },
  setToken(state, token) {
    // 登录成功的时候 vuex
    state.token = token
    // cookie
    setToken(token)
  },
  removeToken() {
    state.token = null
    removeToken()
  }
}
const actions = {
  async login(context, data) {
    // 请求接口数据
    const res = await login(data) // 接口的请求
    context.commit('setToken', res)
    setTimeStamp()
  },
  async getUserInfo(context) {
    const data = await getInfo()
    // 接手一个参数 userId
    const baseInfo = await getUserDetailById(data.userId)
    const allUserInfo = {
      ...data,
      ...baseInfo
    }
    context.commit('setUserInfo', allUserInfo)
    return allUserInfo
  },
  logout(context) {
    //  token
    context.commit('removeToken')
    //  userInfo
    context.commit('removeUserInfo')

    //  重置路由匹配信息
    resetRouter()
    //  vuex保存router清空
    //  设置成  { root: true } 就表示当前的context不是子模块了 而是父模块
    context.commit('permission/setRouter', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
