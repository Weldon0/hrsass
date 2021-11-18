import store from '@/store'
// vuex
export default {
  data() {
    return {
      message: '黑马'
    }
  },
  methods: {
    // checkPermission('point-user-delete')
    checkPermission(key) {
      const { userInfo } = store.state.user
      // points按钮所对应的权限
      if (userInfo.roles.points && userInfo.roles.points.length) {
        // 布尔值  true 拥有传入的权限
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}

