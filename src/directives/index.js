export const imgerror = {
  inserted(dom, options) {
    //  如果dom的errror事件会触发
    dom.onerror = function() {
      //  src属性没有生效
      dom.src = options.value
    }
  }
}
