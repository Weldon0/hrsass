<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :has-before="true">
        <template #before> 共166条记录 </template>
        <template #after>
          <el-button
            size="mini"
            type="warning"
            @click="$router.push(`/import?type=em`)"
          >导入</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="exportData"
          >导出</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="showDialog = true"
          >新增员工</el-button>
        </template>
      </PageTools>

      <el-card v-loading="loading">
        <el-table :data="list" border>
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column>
            <template v-slot="{ row }">
              <img
                slot="reference"
                v-imgerror="require('@/assets/common/bigUserHeader.png')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                alt=""
                @click="showImgQrCode(row.staffPhoto)"
              >
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template v-slot="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
              >查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="delRole(row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            layout="prev, pager, next"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
      <AddEmployees :show-dialog.sync="showDialog" />
      <el-dialog title="图片预览" :visible.sync="qrImgVisible">
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>

      <AssignRoles ref="assinRoles" :user-id="userId" :dialog-visible.sync="dialogVisible" />
    </div>
  </div>
</template>

<script>
import { delEmployee, getEmployeeList } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployees from './components/add-employee'
import AssignRoles from './components/assign-role'
import { formatDate } from '@/filters'
import Qrcode from 'qrcode'

import mapData from '@/api/constant/employees'

export default {
  components: {
    // PageTools
    AddEmployees,
    AssignRoles
  },
  data() {
    return {
      dialogVisible: false,
      showDialog: false,
      qrImgVisible: false,
      loading: false,
      imgUrl: '',
      userId: '',
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    editRole(id) {
      this.dialogVisible = true
      this.userId = id
      // 子组件获取角色详情的方法
      this.$refs.assinRoles.getRoleDetailById(id)
    },
    showImgQrCode(url) {
      console.log(url)
      if (url) {
        this.qrImgVisible = true
        this.$nextTick(() => {
          Qrcode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.info('当前用户没有头像')
      }
    },
    exportData() {
      // 定义表头的映射对象
      // 数据跟表头对应
      const headers = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }

      import('@/vendor/Export2Excel').then(async(excel) => {
        // 数据
        //  请求接口
        const { rows } = await getEmployeeList({
          page: 1,
          size: this.page.total
        })
        console.log(rows)
        const data = this.formatJson(headers, rows)
        console.log(data)

        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头数组  [手机号，	姓名，	入职日期，	转正日期，	工号]
          data,
          filename: '员工信息表',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    async delRole(id) {
      try {
        // 确认弹框
        await this.$confirm('是否确认删除')
        await delEmployee(id)
        this.$message.success('删除成功')
        await this.getList()
      } catch (e) {
        console.log(e)
      }
    },
    formatJson(headers, rows) {
      //  headers表头
      //  rows 具体的数据 [{}, {username: 'xxx', workNumber: '2222'}]
      //   console.log(rows.map(item => {
      //     return Object.keys(headers)
      //   }))
      //   ['黑马', '791119']
      //  对象的key 驼峰  ==> 下划线

      // {
      //   getAge: '',
      //     showName: ''
      // }
      //
      // {
      //   get_age: '',
      //     show_name: ''
      // }
      return rows.map((item) => {
        return Object.keys(headers).map((key) => {
          // [['黑马', '791119'],['黑马', '791119'],['黑马', '791119']]
          //   key ==> 中文的key
          //  如何获取到中文key所对应的英文key
          const enKey = headers[key]
          if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
            // 时间字段
            return formatDate(item[enKey])
          }

          if (enKey === 'formOfEmployment') {
            const pyxs = mapData.hireType.find(
              (item) => item.id === item[enKey]
            )?.value
            return pyxs || '未知'
          }
          return item[enKey]
        })
      })
      // return [[], []]
    },
    // 格式化表单的值
    formatEmployment(row, column, cellValue, index) {
      const data = EmployeeEnum.hireType.find(
        (item) => item.id === cellValue
      )?.value
      return data || '未知'
    },
    // 获取列表数据
    async getList() {
      this.loading = true
      const { rows, total } = await getEmployeeList(this.page)
      this.list = rows
      this.page.total = total
      this.loading = false
    },
    // 改变页码时候的回调
    changePage(newPage) {
      this.page.page = newPage
      this.getList()
    }
  }
}
// vue ==> 人资 复习
// js高级
// 闭包
// 原型链
// flex
// http缓存
// 动态路由
// 作用于插槽
// 数组结构 ==> 树结构
// 权限判断 导航钩子
// mixin混入
// vuex
// 路由 vue-router
// 生命周期
// 业务项目

// react ==> react(源码)
//
</script>

<style></style>
