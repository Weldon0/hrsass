import { setToken, removeToken, getToken, setTimeStamp } from '@/utils/auth'
import { getInfo, getUserDetailById, login } from '@/api/user'

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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
