// 类组件继承 extends
// super作用?
// this指向 ==> 构造函数  普通函数 *******
// call bind apply
// 闭包 ==》 概念清晰 ==》 作用域链
// bind方法 返回了一个改变了this的函数拷贝
// 剪头函数 普通函数区别

// es块级作用域

// 闭包：一个函数对另一个函数内部的变量有了访问的时候，会有闭包的产生 ==> 只有造成了访问的变量才不会被垃圾回收机制回收

// 两个极端 ==> 忽悠 知道的说出来
// 10K 实事求是 ==> 技术点
// 项目 ==> 另一个极端
// 业务
// 问题

// http缓存
// flex

// 光云科技

// node服务器

// 问你问题 ==> 不会 放弃了 ==> 征服

function add() {
  //
  const a = 1
  const b = 2
  return function() {
    // a++
    // debugger
    // console.log(b)
    console.log(a)
  }
}

console.dir(add())

// 函数能够访问到的上层变量 ==> 函数定义的时候被确定的
// add里面的 全局的

// window.a

// 普通函数 谁调用指向谁
// 箭头函数 ==> 定义的上下文的this
// 商品id查找
