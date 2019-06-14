# 自定义Promise实现 #

自定义的Promise类库，用来加深对Promise的理解。在阅读代码之前，请务必对Promise的语法有了一定的理解。如果知识点产生了模糊，请移步[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise "MDN")

## 方法 ##

- **Promise.prototype.then()**

then() 方法返回一个  Promise 。它最多需要有两个参数：Promise 的成功和失败情况的回调函数。

作用: 用来指定promise的状态为resolved或rejected时的回调函数。

注意: then()方法的返回值为新的promise对象, 这样可以进行.then()的链式调用，返回的promise的结果状态和值由回调函数的执行结果决定。

异步操作返回的结果分三种情况。 

返回promise: 将返回promise的结果值作为then()返回promise的结果。

返回其它: 成功, 值为返回的结果。

抛出异常: 失败, 值为抛出的数据。

- **Promise.prototype.catch()**

catch() 方法返回一个Promise，并且处理拒绝的情况。它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。

- **Promise.all()**

Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。

- **Promise.race()**

Promise.race(iterable) 方法返回一个 promise，只要给定的迭代中的一个promise解决或拒绝，就采用第一个promise的值作为它的值，从而异步地解析或拒绝。

- **Promise.reject()**

Promise.reject(reason)方法返回一个带有拒绝原因reason参数的Promise对象。

- **Promise.resolve()**

Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。