(function(window) {
    function Promise(executor) { 
        const self = this
        self.status = 'pending'
        self.data = undefined
        self.callbacks = []

        //指定 promise 的成功结果以及数据
        function resolve (value) {
            if (self.status !== 'pending') {
                return
            }
            self.status = 'resolved'
            self.data = value
            //立即异步执行所有待处理的成功回调函数(先指定了回调函数，但还未返回成功的数据)
            if (self.callbacks.length > 0) {
                self.callbacks.forEach(callbackObj => {
                    callbackObj.onResolved(value)
                });
            }
        }

        function reject(reason) {
            if (self.status !== 'pending') {
                return
            }
            self.status = 'rejected'
            self.data = reason
            //立即异步执行所有待处理的失败回调函数
            if (self.callbacks.length > 0) {
                self.callbacks.forEach(callbackObj => {
                    callbackObj.onRejected(reason)
                })  
            }
        }

        try {
            executor(resolve,reject)            
        } catch (err) {
            reject(err)
        }
    }

    Promise.prototype.then = function (onResolved, onRejected) {
        const self = this
        const status = this.status

        onResolved = typeof onResolved === 'function' ? onResolved : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

        return new Promise( (resolve, reject) => {
            //封装函数：根据传入为 promise对象 或 其他数据 ，进行不同处理。
            function handler(callback) {
                try {
                    const result = callback(self.data)
                    if (result instanceof Promise) {
                        /* result.then(
                            value => resolve(value),
                            reason => reject(reason)
                        ) */
                        result.then(resolve,reject)
                    } else {
                        resolve(result)
                    }
                } catch (err) {
                    reject(err)
                }
            }

            //立即异步调用 onResolved
            if (status === 'resolved') {
                setTimeout( () => {
                    handler(onResolved)
                } )
            } else if (status === 'rejected') {
                setTimeout(() => {
                    handler(onRejected)
                });
            } else {
                self.callbacks.push({
                    onResolved () {
                        handler(onResolved)
                    },
                    onRejected () {
                        handler(onRejected)
                    }
                })
            } 
        } )
    }

    Promise.prototype.catch = function (onRejected) {  
        return this.then(undefined, onRejected)
    }

    Promise.resolve = function (value) {
        return new Promise((resolve, reject) => {
            //如果value是promise，则将该promise的结果作为新的promise的结果
            if (value instanceof Promise) {
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        })
    }

    Promise.reject = function (reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    Promise.all = function (iterable) {
        let resolvedCount = 0
        const values = []

        return new Promise((resolve, reject) => {
            for (let i = 0; i < iterable.length; i++) {
                const promise = iterable[i];
                Promise.resolve(promise).then(
                    value => {
                        resolvedCount++
                        values[i] = value

                        if (resolvedCount === iterable.length) {
                            resolve(values)
                        }
                    },
                    reason => {
                        reject(reason)
                    }
                )
            }
        })
    }

    Promise.race = function (iterable) {
        return new Promise((resolve, reject) => {
            iterable.forEach( (promise) => {
                Promise.resolve(promise).then(
                    value => resolve(value),
                    reason => reject(reason)
                )
            } )
        })
    }

    window.Promise = Promise
})(window)