<template>
  <el-dropdown @command="changeLanguage">
    <div>
      <svg-icon style="color:#fff;font-size:20px" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="'zh'=== $i18n.locale">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="'en'=== $i18n.locale">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import Cookie from 'js-cookie'

export default {
  methods: {
    changeLanguage(lang) {
      // 存储本地的目的是为了持久化
      Cookie.set('language', lang) // 切换多语言
      this.$i18n.locale = lang // 设置给本地的i18n插件
      // 进行成功的提示
      this.$message.success('设置语言成功')
    }
  }
}
</script>
