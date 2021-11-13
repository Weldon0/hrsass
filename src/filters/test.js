
// const result = {
//   get_name: '',
//   get_age: 33
// }

// function getData(obj) {
//   const temObj = {}
//   // obj转成一个可迭代的对象
//   // 数组是一个可迭代的对象
//   for (const [key, value] of obj) {
//     // console.log(key, value)
//     temObj[key.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`)] = value
//   }
//   return temObj
// }
//
// // function getData(obj) {
// //   const tempObj = {}
// //   Object.keys(obj).forEach(key => {
// //     tempObj[key.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`)] = obj[key]
// //   })
// //
// //   return tempObj
// // }
//
// console.log(getData(obj))
