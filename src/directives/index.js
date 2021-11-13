export const imgerror = {
  inserted(dom, options) {
    // src属性如果一开始为空的情况下，不会触发error事件的
    dom.onerror = function() {
      //  src属性没有生效
      dom.src = options.value
    }
  },
  // 所有节点更新完成以后触发
  componentUpdated(dom, options) {
    // 使用默认头像数据
    dom.src = dom.src || options.value
  }
}
