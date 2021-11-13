const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  // 头像数据的快捷访问
  avatar: state => state.user.userInfo.staffPhoto,
  name: state => state.user.userInfo.username, // 建立用户名称的映射
  companyId: state => state.user.userInfo.companyId
}
export default getters
