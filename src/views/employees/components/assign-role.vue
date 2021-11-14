<template>
  <el-dialog
    v-loading="loading"
    title="分配角色"
    :visible="dialogVisible"
    width="30%"
    @close="btnCancel"
  >
    <!-- v-model属性为复选框组选中的list列表-->
    <!--    ['1', '2']-->
    <el-checkbox-group v-model="checkList">
      <!--label 属性为当前复选框对应的值-->
      <!--如果节点中无内容，label属性也会充当界面的展示内容-->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-button size="mini" @click="btnCancel">取 消</el-button>
          <el-button type="primary" size="mini" @click="btnOk">确 定</el-button>
        </el-col>
      </el-row>
    </span>
  </el-dialog>
</template>

<script>
// 获取角色列表
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  name: 'AssignRole',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String
    }
  },
  data() {
    return {
      checkList: [],
      list: [] // 存储预定义好的角色数据的
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async btnOk() {
      console.log(this.userId)
      // 当前选中的角色信息
      // this.checkList
      // 当前用户从哪来
      // 父组件通过自定义属性进行传递 userId
      await assignRoles({
        id: this.userId,
        roleIds: this.checkList
      })

      this.$message.success('修改角色信息成功')
      this.btnCancel()
    },
    btnCancel() {
      this.checkList = []
      this.$emit('update:dialogVisible', false)
    },
    async getRoleList() {
      this.loading = true
      try {
        const { rows } = await getRoleList()
        this.list = rows
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    async getRoleDetailById(id) {
      // 当前用户所对应的角色信息
      const { roleIds } = await getUserDetailById(id)
      console.log(roleIds)
      this.checkList = roleIds
    }
  }
}
</script>
