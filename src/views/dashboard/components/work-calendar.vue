<template>
  <div class="container">
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" class="dateSelect" size="mini" placeholder="请选择" @change="changeDate">
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select v-model="currentMonth" class="dateSelect" style="margin-left: 10px" size="mini" placeholder="请选择" @change="changeDate">
        <el-option
          v-for="item in 12"
          :key="item"
          :label="`${item}月`"
          :value="item"
        />
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template
        slot="dateCell"
        slot-scope="{date, data}"
      >
        {{ data.day | getDay }}

        <span v-if="isWeek(date)" class="rest">休</span>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(value) {
      // 2021-03-03
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  props: {
    // 预期我们的组件  可以传入日期
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      yearList: [],
      currentYear: '',
      currentMonth: '',
      currentDate: new Date()
    }
  },
  created() {
    // 准备工作
    this.currentMonth = this.startDate.getMonth() + 1
    this.currentYear = this.startDate.getFullYear()

    // map方法
    this.yearList = Array.from(Array(11), (value, index) => {
      // console.log(index)
      // this.currentYear 当前年份
      // 2021 0 ==> 2016
      // 2021 1 ==> 2017
      // 2021 2 ==> 2018
      // 2021 3 ==> 2019
      // 2021 4 ==> 2020
      // 2021 5 ==> 2021
      return this.currentYear + index - 5
    })

    this.changeDate()
  },
  methods: {
    isWeek(date) {
      const week = date.getDay()
      // 周末
      return week === 6 || week === 0
    },
    changeDate() {
      //  什么变化
      // 下拉框选择的年份
      const year = this.currentYear
      // 下拉框选择的月份
      const month = this.currentMonth
      this.currentDate = new Date(`${year}-${month}-1`)
    }
  }
}
</script>

<style>

.dateSelect {
  width: 100px;
}
.container .el-calendar__header {
  display: none;
}

.rest {
  background-color: red;
  color: white;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
}
</style>
