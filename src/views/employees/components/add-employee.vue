<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form
      ref="depFormRef"
      :model="elFormData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="elFormData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="elFormData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="elFormData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="elFormData.formOfEmployment"
          value="1"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="elFormData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="elFormData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          @blur="blurInput"
          @focus="getDepartments"
        />
        <el-tree
          v-if="showTree"
          v-loading="treeLoading"
          class="tree-node"
          :data="treeData"
          :props="{ label: 'name' }"
          :default-expand-all="true"
          icon-class=""
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="elFormData.correctionTime"
          style="width: 50%"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees'
import { getRequiredRules } from '@/utils/validate'
// 引入获取部门数据的接口
import { getDepartments } from '@/api/departs'
import { transData } from '@/utils'
import { addEmployee } from '@/api/employees'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployeeEnum,
      // 树形组件所需要的数据
      treeData: [],
      // 树组件loading效果
      treeLoading: false,
      // 是否展示树组件
      showTree: false,
      // 新增弹框所对应的数据对象
      elFormData: {
        username: '', // 用户姓名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门名称
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      // 新增弹框校验规则
      rules: {
        username: [
          //  不能为空
          getRequiredRules('用户名'),
          {
            min: 1,
            max: 4,
            trigger: 'blur',
            message: '用户名位数不符合规则'
          }
        ],
        mobile: [
          getRequiredRules('手机号'),
          {
            pattern: /^1[3-9]\d{9}$/,
            trigger: 'blur',
            message: '手机号不符合规则'
          }
        ], // 手机号
        formOfEmployment: [getRequiredRules('聘用形式')], // 聘用形式
        workNumber: [getRequiredRules('工号')], // 工号
        departmentName: [
          {
            required: true,
            trigger: 'change',
            message: '部门名称不能为空'
          }
        ], // 部门名称
        timeOfEntry: [getRequiredRules('入职时间')] // 入职时间
      }
    }
  },
  created() {
    // this.getDepartments()
  },
  methods: {
    async btnOk() {
      //  表单校验
      await this.$refs.depFormRef.validate()
      //  提交数据
      await addEmployee(this.elFormData)

      //  成功提示
      this.$message.success('添加成功')

      await this.$parent.getList()
      //  关闭弹层
      this.btnCancel()
    },
    blurInput() {
      setTimeout(() => {
        this.showTree = false
      }, 500)
    },
    selectNode(node) {
      console.log(node)
      this.elFormData.departmentName = node.name
      this.showTree = false
    },
    btnCancel() {
      this.elFormData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.depFormRef.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getDepartments() {
      // 树组件展示出来
      this.showTree = true
      // loding效果
      this.treeLoading = true
      const { depts } = await getDepartments()
      // 树组件所需要的数据
      this.treeData = transData(depts, '')
      this.treeLoading = false
    }
  }
}
</script>

<style scoped>
.tree-node {
  position: absolute;
  z-index: 1;
  width: 300px;
  border: 1px solid gray;
  border-radius: 5px;
  margin-top: 5px;
  height: 300px;
  overflow: auto;
}
</style>
