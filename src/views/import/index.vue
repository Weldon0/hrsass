<template>
  <UploadExcel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'

export default {
  computed: {
    type() {
      return this.$route.query.type
    }
  },
  mounted() {
    console.log(this.$route.query.type)
  },
  methods: {
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    },
    async success({ results }) {
      // results 数组 ==> 对象  ==> key ==> 中文
      // 需求：中文的key==>英文的
      if (this.type === 'em') {
        const userRelations = {
          '入职日期': 'timeOfEntry',
          '手机号': 'mobile',
          '姓名': 'username',
          '转正日期': 'correctionTime',
          '工号': 'workNumber'
        }
        const arr = []

        results.forEach(item => {
          // 数组的每一项 ==> object ==> key ==> 中文
          const userInfo = {}
          Object.keys(item).forEach(key => {
            // key ==> 原有数据的中文key
            if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
              userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/')) // 只有这样, 才能入库
              return
            }
            userInfo[userRelations[key]] = item[key]
          })
          arr.push(userInfo)
        })

        await importEmployee(arr)
        this.$message.success('导入成功')
        this.$router.back()
      }
    }
  }
}
</script>

