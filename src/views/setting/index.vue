<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog=true"
              >
                新增角色
              </el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="list" border="">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template v-slot="{row}">
                  <el-button size="small" type="success" @click="assginPermission(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                layout="prev, pager, next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="permissionShowDialog"
      width="30%"
    >
      <el-tree
        ref="permissionRef"
        :data="permissionList"
        :props=" { label: 'name' }"
        :show-checkbox="true"
        :check-strictly="true"
        default-expand-all
        :default-checked-keys="selectCheck"
        node-key="id"
      />
      <span slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="" size="mini" @click="cancelPermissionDialog">取消</el-button>
            <el-button type="primary" size="mini" @click="submitPermission">确定</el-button>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addRole, assignPerm, deleteRole, getCompanyInfo, getRoleDetail, getRoleList, updateRole } from '@/api/setting'
import { mapGetters } from 'vuex'
import { getPermissionList } from '@/api/permission'
import { transData } from '@/utils'

// 获取数据 树形组件正确的展示
// 默认选中的展示
export default {
  data() {
    return {
      roleId: '',
      permissionList: [{ id: 1,
        name: '测试节点' }],
      selectCheck: [],
      permissionShowDialog: false,
      roleForm: {},
      rules: {
        name: [
          {
            required: true,
            message: '角色名称不能为空',
            trigger: 'blur'
          }
        ]
      },
      showDialog: false,
      formData: {},
      data: [{ name: '测试数据' }],
      // 存储数据
      list: [],
      page: {
        total: 0,
        page: 1,
        pagesize: 2
      }
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    showTitle() {
      return this.roleForm.id ? '编辑角色' : '新增角色'
    }
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async submitPermission() {
    //  提交数据
    //  获取到数据
    //  树节点选中的id列表
    //  修改的是哪个角色
      const permIds = this.$refs.permissionRef.getCheckedKeys()
      // 提交接口修改权限信息
      await assignPerm({
        permIds,
        id: this.roleId
      })
      this.$message.success('修改权限成功')
      this.cancelPermissionDialog()
    },
    cancelPermissionDialog() {
    //  关闭弹层
      this.permissionShowDialog = false
      //  选中的节点清空
      this.selectCheck = []
    },
    async assginPermission(id) {
      // 获取的所有的权限 ==> 提供用户做选择
      const data = await getPermissionList()
      this.permissionList = transData(data, '0')

      // 获取当前角色所对应的权限信息做默认选中
      const { permIds } = await getRoleDetail(id)
      this.selectCheck = permIds

      //  id当前需要修改权限的角色
      this.permissionShowDialog = true
      this.roleId = id
    },
    async editRole(id) {
      this.showDialog = true

      // 数据回显
      this.roleForm = await getRoleDetail(id)
    },
    async btnOK() {
      //  表单校验
      try {
        await this.$refs.roleForm.validate()
        // 编辑  新增
        if (this.roleForm.id) {
          //  编辑
          //  提交数据
          await updateRole(this.roleForm)
          this.$message.success('编辑成功')
        } else {
          //  新增
          await addRole(this.roleForm)
          this.$message.success('添加成功')
        }
        this.showDialog = false
        // 重新获取列表数据
        await this.getRoleList()
      } catch (e) {
        console.log(e)
      }
      //  提交数据
    },
    btnCancel() {
      // 数据重置
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    async delRole(id) {
      try {
        await deleteRole(id)
        //  删除成功
        this.$message.success('删除成功')
        await this.getRoleList()
      } catch (e) {
        console.log(e.message)
      }
    },
    // 获取角色的信息
    async getRoleList() {
      const { rows = [], total } = await getRoleList(this.page)
      this.list = rows
      this.page.total = total
    },
    changePage(page) {
      this.page.page = page
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    }
  }
}
</script>
