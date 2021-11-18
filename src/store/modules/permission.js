import { constantRoutes, asyncRoutes } from '@/router'

const state = {
  // 维护当前项目的路由信息
  router: constantRoutes
}

const mutations = {
  // newRouter 用户动态路由权限 [{}, {}]
  setRouter: (state, newRouter) => {
    state.router = [
      ...constantRoutes, // 静态路由
      ...newRouter
    ]
  }
}

const actions = {
  filterRouter(context, menus) {
    // ['setttins', 'emp']
    console.log(asyncRoutes)
    //  menus 用户所对应的权限列表
    //  动态路由
    const routers = []

    menus.forEach(key => {
      routers.push(...asyncRoutes.filter(item => item.name === key))
    })

    // 用户所拥有的动态路由的列表
    console.log(routers)

    context.commit('setRouter', routers) // 左侧菜单展示
    // 添加到动态路由 ==> 访问
    // router.addRouter(routers)
    return routers
  }
}

// 获取到用户权限信息，判断用户是否有访问某个路由的权限

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
