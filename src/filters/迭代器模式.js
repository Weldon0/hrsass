
// 对外实现统一迭代接口，外接不需要关心程序内部结构
const todolist = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '外语'],
  work: ['工作'],
  [Symbol.iterator]() {
    // const self = this
    // 可以完全自定义如何去迭代
    const arr = [...this.life, ...this.learn, ...this.work]
    let index = 0
    return {
      next() {
        // index++
        return {
          done: index === arr.length,
          value: arr[index++]
        }
      }
    }
  }
}

for (const listItem of todolist) {
  console.log(listItem)
}

// obj[Symbol.iterator] = function() {
//   console.log(this)
//   return {
//     next() {
//       return {
//         done: true
//       }
//     }
//   }
// }

for (const objElement of obj) {
  console.log(objElement)
}

