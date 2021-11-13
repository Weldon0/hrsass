// function sleep(duration) {
//   return new Promise(resolve => {
//     setTimeout(resolve, duration)
//   })
// }
//
// async function changeColor(color, duration) {
//   console.log('灯亮了:', color)
//   await sleep(duration)
// }
//
// async function main() {
//   while (true) {
//     await changeColor('red', 2000)
//     await changeColor('yellow', 1000)
//     await changeColor('green', 3000)
//   }
// }
//
// main()

// function * main() {
//   yield function(next, time) {
//     console.log('red')
//     setTimeout(() => {
//       next()
//     }, time)
//   }
// }
//
// const gen = main()
