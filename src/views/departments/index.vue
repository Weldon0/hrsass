<template>
  <div class="dashboard-container">
    <div class="app-container dep">
      <el-card :body-style="{background: '#67C23A', color: '#fff'}" shadow="never">
        <TreeTools :is-root="true" :tree-node="companyNode" @handleAddDept="handleAddDept" @handleGetDeparts="handleGetDeparts" />
      </el-card>
      <el-tree :default-expand-all="true" :data="departs" :props="defaultProps" @node-click="handleNodeClick">
        <template v-slot="{data}">
          <TreeTools :tree-node="data" @handleAddDept="handleAddDept" @handleGetDeparts="handleGetDeparts" />
        </template>
      </el-tree>
    </div>
    <AddDept :show-dialog.sync="showDialog" :tree-node="node" @getDept="handleGetDeparts" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-dept'
import { getDepartments } from '@/api/departs'
import { transData } from '@/utils'

export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      showDialog: false,
      node: {},
      defaultProps: {
        label: 'name'
      },
      companyNode: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人'
      },
      departs: [{ name: '总裁办', manager: '时jj', children: [{ name: '董事会' }] },
        { name: '行政部' }, { name: '人事部' }]
    }
  },
  created() {
    this.handleGetDeparts()
  },
  methods: {
    handleNodeClick() {
    },
    // 添加子部门的事件
    handleAddDept(node) {
      this.node = node
      this.showDialog = true
    },
    async handleGetDeparts() {
      const data = await getDepartments()
      // 公司信息
      this.companyNode = {
        name: data.companyName,
        manager: data.companyManage || '负责人',
        id: ''
      }
      // tree组件的信息
      this.departs = transData(data.depts, '')
    }
  }
}

// const data = [
//   {
//     id: 1,
//     pid: 0,
//     childrens: [
//       {
//         id: 2,
//         pid: 1,
//         children: [
//           {
//             id: 4,
//             pid: 2
//           }
//         ]
//       },
//       {
//         id: 3,
//         pid: 1
//       }
//     ]
//   }
// ]
</script>

<style>
.dep {
  width: 1000px;
  margin: 0 auto;
}
</style>

