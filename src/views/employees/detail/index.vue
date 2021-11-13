<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form ref="userInfoForm" :model="formData" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="formData.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input v-model="formData.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!--            <UserComponent />-->
            <component :is="UserComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <component :is="JobComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
// 表单数据的绑定
// 校验规则
// form ==> :model  :rules
// from-item ==> prop="数据的key"
// input ==> v-model
import { getMinMaxRules, getRequiredRules } from '@/utils/validate'
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserComponent from '../components/user-info'
import JobInfo from '../components/job-info'

// componet内置的一个组件 用于动态去渲染其他组件
// component :is 属性如果接手的是一个字符串，组件注册过的组件的组件名称
// 接收组件实例，不需要注册，需要把引入的组件挂载到data上
export default {
  components: {},
  data() {
    return {
      UserComponent: UserComponent,
      JobComponent: JobInfo,
      formData: {
        username: '',
        password2: ''
      },
      rules: {
        username: [getRequiredRules('用户名')],
        password2: [getRequiredRules('密码'), getMinMaxRules(6, 9, '密码')]
      }
    }
  },
  computed: {
    // 获取当前用户所对应的id
    // 需求 需求  需求  解决什么问题
    // 你在干什么？
    userId() {
      return this.$route.params.id
    }
  },
  mounted() {
    console.log(this.$route)
  },
  created() {
    // 获取用户个人信息
    this.getUserDetailById()
  },
  methods: {
    async saveUser() {
      try {
        // 表单校验
        await this.$refs.userInfoForm.validate()
        await saveUserDetailById({
          ...this.formData,
          password: this.formData.password2
        })
        this.$message.success('修改用户信息成功')
      } catch (e) {
        console.log(e)
      }
      // 接口的提交
    },
    // 定义获取用户个人信息方法
    async getUserDetailById() {
      // 写出来
      this.formData = await getUserDetailById(this.userId)
    }
  }
}
</script>
