<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- 放置一个svg的图标 -->
    <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px" @click="changeScreen" />
  </div>
</template>
<script>
import ScreenFull from './utils/index'
export default {
  methods: {
    changeScreen() {
      // if (!document.fullscreenElement) {
      //   // 进入页面全屏
      //   document.documentElement.requestFullscreen()
      // } else {
      //   if (document.exitFullscreen) {
      //     // 退出全屏
      //     document.exitFullscreen()
      //   }
      // }
      // document.documentElement.requestFullscreen()
      if (!ScreenFull.isEnabled) {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
        return
      }
      // document.documentElement.requestFullscreen()
      //   如果可用 就可以全屏
      ScreenFull.toggle()
    }
  }
}
</script>
